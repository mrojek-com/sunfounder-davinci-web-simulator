// Sovereign DaVinci Kit Creative Lab & Brainstorming Inventions Catalog
// Multi-component mashups, circuit wiring blueprints, and executable Python scripts
// for SunFounder DaVinci Kit on Raspberry Pi 2 Model B

(function(global) {
  'use strict';

  const CREATIVE_CONCEPTS = [
    {
      id: 'creative-1',
      title: 'Autonomous Smart Greenhouse & Climate Sentry (BioDome)',
      category: 'Smart Home & Ecology',
      tagline: 'Multi-sensor closed-loop climate regulation with thermal telemetry and automated venting',
      components: [
        'DHT11 Temp/Humidity Sensor',
        'SG90 Micro Servo (Ventilator Flap)',
        'LCD1602 I2C (Live Telemetry)',
        'RGB LED (Climate Status)',
        'Passive Buzzer (Heat Stress Alarm)'
      ],
      bcm_pins: [17, 18, 27, 22],
      description: 'Combines atmospheric telemetry from the DHT11 with closed-loop proportional ventilation using an SG90 servo motor. An I2C LCD1602 outputs real-time temperature and humidity, while a tri-color RGB LED indicates ambient health (Green = Optimal, Blue = Chilly, Red = Overheat). If temperature exceeds 30°C or humidity spikes, a passive buzzer emits an acoustic heat-stress alert and the servo swings 90° to open the cooling bay.',
      wiring_text: `• DHT11 Sensor: VCC -> Pin 2 (5V), GND -> Pin 6 (GND), DATA -> Pin 11 (GPIO 17)
• SG90 Micro Servo: Red -> Pin 4 (5V), Brown -> Pin 14 (GND), Orange PWM -> Pin 12 (GPIO 18 / PWM0)
• RGB LED (Common Cathode): Cathode -> Pin 20 (GND), Green -> Pin 13 (GPIO 27), Red -> Pin 15 (GPIO 22)
• Passive Buzzer: Positive -> Pin 12 (GPIO 18) or Pin 16 (GPIO 23), Negative -> GND
• LCD1602 (I2C): VCC -> 5V, GND -> GND, SDA -> Pin 3 (GPIO 2 / SDA1), SCL -> Pin 5 (GPIO 3 / SCL1)`,
      python_code: `#!/usr/bin/env python3
# Sovereign DaVinci Kit Invention: Autonomous Smart Greenhouse
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

PIN_DHT = 17       # DHT11 Data line
PIN_SERVO = 18     # SG90 PWM Vent Control
PIN_LED_GREEN = 27 # Optimal Climate Indicator
PIN_LED_RED = 22   # Heat Alert Indicator

GPIO.setup(PIN_LED_GREEN, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(PIN_LED_RED, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(PIN_SERVO, GPIO.OUT)

# Configure hardware PWM for Servo (50Hz)
servo_pwm = GPIO.PWM(PIN_SERVO, 50)
servo_pwm.start(2.5) # 0 degrees (Closed vent)

print("🌿 [BioDome Sentry] Climate Control Active on Raspberry Pi 2B")

try:
    # Simulated environmental control cycles
    readings = [[22.4, 55.0], [25.1, 58.2], [29.8, 64.0], [32.5, 78.0], [24.0, 52.0]]
    for cycle in range(5):
        temp = readings[cycle][0]
        humidity = readings[cycle][1]
        print(f"\\n--- Cycle {cycle+1}: Temp={temp}°C, Humidity={humidity}% ---")
        
        if temp < 28.0:
            # Optimal conditions
            GPIO.output(PIN_LED_GREEN, GPIO.HIGH)
            GPIO.output(PIN_LED_RED, GPIO.LOW)
            servo_pwm.ChangeDutyCycle(2.5) # Vent closed
            print("Status: [OPTIMAL] Greenhouse vent sealed.")
        else:
            # High temperature alert
            GPIO.output(PIN_LED_GREEN, GPIO.LOW)
            GPIO.output(PIN_LED_RED, GPIO.HIGH)
            servo_pwm.ChangeDutyCycle(7.5) # Vent open 90 degrees
            print("Status: [OVERHEAT WARNING] Vent flap opened for cooling!")
        
        time.sleep(1.0)
finally:
    servo_pwm.stop()
    GPIO.cleanup()
    print("Greenhouse safety cleanup finished.")
`,
      breadboard_spec: {
        power_jumpers: [
          { from: { col: 1, row: 'bot_minus' }, to: { col: 1, row: 'top_minus' }, color: '#2196f3' },
          { from: { col: 1, row: 'bot_plus' }, to: { col: 1, row: 'top_plus' }, color: '#e53935' }
        ],
        components: [
          { type: 'module', startCol: 22, label: 'DHT11' },
          { type: 'led', pins: [{ col: 26, row: 'D' }, { col: 26, row: 'C' }], color: 'green', bcm: 27, label: 'Optimal' },
          { type: 'led', pins: [{ col: 28, row: 'D' }, { col: 28, row: 'C' }], color: 'red', bcm: 22, label: 'Heat' },
          { type: 'resistor', from: { col: 26, row: 'E' }, to: { col: 26, row: 'F' }, label: '220Ω' },
          { type: 'resistor', from: { col: 28, row: 'E' }, to: { col: 28, row: 'F' }, label: '220Ω' },
          { type: 'module', startCol: 30, label: 'SG90' }
        ],
        wires: [
          { from: { col: 6, row: 'C' }, to: { col: 22, row: 'A' }, color: '#00e676', bcm: 17, label: 'DHT11 Data (GPIO17)' },
          { from: { col: 6, row: 'H' }, to: { col: 30, row: 'J' }, color: '#ffb300', bcm: 18, label: 'Servo PWM (GPIO18)' },
          { from: { col: 7, row: 'C' }, to: { col: 26, row: 'A' }, color: '#00e676', bcm: 27, label: 'LED Green (GPIO27)' },
          { from: { col: 8, row: 'C' }, to: { col: 28, row: 'A' }, color: '#e53935', bcm: 22, label: 'LED Red (GPIO22)' }
        ]
      }
    },

    {
      id: 'creative-2',
      title: 'Cyberpunk 2-Factor Biometric & Haptic Vault',
      category: 'Security & Cryptography',
      tagline: 'Dual-credential physical access safe with analog dial tumbler and solenoid lock',
      components: [
        '4x4 Matrix Keypad',
        'Analog Joystick (ADC0834 Tumbler)',
        '4-Digit 7-Segment Display (74HC595)',
        'Active Buzzer (Tamper Siren)',
        'Relay Module (Solenoid Bolt Lock)'
      ],
      bcm_pins: [17, 18, 27, 24, 26],
      description: 'An unhackable 2-factor hardware vault. The user must first enter a 4-digit PIN on the matrix keypad (rendered in real-time on the 4-digit 7-segment display via shift register). Once verified, the analog joystick acts as a mechanical combination tumbler (converting X/Y analog voltages through the ADC0834 chip). Aligning the tumbler triggers the 5V relay to retract the solenoid bolt while an active buzzer chirps confirmation.',
      wiring_text: `• Relay Module: VCC -> Pin 2 (5V), GND -> Pin 6 (GND), IN -> Pin 37 (GPIO 26)
• Active Buzzer: Positive -> Pin 18 (GPIO 24), Negative -> Pin 20 (GND)
• ADC0834 (Joystick Tumbler): CS -> GPIO 17, CLK -> GPIO 18, DIO -> GPIO 27, VCC -> 5V
• 4-Digit Display (74HC595): SDI -> GPIO 24, RCLK -> GPIO 23, SRCLK -> GPIO 25
• 4x4 Keypad: Rows -> GPIO 5, 6, 12, 13; Cols -> GPIO 19, 20, 21, 16`,
      python_code: `#!/usr/bin/env python3
# Sovereign DaVinci Kit Invention: 2-Factor Haptic Safe Vault
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

PIN_RELAY = 26  # Relay Solenoid Lock
PIN_BUZZER = 24 # Active Buzzer
PIN_CS = 17     # ADC0834 Chip Select
PIN_CLK = 18    # ADC0834 Clock
PIN_DIO = 27    # ADC0834 Data IO

GPIO.setup(PIN_RELAY, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(PIN_BUZZER, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(PIN_CS, GPIO.OUT, initial=GPIO.HIGH)
GPIO.setup(PIN_CLK, GPIO.OUT, initial=GPIO.LOW)

SECRET_PIN = "1337"
TUMBLER_TARGET = 180 # Analog dial position

print("🔒 [Haptic Cyberpunk Vault] Armed & Locked.")

def unlock_safe():
    print("✅ Credentials Verified! Retracting Solenoid Bolt...")
    GPIO.output(PIN_RELAY, GPIO.HIGH) # Energize Relay
    for _ in range(2):
        GPIO.output(PIN_BUZZER, GPIO.HIGH)
        time.sleep(0.08)
        GPIO.output(PIN_BUZZER, GPIO.LOW)
        time.sleep(0.05)
    time.sleep(2.0)
    GPIO.output(PIN_RELAY, GPIO.LOW)
    print("🔒 Door Closed. Solenoid Re-engaged.")

try:
    print("Simulating PIN Entry: 1-3-3-7")
    time.sleep(0.6)
    print("PIN Accepted. Stage 2: Turn Analog Joystick Tumbler to position 180...")
    time.sleep(0.8)
    dial_pos = 180
    if dial_pos == TUMBLER_TARGET:
        unlock_safe()
finally:
    GPIO.cleanup()
`,
      breadboard_spec: {
        power_jumpers: [
          { from: { col: 1, row: 'bot_minus' }, to: { col: 1, row: 'top_minus' }, color: '#2196f3' },
          { from: { col: 1, row: 'bot_plus' }, to: { col: 1, row: 'top_plus' }, color: '#e53935' }
        ],
        components: [
          { type: 'module', startCol: 22, label: 'ADC0834' },
          { type: 'buzzer', col: 27, row: 'D', bcm: 24, label: 'Siren' },
          { type: 'module', startCol: 29, label: 'Relay' }
        ],
        wires: [
          { from: { col: 6, row: 'C' }, to: { col: 22, row: 'A' }, color: '#00e676', bcm: 17, label: 'ADC CS (GPIO17)' },
          { from: { col: 6, row: 'H' }, to: { col: 23, row: 'A' }, color: '#ffb300', bcm: 18, label: 'ADC CLK (GPIO18)' },
          { from: { col: 7, row: 'C' }, to: { col: 24, row: 'A' }, color: '#00e676', bcm: 27, label: 'ADC DIO (GPIO27)' },
          { from: { col: 9, row: 'H' }, to: { col: 27, row: 'A' }, color: '#e53935', bcm: 24, label: 'Buzzer (GPIO24)' },
          { from: { col: 19, row: 'C' }, to: { col: 29, row: 'A' }, color: '#00e676', bcm: 26, label: 'Relay (GPIO26)' }
        ]
      }
    },

    {
      id: 'creative-3',
      title: 'Sonar-Guided Sentry Turret & Perimeter Radar',
      category: 'Robotics & Defense',
      tagline: '180° pan-scanning ultrasonic acoustic radar with threat telemetry & acoustic lock-on',
      components: [
        'HC-SR04 Ultrasonic Distance Sensor',
        'SG90 Micro Servo (180° Radar Pan)',
        '8x8 LED Matrix (74HC595 Radar Blip)',
        'RGB LED (Threat Level Indicator)',
        'Active Buzzer (Target Lock Audio Ping)'
      ],
      bcm_pins: [18, 23, 24, 17, 27, 22],
      description: 'An autonomous perimeter tracking turret. The SG90 servo sweeps the ultrasonic HC-SR04 sensor continuously back and forth from 0° to 180°. As distance readings stream in, polar coordinates are mapped to blips on the 8x8 LED Matrix. When an intruder breaches the 20cm perimeter, the turret halts, the RGB LED switches from pulsing Green to rapid Red, and the active buzzer triggers acoustic proximity pings.',
      wiring_text: `• HC-SR04 Ultrasonic: VCC -> Pin 2 (5V), Trig -> Pin 16 (GPIO 23), Echo -> Voltage Divider -> Pin 18 (GPIO 24), GND -> Pin 6 (GND)
• SG90 Servo: Orange PWM -> Pin 12 (GPIO 18 / PWM0), Red -> 5V, Brown -> GND
• RGB LED: Green -> Pin 13 (GPIO 27), Red -> Pin 11 (GPIO 17), Common Cathode -> GND
• Active Buzzer: Positive -> Pin 15 (GPIO 22), Negative -> GND
• 8x8 Matrix (74HC595): SDI -> Pin 19 (GPIO 10), RCLK -> Pin 23 (GPIO 11), SRCLK -> Pin 21 (GPIO 9)`,
      python_code: `#!/usr/bin/env python3
# Sovereign DaVinci Kit Invention: Sonar Sentry Turret
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

PIN_SERVO = 18   # Servo PWM Pan
PIN_TRIG = 23    # Ultrasonic Trigger
PIN_ECHO = 24    # Ultrasonic Echo
PIN_LED_RED = 17 # Threat Lock Indicator
PIN_BUZZER = 22  # Proximity Audio Ping

GPIO.setup(PIN_TRIG, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(PIN_ECHO, GPIO.IN)
GPIO.setup(PIN_LED_RED, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(PIN_BUZZER, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(PIN_SERVO, GPIO.OUT)

servo_pwm = GPIO.PWM(PIN_SERVO, 50)
servo_pwm.start(2.5)

print("🎯 [Sonar Sentry Turret] Active Radar Sweeping (0° - 180°)...")

def measure_distance():
    GPIO.output(PIN_TRIG, GPIO.HIGH)
    time.sleep(0.00001)
    GPIO.output(PIN_TRIG, GPIO.LOW)
    # Emulated acoustic flight time
    return 14.5 # 14.5 cm intrusion target

try:
    for angle in [30, 60, 90, 120, 150]:
        duty = 2.5 + (angle / 180.0) * 10.0
        servo_pwm.ChangeDutyCycle(duty)
        time.sleep(0.3)
        dist = measure_distance()
        print(f"Azimuth: {angle:3d}° | Range: {dist:.1f} cm", end="")
        if dist < 20.0:
            print(" -> [TARGET LOCKED! INTRUDER DETECTED]")
            GPIO.output(PIN_LED_RED, GPIO.HIGH)
            GPIO.output(PIN_BUZZER, GPIO.HIGH)
            time.sleep(0.1)
            GPIO.output(PIN_BUZZER, GPIO.LOW)
            GPIO.output(PIN_LED_RED, GPIO.LOW)
        else:
            print(" -> [Clear]")
finally:
    servo_pwm.stop()
    GPIO.cleanup()
`,
      breadboard_spec: {
        power_jumpers: [
          { from: { col: 1, row: 'bot_minus' }, to: { col: 1, row: 'top_minus' }, color: '#2196f3' },
          { from: { col: 1, row: 'bot_plus' }, to: { col: 1, row: 'top_plus' }, color: '#e53935' }
        ],
        components: [
          { type: 'module', startCol: 22, label: 'HC-SR04' },
          { type: 'module', startCol: 26, label: 'SG90' },
          { type: 'led', pins: [{ col: 29, row: 'D' }, { col: 29, row: 'C' }], color: 'red', bcm: 17, label: 'Threat' },
          { type: 'resistor', from: { col: 29, row: 'E' }, to: { col: 29, row: 'F' }, label: '220Ω' },
          { type: 'buzzer', col: 31, row: 'D', bcm: 22, label: 'Ping' }
        ],
        wires: [
          { from: { col: 6, row: 'H' }, to: { col: 26, row: 'J' }, color: '#ffb300', bcm: 18, label: 'Servo PWM (GPIO18)' },
          { from: { col: 8, row: 'H' }, to: { col: 22, row: 'A' }, color: '#00e676', bcm: 23, label: 'Trig (GPIO23)' },
          { from: { col: 9, row: 'H' }, to: { col: 23, row: 'A' }, color: '#039be5', bcm: 24, label: 'Echo (GPIO24)' },
          { from: { col: 6, row: 'C' }, to: { col: 29, row: 'A' }, color: '#e53935', bcm: 17, label: 'LED Red (GPIO17)' },
          { from: { col: 8, row: 'C' }, to: { col: 31, row: 'A' }, color: '#f59e0b', bcm: 22, label: 'Buzzer (GPIO22)' }
        ]
      }
    },

    {
      id: 'creative-4',
      title: 'Chiptune Optical Theremin & Audio Synthesizer',
      category: 'Music & Audio',
      tagline: 'Light-responsive contactless instrument with real-time waveform & 10-bar LED VU meter',
      components: [
        'Photoresistor LDR (ADC0834 Optical Pitch)',
        'Potentiometer (ADC0834 Volume/Tempo)',
        'Passive Buzzer (PWM Musical Frequencies)',
        '10-Segment LED Bar Graph (74HC595 VU Meter)',
        'LCD1602 I2C (Note & Waveform Readout)'
      ],
      bcm_pins: [18, 17, 27, 22, 23, 24, 25],
      description: 'An expressive, touchless optical synthesizer inspired by Leon Theremin. Moving your hand over the photoresistor modulates pitch from 220Hz (A3) up to 1760Hz (A6) synthesized by hardware PWM on the passive buzzer. A potentiometer dials in vibrato rate, while a 74HC595 shift register drives the 10-segment LED bar graph as an energetic optical VU meter displaying output volume.',
      wiring_text: `• Passive Buzzer: Positive -> Pin 12 (GPIO 18 / PWM0), Negative -> Pin 14 (GND)
• ADC0834 (LDR & Potentiometer): CS -> Pin 11 (GPIO 17), CLK -> Pin 13 (GPIO 27), DIO -> Pin 15 (GPIO 22)
• 74HC595 (LED Bar Graph): SDI -> Pin 16 (GPIO 23), RCLK -> Pin 18 (GPIO 24), SRCLK -> Pin 22 (GPIO 25)
• LCD1602 (I2C): SDA -> GPIO 2, SCL -> GPIO 3, VCC -> 5V, GND -> GND`,
      python_code: `#!/usr/bin/env python3
# Sovereign DaVinci Kit Invention: Optical Chiptune Theremin
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

PIN_BUZZER = 18 # Hardware PWM note generator

GPIO.setup(PIN_BUZZER, GPIO.OUT)
buzzer_pwm = GPIO.PWM(PIN_BUZZER, 440)
buzzer_pwm.start(50) # 50% square wave duty cycle

# Musical frequency scale (C4 to B5)
NOTES = {
    'C4': 261, 'D4': 294, 'E4': 329, 'F4': 349, 'G4': 392, 'A4': 440, 'B4': 493,
    'C5': 523, 'D5': 587, 'E5': 659, 'G5': 784, 'A5': 880
}

print("🎹 [Optical Chiptune Theremin] Ready! Modulate light above LDR...")

try:
    arpeggio = ['C4', 'E4', 'G4', 'B4', 'C5', 'E5', 'G5', 'A5']
    for note in arpeggio:
        freq = NOTES[note]
        buzzer_pwm.ChangeFrequency(freq)
        print(f"🎵 Note: {note:<3} | Frequency: {freq} Hz | VU Meter: [{'█' * (freq // 100):<10}]")
        time.sleep(0.25)
    buzzer_pwm.stop()
finally:
    GPIO.cleanup()
    print("Theremin audio shutdown.")
`,
      breadboard_spec: {
        power_jumpers: [
          { from: { col: 1, row: 'bot_minus' }, to: { col: 1, row: 'top_minus' }, color: '#2196f3' },
          { from: { col: 1, row: 'bot_plus' }, to: { col: 1, row: 'top_plus' }, color: '#e53935' }
        ],
        components: [
          { type: 'buzzer', col: 23, row: 'D', bcm: 18, label: 'PWM Synth' },
          { type: 'module', startCol: 25, label: 'ADC0834' },
          { type: 'ic', startCol: 29, cols: 6, label: '74HC595' }
        ],
        wires: [
          { from: { col: 6, row: 'H' }, to: { col: 23, row: 'A' }, color: '#ffb300', bcm: 18, label: 'PWM Audio (GPIO18)' },
          { from: { col: 6, row: 'C' }, to: { col: 25, row: 'A' }, color: '#00e676', bcm: 17, label: 'ADC CS (GPIO17)' },
          { from: { col: 7, row: 'C' }, to: { col: 26, row: 'A' }, color: '#00e676', bcm: 27, label: 'ADC CLK (GPIO27)' },
          { from: { col: 8, row: 'C' }, to: { col: 27, row: 'A' }, color: '#00e676', bcm: 22, label: 'ADC DIO (GPIO22)' }
        ]
      }
    },

    {
      id: 'creative-5',
      title: 'Smart Pedestrian Intersection with Accessible Audio Beacon',
      category: 'Smart Infrastructure',
      tagline: 'Traffic light state machine with PIR pedestrian presence & blind-accessible acoustic chimes',
      components: [
        'PIR Motion Sensor (Pedestrian Approach)',
        'Push Button (Crosswalk Request)',
        'Traffic Light LEDs (Red, Yellow, Green)',
        'Active Buzzer (Audible Walk Signal)',
        'LCD1602 I2C (Safety & Countdown Display)'
      ],
      bcm_pins: [17, 27, 22, 25, 26, 24],
      description: 'An intelligent pedestrian safety junction. Vehicle flow is governed by high-efficiency Red, Yellow, and Green LEDs. The crosswalk can be triggered manually via a tactile push button or automatically via a PIR motion sensor detecting approaching pedestrians. Once the walk phase starts, the active buzzer emits accessibility locator beeps (slow for wait, rapid for walk), synchronized with an LCD countdown timer.',
      wiring_text: `• Traffic LEDs: Red -> Pin 11 (GPIO 17), Yellow -> Pin 13 (GPIO 27), Green -> Pin 15 (GPIO 22), Cathodes -> GND
• Crosswalk Button: Pin 22 (GPIO 25) with internal pull-up to GND
• PIR Motion Sensor: VCC -> 5V, GND -> GND, OUT -> Pin 37 (GPIO 26)
• Active Buzzer: Positive -> Pin 18 (GPIO 24), Negative -> GND
• LCD1602 I2C: SDA -> GPIO 2, SCL -> GPIO 3, VCC -> 5V, GND -> GND`,
      python_code: `#!/usr/bin/env python3
# Sovereign DaVinci Kit Invention: Smart Pedestrian Crosswalk
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

PIN_RED = 17
PIN_YELLOW = 27
PIN_GREEN = 22
PIN_BTN = 25
PIN_PIR = 26
PIN_BUZZER = 24

GPIO.setup([PIN_RED, PIN_YELLOW, PIN_GREEN, PIN_BUZZER], GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(PIN_BTN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(PIN_PIR, GPIO.IN)

print("🚦 [Smart Intersection] Traffic State Machine Running...")

def traffic_cycle():
    # Green phase
    GPIO.output(PIN_GREEN, GPIO.HIGH)
    print("Vehicles: [GREEN] | Pedestrians: [WAIT]")
    time.sleep(1.0)
    
    # Transition to Yellow
    GPIO.output(PIN_GREEN, GPIO.LOW)
    GPIO.output(PIN_YELLOW, GPIO.HIGH)
    print("Vehicles: [YELLOW] | Preparing crosswalk...")
    time.sleep(0.5)
    
    # Pedestrian Walk Phase (Red for cars)
    GPIO.output(PIN_YELLOW, GPIO.LOW)
    GPIO.output(PIN_RED, GPIO.HIGH)
    print("Vehicles: [RED] | Pedestrians: [WALK SIGNAL ACTIVE]")
    for _ in range(4):
        GPIO.output(PIN_BUZZER, GPIO.HIGH)
        time.sleep(0.08)
        GPIO.output(PIN_BUZZER, GPIO.LOW)
        time.sleep(0.12)
    GPIO.output(PIN_RED, GPIO.LOW)

try:
    traffic_cycle()
finally:
    GPIO.cleanup()
`,
      breadboard_spec: {
        power_jumpers: [
          { from: { col: 1, row: 'bot_minus' }, to: { col: 1, row: 'top_minus' }, color: '#2196f3' },
          { from: { col: 1, row: 'bot_plus' }, to: { col: 1, row: 'top_plus' }, color: '#e53935' }
        ],
        components: [
          { type: 'led', pins: [{ col: 23, row: 'D' }, { col: 23, row: 'C' }], color: 'red', bcm: 17, label: 'Red' },
          { type: 'led', pins: [{ col: 25, row: 'D' }, { col: 25, row: 'C' }], color: 'yellow', bcm: 27, label: 'Yellow' },
          { type: 'led', pins: [{ col: 27, row: 'D' }, { col: 27, row: 'C' }], color: 'green', bcm: 22, label: 'Green' },
          { type: 'button', pins: [{ col: 29, row: 'E' }, { col: 30, row: 'E' }, { col: 29, row: 'F' }, { col: 30, row: 'F' }], bcm: 25 },
          { type: 'buzzer', col: 32, row: 'D', bcm: 24, label: 'Walk Beep' }
        ],
        wires: [
          { from: { col: 6, row: 'C' }, to: { col: 23, row: 'A' }, color: '#e53935', bcm: 17, label: 'Red LED (GPIO17)' },
          { from: { col: 7, row: 'C' }, to: { col: 25, row: 'A' }, color: '#f59e0b', bcm: 27, label: 'Yellow LED (GPIO27)' },
          { from: { col: 8, row: 'C' }, to: { col: 27, row: 'A' }, color: '#10b981', bcm: 22, label: 'Green LED (GPIO22)' },
          { from: { col: 11, row: 'H' }, to: { col: 29, row: 'A' }, color: '#039be5', bcm: 25, label: 'Button (GPIO25)' },
          { from: { col: 9, row: 'H' }, to: { col: 32, row: 'A' }, color: '#f59e0b', bcm: 24, label: 'Buzzer (GPIO24)' }
        ]
      }
    },

    {
      id: 'creative-6',
      title: 'Inertial Attitude Tracker & Anti-Shake Stepper Gimbal',
      category: 'Robotics & Aerospace',
      tagline: '6-DOF gyroscopic attitude sensing with precise ULN2003 stepper horizon stabilization',
      components: [
        'MPU6050 6-Axis Gyro/Accelerometer (I2C)',
        '28BYJ-48 Stepper Motor + ULN2003 Driver',
        'Analog Joystick (ADC0834 Manual Trim)',
        'RGB LED (Horizon Level Indicator)',
        'Passive Buzzer (Stall/Inversion Alarm)'
      ],
      bcm_pins: [18, 23, 24, 25, 17, 27, 22],
      description: 'An advanced gyroscopic flight attitude stabilizer. As the MPU6050 experiences pitch and roll tilt, the 28BYJ-48 geared stepper motor executes micro-step compensation via ULN2003 Darlington drivers to maintain a camera level on the horizon. An RGB LED visually indicates tilt angle (Green = Level, Amber = 15° Bank, Red = Critical Bank Angle), with emergency tone alerts if tilt limits are breached.',
      wiring_text: `• MPU6050: VCC -> 3.3V, GND -> GND, SDA -> Pin 3 (GPIO 2 / SDA1), SCL -> Pin 5 (GPIO 3 / SCL1)
• 28BYJ-48 + ULN2003: IN1 -> Pin 12 (GPIO 18), IN2 -> Pin 16 (GPIO 23), IN3 -> Pin 18 (GPIO 24), IN4 -> Pin 22 (GPIO 25), VCC -> 5V, GND -> GND
• RGB LED: Green -> Pin 13 (GPIO 27), Red -> Pin 11 (GPIO 17), Cathode -> GND
• Passive Buzzer: Signal -> Pin 15 (GPIO 22), Negative -> GND`,
      python_code: `#!/usr/bin/env python3
# Sovereign DaVinci Kit Invention: Gyroscopic Stepper Gimbal
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

# ULN2003 Stepper phases
PINS_STEPPER = [18, 23, 24, 25]
PIN_LED_GREEN = 27
PIN_LED_RED = 17

for p in PINS_STEPPER + [PIN_LED_GREEN, PIN_LED_RED]:
    GPIO.setup(p, GPIO.OUT, initial=GPIO.LOW)

# 4-step sequence for 28BYJ-48
STEP_SEQ = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
]

print("🚁 [Gimbal Stabilizer] Gyroscopic Compensation Active")

def step_motor(steps, direction=1):
    for _ in range(steps):
        for phase in (STEP_SEQ if direction > 0 else reversed(STEP_SEQ)):
            for i, val in enumerate(phase):
                GPIO.output(PINS_STEPPER[i], val)
            time.sleep(0.003)

try:
    simulated_pitches = [0.0, 5.2, 14.8, -8.3, 0.0]
    for pitch in simulated_pitches:
        print(f"MPU6050 Pitch: {pitch:+5.1f}° -> ", end="")
        if abs(pitch) < 3.0:
            GPIO.output(PIN_LED_GREEN, GPIO.HIGH)
            GPIO.output(PIN_LED_RED, GPIO.LOW)
            print("Status: [LEVEL] Gimbal nominal.")
        else:
            GPIO.output(PIN_LED_GREEN, GPIO.LOW)
            GPIO.output(PIN_LED_RED, GPIO.HIGH)
            correction_steps = int(abs(pitch) * 4)
            direction = 1 if pitch < 0 else -1
            print(f"Status: [COMPENSATING] Stepper applying {correction_steps} steps.")
            step_motor(correction_steps, direction)
        time.sleep(0.5)
finally:
    for p in PINS_STEPPER:
        GPIO.output(p, GPIO.LOW)
    GPIO.cleanup()
`,
      breadboard_spec: {
        power_jumpers: [
          { from: { col: 1, row: 'bot_minus' }, to: { col: 1, row: 'top_minus' }, color: '#2196f3' },
          { from: { col: 1, row: 'bot_plus' }, to: { col: 1, row: 'top_plus' }, color: '#e53935' }
        ],
        components: [
          { type: 'module', startCol: 22, label: 'MPU6050' },
          { type: 'ic', startCol: 26, cols: 6, label: 'ULN2003' },
          { type: 'led', pins: [{ col: 33, row: 'D' }, { col: 33, row: 'C' }], color: 'green', bcm: 27, label: 'Horizon' }
        ],
        wires: [
          { from: { col: 6, row: 'H' }, to: { col: 26, row: 'A' }, color: '#ffb300', bcm: 18, label: 'Step 1 (GPIO18)' },
          { from: { col: 8, row: 'H' }, to: { col: 27, row: 'A' }, color: '#00e676', bcm: 23, label: 'Step 2 (GPIO23)' },
          { from: { col: 9, row: 'H' }, to: { col: 28, row: 'A' }, color: '#039be5', bcm: 24, label: 'Step 3 (GPIO24)' },
          { from: { col: 11, row: 'H' }, to: { col: 29, row: 'A' }, color: '#f59e0b', bcm: 25, label: 'Step 4 (GPIO25)' },
          { from: { col: 7, row: 'C' }, to: { col: 33, row: 'A' }, color: '#10b981', bcm: 27, label: 'LED (GPIO27)' }
        ]
      }
    }
  ];

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = CREATIVE_CONCEPTS;
  }
  global.DAVINCI_CREATIVE_CONCEPTS = CREATIVE_CONCEPTS;
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
