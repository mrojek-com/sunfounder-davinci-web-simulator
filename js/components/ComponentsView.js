// Interactive Virtual Hardware Component Widgets for SunFounder DaVinci Kit
// Renders realistic, animated hardware modules with full interactive controls

(function(global) {
  'use strict';

  class ComponentsViewRenderer {
    constructor() {
      this.container = null;
      this.currentLesson = null;
      this.activeWidgets = {};
      this.setupGpiolisteners();
    }

    init(containerEl) {
      this.container = containerEl;
    }

    setupGpiolisteners() {
      const vGPIO = global.VirtualGPIO || global.virtualGPIO;
      if (!vGPIO) return;

      vGPIO.on('pinChange', (pinData) => {
        this.updateFromPinChange(pinData);
      });

      vGPIO.on('reset', () => {
        this.resetAllComponents();
      });

      if (global.VirtualLCD1602) {
        global.VirtualLCD1602.onChange((lines, backlight) => {
          this.updateLcd(lines, backlight);
        });
      }
    }

    renderForLesson(lesson) {
      this.currentLesson = lesson;
      if (!this.container) return;

      this.container.innerHTML = '';
      this.activeWidgets = {};

      const lid = lesson.id;
      const card = document.createElement('div');
      card.className = 'component-card';

      // Header
      const header = document.createElement('div');
      header.className = 'component-header';
      header.innerHTML = `
        <div class="comp-title-row">
          <span class="badge ${lesson.category.toLowerCase()}">${lesson.category}</span>
          <h3>${lesson.title}</h3>
        </div>
        <p class="comp-desc">${lesson.description}</p>
      `;
      card.appendChild(header);

      // Interactive playground area
      const stage = document.createElement('div');
      stage.className = 'component-stage';
      stage.id = 'component-stage-content';

      // Select matching widget based on lesson ID
      if (lid === '1.1.1') {
        stage.appendChild(this.createSingleLedWidget('GPIO 17', 17, 'red'));
      } else if (lid === '1.1.2') {
        stage.appendChild(this.createRgbLedWidget());
      } else if (lid === '1.1.3') {
        stage.appendChild(this.createLedBarGraphWidget());
      } else if (lid === '1.1.4') {
        stage.appendChild(this.create7SegmentWidget(false));
      } else if (lid === '1.1.5') {
        stage.appendChild(this.create4DigitWidget());
      } else if (lid === '1.1.6') {
        stage.appendChild(this.createLedMatrixWidget());
      } else if (lid === '1.1.7') {
        stage.appendChild(this.createLcd1602Widget());
      } else if (lid === '1.2.1') {
        stage.appendChild(this.createActiveBuzzerWidget());
      } else if (lid === '1.2.2') {
        stage.appendChild(this.createPassiveBuzzerWidget());
      } else if (lid === '1.3.1') {
        stage.appendChild(this.createDcMotorWidget());
      } else if (lid === '1.3.2') {
        stage.appendChild(this.createServoWidget());
      } else if (lid === '1.3.3') {
        stage.appendChild(this.createStepperWidget());
      } else if (lid === '1.3.4') {
        stage.appendChild(this.createRelayWidget());
      } else if (lid === '2.1.1') {
        stage.appendChild(this.createButtonAndLedWidget());
      } else if (lid === '2.1.2') {
        stage.appendChild(this.createSlideSwitchWidget());
      } else if (lid === '2.1.3') {
        stage.appendChild(this.createTiltSwitchWidget());
      } else if (lid === '2.1.4') {
        stage.appendChild(this.createPotentiometerWidget());
      } else if (lid === '2.1.5') {
        stage.appendChild(this.createKeypadWidget());
      } else if (lid === '2.1.6') {
        stage.appendChild(this.createJoystickWidget());
      } else if (lid === '2.2.1') {
        stage.appendChild(this.createPhotoresistorWidget());
      } else if (lid === '2.2.2') {
        stage.appendChild(this.createThermistorWidget());
      } else if (lid === '2.2.3') {
        stage.appendChild(this.createDht11Widget());
      } else if (lid === '2.2.4') {
        stage.appendChild(this.createPirWidget());
      } else if (lid === '2.2.5') {
        stage.appendChild(this.createUltrasonicWidget());
      } else if (lid === '2.2.6') {
        stage.appendChild(this.createMpu6050Widget());
      } else if (lid === '3.1.7') {
        stage.appendChild(this.createTrafficLightWidget());
      } else if (lid.startsWith('3.1.')) {
        stage.appendChild(this.createIntegratedProjectWidget(lesson));
      } else {
        stage.appendChild(this.createSingleLedWidget('GPIO 17', 17, 'red'));
      }

      card.appendChild(stage);
      this.container.appendChild(card);
    }

    // ==========================================
    // 1. Single LED Widget
    // ==========================================
    createSingleLedWidget(label = 'GPIO 17', bcmPin = 17, color = 'red') {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget led-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">${label}</span>
          <span class="hw-status" id="led-status-text">OFF (0V)</span>
        </div>
        <div class="led-visual-container">
          <div class="led-bulb led-${color}" id="led-bulb"></div>
          <div class="led-glow" id="led-glow"></div>
        </div>
        <div class="hw-controls">
          <button class="btn btn-sm" id="btn-toggle-led">Manual Toggle (High/Low)</button>
        </div>
      `;

      const btnToggle = wrap.querySelector('#btn-toggle-led');
      btnToggle.onclick = () => {
        const vGPIO = global.VirtualGPIO || global.virtualGPIO;
        if (!vGPIO) return;
        const cur = vGPIO.input(bcmPin);
        vGPIO.output(bcmPin, cur === 1 ? 0 : 1);
      };

      this.activeWidgets.led = {
        pin: bcmPin,
        update: (data) => {
          const bulb = wrap.querySelector('#led-bulb');
          const glow = wrap.querySelector('#led-glow');
          const statusText = wrap.querySelector('#led-status-text');
          if (!bulb || !statusText) return;

          // Note: In lesson 1.1.1, connection is active LOW (GPIO.LOW = ON)
          const isLesson111 = (this.currentLesson && this.currentLesson.id === '1.1.1');
          const isOn = isLesson111 ? (data.value === 0) : (data.value === 1 || data.dutyCycle > 0);
          const intensity = data.isPwm ? (data.dutyCycle / 100.0) : (isOn ? 1.0 : 0.0);

          if (isOn && intensity > 0.01) {
            bulb.classList.add('lit');
            bulb.style.opacity = Math.max(0.3, intensity);
            if (glow) {
              glow.style.opacity = intensity;
              glow.style.transform = `scale(${1.0 + intensity * 0.8})`;
            }
            statusText.textContent = `ON (${(data.voltage).toFixed(2)}V${data.isPwm ? ` / ${Math.round(data.dutyCycle)}% PWM` : ''})`;
            statusText.style.color = '#00e676';
          } else {
            bulb.classList.remove('lit');
            bulb.style.opacity = 0.2;
            if (glow) glow.style.opacity = 0;
            statusText.textContent = 'OFF (0.00V)';
            statusText.style.color = '#888';
          }
        }
      };

      return wrap;
    }

    // ==========================================
    // 2. RGB LED Widget
    // ==========================================
    createRgbLedWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget rgb-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">RGB LED (Pins: R=17, G=18, B=27)</span>
          <span class="hw-status" id="rgb-hex-text">#000000</span>
        </div>
        <div class="rgb-visual-row">
          <div class="rgb-lamp-box">
            <div class="rgb-lamp" id="rgb-lamp-bulb"></div>
            <div class="rgb-lamp-glow" id="rgb-lamp-glow"></div>
          </div>
          <div class="rgb-meters">
            <div class="rgb-bar-row">
              <span class="rgb-label color-r">R (17)</span>
              <div class="rgb-track"><div class="rgb-fill fill-r" id="bar-r" style="width: 0%"></div></div>
              <span class="rgb-val" id="val-r">0%</span>
            </div>
            <div class="rgb-bar-row">
              <span class="rgb-label color-g">G (18)</span>
              <div class="rgb-track"><div class="rgb-fill fill-g" id="bar-g" style="width: 0%"></div></div>
              <span class="rgb-val" id="val-g">0%</span>
            </div>
            <div class="rgb-bar-row">
              <span class="rgb-label color-b">B (27)</span>
              <div class="rgb-track"><div class="rgb-fill fill-b" id="bar-b" style="width: 0%"></div></div>
              <span class="rgb-val" id="val-b">0%</span>
            </div>
          </div>
        </div>
      `;

      this.activeWidgets.rgb = {
        r: 0, g: 0, b: 0,
        updatePin: (bcm, dutyOrVal) => {
          if (bcm === 17) this.activeWidgets.rgb.r = dutyOrVal;
          if (bcm === 18) this.activeWidgets.rgb.g = dutyOrVal;
          if (bcm === 27) this.activeWidgets.rgb.b = dutyOrVal;
          this.refreshRgbDisplay(wrap);
        }
      };

      return wrap;
    }

    refreshRgbDisplay(wrap) {
      const rgb = this.activeWidgets.rgb;
      if (!rgb) return;

      // In SunFounder RGB lesson, common cathode or common anode is used:
      // Typically RGB values are 0-100 duty cycles
      const rP = Math.max(0, Math.min(100, rgb.r));
      const gP = Math.max(0, Math.min(100, rgb.g));
      const bP = Math.max(0, Math.min(100, rgb.b));

      const rByte = Math.round((rP / 100.0) * 255);
      const gByte = Math.round((gP / 100.0) * 255);
      const bByte = Math.round((bP / 100.0) * 255);

      const hex = `#${rByte.toString(16).padStart(2,'0')}${gByte.toString(16).padStart(2,'0')}${bByte.toString(16).padStart(2,'0')}`.toUpperCase();

      const lamp = wrap.querySelector('#rgb-lamp-bulb');
      const glow = wrap.querySelector('#rgb-lamp-glow');
      const hexText = wrap.querySelector('#rgb-hex-text');

      if (lamp) {
        lamp.style.backgroundColor = `rgb(${rByte}, ${gByte}, ${bByte})`;
        if (glow) {
          glow.style.backgroundColor = `rgb(${rByte}, ${gByte}, ${bByte})`;
          glow.style.opacity = Math.max(0.1, (rP + gP + bP) / 300.0);
          glow.style.boxShadow = `0 0 30px rgba(${rByte}, ${gByte}, ${bByte}, 0.8)`;
        }
      }
      if (hexText) hexText.textContent = hex;

      const barR = wrap.querySelector('#bar-r');
      const barG = wrap.querySelector('#bar-g');
      const barB = wrap.querySelector('#bar-b');
      const valR = wrap.querySelector('#val-r');
      const valG = wrap.querySelector('#val-g');
      const valB = wrap.querySelector('#val-b');

      if (barR) barR.style.width = `${rP}%`;
      if (barG) barG.style.width = `${gP}%`;
      if (barB) barB.style.width = `${bP}%`;
      if (valR) valR.textContent = `${Math.round(rP)}%`;
      if (valG) valG.textContent = `${Math.round(gP)}%`;
      if (valB) valB.textContent = `${Math.round(bP)}%`;
    }

    // ==========================================
    // 3. 10-Segment LED Bar Graph Widget
    // ==========================================
    createLedBarGraphWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget bar-graph-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">10-Segment LED Bar Graph</span>
          <span class="hw-status" id="bar-graph-status">Active</span>
        </div>
        <div class="bar-segments-container" id="bar-segments-row">
          ${[...Array(10)].map((_, i) => `<div class="bar-segment" id="seg-${i}" data-idx="${i}"><span class="seg-num">${i+1}</span></div>`).join('')}
        </div>
      `;

      this.activeWidgets.barGraph = {
        pins: [17, 18, 27, 22, 23, 24, 25, 2, 3, 8],
        states: new Array(10).fill(0),
        updatePin: (bcm, val) => {
          const idx = this.activeWidgets.barGraph.pins.indexOf(bcm);
          if (idx !== -1) {
            this.activeWidgets.barGraph.states[idx] = val;
            const seg = wrap.querySelector(`#seg-${idx}`);
            if (seg) {
              if (val === 1 || val > 0) seg.classList.add('lit');
              else seg.classList.remove('lit');
            }
          }
        }
      };

      return wrap;
    }

    // ==========================================
    // 4. 1-Digit 7-Segment Display Widget
    // ==========================================
    create7SegmentWidget(multiDigit = false) {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget seg7-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">7-Segment Display (74HC595 Driven)</span>
          <span class="hw-status" id="seg7-val-text">Ready</span>
        </div>
        <div class="seg7-display-box">
          <div class="seg7-digit" id="seg7-digit-0">
            <div class="seg seg-a" id="seg-a"></div>
            <div class="seg seg-b" id="seg-b"></div>
            <div class="seg seg-c" id="seg-c"></div>
            <div class="seg seg-d" id="seg-d"></div>
            <div class="seg seg-e" id="seg-e"></div>
            <div class="seg seg-f" id="seg-f"></div>
            <div class="seg seg-g" id="seg-g"></div>
            <div class="seg seg-dp" id="seg-dp"></div>
          </div>
        </div>
      `;

      this.activeWidgets.seg7 = {
        setPattern: (byte) => {
          const segs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'dp'];
          segs.forEach((s, idx) => {
            const el = wrap.querySelector(`#seg-${s}`);
            if (el) {
              const bit = (byte >> idx) & 1;
              if (bit) el.classList.add('lit');
              else el.classList.remove('lit');
            }
          });
        }
      };

      return wrap;
    }

    // ==========================================
    // 5. 4-Digit 7-Segment Display Widget
    // ==========================================
    create4DigitWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget seg7-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">4-Digit 7-Segment Display</span>
          <span class="hw-status" id="digit4-status">Multiplexed</span>
        </div>
        <div class="digit4-container">
          ${[0, 1, 2, 3].map(d => `
            <div class="seg7-digit small" id="d4-digit-${d}">
              <div class="seg seg-a"></div>
              <div class="seg seg-b"></div>
              <div class="seg seg-c"></div>
              <div class="seg seg-d"></div>
              <div class="seg seg-e"></div>
              <div class="seg seg-f"></div>
              <div class="seg seg-g"></div>
              <div class="seg seg-dp"></div>
            </div>
          `).join('')}
        </div>
      `;

      this.activeWidgets.digit4 = {
        setDigitPattern: (digitIndex, byte) => {
          const digitEl = wrap.querySelector(`#d4-digit-${digitIndex}`);
          if (!digitEl) return;
          const segs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'dp'];
          segs.forEach((s, idx) => {
            const el = digitEl.querySelector(`.seg-${s}`);
            if (el) {
              const bit = (byte >> idx) & 1;
              if (bit) el.classList.add('lit');
              else el.classList.remove('lit');
            }
          });
        }
      };

      return wrap;
    }

    // ==========================================
    // 6. 8x8 LED Dot Matrix Widget
    // ==========================================
    createLedMatrixWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget matrix-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">8x8 LED Dot Matrix</span>
          <span class="hw-status" id="matrix-status">Ready</span>
        </div>
        <div class="matrix-grid-box" id="matrix-dots-grid">
          ${[...Array(64)].map((_, i) => `<div class="matrix-dot" id="dot-${i}"></div>`).join('')}
        </div>
      `;

      this.activeWidgets.matrix = {
        setPixel: (row, col, state) => {
          const idx = row * 8 + col;
          const dot = wrap.querySelector(`#dot-${idx}`);
          if (dot) {
            if (state) dot.classList.add('lit');
            else dot.classList.remove('lit');
          }
        },
        clear: () => {
          const dots = wrap.querySelectorAll('.matrix-dot');
          dots.forEach(d => d.classList.remove('lit'));
        }
      };

      return wrap;
    }

    // ==========================================
    // 7. I2C LCD1602 Character Display Widget
    // ==========================================
    createLcd1602Widget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget lcd-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">I2C LCD1602 Display (Addr: 0x27)</span>
          <span class="hw-status" id="lcd-status">I2C Connected</span>
        </div>
        <div class="lcd-bezel">
          <div class="lcd-screen" id="lcd-screen-glass">
            <div class="lcd-line" id="lcd-line-0">SunFounder</div>
            <div class="lcd-line" id="lcd-line-1">Hello World!</div>
          </div>
        </div>
      `;

      this.activeWidgets.lcd = {
        update: (lines, backlight) => {
          const l0 = wrap.querySelector('#lcd-line-0');
          const l1 = wrap.querySelector('#lcd-line-1');
          const glass = wrap.querySelector('#lcd-screen-glass');
          if (l0 && lines[0] !== undefined) l0.textContent = lines[0].padEnd(16, ' ');
          if (l1 && lines[1] !== undefined) l1.textContent = lines[1].padEnd(16, ' ');
          if (glass) {
            if (backlight) glass.classList.remove('lcd-off');
            else glass.classList.add('lcd-off');
          }
        }
      };

      return wrap;
    }

    // ==========================================
    // 8. Active Buzzer Widget
    // ==========================================
    createActiveBuzzerWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget buzzer-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">Active Buzzer (Pin 17 via S8050 NPN)</span>
          <span class="hw-status" id="buzzer-status">Quiet</span>
        </div>
        <div class="buzzer-visual-row">
          <div class="buzzer-speaker" id="buzzer-speaker-icon">
            <div class="speaker-cone">🔊</div>
            <div class="sound-waves" id="sound-waves">
              <span class="wave w1">)</span><span class="wave w2">)</span><span class="wave w3">)</span>
            </div>
          </div>
          <div class="buzzer-info">
            <p>Built-in 2.5kHz Piezo Oscillator</p>
            <button class="btn btn-sm" id="btn-sound-toggle">Mute / Unmute Audio</button>
          </div>
        </div>
      `;

      const btnSound = wrap.querySelector('#btn-sound-toggle');
      btnSound.onclick = () => {
        if (global.VirtualAudio) {
          global.VirtualAudio.enabled = !global.VirtualAudio.enabled;
          btnSound.textContent = global.VirtualAudio.enabled ? 'Mute Audio' : 'Unmute Audio';
        }
      };

      this.activeWidgets.activeBuzzer = {
        pin: 17,
        setActive: (active) => {
          const speaker = wrap.querySelector('#buzzer-speaker-icon');
          const status = wrap.querySelector('#buzzer-status');
          if (active) {
            if (speaker) speaker.classList.add('buzzing');
            if (status) {
              status.textContent = 'BEEPING! (2.5kHz)';
              status.style.color = '#ff1744';
            }
          } else {
            if (speaker) speaker.classList.remove('buzzing');
            if (status) {
              status.textContent = 'Quiet';
              status.style.color = '#888';
            }
          }
        }
      };

      return wrap;
    }

    // ==========================================
    // 9. Passive Buzzer Widget
    // ==========================================
    createPassiveBuzzerWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget buzzer-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">Passive Buzzer (Pin 17 PWM Musical Tone)</span>
          <span class="hw-status" id="pbuzzer-status">Ready</span>
        </div>
        <div class="buzzer-visual-row">
          <div class="buzzer-speaker" id="pbuzzer-speaker-icon">
            <div class="speaker-cone">🎵</div>
            <div class="sound-waves" id="psound-waves">
              <span class="wave w1">♪</span><span class="wave w2">♫</span>
            </div>
          </div>
          <div class="buzzer-info">
            <p>Frequency: <strong id="pbuzzer-freq">0 Hz</strong></p>
            <p>Note: <strong id="pbuzzer-note">Rest</strong></p>
          </div>
        </div>
      `;

      this.activeWidgets.passiveBuzzer = {
        setFrequency: (freq) => {
          const freqEl = wrap.querySelector('#pbuzzer-freq');
          const status = wrap.querySelector('#pbuzzer-status');
          const speaker = wrap.querySelector('#pbuzzer-speaker-icon');
          if (freqEl) freqEl.textContent = `${Math.round(freq)} Hz`;
          if (freq > 0) {
            if (speaker) speaker.classList.add('buzzing');
            if (status) {
              status.textContent = 'Playing Note';
              status.style.color = '#00e676';
            }
          } else {
            if (speaker) speaker.classList.remove('buzzing');
            if (status) {
              status.textContent = 'Rest';
              status.style.color = '#888';
            }
          }
        }
      };

      return wrap;
    }

    // ==========================================
    // 10. DC Motor & L293D Widget
    // ==========================================
    createDcMotorWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget motor-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">DC Motor & L293D H-Bridge Driver</span>
          <span class="hw-status" id="motor-status">Stopped</span>
        </div>
        <div class="motor-visual-row">
          <div class="motor-fan-box">
            <div class="motor-fan-propeller" id="motor-fan-blades">
              <div class="fan-blade blade-1"></div>
              <div class="fan-blade blade-2"></div>
              <div class="fan-blade blade-3"></div>
              <div class="fan-blade blade-4"></div>
              <div class="fan-center-cap"></div>
            </div>
          </div>
          <div class="motor-telemetry">
            <div class="gauge-row"><span>Speed (PWM):</span> <strong id="motor-speed-val">0%</strong></div>
            <div class="gauge-row"><span>Direction:</span> <strong id="motor-dir-val">IDLE</strong></div>
            <div class="gauge-row"><span>Estimated RPM:</span> <strong id="motor-rpm-val">0 RPM</strong></div>
          </div>
        </div>
      `;

      this.activeWidgets.motor = {
        in1: 0, in2: 0, pwmDuty: 0,
        update: () => {
          const fan = wrap.querySelector('#motor-fan-blades');
          const speedEl = wrap.querySelector('#motor-speed-val');
          const dirEl = wrap.querySelector('#motor-dir-val');
          const rpmEl = wrap.querySelector('#motor-rpm-val');
          const status = wrap.querySelector('#motor-status');

          const m = this.activeWidgets.motor;
          let dir = 'IDLE';
          let active = false;

          if (m.in1 === 1 && m.in2 === 0) {
            dir = 'FORWARD (CW)';
            active = true;
          } else if (m.in1 === 0 && m.in2 === 1) {
            dir = 'REVERSE (CCW)';
            active = true;
          }

          const duty = active ? Math.max(0, Math.min(100, m.pwmDuty)) : 0;
          const rpm = Math.round(duty * 65); // approx 6500 max rpm

          if (fan) {
            if (duty > 0 && active) {
              const dur = Math.max(0.05, (1.0 - (duty / 100)) * 0.5 + 0.05);
              fan.style.animation = `fanSpin ${dur}s linear infinite`;
              if (dir.includes('CCW')) fan.style.animationDirection = 'reverse';
              else fan.style.animationDirection = 'normal';
            } else {
              fan.style.animation = 'none';
            }
          }

          if (speedEl) speedEl.textContent = `${Math.round(duty)}%`;
          if (dirEl) dirEl.textContent = dir;
          if (rpmEl) rpmEl.textContent = `${rpm} RPM`;
          if (status) {
            status.textContent = active && duty > 0 ? `RUNNING (${rpm} RPM)` : 'Stopped';
            status.style.color = active && duty > 0 ? '#00e676' : '#888';
          }
        }
      };

      return wrap;
    }

    // ==========================================
    // 11. SG90 Servo Motor Widget
    // ==========================================
    createServoWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget servo-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">SG90 9g Micro Servo (PWM 50Hz)</span>
          <span class="hw-status" id="servo-angle-status">90°</span>
        </div>
        <div class="servo-visual-row">
          <div class="servo-housing">
            <div class="servo-protractor">
              <span class="prot-mark mark-0">0°</span>
              <span class="prot-mark mark-90">90°</span>
              <span class="prot-mark mark-180">180°</span>
            </div>
            <div class="servo-arm" id="servo-arm-horn" style="transform: rotate(0deg)">
              <div class="arm-blade"></div>
              <div class="arm-pivot"></div>
            </div>
          </div>
          <div class="servo-controls">
            <label>Angle Control: <strong id="servo-deg-label">90°</strong></label>
            <input type="range" min="0" max="180" value="90" class="hw-slider" id="slider-servo-angle">
          </div>
        </div>
      `;

      const slider = wrap.querySelector('#slider-servo-angle');
      const degLabel = wrap.querySelector('#servo-deg-label');
      slider.oninput = (e) => {
        const deg = parseInt(e.target.value, 10);
        degLabel.textContent = `${deg}°`;
        this.setServoAngle(wrap, deg);
      };

      this.activeWidgets.servo = {
        setAngle: (deg) => this.setServoAngle(wrap, deg)
      };

      return wrap;
    }

    setServoAngle(wrap, degrees) {
      const arm = wrap.querySelector('#servo-arm-horn');
      const status = wrap.querySelector('#servo-angle-status');
      const degLabel = wrap.querySelector('#servo-deg-label');
      const slider = wrap.querySelector('#slider-servo-angle');

      const deg = Math.max(0, Math.min(180, degrees));
      const rotation = deg - 90; // 0deg = -90deg, 90deg = 0deg, 180deg = +90deg
      if (arm) arm.style.transform = `rotate(${rotation}deg)`;
      if (status) status.textContent = `${deg}°`;
      if (degLabel) degLabel.textContent = `${deg}°`;
      if (slider && parseInt(slider.value, 10) !== deg) slider.value = deg;
    }

    // ==========================================
    // 12. Stepper Motor 28BYJ-48 Widget
    // ==========================================
    createStepperWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget stepper-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">28BYJ-48 Stepper & ULN2003 Driver</span>
          <span class="hw-status" id="stepper-status">Step: 0</span>
        </div>
        <div class="stepper-visual-row">
          <div class="stepper-motor-disk">
            <div class="stepper-pointer" id="stepper-pointer" style="transform: rotate(0deg)"></div>
          </div>
          <div class="uln2003-leds">
            <span class="led-indicator" id="u-led-a">A</span>
            <span class="led-indicator" id="u-led-b">B</span>
            <span class="led-indicator" id="u-led-c">C</span>
            <span class="led-indicator" id="u-led-d">D</span>
          </div>
        </div>
      `;

      this.activeWidgets.stepper = {
        steps: 0,
        setPhase: (a, b, c, d) => {
          const la = wrap.querySelector('#u-led-a');
          const lb = wrap.querySelector('#u-led-b');
          const lc = wrap.querySelector('#u-led-c');
          const ld = wrap.querySelector('#u-led-d');
          if (la) la.classList.toggle('lit', Boolean(a));
          if (lb) lb.classList.toggle('lit', Boolean(b));
          if (lc) lc.classList.toggle('lit', Boolean(c));
          if (ld) ld.classList.toggle('lit', Boolean(d));

          this.activeWidgets.stepper.steps++;
          const angle = (this.activeWidgets.stepper.steps * (360 / 64)) % 360;
          const ptr = wrap.querySelector('#stepper-pointer');
          if (ptr) ptr.style.transform = `rotate(${angle}deg)`;
          const st = wrap.querySelector('#stepper-status');
          if (st) st.textContent = `Step: ${this.activeWidgets.stepper.steps} (${Math.round(angle)}°)`;
        }
      };

      return wrap;
    }

    // ==========================================
    // 13. 5V Relay Module Widget
    // ==========================================
    createRelayWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget relay-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">5V Relay Module (Electromechanical)</span>
          <span class="hw-status" id="relay-status">RELEASED (NC Connected)</span>
        </div>
        <div class="relay-module-box">
          <div class="relay-cube" id="relay-cube-box">
            <div class="relay-led power-led lit">PWR</div>
            <div class="relay-led trigger-led" id="relay-trigger-led">IN</div>
          </div>
          <div class="relay-terminals">
            <div class="term-row"><span class="term-pin">COM</span> Common Terminal</div>
            <div class="term-row"><span class="term-pin" id="term-nc">NC</span> Closed (Active when OFF)</div>
            <div class="term-row"><span class="term-pin" id="term-no">NO</span> Open (Active when ON)</div>
          </div>
        </div>
      `;

      this.activeWidgets.relay = {
        pin: 17,
        setState: (active) => {
          const cube = wrap.querySelector('#relay-cube-box');
          const trigLed = wrap.querySelector('#relay-trigger-led');
          const status = wrap.querySelector('#relay-status');
          const termNc = wrap.querySelector('#term-nc');
          const termNo = wrap.querySelector('#term-no');

          if (global.VirtualAudio) {
            global.VirtualAudio.playRelayClick(active);
          }

          if (active) {
            if (cube) cube.classList.add('relay-engaged');
            if (trigLed) trigLed.classList.add('lit');
            if (termNo) termNo.classList.add('connected');
            if (termNc) termNc.classList.remove('connected');
            if (status) {
              status.textContent = 'ENGAGED (NO Connected)';
              status.style.color = '#00e676';
            }
          } else {
            if (cube) cube.classList.remove('relay-engaged');
            if (trigLed) trigLed.classList.remove('lit');
            if (termNc) termNc.classList.add('connected');
            if (termNo) termNo.classList.remove('connected');
            if (status) {
              status.textContent = 'RELEASED (NC Connected)';
              status.style.color = '#888';
            }
          }
        }
      };

      return wrap;
    }

    // ==========================================
    // 14. Push Button & LED Widget
    // ==========================================
    createButtonAndLedWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget button-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">Button (Pin 18) & LED (Pin 17)</span>
          <span class="hw-status" id="btn-status">Button: Released</span>
        </div>
        <div class="btn-led-row">
          <div class="push-button-box">
            <button class="tactile-btn" id="tactile-push-btn">
              <span class="btn-cap"></span>
            </button>
            <span class="btn-subtext">Click or Hold Button</span>
          </div>
          <div class="led-visual-container mini">
            <div class="led-bulb led-red" id="btn-led-bulb"></div>
            <div class="led-glow" id="btn-led-glow"></div>
            <span class="btn-subtext">LED (17)</span>
          </div>
        </div>
      `;

      const tBtn = wrap.querySelector('#tactile-push-btn');
      const bStatus = wrap.querySelector('#btn-status');

      const press = () => {
        tBtn.classList.add('pressed');
        bStatus.textContent = 'Button: PRESSED (LOW)';
        bStatus.style.color = '#00e676';
        if (global.VirtualGPIO) {
          // Push button connects to GND when pressed (active LOW)
          global.VirtualGPIO.setExternalInput(18, 0);
        }
      };

      const release = () => {
        tBtn.classList.remove('pressed');
        bStatus.textContent = 'Button: Released (HIGH)';
        bStatus.style.color = '#888';
        if (global.VirtualGPIO) {
          global.VirtualGPIO.setExternalInput(18, 1);
        }
      };

      tBtn.onmousedown = press;
      tBtn.onmouseup = release;
      tBtn.onmouseleave = release;
      tBtn.ontouchstart = press;
      tBtn.ontouchend = release;

      this.activeWidgets.buttonLed = {
        updateLed: (val) => {
          const bulb = wrap.querySelector('#btn-led-bulb');
          const glow = wrap.querySelector('#btn-led-glow');
          const isOn = (val === 1);
          if (bulb) bulb.classList.toggle('lit', isOn);
          if (glow) glow.style.opacity = isOn ? '1' : '0';
        }
      };

      return wrap;
    }

    // ==========================================
    // 15. Slide Switch Widget
    // ==========================================
    createSlideSwitchWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget switch-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">Slide Switch (SPDT)</span>
          <span class="hw-status" id="slide-status">Position: LEFT (LOW)</span>
        </div>
        <div class="switch-row">
          <label class="slide-toggle">
            <input type="checkbox" id="slide-chk">
            <span class="slide-slider"></span>
          </label>
        </div>
      `;

      const chk = wrap.querySelector('#slide-chk');
      const st = wrap.querySelector('#slide-status');
      chk.onchange = (e) => {
        const val = e.target.checked ? 1 : 0;
        st.textContent = `Position: ${val ? 'RIGHT (HIGH)' : 'LEFT (LOW)'}`;
        if (global.VirtualGPIO) {
          global.VirtualGPIO.setExternalInput(18, val);
        }
      };

      return wrap;
    }

    // ==========================================
    // 16. Tilt Switch Widget
    // ==========================================
    createTiltSwitchWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget tilt-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">Ball Tilt Switch</span>
          <span class="hw-status" id="tilt-status">Level (0°)</span>
        </div>
        <div class="tilt-tube-box" id="tilt-tube">
          <div class="tilt-tube">
            <div class="tilt-ball" id="tilt-ball"></div>
            <div class="tilt-contacts"></div>
          </div>
        </div>
        <div class="hw-controls">
          <button class="btn btn-sm" id="btn-tilt-toggle">Simulate Physical Tilt (Angle 90°)</button>
        </div>
      `;

      let isTilted = false;
      const btn = wrap.querySelector('#btn-tilt-toggle');
      const tube = wrap.querySelector('#tilt-tube');
      const ball = wrap.querySelector('#tilt-ball');
      const st = wrap.querySelector('#tilt-status');

      btn.onclick = () => {
        isTilted = !isTilted;
        if (isTilted) {
          tube.style.transform = 'rotate(70deg)';
          ball.style.transform = 'translate(45px, 0)';
          st.textContent = 'TILTED! (Circuit Open / Closed)';
          st.style.color = '#ff9800';
          if (global.VirtualGPIO) global.VirtualGPIO.setExternalInput(18, 0);
        } else {
          tube.style.transform = 'rotate(0deg)';
          ball.style.transform = 'translate(0, 0)';
          st.textContent = 'Level (0°)';
          st.style.color = '#888';
          if (global.VirtualGPIO) global.VirtualGPIO.setExternalInput(18, 1);
        }
      };

      return wrap;
    }

    // ==========================================
    // 17. Potentiometer Widget
    // ==========================================
    createPotentiometerWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget pot-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">10kΩ Rotary Potentiometer & ADC0834</span>
          <span class="hw-status" id="pot-status">ADC Value: 128 (1.65V)</span>
        </div>
        <div class="pot-dial-row">
          <div class="pot-dial-box">
            <div class="pot-knob" id="pot-knob" style="transform: rotate(0deg)">
              <div class="knob-notch"></div>
            </div>
          </div>
          <div class="pot-controls">
            <input type="range" min="0" max="255" value="128" class="hw-slider" id="slider-pot">
            <div class="pot-readouts">
              <span>Digital: <strong id="pot-dig-val">128</strong> / 255</span>
              <span>Voltage: <strong id="pot-volt-val">1.65 V</strong></span>
            </div>
          </div>
        </div>
      `;

      const slider = wrap.querySelector('#slider-pot');
      const knob = wrap.querySelector('#pot-knob');
      const digVal = wrap.querySelector('#pot-dig-val');
      const voltVal = wrap.querySelector('#pot-volt-val');
      const status = wrap.querySelector('#pot-status');

      slider.oninput = (e) => {
        const val = parseInt(e.target.value, 10);
        const volt = (val / 255.0) * 3.3;
        const deg = (val / 255.0) * 270 - 135;

        knob.style.transform = `rotate(${deg}deg)`;
        digVal.textContent = String(val);
        voltVal.textContent = `${volt.toFixed(2)} V`;
        status.textContent = `ADC: ${val} (${volt.toFixed(2)}V)`;

        if (global.VirtualADC0834) {
          global.VirtualADC0834.setChannelValue(0, val);
        }
      };

      return wrap;
    }

    // ==========================================
    // 18. 4x4 Matrix Keypad Widget
    // ==========================================
    createKeypadWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget keypad-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">4x4 Matrix Keypad (16 Buttons)</span>
          <span class="hw-status" id="keypad-last-key">Last Key: None</span>
        </div>
        <div class="keypad-matrix-grid">
          ${['1','2','3','A','4','5','6','B','7','8','9','C','*','0','#','D'].map(k => `
            <button class="keypad-btn" data-key="${k}">${k}</button>
          `).join('')}
        </div>
      `;

      const lastKey = wrap.querySelector('#keypad-last-key');
      wrap.querySelectorAll('.keypad-btn').forEach(btn => {
        btn.onclick = (e) => {
          const k = e.target.dataset.key;
          lastKey.textContent = `Last Key: '${k}'`;
          lastKey.style.color = '#00e676';
        };
      });

      return wrap;
    }

    // ==========================================
    // 19. Analog Joystick Widget
    // ==========================================
    createJoystickWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget joystick-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">PS2 Dual-Axis Analog Joystick</span>
          <span class="hw-status" id="joy-status">X: 128, Y: 128, Z: 1</span>
        </div>
        <div class="joystick-arena">
          <div class="joy-pad" id="joy-gimbal">
            <div class="joy-stick" id="joy-stick-knob" style="left: 60px; top: 60px;"></div>
          </div>
          <div class="joy-telemetry">
            <div>X-Axis (ADC CH0): <strong id="joy-x-val">128</strong></div>
            <div>Y-Axis (ADC CH1): <strong id="joy-y-val">128</strong></div>
            <div>Z-Button (GPIO 18): <strong id="joy-z-val">RELEASED</strong></div>
            <button class="btn btn-sm" id="btn-joy-z">Press Joystick Button (Z)</button>
          </div>
        </div>
      `;

      const gimbal = wrap.querySelector('#joy-gimbal');
      const knob = wrap.querySelector('#joy-stick-knob');
      const xVal = wrap.querySelector('#joy-x-val');
      const yVal = wrap.querySelector('#joy-y-val');
      const zVal = wrap.querySelector('#joy-z-val');
      const btnZ = wrap.querySelector('#btn-joy-z');

      let dragging = false;
      const updateStick = (clientX, clientY) => {
        const rect = gimbal.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        let dx = clientX - centerX;
        let dy = clientY - centerY;
        const maxDist = 45;
        const dist = Math.hypot(dx, dy);
        if (dist > maxDist) {
          dx = (dx / dist) * maxDist;
          dy = (dy / dist) * maxDist;
        }

        knob.style.left = `${60 + dx}px`;
        knob.style.top = `${60 + dy}px`;

        const normX = Math.round(((dx + maxDist) / (maxDist * 2)) * 255);
        const normY = Math.round(((dy + maxDist) / (maxDist * 2)) * 255);

        xVal.textContent = String(normX);
        yVal.textContent = String(normY);

        if (global.VirtualADC0834) {
          global.VirtualADC0834.setChannelValue(0, normX);
          global.VirtualADC0834.setChannelValue(1, normY);
        }
      };

      gimbal.onmousedown = (e) => { dragging = true; updateStick(e.clientX, e.clientY); };
      window.addEventListener('mousemove', (e) => { if (dragging) updateStick(e.clientX, e.clientY); });
      window.addEventListener('mouseup', () => {
        if (dragging) {
          dragging = false;
          knob.style.left = '60px';
          knob.style.top = '60px';
          xVal.textContent = '128';
          yVal.textContent = '128';
          if (global.VirtualADC0834) {
            global.VirtualADC0834.setChannelValue(0, 128);
            global.VirtualADC0834.setChannelValue(1, 128);
          }
        }
      });

      btnZ.onmousedown = () => {
        zVal.textContent = 'PRESSED (0)';
        if (global.VirtualGPIO) global.VirtualGPIO.setExternalInput(18, 0);
      };
      btnZ.onmouseup = () => {
        zVal.textContent = 'RELEASED (1)';
        if (global.VirtualGPIO) global.VirtualGPIO.setExternalInput(18, 1);
      };

      return wrap;
    }

    // ==========================================
    // 20. Photoresistor (LDR) Widget
    // ==========================================
    createPhotoresistorWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget ldr-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">Photoresistor (LDR Light Sensor)</span>
          <span class="hw-status" id="ldr-status">Light: 50%</span>
        </div>
        <div class="sensor-slider-row">
          <div class="sensor-icon" id="ldr-sun-icon">☀️</div>
          <div class="slider-box">
            <label>Ambient Light Intensity: <strong id="ldr-lux-label">500 Lux (50%)</strong></label>
            <input type="range" min="0" max="255" value="128" class="hw-slider" id="slider-ldr">
          </div>
        </div>
      `;

      const slider = wrap.querySelector('#slider-ldr');
      const label = wrap.querySelector('#ldr-lux-label');
      const st = wrap.querySelector('#ldr-status');
      slider.oninput = (e) => {
        const val = parseInt(e.target.value, 10);
        const lux = Math.round((val / 255.0) * 1000);
        label.textContent = `${lux} Lux (${Math.round((val/255)*100)}%)`;
        st.textContent = `ADC Value: ${val}`;
        if (global.VirtualADC0834) {
          global.VirtualADC0834.setChannelValue(0, val);
        }
      };

      return wrap;
    }

    // ==========================================
    // 21. Thermistor (NTC) Widget
    // ==========================================
    createThermistorWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget thermistor-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">NTC Thermistor Temperature Sensor</span>
          <span class="hw-status" id="temp-status">25.0 °C</span>
        </div>
        <div class="sensor-slider-row">
          <div class="sensor-icon">🌡️</div>
          <div class="slider-box">
            <label>Simulated Temperature: <strong id="therm-c-label">25.0 °C (77.0 °F)</strong></label>
            <input type="range" min="0" max="80" value="25" class="hw-slider" id="slider-therm">
          </div>
        </div>
      `;

      const slider = wrap.querySelector('#slider-therm');
      const label = wrap.querySelector('#therm-c-label');
      const st = wrap.querySelector('#temp-status');

      slider.oninput = (e) => {
        const degC = parseFloat(e.target.value);
        const degF = degC * 1.8 + 32;
        label.textContent = `${degC.toFixed(1)} °C (${degF.toFixed(1)} °F)`;
        st.textContent = `${degC.toFixed(1)} °C`;

        // Calculate simulated ADC value corresponding to NTC curve
        // Higher temp = lower resistance
        const adcVal = Math.max(10, Math.min(245, Math.round(180 - degC * 1.6)));
        if (global.VirtualADC0834) {
          global.VirtualADC0834.setChannelValue(0, adcVal);
        }
      };

      return wrap;
    }

    // ==========================================
    // 22. DHT11 Temp & Humidity Widget
    // ==========================================
    createDht11Widget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget dht-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">DHT11 Digital Temp & Humidity</span>
          <span class="hw-status" id="dht-status">24°C / 50% RH</span>
        </div>
        <div class="dht-dual-sliders">
          <div class="slider-box">
            <label>Temperature: <strong id="dht-t-val">24 °C</strong></label>
            <input type="range" min="0" max="50" value="24" class="hw-slider" id="slider-dht-t">
          </div>
          <div class="slider-box">
            <label>Relative Humidity: <strong id="dht-h-val">50 %</strong></label>
            <input type="range" min="20" max="90" value="50" class="hw-slider" id="slider-dht-h">
          </div>
        </div>
      `;

      const slT = wrap.querySelector('#slider-dht-t');
      const slH = wrap.querySelector('#slider-dht-h');
      const lblT = wrap.querySelector('#dht-t-val');
      const lblH = wrap.querySelector('#dht-h-val');
      const st = wrap.querySelector('#dht-status');

      const update = () => {
        lblT.textContent = `${slT.value} °C`;
        lblH.textContent = `${slH.value} %`;
        st.textContent = `${slT.value}°C / ${slH.value}% RH`;
      };
      slT.oninput = update;
      slH.oninput = update;

      return wrap;
    }

    // ==========================================
    // 23. PIR Motion Sensor Widget
    // ==========================================
    createPirWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget pir-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">PIR Pyroelectric Infrared Motion Sensor</span>
          <span class="hw-status" id="pir-status">No Motion</span>
        </div>
        <div class="pir-dome-row">
          <div class="pir-dome" id="pir-dome-icon">
            <div class="fresnel-lens"></div>
          </div>
          <div class="pir-controls">
            <button class="btn btn-primary" id="btn-trigger-motion">Simulate Human Motion Passing By</button>
            <p class="small-text">Generates 3.3V pulse on GPIO pin 17</p>
          </div>
        </div>
      `;

      const btn = wrap.querySelector('#btn-trigger-motion');
      const dome = wrap.querySelector('#pir-dome-icon');
      const st = wrap.querySelector('#pir-status');

      btn.onclick = () => {
        dome.classList.add('motion-detected');
        st.textContent = 'MOTION DETECTED! (High)';
        st.style.color = '#00e676';
        if (global.VirtualGPIO) global.VirtualGPIO.setExternalInput(17, 1);

        setTimeout(() => {
          dome.classList.remove('motion-detected');
          st.textContent = 'No Motion (Idle)';
          st.style.color = '#888';
          if (global.VirtualGPIO) global.VirtualGPIO.setExternalInput(17, 0);
        }, 2500);
      };

      return wrap;
    }

    // ==========================================
    // 24. Ultrasonic Distance Sensor HC-SR04
    // ==========================================
    createUltrasonicWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget sonar-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">HC-SR04 Ultrasonic Distance Sensor</span>
          <span class="hw-status" id="sonar-status">Distance: 25.0 cm</span>
        </div>
        <div class="sonar-visual-row">
          <div class="sonar-eyes">
            <div class="sonar-transducer tx"><span>T</span></div>
            <div class="sonar-transducer rx"><span>R</span></div>
          </div>
          <div class="sonar-controls">
            <label>Target Obstacle Distance: <strong id="sonar-cm-val">25.0 cm</strong></label>
            <input type="range" min="2" max="400" value="25" class="hw-slider" id="slider-distance">
            <div class="sonar-math">
              <span>Time of Flight: <strong id="sonar-time-val">1470 µs</strong></span>
              <span>Speed of Sound: <strong>340 m/s</strong></span>
            </div>
          </div>
        </div>
      `;

      const slider = wrap.querySelector('#slider-distance');
      const cmVal = wrap.querySelector('#sonar-cm-val');
      const timeVal = wrap.querySelector('#sonar-time-val');
      const st = wrap.querySelector('#sonar-status');

      slider.oninput = (e) => {
        const d = parseFloat(e.target.value);
        const us = Math.round((d * 2.0 / 0.034));
        cmVal.textContent = `${d.toFixed(1)} cm`;
        timeVal.textContent = `${us} µs`;
        st.textContent = `Distance: ${d.toFixed(1)} cm`;
      };

      return wrap;
    }

    // ==========================================
    // 25. MPU6050 6-Axis IMU Widget
    // ==========================================
    createMpu6050Widget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget mpu-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">MPU6050 6-Axis Gyroscope & Accelerometer</span>
          <span class="hw-status" id="mpu-status">I2C (0x68)</span>
        </div>
        <div class="mpu-visual-row">
          <div class="mpu-cube-scene">
            <div class="mpu-cube" id="mpu-3d-cube">
              <div class="cube-face front">TOP</div>
              <div class="cube-face back">BOT</div>
              <div class="cube-face left">L</div>
              <div class="cube-face right">R</div>
              <div class="cube-face top">Y+</div>
              <div class="cube-face bottom">Y-</div>
            </div>
          </div>
          <div class="mpu-sliders">
            <div>Pitch: <input type="range" min="-90" max="90" value="0" id="sl-pitch"></div>
            <div>Roll:  <input type="range" min="-90" max="90" value="0" id="sl-roll"></div>
          </div>
        </div>
      `;

      const cube = wrap.querySelector('#mpu-3d-cube');
      const slP = wrap.querySelector('#sl-pitch');
      const slR = wrap.querySelector('#sl-roll');

      const updateCube = () => {
        const p = slP.value;
        const r = slR.value;
        cube.style.transform = `rotateX(${p}deg) rotateZ(${r}deg)`;
      };
      slP.oninput = updateCube;
      slR.oninput = updateCube;

      return wrap;
    }

    // ==========================================
    // 26. Traffic Light System Widget (Lesson 3.1.7)
    // ==========================================
    createTrafficLightWidget() {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget traffic-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">Traffic Light System (Lesson 3.1.7)</span>
          <span class="hw-status" id="traffic-status">Running</span>
        </div>
        <div class="traffic-visual-row">
          <div class="traffic-light-post">
            <div class="traffic-lamp lamp-red" id="lamp-red"></div>
            <div class="traffic-lamp lamp-yellow" id="lamp-yellow"></div>
            <div class="traffic-lamp lamp-green" id="lamp-green"></div>
          </div>
          <div class="traffic-pedestrian-box">
            <div class="seg7-digit small" id="traffic-seg-digit">
              <div class="seg seg-a"></div><div class="seg seg-b"></div><div class="seg seg-c"></div>
              <div class="seg seg-d"></div><div class="seg seg-e"></div><div class="seg seg-f"></div>
              <div class="seg seg-g"></div>
            </div>
            <button class="btn btn-sm" id="btn-pedestrian-cross">Pedestrian Button (Pin 22)</button>
          </div>
        </div>
      `;

      const btnPed = wrap.querySelector('#btn-pedestrian-cross');
      btnPed.onclick = () => {
        if (global.VirtualGPIO) {
          global.VirtualGPIO.setExternalInput(22, 0); // Active LOW button press
          setTimeout(() => global.VirtualGPIO.setExternalInput(22, 1), 500);
        }
      };

      this.activeWidgets.traffic = {
        updateLamps: (red, yellow, green) => {
          const lR = wrap.querySelector('#lamp-red');
          const lY = wrap.querySelector('#lamp-yellow');
          const lG = wrap.querySelector('#lamp-green');
          if (lR) lR.classList.toggle('lit', Boolean(red));
          if (lY) lY.classList.toggle('lit', Boolean(yellow));
          if (lG) lG.classList.toggle('lit', Boolean(green));
        }
      };

      return wrap;
    }

    // ==========================================
    // 27. Integrated Smart Project Widget (3.1.x)
    // ==========================================
    createIntegratedProjectWidget(lesson) {
      const wrap = document.createElement('div');
      wrap.className = 'hw-widget integrated-widget';
      wrap.innerHTML = `
        <div class="hw-module-header">
          <span class="hw-tag">${lesson.title}</span>
          <span class="hw-status" id="proj-status">Active Project</span>
        </div>
        <div class="integrated-modules-container" id="integrated-submodules">
          <!-- Dynamically inject modules based on lesson -->
        </div>
      `;

      const subs = wrap.querySelector('#integrated-submodules');
      // Render sub-widgets based on components in lesson
      if (lesson.id === '3.1.2') { // Welcome: PIR + LCD + Buzzer
        subs.appendChild(this.createLcd1602Widget());
        subs.appendChild(this.createPirWidget());
      } else if (lesson.id === '3.1.3') { // Reversing Alarm: Ultrasonic + Buzzer + LCD
        subs.appendChild(this.createUltrasonicWidget());
        subs.appendChild(this.createLcd1602Widget());
        subs.appendChild(this.createActiveBuzzerWidget());
      } else if (lesson.id === '3.1.4') { // Smart Fan: Thermistor + Motor + Button
        subs.appendChild(this.createThermistorWidget());
        subs.appendChild(this.createDcMotorWidget());
      } else if (lesson.id === '3.1.9') { // Password Lock: Keypad + LCD
        subs.appendChild(this.createLcd1602Widget());
        subs.appendChild(this.createKeypadWidget());
      } else {
        subs.appendChild(this.createLcd1602Widget());
        subs.appendChild(this.createSingleLedWidget('GPIO 17', 17, 'red'));
      }

      return wrap;
    }

    // General update dispatcher when GPIO pins change
    updateFromPinChange(pinData) {
      const bcm = pinData.bcm;
      const phys = pinData.physical;
      const val = pinData.value;
      const duty = pinData.dutyCycle;

      // Single LED
      if (this.activeWidgets.led && this.activeWidgets.led.pin === bcm) {
        this.activeWidgets.led.update(pinData);
      }

      // RGB LED
      if (this.activeWidgets.rgb) {
        if (bcm === 17 || bcm === 18 || bcm === 27) {
          this.activeWidgets.rgb.updatePin(bcm, pinData.isPwm ? duty : (val ? 100 : 0));
        }
      }

      // LED Bar Graph
      if (this.activeWidgets.barGraph) {
        this.activeWidgets.barGraph.updatePin(bcm, val);
      }

      // Active Buzzer
      if (this.activeWidgets.activeBuzzer && this.activeWidgets.activeBuzzer.pin === bcm) {
        // NPN Transistor drives buzzer: GPIO.LOW = OFF, GPIO.HIGH = ON (or inverted depending on driver)
        this.activeWidgets.activeBuzzer.setActive(val === 1);
      }

      // Passive Buzzer
      if (this.activeWidgets.passiveBuzzer && bcm === 17) {
        if (pinData.isPwm && duty > 0) {
          this.activeWidgets.passiveBuzzer.setFrequency(pinData.frequency || 440);
        } else {
          this.activeWidgets.passiveBuzzer.setFrequency(0);
        }
      }

      // Motor & L293D
      if (this.activeWidgets.motor) {
        if (bcm === 17) this.activeWidgets.motor.in1 = val;
        if (bcm === 27) this.activeWidgets.motor.in2 = val;
        if (bcm === 18) this.activeWidgets.motor.pwmDuty = pinData.isPwm ? duty : (val ? 100 : 0);
        this.activeWidgets.motor.update();
      }

      // Relay
      if (this.activeWidgets.relay && this.activeWidgets.relay.pin === bcm) {
        this.activeWidgets.relay.setState(val === 1);
      }

      // Traffic Light
      if (this.activeWidgets.traffic) {
        if (bcm === 25 || bcm === 8 || bcm === 7) {
          const vGPIO = global.VirtualGPIO || global.virtualGPIO;
          if (vGPIO) {
            this.activeWidgets.traffic.updateLamps(
              vGPIO.input(25) === 1,
              vGPIO.input(8) === 1,
              vGPIO.input(7) === 1
            );
          }
        }
      }
    }

    updateLcd(lines, backlight) {
      if (this.activeWidgets.lcd) {
        this.activeWidgets.lcd.update(lines, backlight);
      }
    }

    resetAllComponents() {
      if (this.activeWidgets.led) this.activeWidgets.led.update({ value: 0, dutyCycle: 0, voltage: 0, isPwm: false });
      if (this.activeWidgets.rgb) {
        this.activeWidgets.rgb.r = 0;
        this.activeWidgets.rgb.g = 0;
        this.activeWidgets.rgb.b = 0;
        const rgbWrap = document.querySelector('.rgb-widget');
        if (rgbWrap) this.refreshRgbDisplay(rgbWrap);
      }
      if (this.activeWidgets.motor) {
        this.activeWidgets.motor.in1 = 0;
        this.activeWidgets.motor.in2 = 0;
        this.activeWidgets.motor.pwmDuty = 0;
        this.activeWidgets.motor.update();
      }
      if (this.activeWidgets.relay) this.activeWidgets.relay.setState(false);
      if (this.activeWidgets.activeBuzzer) this.activeWidgets.activeBuzzer.setActive(false);
      if (this.activeWidgets.passiveBuzzer) this.activeWidgets.passiveBuzzer.setFrequency(0);
    }
  }

  const componentsView = new ComponentsViewRenderer();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ComponentsViewRenderer, componentsView };
  } else {
    global.ComponentsView = componentsView;
  }
})(typeof window !== 'undefined' ? window : this);
