// Hardened In-Browser Python Execution Engine for SunFounder DaVinci Kit
// Translates Python scripts to safe asynchronous JavaScript and executes in sandbox
// Enforces official RPi.GPIO & gpiozero runtime checks, timing fidelity, and standard library shims

(function(global) {
  'use strict';

  // Helper tokenizers and string processors for AST conversion
  function stripPythonComment(line) {
    let inStr = null;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inStr) {
        if (ch === inStr && line[i - 1] !== '\\') inStr = null;
      } else if (ch === "'" || ch === '"' || ch === '`') {
        inStr = ch;
      } else if (ch === '#') {
        return line.substring(0, i).trim();
      }
    }
    return line.trim();
  }

  function getBracketDelta(line) {
    let delta = 0;
    let inStr = null;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (inStr) {
        if (ch === inStr && line[i - 1] !== '\\') inStr = null;
      } else if (ch === "'" || ch === '"' || ch === '`') {
        inStr = ch;
      } else if (ch === '(' || ch === '[' || ch === '{') {
        delta++;
      } else if (ch === ')' || ch === ']' || ch === '}') {
        delta--;
      }
    }
    return delta;
  }

  function splitCallArgs(argsStr) {
    const tokens = [];
    let depth = 0, inStr = null, cur = '';
    for (let i = 0; i < argsStr.length; i++) {
      const ch = argsStr[i];
      if (inStr) {
        cur += ch;
        if (ch === inStr && argsStr[i - 1] !== '\\') inStr = null;
      } else if (ch === "'" || ch === '"' || ch === '`') {
        inStr = ch;
        cur += ch;
      } else if (ch === '(' || ch === '[' || ch === '{') {
        depth++;
        cur += ch;
      } else if (ch === ')' || ch === ']' || ch === '}') {
        depth--;
        cur += ch;
      } else if (ch === ',' && depth === 0) {
        tokens.push(cur.trim());
        cur = '';
      } else {
        cur += ch;
      }
    }
    if (cur.trim()) tokens.push(cur.trim());
    return tokens;
  }

  function transformCallKwargs(line) {
    return line.replace(/(\b[A-Za-z0-9_.]+)\s*\(([^()]+)\)/g, (match, fn, argsStr) => {
      if (!argsStr.includes('=')) return match;
      const tokens = splitCallArgs(argsStr);
      const posArgs = [];
      const kwArgs = [];
      for (const t of tokens) {
        if (t.startsWith("'") || t.startsWith('"') || t.startsWith('`')) {
          posArgs.push(t);
          continue;
        }
        const kw = t.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.*)$/);
        if (kw && !t.includes('==') && !t.includes('<=') && !t.includes('>=')) {
          kwArgs.push(`${kw[1]}: ${kw[2]}`);
        } else {
          posArgs.push(t);
        }
      }

      if (kwArgs.length === 0) return match;
      const kwObj = `{ ${kwArgs.join(', ')} }`;
      if (posArgs.length === 0) return `${fn}(${kwObj})`;
      return `${fn}(${posArgs.join(', ')}, ${kwObj})`;
    });
  }

  // Global prototype helpers for Python Array & Object compatibility
  if (typeof Array !== 'undefined') {
    if (!Array.prototype.append) {
      Array.prototype.append = function(item) { this.push(item); return this; };
    }
    if (!Array.prototype.index) {
      Array.prototype.index = function(item) { return this.indexOf(item); };
    }
  }
  if (typeof Object !== 'undefined' && !Object.prototype.keys) {
    Object.defineProperty(Object.prototype, 'keys', {
      value: function() { return Object.keys(this); },
      writable: true,
      enumerable: false,
      configurable: true
    });
  }

  class PythonSimulatorRunner {
    constructor() {
      this.isRunning = false;
      this.isPaused = false;
      this.stopRequested = false;
      this.activeExecution = null;
      this.outputCallbacks = [];
      this.stateCallbacks = [];
      this.speedMultiplier = 1.0;
      this.startTime = Date.now();
      this.activeTimers = [];
    }

    onOutput(fn) {
      this.outputCallbacks.push(fn);
    }

    onStateChange(fn) {
      this.stateCallbacks.push(fn);
    }

    emitOutput(type, text) {
      this.outputCallbacks.forEach(fn => fn(type, text));
    }

    emitState(state) {
      this.stateCallbacks.forEach(fn => fn(state));
    }

    setSpeed(mult = 1.0) {
      this.speedMultiplier = Math.max(0.1, Math.min(10.0, mult));
    }

    clearTerminal() {
      this.emitOutput('clear', '');
    }

    async sleep(seconds) {
      if (typeof seconds !== 'number' || seconds < 0) {
        throw new Error('ValueError: sleep length must be non-negative');
      }
      const ms = Math.max(1, (seconds * 1000) / this.speedMultiplier);
      const start = Date.now();
      while (Date.now() - start < ms) {
        if (this.stopRequested) {
          throw new Error('KEYBOARD_INTERRUPT');
        }
        while (this.isPaused && !this.stopRequested) {
          await new Promise(r => setTimeout(r, 50));
        }
        await new Promise(r => setTimeout(r, Math.min(25, ms - (Date.now() - start))));
      }
    }

    // Transpiles SunFounder Python code into executable async JavaScript
    transpilePython(pyCode) {
      const rawLines = pyCode.split('\n');
      const jsLines = [];
      const indentStack = [0];

      // Pass 1: Collect globals, main block, function calls, and async functions
      const globalVars = new Set();
      const definedClasses = new Set();
      let hasMainBlock = false;
      let hasExplicitSetupCall = false;
      let hasExplicitMainCall = false;
      let hasExplicitLoopCall = false;
      const allFunctions = new Set();
      const asyncFunctions = new Set(['sleep', 'pause', 'wait_for_press', 'beep', 'play', 'loop', 'main', 'destroy']);

      for (let i = 0; i < rawLines.length; i++) {
        const line = rawLines[i];
        const trimmed = line.trim();
        const gMatch = trimmed.match(/^global\s+([a-zA-Z0-9_,\s]+)/);
        if (gMatch) {
          gMatch[1].split(',').map(s => s.trim()).filter(Boolean).forEach(v => globalVars.add(v));
        }
        if (/if\s+__name__\s*==\s*['"]__main__['"]/.test(trimmed)) {
          hasMainBlock = true;
        }

        const classMatch = trimmed.match(/^class\s+([a-zA-Z0-9_]+)/);
        if (classMatch) {
          definedClasses.add(classMatch[1]);
        }

        const defMatch = trimmed.match(/^def\s+([a-zA-Z0-9_]+)\s*\(/);
        if (defMatch) {
          allFunctions.add(defMatch[1]);
        } else {
          if (/(?<!def\s+)\bsetup\s*\(/.test(trimmed)) hasExplicitSetupCall = true;
          if (/(?<!def\s+)\bmain\s*\(/.test(trimmed)) hasExplicitMainCall = true;
          if (/(?<!def\s+)\bloop\s*\(/.test(trimmed)) hasExplicitLoopCall = true;
        }
      }

      // Expand asyncFunctions: any function containing sleep/pause/while/for or calling another async function
      for (let pass = 0; pass < 5; pass++) {
        for (let i = 0; i < rawLines.length; i++) {
          const defMatch = rawLines[i].trim().match(/^def\s+([a-zA-Z0-9_]+)\s*\(/);
          if (!defMatch) continue;
          const fnName = defMatch[1];
          const fnIndent = (rawLines[i].match(/^(\s*)/)[1] || '').length;
          for (let j = i + 1; j < rawLines.length; j++) {
            const nextIndent = (rawLines[j].match(/^(\s*)/)[1] || '').length;
            if (rawLines[j].trim() && nextIndent <= fnIndent) break;
            const lineCode = rawLines[j];
            if (/sleep|pause|await|wait_for_press|while\b|for\b/.test(lineCode)) {
              asyncFunctions.add(fnName);
              break;
            }
            for (const afn of asyncFunctions) {
              if (new RegExp(`(?<!def\\s+)\\b${afn}\\s*\\(`).test(lineCode)) {
                asyncFunctions.add(fnName);
                break;
              }
            }
          }
        }
      }

      // Base shims that are always available
      const baseImports = [
        'GPIO', 'ADC0834', 'LCD1602', 'time', 'math', 'random', 'print',
        'sleep', 'len', 'str', 'int', 'float', 'abs', 'min', 'max', 'round',
        'sprintf', '__iter', 'pause', 'spidev', 'threading', 'enumerate', 'list'
      ];
      const gzMatches = pyCode.match(/from\s+gpiozero\s+import\s+([a-zA-Z0-9_, \t]+)/g);
      const gzImports = new Set();
      if (gzMatches) {
        for (const m of gzMatches) {
          const list = m.replace(/from\s+gpiozero\s+import\s+/, '').split(',');
          list.map(s => s.trim().split('#')[0].trim()).filter(Boolean).forEach(c => gzImports.add(c));
        }
      }
      const allImports = [...baseImports, ...Array.from(gzImports)];

      jsLines.push('// Hardened DaVinci Python Transpiled AST');
      jsLines.push(`const { ${allImports.join(', ')} } = __env;`);
      if (globalVars.size > 0) {
        jsLines.push(`let ${Array.from(globalVars).join(', ')};`);
      }
      jsLines.push('');

      const declaredVars = new Set();
      const classIndentStack = [];
      let inDocstring = false;
      let bracketDepth = 0;
      let lastBlock = '';

      for (let i = 0; i < rawLines.length; i++) {
        let line = rawLines[i];
        let trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        // Handle multiline docstrings
        if (trimmed.startsWith('"""') || trimmed.startsWith("'''")) {
          const quote = trimmed.substring(0, 3);
          if (trimmed.endsWith(quote) && trimmed.length > 3) {
            continue; // Single-line docstring
          }
          inDocstring = !inDocstring;
          continue;
        }
        if (inDocstring) {
          if (trimmed.includes('"""') || trimmed.includes("'''")) {
            inDocstring = false;
          }
          continue;
        }

        const indentMatch = line.match(/^(\s*)/);
        const currentIndent = indentMatch ? indentMatch[1].replace(/\t/g, '    ').length : 0;

        // Only close blocks if we are NOT inside a multiline bracket literal
        if (bracketDepth === 0) {
          while (indentStack.length > 1 && currentIndent < indentStack[indentStack.length - 1]) {
            indentStack.pop();
            if (classIndentStack.length > 0 && currentIndent <= classIndentStack[classIndentStack.length - 1]) {
              classIndentStack.pop();
            }
            jsLines.push(' '.repeat(indentStack[indentStack.length - 1]) + '}');
          }
        }

        let code = stripPythonComment(line);
        if (!code) continue;

        if (/^import\s+/.test(code) || /^from\s+/.test(code)) continue;
        if (/^global\s+/.test(code)) continue;

        const isInsideClass = classIndentStack.length > 0;

        // Class definition: class Name: or class Name():
        const classMatch = code.match(/^class\s+([a-zA-Z0-9_]+)\s*(?:\((.*?)\))?\s*:/);
        if (classMatch) {
          const clsName = classMatch[1];
          jsLines.push(' '.repeat(currentIndent) + `class ${clsName} {`);
          indentStack.push(currentIndent + 4);
          classIndentStack.push(currentIndent);
          continue;
        }

        // Floor division in Python: a // b -> Math.floor(a / b)
        code = code.replace(/([a-zA-Z0-9_\)\]]+)\s*\/\/\s*([a-zA-Z0-9_\(\[\.]+)/g, 'Math.floor($1 / $2)');

        // List comprehensions: [expr for var in list] -> (list).map(var => expr)
        code = code.replace(/\[\s*([^\]]*?)\s+for\s+([a-zA-Z0-9_]+)\s+in\s+([^\]]*?)\s*\]/g, '($3).map($2 => $1)');

        // Python ternary: a if cond else b
        if (/\bif\b.*\belse\b/.test(code) && !code.startsWith('if ') && !code.startsWith('elif ')) {
          code = code.replace(/(.+?)\s+if\s+(.+?)\s+else\s+(.+)/g, (m, a, cond, b) => {
            const assign = a.match(/^([a-zA-Z0-9_\.]+\s*=\s*)(.*)$/);
            if (assign) {
              return `${assign[1]}(${cond}) ? (${assign[2]}) : (${b})`;
            }
            return `(${cond}) ? (${a}) : (${b})`;
          });
        }

        // Slicing: [start:end] -> .slice(start, end)
        code = code.replace(/([a-zA-Z0-9_\)\]]+)\[\s*([0-9a-zA-Z_\.]+)?\s*:\s*([0-9a-zA-Z_\.]+)?\s*\]/g, (m, arr, start, end) => {
          const s = start !== undefined ? start : '0';
          const e = end !== undefined ? `, ${end}` : '';
          return `${arr}.slice(${s}${e})`;
        });

        // not in -> !includes
        code = code.replace(/([a-zA-Z0-9_\(\)\.\x27\"]+)\s+not\s+in\s+([a-zA-Z0-9_\(\)\.\x27\"]+)/g, '!($2).includes($1)');

        // Raise exceptions: raise Error(...) -> throw new Error(...)
        code = code.replace(/\braise\s+[a-zA-Z0-9_.]*\s*\((.*?)\)/g, 'throw new Error($1)');
        code = code.replace(/\braise\s+[a-zA-Z0-9_.]+/g, 'throw new Error()');

        code = code.replace(/\bTrue\b/g, 'true')
                   .replace(/\bFalse\b/g, 'false')
                   .replace(/\bNone\b/g, 'null')
                   .replace(/\band\b/g, '&&')
                   .replace(/\bor\b/g, '||')
                   .replace(/\bnot\b/g, '!')
                   .replace(/\bis\s+not\b/g, '!==')
                   .replace(/\bis\b/g, '===')
                   .replace(/\bself\./g, 'this.')
                   .replace(/\bpass\b/g, '/* pass */');

        // f-strings
        code = code.replace(/\bf(['"])(.*?)\1/g, (m, q, content) => {
          let templ = content.replace(/{([^}]+)}/g, '${$1}');
          templ = templ.replace(/\{([^}:]+):[^}]+\}/g, '{$1}');
          return '`' + templ + '`';
        });

        // % formatting
        code = code.replace(/(['"](?:[^'\"\\\n]*%[0-9.]*[sdfxX][^'\"\\\n]*)['"])\s*%\s*\(([^)]+)\)/g, 'sprintf($1, $2)');
        code = code.replace(/(['"](?:[^'\"\\\n]*%[0-9.]*[sdfxX][^'\"\\\n]*)['"])\s*%\s*([a-zA-Z0-9_\.\[\]]+)/g, 'sprintf($1, $2)');

        // Tuples -> Arrays
        code = code.replace(/(?<![a-zA-Z0-9_\$])\(\s*([^\(\)]+,\s*[^\(\)]+)\s*\)/g, '[$1]');

        // Functions (def) handled BEFORE call kwargs so default params aren't mangled
        const defMatch = code.match(/^def\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*:/);
        if (defMatch) {
          const fnName = defMatch[1];
          let fnArgs = defMatch[2];
          // Convert Python None/True/False in default args
          fnArgs = fnArgs.replace(/=\s*None\b/g, '= null')
                         .replace(/=\s*True\b/g, '= true')
                         .replace(/=\s*False\b/g, '= false')
                         .replace(/^this\s*,?\s*/, '')
                         .replace(/^self\s*,?\s*/, '');
          // Add param names to declaredVars
          fnArgs.split(',').forEach(p => {
            const pName = p.trim().split('=')[0].trim();
            if (pName) declaredVars.add(pName);
          });

          const needsAsync = asyncFunctions.has(fnName);
          const asyncPrefix = needsAsync ? 'async ' : '';

          if (isInsideClass) {
            if (fnName === '__init__') {
              jsLines.push(' '.repeat(currentIndent) + `constructor(${fnArgs}) {`);
            } else {
              jsLines.push(' '.repeat(currentIndent) + `${asyncPrefix}${fnName}(${fnArgs}) {`);
            }
          } else {
            if (declaredVars.has(fnName)) {
              jsLines.push(' '.repeat(currentIndent) + `${fnName} = ${asyncPrefix}function(${fnArgs}) {`);
            } else {
              jsLines.push(' '.repeat(currentIndent) + `${asyncPrefix}function ${fnName}(${fnArgs}) {`);
              declaredVars.add(fnName);
            }
          }
          indentStack.push(currentIndent + 4);
          continue;
        }

        // Kwargs in function calls
        code = transformCallKwargs(code);

        // Main
        if (/if\s+__name__\s*==\s*['"]__main__['"]\s*:/.test(code)) {
          jsLines.push(' '.repeat(currentIndent) + 'if (true) {');
          indentStack.push(currentIndent + 4);
          continue;
        }

        // While
        let whileMatch = code.match(/^while\s*\((.*?)\)\s*:/);
        if (!whileMatch) {
          whileMatch = code.match(/^while\s+(.*?)\s*:/);
        }
        if (whileMatch && !code.startsWith('if') && !code.startsWith('elif')) {
          let cond = whileMatch[1].trim();
          cond = cond === 'true' || cond === '1' ? 'true' : cond;
          jsLines.push(' '.repeat(currentIndent) + `while (${cond}) {`);
          jsLines.push(' '.repeat(currentIndent + 2) + 'if (__env.isCancelled()) throw new Error("KEYBOARD_INTERRUPT");');
          jsLines.push(' '.repeat(currentIndent + 2) + 'await __env.yieldCheck();');
          indentStack.push(currentIndent + 4);
          lastBlock = 'while';
          continue;
        }

        // For range
        const forRangeMatch = code.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+range\s*\((.*?)\)\s*:/);
        if (forRangeMatch) {
          const v = forRangeMatch[1];
          const args = splitCallArgs(forRangeMatch[2]);
          let init = '0', limit = args[0], step = '1';
          if (args.length === 2) { init = args[0]; limit = args[1]; }
          else if (args.length === 3) { init = args[0]; limit = args[1]; step = args[2]; }
          jsLines.push(' '.repeat(currentIndent) + `for (let ${v} = ${init}; ${v} < ${limit}; ${v} += ${step}) {`);
          jsLines.push(' '.repeat(currentIndent + 2) + 'if (__env.isCancelled()) throw new Error("KEYBOARD_INTERRUPT");');
          jsLines.push(' '.repeat(currentIndent + 2) + 'await __env.yieldCheck();');
          indentStack.push(currentIndent + 4);
          continue;
        }

        // For iterable
        const forInMatch = code.match(/^for\s+([a-zA-Z0-9_,\s\(\)]+)\s+in\s+(.*?)\s*:/);
        if (forInMatch) {
          let v = forInMatch[1].trim();
          const target = forInMatch[2].trim();
          if (v.includes(',')) v = '[' + v.replace(/[\(\)]/g, '') + ']';
          jsLines.push(' '.repeat(currentIndent) + `for (let ${v} of __iter(${target})) {`);
          jsLines.push(' '.repeat(currentIndent + 2) + 'if (__env.isCancelled()) throw new Error("KEYBOARD_INTERRUPT");');
          jsLines.push(' '.repeat(currentIndent + 2) + 'await __env.yieldCheck();');
          indentStack.push(currentIndent + 4);
          continue;
        }

        // If / elif / else
        const ifMatch = code.match(/^if\s*(.*?)\s*:/);
        if (ifMatch) {
          let cond = ifMatch[1].trim();
          jsLines.push(' '.repeat(currentIndent) + `if (${cond}) {`);
          indentStack.push(currentIndent + 4);
          lastBlock = 'if';
          continue;
        }
        const elifMatch = code.match(/^elif\s*(.*?)\s*:/);
        if (elifMatch) {
          let cond = elifMatch[1].trim();
          jsLines.push(' '.repeat(currentIndent) + `else if (${cond}) {`);
          indentStack.push(currentIndent + 4);
          lastBlock = 'elif';
          continue;
        }
        if (/^else\s*:/.test(code)) {
          if (lastBlock === 'catch') {
            jsLines.push(' '.repeat(currentIndent) + '{ // try-else');
          } else {
            jsLines.push(' '.repeat(currentIndent) + 'else {');
          }
          indentStack.push(currentIndent + 4);
          lastBlock = 'else';
          continue;
        }

        // Try / catch / finally
        if (code.startsWith('try:')) {
          jsLines.push(' '.repeat(currentIndent) + 'try {');
          indentStack.push(currentIndent + 4);
          lastBlock = 'try';
          continue;
        }
        if (code.startsWith('except')) {
          jsLines.push(' '.repeat(currentIndent) + 'catch (err) {');
          indentStack.push(currentIndent + 4);
          lastBlock = 'catch';
          continue;
        }
        if (code.startsWith('finally:')) {
          jsLines.push(' '.repeat(currentIndent) + 'finally {');
          indentStack.push(currentIndent + 4);
          lastBlock = 'finally';
          continue;
        }

        code = code.replace(/(?<!\bawait\s+)\b(?:time\.)?sleep\s*\((.*?)\)/g, 'await sleep($1)');
        code = code.replace(/(?<!\bawait\s+)\bpause\s*\(\)/g, 'await pause()');
        code = code.replace(/\bprint\s*\((.*?)\)/g, 'print($1)');

        // Prepend await to any invocations of identified async functions
        for (const afn of asyncFunctions) {
          const fnCallRegex = new RegExp(`(?<!\\bawait\\s+)(?<!\\bdef\\s+)(?<!\\bfunction\\s+)(?<!\\.)\\b${afn}\\s*\\(`, 'g');
          code = code.replace(fnCallRegex, `await ${afn}(`);
        }

        // Instantiate user-defined classes with 'new' if omitted
        for (const cls of definedClasses) {
          const clsRegex = new RegExp(`(?<!\\bnew\\s+)(?<!\\bclass\\s+)\\b${cls}\\s*\\(`, 'g');
          code = code.replace(clsRegex, `new ${cls}(`);
        }

        // Safe timer cancel for uninitialized timer handles
        code = code.replace(/([a-zA-Z0-9_]+)\.cancel\s*\(\)/g, '($1 && typeof $1.cancel === "function" && $1.cancel())');

        // Track bracket delta for multiline literals
        bracketDepth += getBracketDelta(code);

        // Variable assignment
        if (bracketDepth === 0) {
          // Multiple assignments: a, b = 17, 18 -> let [a, b] = [17, 18]
          if (/^[a-zA-Z0-9_]+(\s*,\s*[a-zA-Z0-9_]+)+\s*=\s*/.test(code)) {
            code = 'let [' + code.replace(/\s*=\s*/, '] = [') + ']';
          } else {
            const assignMatch = code.match(/^([a-zA-Z0-9_]+)\s*=\s*/);
            if (assignMatch) {
              const varName = assignMatch[1];
              if (!isInsideClass && !globalVars.has(varName) && !declaredVars.has(varName) && !code.startsWith('let ') && !code.startsWith('const ')) {
                code = 'let ' + code;
                declaredVars.add(varName);
              }
            }
          }
        }

        // Only add semicolon if bracketDepth is 0
        if (bracketDepth === 0 && !code.endsWith(';') && !code.endsWith('{') && !code.endsWith('}') && !code.endsWith(',')) {
          code += ';';
        }

        jsLines.push(' '.repeat(currentIndent) + code);
      }

      // Close all remaining open blocks
      while (indentStack.length > 1) {
        indentStack.pop();
        jsLines.push(' '.repeat(indentStack[indentStack.length - 1]) + '}');
      }

      if (!hasMainBlock) {
        jsLines.push('');
        jsLines.push('// Auto-execute setup and main/loop if declared and not already called');
        if (!hasExplicitSetupCall) {
          jsLines.push('if (typeof setup === "function") await setup();');
        }
        if (!hasExplicitMainCall && !hasExplicitLoopCall) {
          jsLines.push('if (typeof main === "function") await main();');
          jsLines.push('else if (typeof loop === "function") await loop();');
        } else if (!hasExplicitMainCall) {
          jsLines.push('if (typeof main === "function") await main();');
        } else if (!hasExplicitLoopCall) {
          jsLines.push('if (typeof loop === "function") await loop();');
        }
      }

      return jsLines.join('\n');
    }

    // Runs Python code in virtual sandbox with rule enforcement
    async runCode(pyCode) {
      if (this.isRunning) {
        await this.stop();
      }

      this.isRunning = true;
      this.isPaused = false;
      this.stopRequested = false;
      this.startTime = Date.now();
      this.emitState('running');
      this.emitOutput('info', `[PyRunner] Starting script execution...`);

      const vGPIO = global.VirtualGPIO || global.virtualGPIO;
      const vADC = global.VirtualADC0834 || {};
      const vLCD = global.VirtualLCD1602 || {};
      const vAudio = global.VirtualAudio || {};
      const vGuard = global.ElectricalGuard || {};

      const self = this;
      let modeConfigured = false;
      let lastYield = Date.now();

      // Auto-configure mode when gpiozero devices are instantiated
      const ensureBcmMode = () => {
        if (!modeConfigured) {
          modeConfigured = true;
          if (vGPIO) vGPIO.setmode(vGPIO.BCM);
        }
      };

      // Musical note frequencies for TonalBuzzer shim
      const NOTE_FREQ = {
        'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'Eb3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'Ab3': 207.65, 'A3': 220.00, 'Bb3': 233.08, 'B3': 246.94,
        'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'Ab4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
        'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'Eb5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'Ab5': 830.61, 'A5': 880.00, 'Bb5': 932.33, 'B5': 987.77
      };

      // Build execution environment with rule enforcement
      const env = {
        GPIO: {
          BCM: vGPIO ? vGPIO.BCM : 11,
          BOARD: vGPIO ? vGPIO.BOARD : 10,
          OUT: vGPIO ? vGPIO.OUT : 0,
          IN: vGPIO ? vGPIO.IN : 1,
          HIGH: vGPIO ? vGPIO.HIGH : 1,
          LOW: vGPIO ? vGPIO.LOW : 0,
          PUD_OFF: vGPIO ? vGPIO.PUD_OFF : 0,
          PUD_DOWN: vGPIO ? vGPIO.PUD_DOWN : 1,
          PUD_UP: vGPIO ? vGPIO.PUD_UP : 2,
          RISING: vGPIO ? vGPIO.RISING : 1,
          FALLING: vGPIO ? vGPIO.FALLING : 2,
          BOTH: vGPIO ? vGPIO.BOTH : 3,

          setmode: (m) => {
            modeConfigured = true;
            if (vGPIO) vGPIO.setmode(m);
          },
          getmode: () => vGPIO ? vGPIO.getmode() : 11,
          setwarnings: (w) => { if (vGPIO) vGPIO.setwarnings(w); },
          setup: (ch, dir, opt) => {
            if (!modeConfigured) {
              throw new Error('RuntimeError: Please set pin numbering mode using GPIO.setmode(GPIO.BOARD) or GPIO.setmode(GPIO.BCM)');
            }
            if (vGPIO) vGPIO.setup(ch, dir, opt);
          },
          output: (ch, val) => {
            if (!modeConfigured) {
              throw new Error('RuntimeError: Please set pin numbering mode using GPIO.setmode(GPIO.BOARD) or GPIO.setmode(GPIO.BCM)');
            }
            if (vGPIO) {
              const phys = vGPIO.resolvePhysicalPin(ch);
              if (phys && vGPIO.pins[phys] && vGPIO.pins[phys].mode !== 'OUT' && vGPIO.pins[phys].mode !== 'PWM') {
                throw new Error(`RuntimeError: The GPIO channel ${ch} has not been set up as an OUTPUT`);
              }
              vGPIO.output(ch, val);

              // Perform real-time electrical safety audit
              if (vGuard && vGuard.auditCircuit && global.DaVinciApp && global.DaVinciApp.currentLesson) {
                vGuard.auditCircuit(global.DaVinciApp.currentLesson, vGPIO);
              }

              // Buzzer sound trigger check
              if (global.currentLessonId === '1.2.1') {
                if (val === vGPIO.LOW) vAudio.playTone(2500);
                else vAudio.stopTone();
              }
            }
          },
          input: (ch) => {
            if (!modeConfigured) {
              throw new Error('RuntimeError: Please set pin numbering mode using GPIO.setmode(GPIO.BOARD) or GPIO.setmode(GPIO.BCM)');
            }
            return vGPIO ? vGPIO.input(ch) : 0;
          },
          PWM: (ch, freq) => {
            if (!modeConfigured) {
              throw new Error('RuntimeError: Please set pin numbering mode using GPIO.setmode(GPIO.BOARD) or GPIO.setmode(GPIO.BCM)');
            }
            const pwm = vGPIO ? vGPIO.PWM(ch, freq) : null;
            return {
              start: (d) => {
                if (d < 0.0 || d > 100.0) throw new Error('ValueError: dutycycle must have a value from 0.0 to 100.0');
                if (pwm) pwm.start(d);
                if (global.currentLessonId === '1.2.2') vAudio.playTone(freq || 440);
              },
              ChangeDutyCycle: (d) => {
                if (d < 0.0 || d > 100.0) throw new Error('ValueError: dutycycle must have a value from 0.0 to 100.0');
                if (pwm) pwm.ChangeDutyCycle(d);
                if (global.currentLessonId === '1.2.2' && d === 0) vAudio.stopTone();
              },
              ChangeFrequency: (f) => {
                if (f <= 0) throw new Error('ValueError: frequency must be greater than 0');
                if (pwm) pwm.ChangeFrequency(f);
                if (global.currentLessonId === '1.2.2') vAudio.playTone(f);
              },
              stop: () => {
                if (pwm) pwm.stop();
                if (global.currentLessonId === '1.2.2') vAudio.stopTone();
              }
            };
          },
          cleanup: () => {
            if (vGPIO) vGPIO.cleanup();
            if (vAudio) vAudio.stopTone();
            modeConfigured = false;
          },
          add_event_detect: (ch, e, cb, b) => { if (vGPIO) vGPIO.add_event_detect(ch, e, cb, b); },
          remove_event_detect: (ch) => { if (vGPIO) vGPIO.remove_event_detect(ch); }
        },

        // gpiozero stack classes (Pi 5 compatibility layer)
        LED: function(pin) {
          if (!(this instanceof env.LED)) return new env.LED(pin);
          ensureBcmMode();
          this.pin = pin;
          this._val = 0;
          if (vGPIO) {
            vGPIO.setup(pin, vGPIO.OUT, { initial: vGPIO.LOW });
          }
          this.on = () => { this.value = 1; };
          this.off = () => { this.value = 0; };
          this.toggle = () => { this.value = this._val ? 0 : 1; };
          Object.defineProperty(this, 'value', {
            get: () => this._val,
            set: (v) => {
              this._val = v ? 1 : 0;
              if (vGPIO) vGPIO.output(this.pin, this._val ? vGPIO.HIGH : vGPIO.LOW);
            }
          });
          Object.defineProperty(this, 'is_lit', { get: () => this._val === 1 });
        },

        PWMLED: function(pin, freq = 2000) {
          if (!(this instanceof env.PWMLED)) return new env.PWMLED(pin, freq);
          ensureBcmMode();
          this.pin = pin;
          this._val = 0;
          if (vGPIO) {
            vGPIO.setup(pin, vGPIO.OUT);
            this.pwm = vGPIO.PWM(pin, freq);
            this.pwm.start(0);
          }
          this.on = () => { this.value = 1.0; };
          this.off = () => { this.value = 0.0; };
          this.toggle = () => { this.value = this._val > 0 ? 0.0 : 1.0; };
          Object.defineProperty(this, 'value', {
            get: () => this._val,
            set: (v) => {
              this._val = Math.max(0.0, Math.min(1.0, Number(v) || 0));
              if (this.pwm) this.pwm.ChangeDutyCycle(this._val * 100);
            }
          });
        },

        RGBLED: function(r, g, b) {
          if (!(this instanceof env.RGBLED)) return new env.RGBLED(r, g, b);
          ensureBcmMode();
          if (typeof r === 'object' && r !== null) {
            b = r.blue ?? r.b;
            g = r.green ?? r.g;
            r = r.red ?? r.r;
          }
          this.rPin = r; this.gPin = g; this.bPin = b;
          if (vGPIO) {
            vGPIO.setup(r, vGPIO.OUT); vGPIO.setup(g, vGPIO.OUT); vGPIO.setup(b, vGPIO.OUT);
            this.pwmR = vGPIO.PWM(r, 2000); this.pwmG = vGPIO.PWM(g, 2000); this.pwmB = vGPIO.PWM(b, 2000);
            this.pwmR.start(0); this.pwmG.start(0); this.pwmB.start(0);
          }
          this._color = [0, 0, 0];
          this.on = () => { this.color = [1, 1, 1]; };
          this.off = () => { this.color = [0, 0, 0]; };

          Object.defineProperty(this, 'color', {
            get: () => this._color,
            set: (rgb) => {
              if (!Array.isArray(rgb) || rgb.length < 3) return;
              this._color = rgb;
              if (this.pwmR) this.pwmR.ChangeDutyCycle(Math.max(0, Math.min(100, rgb[0] * 100)));
              if (this.pwmG) this.pwmG.ChangeDutyCycle(Math.max(0, Math.min(100, rgb[1] * 100)));
              if (this.pwmB) this.pwmB.ChangeDutyCycle(Math.max(0, Math.min(100, rgb[2] * 100)));
            }
          });
          Object.defineProperty(this, 'red', {
            get: () => this._color[0],
            set: (val) => { this.color = [val, this._color[1], this._color[2]]; }
          });
          Object.defineProperty(this, 'green', {
            get: () => this._color[1],
            set: (val) => { this.color = [this._color[0], val, this._color[2]]; }
          });
          Object.defineProperty(this, 'blue', {
            get: () => this._color[2],
            set: (val) => { this.color = [this._color[0], this._color[1], val]; }
          });
        },

        Button: function(pin, opts = {}) {
          if (!(this instanceof env.Button)) return new env.Button(pin, opts);
          ensureBcmMode();
          this.pin = pin;
          const pullUp = typeof opts === 'boolean' ? opts : (opts.pull_up !== undefined ? opts.pull_up : true);
          if (vGPIO) {
            vGPIO.setup(pin, vGPIO.IN, { pull_up_down: pullUp ? vGPIO.PUD_UP : vGPIO.PUD_DOWN });
          }
          this.when_pressed = null;
          this.when_released = null;
          Object.defineProperty(this, 'is_pressed', {
            get: () => {
              if (!vGPIO) return false;
              const val = vGPIO.input(this.pin);
              return pullUp ? val === 0 : val === 1;
            }
          });
          this.wait_for_press = async (timeout = null) => {
            const start = Date.now();
            while (!this.is_pressed) {
              if (self.stopRequested) throw new Error('KEYBOARD_INTERRUPT');
              if (timeout && (Date.now() - start) / 1000 >= timeout) return false;
              await self.sleep(0.05);
            }
            return true;
          };
        },

        Buzzer: function(pin) {
          if (!(this instanceof env.Buzzer)) return new env.Buzzer(pin);
          ensureBcmMode();
          this.pin = pin;
          this._val = 0;
          if (vGPIO) vGPIO.setup(pin, vGPIO.OUT, { initial: vGPIO.LOW });
          this.on = () => {
            this._val = 1;
            if (vGPIO) vGPIO.output(this.pin, vGPIO.HIGH);
            if (vAudio && vAudio.playTone) vAudio.playTone(2500);
          };
          this.off = () => {
            this._val = 0;
            if (vGPIO) vGPIO.output(this.pin, vGPIO.LOW);
            if (vAudio && vAudio.stopTone) vAudio.stopTone();
          };
          this.toggle = () => { if (this._val) this.off(); else this.on(); };
          this.beep = async (on_time = 1, off_time = 1, n = 1) => {
            for (let i = 0; i < n; i++) {
              this.on(); await self.sleep(on_time);
              this.off(); await self.sleep(off_time);
            }
          };
        },

        TonalBuzzer: function(pin) {
          if (!(this instanceof env.TonalBuzzer)) return new env.TonalBuzzer(pin);
          ensureBcmMode();
          this.pin = pin;
          if (vGPIO) vGPIO.setup(pin, vGPIO.OUT, { initial: vGPIO.LOW });
          this.play = (note) => {
            if (!note) {
              if (vAudio && vAudio.stopTone) vAudio.stopTone();
              return;
            }
            let freq = 440;
            if (typeof note === 'string' && NOTE_FREQ[note]) freq = NOTE_FREQ[note];
            else if (typeof note === 'number') freq = note;
            if (vAudio && vAudio.playTone) vAudio.playTone(freq);
          };
          this.stop = () => {
            if (vAudio && vAudio.stopTone) vAudio.stopTone();
          };
        },

        OutputDevice: function(pin, opts = {}) {
          if (!(this instanceof env.OutputDevice)) return new env.OutputDevice(pin, opts);
          ensureBcmMode();
          this.pin = pin;
          this._val = 0;
          if (vGPIO) vGPIO.setup(pin, vGPIO.OUT, { initial: vGPIO.LOW });
          this.on = () => { this.value = 1; };
          this.off = () => { this.value = 0; };
          this.toggle = () => { this.value = this._val ? 0 : 1; };
          Object.defineProperty(this, 'value', {
            get: () => this._val,
            set: (v) => {
              this._val = v ? 1 : 0;
              if (vGPIO) vGPIO.output(this.pin, this._val ? vGPIO.HIGH : vGPIO.LOW);
            }
          });
        },

        DigitalOutputDevice: function(pin, opts = {}) {
          return new env.OutputDevice(pin, opts);
        },

        InputDevice: function(pin, opts = {}) {
          if (!(this instanceof env.InputDevice)) return new env.InputDevice(pin, opts);
          ensureBcmMode();
          this.pin = pin;
          if (vGPIO) vGPIO.setup(pin, vGPIO.IN);
          Object.defineProperty(this, 'value', {
            get: () => vGPIO ? vGPIO.input(this.pin) : 0
          });
          Object.defineProperty(this, 'is_active', {
            get: () => this.value === 1
          });
        },

        MotionSensor: function(pin, opts = {}) {
          if (!(this instanceof env.MotionSensor)) return new env.MotionSensor(pin, opts);
          ensureBcmMode();
          this.pin = pin;
          if (vGPIO) vGPIO.setup(pin, vGPIO.IN);
          Object.defineProperty(this, 'motion_detected', {
            get: () => vGPIO ? vGPIO.input(this.pin) === 1 : false
          });
          Object.defineProperty(this, 'value', {
            get: () => this.motion_detected ? 1 : 0
          });
        },

        Motor: function(forward, backward, enable) {
          if (!(this instanceof env.Motor)) return new env.Motor(forward, backward, enable);
          ensureBcmMode();
          if (typeof forward === 'object' && forward !== null) {
            backward = forward.backward;
            enable = forward.enable;
            forward = forward.forward;
          }
          this.fwdPin = forward; this.bwdPin = backward; this.enPin = enable;
          if (vGPIO) {
            vGPIO.setup(forward, vGPIO.OUT);
            vGPIO.setup(backward, vGPIO.OUT);
            if (enable) vGPIO.setup(enable, vGPIO.OUT);
          }
          this._active = false;
          this.forward = (speed = 1.0) => {
            this._active = true;
            if (vGPIO) {
              vGPIO.output(this.fwdPin, vGPIO.HIGH);
              vGPIO.output(this.bwdPin, vGPIO.LOW);
              if (this.enPin) vGPIO.output(this.enPin, vGPIO.HIGH);
            }
          };
          this.backward = (speed = 1.0) => {
            this._active = true;
            if (vGPIO) {
              vGPIO.output(this.fwdPin, vGPIO.LOW);
              vGPIO.output(this.bwdPin, vGPIO.HIGH);
              if (this.enPin) vGPIO.output(this.enPin, vGPIO.HIGH);
            }
          };
          this.stop = () => {
            this._active = false;
            if (vGPIO) {
              vGPIO.output(this.fwdPin, vGPIO.LOW);
              vGPIO.output(this.bwdPin, vGPIO.LOW);
              if (this.enPin) vGPIO.output(this.enPin, vGPIO.LOW);
            }
          };
          Object.defineProperty(this, 'is_active', { get: () => this._active });
        },

        Servo: function(pin, opts = {}) {
          if (!(this instanceof env.Servo)) return new env.Servo(pin, opts);
          ensureBcmMode();
          this.pin = pin;
          this._val = 0;
          if (vGPIO) {
            vGPIO.setup(pin, vGPIO.OUT);
            this.pwm = vGPIO.PWM(pin, 50);
            this.pwm.start(7.5);
          }
          this.min = () => { this.value = -1.0; };
          this.mid = () => { this.value = 0.0; };
          this.max = () => { this.value = 1.0; };
          Object.defineProperty(this, 'value', {
            get: () => this._val,
            set: (v) => {
              this._val = Math.max(-1.0, Math.min(1.0, Number(v) || 0));
              // Map -1..1 to 2.5%..12.5% duty cycle
              const duty = 7.5 + (this._val * 5.0);
              if (this.pwm) this.pwm.ChangeDutyCycle(duty);
            }
          });
        },

        DistanceSensor: function(echo, trigger) {
          if (!(this instanceof env.DistanceSensor)) return new env.DistanceSensor(echo, trigger);
          ensureBcmMode();
          if (typeof echo === 'object' && echo !== null) {
            trigger = echo.trigger;
            echo = echo.echo;
          }
          this.echoPin = echo;
          this.trigPin = trigger;
          if (vGPIO) {
            vGPIO.setup(trigger, vGPIO.OUT, { initial: vGPIO.LOW });
            vGPIO.setup(echo, vGPIO.IN);
          }
          Object.defineProperty(this, 'distance', {
            get: () => 0.25 // Simulated 25cm distance
          });
        },

        spidev: {
          SpiDev: function() {
            return {
              open: (b, d) => {},
              max_speed_hz: 1000000,
              xfer2: (data) => [0, 0, 128],
              close: () => {}
            };
          }
        },

        pause: async () => {
          while (!self.stopRequested) {
            await self.sleep(0.1);
          }
        },

        threading: {
          Timer: function(interval, fn, args) {
            if (!(this instanceof env.threading.Timer)) return new env.threading.Timer(interval, fn, args);
            this.interval = interval;
            this.fn = fn;
            this.args = Array.isArray(args) ? args : (args ? [args] : []);
            this.timerId = null;
            this.start = () => {
              const ms = Math.max(1, (this.interval * 1000) / (self.speedMultiplier || 1.0));
              this.timerId = setTimeout(async () => {
                if (!self.stopRequested && typeof this.fn === 'function') {
                  try {
                    await this.fn(...this.args);
                  } catch (e) {
                    if (e.message !== 'KEYBOARD_INTERRUPT' && !self.stopRequested) {
                      console.error('[VirtualTimer Error]', e);
                    }
                  }
                }
              }, ms);
              self.activeTimers.push(this.timerId);
              return this;
            };
            this.cancel = () => {
              if (this.timerId) {
                clearTimeout(this.timerId);
                this.timerId = null;
              }
            };
          },
          Thread: function(target, args) {
            if (!(this instanceof env.threading.Thread)) return new env.threading.Thread(target, args);
            let fn = target;
            let callArgs = args || [];
            if (typeof target === 'object' && target !== null && typeof target.target === 'function') {
              fn = target.target;
              callArgs = target.args || [];
            }
            this.target = fn;
            this.args = Array.isArray(callArgs) ? callArgs : [callArgs];
            this.promise = null;
            this.start = () => {
              if (typeof this.target === 'function') {
                this.promise = (async () => {
                  try {
                    await this.target(...this.args);
                  } catch (e) {
                    if (e.message !== 'KEYBOARD_INTERRUPT' && !self.stopRequested) {
                      console.error('[VirtualThread Error]', e);
                    }
                  }
                })();
              }
              return this;
            };
            this.join = () => this.promise || Promise.resolve();
          }
        },

        ADC0834: {
          setup: () => { if (vADC.setup) vADC.setup(); },
          getResult: (ch) => vADC.getResult ? vADC.getResult(ch) : 128
        },
        LCD1602: {
          init: (addr, bl) => { if (vLCD.init) vLCD.init(addr, bl); },
          clear: () => { if (vLCD.clear) vLCD.clear(); },
          setCursor: (x, y) => { if (vLCD.setCursor) vLCD.setCursor(x, y); },
          write: (x, y, s) => { if (vLCD.write) vLCD.write(x, y, s); }
        },
        time: {
          sleep: async (s) => await self.sleep(s),
          time: () => (Date.now() - self.startTime) / 1000.0,
          monotonic: () => (Date.now() - self.startTime) / 1000.0,
          perf_counter: () => (Date.now() - self.startTime) / 1000.0
        },
        math: {
          pi: Math.PI, e: Math.E, sqrt: Math.sqrt,
          sin: Math.sin, cos: Math.cos, tan: Math.tan,
          atan2: Math.atan2, log: Math.log, pow: Math.pow,
          floor: Math.floor, ceil: Math.ceil
        },
        random: {
          randint: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
          random: () => Math.random(),
          uniform: (min, max) => Math.random() * (max - min) + min,
          choice: (arr) => arr[Math.floor(Math.random() * arr.length)]
        },
        len: (obj) => obj ? (obj.length !== undefined ? obj.length : Object.keys(obj).length) : 0,
        str: (v) => String(v),
        int: (v) => parseInt(v, 10),
        float: (v) => parseFloat(v),
        abs: Math.abs,
        min: Math.min,
        max: Math.max,
        round: (val, n = 0) => n === 0 ? Math.round(val) : parseFloat(val.toFixed(n)),
        print: (...args) => {
          const str = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
          self.emitOutput('stdout', str);
        },
        sprintf: (fmt, ...args) => {
          if (args.length === 1 && Array.isArray(args[0])) args = args[0];
          let i = 0;
          return String(fmt).replace(/%([0-9.]*)([sdfxX%])/g, (m, width, spec) => {
            if (spec === '%') return '%';
            const val = args[i++];
            if (val === undefined) return '';
            if (spec === 'd') return parseInt(val, 10);
            if (spec === 'f') {
              const precision = width.includes('.') ? parseInt(width.split('.')[1], 10) : 2;
              return typeof val === 'number' ? val.toFixed(precision) : parseFloat(val);
            }
            if (spec === 'x') {
              const hex = Number(val).toString(16);
              const pad = width ? parseInt(width, 10) : 0;
              return pad ? hex.padStart(pad, '0') : hex;
            }
            if (spec === 'X') {
              const hex = Number(val).toString(16).toUpperCase();
              const pad = width ? parseInt(width, 10) : 0;
              return pad ? hex.padStart(pad, '0') : hex;
            }
            return String(val);
          });
        },
        __iter: (target) => {
          if (target == null) return [];
          if (Array.isArray(target) || typeof target === 'string') return target;
          if (typeof target[Symbol.iterator] === 'function') return target;
          return Object.keys(target);
        },
        enumerate: (target, start = 0) => {
          const arr = Array.isArray(target) ? target : Object.values(target || {});
          return arr.map((item, idx) => [idx + start, item]);
        },
        list: (target) => {
          if (target == null) return [];
          if (Array.isArray(target)) return target;
          if (typeof target === 'string') return target.split('');
          if (typeof target[Symbol.iterator] === 'function') return Array.from(target);
          return Object.keys(target);
        },
        sleep: async (s) => await self.sleep(s),
        isCancelled: () => self.stopRequested,
        yieldCheck: async () => {
          if (self.stopRequested) throw new Error('KEYBOARD_INTERRUPT');
          while (self.isPaused && !self.stopRequested) {
            await new Promise(r => setTimeout(r, 50));
          }
          const now = Date.now();
          if (now - lastYield > 20) {
            lastYield = now;
            await new Promise(r => setTimeout(r, 0));
          }
        }
      };

      try {
        const jsTranspiled = this.transpilePython(pyCode);
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const runnerFn = new AsyncFunction('__env', jsTranspiled);

        await runnerFn(env);

        if (this.stopRequested) {
          this.emitOutput('warn', `[PyRunner] KeyboardInterrupt (Program stopped by user)`);
        } else {
          this.emitOutput('info', `[PyRunner] Execution finished normally.`);
        }
      } catch (err) {
        if (err.message === 'KEYBOARD_INTERRUPT' || this.stopRequested) {
          this.emitOutput('warn', `[PyRunner] KeyboardInterrupt (Program stopped by user)`);
        } else {
          this.emitOutput('error', `[PyRunner Exception] ${err.message}`);
          console.error('[PyRunner Error]', err);
        }
      } finally {
        this.isRunning = false;
        this.isPaused = false;
        if (this.activeTimers) {
          this.activeTimers.forEach(t => clearTimeout(t));
          this.activeTimers.length = 0;
        }
        this.emitState('stopped');
        if (vAudio && vAudio.stopTone) vAudio.stopTone();
      }
    }

    async stop() {
      if (!this.isRunning && !this.stopRequested) return;
      this.stopRequested = true;
      this.isPaused = false;
      this.emitState('stopping');
      
      const vGPIO = global.VirtualGPIO || global.virtualGPIO;
      const vAudio = global.VirtualAudio;
      if (vAudio && vAudio.stopTone) vAudio.stopTone();

      if (this.activeTimers) {
        this.activeTimers.forEach(t => clearTimeout(t));
        this.activeTimers.length = 0;
      }

      await new Promise(r => setTimeout(r, 120));
      if (vGPIO && vGPIO.cleanup) vGPIO.cleanup();
      this.isRunning = false;
      this.emitState('stopped');
    }

    pause() {
      if (this.isRunning) {
        this.isPaused = true;
        this.emitState('paused');
        this.emitOutput('info', '[PyRunner] Execution paused.');
      }
    }

    resume() {
      if (this.isRunning && this.isPaused) {
        this.isPaused = false;
        this.emitState('running');
        this.emitOutput('info', '[PyRunner] Execution resumed.');
      }
    }
  }

  const pythonRunner = new PythonSimulatorRunner();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PythonSimulatorRunner, pythonRunner };
  }
  global.PythonRunner = pythonRunner;
  global.PythonSimulatorRunner = PythonSimulatorRunner;
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
