# SunFounder DaVinci Kit Web Simulator

> **In-Browser Hardware Emulation Studio for Raspberry Pi 2B / 3 / 4 (`RPi.GPIO`) & Raspberry Pi 5 (`gpiozero`)**

[![Test Suite](https://img.shields.io/badge/tests-25%20passed-00e676?style=flat-square&logo=checkmarx)](tests/run_tests.js)
[![Release](https://img.shields.io/badge/release-v1.1.1-38bdf8?style=flat-square&logo=github)](https://github.com/mrojek-com/sunfounder-davinci-web-simulator/releases)
[![Hardware](https://img.shields.io/badge/target-Pi%202B%20%2F%203%20%2F%204%20%26%20Pi%205-e31837?style=flat-square&logo=raspberrypi)](https://docs.sunfounder.com/projects/davinci-kit/en/latest/)
[![License](https://img.shields.io/badge/license-MIT-94a3b8?style=flat-square)](#license)

An interactive, pure client-side hardware emulation studio and visual testbed for the **SunFounder DaVinci Kit for Raspberry Pi**. Simulate circuits, test and execute Python code, inspect official breadboard wiring diagrams, verify circuit schematics, and brainstorm multi-component inventions with local LLMs **before touching physical hardware** to protect your Raspberry Pi from short circuits, reverse polarity, or 5V over-voltage damage.

---

## 🌟 Key Capabilities

### 1. Dual Target Hardware Architectures
Switch target architectures with a single click in the execution bar:

| Architecture | 🍓 Raspberry Pi 2B / 3 / 4 Mode | 🚀 Raspberry Pi 5 Mode |
| :--- | :--- | :--- |
| **SoC / Silicon** | Broadcom BCM2836 / BCM2837 / BCM2711 | Broadcom BCM2712 + RP1 I/O Controller |
| **Python Stack** | `RPi.GPIO` (register-level pins) | `gpiozero` (high-level object model) |
| **PWM Handling** | Frequency & Duty Cycle `0..100%` | Normalized Floats `0.0 .. 1.0` |
| **Color Model (RGB LED)** | Integer percentages via `p_R.ChangeDutyCycle(val)` | Normalized tuples via `rgb_led.color = (r, g, b)` |
| **Component Drivers** | `ADC0834`, `LCD1602`, `74HC595` | `LED`, `PWMLED`, `RGBLED`, `Button`, `Buzzer`, `Motor`, `Servo`, `DistanceSensor` |
| **Curriculum Docs** | [SunFounder Classic Docs](https://docs.sunfounder.com/projects/davinci-kit/en/latest/) | [SunFounder Pi 5 Docs](https://docs.sunfounder.com/projects/davinci-kit/en/latest/for_pi5.html) |
| **PCB Silkscreen** | *Raspberry Pi 2B (BCM2836)* | *Raspberry Pi 5 (BCM2712 + RP1)* |

---

### 2. Interactive Workbench & Circuit Studio
- **Realistic Raspberry Pi Header**: Complete 40-pin GPIO header with live logic level indicators (High: 3.3V, Low: 0V, PWM duty cycle, 5V/3.3V rails, Ground).
- **SunFounder T-Cobbler (Cols 1..20 Footprint)**: 40-pin ribbon cable with Pin 1 red stripe plugged into an 830-point solderless breadboard, accurately straddling columns 1 to 20 with labeled silkscreen.
- **Precision Orthogonal Wiring**: Clean, non-overlapping orthogonal wires with 5-hole vertical terminal strip highlights and pin hover tooltips.
- **🔀 Split Compare Mode**: Side-by-side comparison between your interactive breadboard circuit and official SunFounder Fritzing wiring diagrams, schematics, and component lists.
- **🔬 Digital Multimeter (DMM) Probe**: Click any pin on the Raspberry Pi or T-Cobbler to read live voltage (0.00V–5.00V), loop current (mA), and logic level in real time.
- **⚠️ Electrical Guard (Smoke Check)**: Continuous safety audit detecting short circuits and missing current-limiting resistors before touching physical hardware.
- **📋 Step-by-Step Wiring Checklist**: Interactive verification checklist ensuring all ground, power rails, and signal leads are secured before powering the Pi.

---

### 3. Responsive Python 3 Execution Engine
- **Non-Blocking Execution**: Asynchronous transpiler and sandbox running Python code directly in browser via cooperative event-loop yielding (`yieldCheck`).
- **Interactive Controls & Keyboard Shortcuts**:
  - `▶ Run Simulation` (`F5` or `Ctrl + Enter`): Executes the current Python script.
  - `⏸ Pause / Resume`: Temporarily freezes simulation timing without dropping state.
  - `⏹ Stop (Esc)` (`Esc` or `Shift + F5`): Immediately raises `KEYBOARD_INTERRUPT`, safely runs the script's `destroy()` cleanup handler, silences buzzers, and resets GPIO pins to safe idle.
  - **Simulation Clock Speed**: Adjustable from `0.5x` (slow motion) to `5.0x` (turbo).
- **Rich Standard Library Shims**:
  - `time.sleep()`, `time.time()`, `time.monotonic()`
  - `threading.Thread`, `threading.Timer` (with safe cancellation)
  - `enumerate()`, `list()`, `len()`, `sprintf()`, `math`, `random`
  - Auto-instantiation of Python classes (`class Keypad` callable without `new`)

---

### 4. High-Detail Virtual Hardware Peripherals

| Category | Emulated Components & Features |
| :--- | :--- |
| **LEDs & Displays** | Single LEDs, RGB LED (PWM mixing), 10-Segment Bar Graph, 1-Digit 7-Segment, 4-Digit 7-Segment (multiplexed), 8x8 Dot Matrix, I2C LCD1602 (`0x27`) |
| **Sound & Audio** | Active Buzzer (2.5kHz via S8050 NPN transistor), Passive Buzzer (Web Audio API frequency synthesis playing notes & tunes), 5V Relay |
| **Actuators** | DC Motor with L293D H-Bridge driver (spinning 4-blade propeller with PWM speed & RPM readout), SG90 Micro Servo (0°–180° horn), 28BYJ-48 Stepper Motor with ULN2003 driver |
| **Sensors & Inputs** | Tactile Buttons, Slide Switch, Ball Tilt Switch, 10kΩ Potentiometer, 4x4 Keypad Matrix, PS2 Joystick (2D gimbal + Z button), Photoresistor (LDR lux slider), Thermistor (NTC with Steinhart-Hart equation), DHT11, PIR Motion Sensor, HC-SR04 Ultrasonic Distance Sensor, MPU6050 6-Axis IMU (interactive 3D orientation cube) |

---

### 5. 💡 Creative Lab & Local LLM Brainstorming Studio
- **Multi-Sensor Mashup Palette**: Select 2–5 components from the kit and brainstorm novel embedded system inventions.
- **Local Ollama Integration**: Live token streaming connected to local models (`mistral-small:24b`, `qwen3:30b-a3b`, `deepseek-r1:14b`, `gemma4:26b`) with seamless offline fallback.
- **Curated Inventions Catalog**: Pre-verified recipes including *Autonomous Greenhouse (BioDome)*, *Cyberpunk 2-Factor Vault*, *Sonar Sentry Turret*, *Chiptune Optical Theremin*, and *Inertial Gimbal*.
- **1-Click Simulator Injection**: Instantly load any brainstormed invention into the virtual breadboard and Python editor to execute and test in real time.

---

### 6. Complete Lesson Catalog (39 Lessons)
All 39 official SunFounder DaVinci Kit lessons are pre-loaded with official diagrams, schematics, and verified code for both architectures:
- **Outputs (1.x)**: `1.1.1` Blinking LED, `1.1.2` RGB LED, `1.1.3` LED Bar, `1.1.4` 7-Segment, `1.1.5` 4-Digit Display, `1.1.6` LED Matrix, `1.1.7` I2C LCD1602, `1.2.1` Active Buzzer, `1.2.2` Passive Buzzer, `1.3.1` Motor, `1.3.2` Servo, `1.3.3` Stepper, `1.3.4` Relay.
- **Inputs (2.x)**: `2.1.1` Button, `2.1.2` Slide Switch, `2.1.3` Tilt, `2.1.4` Potentiometer, `2.1.5` Keypad, `2.1.6` Joystick, `2.2.1` Photoresistor, `2.2.2` Thermistor, `2.2.3` DHT11, `2.2.4` PIR Motion, `2.2.5` Ultrasonic, `2.2.6` MPU6050.
- **Smart Projects (3.x)**: `3.1.1` Counting Device, `3.1.2` Welcome Chime, `3.1.3` Reversing Radar, `3.1.4` Smart Fan, `3.1.7` Traffic Light, `3.1.9` Password Lock, `3.1.12 - 3.1.14` Games (Guess Number, 10s Reflex, NOT NOT).

---

## 🚀 Getting Started

### Option A: Local Python Web Server
From the project directory:
```bash
python3 -m http.server 8080
```
Then navigate your browser to:
```
http://localhost:8080
```

### Option B: Direct Browser Launch
Open `index.html` directly in any modern browser (Chrome, Safari, Edge, Firefox). The simulator is **100% client-side** with zero backend or Node.js runtime dependencies.

### Option C: GitHub Pages Deployment
1. Go to your repository on GitHub: `Settings ➔ Pages`.
2. Under **Build and deployment** / **Source**, select `Deploy from a branch`.
3. Choose branch `main` and folder `/ (root)`.
4. Click **Save**. Your simulator will be live worldwide at:
   `https://<your-username>.github.io/sunfounder-davinci-web-simulator/`

---

## 🧪 Automated Unit Testing

The repository includes a comprehensive deterministic test harness covering pinout mappings, virtual GPIO logic, electrical guard safety checks, peripheral shims, Python transpiler AST generation, active execution lifecycles, and lesson integrity:

```bash
bash run_tests.sh
```
or directly via Node:
```bash
node tests/run_tests.js
```

---

## ⚠️ Hardware Safety Invariants Before Physical Assembly

1. **3.3V Logic Ceiling**: Raspberry Pi GPIO pins operate strictly at 3.3V. Applying 5V directly to a GPIO input pin will destroy the Broadcom SoC pin buffer. Always use a voltage divider (e.g., 1kΩ / 2kΩ resistors) for 5V output devices like the HC-SR04 Echo pin.
2. **Current Limitations**: Never draw more than 16mA from any single GPIO pin, and never exceed 50mA total across all 3.3V pins simultaneously.
3. **Ribbon Cable Alignment**: Ensure the red stripe on the 40-pin ribbon cable aligns with Pin 1 (3.3V) on both the Raspberry Pi header and the SunFounder T-Cobbler.
4. **Current Limiting Resistors**: Always place a 220Ω resistor in series with LEDs to limit forward current.

---

## 📄 License
MIT License. Created for makers, students, and educators working with the SunFounder DaVinci Kit and Raspberry Pi.
