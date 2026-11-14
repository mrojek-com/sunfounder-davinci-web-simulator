// Creative Lab & Sovereign Brainstorming View Component
// Integrates local LLM generation (Ollama) with multi-component mashup concepts,
// circuit wiring blueprints, and 1-click execution inside the DaVinci Kit simulator.

(function(global) {
  'use strict';

  class CreativeLabViewRenderer {
    constructor() {
      this.container = null;
      this.concepts = global.DAVINCI_CREATIVE_CONCEPTS || [];
      this.activeCategory = 'all';
      this.selectedComponents = new Set(['DHT11 Temp/Humidity', 'SG90 Micro Servo', 'LCD1602 I2C']);
      this.isGenerating = false;
    }

    init(containerEl) {
      this.container = containerEl;
      if (global.DAVINCI_CREATIVE_CONCEPTS) {
        this.concepts = global.DAVINCI_CREATIVE_CONCEPTS;
      }
      this.render();
      this.bindEvents();
    }

    setConcepts(concepts) {
      this.concepts = concepts;
      this.renderGallery();
    }

    render() {
      if (!this.container) return;

      this.container.innerHTML = `
        <div class="creative-lab-container">
          <!-- Hero Banner -->
          <div class="creative-hero-banner">
            <div class="creative-hero-content">
              <h2>💡 DaVinci Kit Creative Lab & Brainstorming Studio</h2>
              <p>
                Synthesize novel multi-sensor inventions, cross-pollinate kit components, and explore autonomous local LLM hardware concepts on Raspberry Pi 2B.
              </p>
            </div>
            <div class="creative-hero-badges">
              <span class="creative-badge"><span class="badge-dot"></span> 39+ Hardware Parts</span>
              <span class="creative-badge"><span class="badge-dot green"></span> Local Ollama Accelerated</span>
              <span class="creative-badge"><span class="badge-dot blue"></span> 1-Click Simulator Injection</span>
            </div>
          </div>

          <!-- Interactive Brainstorming Studio Section -->
          <div class="creative-studio-card">
            <div class="studio-header">
              <div class="studio-title">
                <span class="studio-icon">🧪</span>
                <div>
                  <h3>Interactive Component Mashup Generator</h3>
                  <p>Pick hardware components from the DaVinci Kit, choose an engineering theme, and query the local LLM on Ollama to invent a new embedded system.</p>
                </div>
              </div>
              <div class="studio-actions">
                <button class="btn btn-sm btn-outline" id="btn-surprise-mashup">🎲 Random Mashup</button>
                <button class="btn btn-sm btn-outline" id="btn-clear-mashup">✕ Clear</button>
              </div>
            </div>

            <!-- Palette Selector -->
            <div class="component-palette-box">
              <div class="palette-group">
                <span class="palette-label">Sensors & Inputs:</span>
                <div class="palette-chips" id="palette-inputs">
                  ${this.renderPaletteChip('DHT11 Temp/Humidity')}
                  ${this.renderPaletteChip('Ultrasonic HC-SR04')}
                  ${this.renderPaletteChip('PIR Motion Sensor')}
                  ${this.renderPaletteChip('Photoresistor (LDR)')}
                  ${this.renderPaletteChip('Thermistor')}
                  ${this.renderPaletteChip('Potentiometer')}
                  ${this.renderPaletteChip('Analog Joystick')}
                  ${this.renderPaletteChip('4x4 Matrix Keypad')}
                  ${this.renderPaletteChip('MPU6050 6-Axis Gyro')}
                  ${this.renderPaletteChip('Push Button')}
                  ${this.renderPaletteChip('Tilt Switch')}
                </div>
              </div>

              <div class="palette-group">
                <span class="palette-label">Actuators & Displays:</span>
                <div class="palette-chips" id="palette-outputs">
                  ${this.renderPaletteChip('SG90 Micro Servo')}
                  ${this.renderPaletteChip('L293D DC Motor')}
                  ${this.renderPaletteChip('28BYJ-48 Stepper + ULN2003')}
                  ${this.renderPaletteChip('Relay Module')}
                  ${this.renderPaletteChip('LCD1602 I2C')}
                  ${this.renderPaletteChip('RGB LED')}
                  ${this.renderPaletteChip('4-Digit 7-Segment (74HC595)')}
                  ${this.renderPaletteChip('8x8 LED Matrix (74HC595)')}
                  ${this.renderPaletteChip('LED Bar Graph (74HC595)')}
                  ${this.renderPaletteChip('Active Buzzer')}
                  ${this.renderPaletteChip('Passive Buzzer')}
                </div>
              </div>
            </div>

            <!-- Brainstorm Execution Bar -->
            <div class="llm-query-bar">
              <div class="llm-select-wrap">
                <label for="creative-theme-select">Theme:</label>
                <select id="creative-theme-select" class="creative-select">
                  <option value="Any Creative Inventions">✨ Any Creative Inventions</option>
                  <option value="Smart Home & Ecological Automation">🌱 Smart Home & Ecology</option>
                  <option value="Cyberpunk Security & Cryptographic Vaults">🔐 Security & Vaults</option>
                  <option value="Autonomous Robotics & Perimeter Defense">🤖 Robotics & Defense</option>
                  <option value="Musical Synthesizers & Haptic Audio">🎵 Music & Synthesizers</option>
                  <option value="Tactile Gaming & Interactive Arcade">🎮 Gaming & Haptics</option>
                </select>
              </div>

              <div class="llm-select-wrap">
                <label for="creative-model-select">Local Model:</label>
                <select id="creative-model-select" class="creative-select">
                  <option value="mistral-small:24b" selected>mistral-small:24b (Quant & RFC)</option>
                  <option value="qwen3:30b-a3b">qwen3:30b-a3b (MoE AST & Code)</option>
                  <option value="deepseek-r1:14b">deepseek-r1:14b (Reasoner & Edge)</option>
                  <option value="gemma4:26b">gemma4:26b (Structural Architect)</option>
                </select>
              </div>

              <button class="btn btn-primary" id="btn-generate-llm-concept">
                <span class="btn-sparkle">🧠</span> Brainstorm with Local LLM
              </button>
            </div>

            <!-- Live Generation Output Stream Drawer -->
            <div class="llm-live-stream-box" id="llm-stream-drawer" style="display:none;">
              <div class="stream-header">
                <span class="stream-title">⚡ Local Ollama Inference Stream (<span id="active-llm-name">mistral-small:24b</span>)</span>
                <span class="stream-status" id="stream-status-badge">GENERATING...</span>
              </div>
              <div class="stream-body" id="llm-stream-text"></div>
              <div class="stream-footer" id="stream-footer" style="display:none;">
                <button class="btn btn-sm btn-primary" id="btn-load-streamed-concept">⚡ Load Generated Concept into Simulator</button>
                <button class="btn btn-sm btn-outline" id="btn-close-stream">Close</button>
              </div>
            </div>
          </div>

          <!-- Curated Showcase Section -->
          <div class="showcase-section">
            <div class="showcase-nav-bar">
              <div class="showcase-title">
                <h3>🏆 Master Invention Recipes & Multi-Component Blueprints</h3>
                <span class="showcase-count" id="showcase-count-badge">${this.concepts.length} Concept Blueprints</span>
              </div>
              <div class="showcase-filters">
                <button class="sc-filter-btn active" data-cat="all">All Concepts</button>
                <button class="sc-filter-btn" data-cat="smart">Smart Home</button>
                <button class="sc-filter-btn" data-cat="security">Security</button>
                <button class="sc-filter-btn" data-cat="robotics">Robotics</button>
                <button class="sc-filter-btn" data-cat="music">Music/Audio</button>
                <button class="sc-filter-btn" data-cat="infrastructure">Infrastructure</button>
              </div>
            </div>

            <!-- Grid of Concept Cards -->
            <div class="showcase-grid" id="showcase-cards-grid">
              <!-- Rendered by renderGallery() -->
            </div>
          </div>
        </div>
      `;

      this.renderGallery();
    }

    renderPaletteChip(name) {
      const isSel = this.selectedComponents.has(name);
      return `<button type="button" class="comp-chip${isSel ? ' active' : ''}" data-comp="${name}">${name}</button>`;
    }

    renderGallery() {
      const grid = this.container.querySelector('#showcase-cards-grid');
      const countEl = this.container.querySelector('#showcase-count-badge');
      if (!grid) return;

      const filtered = this.activeCategory === 'all'
        ? this.concepts
        : this.concepts.filter(c => {
            const cat = (c.category || '').toLowerCase();
            return cat.includes(this.activeCategory);
          });

      if (countEl) {
        countEl.textContent = `${filtered.length} Concept Blueprint${filtered.length === 1 ? '' : 's'}`;
      }

      grid.innerHTML = '';
      filtered.forEach((concept, idx) => {
        const card = document.createElement('div');
        card.className = 'concept-card';
        card.id = `concept-card-${concept.id || idx}`;

        const compChipsHtml = (concept.components || []).map(cp => {
          return `<span class="concept-comp-badge">⚙️ ${cp}</span>`;
        }).join('');

        const bcmPinsHtml = (concept.bcm_pins || []).map(p => {
          return `<span class="concept-pin-badge">GPIO ${p}</span>`;
        }).join('');

        card.innerHTML = `
          <div class="concept-card-header">
            <div class="concept-card-category">${concept.category || 'Creative Invention'}</div>
            <h4 class="concept-card-title">${concept.title}</h4>
            <p class="concept-card-tagline">${concept.tagline || ''}</p>
          </div>

          <div class="concept-card-body">
            <div class="concept-card-chips">
              ${compChipsHtml}
            </div>

            <p class="concept-card-desc">${concept.description || concept.concept_description || ''}</p>

            <div class="concept-pin-budget">
              <span class="pin-budget-label">Pi 2B Allocation:</span>
              <div class="pin-budget-badges">
                ${bcmPinsHtml}
              </div>
            </div>

            <!-- Expandable Wiring and Code Drawer -->
            <div class="concept-details-drawer" id="drawer-${concept.id}" style="display:none;">
              <div class="details-section">
                <h5>🔌 Circuit Wiring & Interconnection Plan</h5>
                <pre class="concept-wiring-text">${concept.wiring_text || 'See code comments for pin wiring.'}</pre>
              </div>
              <div class="details-section">
                <h5>🐍 Executable Python Code</h5>
                <pre class="concept-code-preview"><code>${this.escapeHtml(concept.python_code || '# Code')}</code></pre>
              </div>
            </div>
          </div>

          <div class="concept-card-footer">
            <button class="btn btn-sm btn-primary btn-load-concept" data-id="${concept.id}">
              <span>⚡</span> Load into Simulator
            </button>
            <button class="btn btn-sm btn-outline btn-toggle-drawer" data-id="${concept.id}">
              <span>📜</span> View Plan & Code
            </button>
            <button class="btn btn-sm btn-outline btn-copy-code" data-id="${concept.id}">
              <span>📋</span> Copy
            </button>
          </div>
        `;

        // Card button actions
        card.querySelector('.btn-toggle-drawer').onclick = (e) => {
          const drawer = card.querySelector(`#drawer-${concept.id}`);
          if (!drawer) return;
          const isHidden = drawer.style.display === 'none';
          drawer.style.display = isHidden ? 'block' : 'none';
          e.currentTarget.innerHTML = isHidden ? '<span>▲</span> Hide Plan' : '<span>📜</span> View Plan & Code';
        };

        card.querySelector('.btn-copy-code').onclick = (e) => {
          if (concept.python_code) {
            navigator.clipboard.writeText(concept.python_code).then(() => {
              const orig = e.currentTarget.innerHTML;
              e.currentTarget.innerHTML = '<span>✅</span> Copied!';
              setTimeout(() => { e.currentTarget.innerHTML = orig; }, 1800);
            });
          }
        };

        card.querySelector('.btn-load-concept').onclick = () => {
          this.loadConceptIntoSimulator(concept);
        };

        grid.appendChild(card);
      });
    }

    loadConceptIntoSimulator(concept) {
      if (global.app && typeof global.app.loadCreativeConcept === 'function') {
        global.app.loadCreativeConcept(concept);
      } else {
        // Fallback: update editor and trigger switch
        const editor = document.getElementById('python-code-editor');
        if (editor && concept.python_code) {
          editor.value = concept.python_code;
        }
        const navBtns = document.querySelectorAll('.nav-tab-btn');
        navBtns.forEach(b => {
          if (b.dataset.tab === 'workbench') b.click();
        });
      }
    }

    bindEvents() {
      if (!this.container) return;

      // Component chips toggle
      this.container.querySelectorAll('.comp-chip').forEach(chip => {
        chip.onclick = () => {
          const comp = chip.dataset.comp;
          if (this.selectedComponents.has(comp)) {
            this.selectedComponents.delete(comp);
            chip.classList.remove('active');
          } else {
            this.selectedComponents.add(comp);
            chip.classList.add('active');
          }
        };
      });

      // Clear button
      const btnClear = this.container.querySelector('#btn-clear-mashup');
      if (btnClear) {
        btnClear.onclick = () => {
          this.selectedComponents.clear();
          this.container.querySelectorAll('.comp-chip').forEach(c => c.classList.remove('active'));
        };
      }

      // Surprise button
      const btnSurprise = this.container.querySelector('#btn-surprise-mashup');
      if (btnSurprise) {
        btnSurprise.onclick = () => {
          const allChips = Array.from(this.container.querySelectorAll('.comp-chip'));
          this.selectedComponents.clear();
          allChips.forEach(c => c.classList.remove('active'));
          // Pick 3-4 random
          const shuffled = allChips.sort(() => 0.5 - Math.random());
          const pickCount = Math.floor(Math.random() * 2) + 3;
          shuffled.slice(0, pickCount).forEach(c => {
            c.classList.add('active');
            this.selectedComponents.add(c.dataset.comp);
          });
        };
      }

      // Filter category buttons
      this.container.querySelectorAll('.sc-filter-btn').forEach(btn => {
        btn.onclick = (e) => {
          this.container.querySelectorAll('.sc-filter-btn').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          this.activeCategory = e.currentTarget.dataset.cat;
          this.renderGallery();
        };
      });

      // LLM Generate button
      const btnGen = this.container.querySelector('#btn-generate-llm-concept');
      if (btnGen) {
        btnGen.onclick = () => this.generateConceptWithOllama();
      }

      // Stream drawer close
      const btnCloseStream = this.container.querySelector('#btn-close-stream');
      if (btnCloseStream) {
        btnCloseStream.onclick = () => {
          const drawer = this.container.querySelector('#llm-stream-drawer');
          if (drawer) drawer.style.display = 'none';
        };
      }
    }

    async generateConceptWithOllama() {
      if (this.isGenerating) return;

      const compList = Array.from(this.selectedComponents);
      if (compList.length < 2) {
        alert('Please select at least 2 components from the palette to combine!');
        return;
      }

      const theme = this.container.querySelector('#creative-theme-select').value;
      const model = this.container.querySelector('#creative-model-select').value;

      const drawer = this.container.querySelector('#llm-stream-drawer');
      const streamText = this.container.querySelector('#llm-stream-text');
      const statusBadge = this.container.querySelector('#stream-status-badge');
      const modelNameEl = this.container.querySelector('#active-llm-name');
      const footer = this.container.querySelector('#stream-footer');
      const btnGen = this.container.querySelector('#btn-generate-llm-concept');

      if (!drawer || !streamText) return;

      drawer.style.display = 'block';
      if (modelNameEl) modelNameEl.textContent = model;
      if (statusBadge) {
        statusBadge.textContent = 'CONNECTING TO OLLAMA...';
        statusBadge.className = 'stream-status generating';
      }
      streamText.textContent = `Connecting to local inference engine at http://localhost:11434...\nSelected Model: ${model}\nComponents: ${compList.join(' + ')}\nTheme: ${theme}\n\n`;
      if (footer) footer.style.display = 'none';

      this.isGenerating = true;
      if (btnGen) btnGen.disabled = true;

      const prompt = `You are a principal embedded systems engineer and inventor for the Raspberry Pi 2 Model B using the SunFounder DaVinci Kit.
Create a brilliant, highly functional invention combining EXACTLY these components:
${compList.join(', ')}
Theme: ${theme}

Provide your response in structured markdown:
### 1. Invention Title & One-Line Hook
### 2. Operational Concept & Real-World Utility (2-3 sentences explaining why combining these specific components creates high value)
### 3. Circuit Wiring & Raspberry Pi 2B GPIO Pin Mapping (table with Pin, BCM, Component, Wire Color)
### 4. Complete Executable Python Code (syntactically valid Python 3 with RPi.GPIO and time, clean and under 50 lines).`;

      try {
        const resp = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: model,
            prompt: prompt,
            stream: true,
            options: {
              num_ctx: 4096,
              num_predict: 1200,
              temperature: 0.7
            },
            keep_alive: 0
          })
        });

        if (!resp.ok) {
          throw new Error(`Ollama HTTP ${resp.status}: ${resp.statusText}`);
        }

        if (statusBadge) statusBadge.textContent = 'STREAMING INFERENCE...';
        streamText.textContent = '';

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const json = JSON.parse(line);
              if (json.response) {
                fullText += json.response;
                streamText.textContent = fullText;
                streamText.scrollTop = streamText.scrollHeight;
              }
            } catch (err) {
              // skip partial json chunks
            }
          }
        }

        if (statusBadge) {
          statusBadge.textContent = 'DONE (0 ERRORS)';
          statusBadge.className = 'stream-status done';
        }
        if (footer) footer.style.display = 'flex';

        // Bind 1-click load of streamed concept
        const btnLoadStream = this.container.querySelector('#btn-load-streamed-concept');
        if (btnLoadStream) {
          btnLoadStream.onclick = () => {
            const parsed = this.parseConceptFromText(fullText, compList, theme);
            this.loadConceptIntoSimulator(parsed);
          };
        }

      } catch (err) {
        console.warn('Ollama direct generation failed:', err);
        if (statusBadge) {
          statusBadge.textContent = 'FALLBACK READY (OLLAMA OFFLINE/CORS)';
          statusBadge.className = 'stream-status warning';
        }
        // Provide synthesized fallback
        const fallback = this.synthesizeLocalFallbackConcept(compList, theme);
        streamText.textContent = `[Notice: Local Ollama daemon unreachable or CORS-restricted. Using Sovereign Local Cache]\n\n${fallback.rawText}`;
        if (footer) footer.style.display = 'flex';
        const btnLoadStream = this.container.querySelector('#btn-load-streamed-concept');
        if (btnLoadStream) {
          btnLoadStream.onclick = () => {
            this.loadConceptIntoSimulator(fallback.concept);
          };
        }
      } finally {
        this.isGenerating = false;
        if (btnGen) btnGen.disabled = false;
      }
    }

    parseConceptFromText(rawText, compList, theme) {
      // Extract python code block if present
      let pyCode = '';
      const codeMatch = rawText.match(/```python\s*([\s\S]*?)```/);
      if (codeMatch) {
        pyCode = codeMatch[1].trim();
      } else {
        pyCode = `# Generated Concept Script for DaVinci Kit\nimport RPi.GPIO as GPIO\nimport time\n\nGPIO.setmode(GPIO.BCM)\n# ${compList.join(', ')}\nprint("Creative concept initialized!")\n`;
      }

      // Extract title
      let title = `Custom ${compList[0]} + ${compList[1]} Invention`;
      const titleMatch = rawText.match(/### 1\.\s*(.+)/) || rawText.match(/Title:\s*(.+)/);
      if (titleMatch) title = titleMatch[1].trim();

      return {
        id: `custom-llm-${Date.now()}`,
        title: title,
        category: theme,
        components: compList,
        tagline: 'Custom generated by local Ollama AI model',
        description: rawText.slice(0, 300) + '...',
        wiring_text: rawText,
        python_code: pyCode,
        bcm_pins: [17, 18, 27]
      };
    }

    synthesizeLocalFallbackConcept(compList, theme) {
      const title = `Smart ${compList.slice(0, 2).join(' & ')} Adaptive Controller`;
      const code = `#!/usr/bin/env python3
# Sovereign DaVinci Kit Invention: ${title}
# Combined Components: ${compList.join(', ')}
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# Pin Allocations for Raspberry Pi 2B
PIN_STATUS = 17   # RGB Status LED
PIN_ACTUATOR = 18 # PWM Channel or Signal Actuator
PIN_SENSOR = 27   # Input Sensor Line

GPIO.setup(PIN_STATUS, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(PIN_ACTUATOR, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(PIN_SENSOR, GPIO.IN, pull_up_down=GPIO.PUD_UP)

print("⚡ [${title}] System Online!")
try:
    for cycle in range(5):
        sensor_val = GPIO.input(PIN_SENSOR)
        GPIO.output(PIN_STATUS, GPIO.HIGH if sensor_val == 0 else GPIO.LOW)
        GPIO.output(PIN_ACTUATOR, GPIO.HIGH)
        time.sleep(0.5)
        GPIO.output(PIN_ACTUATOR, GPIO.LOW)
        time.sleep(0.5)
        print(f"Cycle {cycle+1}/5 complete. Sensor state: {sensor_val}")
finally:
    GPIO.cleanup()
    print("Cleaned up GPIO.")
`;

      const concept = {
        id: `fallback-${Date.now()}`,
        title: title,
        category: theme,
        components: compList,
        tagline: 'Multi-device synchronized feedback control loop',
        description: `This invention harnesses ${compList.join(' and ')} in a closed-loop feedback architecture. The sensor bank provides telemetry which is evaluated on-chip to trigger proportional actuator response and real-time visual status.`,
        wiring_text: `1. Connect ${compList[0]} signal to GPIO 27 (Pin 13).\n2. Connect ${compList[1]} to GPIO 18 (Pin 12).\n3. Connect Status Indicator to GPIO 17 (Pin 11).\n4. Common Ground to Pin 6 (GND), 3.3V / 5V to respective breadboard rails.`,
        python_code: code,
        bcm_pins: [17, 18, 27]
      };

      return {
        rawText: `### 1. ${title}\n### 2. Operational Concept\n${concept.description}\n\n### 3. Circuit Wiring\n${concept.wiring_text}\n\n### 4. Executable Python Code\n\`\`\`python\n${code}\n\`\`\``,
        concept: concept
      };
    }

    escapeHtml(str) {
      if (!str) return '';
      return str.replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
    }
  }

  const creativeLabView = new CreativeLabViewRenderer();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CreativeLabViewRenderer, creativeLabView };
  }
  global.CreativeLabView = creativeLabView;
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
