// Main Application Controller for SunFounder DaVinci Kit Simulator
// Connects UI, Lessons, Virtual GPIO, Components, Breadboard, and Python Runner

(function(global) {
  'use strict';

  class DaVinciApp {
    constructor() {
      this.lessons = global.DAVINCI_LESSONS || [];
      this.currentLesson = null;
      this.activeTab = 'workbench'; // 'workbench', 'wiring', 'schematic', 'video', 'pinout', 'code'
      this.activeHardware = 'pi2b'; // 'pi2b' (RPi.GPIO) or 'pi5' (gpiozero)
    }

    init() {
      console.log(`[DaVinciApp] Initializing simulator with ${this.lessons.length} lessons...`);
      
      this.cacheDom();
      this.populateLessonSelector();
      this.bindEvents();
      this.setupRunnerCallbacks();

      // Initialize subviews
      if (global.ComponentsView) {
        global.ComponentsView.init(this.dom.componentsContainer);
      }
      if (global.BreadboardView) {
        global.BreadboardView.init(this.dom.breadboardContainer);
      }
      if (global.CreativeLabView && this.dom.creativeContainer) {
        global.CreativeLabView.init(this.dom.creativeContainer);
      }

      // Load initial lesson (1.1.1 Blinking LED)
      this.selectLesson('1.1.1');
      this.renderPinoutTable();
    }

    cacheDom() {
      this.dom = {
        lessonSelect: document.getElementById('lesson-select'),
        categoryFilters: document.querySelectorAll('.cat-filter-btn'),
        tabButtons: document.querySelectorAll('.nav-tab-btn'),
        tabPanels: document.querySelectorAll('.tab-panel'),
        
        // Workbench
        componentsContainer: document.getElementById('components-view-mount'),
        breadboardContainer: document.getElementById('breadboard-view-mount'),
        creativeContainer: document.getElementById('creative-lab-mount'),
        
        // Execution controls
        btnRun: document.getElementById('btn-run-code'),
        btnPause: document.getElementById('btn-pause-code'),
        btnStop: document.getElementById('btn-stop-code'),
        speedSelect: document.getElementById('speed-select'),
        runStatusBadge: document.getElementById('run-status-badge'),

        // Media & Docs Tabs
        wiringImage: document.getElementById('wiring-diagram-img'),
        wiringFallback: document.getElementById('wiring-fallback-text'),
        compListImage: document.getElementById('comp-list-img'),
        allWebImagesCard: document.getElementById('all-web-images-card'),
        allWebImagesGrid: document.getElementById('all-web-images-grid'),
        schematicImage: document.getElementById('schematic-diagram-img'),
        phenomImage: document.getElementById('phenomenon-img'),
        ytIframe: document.getElementById('yt-video-frame'),
        ytTitle: document.getElementById('yt-video-title'),
        ytLink: document.getElementById('yt-external-link'),

        // Hardware Architecture Switcher
        hwBtnPi2b: document.getElementById('hw-btn-pi2b'),
        hwBtnPi5: document.getElementById('hw-btn-pi5'),

        // Code Editor
        codeTextarea: document.getElementById('python-code-editor'),
        btnResetCode: document.getElementById('btn-reset-code'),
        editorHwBadge: document.getElementById('editor-hw-badge'),
        editorFilenameText: document.getElementById('editor-filename-text'),
        btnOpenDoc: document.getElementById('btn-open-doc'),

        // Terminal
        terminalBody: document.getElementById('terminal-logs'),
        btnClearTerminal: document.getElementById('btn-clear-terminal'),
        pinoutTableBody: document.getElementById('pinout-table-body')
      };
    }

    populateLessonSelector(category = 'all') {
      const select = this.dom.lessonSelect;
      if (!select) return;

      select.innerHTML = '';
      const filtered = category === 'all' 
        ? this.lessons 
        : this.lessons.filter(l => l.category.toLowerCase() === category.toLowerCase());

      filtered.forEach(lesson => {
        const opt = document.createElement('option');
        opt.value = lesson.id;
        opt.textContent = `${lesson.id} - ${lesson.title} (${lesson.category})`;
        select.appendChild(opt);
      });
    }

    selectLesson(lessonId) {
      const lesson = this.lessons.find(l => l.id === lessonId);
      if (!lesson) return;

      // Stop any running execution before switching
      if (global.PythonRunner && global.PythonRunner.isRunning) {
        global.PythonRunner.stop();
      }

      this.currentLesson = lesson;
      global.currentLessonId = lesson.id;

      // Update selector
      if (this.dom.lessonSelect) {
        this.dom.lessonSelect.value = lesson.id;
      }

      // Update interactive views
      if (global.ComponentsView) {
        global.ComponentsView.renderForLesson(lesson);
      }
      if (global.BreadboardView) {
        global.BreadboardView.setLesson(lesson);
      }

      // Update Media Tabs
      this.updateMediaTabs(lesson);

      // Populate Code Editor & Metadata for Active Hardware
      this.updateEditorForHardware();

      this.logTerminal('info', `Switched to Lesson ${lesson.id}: ${lesson.title}`);
    }

    setHardware(hw) {
      if (hw !== 'pi2b' && hw !== 'pi5') return;
      this.activeHardware = hw;

      // Update button toggle classes
      if (this.dom.hwBtnPi2b) this.dom.hwBtnPi2b.classList.toggle('active', hw === 'pi2b');
      if (this.dom.hwBtnPi5) this.dom.hwBtnPi5.classList.toggle('active', hw === 'pi5');

      // Update Breadboard SVG title & subtitle
      if (global.BreadboardView && typeof global.BreadboardView.setHardwareModel === 'function') {
        global.BreadboardView.setHardwareModel(hw);
      }

      // Update Code Editor, badges, and documentation URLs
      this.updateEditorForHardware();

      const hwLabel = hw === 'pi5' ? 'Raspberry Pi 5 (gpiozero stack)' : 'Raspberry Pi 2B / 3 / 4 (RPi.GPIO stack)';
      this.logTerminal('info', `Target architecture switched to: ${hwLabel}`);
    }

    updateEditorForHardware() {
      if (!this.currentLesson) return;
      const isPi5 = this.activeHardware === 'pi5';

      // Update Badge
      if (this.dom.editorHwBadge) {
        this.dom.editorHwBadge.textContent = isPi5 ? '🚀 Pi 5 (gpiozero)' : '🍓 Pi 2B/3/4 (RPi.GPIO)';
        this.dom.editorHwBadge.className = isPi5 ? 'hw-badge-text pi5' : 'hw-badge-text pi2b';
      }

      // Update Filename
      if (this.dom.editorFilenameText) {
        const fname = isPi5 
          ? (this.currentLesson.python_file_pi5 || this.currentLesson.python_file || 'main.py')
          : (this.currentLesson.python_file || 'main.py');
        this.dom.editorFilenameText.textContent = fname;
      }

      // Update Documentation URL
      if (this.dom.btnOpenDoc) {
        const docUrl = (isPi5 && this.currentLesson.doc_url_pi5)
          ? this.currentLesson.doc_url_pi5
          : (this.currentLesson.url || 'https://docs.sunfounder.com/projects/davinci-kit/en/latest/');
        this.dom.btnOpenDoc.href = docUrl;
      }

      // Populate Python Code
      if (this.dom.codeTextarea) {
        const code = isPi5
          ? (this.currentLesson.python_code_pi5 || this.currentLesson.python_code || '# No Python code available for Pi 5')
          : (this.currentLesson.python_code || '# No Python code available');
        this.dom.codeTextarea.value = code;
      }
    }

    loadCreativeConcept(concept) {
      if (!concept) return;

      // Stop any running execution
      if (global.PythonRunner && global.PythonRunner.isRunning) {
        global.PythonRunner.stop();
      }

      // Synthesize custom lesson structure
      const customLesson = {
        id: concept.id || 'creative-custom',
        title: concept.title,
        category: concept.category || 'Creative Inventions',
        bcm_pins: concept.bcm_pins || [17, 18, 27],
        python_code: concept.python_code || '# No code provided',
        wiring_image: null,
        schematic_image: null,
        url: 'https://docs.sunfounder.com/projects/davinci-kit/en/latest/',
        breadboard_spec: concept.breadboard_spec || {
          power_jumpers: [
            { from: { col: 1, row: 'bot_minus' }, to: { col: 1, row: 'top_minus' }, color: '#2196f3' },
            { from: { col: 1, row: 'bot_plus' }, to: { col: 1, row: 'top_plus' }, color: '#e53935' }
          ],
          components: (concept.components || []).map((cp, idx) => ({
            type: 'module',
            startCol: 22 + idx * 3,
            label: cp.split(' ')[0]
          })),
          wires: (concept.bcm_pins || [17, 18, 27]).map((bcm, idx) => {
            const pinout = global.RPi2B_Pinout;
            const phys = pinout ? pinout.bcmToPhysical(bcm) : 11;
            const place = pinout ? pinout.getCobblerPlacement(phys) : { col: 6, pinRow: 'C' };
            return {
              from: { col: place ? place.col : 6, row: place ? place.pinRow : 'C' },
              to: { col: 22 + idx * 3, row: 'A' },
              color: '#00e676',
              bcm: bcm,
              label: `GPIO ${bcm}`
            };
          })
        },
        wiring_steps: (concept.components || []).map((cp) => ({
          text: `Wire ${cp} signal and power rails`,
          color: '#00e676'
        }))
      };

      this.currentLesson = customLesson;
      global.currentLessonId = customLesson.id;

      // Update interactive views
      if (global.ComponentsView) {
        global.ComponentsView.renderForLesson(customLesson);
      }
      if (global.BreadboardView) {
        global.BreadboardView.setLesson(customLesson);
      }

      // Update Code Editor
      if (this.dom.codeTextarea) {
        this.dom.codeTextarea.value = customLesson.python_code;
      }
      if (this.dom.editorHwBadge) {
        this.dom.editorHwBadge.textContent = '💡 Creative Lab Prototype';
        this.dom.editorHwBadge.className = 'hw-badge-text pi5';
      }
      if (this.dom.editorFilenameText) {
        this.dom.editorFilenameText.textContent = `${concept.id || 'creative_prototype'}.py`;
      }

      // Switch to Workbench Tab
      this.switchTab('workbench');

      this.logTerminal('info', `[Creative Lab] Loaded concept "${concept.title}" into simulator!`);
      this.logTerminal('info', `Combined Parts: ${(concept.components || []).join(', ')}`);
      this.logTerminal('info', `Press "Run Simulation (F5)" to test code execution.`);
    }

    updateMediaTabs(lesson) {
      // Wiring Tab
      if (this.dom.wiringImage) {
        if (lesson.wiring_image) {
          this.dom.wiringImage.src = lesson.wiring_image;
          this.dom.wiringImage.style.display = 'block';
          if (this.dom.wiringFallback) this.dom.wiringFallback.style.display = 'none';
        } else {
          this.dom.wiringImage.style.display = 'none';
          if (this.dom.wiringFallback) this.dom.wiringFallback.style.display = 'block';
        }
      }
      if (this.dom.compListImage) {
        if (lesson.component_image) {
          this.dom.compListImage.src = lesson.component_image;
          this.dom.compListImage.parentElement.style.display = 'block';
        } else {
          this.dom.compListImage.parentElement.style.display = 'none';
        }
      }

      if (this.dom.allWebImagesGrid) {
        this.dom.allWebImagesGrid.innerHTML = '';
        const allImgs = lesson.all_images || [];
        if (this.dom.allWebImagesCard) {
          this.dom.allWebImagesCard.style.display = allImgs.length > 0 ? 'flex' : 'none';
        }
        allImgs.forEach((url, idx) => {
          const item = document.createElement('div');
          item.className = 'wiring-extra-item';
          const fname = url.split('/').pop() || `Figure ${idx + 1}`;
          item.innerHTML = `<img class="diagram-img" src="${url}" alt="${fname}"><span class="extra-img-caption">${idx + 1}. ${fname}</span>`;
          this.dom.allWebImagesGrid.appendChild(item);
        });
      }

      // Schematic Tab
      if (this.dom.schematicImage) {
        if (lesson.schematic_image) {
          this.dom.schematicImage.src = lesson.schematic_image;
          this.dom.schematicImage.style.display = 'block';
        } else {
          this.dom.schematicImage.style.display = 'none';
        }
      }
      if (this.dom.phenomImage) {
        if (lesson.phenomenon_image) {
          this.dom.phenomImage.src = lesson.phenomenon_image;
          this.dom.phenomImage.parentElement.style.display = 'block';
        } else {
          this.dom.phenomImage.parentElement.style.display = 'none';
        }
      }

      // Video Tab
      if (this.dom.ytIframe && lesson.youtube_id) {
        this.dom.ytIframe.src = `https://www.youtube.com/embed/${lesson.youtube_id}`;
      }
      if (this.dom.ytTitle) {
        this.dom.ytTitle.textContent = lesson.youtube_title || `${lesson.title} Video Tutorial`;
      }
      if (this.dom.ytLink && lesson.youtube_id) {
        this.dom.ytLink.href = `https://www.youtube.com/watch?v=${lesson.youtube_id}`;
      }
    }

    bindEvents() {
      // Lesson dropdown change
      if (this.dom.lessonSelect) {
        this.dom.lessonSelect.onchange = (e) => {
          this.selectLesson(e.target.value);
        };
      }

      // Category filters
      this.dom.categoryFilters.forEach(btn => {
        btn.onclick = (e) => {
          this.dom.categoryFilters.forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          const cat = e.target.dataset.cat;
          this.populateLessonSelector(cat);
          if (this.dom.lessonSelect.options.length > 0) {
            this.selectLesson(this.dom.lessonSelect.options[0].value);
          }
        };
      });

      // Tab navigation
      this.dom.tabButtons.forEach(btn => {
        btn.onclick = (e) => {
          const tabId = e.currentTarget.dataset.tab;
          this.switchTab(tabId);
        };
      });

      // Run / Pause / Stop controls
      if (this.dom.btnRun) {
        this.dom.btnRun.onclick = () => this.runCurrentCode();
      }
      if (this.dom.btnPause) {
        this.dom.btnPause.onclick = () => {
          if (!global.PythonRunner) return;
          if (global.PythonRunner.isPaused) {
            global.PythonRunner.resume();
          } else {
            global.PythonRunner.pause();
          }
        };
      }
      if (this.dom.btnStop) {
        this.dom.btnStop.onclick = () => {
          if (global.PythonRunner) {
            this.logTerminal('warn', '[PyRunner] Stop requested by user...');
            global.PythonRunner.stop();
          }
        };
      }

      // Simulation Speed selector
      if (this.dom.speedSelect) {
        this.dom.speedSelect.onchange = (e) => {
          const mult = parseFloat(e.target.value);
          if (global.PythonRunner) global.PythonRunner.setSpeed(mult);
          this.logTerminal('info', `Simulation speed set to ${mult}x`);
        };
      }

      // Reset code to official
      if (this.dom.btnResetCode) {
        this.dom.btnResetCode.onclick = () => {
          if (this.currentLesson && this.dom.codeTextarea) {
            const isPi5 = this.activeHardware === 'pi5';
            const code = isPi5
              ? (this.currentLesson.python_code_pi5 || this.currentLesson.python_code || '')
              : (this.currentLesson.python_code || '');
            this.dom.codeTextarea.value = code;
            const targetArch = isPi5 ? 'Pi 5 (gpiozero)' : 'Pi 2B / 3 / 4 (RPi.GPIO)';
            this.logTerminal('info', `Code editor reset to official SunFounder ${targetArch} code.`);
          }
        };
      }

      // Target Hardware Architecture Switcher
      if (this.dom.hwBtnPi2b) {
        this.dom.hwBtnPi2b.onclick = () => this.setHardware('pi2b');
      }
      if (this.dom.hwBtnPi5) {
        this.dom.hwBtnPi5.onclick = () => this.setHardware('pi5');
      }

      // Clear terminal
      if (this.dom.btnClearTerminal) {
        this.dom.btnClearTerminal.onclick = () => {
          if (this.dom.terminalBody) this.dom.terminalBody.innerHTML = '';
        };
      }

      // Keyboard shortcuts: F5 / Ctrl+Enter = Run, Shift+F5 / Esc = Stop
      window.addEventListener('keydown', (e) => {
        if ((e.key === 'F5' && !e.shiftKey) || (e.ctrlKey && e.key === 'Enter')) {
          e.preventDefault();
          this.runCurrentCode();
        } else if ((e.key === 'F5' && e.shiftKey) || e.key === 'Escape') {
          if (global.PythonRunner && global.PythonRunner.isRunning) {
            e.preventDefault();
            global.PythonRunner.stop();
          }
        }
      });
    }

    switchTab(tabId) {
      this.activeTab = tabId;
      this.dom.tabButtons.forEach(b => {
        b.classList.toggle('active', b.dataset.tab === tabId);
      });
      this.dom.tabPanels.forEach(p => {
        p.classList.toggle('active', p.id === `tab-${tabId}`);
      });
    }

    runCurrentCode() {
      const code = this.dom.codeTextarea ? this.dom.codeTextarea.value : '';
      if (!code.trim()) {
        this.logTerminal('warn', 'Code editor is empty!');
        return;
      }
      if (global.PythonRunner) {
        global.PythonRunner.runCode(code);
      }
    }

    setupRunnerCallbacks() {
      const runner = global.PythonRunner;
      if (!runner) return;

      runner.onOutput((type, text) => {
        this.logTerminal(type, text);
      });

      runner.onStateChange((state) => {
        if (!this.dom.runStatusBadge) return;
        if (state === 'running') {
          this.dom.runStatusBadge.textContent = 'RUNNING';
          this.dom.runStatusBadge.className = 'status-badge running';
          if (this.dom.btnRun) this.dom.btnRun.disabled = true;
          if (this.dom.btnPause) {
            this.dom.btnPause.disabled = false;
            this.dom.btnPause.textContent = 'Pause';
          }
          if (this.dom.btnStop) this.dom.btnStop.disabled = false;
        } else if (state === 'stopping') {
          this.dom.runStatusBadge.textContent = 'STOPPING...';
          this.dom.runStatusBadge.className = 'status-badge stopping';
          if (this.dom.btnRun) this.dom.btnRun.disabled = true;
          if (this.dom.btnPause) this.dom.btnPause.disabled = true;
          if (this.dom.btnStop) this.dom.btnStop.disabled = true;
        } else if (state === 'paused') {
          this.dom.runStatusBadge.textContent = 'PAUSED';
          this.dom.runStatusBadge.className = 'status-badge paused';
          if (this.dom.btnPause) this.dom.btnPause.textContent = 'Resume';
        } else {
          this.dom.runStatusBadge.textContent = 'IDLE';
          this.dom.runStatusBadge.className = 'status-badge idle';
          if (this.dom.btnRun) this.dom.btnRun.disabled = false;
          if (this.dom.btnPause) {
            this.dom.btnPause.disabled = true;
            this.dom.btnPause.textContent = 'Pause';
          }
          if (this.dom.btnStop) this.dom.btnStop.disabled = true;
        }
      });
    }

    logTerminal(type, text) {
      const term = this.dom.terminalBody;
      if (!term) return;

      if (type === 'clear') {
        term.innerHTML = '';
        return;
      }

      const row = document.createElement('div');
      row.className = `term-line ${type}`;

      const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
      row.innerHTML = `<span class="term-time">[${timeStr}]</span> <span class="term-msg">${this.escapeHtml(text)}</span>`;
      term.appendChild(row);

      // Auto-scroll to bottom
      term.scrollTop = term.scrollHeight;
    }

    escapeHtml(str) {
      return String(str).replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
    }

    renderPinoutTable() {
      const tbody = this.dom.pinoutTableBody;
      const pinout = global.RPi2B_Pinout;
      if (!tbody || !pinout) return;

      tbody.innerHTML = '';
      // Group pins into pairs (Odd: left col, Even: right col)
      for (let r = 0; r < 20; r++) {
        const pOdd = pinout.getPin(r * 2 + 1);
        const pEven = pinout.getPin(r * 2 + 2);

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="pin-cell ${pOdd.type}">
            <strong>${pOdd.name}</strong>
            ${pOdd.bcm !== null ? `<span class="pin-tag">BCM ${pOdd.bcm}</span>` : ''}
          </td>
          <td class="pin-num num-odd">${pOdd.pin}</td>
          <td class="pin-num num-even">${pEven.pin}</td>
          <td class="pin-cell ${pEven.type}">
            <strong>${pEven.name}</strong>
            ${pEven.bcm !== null ? `<span class="pin-tag">BCM ${pEven.bcm}</span>` : ''}
          </td>
        `;
        tbody.appendChild(tr);
      }
    }
  }

  const app = new DaVinciApp();

  window.addEventListener('DOMContentLoaded', () => {
    app.init();
  });

  global.DaVinciApp = app;
})(typeof window !== 'undefined' ? window : this);
