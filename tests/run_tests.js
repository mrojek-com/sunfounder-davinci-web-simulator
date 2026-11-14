// Automated Unit Test Suite for SunFounder DaVinci Kit Simulator
// Tests Pinout, Virtual GPIO, Peripherals, Electrical Guard, Python Runner, and Lesson Data

const assert = require('assert');

// Load modules
const RPi2B_Pinout = require('../js/engine/pinout.js');
const { VirtualGPIOEngine } = require('../js/engine/virtual_gpio.js');
const VirtualPeripherals = require('../js/engine/virtual_peripherals.js');
const { ElectricalGuardEngine, electricalGuard } = require('../js/engine/electrical_guard.js');
const { PythonSimulatorRunner } = require('../js/engine/python_runner.js');
const DAVINCI_LESSONS = require('../js/data/lessons.js');
const CREATIVE_CONCEPTS = require('../js/data/creative_concepts.js');
const { CreativeLabViewRenderer } = require('../js/components/CreativeLabView.js');

let passedTests = 0;
let failedTests = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    failedTests++;
  }
}

async function testAsync(name, fn) {
  try {
    await fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    failedTests++;
  }
}

async function runAllTests() {
  console.log('\n======================================================');
  console.log('🧪 RUNNING HARDENED DAVINCI KIT SIMULATOR TEST SUITE');
  console.log('======================================================\n');

  // ==========================================
  // 1. PINOUT TESTS
  // ==========================================
  console.log('--- 1. RASPBERRY PI 2B PINOUT ENGINE ---');

  test('All 40 physical pins are defined', () => {
    assert.strictEqual(RPi2B_Pinout.pins.length, 40);
    for (let i = 1; i <= 40; i++) {
      const pin = RPi2B_Pinout.getPin(i);
      assert.ok(pin !== null, `Pin ${i} should exist`);
      assert.strictEqual(pin.pin, i);
    }
  });

  test('Power rails and Ground pins are strictly accurate', () => {
    assert.strictEqual(RPi2B_Pinout.getPin(1).type, 'power3v3');
    assert.strictEqual(RPi2B_Pinout.getPin(17).type, 'power3v3');
    assert.strictEqual(RPi2B_Pinout.getPin(2).type, 'power5v');
    assert.strictEqual(RPi2B_Pinout.getPin(4).type, 'power5v');

    const gndPins = [6, 9, 14, 20, 25, 30, 34, 39];
    gndPins.forEach(p => {
      assert.strictEqual(RPi2B_Pinout.getPin(p).type, 'ground', `Pin ${p} must be ground`);
    });
  });

  test('BCM to Physical mappings match official Raspberry Pi specs', () => {
    assert.strictEqual(RPi2B_Pinout.bcmToPhysical(17), 11);
    assert.strictEqual(RPi2B_Pinout.bcmToPhysical(18), 12);
    assert.strictEqual(RPi2B_Pinout.bcmToPhysical(27), 13);
    assert.strictEqual(RPi2B_Pinout.bcmToPhysical(22), 15);
    assert.strictEqual(RPi2B_Pinout.bcmToPhysical(2), 3);
    assert.strictEqual(RPi2B_Pinout.bcmToPhysical(3), 5);
  });

  test('T-Cobbler labels generate correct strings', () => {
    assert.strictEqual(RPi2B_Pinout.getCobblerLabel(RPi2B_Pinout.getPin(1)), '3V3');
    assert.strictEqual(RPi2B_Pinout.getCobblerLabel(RPi2B_Pinout.getPin(2)), '5V');
    assert.strictEqual(RPi2B_Pinout.getCobblerLabel(RPi2B_Pinout.getPin(6)), 'GND');
    assert.strictEqual(RPi2B_Pinout.getCobblerLabel(RPi2B_Pinout.getPin(11)), 'GPIO17');
  });

  test('T-Cobbler placement straddles Cols 1..20 with accurate odd/even exposed rows', () => {
    const p11 = RPi2B_Pinout.getCobblerPlacement(11);
    assert.ok(p11, 'Pin 11 placement must exist');
    assert.strictEqual(p11.col, 6);
    assert.strictEqual(p11.side, 'bottom');
    assert.strictEqual(p11.pinRow, 'C');
    assert.deepStrictEqual(p11.exposedRows, ['A', 'B']);
    assert.strictEqual(p11.silkscreen, 'GPIO17');

    const p12 = RPi2B_Pinout.getCobblerPlacement(12);
    assert.ok(p12, 'Pin 12 placement must exist');
    assert.strictEqual(p12.col, 6);
    assert.strictEqual(p12.side, 'top');
    assert.strictEqual(p12.pinRow, 'H');
    assert.deepStrictEqual(p12.exposedRows, ['I', 'J']);
    assert.strictEqual(p12.silkscreen, 'GPIO18');

    assert.strictEqual(RPi2B_Pinout.getCobblerPlacement(0), null);
    assert.strictEqual(RPi2B_Pinout.getCobblerPlacement(41), null);
  });

  // ==========================================
  // 2. VIRTUAL GPIO ENGINE TESTS
  // ==========================================
  console.log('\n--- 2. VIRTUAL RPi.GPIO ENGINE ---');

  test('GPIO setup, output, and input work in BCM mode', () => {
    const gpio = new VirtualGPIOEngine();
    gpio.setmode(gpio.BCM);

    gpio.setup(17, gpio.OUT, { initial: gpio.HIGH });
    assert.strictEqual(gpio.input(17), 1);
    assert.strictEqual(gpio.pins[11].value, 1);
    assert.strictEqual(gpio.pins[11].voltage, 3.3);

    gpio.output(17, gpio.LOW);
    assert.strictEqual(gpio.input(17), 0);
    assert.strictEqual(gpio.pins[11].value, 0);
    assert.strictEqual(gpio.pins[11].voltage, 0.0);
  });

  test('GPIO BOARD pin numbering resolves to physical header', () => {
    const gpio = new VirtualGPIOEngine();
    gpio.setmode(gpio.BOARD);

    gpio.setup(11, gpio.OUT, { initial: gpio.LOW });
    assert.strictEqual(gpio.pins[11].value, 0);

    gpio.output(11, gpio.HIGH);
    assert.strictEqual(gpio.pins[11].value, 1);
    assert.strictEqual(gpio.input(11), 1);
  });

  test('PWM duty cycle and frequency configuration', () => {
    const gpio = new VirtualGPIOEngine();
    gpio.setmode(gpio.BCM);

    gpio.setup(18, gpio.OUT);
    const pwm = gpio.PWM(18, 500);
    assert.ok(pwm !== null);

    pwm.start(25);
    assert.strictEqual(gpio.pins[12].dutyCycle, 25);
    assert.strictEqual(gpio.pins[12].frequency, 500);
    assert.strictEqual(gpio.pins[12].isPwm, true);

    pwm.ChangeDutyCycle(75);
    assert.strictEqual(gpio.pins[12].dutyCycle, 75);

    pwm.stop();
    assert.strictEqual(gpio.pins[12].dutyCycle, 0);
    assert.strictEqual(gpio.pins[12].isPwm, false);
  });

  test('External input injection and event detection', () => {
    const gpio = new VirtualGPIOEngine();
    gpio.setmode(gpio.BCM);
    gpio.setup(18, gpio.IN, { pull_up_down: gpio.PUD_UP });

    let callbackTriggered = false;
    gpio.add_event_detect(18, gpio.FALLING, (ch) => {
      callbackTriggered = true;
    }, 10);

    gpio.setExternalInput(18, 0);
    assert.strictEqual(gpio.input(18), 0);
    assert.strictEqual(callbackTriggered, true);
  });

  // ==========================================
  // 3. ELECTRICAL GUARD & MULTIMETER TESTS
  // ==========================================
  console.log('\n--- 3. ELECTRICAL GUARD & SAFETY ENGINE ---');

  test('Electrical guard calculates loop currents and audits active LED circuit', () => {
    const guard = new ElectricalGuardEngine();
    const gpio = new VirtualGPIOEngine();
    gpio.setmode(gpio.BCM);
    gpio.setup(17, gpio.OUT, { initial: gpio.HIGH });

    const mockLesson = { id: '1.1.1', title: 'Blinking LED', bcm_pins: [17] };
    const warnings = guard.auditCircuit(mockLesson, gpio);

    // Current with 220Ω resistor: (3.3V - 1.8V) / 220Ω ≈ 6.8mA (safe: <16mA)
    const probe = guard.measureProbe(11, gpio);
    assert.ok(probe.currentMa > 5.0 && probe.currentMa < 8.0, `Current ${probe.currentMa}mA should be ~6.8mA`);
    assert.strictEqual(probe.voltage, 3.3);
    assert.strictEqual(warnings.length, 0, 'Safe circuit should produce 0 critical warnings');
  });

  test('Multimeter probe correctly reads Ground and 5V power rails', () => {
    const guard = new ElectricalGuardEngine();
    const gpio = new VirtualGPIOEngine();

    const probe5v = guard.measureProbe(2, gpio);
    assert.strictEqual(probe5v.voltage, 5.0);
    assert.ok(probe5v.logic.includes('5.0V POWER'));

    const probeGnd = guard.measureProbe(6, gpio);
    assert.strictEqual(probeGnd.voltage, 0.0);
    assert.ok(probeGnd.logic.includes('GND'));
  });

  // ==========================================
  // 4. VIRTUAL PERIPHERALS TESTS
  // ==========================================
  console.log('\n--- 4. HARDWARE PERIPHERALS ---');

  test('ADC0834 8-bit conversion and voltage mapping', () => {
    const adc = VirtualPeripherals.ADC0834;
    adc.setChannelValue(0, 128);
    assert.strictEqual(adc.getResult(0), 128);

    const v = adc.getVoltage(0);
    assert.ok(Math.abs(v - 1.656) < 0.05, `Voltage ${v} should be ~1.65V`);

    adc.setChannelVoltage(1, 3.3);
    assert.strictEqual(adc.getResult(1), 255);
  });

  test('LCD1602 text buffering, cursor positioning, and clearing', () => {
    const lcd = VirtualPeripherals.LCD1602;
    lcd.init(0x27, 1);
    lcd.write(0, 0, 'SunFounder');
    lcd.write(0, 1, 'DaVinci Kit');

    assert.strictEqual(lcd.getText(0).trim(), 'SunFounder');
    assert.strictEqual(lcd.getText(1).trim(), 'DaVinci Kit');

    lcd.clear();
    assert.strictEqual(lcd.getText(0).trim(), '');
    assert.strictEqual(lcd.getText(1).trim(), '');
  });

  test('74HC595 shift register bit manipulation', () => {
    const sr = VirtualPeripherals.ShiftRegister595;
    let latchedVal = 0;
    sr.onChange(val => latchedVal = val);

    const bits = [1, 0, 1, 0, 1, 0, 1, 0];
    bits.forEach(b => sr.shiftBit(b));
    sr.latch();

    assert.strictEqual(latchedVal, 170);
  });

  // ==========================================
  // 5. PYTHON RUNNER HARDENED TRANSPILATION & EXECUTION
  // ==========================================
  console.log('\n--- 5. PYTHON RUNNER ENGINE ---');

  test('Python transpiler handles multiple assignments, f-strings, and range loops', () => {
    const runner = new PythonSimulatorRunner();
    const pyCode = `
import RPi.GPIO as GPIO
import time
a, b = 17, 18
name = "DaVinci"
msg = f"Kit: {name}"
for i in range(0, 5, 2):
    print(msg, i)
`;
    const js = runner.transpilePython(pyCode);
    assert.ok(js.includes('let [a, b] = [17, 18]'), 'Must support tuple multiple assignment');
    assert.ok(js.includes('`Kit: ${name}`'), 'Must convert f-strings to JS template literals');
    assert.ok(js.includes('for (let i = 0; i < 5; i += 2)'), 'Must convert 3-argument range step loop');
  });

  test('RPi.GPIO enforces setmode before setup and output operations', async () => {
    const runner = new PythonSimulatorRunner();
    let errorCaught = null;
    runner.onOutput((type, text) => {
      if (type === 'error') errorCaught = text;
    });

    // Code that omits GPIO.setmode()
    const pyCode = `
import RPi.GPIO as GPIO
GPIO.setup(17, GPIO.OUT)
`;
    await runner.runCode(pyCode);
    assert.ok(errorCaught && errorCaught.includes('Please set pin numbering mode'), 'Must enforce setmode check');
  });

  await testAsync('Python runner executes non-blocking script with math and time shims', async () => {
    const runner = new PythonSimulatorRunner();
    runner.setSpeed(10.0);

    let printed = [];
    runner.onOutput((type, text) => {
      if (type === 'stdout') printed.push(text);
    });

    const pyCode = `
import RPi.GPIO as GPIO
import time
import math

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.OUT)
for i in range(2):
    val = math.sqrt(16)
    t = time.monotonic()
    print("Test", val)
`;
    await runner.runCode(pyCode);
    assert.ok(printed.some(p => p.includes('Test 4')));
  });

  // ==========================================
  // 6. LESSONS DATABASE INTEGRITY
  // ==========================================
  console.log('\n--- 6. LESSONS DATABASE INTEGRITY ---');

  test('All 39 official lessons exist and have valid structure', () => {
    assert.strictEqual(DAVINCI_LESSONS.length, 39, 'Must have 39 complete lessons');
    DAVINCI_LESSONS.forEach(l => {
      assert.ok(l.id, 'Lesson ID missing');
      assert.ok(l.title, `Lesson ${l.id} title missing`);
      assert.ok(l.category, `Lesson ${l.id} category missing`);
      assert.ok(l.bcm_pins && l.bcm_pins.length > 0, `Lesson ${l.id} pins missing`);
      assert.ok(l.slug, `Lesson ${l.id} slug missing`);
      assert.ok(l.python_file, `Lesson ${l.id} python_file missing`);
      assert.ok(l.python_code && l.python_code.length > 50, `Lesson ${l.id} python code empty or too short`);
      assert.ok(l.youtube_id, `Lesson ${l.id} youtube_id missing`);
    });
  });

  test('Official website section images & precision breadboard specs exist across all 39 lessons', () => {
    const l111 = DAVINCI_LESSONS.find(l => l.id === '1.1.1');
    assert.ok(l111, 'Lesson 1.1.1 must exist');
    assert.ok(l111.wiring_image && l111.wiring_image.endsWith('_images/image49.png'), `1.1.1 wiring_image mismatch: ${l111.wiring_image}`);
    assert.ok(l111.schematic_image && l111.schematic_image.endsWith('_images/image48.png'), `1.1.1 schematic_image mismatch: ${l111.schematic_image}`);

    const l112 = DAVINCI_LESSONS.find(l => l.id === '1.1.2');
    assert.ok(l112, 'Lesson 1.1.2 must exist');
    assert.ok(l112.wiring_image && l112.wiring_image.endsWith('_images/image61.png'), `1.1.2 wiring_image mismatch: ${l112.wiring_image}`);

    DAVINCI_LESSONS.forEach(l => {
      assert.ok(l.wiring_image && l.wiring_image.startsWith('https://docs.sunfounder.com/'), `Lesson ${l.id} missing official SunFounder wiring_image`);
      assert.ok(l.breadboard_spec && typeof l.breadboard_spec === 'object', `Lesson ${l.id} missing breadboard_spec`);
      assert.ok(Array.isArray(l.breadboard_spec.components), `Lesson ${l.id} breadboard_spec.components must be an array`);
      assert.ok(Array.isArray(l.breadboard_spec.wires), `Lesson ${l.id} breadboard_spec.wires must be an array`);
      assert.ok(Array.isArray(l.wiring_steps) && l.wiring_steps.length > 0, `Lesson ${l.id} missing wiring_steps`);
    });
  });

  // ==========================================
  // 7. CREATIVE LAB & BRAINSTORMING INVENTIONS
  // ==========================================
  console.log('\n--- 7. CREATIVE LAB & BRAINSTORMING INVENTIONS ---');

  test('Creative concepts catalog contains valid multi-component blueprints', () => {
    assert.ok(Array.isArray(CREATIVE_CONCEPTS) && CREATIVE_CONCEPTS.length >= 6);
    CREATIVE_CONCEPTS.forEach(c => {
      assert.ok(c.id, 'Concept ID missing');
      assert.ok(c.title, 'Concept title missing');
      assert.ok(c.category, 'Concept category missing');
      assert.ok(Array.isArray(c.components) && c.components.length >= 2, `Concept ${c.id} must combine >= 2 components`);
      assert.ok(Array.isArray(c.bcm_pins) && c.bcm_pins.length > 0, `Concept ${c.id} must define BCM pins`);
      assert.ok(c.python_code && c.python_code.includes('RPi.GPIO'), `Concept ${c.id} must include runnable Python code with RPi.GPIO`);
      assert.ok(c.breadboard_spec && Array.isArray(c.breadboard_spec.components), `Concept ${c.id} must have breadboard_spec`);
    });
  });

  test('CreativeLabView parser extracts concept title and Python code from LLM responses', () => {
    const lab = new CreativeLabViewRenderer();
    const mockLlmResponse = `### 1. Smart Acoustic Bio-Chime
### 2. Concept
Acoustic chime for plants.
### 3. Circuit Wiring
Pin 11 -> GPIO 17
### 4. Executable Python Code
\`\`\`python
import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
print("Chime online")
\`\`\``;
    const parsed = lab.parseConceptFromText(mockLlmResponse, ['Buzzer', 'LDR'], 'Music & Audio');
    assert.strictEqual(parsed.title, 'Smart Acoustic Bio-Chime');
    assert.ok(parsed.python_code.includes('print("Chime online")'));
  });

  await testAsync('Creative concept Python code passes syntax check and execution test in simulator', async () => {
    const c1 = CREATIVE_CONCEPTS[0];
    const runner = new PythonSimulatorRunner();
    let logs = [];
    runner.onOutput((type, text) => logs.push(text));
    await runner.runCode(c1.python_code);
    assert.ok(logs.some(l => l.includes('BioDome Sentry')), 'Python runner should execute creative concept code');
  });

  // ==========================================
  // SUMMARY
  // ==========================================
  console.log('\n======================================================');
  console.log(`TEST RUN FINISHED: ${passedTests} passed, ${failedTests} failed.`);
  console.log('======================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAllTests();
