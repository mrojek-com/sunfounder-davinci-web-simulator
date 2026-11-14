// Precision Pin-Accurate Breadboard, SunFounder T-Cobbler, Fritzing Compare & DMM Probe
// Renders Raspberry Pi 2B, 40-pin ribbon cable, 35-column breadboard with T-Cobbler straddling Cols 1..20,
// on-breadboard electronic components, orthogonal jumper wires, and step-by-step wiring checklist.

(function(global) {
  'use strict';

  const BB_CFG = {
    xCol1: 296,
    dx: 21,
    rows: {
      top_minus: 60,
      top_plus: 82,
      J: 120,
      I: 142,
      H: 164,
      G: 186,
      F: 208,
      E: 266,
      D: 288,
      C: 310,
      B: 332,
      A: 354,
      bot_minus: 396,
      bot_plus: 418
    }
  };

  class BreadboardViewRenderer {
    constructor() {
      this.container = null;
      this.currentLesson = null;
      this.selectedProbePin = 11; // Default GPIO 17 (Pin 11)
      this.viewMode = 'split'; // 'interactive' | 'official' | 'split'
      this.rgbState = { 17: 0, 18: 0, 27: 0 };
      this.checkedSteps = {};
    }

    init(containerEl) {
      this.container = containerEl;
      this.render();
      this.setupListeners();
    }

    getHoleXY(col, row) {
      const c = Math.max(1, Math.min(35, col || 1));
      const x = BB_CFG.xCol1 + (c - 1) * BB_CFG.dx;
      const y = BB_CFG.rows[row] !== undefined ? BB_CFG.rows[row] : BB_CFG.rows.A;
      return { x, y };
    }

    setupListeners() {
      const vGPIO = global.VirtualGPIO || global.virtualGPIO;
      if (!vGPIO) return;

      vGPIO.on('pinChange', (data) => {
        this.updatePinIndicator(data);
        this.updateBreadboardComponents(data);
        if (this.selectedProbePin === data.physical) {
          this.updateMultimeter();
        }
      });

      vGPIO.on('reset', () => {
        this.rgbState = { 17: 0, 18: 0, 27: 0 };
        this.resetPinIndicators();
        this.resetBreadboardComponents();
        this.updateMultimeter();
      });

      if (global.ElectricalGuard) {
        global.ElectricalGuard.onWarning((warning) => {
          this.showSafetyWarning(warning);
        });
      }
    }

    setLesson(lesson) {
      this.currentLesson = lesson;
      this.checkedSteps = {};
      this.rgbState = { 17: 0, 18: 0, 27: 0 };
      if (lesson && lesson.bcm_pins && lesson.bcm_pins.length > 0) {
        const pinout = global.RPi2B_Pinout;
        this.selectedProbePin = pinout ? (pinout.bcmToPhysical(lesson.bcm_pins[0]) || 11) : 11;
      }
      this.renderCircuitOnBreadboard();
      this.updateOfficialWiringImage();
      this.renderWiringChecklist();
      this.updateMultimeter();
    }

    setViewMode(mode) {
      this.viewMode = mode;
      if (!this.container) return;

      const btns = this.container.querySelectorAll('.wb-mode-btn');
      btns.forEach(b => b.classList.toggle('active', b.dataset.mode === mode));

      const svgPane = this.container.querySelector('#wb-svg-pane');
      const imgPane = this.container.querySelector('#wb-official-pane');
      const splitWrap = this.container.querySelector('#wb-stage-split');

      if (!svgPane || !imgPane || !splitWrap) return;

      splitWrap.classList.remove('mode-interactive', 'mode-official', 'mode-split');
      splitWrap.classList.add(`mode-${mode}`);

      svgPane.style.display = (mode === 'official') ? 'none' : 'flex';
      imgPane.style.display = (mode === 'interactive') ? 'none' : 'flex';
    }

    render() {
      if (!this.container) return;

      this.container.innerHTML = `
        <div class="breadboard-workbench">
          <!-- Top Toolbar with View Switcher & Digital Multimeter HUD -->
          <div class="workbench-bar">
            <div class="wb-mode-switcher">
              <button class="wb-mode-btn" data-mode="interactive">⚡ Interactive Breadboard</button>
              <button class="wb-mode-btn" data-mode="official">🖼️ Official Fritzing</button>
              <button class="wb-mode-btn active" data-mode="split">🔀 Split Compare</button>
            </div>

            <!-- Virtual Digital Multimeter (DMM) HUD -->
            <div class="dmm-hud-box" id="dmm-hud">
              <span class="dmm-label">🔬 PROBE:</span>
              <span class="dmm-pin-target" id="dmm-target-pin">Pin 11 (GPIO 17)</span>
              <span class="dmm-metric-val" id="dmm-volt-val">0.00 V</span>
              <span class="dmm-metric-val current" id="dmm-curr-val">0.0 mA</span>
              <span class="dmm-status-badge" id="dmm-logic-val">LOW (0V)</span>
            </div>

            <div class="board-legend">
              <span class="legend-item"><span class="dot power3v3"></span> 3.3V</span>
              <span class="legend-item"><span class="dot power5v"></span> 5V</span>
              <span class="legend-item"><span class="dot ground"></span> GND</span>
              <span class="legend-item"><span class="dot gpio-active"></span> High</span>
            </div>
          </div>

          <!-- Safety Guard Warning Banner -->
          <div class="safety-banner" id="safety-alert-banner" style="display:none;">
            <span class="safety-icon">⚠️</span>
            <span class="safety-msg" id="safety-alert-text">Electrical Warning</span>
            <button class="btn btn-sm btn-outline" id="btn-dismiss-safety">Dismiss</button>
          </div>

          <!-- Main Split Stage (Interactive SVG + Official Fritzing Reference) -->
          <div class="wb-stage-split mode-split" id="wb-stage-split">
            <div class="workbench-canvas-box" id="wb-svg-pane">
              <svg id="workbench-svg" viewBox="0 0 1090 475" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="pcbGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#1b5e20"/>
                    <stop offset="100%" stop-color="#0d3812"/>
                  </linearGradient>
                  <linearGradient id="cobblerRed" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#c62828"/>
                    <stop offset="100%" stop-color="#b71c1c"/>
                  </linearGradient>
                  <filter id="glowEffect" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="ledBloom" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="probeGlow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <!-- 1. Raspberry Pi 2 Model B PCB (Left) -->
                <g id="rpi-board-group">
                  <rect x="12" y="26" width="170" height="422" rx="14" fill="url(#pcbGreen)" stroke="#2e7d32" stroke-width="2"/>
                  <text x="22" y="48" fill="#ffffff" font-family="monospace" font-size="11" font-weight="bold">Raspberry Pi 2B</text>
                  <text x="22" y="62" fill="#81c784" font-family="sans-serif" font-size="9">BCM2836 • 40-Pin GPIO</text>

                  <!-- USB & Ethernet Cutouts -->
                  <rect x="164" y="60" width="22" height="58" rx="2" fill="#cfd8dc" stroke="#90a4ae"/>
                  <rect x="164" y="132" width="22" height="58" rx="2" fill="#cfd8dc" stroke="#90a4ae"/>
                  <rect x="164" y="206" width="22" height="78" rx="2" fill="#cfd8dc" stroke="#90a4ae"/>
                  <text x="171" y="96" fill="#37474f" font-size="7" font-family="monospace" transform="rotate(90, 171, 96)">USB</text>
                  <text x="171" y="168" fill="#37474f" font-size="7" font-family="monospace" transform="rotate(90, 171, 168)">USB</text>
                  <text x="171" y="255" fill="#37474f" font-size="7" font-family="monospace" transform="rotate(90, 171, 255)">LAN</text>

                  <!-- 40-Pin Header Block -->
                  <rect x="28" y="84" width="44" height="330" rx="4" fill="#1c1c1c" stroke="#424242"/>
                  <text x="30" y="79" fill="#a5d6a7" font-size="8" font-family="monospace">P1 HEADER</text>
                  <g id="pi-pins-container">${this.generatePiHeaderPinsSvg()}</g>
                </g>

                <!-- 2. 40-Pin Grey Ribbon Cable (Pin 1 Red Stripe) -->
                <g id="ribbon-cable-group">
                  <path d="M 72 86 C 125 86, 175 94, 224 94 L 224 388 C 175 388, 125 412, 72 412 Z" fill="#607d8b" opacity="0.45"/>
                  <path d="M 72 88 C 125 88, 175 96, 224 96" stroke="#e53935" stroke-width="4" fill="none"/>
                  <path d="M 72 412 C 125 412, 175 388, 224 388" stroke="#90a4ae" stroke-width="1.5" fill="none"/>
                </g>

                <!-- 3. 35-Column Solderless Breadboard -->
                <g id="breadboard-group">
                  <rect x="262" y="34" width="800" height="414" rx="10" fill="#f7f5f0" stroke="#cbd5e1" stroke-width="2"/>

                  <!-- Top Power Rails (- blue, + red) -->
                  <line x1="286" y1="48" x2="1028" y2="48" stroke="#2196f3" stroke-width="2"/>
                  <text x="272" y="64" fill="#2196f3" font-family="monospace" font-size="13" font-weight="bold">-</text>
                  <line x1="286" y1="94" x2="1028" y2="94" stroke="#e53935" stroke-width="2"/>
                  <text x="272" y="86" fill="#e53935" font-family="monospace" font-size="13" font-weight="bold">+</text>

                  <!-- Bottom Power Rails (- blue, + red) -->
                  <line x1="286" y1="384" x2="1028" y2="384" stroke="#2196f3" stroke-width="2"/>
                  <text x="272" y="400" fill="#2196f3" font-family="monospace" font-size="13" font-weight="bold">-</text>
                  <line x1="286" y1="430" x2="1028" y2="430" stroke="#e53935" stroke-width="2"/>
                  <text x="272" y="422" fill="#e53935" font-family="monospace" font-size="13" font-weight="bold">+</text>

                  <!-- Center IC Dip Ravine -->
                  <rect x="280" y="226" width="760" height="22" rx="3" fill="#e2dfd7" stroke="#d1cdc2"/>

                  <!-- Row & Column Silkscreen Labels -->
                  ${this.generateBreadboardLabelsSvg()}

                  <!-- Active Net Highlight Strips Layer -->
                  <g id="active-net-strips-layer"></g>

                  <!-- 35-Column Breadboard Tie Points -->
                  <g id="breadboard-holes-layer">${this.generateBreadboardHolesSvg()}</g>
                </g>

                <!-- 4. SunFounder Red T-Cobbler Straddling Cols 1..20 -->
                <g id="t-cobbler-group">
                  <!-- Red PCB Body straddling Rows C..H across Cols 1..20 + mounting ears -->
                  <rect x="252" y="150" width="504" height="174" rx="6" fill="url(#cobblerRed)" stroke="#8e0000" stroke-width="2"/>
                  <!-- Grey 40-pin IDC Ribbon Socket on Left -->
                  <rect x="206" y="88" width="48" height="304" rx="4" fill="#78909c" stroke="#455a64" stroke-width="2"/>
                  <rect x="214" y="96" width="32" height="288" rx="2" fill="#263238"/>
                  <circle cx="222" cy="106" r="3" fill="#e53935"/>
                  <rect x="254" y="94" width="22" height="292" fill="#b71c1c"/>
                  <text x="268" y="242" fill="#ffffff" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle" transform="rotate(-90, 268, 242)">GPIO Extension Board</text>

                  <!-- Mounting Holes on Right Side (Col 21.3) -->
                  <circle cx="734" cy="176" r="11" fill="#e2dfd7" stroke="#f57c00" stroke-width="5"/>
                  <circle cx="734" cy="298" r="11" fill="#e2dfd7" stroke="#f57c00" stroke-width="5"/>

                  <!-- 40 Gold Header Pins & Crisp White Silkscreen -->
                  <g id="cobbler-pins-layer">${this.generateCobblerPinsSvg()}</g>
                </g>

                <!-- 5. Dynamic Breadboard Components & Orthogonal Jumper Wires -->
                <g id="bb-components-layer"></g>
                <g id="jumper-wires-layer"></g>

                <!-- 6. Interactive Multimeter Probe Crosshair -->
                <g id="probe-marker-group" style="pointer-events:none;">
                  <circle id="probe-ring" cx="38" cy="168" r="9" fill="none" stroke="#00e5ff" stroke-width="2.5" filter="url(#probeGlow)"/>
                  <circle id="probe-center" cx="38" cy="168" r="3" fill="#00e5ff"/>
                </g>
              </svg>

              <!-- Hole Hover Tooltip -->
              <div class="bb-hole-tooltip" id="bb-hole-tooltip" style="display:none;"></div>
            </div>

            <!-- Official Fritzing Wiring Image Pane (for Official / Split Modes) -->
            <div class="wb-official-pane" id="wb-official-pane">
              <div class="official-pane-header">
                <span>Official SunFounder Reference Diagrams</span>
                <a id="wb-official-doc-link" href="#" target="_blank" rel="noopener noreferrer">SunFounder Docs ↗</a>
              </div>
              <div class="wb-official-thumbs" id="wb-official-thumbs"></div>
              <div class="wb-official-img-wrap">
                <img id="wb-official-img" src="" alt="Official SunFounder Diagram">
              </div>
            </div>
          </div>

          <!-- Step-by-Step Interactive Wiring Checklist -->
          <div class="wiring-checklist-drawer">
            <div class="checklist-header" id="checklist-toggle-bar">
              <span>📋 Physical Breadboard Wiring Checklist (Click items to verify before powering Pi 2B)</span>
              <span class="checklist-progress" id="checklist-progress-badge">0 / 0 verified</span>
            </div>
            <div class="checklist-items-grid" id="wiring-checklist-items"></div>
          </div>
        </div>
      `;

      this.bindEvents();
      this.setViewMode(this.viewMode);
      this.renderCircuitOnBreadboard();
      this.updateOfficialWiringImage();
      this.renderWiringChecklist();
      this.updateMultimeter();
    }

    generatePiHeaderPinsSvg() {
      let out = '';
      const pinout = global.RPi2B_Pinout;
      for (let row = 0; row < 20; row++) {
        const pinOdd = row * 2 + 1;
        const pinEven = row * 2 + 2;
        const y = 96 + row * 16;

        const p1Def = pinout ? pinout.getPin(pinOdd) : null;
        const p2Def = pinout ? pinout.getPin(pinEven) : null;

        const col1 = p1Def ? p1Def.color : '#ffd54f';
        const col2 = p2Def ? p2Def.color : '#ffd54f';

        out += `
          <circle cx="39" cy="${y}" r="5" fill="${col1}" stroke="#111" stroke-width="1" class="pi-pin-dot interactive-pin" id="pi-pin-${pinOdd}" data-pin="${pinOdd}" data-bcm="${p1Def && p1Def.bcm !== null ? p1Def.bcm : ''}" data-tip="Pi Pin ${pinOdd}: ${p1Def ? p1Def.name : ''}" style="cursor:pointer;"/>
          <circle cx="59" cy="${y}" r="5" fill="${col2}" stroke="#111" stroke-width="1" class="pi-pin-dot interactive-pin" id="pi-pin-${pinEven}" data-pin="${pinEven}" data-bcm="${p2Def && p2Def.bcm !== null ? p2Def.bcm : ''}" data-tip="Pi Pin ${pinEven}: ${p2Def ? p2Def.name : ''}" style="cursor:pointer;"/>
        `;
      }
      return out;
    }

    generateBreadboardLabelsSvg() {
      let svg = '';
      const rowNames = ['J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
      rowNames.forEach(r => {
        const y = BB_CFG.rows[r] + 3;
        svg += `<text x="274" y="${y}" fill="#64748b" font-family="monospace" font-size="9" font-weight="bold">${r}</text>`;
        svg += `<text x="1038" y="${y}" fill="#64748b" font-family="monospace" font-size="9" font-weight="bold">${r}</text>`;
      });

      [1, 5, 10, 15, 20, 25, 30, 35].forEach(c => {
        const x = this.getHoleXY(c, 'A').x;
        svg += `<text x="${x}" y="108" fill="#64748b" font-family="monospace" font-size="9" text-anchor="middle">${c}</text>`;
        svg += `<text x="${x}" y="373" fill="#64748b" font-family="monospace" font-size="9" text-anchor="middle">${c}</text>`;
      });
      return svg;
    }

    generateBreadboardHolesSvg() {
      let holes = '';
      const mainRows = ['J', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];

      // Main terminal strips (35 cols)
      for (let col = 1; col <= 35; col++) {
        mainRows.forEach(row => {
          const { x, y } = this.getHoleXY(col, row);
          holes += `<rect x="${x - 3}" y="${y - 3}" width="6" height="6" rx="1.5" fill="#1e293b" class="bb-hole" data-col="${col}" data-row="${row}"/>`;
        });
      }

      // Power rail tie points (groups of 5 like real 830-pt breadboards)
      const railRows = ['top_minus', 'top_plus', 'bot_minus', 'bot_plus'];
      for (let col = 1; col <= 35; col++) {
        if (col % 6 === 0) continue; // visual group gap
        railRows.forEach(row => {
          const { x, y } = this.getHoleXY(col, row);
          holes += `<rect x="${x - 2.5}" y="${y - 2.5}" width="5" height="5" rx="1" fill="#1e293b" class="bb-hole" data-col="${col}" data-row="${row}"/>`;
        });
      }
      return holes;
    }

    generateCobblerPinsSvg() {
      let out = '';
      const pinout = global.RPi2B_Pinout;
      for (let pin = 1; pin <= 40; pin++) {
        const placement = pinout ? pinout.getCobblerPlacement(pin) : {
          col: Math.ceil(pin / 2),
          side: pin % 2 === 1 ? 'bottom' : 'top',
          pinRow: pin % 2 === 1 ? 'C' : 'H',
          silkscreen: `P${pin}`
        };
        const { x, y } = this.getHoleXY(placement.col, placement.pinRow);
        const textY = placement.side === 'top' ? y + 12 : y - 10;
        const anchor = placement.side === 'top' ? 'end' : 'start';

        out += `
          <circle cx="${x}" cy="${y}" r="4.8" fill="#ffd54f" stroke="#5d4037" stroke-width="1"
            class="cobbler-pin-dot interactive-pin" id="cobbler-pin-${pin}"
            data-pin="${pin}" data-col="${placement.col}" data-row="${placement.pinRow}"
            data-tip="T-Cobbler ${placement.silkscreen} (Pin ${pin} • Col ${placement.col} Rows ${placement.exposedRows.join('/')})"
            style="cursor:pointer;"/>
          <text x="${x + 3}" y="${textY}" fill="#ffffff" font-family="monospace" font-size="8.5" font-weight="bold"
            text-anchor="${anchor}" transform="rotate(-90, ${x + 3}, ${textY})" style="pointer-events:none;">${placement.silkscreen}</text>
        `;
      }
      return out;
    }

    bindEvents() {
      if (!this.container) return;

      // Mode toggle buttons
      this.container.querySelectorAll('.wb-mode-btn').forEach(btn => {
        btn.onclick = () => this.setViewMode(btn.dataset.mode);
      });

      // Pin click for multimeter probe
      const pins = this.container.querySelectorAll('.interactive-pin');
      pins.forEach(p => {
        p.onclick = (e) => {
          const pinNum = parseInt(e.target.dataset.pin, 10);
          if (pinNum) this.setProbeTarget(pinNum, e.target);
        };
      });

      // Hover tooltips for pins and breadboard holes
      const tooltip = this.container.querySelector('#bb-hole-tooltip');
      const svgBox = this.container.querySelector('#wb-svg-pane');
      if (tooltip && svgBox) {
        svgBox.addEventListener('mousemove', (e) => {
          const target = e.target;
          let msg = target.dataset && target.dataset.tip ? target.dataset.tip : '';
          if (!msg && target.classList && target.classList.contains('bb-hole')) {
            msg = `Hole Col ${target.dataset.col}, Row ${target.dataset.row}`;
          }
          if (msg) {
            const rect = svgBox.getBoundingClientRect();
            tooltip.textContent = msg;
            tooltip.style.display = 'block';
            tooltip.style.left = `${Math.min(rect.width - 210, Math.max(8, e.clientX - rect.left + 12))}px`;
            tooltip.style.top = `${Math.max(8, e.clientY - rect.top - 28)}px`;
          } else {
            tooltip.style.display = 'none';
          }
        });
        svgBox.addEventListener('mouseleave', () => {
          tooltip.style.display = 'none';
        });
      }

      const btnDismiss = this.container.querySelector('#btn-dismiss-safety');
      if (btnDismiss) {
        btnDismiss.onclick = () => {
          const banner = this.container.querySelector('#safety-alert-banner');
          if (banner) banner.style.display = 'none';
        };
      }
    }

    setProbeTarget(physicalPin, element) {
      this.selectedProbePin = physicalPin;
      const ring = this.container.querySelector('#probe-ring');
      const center = this.container.querySelector('#probe-center');
      if (ring && center && element) {
        const cx = element.getAttribute('cx');
        const cy = element.getAttribute('cy');
        if (cx && cy) {
          ring.setAttribute('cx', cx);
          ring.setAttribute('cy', cy);
          center.setAttribute('cx', cx);
          center.setAttribute('cy', cy);
        }
      }
      this.updateMultimeter();
    }

    updateMultimeter() {
      if (!this.container) return;
      const vGPIO = global.VirtualGPIO || global.virtualGPIO;
      const guard = global.ElectricalGuard;
      const pinout = global.RPi2B_Pinout;
      if (!guard || !vGPIO || !pinout) return;

      const pDef = pinout.getPin(this.selectedProbePin);
      const metrics = guard.measureProbe(this.selectedProbePin, vGPIO);

      const targetEl = this.container.querySelector('#dmm-target-pin');
      const voltEl = this.container.querySelector('#dmm-volt-val');
      const currEl = this.container.querySelector('#dmm-curr-val');
      const logicEl = this.container.querySelector('#dmm-logic-val');

      if (targetEl && pDef) targetEl.textContent = `Pin ${pDef.pin} (${pDef.name})`;
      if (voltEl) voltEl.textContent = `${metrics.voltage.toFixed(2)} V`;
      if (currEl) currEl.textContent = `${metrics.currentMa.toFixed(1)} mA`;
      if (logicEl) {
        logicEl.textContent = metrics.logic;
        logicEl.style.color = metrics.voltage > 2.0 ? '#00e676' : '#8b9bb4';
      }
    }

    showSafetyWarning(warning) {
      if (!this.container) return;
      const banner = this.container.querySelector('#safety-alert-banner');
      const msg = this.container.querySelector('#safety-alert-text');
      if (banner && msg) {
        msg.textContent = warning.message;
        banner.style.display = 'flex';
        banner.className = warning.level === 'CRITICAL' ? 'safety-banner critical' : 'safety-banner warning';
      }
    }

    updateOfficialWiringImage() {
      if (!this.container || !this.currentLesson) return;
      const lesson = this.currentLesson;
      const img = this.container.querySelector('#wb-official-img');
      const docLink = this.container.querySelector('#wb-official-doc-link');
      const thumbsEl = this.container.querySelector('#wb-official-thumbs');

      if (docLink) {
        docLink.href = lesson.url || 'https://docs.sunfounder.com/projects/davinci-kit/en/latest/';
      }

      const diagrams = [];
      const seen = new Set();
      const pushDiagram = (label, url) => {
        if (!url || seen.has(url)) return;
        seen.add(url);
        diagrams.push({ label, url });
      };

      pushDiagram('Fritzing Wiring', lesson.wiring_image);
      let extraIdx = 2;
      (lesson.wiring_images || []).forEach((url) => {
        if (!seen.has(url)) {
          pushDiagram(`Wiring ${extraIdx++}`, url);
        }
      });
      pushDiagram('Schematic', lesson.schematic_image);
      pushDiagram('Components', lesson.component_image);
      pushDiagram('Hardware Photo', lesson.phenomenon_image);

      if (img) {
        img.src = diagrams.length > 0 ? diagrams[0].url : '';
        img.style.display = diagrams.length > 0 ? 'block' : 'none';
      }

      if (thumbsEl) {
        thumbsEl.innerHTML = '';
        diagrams.forEach((d, idx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `wb-thumb-pill${idx === 0 ? ' active' : ''}`;
          btn.textContent = d.label;
          btn.dataset.src = d.url;
          btn.onclick = () => {
            if (img) img.src = d.url;
            thumbsEl.querySelectorAll('.wb-thumb-pill').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
          };
          thumbsEl.appendChild(btn);
        });
      }
    }

    renderWiringChecklist() {
      if (!this.container || !this.currentLesson) return;
      const grid = this.container.querySelector('#wiring-checklist-items');
      const badge = this.container.querySelector('#checklist-progress-badge');
      if (!grid) return;

      const steps = this.currentLesson.wiring_steps || [];
      grid.innerHTML = '';

      steps.forEach((step, idx) => {
        const item = document.createElement('label');
        item.className = 'checklist-item';
        const checked = !!this.checkedSteps[idx];
        item.innerHTML = `
          <input type="checkbox" data-idx="${idx}" ${checked ? 'checked' : ''}>
          <span class="wire-swatch" style="background:${step.color};"></span>
          <span class="step-text">${step.text}</span>
        `;
        item.querySelector('input').onchange = (e) => {
          this.checkedSteps[idx] = e.target.checked;
          this.updateChecklistCount(steps.length);
        };
        grid.appendChild(item);
      });

      this.updateChecklistCount(steps.length);
      if (badge) badge.textContent = `0 / ${steps.length} verified`;
    }

    updateChecklistCount(total) {
      const badge = this.container.querySelector('#checklist-progress-badge');
      if (!badge) return;
      const done = Object.values(this.checkedSteps).filter(Boolean).length;
      badge.textContent = `${done} / ${total} verified`;
      badge.style.color = (total > 0 && done === total) ? '#00e676' : '#8b9bb4';
    }

    // =========================================================================
    // PRECISION BREADBOARD RENDERING (ACTIVE STRIPS, COMPONENTS, ORTHO WIRES)
    // =========================================================================
    renderCircuitOnBreadboard() {
      if (!this.container) return;
      const stripsLayer = this.container.querySelector('#active-net-strips-layer');
      const compLayer = this.container.querySelector('#bb-components-layer');
      const wiresLayer = this.container.querySelector('#jumper-wires-layer');
      if (!stripsLayer || !compLayer || !wiresLayer) return;

      stripsLayer.innerHTML = '';
      compLayer.innerHTML = '';
      wiresLayer.innerHTML = '';

      if (!this.currentLesson || !this.currentLesson.breadboard_spec) return;
      const spec = this.currentLesson.breadboard_spec;

      // Collect active columns/rows to highlight connected 5-hole strips in Fritzing green
      const activeStrips = new Set();
      const registerStrip = (pt) => {
        if (!pt || !pt.col || !pt.row) return;
        if (['A', 'B', 'C', 'D', 'E'].includes(pt.row)) activeStrips.add(`${pt.col}:bot`);
        else if (['F', 'G', 'H', 'I', 'J'].includes(pt.row)) activeStrips.add(`${pt.col}:top`);
      };

      (spec.power_jumpers || []).forEach(pj => { registerStrip(pj.from); registerStrip(pj.to); });
      (spec.wires || []).forEach(w => { registerStrip(w.from); registerStrip(w.to); });
      (spec.components || []).forEach(c => {
        if (c.pins) c.pins.forEach(registerStrip);
        if (c.from) registerStrip(c.from);
        if (c.to) registerStrip(c.to);
      });

      activeStrips.forEach(key => {
        const [colStr, half] = key.split(':');
        const col = parseInt(colStr, 10);
        const topRow = half === 'top' ? 'J' : 'E';
        const botRow = half === 'top' ? 'F' : 'A';
        const p1 = this.getHoleXY(col, topRow);
        const p2 = this.getHoleXY(col, botRow);
        stripsLayer.appendChild(this.svgEl('rect', {
          x: p1.x - 6, y: p1.y - 6, width: 12, height: (p2.y - p1.y) + 12,
          rx: 5, fill: 'rgba(0, 230, 118, 0.25)', stroke: 'rgba(0, 200, 83, 0.5)', 'stroke-width': 1
        }));
      });

      // Render Components
      (spec.components || []).forEach((comp, idx) => this.drawComponent(compLayer, comp, idx));

      // Render Power Jumpers & Orthogonal Signal Wires
      (spec.power_jumpers || []).forEach((pj, idx) => this.drawOrthogonalWire(wiresLayer, pj, idx, true));
      (spec.wires || []).forEach((w, idx) => this.drawOrthogonalWire(wiresLayer, w, idx, false));
    }

    drawOrthogonalWire(layer, wire, index, isPower) {
      const p1 = this.getHoleXY(wire.from.col, wire.from.row);
      const p2 = this.getHoleXY(wire.to.col, wire.to.row);

      let pathD = '';
      if (wire.route === 'around_right') {
        // Route up above breadboard, right around components, and down to bottom row
        const topLane = 40;
        const rightX = this.getHoleXY(32, 'A').x;
        const botLane = 368;
        pathD = `M ${p1.x} ${p1.y} L ${p1.x} ${topLane} L ${rightX} ${topLane} L ${rightX} ${botLane} L ${p2.x} ${botLane} L ${p2.x} ${p2.y}`;
      } else if (wire.from.col === wire.to.col) {
        pathD = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
      } else if (isPower && ['bot_plus', 'bot_minus', 'top_plus', 'top_minus'].includes(wire.to.row)) {
        // Drop straight down/up into power rail channel
        pathD = `M ${p1.x} ${p1.y} L ${p1.x} ${p2.y} L ${p2.x} ${p2.y}`;
      } else {
        // Choose clean horizontal routing lane above Row J or below Row A
        const useTopChannel = ['J', 'I', 'H', 'G', 'F', 'top_plus', 'top_minus'].includes(wire.from.row) &&
                              ['J', 'I', 'H', 'G', 'F', 'top_plus', 'top_minus'].includes(wire.to.row);
        const laneOffset = (index % 5) * 4;
        const channelY = useTopChannel ? (102 - laneOffset) : (368 + laneOffset);
        pathD = `M ${p1.x} ${p1.y} L ${p1.x} ${channelY} L ${p2.x} ${channelY} L ${p2.x} ${p2.y}`;
      }

      const path = this.svgEl('path', {
        d: pathD,
        stroke: wire.color || '#2196f3',
        'stroke-width': 3.5,
        fill: 'none',
        'stroke-linejoin': 'round',
        'stroke-linecap': 'round',
        opacity: 0.92,
        class: 'circuit-jumper-wire',
        'data-tip': wire.label || 'Jumper Wire'
      });

      if (wire.bcm !== undefined) {
        path.style.cursor = 'pointer';
        path.onclick = () => {
          const pinout = global.RPi2B_Pinout;
          const phys = pinout ? pinout.bcmToPhysical(wire.bcm) : null;
          if (phys) {
            const pinEl = this.container.querySelector(`#cobbler-pin-${phys}`);
            this.setProbeTarget(phys, pinEl);
          }
        };
      }

      layer.appendChild(path);
      // Terminal pin caps inside holes
      layer.appendChild(this.svgEl('circle', { cx: p1.x, cy: p1.y, r: 3, fill: wire.color || '#2196f3', stroke: '#111', 'stroke-width': 0.8, style: 'pointer-events:none;' }));
      layer.appendChild(this.svgEl('circle', { cx: p2.x, cy: p2.y, r: 3, fill: wire.color || '#2196f3', stroke: '#111', 'stroke-width': 0.8, style: 'pointer-events:none;' }));
    }

    drawComponent(layer, comp, idx) {
      if (comp.type === 'led' && comp.pins && comp.pins.length >= 2) {
        const p1 = this.getHoleXY(comp.pins[0].col, comp.pins[0].row);
        const p2 = this.getHoleXY(comp.pins[1].col, comp.pins[1].row);
        const cx = (p1.x + p2.x) / 2;
        const cy = p1.y - 26;

        // Wire legs plugging directly into holes
        layer.appendChild(this.svgEl('path', { d: `M ${p1.x} ${p1.y} L ${p1.x} ${cy + 6}`, stroke: '#94a3b8', 'stroke-width': 2.5, fill: 'none' }));
        layer.appendChild(this.svgEl('path', { d: `M ${p2.x} ${p2.y} L ${p2.x} ${cy + 6}`, stroke: '#94a3b8', 'stroke-width': 2.5, fill: 'none' }));

        // LED dome
        const g = this.svgEl('g', { id: `bb-led-${comp.bcm}`, 'data-bcm': comp.bcm, 'data-activelow': comp.activeLow ? '1' : '0' });
        const fillOff = comp.color === 'green' ? '#14532d' : '#7f1d1d';
        g.appendChild(this.svgEl('path', {
          d: `M ${cx - 11} ${cy + 8} L ${cx - 11} ${cy - 6} A 11 11 0 0 1 ${cx + 11} ${cy - 6} L ${cx + 11} ${cy + 8} Z`,
          fill: fillOff, stroke: '#dc2626', 'stroke-width': 1.5, class: 'bb-led-dome'
        }));
        g.appendChild(this.svgEl('text', { x: cx, y: cy - 22, fill: '#334155', 'font-size': 8.5, 'font-family': 'monospace', 'font-weight': 'bold', 'text-anchor': 'middle' }, comp.label || 'LED'));
        layer.appendChild(g);
      } else if (comp.type === 'rgb_led' && comp.pins && comp.pins.length >= 4) {
        const pts = comp.pins.map(p => this.getHoleXY(p.col, p.row));
        const cx = (pts[0].x + pts[3].x) / 2;
        const cy = pts[0].y - 32;
        pts.forEach(pt => {
          layer.appendChild(this.svgEl('path', { d: `M ${pt.x} ${pt.y} L ${pt.x} ${cy + 8}`, stroke: '#94a3b8', 'stroke-width': 2, fill: 'none' }));
        });
        const g = this.svgEl('g', { id: 'bb-rgb-led' });
        g.appendChild(this.svgEl('path', {
          d: `M ${cx - 14} ${cy + 8} L ${cx - 14} ${cy - 8} A 14 14 0 0 1 ${cx + 14} ${cy - 8} L ${cx + 14} ${cy + 8} Z`,
          fill: '#e2e8f0', stroke: '#64748b', 'stroke-width': 1.5, class: 'bb-rgb-dome'
        }));
        g.appendChild(this.svgEl('text', { x: cx, y: cy - 26, fill: '#334155', 'font-size': 8.5, 'font-family': 'monospace', 'font-weight': 'bold', 'text-anchor': 'middle' }, 'RGB LED'));
        layer.appendChild(g);
      } else if (comp.type === 'resistor' && comp.from && comp.to) {
        const p1 = this.getHoleXY(comp.from.col, comp.from.row);
        const p2 = this.getHoleXY(comp.to.col, comp.to.row);
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);

        layer.appendChild(this.svgEl('line', { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, stroke: '#94a3b8', 'stroke-width': 2.2 }));
        const g = this.svgEl('g', { transform: `translate(${mx}, ${my}) rotate(${angle})`, 'data-tip': comp.label || comp.value });
        g.appendChild(this.svgEl('rect', { x: -12, y: -5, width: 24, height: 10, rx: 3, fill: '#93c5fd', stroke: '#475569', 'stroke-width': 1 }));
        (comp.bands || ['#e53935', '#e53935', '#212121', '#ffb300']).slice(0, 4).forEach((b, bi) => {
          g.appendChild(this.svgEl('rect', { x: -8 + bi * 5, y: -5, width: 2.5, height: 10, fill: b }));
        });
        layer.appendChild(g);
      } else if (comp.type === 'ic') {
        const pTopLeft = this.getHoleXY(comp.startCol, comp.topRow || 'F');
        const pBotRight = this.getHoleXY(comp.startCol + (comp.cols || 8) - 1, comp.botRow || 'E');
        for (let c = comp.startCol; c < comp.startCol + (comp.cols || 8); c++) {
          const ptT = this.getHoleXY(c, 'F');
          const ptB = this.getHoleXY(c, 'E');
          layer.appendChild(this.svgEl('rect', { x: ptT.x - 2, y: ptT.y - 2, width: 4, height: 12, fill: '#cbd5e1' }));
          layer.appendChild(this.svgEl('rect', { x: ptB.x - 2, y: ptB.y - 10, width: 4, height: 12, fill: '#cbd5e1' }));
        }
        layer.appendChild(this.svgEl('rect', {
          x: pTopLeft.x - 6, y: pTopLeft.y + 6,
          width: (pBotRight.x - pTopLeft.x) + 12, height: (pBotRight.y - pTopLeft.y) - 12,
          rx: 3, fill: '#1e293b', stroke: '#475569', 'stroke-width': 1.5
        }));
        layer.appendChild(this.svgEl('text', {
          x: (pTopLeft.x + pBotRight.x) / 2, y: (pTopLeft.y + pBotRight.y) / 2 + 3,
          fill: '#e2e8f0', 'font-size': 9.5, 'font-family': 'monospace', 'font-weight': 'bold', 'text-anchor': 'middle'
        }, comp.label));
      } else if (comp.type === 'button' && comp.pins && comp.pins.length >= 4) {
        const p1 = this.getHoleXY(comp.pins[0].col, comp.pins[0].row);
        const p2 = this.getHoleXY(comp.pins[3].col, comp.pins[3].row);
        const cx = (p1.x + p2.x) / 2;
        const cy = (p1.y + p2.y) / 2;
        const g = this.svgEl('g', { style: 'cursor:pointer;', 'data-tip': 'Click Button to Press (GPIO ' + comp.bcm + ')' });
        g.appendChild(this.svgEl('rect', { x: p1.x - 4, y: p1.y - 4, width: (p2.x - p1.x) + 8, height: (p2.y - p1.y) + 8, rx: 4, fill: '#334155', stroke: '#64748b', 'stroke-width': 1.5 }));
        g.appendChild(this.svgEl('circle', { cx: cx, cy: cy, r: 14, fill: '#0f172a', stroke: '#475569', 'stroke-width': 2 }));
        g.onmousedown = () => { if (global.VirtualGPIO) global.VirtualGPIO.setExternalInput(comp.bcm, 0); };
        g.onmouseup = () => { if (global.VirtualGPIO) global.VirtualGPIO.setExternalInput(comp.bcm, 1); };
        layer.appendChild(g);
      } else if (comp.type === 'buzzer' && comp.pins && comp.pins.length >= 2) {
        const p1 = this.getHoleXY(comp.pins[0].col, comp.pins[0].row);
        const p2 = this.getHoleXY(comp.pins[1].col, comp.pins[1].row);
        const cx = (p1.x + p2.x) / 2;
        const cy = p1.y - 16;
        layer.appendChild(this.svgEl('circle', { cx: cx, cy: cy, r: 22, fill: '#1e293b', stroke: '#475569', 'stroke-width': 2, id: 'bb-buzzer-body' }));
        layer.appendChild(this.svgEl('circle', { cx: cx, cy: cy, r: 6, fill: '#94a3b8' }));
        layer.appendChild(this.svgEl('text', { x: cx, y: cy + 32, fill: '#334155', 'font-size': 8.5, 'font-family': 'monospace', 'font-weight': 'bold', 'text-anchor': 'middle' }, comp.label));
      } else if (comp.type === 'module') {
        const wCols = comp.widthCols || 5;
        const pStart = this.getHoleXY(comp.startCol, comp.row || 'J');
        const width = wCols * BB_CFG.dx;
        const boxY = pStart.y - 52;
        layer.appendChild(this.svgEl('rect', { x: pStart.x - 10, y: boxY, width: width + 10, height: 42, rx: 5, fill: '#0369a1', stroke: '#0c4a6e', 'stroke-width': 2 }));
        layer.appendChild(this.svgEl('text', { x: pStart.x + width / 2 - 5, y: boxY + 20, fill: '#fff', 'font-size': 9.5, 'font-family': 'monospace', 'font-weight': 'bold', 'text-anchor': 'middle' }, comp.label));
        (comp.pins || []).forEach(pin => {
          const pt = this.getHoleXY(pin.col, pin.row || comp.row || 'J');
          layer.appendChild(this.svgEl('line', { x1: pt.x, y1: pt.y, x2: pt.x, y2: boxY + 42, stroke: '#94a3b8', 'stroke-width': 2 }));
          layer.appendChild(this.svgEl('text', { x: pt.x, y: boxY + 36, fill: '#bae6fd', 'font-size': 7, 'font-family': 'monospace', 'text-anchor': 'middle' }, pin.name));
        });
      }
    }

    updateBreadboardComponents(data) {
      if (!this.container) return;
      const bcm = data.bcm;

      // Single LED sync
      const ledGroup = this.container.querySelector(`#bb-led-${bcm}`);
      if (ledGroup) {
        const dome = ledGroup.querySelector('.bb-led-dome');
        const activeLow = ledGroup.dataset.activelow === '1';
        const isOn = activeLow ? (data.value === 0) : (data.value === 1 || data.dutyCycle > 0);
        if (dome) {
          if (isOn) {
            dome.setAttribute('fill', '#ff1744');
            dome.setAttribute('filter', 'url(#ledBloom)');
          } else {
            dome.setAttribute('fill', '#7f1d1d');
            dome.removeAttribute('filter');
          }
        }
      }

      // RGB LED sync
      const rgbGroup = this.container.querySelector('#bb-rgb-led');
      if (rgbGroup && (bcm === 17 || bcm === 18 || bcm === 27)) {
        this.rgbState[bcm] = data.isPwm ? (data.dutyCycle / 100) * 255 : (data.value ? 255 : 0);
        const dome = rgbGroup.querySelector('.bb-rgb-dome');
        if (dome) {
          const r = Math.round(this.rgbState[17]);
          const g = Math.round(this.rgbState[18]);
          const b = Math.round(this.rgbState[27]);
          dome.setAttribute('fill', `rgb(${r}, ${g}, ${b})`);
          if (r + g + b > 20) dome.setAttribute('filter', 'url(#ledBloom)');
          else dome.removeAttribute('filter');
        }
      }
    }

    resetBreadboardComponents() {
      if (!this.container) return;
      this.container.querySelectorAll('.bb-led-dome').forEach(d => {
        d.setAttribute('fill', '#7f1d1d');
        d.removeAttribute('filter');
      });
      this.container.querySelectorAll('.bb-rgb-dome').forEach(d => {
        d.setAttribute('fill', '#e2e8f0');
        d.removeAttribute('filter');
      });
    }

    svgEl(tag, attrs = {}, textContent = null) {
      const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      if (textContent !== null) el.textContent = textContent;
      return el;
    }

    updatePinIndicator(data) {
      if (!this.container) return;
      const phys = data.physical;
      const dot = this.container.querySelector(`#pi-pin-${phys}`);
      const cDot = this.container.querySelector(`#cobbler-pin-${phys}`);

      if (data.mode === 'POWER') return;

      [dot, cDot].forEach(el => {
        if (!el) return;
        if (data.value === 1 || data.dutyCycle > 0) {
          el.setAttribute('fill', '#00e676');
          el.setAttribute('filter', 'url(#glowEffect)');
        } else {
          el.setAttribute('fill', el === cDot ? '#ffd54f' : '#424242');
          el.removeAttribute('filter');
        }
      });
    }

    resetPinIndicators() {
      if (!this.container) return;
      const pinout = global.RPi2B_Pinout;
      this.container.querySelectorAll('.pi-pin-dot').forEach(dot => {
        const p = parseInt(dot.dataset.pin, 10);
        const pDef = pinout ? pinout.getPin(p) : null;
        dot.setAttribute('fill', pDef ? pDef.color : '#ffd54f');
        dot.removeAttribute('filter');
      });
      this.container.querySelectorAll('.cobbler-pin-dot').forEach(dot => {
        dot.setAttribute('fill', '#ffd54f');
        dot.removeAttribute('filter');
      });
    }
  }

  const breadboardView = new BreadboardViewRenderer();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BreadboardViewRenderer, breadboardView };
  }
  global.BreadboardView = breadboardView;
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
