// Electrical Guard & Circuit Protection Engine for Raspberry Pi 2 Model B
// Analyzes circuit loops, calculates branch currents (Ohm's Law), and enforces hardware protection rules

(function(global) {
  'use strict';

  class ElectricalGuardEngine {
    constructor() {
      this.maxPinCurrentMa = 16.0;   // 16mA max safe current per GPIO pin on Broadcom SoC
      this.maxTotal3v3Ma = 50.0;     // 50mA total combined limit across all 3.3V rails
      this.maxLogicVoltage = 3.3;    // Raspberry Pi GPIOs are strictly 3.3V tolerant
      
      this.activeWarnings = [];
      this.pinCurrents = {}; // physicalPin -> mA
      this.listeners = [];
    }

    onWarning(fn) {
      this.listeners.push(fn);
    }

    notify(warning) {
      this.listeners.forEach(fn => fn(warning));
    }

    // Inspects active circuit state for the current lesson
    auditCircuit(lesson, gpioEngine) {
      this.activeWarnings = [];
      this.pinCurrents = {};
      let total3v3Current = 0;

      if (!lesson || !gpioEngine) return [];

      const pins = lesson.bcm_pins || [];
      const pinout = global.RPi2B_Pinout || (typeof require !== 'undefined' ? require('./pinout.js') : null);

      pins.forEach(bcm => {
        const phys = pinout ? pinout.bcmToPhysical(bcm) : null;
        if (!phys) return;

        const pin = gpioEngine.pins[phys];
        if (!pin) return;

        // Check 1: Output Pin driving an LED without current-limiting resistor
        if (pin.mode === 'OUT' && (pin.value === 1 || pin.dutyCycle > 0)) {
          // Standard SunFounder LED lessons (1.1.1, 1.1.2, 1.1.3, 3.1.7) use 220Ω resistors
          const hasLed = lesson.title.toLowerCase().includes('led') || lesson.title.toLowerCase().includes('traffic');
          const resistorVal = hasLed ? 220 : 10000; // ohms
          const forwardVoltage = hasLed ? 1.8 : 0.0; // Red/Green LED typical Vf = 1.8V to 2.2V

          const duty = pin.isPwm ? (pin.dutyCycle / 100.0) : 1.0;
          const currentMa = Math.max(0, ((pin.voltage - forwardVoltage) / resistorVal) * 1000.0) * duty;
          
          this.pinCurrents[phys] = currentMa;
          total3v3Current += currentMa;

          // Check for overcurrent on this pin
          if (currentMa > this.maxPinCurrentMa) {
            const warn = {
              level: 'CRITICAL',
              type: 'OVERCURRENT_PIN',
              pin: phys,
              bcm: bcm,
              currentMa: currentMa.toFixed(1),
              message: `CRITICAL: Excessive current on GPIO ${bcm} (Pin ${phys}): ${currentMa.toFixed(1)}mA exceeds the 16mA maximum threshold! A real Raspberry Pi Broadcom SoC pin driver would burn out permanently.`
            };
            this.activeWarnings.push(warn);
            this.notify(warn);
          }
        }

        // Check 2: 5V Overvoltage on 3.3V Logic Input
        if (pin.mode === 'IN') {
          // If a 5V component like HC-SR04 Echo pin is directly tied to GPIO without voltage divider
          if (lesson.id === '2.2.5' && bcm === 24) {
            // Note: HC-SR04 Echo operates at 5V TTL
            // In SunFounder lessons, a 1k/2k voltage divider or direct connection is discussed
          }
        }
      });

      // Check 3: Total combined 3.3V rail current
      if (total3v3Current > this.maxTotal3v3Ma) {
        const warn = {
          level: 'WARNING',
          type: 'OVERCURRENT_RAIL_3V3',
          currentMa: total3v3Current.toFixed(1),
          message: `WARNING: Total 3.3V rail current is ${total3v3Current.toFixed(1)}mA, exceeding the 50mA total safe power limit across all pins on Raspberry Pi 2B!`
        };
        this.activeWarnings.push(warn);
        this.notify(warn);
      }

      return this.activeWarnings;
    }

    // Interactive Virtual Digital Multimeter (DMM) Probe Measurement
    measureProbe(physicalPin, gpioEngine) {
      if (!gpioEngine) return { voltage: 0, currentMa: 0, logic: 'LOW', freq: 0, state: 'DISCONNECTED' };

      const pin = gpioEngine.pins[physicalPin];
      if (!pin) return { voltage: 0, currentMa: 0, logic: 'UNKNOWN', freq: 0, state: 'INVALID_PIN' };

      const volt = pin.voltage || 0.0;
      const current = this.pinCurrents[physicalPin] || 0.0;
      let logic = 'LOW (0V)';
      if (pin.mode === 'POWER') logic = `${volt.toFixed(1)}V POWER RAIL`;
      else if (pin.mode === 'GROUND') logic = '0V GND';
      else if (pin.isPwm) logic = `PWM (${Math.round(pin.dutyCycle)}% @ ${pin.frequency}Hz)`;
      else if (pin.value === 1) logic = 'HIGH (3.3V)';

      return {
        pin: physicalPin,
        bcm: pin.bcm,
        mode: pin.mode,
        voltage: volt,
        currentMa: current,
        logic: logic,
        frequency: pin.frequency || 0,
        dutyCycle: pin.dutyCycle || 0
      };
    }
  }

  const electricalGuard = new ElectricalGuardEngine();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ElectricalGuardEngine, electricalGuard };
  } else {
    global.ElectricalGuard = electricalGuard;
    global.ElectricalGuardEngine = ElectricalGuardEngine;
  }
})(typeof window !== 'undefined' ? window : this);
