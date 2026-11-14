// Virtual RPi.GPIO Engine for Raspberry Pi 2 Model B
// Fully simulates the official RPi.GPIO Python package in JavaScript

(function(global) {
  'use strict';

  class VirtualGPIOEngine {
    constructor() {
      // Constants matching RPi.GPIO
      this.BCM = 11;
      this.BOARD = 10;
      this.OUT = 0;
      this.IN = 1;
      this.HIGH = 1;
      this.LOW = 0;
      this.PUD_OFF = 0;
      this.PUD_DOWN = 1;
      this.PUD_UP = 2;
      this.RISING = 1;
      this.FALLING = 2;
      this.BOTH = 3;

      this.currentMode = this.BCM; // Default to BCM
      this.pins = {}; // Keyed by physical pin 1..40
      this.pwmInstances = [];
      this.listeners = {
        pinChange: [],
        modeChange: [],
        reset: []
      };

      this.initPins();
    }

    initPins() {
      for (let p = 1; p <= 40; p++) {
        const pinDef = global.RPi2B_Pinout ? global.RPi2B_Pinout.getPin(p) : { pin: p, bcm: null };
        this.pins[p] = {
          physical: p,
          bcm: pinDef ? pinDef.bcm : null,
          mode: 'UNCONFIGURED', // 'IN', 'OUT', 'PWM', 'UNCONFIGURED'
          value: 0,             // 0 or 1
          voltage: 0.0,         // 0.0V to 3.3V (or 5V for power)
          pull: this.PUD_OFF,
          dutyCycle: 0,         // 0 - 100 for PWM
          frequency: 0,
          isPwm: false,
          eventDetect: null
        };

        // Initialize dedicated power rails
        if (pinDef) {
          if (pinDef.type === 'power3v3') {
            this.pins[p].mode = 'POWER';
            this.pins[p].value = 1;
            this.pins[p].voltage = 3.3;
          } else if (pinDef.type === 'power5v') {
            this.pins[p].mode = 'POWER';
            this.pins[p].value = 1;
            this.pins[p].voltage = 5.0;
          } else if (pinDef.type === 'ground') {
            this.pins[p].mode = 'GROUND';
            this.pins[p].value = 0;
            this.pins[p].voltage = 0.0;
          }
        }
      }
    }

    // Resolves a channel number into a physical pin integer based on currentMode
    resolvePhysicalPin(channel) {
      if (typeof channel !== 'number') {
        channel = parseInt(channel, 10);
      }
      if (isNaN(channel)) return null;

      if (this.currentMode === this.BOARD) {
        if (channel >= 1 && channel <= 40) return channel;
        return null;
      } else {
        // BCM mode
        const pinout = global.RPi2B_Pinout || (typeof require !== 'undefined' ? require('./pinout.js') : null);
        if (pinout) {
          return pinout.bcmToPhysical(channel);
        }
        // Fallback search
        for (let p = 1; p <= 40; p++) {
          if (this.pins[p].bcm === channel) return p;
        }
        return null;
      }
    }

    // Resolves a physical pin to BCM channel
    resolveBcm(physicalPin) {
      const pinout = global.RPi2B_Pinout || (typeof require !== 'undefined' ? require('./pinout.js') : null);
      if (pinout) {
        return pinout.physicalToBcm(physicalPin);
      }
      return this.pins[physicalPin] ? this.pins[physicalPin].bcm : null;
    }

    setmode(mode) {
      if (mode === this.BCM || mode === this.BOARD) {
        this.currentMode = mode;
        this.emit('modeChange', { mode: this.currentMode });
      } else {
        console.warn(`[VirtualGPIO] Unknown mode: ${mode}`);
      }
    }

    getmode() {
      return this.currentMode;
    }

    setwarnings(flag) {
      // No-op for Python compatibility
      this.warnings = flag;
    }

    setup(channel, direction, options = {}) {
      // Support list/tuple of channels
      if (Array.isArray(channel)) {
        channel.forEach(ch => this.setup(ch, direction, options));
        return;
      }

      const phys = this.resolvePhysicalPin(channel);
      if (!phys) {
        console.warn(`[VirtualGPIO] Cannot setup invalid channel ${channel} in mode ${this.currentMode === this.BCM ? 'BCM' : 'BOARD'}`);
        return;
      }

      const pin = this.pins[phys];
      if (direction === this.OUT) {
        pin.mode = 'OUT';
        const initVal = (typeof options === 'object' && options.initial !== undefined) ? options.initial : this.LOW;
        pin.value = initVal === this.HIGH ? 1 : 0;
        pin.voltage = pin.value * 3.3;
        pin.isPwm = false;
        pin.dutyCycle = 0;
      } else {
        pin.mode = 'IN';
        const pud = (typeof options === 'object' && options.pull_up_down !== undefined) ? options.pull_up_down : this.PUD_OFF;
        pin.pull = pud;
        if (pud === this.PUD_UP) {
          pin.value = 1;
          pin.voltage = 3.3;
        } else if (pud === this.PUD_DOWN) {
          pin.value = 0;
          pin.voltage = 0.0;
        }
      }

      this.notifyPinChange(phys);
    }

    output(channel, value) {
      if (Array.isArray(channel)) {
        if (Array.isArray(value)) {
          channel.forEach((ch, idx) => this.output(ch, value[idx]));
        } else {
          channel.forEach(ch => this.output(ch, value));
        }
        return;
      }

      const phys = this.resolvePhysicalPin(channel);
      if (!phys) return;

      const pin = this.pins[phys];
      const boolVal = (value === this.HIGH || value === true || value === 1);
      pin.value = boolVal ? 1 : 0;
      pin.voltage = pin.value * 3.3;
      pin.isPwm = false;
      pin.dutyCycle = pin.value * 100;

      this.notifyPinChange(phys);
    }

    input(channel) {
      const phys = this.resolvePhysicalPin(channel);
      if (!phys) return 0;
      return this.pins[phys].value;
    }

    PWM(channel, frequency) {
      const self = this;
      const phys = this.resolvePhysicalPin(channel);
      if (!phys) {
        console.warn(`[VirtualGPIO] Cannot create PWM for channel ${channel}`);
        return null;
      }

      const pin = this.pins[phys];
      pin.mode = 'PWM';
      pin.isPwm = true;
      pin.frequency = frequency || 50;
      pin.dutyCycle = 0;

      const pwmObj = {
        channel: channel,
        physical: phys,
        start(dutyCycle = 0) {
          pin.dutyCycle = Math.max(0, Math.min(100, dutyCycle));
          pin.value = pin.dutyCycle > 0 ? 1 : 0;
          pin.voltage = (pin.dutyCycle / 100.0) * 3.3;
          self.notifyPinChange(phys);
        },
        ChangeDutyCycle(dutyCycle) {
          pin.dutyCycle = Math.max(0, Math.min(100, dutyCycle));
          pin.value = pin.dutyCycle > 0 ? 1 : 0;
          pin.voltage = (pin.dutyCycle / 100.0) * 3.3;
          self.notifyPinChange(phys);
        },
        ChangeFrequency(freq) {
          pin.frequency = freq;
          self.notifyPinChange(phys);
        },
        stop() {
          pin.dutyCycle = 0;
          pin.value = 0;
          pin.voltage = 0.0;
          pin.isPwm = false;
          self.notifyPinChange(phys);
        }
      };

      this.pwmInstances.push(pwmObj);
      return pwmObj;
    }

    add_event_detect(channel, edge, callback, bouncetime) {
      const phys = this.resolvePhysicalPin(channel);
      if (!phys) return;
      this.pins[phys].eventDetect = {
        edge: edge,
        callback: callback,
        bouncetime: bouncetime || 200,
        lastTriggered: 0
      };
    }

    remove_event_detect(channel) {
      const phys = this.resolvePhysicalPin(channel);
      if (!phys) return;
      this.pins[phys].eventDetect = null;
    }

    // Allows the virtual hardware / interactive UI (buttons, sensors, potentiometers)
    // to feed a voltage or binary level into a configured GPIO pin
    setExternalInput(channelOrPhys, value, isPhysical = false) {
      let phys = isPhysical ? channelOrPhys : this.resolvePhysicalPin(channelOrPhys);
      if (!phys) return;

      const pin = this.pins[phys];
      const prevVal = pin.value;
      const newVal = (value === 1 || value === true || value === this.HIGH) ? 1 : 0;

      pin.value = newVal;
      pin.voltage = newVal * 3.3;

      // Check event detector for RISING / FALLING interrupts
      if (pin.eventDetect && prevVal !== newVal) {
        const ed = pin.eventDetect;
        const now = Date.now();
        if (now - ed.lastTriggered >= ed.bouncetime) {
          let triggered = false;
          if (ed.edge === this.BOTH) triggered = true;
          else if (ed.edge === this.RISING && prevVal === 0 && newVal === 1) triggered = true;
          else if (ed.edge === this.FALLING && prevVal === 1 && newVal === 0) triggered = true;

          if (triggered) {
            ed.lastTriggered = now;
            if (typeof ed.callback === 'function') {
              try {
                ed.callback(this.currentMode === this.BCM ? pin.bcm : pin.physical);
              } catch (e) {
                console.error('[VirtualGPIO] Callback error:', e);
              }
            }
          }
        }
      }

      this.notifyPinChange(phys);
    }

    cleanup(channel) {
      if (channel !== undefined) {
        const phys = this.resolvePhysicalPin(channel);
        if (phys && this.pins[phys]) {
          const pin = this.pins[phys];
          pin.mode = 'UNCONFIGURED';
          pin.value = 0;
          pin.voltage = 0.0;
          pin.dutyCycle = 0;
          pin.isPwm = false;
          this.notifyPinChange(phys);
        }
        return;
      }

      // Reset all configurable GPIO pins
      for (let p = 1; p <= 40; p++) {
        const pinDef = global.RPi2B_Pinout ? global.RPi2B_Pinout.getPin(p) : null;
        if (pinDef && (pinDef.type === 'power3v3' || pinDef.type === 'power5v' || pinDef.type === 'ground')) {
          continue;
        }
        this.pins[p].mode = 'UNCONFIGURED';
        this.pins[p].value = 0;
        this.pins[p].voltage = 0.0;
        this.pins[p].dutyCycle = 0;
        this.pins[p].isPwm = false;
        this.pins[p].eventDetect = null;
      }
      this.pwmInstances = [];
      this.emit('reset', {});
    }

    notifyPinChange(physicalPin) {
      const pin = this.pins[physicalPin];
      if (!pin) return;
      const payload = {
        physical: physicalPin,
        bcm: pin.bcm,
        mode: pin.mode,
        value: pin.value,
        voltage: pin.voltage,
        dutyCycle: pin.dutyCycle,
        frequency: pin.frequency,
        isPwm: pin.isPwm
      };
      this.emit('pinChange', payload);
    }

    on(event, handler) {
      if (this.listeners[event]) {
        this.listeners[event].push(handler);
      }
    }

    off(event, handler) {
      if (this.listeners[event]) {
        this.listeners[event] = this.listeners[event].filter(h => h !== handler);
      }
    }

    emit(event, data) {
      if (this.listeners[event]) {
        this.listeners[event].forEach(fn => fn(data));
      }
    }
  }

  const virtualGPIO = new VirtualGPIOEngine();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VirtualGPIOEngine, virtualGPIO };
  }
  global.VirtualGPIO = virtualGPIO;
  global.virtualGPIO = virtualGPIO;
  global.VirtualGPIOEngine = VirtualGPIOEngine;
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
