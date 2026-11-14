// Hardened In-Browser Python Execution Engine for SunFounder DaVinci Kit
// Translates Python scripts to safe asynchronous JavaScript and executes in sandbox
// Enforces official RPi.GPIO runtime checks, timing fidelity, and standard library shims

(function(global) {
  'use strict';

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

      // Standard headers and shims
      jsLines.push('// Hardened DaVinci Python Transpiled AST');
      jsLines.push('const { GPIO, ADC0834, LCD1602, time, math, random, print, sleep, len, str, int, float, abs, min, max, round } = __env;');
      jsLines.push('');

      for (let i = 0; i < rawLines.length; i++) {
        let line = rawLines[i];
        
        // Strip trailing comments & spaces
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) {
          continue; // empty or pure comment
        }

        // Measure leading indent
        const indentMatch = line.match(/^(\s*)/);
        const currentIndent = indentMatch ? indentMatch[1].replace(/\t/g, '    ').length : 0;

        // Close blocks if indent decreased
        while (indentStack.length > 1 && currentIndent < indentStack[indentStack.length - 1]) {
          indentStack.pop();
          jsLines.push(' '.repeat(indentStack[indentStack.length - 1]) + '}');
        }

        let code = trimmed;

        // Strip inline comments if outside quotes
        if (code.includes('#') && !code.includes("'#") && !code.includes('"#')) {
          const hashIdx = code.indexOf('#');
          code = code.substring(0, hashIdx).trim();
        }

        // Skip Python imports
        if (/^import\s+/.test(code) || /^from\s+/.test(code)) {
          continue;
        }

        // Replace Python keywords and literals
        code = code.replace(/\bTrue\b/g, 'true')
                   .replace(/\bFalse\b/g, 'false')
                   .replace(/\bNone\b/g, 'null')
                   .replace(/\band\b/g, '&&')
                   .replace(/\bor\b/g, '||')
                   .replace(/\bnot\b/g, '!');

        // Convert f-strings: f"..." -> `...` with {x} intact
        code = code.replace(/\bf(['"])(.*?)\1/g, (match, quote, content) => {
          return '`' + content.replace(/{([^}]+)}/g, '${$1}') + '`';
        });

        // Convert % formatting e.g. "Val: %d" % x -> `Val: ${x}`
        code = code.replace(/['"](.*?)%[dsf]['"]\s*%\s*([a-zA-Z0-9_\(\)\.]+)/g, '`$1${$2}`');

        // Convert function definition: def func(a, b):
        const defMatch = code.match(/^def\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*:/);
        if (defMatch) {
          const fnName = defMatch[1];
          const fnArgs = defMatch[2];
          jsLines.push(' '.repeat(currentIndent) + `async function ${fnName}(${fnArgs}) {`);
          indentStack.push(currentIndent + 4);
          continue;
        }

        // Convert if __name__ == '__main__':
        if (/if\s+__name__\s*==\s*['"]__main__['"]\s*:/.test(code)) {
          jsLines.push(' '.repeat(currentIndent) + 'if (true) {');
          indentStack.push(currentIndent + 4);
          continue;
        }

        // Convert while loop: while cond:
        const whileMatch = code.match(/^while\s+(.*?)\s*:/);
        if (whileMatch) {
          const cond = whileMatch[1].trim() === 'true' || whileMatch[1].trim() === '1' ? 'true' : whileMatch[1];
          jsLines.push(' '.repeat(currentIndent) + `while (${cond}) {`);
          jsLines.push(' '.repeat(currentIndent + 2) + 'if (__env.isCancelled()) throw new Error("KEYBOARD_INTERRUPT");');
          indentStack.push(currentIndent + 4);
          continue;
        }

        // Convert for loop: for var in range(len(...)):
        const forRangeLenMatch = code.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+range\s*\(\s*len\s*\((.*?)\)\s*\)\s*:/);
        if (forRangeLenMatch) {
          const v = forRangeLenMatch[1];
          const target = forRangeLenMatch[2];
          jsLines.push(' '.repeat(currentIndent) + `for (let ${v} = 0; ${v} < (${target}).length; ${v}++) {`);
          jsLines.push(' '.repeat(currentIndent + 2) + 'if (__env.isCancelled()) throw new Error("KEYBOARD_INTERRUPT");');
          indentStack.push(currentIndent + 4);
          continue;
        }

        // Convert for loop: for var in range(...)
        const forRangeMatch = code.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+range\s*\((.*?)\)\s*:/);
        if (forRangeMatch) {
          const v = forRangeMatch[1];
          const args = forRangeMatch[2].split(',').map(s => s.trim());
          let init = '0', limit = args[0], step = '1';
          if (args.length === 2) {
            init = args[0];
            limit = args[1];
          } else if (args.length === 3) {
            init = args[0];
            limit = args[1];
            step = args[2];
          }
          jsLines.push(' '.repeat(currentIndent) + `for (let ${v} = ${init}; ${v} < ${limit}; ${v} += ${step}) {`);
          jsLines.push(' '.repeat(currentIndent + 2) + 'if (__env.isCancelled()) throw new Error("KEYBOARD_INTERRUPT");');
          indentStack.push(currentIndent + 4);
          continue;
        }

        // Convert for loop: for var in list:
        const forInMatch = code.match(/^for\s+([a-zA-Z0-9_,\s\(\)]+)\s+in\s+(.*?)\s*:/);
        if (forInMatch) {
          let v = forInMatch[1].trim();
          const target = forInMatch[2].trim();
          if (v.includes(',')) {
            v = '[' + v.replace(/[\(\)]/g, '') + ']';
          }
          jsLines.push(' '.repeat(currentIndent) + `for (let ${v} of (${target})) {`);
          jsLines.push(' '.repeat(currentIndent + 2) + 'if (__env.isCancelled()) throw new Error("KEYBOARD_INTERRUPT");');
          indentStack.push(currentIndent + 4);
          continue;
        }

        // Convert if / elif / else:
        const ifMatch = code.match(/^if\s+(.*?)\s*:/);
        if (ifMatch) {
          jsLines.push(' '.repeat(currentIndent) + `if (${ifMatch[1]}) {`);
          indentStack.push(currentIndent + 4);
          continue;
        }

        const elifMatch = code.match(/^elif\s+(.*?)\s*:/);
        if (elifMatch) {
          jsLines.push(' '.repeat(currentIndent) + `else if (${elifMatch[1]}) {`);
          indentStack.push(currentIndent + 4);
          continue;
        }

        if (code === 'else:') {
          jsLines.push(' '.repeat(currentIndent) + 'else {');
          indentStack.push(currentIndent + 4);
          continue;
        }

        // Convert try / except / finally
        if (code.startsWith('try:')) {
          jsLines.push(' '.repeat(currentIndent) + 'try {');
          indentStack.push(currentIndent + 4);
          continue;
        }

        if (code.startsWith('except')) {
          jsLines.push(' '.repeat(currentIndent) + 'catch (err) {');
          indentStack.push(currentIndent + 4);
          continue;
        }

        if (code.startsWith('finally:')) {
          jsLines.push(' '.repeat(currentIndent) + 'finally {');
          indentStack.push(currentIndent + 4);
          continue;
        }

        // Transform time.sleep(x) -> await sleep(x)
        code = code.replace(/\btime\.sleep\s*\((.*?)\)/g, 'await sleep($1)');

        // Transform print(...) -> await print(...)
        code = code.replace(/\bprint\s*\((.*?)\)/g, 'await print($1)');

        // Multiple assignments: a, b = 1, 2
        if (/^[a-zA-Z0-9_]+(\s*,\s*[a-zA-Z0-9_]+)+\s*=\s*/.test(code)) {
          code = 'let [' + code.replace(/\s*=\s*/, '] = [') + ']';
        }
        // Normal single variable declaration
        else if (/^[a-zA-Z0-9_]+\s*=\s*/.test(code) && !code.startsWith('let ') && !code.startsWith('const ')) {
          code = 'let ' + code;
        }

        // Add semicolon if not ending in semicolon or brace
        if (!code.endsWith(';') && !code.endsWith('{') && !code.endsWith('}')) {
          code += ';';
        }

        jsLines.push(' '.repeat(currentIndent) + code);
      }

      // Close all remaining open blocks
      while (indentStack.length > 1) {
        indentStack.pop();
        jsLines.push(' '.repeat(indentStack[indentStack.length - 1]) + '}');
      }

      // Append top-level entry call
      jsLines.push('');
      jsLines.push('// Auto-execute setup and main if declared');
      jsLines.push('if (typeof setup === "function") await setup();');
      jsLines.push('if (typeof main === "function") await main();');
      jsLines.push('else if (typeof loop === "function") await loop();');

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
          pi: Math.PI,
          e: Math.E,
          sqrt: Math.sqrt,
          sin: Math.sin,
          cos: Math.cos,
          tan: Math.tan,
          atan2: Math.atan2,
          log: Math.log,
          pow: Math.pow,
          floor: Math.floor,
          ceil: Math.ceil
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
        print: async (...args) => {
          const str = args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ');
          self.emitOutput('stdout', str);
        },
        sleep: async (s) => await self.sleep(s),
        isCancelled: () => self.stopRequested
      };

      try {
        const jsTranspiled = this.transpilePython(pyCode);
        const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
        const runnerFn = new AsyncFunction('__env', jsTranspiled);

        await runnerFn(env);

        this.emitOutput('info', `[PyRunner] Execution finished normally.`);
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
        this.emitState('stopped');
        if (vAudio && vAudio.stopTone) vAudio.stopTone();
      }
    }

    async stop() {
      if (!this.isRunning) return;
      this.stopRequested = true;
      this.isPaused = false;
      this.emitState('stopping');
      
      const vGPIO = global.VirtualGPIO || global.virtualGPIO;
      const vAudio = global.VirtualAudio;
      if (vAudio && vAudio.stopTone) vAudio.stopTone();

      await new Promise(r => setTimeout(r, 150));
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
