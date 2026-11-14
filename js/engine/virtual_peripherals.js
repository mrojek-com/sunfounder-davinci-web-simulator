// Virtual Hardware Peripherals for SunFounder DaVinci Kit
// Simulates ADC0834, I2C LCD1602, 74HC595 Shift Register, L293D, ULN2003, and Web Audio Sound

(function(global) {
  'use strict';

  // ==========================================
  // 1. ADC0834 8-Bit 4-Channel Analog-to-Digital Converter
  // ==========================================
  const VirtualADC0834 = {
    channels: [128, 128, 128, 128], // CH0, CH1, CH2, CH3 (0-255)
    setup() {
      // Python API compatibility
    },
    getResult(channel = 0) {
      const ch = Math.max(0, Math.min(3, parseInt(channel, 10) || 0));
      return Math.round(this.channels[ch] || 0);
    },
    getVoltage(channel = 0) {
      return (this.getResult(channel) / 255.0) * 3.3;
    },
    setChannelValue(channel, val0to255) {
      const ch = Math.max(0, Math.min(3, parseInt(channel, 10) || 0));
      this.channels[ch] = Math.max(0, Math.min(255, val0to255));
    },
    setChannelVoltage(channel, voltage) {
      const val = (Math.max(0, Math.min(3.3, voltage)) / 3.3) * 255;
      this.setChannelValue(channel, val);
    }
  };

  // ==========================================
  // 2. I2C LCD1602 (PCF8574 Backpack @ 0x27)
  // ==========================================
  class VirtualLCD1602Device {
    constructor() {
      this.address = 0x27;
      this.backlight = true;
      this.cursor = { x: 0, y: 0 };
      this.buffer = [
        '                '.split(''),
        '                '.split('')
      ];
      this.listeners = [];
    }

    init(addr = 0x27, bl = 1) {
      this.address = addr;
      this.backlight = Boolean(bl);
      this.clear();
    }

    clear() {
      this.buffer = [
        '                '.split(''),
        '                '.split('')
      ];
      this.cursor = { x: 0, y: 0 };
      this.notify();
    }

    setCursor(x, y) {
      this.cursor.x = Math.max(0, Math.min(15, x));
      this.cursor.y = Math.max(0, Math.min(1, y));
    }

    write(x, y, str) {
      this.setCursor(x, y);
      const text = String(str);
      for (let i = 0; i < text.length; i++) {
        const curX = this.cursor.x + i;
        if (curX < 16) {
          this.buffer[this.cursor.y][curX] = text[i];
        }
      }
      this.cursor.x = Math.min(15, this.cursor.x + text.length);
      this.notify();
    }

    getText(row) {
      if (row < 0 || row > 1) return '';
      return this.buffer[row].join('');
    }

    onChange(fn) {
      this.listeners.push(fn);
    }

    notify() {
      const lines = [this.getText(0), this.getText(1)];
      this.listeners.forEach(fn => fn(lines, this.backlight));
    }
  }

  const VirtualLCD1602 = new VirtualLCD1602Device();

  // ==========================================
  // 3. 74HC595 8-Bit Shift Register
  // ==========================================
  class Virtual74HC595Device {
    constructor() {
      this.shiftReg = 0;
      this.storageReg = 0;
      this.listeners = [];
    }

    // Common 7-segment digit bit encoding (Common Cathode)
    // Segments: A, B, C, D, E, F, G, DP
    static SEG_HEX = {
      0: 0x3f, 1: 0x06, 2: 0x5b, 3: 0x4f, 4: 0x66,
      5: 0x6d, 6: 0x7d, 7: 0x07, 8: 0x7f, 9: 0x6f,
      'A': 0x77, 'b': 0x7c, 'C': 0x39, 'd': 0x5e, 'E': 0x79, 'F': 0x71
    };

    shiftBit(bit) {
      this.shiftReg = ((this.shiftReg << 1) | (bit & 1)) & 0xff;
    }

    latch() {
      this.storageReg = this.shiftReg;
      this.listeners.forEach(fn => fn(this.storageReg));
    }

    onChange(fn) {
      this.listeners.push(fn);
    }
  }

  const Virtual74HC595 = new Virtual74HC595Device();

  // ==========================================
  // 4. Web Audio Hardware Buzzer Synthesizer
  // ==========================================
  class HardwareAudioSynthesizer {
    constructor() {
      this.ctx = null;
      this.oscillator = null;
      this.gainNode = null;
      this.isPlaying = false;
      this.currentFrequency = 0;
      this.enabled = true; // User can mute sound
    }

    initContext() {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playTone(frequency = 440, type = 'square', volume = 0.15) {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;

      if (frequency <= 0) {
        this.stopTone();
        return;
      }

      if (this.isPlaying && this.oscillator) {
        // Just update frequency smoothly
        this.currentFrequency = frequency;
        this.oscillator.frequency.setTargetAtTime(frequency, this.ctx.currentTime, 0.01);
        return;
      }

      try {
        this.oscillator = this.ctx.createOscillator();
        this.gainNode = this.ctx.createGain();

        this.oscillator.type = type;
        this.oscillator.frequency.setValueAtTime(frequency, this.ctx.currentTime);
        this.currentFrequency = frequency;

        this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.ctx.destination);

        this.oscillator.start();
        this.isPlaying = true;
      } catch (e) {
        console.warn('[AudioSynth] Error starting tone:', e);
      }
    }

    stopTone() {
      if (!this.isPlaying) return;
      if (this.oscillator) {
        try {
          if (this.gainNode) {
            this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.01);
          }
          this.oscillator.stop(this.ctx.currentTime + 0.02);
          setTimeout(() => {
            if (this.oscillator) {
              this.oscillator.disconnect();
              this.oscillator = null;
            }
          }, 30);
        } catch (e) {
          // ignore already stopped
        }
      }
      this.isPlaying = false;
      this.currentFrequency = 0;
    }

    // Relay mechanical click sound simulation
    playRelayClick(engage = true) {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(engage ? 800 : 500, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.04);

        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.04);
      } catch (e) {}
    }
  }

  const VirtualAudio = new HardwareAudioSynthesizer();

  const VirtualPeripherals = {
    ADC0834: VirtualADC0834,
    LCD1602: VirtualLCD1602,
    ShiftRegister595: Virtual74HC595,
    Audio: VirtualAudio
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = VirtualPeripherals;
  }
  global.VirtualPeripherals = VirtualPeripherals;
  global.VirtualADC0834 = VirtualADC0834;
  global.VirtualLCD1602 = VirtualLCD1602;
  global.VirtualAudio = VirtualAudio;
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
