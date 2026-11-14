// Raspberry Pi 2 Model B 40-Pin GPIO Header & SunFounder T-Cobbler Pinout Engine
// Aligned with official Raspberry Pi 2B specification

(function(global) {
  'use strict';

  const PI2B_PINS = [
    { pin: 1,  bcm: null, wpi: null, name: '3.3V Power',      type: 'power3v3',  color: '#e53935', desc: '3.3V DC Power Rail (Max ~50mA total across all 3.3V pins)' },
    { pin: 2,  bcm: null, wpi: null, name: '5V Power',        type: 'power5v',   color: '#d32f2f', desc: '5V DC Power Rail directly connected to micro-USB input' },
    { pin: 3,  bcm: 2,    wpi: 8,    name: 'GPIO 2 (SDA1)',   type: 'gpio_i2c',  color: '#00897b', desc: 'I2C1 Data (has physical 1.8kΩ pull-up to 3.3V)' },
    { pin: 4,  bcm: null, wpi: null, name: '5V Power',        type: 'power5v',   color: '#d32f2f', desc: '5V DC Power Rail' },
    { pin: 5,  bcm: 3,    wpi: 9,    name: 'GPIO 3 (SCL1)',   type: 'gpio_i2c',  color: '#00897b', desc: 'I2C1 Clock (has physical 1.8kΩ pull-up to 3.3V)' },
    { pin: 6,  bcm: null, wpi: null, name: 'Ground',          type: 'ground',    color: '#212121', desc: '0V Ground reference' },
    { pin: 7,  bcm: 4,    wpi: 7,    name: 'GPIO 4 (GPCLK0)', type: 'gpio',      color: '#43a047', desc: 'General Purpose Clock 0 / 1-Wire bus' },
    { pin: 8,  bcm: 14,   wpi: 15,   name: 'GPIO 14 (TXD0)',  type: 'gpio_uart', color: '#fb8c00', desc: 'UART Transmit / Serial Output' },
    { pin: 9,  bcm: null, wpi: null, name: 'Ground',          type: 'ground',    color: '#212121', desc: '0V Ground reference' },
    { pin: 10, bcm: 15,   wpi: 16,   name: 'GPIO 15 (RXD0)',  type: 'gpio_uart', color: '#fb8c00', desc: 'UART Receive / Serial Input' },
    { pin: 11, bcm: 17,   wpi: 0,    name: 'GPIO 17',         type: 'gpio',      color: '#43a047', desc: 'General Purpose IO 17 (WiringPi 0) - Standard output/input' },
    { pin: 12, bcm: 18,   wpi: 1,    name: 'GPIO 18 (PWM0)',  type: 'gpio_pwm',  color: '#8e24aa', desc: 'Hardware PWM channel 0 / PCM Clock' },
    { pin: 13, bcm: 27,   wpi: 2,    name: 'GPIO 27',         type: 'gpio',      color: '#43a047', desc: 'General Purpose IO 27 (WiringPi 2)' },
    { pin: 14, bcm: null, wpi: null, name: 'Ground',          type: 'ground',    color: '#212121', desc: '0V Ground reference' },
    { pin: 15, bcm: 22,   wpi: 3,    name: 'GPIO 22',         type: 'gpio',      color: '#43a047', desc: 'General Purpose IO 22 (WiringPi 3)' },
    { pin: 16, bcm: 23,   wpi: 4,    name: 'GPIO 23',         type: 'gpio',      color: '#43a047', desc: 'General Purpose IO 23 (WiringPi 4)' },
    { pin: 17, bcm: null, wpi: null, name: '3.3V Power',      type: 'power3v3',  color: '#e53935', desc: '3.3V DC Power Rail' },
    { pin: 18, bcm: 24,   wpi: 5,    name: 'GPIO 24',         type: 'gpio',      color: '#43a047', desc: 'General Purpose IO 24 (WiringPi 5)' },
    { pin: 19, bcm: 10,   wpi: 12,   name: 'GPIO 10 (MOSI)',  type: 'gpio_spi',  color: '#039be5', desc: 'SPI0 Master Out Slave In' },
    { pin: 20, bcm: null, wpi: null, name: 'Ground',          type: 'ground',    color: '#212121', desc: '0V Ground reference' },
    { pin: 21, bcm: 9,    wpi: 13,   name: 'GPIO 9 (MISO)',   type: 'gpio_spi',  color: '#039be5', desc: 'SPI0 Master In Slave Out' },
    { pin: 22, bcm: 25,   wpi: 6,    name: 'GPIO 25',         type: 'gpio',      color: '#43a047', desc: 'General Purpose IO 25 (WiringPi 6)' },
    { pin: 23, bcm: 11,   wpi: 14,   name: 'GPIO 11 (SCLK)',  type: 'gpio_spi',  color: '#039be5', desc: 'SPI0 Serial Clock' },
    { pin: 24, bcm: 8,    wpi: 10,   name: 'GPIO 8 (CE0)',    type: 'gpio_spi',  color: '#039be5', desc: 'SPI0 Chip Enable 0' },
    { pin: 25, bcm: null, wpi: null, name: 'Ground',          type: 'ground',    color: '#212121', desc: '0V Ground reference' },
    { pin: 26, bcm: 7,    wpi: 11,   name: 'GPIO 7 (CE1)',    type: 'gpio_spi',  color: '#039be5', desc: 'SPI0 Chip Enable 1' },
    { pin: 27, bcm: 0,    wpi: 30,   name: 'ID_SD (EEPROM)',  type: 'id_eeprom', color: '#757575', desc: 'Reserved for HAT ID EEPROM Data' },
    { pin: 28, bcm: 1,    wpi: 31,   name: 'ID_SC (EEPROM)',  type: 'id_eeprom', color: '#757575', desc: 'Reserved for HAT ID EEPROM Clock' },
    { pin: 29, bcm: 5,    wpi: 21,   name: 'GPIO 5',          type: 'gpio',      color: '#43a047', desc: 'General Purpose IO 5' },
    { pin: 30, bcm: null, wpi: null, name: 'Ground',          type: 'ground',    color: '#212121', desc: '0V Ground reference' },
    { pin: 31, bcm: 6,    wpi: 22,   name: 'GPIO 6',          type: 'gpio',      color: '#43a047', desc: 'General Purpose IO 6' },
    { pin: 32, bcm: 12,   wpi: 26,   name: 'GPIO 12 (PWM0)',  type: 'gpio_pwm',  color: '#8e24aa', desc: 'Hardware PWM channel 0' },
    { pin: 33, bcm: 13,   wpi: 23,   name: 'GPIO 13 (PWM1)',  type: 'gpio_pwm',  color: '#8e24aa', desc: 'Hardware PWM channel 1' },
    { pin: 34, bcm: null, wpi: null, name: 'Ground',          type: 'ground',    color: '#212121', desc: '0V Ground reference' },
    { pin: 35, bcm: 19,   wpi: 24,   name: 'GPIO 19 (PWM1)',  type: 'gpio_pwm',  color: '#8e24aa', desc: 'Hardware PWM channel 1 / PCM Frame Sync' },
    { pin: 36, bcm: 16,   wpi: 27,   name: 'GPIO 16',         type: 'gpio',      color: '#43a047', desc: 'General Purpose IO 16' },
    { pin: 37, bcm: 26,   wpi: 25,   name: 'GPIO 26',         type: 'gpio',      color: '#43a047', desc: 'General Purpose IO 26' },
    { pin: 38, bcm: 20,   wpi: 28,   name: 'GPIO 20',         type: 'gpio',      color: '#43a047', desc: 'General Purpose IO 20 / PCM DIN' },
    { pin: 39, bcm: null, wpi: null, name: 'Ground',          type: 'ground',    color: '#212121', desc: '0V Ground reference' },
    { pin: 40, bcm: 21,   wpi: 29,   name: 'GPIO 21',         type: 'gpio',      color: '#43a047', desc: 'General Purpose IO 21 / PCM DOUT' }
  ];

  // Fast index maps
  const byPhysical = {};
  const byBcm = {};
  const byWpi = {};

  PI2B_PINS.forEach(p => {
    byPhysical[p.pin] = p;
    if (p.bcm !== null) byBcm[p.bcm] = p;
    if (p.wpi !== null) byWpi[p.wpi] = p;
  });

  const RPi2B_Pinout = {
    pins: PI2B_PINS,
    
    getPin(physicalPin) {
      return byPhysical[physicalPin] || null;
    },

    getByBcm(bcmPin) {
      return byBcm[bcmPin] || null;
    },

    getByWiringPi(wpiPin) {
      return byWpi[wpiPin] || null;
    },

    bcmToPhysical(bcmPin) {
      const p = byBcm[bcmPin];
      return p ? p.pin : null;
    },

    physicalToBcm(physicalPin) {
      const p = byPhysical[physicalPin];
      return p ? p.bcm : null;
    },

    isPower(physicalPin) {
      const p = byPhysical[physicalPin];
      return p ? (p.type === 'power3v3' || p.type === 'power5v') : false;
    },

    isGround(physicalPin) {
      const p = byPhysical[physicalPin];
      return p ? p.type === 'ground' : false;
    },

    // SunFounder T-Cobbler labeling helper
    // The SunFounder T-Cobbler prints BCM pin numbers directly (e.g. "GPIO17", "GND", "3V3", "5V")
    getCobblerLabel(pinObj) {
      if (!pinObj) return '';
      if (pinObj.type === 'power3v3') return '3V3';
      if (pinObj.type === 'power5v') return '5V';
      if (pinObj.type === 'ground') return 'GND';
      if (pinObj.bcm !== null) return `GPIO${pinObj.bcm}`;
      return pinObj.name;
    },

    // Exact silkscreen text printed on the red SunFounder GPIO Extension Board
    getCobblerSilkscreen(pinObj) {
      if (!pinObj) return '';
      if (pinObj.type === 'power3v3') return '3V3';
      if (pinObj.type === 'power5v') return '5V0';
      if (pinObj.type === 'ground') return 'GND';
      const silkMap = {
        3: 'SDA1', 5: 'SCL1', 8: 'TXD0', 10: 'RXD0',
        19: 'SPIMOSI', 21: 'SPIMISO', 23: 'SPISCLK', 24: 'SPICE0', 26: 'SPICE1',
        27: 'ID_SD', 28: 'ID_SC'
      };
      if (silkMap[pinObj.pin]) return silkMap[pinObj.pin];
      if (pinObj.bcm !== null) return `GPIO${pinObj.bcm}`;
      return pinObj.name;
    },

    // Deterministic breadboard coordinates for the T-Cobbler straddling columns 1..20
    getCobblerPlacement(physicalPin) {
      if (physicalPin < 1 || physicalPin > 40) return null;
      const pinObj = byPhysical[physicalPin] || null;
      const side = (physicalPin % 2 === 1) ? 'bottom' : 'top';
      return {
        pin: physicalPin,
        bcm: pinObj ? pinObj.bcm : null,
        col: Math.ceil(physicalPin / 2),
        side: side,
        pinRow: side === 'bottom' ? 'C' : 'H',
        exposedRows: side === 'bottom' ? ['A', 'B'] : ['I', 'J'],
        silkscreen: this.getCobblerSilkscreen(pinObj)
      };
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = RPi2B_Pinout;
  }
  global.RPi2B_Pinout = RPi2B_Pinout;
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
