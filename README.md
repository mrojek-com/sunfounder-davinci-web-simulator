# SunFounder DaVinci Kit Simulator (Raspberry Pi 2 Model B Aligned)

An interactive, in-browser hardware emulation studio and visual testbed for the **SunFounder DaVinci Kit for Raspberry Pi**, specifically engineered and calibrated for the **Raspberry Pi 2 Model B** (and compatible 40-pin Raspberry Pi models).

Simulate circuits, test Python code, inspect official breadboard wiring diagrams, verify circuit schematics, and watch Paul McWhorter / SunFounder tutorial videos **before wiring physical hardware** to protect your Raspberry Pi from short circuits or voltage overloads.

---

## 🌟 Key Features

### 1. Interactive Workbench & Simulation
- **Raspberry Pi 2 Model B Visual Board**: Realistic 40-pin GPIO header with live logic level LEDs (High: 3.3V, Low: 0V, PWM duty cycle, 5V / 3.3V Power rails, Ground).
- **SunFounder T-Cobbler (Cols 1..20 Footprint)**: 40-pin ribbon cable with Pin 1 red stripe indicator plugged into an 830-point solderless breadboard, accurately straddling columns 1 to 20 with labeled silkscreen.
- **Precision Orthogonal Jumper Wires & Active Net Strips**: Clean, non-overlapping orthogonal wiring with 5-hole vertical breadboard terminal strip highlights and hole hover tooltips.
- **🔀 Split Compare Mode**: Side-by-side comparison between your interactive breadboard circuit and official SunFounder Fritzing wiring diagrams, schematics, and component lists.
- **🔬 Digital Multimeter (DMM) Probe**: Click any pin on the Raspberry Pi or T-Cobbler to read live voltage (0.00V–5.00V), loop current (mA), and logic level in real time.
- **⚠️ Electrical Guard (Smoke Check)**: Continuous safety audit detecting short circuits and missing current-limiting resistors before touching physical hardware.
- **📋 Step-by-Step Wiring Checklist**: Interactive verification checklist ensuring all ground, power rails, and signal leads are secured before powering the Pi.

### 2. High-Detail Virtual Hardware Components
- **Single LEDs & RGB LED**: True color mixing via independent PWM (Red on GPIO 17, Green on GPIO 18, Blue on GPIO 27) with realistic light glow bloom.
- **Displays**:
  - 10-Segment LED Bar Graph
  - 1-Digit 7-Segment Display (74HC595 driven)
  - 4-Digit 7-Segment Display (Multiplexed)
  - 8x8 LED Dot Matrix
  - I2C LCD1602 Display (16x2 text matrix with backlight control at address `0x27`)
- **Sound & Audio**:
  - Active Buzzer (2.5kHz built-in piezo oscillator driven via S8050 NPN transistor)
  - Passive Buzzer (Real-time frequency synthesis via browser Web Audio API playing notes and melodies)
  - 5V Relay (Electromechanical click sound effect and NO/NC switching)
- **Actuators**:
  - DC Motor with L293D H-Bridge driver (Animated 4-blade spinning propeller with PWM speed control, forward/reverse direction, and RPM readout)
  - SG90 Micro Servo (0° to 180° animated horn with real-time angle readout)
  - 28BYJ-48 Stepper Motor with ULN2003 driver (Phase status LEDs A-B-C-D and rotating shaft indicator)
- **Sensors & Inputs**:
  - Tactile Push Button (Momentary press with debounce)
  - Slide Switch (SPDT 2-position switch)
  - Ball Tilt Switch (Tilt angle detection)
  - 10kΩ Potentiometer (Rotary knob with ADC0834 8-bit digital readout and voltage)
  - 4x4 Matrix Keypad (Clickable 16-key keypad with row-column matrix scanning)
  - PS2 Analog Joystick (2D draggable gimbal with X/Y ADC channels and Z tactile push button)
  - Photoresistor LDR (Ambient light lux slider)
  - Thermistor NTC (Temperature slider in °C and °F with Steinhart-Hart B-formula)
  - DHT11 (Digital temperature & relative humidity sliders)
  - PIR Motion Sensor ("Simulate Motion" trigger button with hold time)
  - HC-SR04 Ultrasonic Distance Sensor (Obstacle distance slider 2cm-400cm with microsecond echo timing)
  - MPU6050 6-Axis IMU (Interactive 3D orientation cube with pitch and roll controls)

### 3. Integrated Smart Projects (Section 3)
- **3.1.1 Counting Device**: 7-Segment counter with push button increment.
- **3.1.2 Welcome Device**: PIR motion detector + LCD greeting + buzzer chime.
- **3.1.3 Reversing Alarm Radar**: HC-SR04 ultrasonic proximity beeper with LCD distance display.
- **3.1.4 Smart Fan**: Temperature-controlled DC cooling fan with thermistor and manual button override.
- **3.1.7 Smart Traffic Light System**: Municipal traffic light sequence (Red -> Green -> Yellow) with pedestrian crossing button and countdown timer.
- **3.1.9 Keypad Password Lock**: 4x4 keypad digital PIN lock with LCD status.
- **3.1.12 - 3.1.14 Games**: Number guessing game, 10-second reflex stopwatch, NOT NOT brain teaser.

### 4. Official Documentation & Video Embeds
- **Breadboard Wiring Diagrams**: High-resolution diagrams from SunFounder documentation.
- **Circuit Schematics**: Electrical diagrams with component values and resistor calculations ($R = (V_{cc} - V_f) / I_f$).
- **Tutorial Videos**: Embedded Paul McWhorter / SunFounder YouTube lessons for every topic.
- **Raspberry Pi 2B 40-Pin Pinout Table**: Complete pin reference guide with BCM, Physical pin, WiringPi, and safety invariants.

### 5. In-Browser Python Code Playground & Dual Hardware Architectures
- **Target Hardware Architecture Toggle**:
  - **🍓 Raspberry Pi 2B / 3 / 4 (`RPi.GPIO` stack)**: Direct BCM/BOARD register-level control with PWM duty cycles (0..100%).
  - **🚀 Raspberry Pi 5 (`gpiozero` stack)**: Modern RP1 I/O controller object model with normalized float tuples, `LED`, `RGBLED`, `Button`, `Buzzer`, `Motor`, `Servo`, `DistanceSensor`, and event hooks matching SunFounder's official Pi 5 curriculum.
- **Embedded Syntax Editor**: Pre-loaded with official SunFounder Python scripts for all 39 lessons (`1.1.1` through `3.1.14`) across both target architectures.
- **Virtual Asynchronous Python Engine**: Emulates `RPi.GPIO`, `gpiozero`, `ADC0834`, `LCD1602`, `time.sleep()`, and `math` in browser without native dependencies.
- **Live Output Terminal**: Real-time stdout logging with timestamps and colored severity tags.

### 6. 💡 Creative Lab & Local LLM Brainstorming Studio
- **Multi-Sensor Mashup Palette**: Select 2–5 components from the kit and let the local LLM brainstorm novel embedded system inventions.
- **Local Ollama Integration**: Live token streaming connected directly to local models (`mistral-small:24b`, `qwen3:30b-a3b`, `deepseek-r1:14b`, `gemma4:26b`) with seamless offline fallback.
- **Curated Inventions Catalog**: Pre-verified recipes including *Autonomous Greenhouse (BioDome)*, *Cyberpunk 2-Factor Vault*, *Sonar Sentry Turret*, *Chiptune Optical Theremin*, and *Inertial Gimbal*.
- **1-Click Simulator Injection**: Instantly load any brainstormed invention into the virtual breadboard and Python editor to execute and test in real time.

---

## 🚀 How to Run Locally

### Option A: Using Python's built-in HTTP server
From the repository root or project directory:
```bash
cd davinci-kit-simulator
python3 -m http.server 8080
```
Then open your browser to:
```
http://localhost:8080
```

### Option B: Direct Browser Open
Simply double-click or open `web/davinci-kit-simulator/index.html` in Safari, Chrome, Edge, or Firefox.

---

## 🧪 Automated Unit Testing

Run the automated test suite verifying pinout mappings, virtual GPIO logic, peripheral drivers, Python transpiler, and lesson data integrity:

```bash
bash web/davinci-kit-simulator/run_tests.sh
```
or
```bash
node web/davinci-kit-simulator/tests/run_tests.js
```

---

## ⚠️ Raspberry Pi 2 Model B Safety Checklist Before Real Hardware Assembly

1. **3.3V Logic Limit**: Raspberry Pi 2B GPIO pins operate at 3.3V logic. Connecting 5V directly to a GPIO input pin will destroy the Broadcom SoC pin buffer. Always use a voltage divider (e.g., 1kΩ / 2kΩ resistors) for 5V signals like the HC-SR04 Echo pin.
2. **Current Ceiling**: Never draw more than 16mA from a single GPIO pin, and never exceed 50mA total across all 3.3V pins simultaneously.
3. **Ribbon Cable Alignment**: Ensure the red stripe on the 40-pin ribbon cable aligns with Pin 1 (3.3V) on both the Raspberry Pi 2B header and the SunFounder T-Cobbler.
4. **Current Limiting Resistors**: Always place a 220Ω resistor in series with LEDs to limit forward current.
