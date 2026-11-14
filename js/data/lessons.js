// SunFounder DaVinci Kit Lessons Database (Pin-Accurate Section-Parsed)
// Contains all 39 official lessons, exact wiring/schematic images, breadboard specs, YouTube videos, and Python code

const DAVINCI_LESSONS = [
  {
    "id": "1.1.1",
    "title": "Blinking LED",
    "category": "Output",
    "slug": "1.1.1_blinking_led.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/1.1.1_blinking_led.html",
    "description": "Make an LED blink on and off at regular intervals using GPIO pin 17.",
    "bcm_pins": [
      17
    ],
    "youtube_id": "1WDagiA8fdU",
    "youtube_title": "Video 1: First Boot & Blink",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/blinking_led_list.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image48.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image49.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image54.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/blinking_led_list.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image41.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image42.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image43.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image44.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image45.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image46.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image47.jpeg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image48.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image49.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image50.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image51.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image52.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image53.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image54.jpeg"
    ],
    "python_file": "1.1.1_BlinkingLed.py",
    "python_code": "#!/usr/bin/env python3\nimport RPi.GPIO as GPIO\nimport time\nLedPin = 17\ndef setup():\n    # Set the GPIO modes to BCM Numbering\n    GPIO.setmode(GPIO.BCM)\n    # Set LedPin's mode to output,and initial level to High(3.3v)\n    GPIO.setup(LedPin, GPIO.OUT, initial=GPIO.HIGH)\n# Define a main function for main process\ndef main():\n    while True:\n        print ('...LED ON')\n        # Turn on LED\n        GPIO.output(LedPin, GPIO.LOW)\n        time.sleep(0.5)\n        print ('LED OFF...')\n        # Turn off LED\n        GPIO.output(LedPin, GPIO.HIGH)\n        time.sleep(0.5)\n# Define a destroy function for clean up everything after the script finished\ndef destroy():\n    # Turn off LED\n    GPIO.output(LedPin, GPIO.HIGH)\n    # Release resource\n    GPIO.cleanup()                   \n# If run this script directly, do:\nif __name__ == '__main__':\n    setup()\n    try:\n        main()\n    # When 'Ctrl+C' is pressed, the program destroy() will be  executed.\n    except KeyboardInterrupt:\n        destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image49.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 3,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        }
      ],
      "components": [
        {
          "type": "led",
          "color": "red",
          "bcm": 17,
          "activeLow": true,
          "label": "Red LED",
          "pins": [
            {
              "col": 27,
              "row": "E",
              "name": "Cathode (-)"
            },
            {
              "col": 28,
              "row": "E",
              "name": "Anode (+)"
            }
          ]
        },
        {
          "type": "resistor",
          "value": "220\u03a9",
          "bands": [
            "#e53935",
            "#e53935",
            "#795548",
            "#212121",
            "#ffb300"
          ],
          "from": {
            "col": 28,
            "row": "A"
          },
          "to": {
            "col": 28,
            "row": "bot_plus"
          },
          "label": "220\u03a9 Resistor (Col 28A -> + Rail)"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> LED Cathode (Col 27A)",
          "bcm": 17
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> LED Cathode (Col 27A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Red LED"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 220\u03a9 Resistor (Col 28A -> + Rail)"
      }
    ]
  },
  {
    "id": "1.1.2",
    "title": "RGB LED",
    "category": "Output",
    "slug": "1.1.2_rgb_led.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/1.1.2_rgb_led.html",
    "description": "Control a multi-color RGB LED using PWM to mix red, green, and blue to produce arbitrary colors.",
    "bcm_pins": [
      17,
      18,
      27
    ],
    "youtube_id": "nkFw1JfdLLo",
    "youtube_title": "Video 11: RGB LED & PWM",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_rgb_led.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/rgb_led_schematic.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image61.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image62.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_rgb_led.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image56.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image57.jpeg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/rgb_led_sch.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/rgb_led_schematic.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image61.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image62.jpeg"
    ],
    "python_file": "1.1.2_rgbLed.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\n\n# Set up a color table in Hexadecimal\nCOLOR = [0xFF0000, 0x00FF00, 0x0000FF, 0xFFFF00, 0xFF00FF, 0x00FFFF]\n# Set pins' channels with dictionary\npins = {'Red':17, 'Green':18, 'Blue':27}\n\n\ndef setup():\n\tglobal p_R, p_G, p_B\n\t# Set the GPIO modes to BCM Numbering\n\tGPIO.setmode(GPIO.BCM)\n\t# Set all LedPin's mode to output and initial level to High(3.3v)\n\tfor i in pins:\n\t\tGPIO.setup(pins[i], GPIO.OUT, initial=GPIO.HIGH)\n\n\t# Set all led as pwm channel and frequece to 2KHz\n\tp_R = GPIO.PWM(pins['Red'], 2000)\n\tp_G = GPIO.PWM(pins['Green'], 2000)\n\tp_B = GPIO.PWM(pins['Blue'], 2000)\n\n\t# Set all begin with value 0\n\tp_R.start(0)\n\tp_G.start(0)\n\tp_B.start(0)\n\n# Define a MAP function for mapping values.  Like from 0~255 to 0~100\ndef MAP(x, in_min, in_max, out_min, out_max):\n\treturn (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min\n\n# Define a function to set up colors \n# input color should be Hexadecimal with \n# red value, blue value, green value.\ndef setColor(color):\n # configures the three LEDs' luminance with the inputted color value . \n\t# Devide colors from 'color' veriable\n\tR_val = (color & 0xFF0000) >> 16\n\tG_val = (color & 0x00FF00) >> 8\n\tB_val = (color & 0x0000FF) >> 0\n # these three lines are used for analyzing the col variables \n # assign the first two values of the hexadecimal to R, the middle two assigned to G\n # assign the last two values to B, please refer to the shift operation of the hexadecimal for details.\n\n\t# Map color value from 0~255 to 0~100\n\tR_val = MAP(R_val, 0, 255, 0, 100)\n\tG_val = MAP(G_val, 0, 255, 0, 100)\n\tB_val = MAP(B_val, 0, 255, 0, 100)\n\t\n\t# Change the colors\n\tp_R.ChangeDutyCycle(R_val)\n\t# Assign the mapped duty cycle value to the corresponding PWM channel to change the luminance. \n\tp_G.ChangeDutyCycle(G_val)\n\tp_B.ChangeDutyCycle(B_val)\n\n\tprint (\"color_msg: R_val = %s,\tG_val = %s,\tB_val = %s\"%(R_val, G_val, B_val))\t \n\ndef main():\n\twhile True:\n\t\tfor color in COLOR:# Assign every item in the COLOR list to the color respectively and change the color of the RGB LED via the setColor() function.\n\t\t\tsetColor(color)# change the color of the RGB LED\n\t\t\ttime.sleep(0.5)# set delay for 0.5s after each color changing. Modify this parameter will changed the LED's color changing rate.   \n\ndef destroy():\n\t# Stop all pwm channel\n\tp_R.stop()\n\tp_G.stop()\n\tp_B.stop()\n\t# Release resource\n\tGPIO.cleanup()\n\n# If run this script directly, do:\nif __name__ == '__main__':\n\tsetup()\n\ttry:\n\t\tmain()\n\t# When 'Ctrl+C' is pressed, the program \n\t# destroy() will be  executed.\n\texcept KeyboardInterrupt:\n\t\tdestroy()\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image61.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "rgb_led",
          "bcmPins": [
            17,
            18,
            27
          ],
          "label": "RGB LED (Common Cathode)",
          "pins": [
            {
              "col": 27,
              "row": "G",
              "name": "Red"
            },
            {
              "col": 28,
              "row": "G",
              "name": "GND"
            },
            {
              "col": 29,
              "row": "G",
              "name": "Green"
            },
            {
              "col": 30,
              "row": "G",
              "name": "Blue"
            }
          ]
        },
        {
          "type": "resistor",
          "value": "220\u03a9 (R)",
          "bands": [
            "#e53935",
            "#e53935",
            "#212121",
            "#ffb300"
          ],
          "from": {
            "col": 27,
            "row": "F"
          },
          "to": {
            "col": 27,
            "row": "E"
          },
          "label": "220\u03a9 Resistor Red (27F -> 27E)"
        },
        {
          "type": "resistor",
          "value": "220\u03a9 (G)",
          "bands": [
            "#e53935",
            "#e53935",
            "#212121",
            "#ffb300"
          ],
          "from": {
            "col": 29,
            "row": "F"
          },
          "to": {
            "col": 29,
            "row": "E"
          },
          "label": "220\u03a9 Resistor Green (29F -> 29E)"
        },
        {
          "type": "resistor",
          "value": "220\u03a9 (B)",
          "bands": [
            "#e53935",
            "#e53935",
            "#212121",
            "#ffb300"
          ],
          "from": {
            "col": 30,
            "row": "F"
          },
          "to": {
            "col": 30,
            "row": "E"
          },
          "label": "220\u03a9 Resistor Blue (30F -> 30E)"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#e53935",
          "label": "GPIO17 (Col 6A) -> RGB Red (Col 27A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 28,
            "row": "E"
          },
          "to": {
            "col": 28,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "RGB Common Cathode (28E) -> - Rail"
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 29,
            "row": "A"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Col 6J) -> RGB Green (Col 29A)",
          "bcm": 18,
          "route": "around_right"
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 30,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO27 (Col 7A) -> RGB Blue (Col 30A)",
          "bcm": 27
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#e53935",
        "text": "GPIO17 (Col 6A) -> RGB Red (Col 27A)"
      },
      {
        "kind": "wire",
        "color": "#212121",
        "text": "RGB Common Cathode (28E) -> - Rail"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Col 6J) -> RGB Green (Col 29A)"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO27 (Col 7A) -> RGB Blue (Col 30A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place RGB LED (Common Cathode)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 220\u03a9 Resistor Red (27F -> 27E)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 220\u03a9 Resistor Green (29F -> 29E)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 220\u03a9 Resistor Blue (30F -> 30E)"
      }
    ]
  },
  {
    "id": "1.1.3",
    "title": "LED Bar Graph",
    "category": "Output",
    "slug": "1.1.3_led_bar_graph.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/1.1.3_led_bar_graph.html",
    "description": "Control a 10-segment LED bar graph in sequence and flowing light patterns.",
    "bcm_pins": [
      17,
      18,
      27,
      22,
      23,
      24,
      25,
      2,
      3,
      8
    ],
    "youtube_id": "yJdN6LmGqvc",
    "youtube_title": "Video 9: Using GPIO for PWM",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_led_bar.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/schematic_led_bar.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image66.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image67.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_led_bar.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/led_bar_sche.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/schematic_led_bar.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image66.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image67.jpeg"
    ],
    "python_file": "1.1.3_LedBarGraph.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\n\nledPins = [11, 12, 13, 15, 16, 18, 22, 3, 5, 24]\n\ndef oddLedBarGraph():\n\tfor i in range(5):\n\t\tj = i*2\n\t\tGPIO.output(ledPins[j],GPIO.HIGH)\n\t\ttime.sleep(0.3)\n\t\tGPIO.output(ledPins[j],GPIO.LOW)\n\ndef evenLedBarGraph():\n\tfor i in range(5):\n\t\tj = i*2+1\n\t\tGPIO.output(ledPins[j],GPIO.HIGH)\n\t\ttime.sleep(0.3)\n\t\tGPIO.output(ledPins[j],GPIO.LOW)\n\ndef allLedBarGraph():\n\tfor i in ledPins:\n\t\tGPIO.output(i,GPIO.HIGH)\n\t\ttime.sleep(0.3)\n\t\tGPIO.output(i,GPIO.LOW)\n\ndef setup():\n\tGPIO.setwarnings(False)\n\tGPIO.setmode(GPIO.BOARD)        # Numbers GPIOs by physical location\n\tfor i in ledPins:\n\t\tGPIO.setup(i, GPIO.OUT)   # Set all ledPins' mode is output\n\t\tGPIO.output(i, GPIO.LOW) # Set all ledPins to high(+3.3V) to off led\n\ndef loop():\n\twhile True:\n\t\toddLedBarGraph()\n\t\ttime.sleep(0.3)\n\t\tevenLedBarGraph()\n\t\ttime.sleep(0.3)\n\t\tallLedBarGraph()\n\t\ttime.sleep(0.3)\n\ndef destroy():\n\tfor pin in ledPins:\n\t\tGPIO.output(pin, GPIO.LOW)    # turn off all leds\n\tGPIO.cleanup()                     # Release resource\n\nif __name__ == '__main__':     # Program start from here\n\tsetup()\n\ttry:\n\t\tloop()\n\texcept KeyboardInterrupt:  # When 'Ctrl+C' is pressed, the program destroy() will be  executed.\n\t\tdestroy()\n\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image66.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Col 1A) -> Bottom + Rail"
        }
      ],
      "components": [
        {
          "type": "led_bar",
          "label": "10-Seg LED Bar Graph",
          "startCol": 24,
          "topRow": "F",
          "botRow": "E",
          "count": 10,
          "bcmPins": [
            17,
            18,
            27,
            22,
            23,
            24,
            25,
            2,
            3,
            8
          ]
        },
        {
          "type": "resistor",
          "value": "10x 220\u03a9",
          "bands": [
            "#e53935",
            "#e53935",
            "#212121",
            "#ffb300"
          ],
          "from": {
            "col": 24,
            "row": "A"
          },
          "to": {
            "col": 24,
            "row": "bot_plus"
          },
          "label": "220\u03a9 Anode Pull-Up Array -> + Rail"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "G"
          },
          "color": "#2196f3",
          "label": "GPIO17 -> Bar Seg 1 (Col 24G)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 25,
            "row": "G"
          },
          "color": "#4caf50",
          "label": "GPIO18 -> Bar Seg 2 (Col 25G)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "G"
          },
          "color": "#ff9800",
          "label": "GPIO27 -> Bar Seg 3 (Col 26G)",
          "bcm": 27
        },
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 27,
            "row": "G"
          },
          "color": "#9c27b0",
          "label": "GPIO22 -> Bar Seg 4 (Col 27G)",
          "bcm": 22
        },
        {
          "from": {
            "col": 8,
            "row": "J",
            "pin": 16,
            "bcm": 23
          },
          "to": {
            "col": 28,
            "row": "G"
          },
          "color": "#00bcd4",
          "label": "GPIO23 -> Bar Seg 5 (Col 28G)",
          "bcm": 23
        },
        {
          "from": {
            "col": 9,
            "row": "J",
            "pin": 18,
            "bcm": 24
          },
          "to": {
            "col": 29,
            "row": "G"
          },
          "color": "#e91e63",
          "label": "GPIO24 -> Bar Seg 6 (Col 29G)",
          "bcm": 24
        },
        {
          "from": {
            "col": 11,
            "row": "J",
            "pin": 22,
            "bcm": 25
          },
          "to": {
            "col": 30,
            "row": "G"
          },
          "color": "#8bc34a",
          "label": "GPIO25 -> Bar Seg 7 (Col 30G)",
          "bcm": 25
        },
        {
          "from": {
            "col": 2,
            "row": "A",
            "pin": 3,
            "bcm": 2
          },
          "to": {
            "col": 31,
            "row": "G"
          },
          "color": "#ffc107",
          "label": "GPIO2 -> Bar Seg 8 (Col 31G)",
          "bcm": 2
        },
        {
          "from": {
            "col": 3,
            "row": "A",
            "pin": 5,
            "bcm": 3
          },
          "to": {
            "col": 32,
            "row": "G"
          },
          "color": "#3f51b5",
          "label": "GPIO3 -> Bar Seg 9 (Col 32G)",
          "bcm": 3
        },
        {
          "from": {
            "col": 12,
            "row": "J",
            "pin": 24,
            "bcm": 8
          },
          "to": {
            "col": 33,
            "row": "G"
          },
          "color": "#009688",
          "label": "GPIO8 -> Bar Seg 10 (Col 33G)",
          "bcm": 8
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 -> Bar Seg 1 (Col 24G)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 -> Bar Seg 2 (Col 25G)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 -> Bar Seg 3 (Col 26G)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO22 -> Bar Seg 4 (Col 27G)"
      },
      {
        "kind": "wire",
        "color": "#00bcd4",
        "text": "GPIO23 -> Bar Seg 5 (Col 28G)"
      },
      {
        "kind": "wire",
        "color": "#e91e63",
        "text": "GPIO24 -> Bar Seg 6 (Col 29G)"
      },
      {
        "kind": "wire",
        "color": "#8bc34a",
        "text": "GPIO25 -> Bar Seg 7 (Col 30G)"
      },
      {
        "kind": "wire",
        "color": "#ffc107",
        "text": "GPIO2 -> Bar Seg 8 (Col 31G)"
      },
      {
        "kind": "wire",
        "color": "#3f51b5",
        "text": "GPIO3 -> Bar Seg 9 (Col 32G)"
      },
      {
        "kind": "wire",
        "color": "#009688",
        "text": "GPIO8 -> Bar Seg 10 (Col 33G)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 10-Seg LED Bar Graph"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 220\u03a9 Anode Pull-Up Array -> + Rail"
      }
    ]
  },
  {
    "id": "1.1.4",
    "title": "7-Segment Display",
    "category": "Output",
    "slug": "1.1.4_7-segment_display.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/1.1.4_7-segment_display.html",
    "description": "Drive a 1-digit 7-segment display via a 74HC595 shift register to display numbers 0 to 9.",
    "bcm_pins": [
      17,
      18,
      27
    ],
    "youtube_id": "az90qK3jmDo",
    "youtube_title": "Video 4: Understanding GPIO & 74HC595",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_7_segment.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/schematic_7_segment.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image73.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image74.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_7_segment.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image70.jpeg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/common_cathode.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/74hc595_sche.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/schematic_7_segment.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image73.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image74.jpeg"
    ],
    "python_file": "1.1.4_7-Segment.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\n\n# Set up pins\nSDI   = 17\nRCLK  = 18\nSRCLK = 27\n\n# Define a segment code from 0 to F in Hexadecimal\n# Common cathode\nsegCode = [0x3f,0x06,0x5b,0x4f,0x66,0x6d,0x7d,0x07,0x7f,0x6f,0x77,0x7c,0x39,0x5e,0x79,0x71]\n\ndef setup():\n\tGPIO.setmode(GPIO.BCM)\n\tGPIO.setup(SDI, GPIO.OUT, initial=GPIO.LOW)\n\tGPIO.setup(RCLK, GPIO.OUT, initial=GPIO.LOW)\n\tGPIO.setup(SRCLK, GPIO.OUT, initial=GPIO.LOW)\n\n# Shift the data to 74HC595\ndef hc595_shift(dat):\n\tfor bit in range(0, 8):\t\n\t\tGPIO.output(SDI, 0x80 & (dat << bit))\n\t\tGPIO.output(SRCLK, GPIO.HIGH)\n\t\ttime.sleep(0.001)\n\t\tGPIO.output(SRCLK, GPIO.LOW)\n\tGPIO.output(RCLK, GPIO.HIGH)\n\ttime.sleep(0.001)\n\tGPIO.output(RCLK, GPIO.LOW)\n\ndef main():\n\twhile True:\n\t\t# Shift the code one by one from segCode list\n\t\tfor code in segCode:\n\t\t\thc595_shift(code)\n\t\t\tprint (\"segCode[%s]: 0x%02X\"%(segCode.index(code), code)) # %02X means double digit HEX to print\n\t\t\ttime.sleep(0.5)\n\ndef destroy():\n\tGPIO.cleanup()\n\nif __name__ == '__main__':\n\tsetup()\n\ttry:\n\t\tmain()\n\texcept KeyboardInterrupt:\n\t\tdestroy()\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image73.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "J",
            "pin": 2
          },
          "to": {
            "col": 1,
            "row": "top_plus"
          },
          "color": "#e53935",
          "label": "5V0 (Pin 2, Col 1J) -> Top + Rail"
        },
        {
          "from": {
            "col": 3,
            "row": "J",
            "pin": 6
          },
          "to": {
            "col": 3,
            "row": "top_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 6, Col 3J) -> Top - Rail"
        }
      ],
      "components": [
        {
          "type": "ic",
          "label": "74HC595",
          "startCol": 23,
          "cols": 8,
          "topRow": "F",
          "botRow": "E",
          "pinLabels": [
            "Q1",
            "Q2",
            "Q3",
            "Q4",
            "Q5",
            "Q6",
            "Q7",
            "GND",
            "Q7'",
            "MR",
            "SHCP",
            "STCP",
            "OE",
            "DS",
            "Q0",
            "VCC"
          ]
        },
        {
          "type": "seg7",
          "label": "7-Seg Display",
          "startCol": 32,
          "cols": 3,
          "topRow": "I",
          "botRow": "B"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "J"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Col 6A) -> 74HC595 DS / SDI (Pin 14)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 26,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Col 6J) -> 74HC595 STCP / RCLK (Pin 12)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 27,
            "row": "J"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Col 7A) -> 74HC595 SHCP / SRCLK (Pin 11)",
          "bcm": 27
        },
        {
          "from": {
            "col": 23,
            "row": "J"
          },
          "to": {
            "col": 23,
            "row": "top_plus"
          },
          "color": "#e53935",
          "label": "74HC595 VCC (Pin 16) -> + Rail"
        },
        {
          "from": {
            "col": 30,
            "row": "A"
          },
          "to": {
            "col": 30,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "74HC595 GND (Pin 8) -> - Rail"
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "5V0 (Pin 2, Col 1J) -> Top + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 6, Col 3J) -> Top - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Col 6A) -> 74HC595 DS / SDI (Pin 14)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Col 6J) -> 74HC595 STCP / RCLK (Pin 12)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Col 7A) -> 74HC595 SHCP / SRCLK (Pin 11)"
      },
      {
        "kind": "wire",
        "color": "#e53935",
        "text": "74HC595 VCC (Pin 16) -> + Rail"
      },
      {
        "kind": "wire",
        "color": "#212121",
        "text": "74HC595 GND (Pin 8) -> - Rail"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 74HC595"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 7-Seg Display"
      }
    ]
  },
  {
    "id": "1.1.5",
    "title": "4-Digit 7-Segment Display",
    "category": "Output",
    "slug": "1.1.5_4-Digit_7-segment_display.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/1.1.5_4-Digit_7-segment_display.html",
    "description": "Display 4-digit numbers and countdown timers using multiplexing and a 74HC595 shift register.",
    "bcm_pins": [
      24,
      23,
      18,
      10,
      22,
      27,
      17
    ],
    "youtube_id": "az90qK3jmDo",
    "youtube_title": "Video 4: 74HC595 Multiplexing",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_4_digit.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/schmatic_4_digit.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image80.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image81.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_4_digit.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/4-digit-sche.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image78.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/common_anode.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/schmatic_4_digit.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image80.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image81.jpeg"
    ],
    "python_file": "1.1.5_4-Digit.py",
    "python_code": "#!/usr/bin/env python3\nimport RPi.GPIO as GPIO\nimport time\nimport threading\n\nSDI = 24\nRCLK = 23\nSRCLK = 18\n\nplacePin = (10, 22, 27, 17)\nnumber = (0xc0, 0xf9, 0xa4, 0xb0, 0x99, 0x92, 0x82, 0xf8, 0x80, 0x90)\n\ncounter = 0\ntimer1 = 0\n\ndef clearDisplay():\n    for i in range(8):\n        GPIO.output(SDI, 1)\n        GPIO.output(SRCLK, GPIO.HIGH)\n        GPIO.output(SRCLK, GPIO.LOW)\n    GPIO.output(RCLK, GPIO.HIGH)\n    GPIO.output(RCLK, GPIO.LOW)    \n\ndef hc595_shift(data): \n    for i in range(8):\n        GPIO.output(SDI, 0x80 & (data << i))\n        GPIO.output(SRCLK, GPIO.HIGH)\n        GPIO.output(SRCLK, GPIO.LOW)\n    GPIO.output(RCLK, GPIO.HIGH)\n    GPIO.output(RCLK, GPIO.LOW)\n\ndef pickDigit(digit):\n    for i in placePin:\n        GPIO.output(i,GPIO.LOW)\n    GPIO.output(placePin[digit], GPIO.HIGH)\n\n\ndef timer():  \n    global counter\n    global timer1\n    timer1 = threading.Timer(1.0, timer) \n    timer1.start()  \n    counter += 1\n    print(\"%d\" % counter)\n\n\ndef loop():\n    global counter                    \n    while True:\n        clearDisplay() \n        pickDigit(0)  \n        hc595_shift(number[counter % 10])\n        \n        clearDisplay()\n        pickDigit(1)\n        hc595_shift(number[counter % 100//10])\n\n        clearDisplay()\n        pickDigit(2)\n        hc595_shift(number[counter % 1000//100])\n\n        clearDisplay()\n        pickDigit(3)\n        hc595_shift(number[counter % 10000//1000])\n\n\ndef setup():\n    GPIO.setmode(GPIO.BCM)\n    GPIO.setup(SDI, GPIO.OUT)\n    GPIO.setup(RCLK, GPIO.OUT)\n    GPIO.setup(SRCLK, GPIO.OUT)\n    for i in placePin:\n        GPIO.setup(i, GPIO.OUT)\n    global timer1\n    timer1 = threading.Timer(1.0, timer)  \n    timer1.start()       \n\ndef destroy():   # When \"Ctrl+C\" is pressed, the function is executed.\n    global timer1\n    GPIO.cleanup()\n    timer1.cancel()  # cancel the timer\n\nif __name__ == '__main__':  # Program starting from here\n    setup()\n    try:\n        loop()\n    except KeyboardInterrupt:\n        destroy()\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image80.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "ic",
          "label": "74HC595",
          "startCol": 24,
          "cols": 7,
          "topRow": "F",
          "botRow": "E"
        },
        {
          "type": "seg7",
          "label": "7-Seg",
          "startCol": 32,
          "cols": 3,
          "topRow": "I",
          "botRow": "B"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 9,
            "row": "J",
            "pin": 18,
            "bcm": 24
          },
          "to": {
            "col": 24,
            "row": "J"
          },
          "color": "#2196f3",
          "label": "GPIO24 (Pin 18, Col 9J) -> 4-Digit 7-Segment Display Terminal (Col 24J)",
          "bcm": 24
        },
        {
          "from": {
            "col": 8,
            "row": "J",
            "pin": 16,
            "bcm": 23
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO23 (Pin 16, Col 8J) -> 4-Digit 7-Segment Display Terminal (Col 25J)",
          "bcm": 23
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 26,
            "row": "J"
          },
          "color": "#ff9800",
          "label": "GPIO18 (Pin 12, Col 6J) -> 4-Digit 7-Segment Display Terminal (Col 26J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 10,
            "row": "A",
            "pin": 19,
            "bcm": 10
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#9c27b0",
          "label": "GPIO10 (Pin 19, Col 10A) -> 4-Digit 7-Segment Display Terminal (Col 27A)",
          "bcm": 10
        },
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 28,
            "row": "A"
          },
          "color": "#00bcd4",
          "label": "GPIO22 (Pin 15, Col 8A) -> 4-Digit 7-Segment Display Terminal (Col 28A)",
          "bcm": 22
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 29,
            "row": "A"
          },
          "color": "#e91e63",
          "label": "GPIO27 (Pin 13, Col 7A) -> 4-Digit 7-Segment Display Terminal (Col 29A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 30,
            "row": "A"
          },
          "color": "#8bc34a",
          "label": "GPIO17 (Pin 11, Col 6A) -> 4-Digit 7-Segment Display Terminal (Col 30A)",
          "bcm": 17
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO24 (Pin 18, Col 9J) -> 4-Digit 7-Segment Display Terminal (Col 24J)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO23 (Pin 16, Col 8J) -> 4-Digit 7-Segment Display Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO18 (Pin 12, Col 6J) -> 4-Digit 7-Segment Display Terminal (Col 26J)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO10 (Pin 19, Col 10A) -> 4-Digit 7-Segment Display Terminal (Col 27A)"
      },
      {
        "kind": "wire",
        "color": "#00bcd4",
        "text": "GPIO22 (Pin 15, Col 8A) -> 4-Digit 7-Segment Display Terminal (Col 28A)"
      },
      {
        "kind": "wire",
        "color": "#e91e63",
        "text": "GPIO27 (Pin 13, Col 7A) -> 4-Digit 7-Segment Display Terminal (Col 29A)"
      },
      {
        "kind": "wire",
        "color": "#8bc34a",
        "text": "GPIO17 (Pin 11, Col 6A) -> 4-Digit 7-Segment Display Terminal (Col 30A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 74HC595"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 7-Seg"
      }
    ]
  },
  {
    "id": "1.1.6",
    "title": "8x8 LED Dot Matrix",
    "category": "Output",
    "slug": "1.1.6_led_dot_matrix.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/1.1.6_led_dot_matrix.html",
    "description": "Display custom symbols, hearts, smiley faces, and rolling animations on an 8x8 LED matrix.",
    "bcm_pins": [
      17,
      18,
      27
    ],
    "youtube_id": "yJdN6LmGqvc",
    "youtube_title": "Video 9: Matrix Multiplexing",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_dot.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/schematic_dot.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image87.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image91.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_dot.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image84.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image85.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/schematic_dot.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image87.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image88.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image89.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image90.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/anode_table.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/anode_table.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image91.jpeg"
    ],
    "python_file": "1.1.6_LedMatrix.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\n\nSDI   = 17\nRCLK  = 18\nSRCLK = 27\n\n# we use BX matrix, ROW for anode, and COL for cathode\n# ROW  ++++\ncode_H = [0x01,0xff,0x80,0xff,0x01,0x02,0x04,0x08,0x10,0x20,0x40,0x80,0xff,0xff,0xff,0xff,0xff,0xff,0xff,0xff]\n# COL  ----\ncode_L = [0x00,0x7f,0x00,0xfe,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0xfe,0xfd,0xfb,0xf7,0xef,0xdf,0xbf,0x7f]\n\ndef setup():\n    GPIO.setmode(GPIO.BCM)    # Number GPIOs by its BCM location\n    GPIO.setup(SDI, GPIO.OUT)\n    GPIO.setup(RCLK, GPIO.OUT)\n    GPIO.setup(SRCLK, GPIO.OUT)\n    GPIO.output(SDI, GPIO.LOW)\n    GPIO.output(RCLK, GPIO.LOW)\n    GPIO.output(SRCLK, GPIO.LOW)\n\n# Shift the data to 74HC595\ndef hc595_shift(dat):\n    for bit in range(0, 8): \n        GPIO.output(SDI, 0x80 & (dat << bit))\n        GPIO.output(SRCLK, GPIO.HIGH)\n        time.sleep(0.001)\n        GPIO.output(SRCLK, GPIO.LOW)\n    GPIO.output(RCLK, GPIO.HIGH)\n    time.sleep(0.001)\n    GPIO.output(RCLK, GPIO.LOW)\n\ndef main():\n    while True:\n        for i in range(0, len(code_H)):\n            hc595_shift(code_L[i])\n            hc595_shift(code_H[i])\n            time.sleep(0.1)\n\n        for i in range(len(code_H)-1, -1, -1):\n            hc595_shift(code_L[i])\n            hc595_shift(code_H[i])\n            time.sleep(0.1)\n\ndef destroy():\n    GPIO.cleanup()\n\nif __name__ == '__main__':\n    setup()\n    try:\n        main()\n    except KeyboardInterrupt:\n        destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image87.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image88.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image89.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image90.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "ic",
          "label": "2x 74HC595",
          "startCol": 24,
          "cols": 8,
          "topRow": "F",
          "botRow": "E"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> 8x8 LED Dot Matrix Terminal (Col 24A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Pin 12, Col 6J) -> 8x8 LED Dot Matrix Terminal (Col 25J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Pin 13, Col 7A) -> 8x8 LED Dot Matrix Terminal (Col 26A)",
          "bcm": 27
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> 8x8 LED Dot Matrix Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Pin 12, Col 6J) -> 8x8 LED Dot Matrix Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Pin 13, Col 7A) -> 8x8 LED Dot Matrix Terminal (Col 26A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 2x 74HC595"
      }
    ]
  },
  {
    "id": "1.1.7",
    "title": "I2C LCD1602 Display",
    "category": "Output",
    "slug": "1.1.7_i2c_lcd1602.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/1.1.7_i2c_lcd1602.html",
    "description": "Display alphanumeric characters and dynamic text messages on a 16x2 LCD via I2C interface (address 0x27).",
    "bcm_pins": [
      2,
      3
    ],
    "youtube_id": "AC8zuiIJOtY",
    "youtube_title": "Video 26: LCD1602 Display with I2C",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_i2c_lcd.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/schematic_i2c_lcd.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image96.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image97.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_i2c_lcd.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/i2c_lcd1602.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/i2c_address.jpg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/back_lcd1602.jpg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/schematic_i2c_lcd.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image96.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image97.jpeg"
    ],
    "python_file": "1.1.7_Lcd1602.py",
    "python_code": "#!/usr/bin/env python3\nimport LCD1602\nimport time\n\ndef setup():\n\tLCD1602.init(0x27, 1)\t# init(slave address, background light)\n\tLCD1602.write(0, 0, 'Greetings!!')\n\tLCD1602.write(1, 1, 'from SunFounder')\n\ttime.sleep(2)\n\ndef destroy():\n\tLCD1602.clear()\n\nif __name__ == \"__main__\":\n\ttry:\n\t\tsetup()\n\texcept KeyboardInterrupt:\n\t\tdestroy()\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image96.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [],
      "components": [
        {
          "type": "module",
          "label": "I2C LCD1602 (0x27)",
          "startCol": 27,
          "row": "J",
          "widthCols": 8,
          "pins": [
            {
              "col": 27,
              "row": "J",
              "name": "GND"
            },
            {
              "col": 28,
              "row": "J",
              "name": "VCC"
            },
            {
              "col": 29,
              "row": "J",
              "name": "SDA"
            },
            {
              "col": 30,
              "row": "J",
              "name": "SCL"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 3,
            "row": "J",
            "pin": 6
          },
          "to": {
            "col": 27,
            "row": "J"
          },
          "color": "#212121",
          "label": "GND (Pin 6, Col 3J) -> LCD1602 GND"
        },
        {
          "from": {
            "col": 1,
            "row": "J",
            "pin": 2
          },
          "to": {
            "col": 28,
            "row": "J"
          },
          "color": "#e53935",
          "label": "5V0 (Pin 2, Col 1J) -> LCD1602 VCC"
        },
        {
          "from": {
            "col": 2,
            "row": "A",
            "pin": 3,
            "bcm": 2
          },
          "to": {
            "col": 29,
            "row": "J"
          },
          "color": "#ff9800",
          "label": "SDA1 / GPIO2 (Pin 3, Col 2A) -> LCD1602 SDA",
          "bcm": 2
        },
        {
          "from": {
            "col": 3,
            "row": "A",
            "pin": 5,
            "bcm": 3
          },
          "to": {
            "col": 30,
            "row": "J"
          },
          "color": "#ffc107",
          "label": "SCL1 / GPIO3 (Pin 5, Col 3A) -> LCD1602 SCL",
          "bcm": 3
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "wire",
        "color": "#212121",
        "text": "GND (Pin 6, Col 3J) -> LCD1602 GND"
      },
      {
        "kind": "wire",
        "color": "#e53935",
        "text": "5V0 (Pin 2, Col 1J) -> LCD1602 VCC"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "SDA1 / GPIO2 (Pin 3, Col 2A) -> LCD1602 SDA"
      },
      {
        "kind": "wire",
        "color": "#ffc107",
        "text": "SCL1 / GPIO3 (Pin 5, Col 3A) -> LCD1602 SCL"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place I2C LCD1602 (0x27)"
      }
    ]
  },
  {
    "id": "1.2.1",
    "title": "Active Buzzer",
    "category": "Output",
    "slug": "1.2.1_active_buzzer.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/1.2.1_active_buzzer.html",
    "description": "Trigger an active buzzer with built-in oscillator using an NPN S8050 transistor.",
    "bcm_pins": [
      17
    ],
    "youtube_id": "4CquOUVMvJc",
    "youtube_title": "Video 28: Active & Passive Buzzers",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_1.2.1.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image332.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image104.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image105.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_1.2.1.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image101.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image102.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image332.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image104.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image105.jpeg"
    ],
    "python_file": "1.2.1_ActiveBuzzer.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\n\n# Set #17 as buzzer pin\nBeepPin = 17\n\ndef setup():\n\t# Set the GPIO modes to BCM Numbering\n\tGPIO.setmode(GPIO.BCM)\n\t# Set LedPin's mode to output, \n\t# and initial level to High(3.3v)\n\tGPIO.setup(BeepPin, GPIO.OUT, initial=GPIO.HIGH)\n\ndef main():\n\twhile True:\n\t\t# Buzzer on (Beep)\n\t\tprint ('Buzzer On')\n\t\tGPIO.output(BeepPin, GPIO.LOW)\n\t\ttime.sleep(0.1)\n\t\t# Buzzer off\n\t\tprint ('Buzzer Off')\n\t\tGPIO.output(BeepPin, GPIO.HIGH)\n\t\ttime.sleep(0.1)\n\ndef destroy():\n\t# Turn off buzzer\n\tGPIO.output(BeepPin, GPIO.HIGH)\n\t# Release resource\n\tGPIO.cleanup()    \n\n# If run this script directly, do:\nif __name__ == '__main__':\n\tsetup()\n\ttry:\n\t\tmain()\n\t# When 'Ctrl+C' is pressed, the program \n\t# destroy() will be  executed.\n\texcept KeyboardInterrupt:\n\t\tdestroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image104.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "transistor",
          "label": "S8050 NPN",
          "pins": [
            {
              "col": 25,
              "row": "E",
              "name": "E"
            },
            {
              "col": 26,
              "row": "E",
              "name": "B"
            },
            {
              "col": 27,
              "row": "E",
              "name": "C"
            }
          ]
        },
        {
          "type": "resistor",
          "value": "1k\u03a9",
          "bands": [
            "#795548",
            "#212121",
            "#e53935",
            "#ffb300"
          ],
          "from": {
            "col": 26,
            "row": "B"
          },
          "to": {
            "col": 24,
            "row": "B"
          },
          "label": "1k\u03a9 Base Resistor (24B -> 26B)"
        },
        {
          "type": "buzzer",
          "label": "Active Buzzer",
          "bcm": 17,
          "pins": [
            {
              "col": 27,
              "row": "G",
              "name": "-"
            },
            {
              "col": 29,
              "row": "G",
              "name": "+"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Col 6A) -> 1k\u03a9 Resistor -> S8050 Base",
          "bcm": 17
        },
        {
          "from": {
            "col": 25,
            "row": "A"
          },
          "to": {
            "col": 25,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "S8050 Emitter (25A) -> - Rail"
        },
        {
          "from": {
            "col": 29,
            "row": "J"
          },
          "to": {
            "col": 29,
            "row": "top_plus"
          },
          "color": "#e53935",
          "label": "Buzzer + (29J) -> + Rail"
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Col 6A) -> 1k\u03a9 Resistor -> S8050 Base"
      },
      {
        "kind": "wire",
        "color": "#212121",
        "text": "S8050 Emitter (25A) -> - Rail"
      },
      {
        "kind": "wire",
        "color": "#e53935",
        "text": "Buzzer + (29J) -> + Rail"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place S8050 NPN"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 1k\u03a9 Base Resistor (24B -> 26B)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Active Buzzer"
      }
    ]
  },
  {
    "id": "1.2.2",
    "title": "Passive Buzzer",
    "category": "Output",
    "slug": "1.2.2_passive_buzzer.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/1.2.2_passive_buzzer.html",
    "description": "Generate distinct musical notes, frequencies, and complete song melodies using PWM frequency variation.",
    "bcm_pins": [
      17
    ],
    "youtube_id": "4CquOUVMvJc",
    "youtube_title": "Video 28: Playing Melodies with PWM",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_1.2.2.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image333.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image106.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image107.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_1.2.2.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image333.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image106.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image107.jpeg"
    ],
    "python_file": "1.2.2_PassiveBuzzer.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\n\nBuzzer = 11\n\nCL = [0, 131, 147, 165, 175, 196, 211, 248]\t\t# Frequency of Bass tone in C major\n\nCM = [0, 262, 294, 330, 350, 393, 441, 495]\t\t# Frequency of Midrange tone in C major\n\nCH = [0, 525, 589, 661, 700, 786, 882, 990]\t\t# Frequency of Treble tone in C major\n\nsong_1 = [\tCM[3], CM[5], CM[6], CM[3], CM[2], CM[3], CM[5], CM[6], # Notes of song1\n\t\t\tCH[1], CM[6], CM[5], CM[1], CM[3], CM[2], CM[2], CM[3], \n\t\t\tCM[5], CM[2], CM[3], CM[3], CL[6], CL[6], CL[6], CM[1],\n\t\t\tCM[2], CM[3], CM[2], CL[7], CL[6], CM[1], CL[5]\t]\n\nbeat_1 = [\t1, 1, 3, 1, 1, 3, 1, 1, \t\t\t# Beats of song 1, 1 means 1/8 beat\n\t\t\t1, 1, 1, 1, 1, 1, 3, 1, \n\t\t\t1, 3, 1, 1, 1, 1, 1, 1, \n\t\t\t1, 2, 1, 1, 1, 1, 1, 1, \n\t\t\t1, 1, 3\t]\n\nsong_2 = [\tCM[1], CM[1], CM[1], CL[5], CM[3], CM[3], CM[3], CM[1], # Notes of song2\n\t\t\tCM[1], CM[3], CM[5], CM[5], CM[4], CM[3], CM[2], CM[2], \n\t\t\tCM[3], CM[4], CM[4], CM[3], CM[2], CM[3], CM[1], CM[1], \n\t\t\tCM[3], CM[2], CL[5], CL[7], CM[2], CM[1]\t]\n\nbeat_2 = [\t1, 1, 2, 2, 1, 1, 2, 2, \t\t\t# Beats of song 2, 1 means 1/8 beat\n\t\t\t1, 1, 2, 2, 1, 1, 3, 1, \n\t\t\t1, 2, 2, 1, 1, 2, 2, 1, \n\t\t\t1, 2, 2, 1, 1, 3 ]\n\ndef setup():\n\n\tGPIO.setmode(GPIO.BOARD)\t\t# Numbers GPIOs by physical location\n\tGPIO.setup(Buzzer, GPIO.OUT)\t# Set pins' mode is output\n\tglobal Buzz\t\t\t\t\t\t# Assign a global variable to replace GPIO.PWM \n\tBuzz = GPIO.PWM(Buzzer, 440)\t# 440 is initial frequency.\n\tBuzz.start(50)\t\t\t\t\t# Start Buzzer pin with 50% duty cycle\n\ndef loop():\n\twhile True:\n\t\tprint ('\\n    Playing song 1...')\n\t\tfor i in range(1, len(song_1)):\t\t# Play song 1\n\t\t\tBuzz.ChangeFrequency(song_1[i])\t# Change the frequency along the song note\n\t\t\ttime.sleep(beat_1[i] * 0.5)\t\t# delay a note for beat * 0.5s\n\t\ttime.sleep(1)\t\t\t\t\t\t# Wait a second for next song.\n\n\t\tprint ('\\n\\n    Playing song 2...')\n\t\tfor i in range(1, len(song_2)):     # Play song 1\n\t\t\tBuzz.ChangeFrequency(song_2[i]) # Change the frequency along the song note\n\t\t\ttime.sleep(beat_2[i] * 0.5)     # delay a note for beat * 0.5s\n\ndef destory():\n\tBuzz.stop()                 # Stop the buzzer\n\tGPIO.output(Buzzer, 1)      # Set Buzzer pin to High\n\tGPIO.cleanup()\t\t\t\t# Release resource\n\nif __name__ == '__main__':\t\t# Program start from here\n\tsetup()\n\ttry:\n\t\tloop()\n\texcept KeyboardInterrupt:  \t# When 'Ctrl+C' is pressed, the program destroy() will be executed.\n\t\tdestory()\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image106.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "buzzer",
          "label": "Passive Buzzer",
          "bcm": 17,
          "pins": [
            {
              "col": 24,
              "row": "E",
              "name": "G17"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> Passive Buzzer Terminal (Col 24A)",
          "bcm": 17
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> Passive Buzzer Terminal (Col 24A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Passive Buzzer"
      }
    ]
  },
  {
    "id": "1.3.1",
    "title": "DC Motor & L293D",
    "category": "Output",
    "slug": "1.3.1_motor.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/1.3.1_motor.html",
    "description": "Drive a DC motor with variable speed and forward/reverse rotation direction using an L293D H-bridge.",
    "bcm_pins": [
      17,
      18,
      27
    ],
    "youtube_id": "yJdN6LmGqvc",
    "youtube_title": "Video 9: Motor Speed & Direction",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_1.3.1.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image336.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/1.3.1.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image119.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_1.3.1.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image111.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image334.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image114.jpeg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image335.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image115.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image336.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/1.3.1.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image118.jpeg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image119.jpeg"
    ],
    "python_file": "1.3.1_Motor.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\n\n# Set up pins\nMotorPin1   = 17\nMotorPin2   = 27\nMotorEnable = 22\n\ndef setup():\n\t# Set the GPIO modes to BCM Numbering\n\tGPIO.setmode(GPIO.BCM)\n\t# Set pins to output\n\tGPIO.setup(MotorPin1, GPIO.OUT)\n\tGPIO.setup(MotorPin2, GPIO.OUT)\n\tGPIO.setup(MotorEnable, GPIO.OUT, initial=GPIO.LOW)\n\n# Define a motor function to spin the motor\n# direction should be \n# 1(clockwise), 0(stop), -1(counterclockwise)\ndef motor(direction):\n\t# Clockwise\n\tif direction == 1:\n\t\t# Set direction\n\t\tGPIO.output(MotorPin1, GPIO.HIGH)\n\t\tGPIO.output(MotorPin2, GPIO.LOW)\n\t\t# Enable the motor\n\t\tGPIO.output(MotorEnable, GPIO.HIGH)\n\t\tprint (\"Clockwise\")\n\t# Counterclockwise\n\tif direction == -1:\n\t\t# Set direction\n\t\tGPIO.output(MotorPin1, GPIO.LOW)\n\t\tGPIO.output(MotorPin2, GPIO.HIGH)\n\t\t# Enable the motor\n\t\tGPIO.output(MotorEnable, GPIO.HIGH)\n\t\tprint (\"Counterclockwise\")\n\t# Stop\n\tif direction == 0:\n\t\t# Disable the motor\n\t\tGPIO.output(MotorEnable, GPIO.LOW)\n\t\tprint (\"Stop\")\n\ndef main():\n\n\t# Define a dictionary to make the script more readable\n\t# CW as clockwise, CCW as counterclockwise, STOP as stop\n\tdirections = {'CW': 1, 'CCW': -1, 'STOP': 0}\n\twhile True:\n\t\t# Clockwise\n\t\tmotor(directions['CW'])\n\t\ttime.sleep(5)\n\t\t# Stop\n\t\tmotor(directions['STOP'])\n\t\ttime.sleep(5)\n\t\t# Anticlockwise\n\t\tmotor(directions['CCW'])\n\t\ttime.sleep(5)\n\t\t# Stop\n\t\tmotor(directions['STOP'])\n\t\ttime.sleep(5)\n\ndef destroy():\n\t# Stop the motor\n\tGPIO.output(MotorEnable, GPIO.LOW)\n\t# Release resource\n\tGPIO.cleanup()    \n\n# If run this script directly, do:\nif __name__ == '__main__':\n\tsetup()\n\ttry:\n\t\tmain()\n\t# When 'Ctrl+C' is pressed, the program \n\t# destroy() will be executed.\n\texcept KeyboardInterrupt:\n\t\tdestroy()\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/1.3.1.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image118.jpeg"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "J",
            "pin": 2
          },
          "to": {
            "col": 1,
            "row": "top_plus"
          },
          "color": "#e53935",
          "label": "5V0 (Col 1J) -> Top + Rail"
        },
        {
          "from": {
            "col": 3,
            "row": "J",
            "pin": 6
          },
          "to": {
            "col": 3,
            "row": "top_minus"
          },
          "color": "#212121",
          "label": "GND (Col 3J) -> Top - Rail"
        }
      ],
      "components": [
        {
          "type": "ic",
          "label": "L293D",
          "startCol": 24,
          "cols": 8,
          "topRow": "F",
          "botRow": "E",
          "pinLabels": [
            "1,2EN",
            "1A",
            "1Y",
            "GND",
            "GND",
            "2Y",
            "2A",
            "VCC2",
            "VCC1",
            "4A",
            "4Y",
            "GND",
            "GND",
            "3Y",
            "3A",
            "3,4EN"
          ]
        },
        {
          "type": "module",
          "label": "DC Motor",
          "startCol": 26,
          "row": "I",
          "widthCols": 4,
          "pins": [
            {
              "col": 26,
              "row": "I",
              "name": "M+"
            },
            {
              "col": 29,
              "row": "I",
              "name": "M-"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#9c27b0",
          "label": "GPIO18 (Col 6J) -> L293D Enable 1,2EN (Pin 1)",
          "bcm": 18
        },
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 25,
            "row": "A"
          },
          "color": "#4caf50",
          "label": "GPIO17 (Col 6A) -> L293D Input 1A (Pin 2)",
          "bcm": 17
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 30,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO27 (Col 7A) -> L293D Input 2A (Pin 7)",
          "bcm": 27
        },
        {
          "from": {
            "col": 24,
            "row": "J"
          },
          "to": {
            "col": 24,
            "row": "top_plus"
          },
          "color": "#e53935",
          "label": "L293D VCC1 -> 5V Rail"
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "5V0 (Col 1J) -> Top + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Col 3J) -> Top - Rail"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO18 (Col 6J) -> L293D Enable 1,2EN (Pin 1)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO17 (Col 6A) -> L293D Input 1A (Pin 2)"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO27 (Col 7A) -> L293D Input 2A (Pin 7)"
      },
      {
        "kind": "wire",
        "color": "#e53935",
        "text": "L293D VCC1 -> 5V Rail"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place L293D"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place DC Motor"
      }
    ]
  },
  {
    "id": "1.3.2",
    "title": "Servo Motor SG90",
    "category": "Output",
    "slug": "1.3.2_servo.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/1.3.2_servo.html",
    "description": "Precisely rotate an SG90 micro servo from 0 to 180 degrees using a 50Hz PWM signal.",
    "bcm_pins": [
      18
    ],
    "youtube_id": "i7hMx6YLR0Q",
    "youtube_title": "Video 19: Servo Control with Raspberry Pi",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_1.3.2.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image337.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image125.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image126.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_1.3.2.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image121.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image122.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image123.jpeg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image337.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image125.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image126.jpeg"
    ],
    "python_file": "1.3.2_Servo.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\n\nSERVO_MIN_PULSE = 500\nSERVO_MAX_PULSE = 2500\n\nServoPin = 18\n\ndef map(value, inMin, inMax, outMin, outMax):\n    return (outMax - outMin) * (value - inMin) / (inMax - inMin) + outMin\n\ndef setup():\n    global p\n    GPIO.setmode(GPIO.BCM)       # Numbers GPIOs by BCM\n    GPIO.setup(ServoPin, GPIO.OUT)   # Set ServoPin's mode is output\n    GPIO.output(ServoPin, GPIO.LOW)  # Set ServoPin to low\n    p = GPIO.PWM(ServoPin, 50)     # set Frequecy to 50Hz\n    p.start(0)                     # Duty Cycle = 0\n    \ndef setAngle(angle):      # make the servo rotate to specific angle (0-180 degrees) \n    angle = max(0, min(180, angle))\n    pulse_width = map(angle, 0, 180, SERVO_MIN_PULSE, SERVO_MAX_PULSE)\n    pwm = map(pulse_width, 0, 20000, 0, 100)\n    p.ChangeDutyCycle(pwm)#map the angle to duty cycle and output it\n    \ndef loop():\n    while True:\n        for i in range(0, 181, 5):   #make servo rotate from 0 to 180 deg\n            setAngle(i)     # Write to servo\n            time.sleep(0.002)\n        time.sleep(1)\n        for i in range(180, -1, -5): #make servo rotate from 180 to 0 deg\n            setAngle(i)\n            time.sleep(0.001)\n        time.sleep(1)\n\ndef destroy():\n    p.stop()\n    GPIO.cleanup()\n\nif __name__ == '__main__':     #Program start from here\n    setup()\n    try:\n        loop()\n    except KeyboardInterrupt:  # When 'Ctrl+C' is pressed, the program destroy() will be executed.\n        destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image125.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "J",
            "pin": 2
          },
          "to": {
            "col": 1,
            "row": "top_plus"
          },
          "color": "#e53935",
          "label": "5V0 (Col 1J) -> Top + Rail"
        },
        {
          "from": {
            "col": 3,
            "row": "J",
            "pin": 6
          },
          "to": {
            "col": 3,
            "row": "top_minus"
          },
          "color": "#212121",
          "label": "GND (Col 3J) -> Top - Rail"
        }
      ],
      "components": [
        {
          "type": "module",
          "label": "SG90 Servo",
          "startCol": 26,
          "row": "J",
          "widthCols": 4,
          "pins": [
            {
              "col": 26,
              "row": "J",
              "name": "PWM"
            },
            {
              "col": 27,
              "row": "J",
              "name": "VCC"
            },
            {
              "col": 28,
              "row": "J",
              "name": "GND"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 26,
            "row": "I"
          },
          "color": "#ff9800",
          "label": "GPIO18 (Pin 12, Col 6J) -> Servo Orange Signal (Col 26I)",
          "bcm": 18
        },
        {
          "from": {
            "col": 27,
            "row": "I"
          },
          "to": {
            "col": 27,
            "row": "top_plus"
          },
          "color": "#e53935",
          "label": "Servo Red VCC (Col 27I) -> 5V + Rail"
        },
        {
          "from": {
            "col": 28,
            "row": "I"
          },
          "to": {
            "col": 28,
            "row": "top_minus"
          },
          "color": "#795548",
          "label": "Servo Brown GND (Col 28I) -> - Rail"
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "5V0 (Col 1J) -> Top + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Col 3J) -> Top - Rail"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO18 (Pin 12, Col 6J) -> Servo Orange Signal (Col 26I)"
      },
      {
        "kind": "wire",
        "color": "#e53935",
        "text": "Servo Red VCC (Col 27I) -> 5V + Rail"
      },
      {
        "kind": "wire",
        "color": "#795548",
        "text": "Servo Brown GND (Col 28I) -> - Rail"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place SG90 Servo"
      }
    ]
  },
  {
    "id": "1.3.3",
    "title": "Stepper Motor 28BYJ-48",
    "category": "Output",
    "slug": "1.3.3_stepper_motor.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/1.3.3_stepper_motor.html",
    "description": "Control a 4-phase 5-wire 28BYJ-48 stepper motor step-by-step through a ULN2003 Darlington array.",
    "bcm_pins": [
      18,
      23,
      24,
      25
    ],
    "youtube_id": "i7hMx6YLR0Q",
    "youtube_title": "Stepper Motor ULN2003 Driver",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_1.3.3.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image339.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image134.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image135.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_1.3.3.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image129.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image130.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image338.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image132.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image339.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image134.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image340.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image341.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image342.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image343.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image135.jpeg"
    ],
    "python_file": "1.3.3_StepperMotor.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nfrom time import sleep\n\nmotorPin = (18,23,24,25) \nrolePerMinute =15\nstepsPerRevolution = 2048\nstepSpeed = (60/rolePerMinute)/stepsPerRevolution\n\ndef setup():\n    GPIO.setwarnings(False)\n    GPIO.setmode(GPIO.BCM)\n    for i in motorPin:\n        GPIO.setup(i, GPIO.OUT)\n\ndef rotary(direction):\n    if(direction == 'c'):   \n        for j in range(4):\n            for i in range(4):\n                GPIO.output(motorPin[i],0x99>>j & (0x08>>i))\n            sleep(stepSpeed)\n\n    elif(direction == 'a'):\n        for j in range(4):\n            for i in range(4):\n                GPIO.output(motorPin[i],0x99<<j & (0x80>>i))\n            sleep(stepSpeed)\n\ndef loop():\n    while True:\n        direction = input('select motor direction a=anticlockwise, c=clockwise: ')\n        if(direction == 'c'):\n            print('motor running clockwise\\n')\n            break\n        elif(direction == 'a'):\n            print('motor running anti-clockwise\\n')\n            break\n        else:\n            print('input error, please try again!')\n    while True:\n        rotary(direction)\n\ndef destroy():\n    GPIO.cleanup()   \n\nif __name__ == '__main__':    \n    setup()\n    try:\n        loop()        \n    except KeyboardInterrupt:\n        destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image134.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "ic",
          "label": "ULN2003 / L293D",
          "startCol": 24,
          "cols": 4,
          "topRow": "F",
          "botRow": "E"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 24,
            "row": "J"
          },
          "color": "#2196f3",
          "label": "GPIO18 (Pin 12, Col 6J) -> Stepper Motor 28BYJ-48 Terminal (Col 24J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 8,
            "row": "J",
            "pin": 16,
            "bcm": 23
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO23 (Pin 16, Col 8J) -> Stepper Motor 28BYJ-48 Terminal (Col 25J)",
          "bcm": 23
        },
        {
          "from": {
            "col": 9,
            "row": "J",
            "pin": 18,
            "bcm": 24
          },
          "to": {
            "col": 26,
            "row": "J"
          },
          "color": "#ff9800",
          "label": "GPIO24 (Pin 18, Col 9J) -> Stepper Motor 28BYJ-48 Terminal (Col 26J)",
          "bcm": 24
        },
        {
          "from": {
            "col": 11,
            "row": "J",
            "pin": 22,
            "bcm": 25
          },
          "to": {
            "col": 27,
            "row": "J"
          },
          "color": "#9c27b0",
          "label": "GPIO25 (Pin 22, Col 11J) -> Stepper Motor 28BYJ-48 Terminal (Col 27J)",
          "bcm": 25
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO18 (Pin 12, Col 6J) -> Stepper Motor 28BYJ-48 Terminal (Col 24J)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO23 (Pin 16, Col 8J) -> Stepper Motor 28BYJ-48 Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO24 (Pin 18, Col 9J) -> Stepper Motor 28BYJ-48 Terminal (Col 26J)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO25 (Pin 22, Col 11J) -> Stepper Motor 28BYJ-48 Terminal (Col 27J)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place ULN2003 / L293D"
      }
    ]
  },
  {
    "id": "1.3.4",
    "title": "5V Relay Module",
    "category": "Output",
    "slug": "1.3.4_relay.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/1.3.4_relay.html",
    "description": "Use a 5V relay module to switch external circuits with Normally Open (NO) and Normally Closed (NC) contacts.",
    "bcm_pins": [
      17
    ],
    "youtube_id": "tCFMmepJjDA",
    "youtube_title": "Controlling High Voltage Relays",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_1.3.4.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image345.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image144.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image145.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_1.3.4.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image344.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image142.jpeg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image345.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image144.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image145.jpeg"
    ],
    "python_file": "1.3.4_Relay.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\n\n# Set GPIO17 as control pin\nrelayPin = 17\n\n# Define a setup function for some setup\ndef setup():\n    # Set the GPIO modes to BCM Numbering\n    GPIO.setmode(GPIO.BCM)\n    # Set relayPin's mode to output,\n    # and initial level to High(3.3v)\n    GPIO.setup(relayPin, GPIO.OUT, initial=GPIO.HIGH)\n\n# Define a main function for main process\ndef main():\n    while True:\n        print ('Relay open...')\n        # Tick\n        GPIO.output(relayPin, GPIO.LOW)\n        time.sleep(1)\n        print ('...Relay close')\n        # Tock\n        GPIO.output(relayPin, GPIO.HIGH)\n        time.sleep(1)\n\n# Define a destroy function for clean up everything after\n# the script finished\ndef destroy():\n    # Turn off LED\n    GPIO.output(relayPin, GPIO.HIGH)\n    # Release resource\n    GPIO.cleanup()                    \n\n# If run this script directly, do:\nif __name__ == '__main__':\n    setup()\n    try:\n        main()\n    # When 'Ctrl+C' is pressed, the child program\n    # destroy() will be  executed.\n    except KeyboardInterrupt:\n        destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image144.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "module",
          "label": "5V Relay Module",
          "startCol": 24,
          "row": "E",
          "widthCols": 5,
          "pins": [
            {
              "col": 24,
              "row": "E",
              "name": "G17"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> 5V Relay Module Terminal (Col 24A)",
          "bcm": 17
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> 5V Relay Module Terminal (Col 24A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 5V Relay Module"
      }
    ]
  },
  {
    "id": "2.1.1",
    "title": "Push Button",
    "category": "Input",
    "slug": "2.1.1_button.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/2.1.1_button.html",
    "description": "Read digital input from a momentary push button with pull-up/pull-down resistor to toggle an LED.",
    "bcm_pins": [
      17,
      18
    ],
    "youtube_id": "tCFMmepJjDA",
    "youtube_title": "Video 7: GPIO Inputs from Button",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.1.1_Button.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image302.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image152.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image153.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.1.1_Button.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image148.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image301.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image302.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image303.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image152.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image153.jpeg"
    ],
    "python_file": "2.1.1_Button.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\n\nLedPin = 17 # Set GPIO17 as LED pin\nBtnPin = 18 # Set GPIO18 as button pin\n\n\nLed_status = True # Set Led status to True(OFF)\n\n# Define a setup function for some setup\ndef setup():\n\t# Set the GPIO modes to BCM Numbering\n\tGPIO.setmode(GPIO.BCM)\n\tGPIO.setup(LedPin, GPIO.OUT, initial=GPIO.HIGH)  # Set LedPin's mode to output, and initial level to high (3.3v)\n\tGPIO.setup(BtnPin, GPIO.IN) # Set BtnPin's mode to input.\n\n# Define a callback function for button callback\ndef swLed(ev=None):\n\tglobal Led_status\n\t# Switch led status(on-->off; off-->on)\n\tLed_status = not Led_status\n\tGPIO.output(LedPin, Led_status)\n\tif Led_status:\n\t\tprint ('LED OFF...')\n\telse:\n\t\tprint ('...LED ON')\n\n# Define a main function for main process\ndef main():\n\t# Set up a falling detect on BtnPin, \n\t# and callback function to swLed\n\tGPIO.add_event_detect(BtnPin, GPIO.FALLING, callback=swLed)\n\twhile True:\n\t\t# Don't do anything.\n\t\ttime.sleep(1)\n\n# Define a destroy function for clean up everything after\n# the script finished \ndef destroy():\n\t# Turn off LED\n\tGPIO.output(LedPin, GPIO.HIGH)\n\t# Release resource\n\tGPIO.cleanup()\n\n# If run this script directly, do:\nif __name__ == '__main__':\n\tsetup()\n\ttry:\n\t\tmain()\n\t# When 'Ctrl+C' is pressed, the program \n\t# destroy() will be  executed.\n\texcept KeyboardInterrupt:\n\t\tdestroy()\n\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image152.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "led",
          "color": "red",
          "bcm": 17,
          "activeLow": true,
          "label": "Red LED",
          "pins": [
            {
              "col": 26,
              "row": "E",
              "name": "Cathode (-)"
            },
            {
              "col": 27,
              "row": "E",
              "name": "Anode (+)"
            }
          ]
        },
        {
          "type": "resistor",
          "value": "220\u03a9",
          "bands": [
            "#e53935",
            "#e53935",
            "#212121",
            "#ffb300"
          ],
          "from": {
            "col": 27,
            "row": "A"
          },
          "to": {
            "col": 27,
            "row": "bot_plus"
          },
          "label": "220\u03a9 LED Resistor (27A -> + Rail)"
        },
        {
          "type": "button",
          "label": "Push Button",
          "bcm": 18,
          "pins": [
            {
              "col": 30,
              "row": "F",
              "name": "1"
            },
            {
              "col": 32,
              "row": "F",
              "name": "2"
            },
            {
              "col": 30,
              "row": "E",
              "name": "3"
            },
            {
              "col": 32,
              "row": "E",
              "name": "4"
            }
          ]
        },
        {
          "type": "resistor",
          "value": "10k\u03a9",
          "bands": [
            "#795548",
            "#212121",
            "#ff9800",
            "#ffb300"
          ],
          "from": {
            "col": 29,
            "row": "H"
          },
          "to": {
            "col": 30,
            "row": "H"
          },
          "label": "10k\u03a9 Pull-Down/Up Resistor"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Col 6A) -> LED Cathode (Col 26A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 30,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Col 6J) -> Button Pin 1 (Col 30J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 32,
            "row": "A"
          },
          "to": {
            "col": 32,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "Button Pin 4 (Col 32A) -> GND Rail"
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Col 6A) -> LED Cathode (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Col 6J) -> Button Pin 1 (Col 30J)"
      },
      {
        "kind": "wire",
        "color": "#212121",
        "text": "Button Pin 4 (Col 32A) -> GND Rail"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Red LED"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 220\u03a9 LED Resistor (27A -> + Rail)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Push Button"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 10k\u03a9 Pull-Down/Up Resistor"
      }
    ]
  },
  {
    "id": "2.1.2",
    "title": "Slide Switch",
    "category": "Input",
    "slug": "2.1.2_slide%20Switch.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/2.1.2_slide%20Switch.html",
    "description": "Detect 2-state positions of a slide switch to select operational modes or turn devices on/off.",
    "bcm_pins": [
      17,
      22,
      27
    ],
    "youtube_id": "tCFMmepJjDA",
    "youtube_title": "Slide Switch Digital Input",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.1.2_slide_switch.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image305.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image161.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image162.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.1.2_slide_switch.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image156.jpeg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image304.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image159.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image305.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image306.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image161.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image162.jpeg"
    ],
    "python_file": "2.1.2_Slider.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\n\n# Set #17 as slide switch pin, #22 as led1 pin, #27 as led2 pin\nslidePin = 17\nled1Pin = 22\nled2Pin = 27\n\n# Define a setup function for some setup\ndef setup():\n\t# Set the GPIO modes to BCM Numbering\n\tGPIO.setmode(GPIO.BCM)\n\t# Set slidePin input\n\t# Set ledPin output, \n\t# and initial level to High(3.3v)\n\tGPIO.setup(slidePin, GPIO.IN)\n\tGPIO.setup(led1Pin, GPIO.OUT, initial=GPIO.HIGH)\n\tGPIO.setup(led2Pin, GPIO.OUT, initial=GPIO.HIGH)\n\n# Define a main function for main process\ndef main():\n\twhile True:\n\t\t# slide switch high, led1 on\n\t\tif GPIO.input(slidePin) == 1:\n\t\t\tprint ('LED1 ON')\n\t\t\tGPIO.output(led1Pin, GPIO.LOW)\n\t\t\tGPIO.output(led2Pin, GPIO.HIGH)\n\n\t\t# slide switch low, led2 on\n\t\tif GPIO.input(slidePin) == 0:\n\t\t\tprint ('    LED2 ON')\n\t\t\tGPIO.output(led2Pin, GPIO.LOW)\n\t\t\tGPIO.output(led1Pin, GPIO.HIGH)\n\n\t\ttime.sleep(0.5)\n# Define a destroy function for clean up everything after\n# the script finished \ndef destroy():\n\t# Turn off LED\n\tGPIO.output(led1Pin, GPIO.HIGH)\n\tGPIO.output(led2Pin, GPIO.HIGH)\n\t# Release resource\n\tGPIO.cleanup()                     \n\n# If run this script directly, do:\nif __name__ == '__main__':\n\tsetup()\n\ttry:\n\t\tmain()\n\t# When 'Ctrl+C' is pressed, the program \n\t# destroy() will be  executed.\n\texcept KeyboardInterrupt:\n\t\tdestroy()\t\n\t\t\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image161.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "button",
          "label": "Switch / Sensor",
          "bcm": 17,
          "pins": [
            {
              "col": 24,
              "row": "F",
              "name": "1"
            },
            {
              "col": 26,
              "row": "F",
              "name": "2"
            },
            {
              "col": 24,
              "row": "E",
              "name": "3"
            },
            {
              "col": 26,
              "row": "E",
              "name": "4"
            }
          ]
        },
        {
          "type": "led",
          "color": "red",
          "bcm": 27,
          "activeLow": true,
          "label": "Status LED",
          "pins": [
            {
              "col": 29,
              "row": "E",
              "name": "-"
            },
            {
              "col": 30,
              "row": "E",
              "name": "+"
            }
          ]
        },
        {
          "type": "resistor",
          "value": "220\u03a9",
          "bands": [
            "#e53935",
            "#e53935",
            "#212121",
            "#ffb300"
          ],
          "from": {
            "col": 30,
            "row": "A"
          },
          "to": {
            "col": 30,
            "row": "bot_plus"
          },
          "label": "220\u03a9 Resistor"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> Slide Switch Terminal (Col 24A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 25,
            "row": "A"
          },
          "color": "#4caf50",
          "label": "GPIO22 (Pin 15, Col 8A) -> Slide Switch Terminal (Col 25A)",
          "bcm": 22
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Pin 13, Col 7A) -> Slide Switch Terminal (Col 26A)",
          "bcm": 27
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> Slide Switch Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO22 (Pin 15, Col 8A) -> Slide Switch Terminal (Col 25A)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Pin 13, Col 7A) -> Slide Switch Terminal (Col 26A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Switch / Sensor"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Status LED"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 220\u03a9 Resistor"
      }
    ]
  },
  {
    "id": "2.1.3",
    "title": "Tilt Switch",
    "category": "Input",
    "slug": "2.1.3_tilt_switch.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/2.1.3_tilt_switch.html",
    "description": "Sense physical inclination and tilt angles using a conductive ball tilt switch.",
    "bcm_pins": [
      17,
      27,
      22
    ],
    "youtube_id": "tCFMmepJjDA",
    "youtube_title": "Tilt Switch Angle Sensing",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.1.3_tilt_switch.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image307.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image169.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image170.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.1.3_tilt_switch.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image167.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image307.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image308.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image169.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image170.jpeg"
    ],
    "python_file": "2.1.3_Tilt.py",
    "python_code": "#!/usr/bin/env python3\nimport RPi.GPIO as GPIO\n\nTiltPin = 11\nGpin   = 13\nRpin   = 15\n\ndef setup():\n\tGPIO.setmode(GPIO.BOARD)       # Numbers GPIOs by physical location\n\tGPIO.setup(Gpin, GPIO.OUT)     # Set Green Led Pin mode to output\n\tGPIO.setup(Rpin, GPIO.OUT)     # Set Red Led Pin mode to output\n\tGPIO.setup(TiltPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)    # Set BtnPin's mode is input, and pull up to high level(3.3V)\n\tGPIO.add_event_detect(TiltPin, GPIO.BOTH, callback=detect, bouncetime=200)\n\ndef Led(x):\n\tif x == 0:\n\t\tGPIO.output(Rpin, 1)\n\t\tGPIO.output(Gpin, 0)\n\tif x == 1:\n\t\tGPIO.output(Rpin, 0)\n\t\tGPIO.output(Gpin, 1)\n\ndef Print(x):\n\tif x == 0:\n\t\tprint ('    *************')\n\t\tprint ('    *   Tilt!   *')\n\t\tprint ('    *************')\n\ndef detect(chn):\n\tLed(GPIO.input(TiltPin))\n\tPrint(GPIO.input(TiltPin))\n\ndef loop():\n\twhile True:\n\t\tpass\n\ndef destroy():\n\tGPIO.output(Gpin, GPIO.HIGH)       # Green led off\n\tGPIO.output(Rpin, GPIO.HIGH)       # Red led off\n\tGPIO.cleanup()                     # Release resource\n\nif __name__ == '__main__':     # Program start from here\n\tsetup()\n\ttry:\n\t\tloop()\n\texcept KeyboardInterrupt:  # When 'Ctrl+C' is pressed, the child program destroy() will be  executed.\n\t\tdestroy()\n\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image169.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "button",
          "label": "Switch / Sensor",
          "bcm": 17,
          "pins": [
            {
              "col": 24,
              "row": "F",
              "name": "1"
            },
            {
              "col": 26,
              "row": "F",
              "name": "2"
            },
            {
              "col": 24,
              "row": "E",
              "name": "3"
            },
            {
              "col": 26,
              "row": "E",
              "name": "4"
            }
          ]
        },
        {
          "type": "led",
          "color": "red",
          "bcm": 22,
          "activeLow": true,
          "label": "Status LED",
          "pins": [
            {
              "col": 29,
              "row": "E",
              "name": "-"
            },
            {
              "col": 30,
              "row": "E",
              "name": "+"
            }
          ]
        },
        {
          "type": "resistor",
          "value": "220\u03a9",
          "bands": [
            "#e53935",
            "#e53935",
            "#212121",
            "#ffb300"
          ],
          "from": {
            "col": 30,
            "row": "A"
          },
          "to": {
            "col": 30,
            "row": "bot_plus"
          },
          "label": "220\u03a9 Resistor"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> Tilt Switch Terminal (Col 24A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 25,
            "row": "A"
          },
          "color": "#4caf50",
          "label": "GPIO27 (Pin 13, Col 7A) -> Tilt Switch Terminal (Col 25A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO22 (Pin 15, Col 8A) -> Tilt Switch Terminal (Col 26A)",
          "bcm": 22
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> Tilt Switch Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO27 (Pin 13, Col 7A) -> Tilt Switch Terminal (Col 25A)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO22 (Pin 15, Col 8A) -> Tilt Switch Terminal (Col 26A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Switch / Sensor"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Status LED"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 220\u03a9 Resistor"
      }
    ]
  },
  {
    "id": "2.1.4",
    "title": "Potentiometer & ADC0834",
    "category": "Input",
    "slug": "2.1.4_potentiometer.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/2.1.4_potentiometer.html",
    "description": "Convert continuous analog voltage (0-3.3V) from a potentiometer to 8-bit digital values (0-255) using ADC0834.",
    "bcm_pins": [
      17,
      18,
      27,
      22
    ],
    "youtube_id": "yJdN6LmGqvc",
    "youtube_title": "Video 15: Analog Input via ADC0834",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.1.4_potentiometer.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image311.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image180.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image181.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/mcp3008_and_adc0834.jpg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.1.4_potentiometer.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image309.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image175.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image176.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image310.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image311.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image312.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image180.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image313.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image181.jpeg"
    ],
    "python_file": "2.1.4_Potentiometer.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport ADC0834\nimport time\n\nLedPin = 22\n\ndef setup():\n    global led_val\n    # Set the GPIO modes to BCM Numbering\n    GPIO.setmode(GPIO.BCM)\n    # Set all LedPin's mode to output and initial level to High(3.3v)\n    GPIO.setup(LedPin, GPIO.OUT, initial=GPIO.HIGH)\n    ADC0834.setup()\n    # Set led as pwm channel and frequece to 2KHz\n    led_val = GPIO.PWM(LedPin, 2000)\n    # Set all begin with value 0\n    led_val.start(0)\n\ndef destroy():\n    # Stop all pwm channel\n    led_val.stop()\n    # Release resource\n    GPIO.cleanup()\ndef loop():\n    while True:\n        analogVal = ADC0834.getResult()\n        print ('analog value = %d' % analogVal)\n        led_val.ChangeDutyCycle(analogVal*100/255)\n        time.sleep(0.2)\nif __name__ == '__main__':\n    setup()\n    try:\n        loop()\n    except KeyboardInterrupt: # When 'Ctrl+C' is pressed, the program destroy() will be executed.\n        destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image180.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "led",
          "color": "red",
          "bcm": 22,
          "activeLow": false,
          "label": "Dimming LED",
          "pins": [
            {
              "col": 22,
              "row": "E",
              "name": "Anode (+)"
            },
            {
              "col": 23,
              "row": "E",
              "name": "Cathode (-)"
            }
          ]
        },
        {
          "type": "resistor",
          "value": "220\u03a9",
          "bands": [
            "#e53935",
            "#e53935",
            "#212121",
            "#ffb300"
          ],
          "from": {
            "col": 23,
            "row": "A"
          },
          "to": {
            "col": 23,
            "row": "bot_minus"
          },
          "label": "220\u03a9 Resistor (23A -> - Rail)"
        },
        {
          "type": "ic",
          "label": "ADC0834",
          "startCol": 25,
          "cols": 7,
          "topRow": "F",
          "botRow": "E",
          "pinLabels": [
            "CS",
            "CH0",
            "CH1",
            "CH2",
            "CH3",
            "GND",
            "DI",
            "DO",
            "CLK",
            "VCC",
            "REF",
            "AGND",
            "NC",
            "NC"
          ]
        },
        {
          "type": "pot",
          "label": "10k\u03a9 Pot",
          "pins": [
            {
              "col": 33,
              "row": "E",
              "name": "VCC"
            },
            {
              "col": 34,
              "row": "E",
              "name": "SIG"
            },
            {
              "col": 35,
              "row": "E",
              "name": "GND"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 22,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO22 (Col 8A) -> LED (Col 22A)",
          "bcm": 22
        },
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 25,
            "row": "A"
          },
          "color": "#ffc107",
          "label": "GPIO17 (Col 6A) -> ADC0834 CS (Col 25A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 28,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Col 6J) -> ADC0834 CLK (Col 28J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO27 (Col 7A) -> ADC0834 DIO (Col 27A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 34,
            "row": "A"
          },
          "to": {
            "col": 26,
            "row": "B"
          },
          "color": "#2196f3",
          "label": "Pot Wiper (Col 34A) -> ADC0834 CH0 (Col 26B)"
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO22 (Col 8A) -> LED (Col 22A)"
      },
      {
        "kind": "wire",
        "color": "#ffc107",
        "text": "GPIO17 (Col 6A) -> ADC0834 CS (Col 25A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Col 6J) -> ADC0834 CLK (Col 28J)"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO27 (Col 7A) -> ADC0834 DIO (Col 27A)"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "Pot Wiper (Col 34A) -> ADC0834 CH0 (Col 26B)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Dimming LED"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 220\u03a9 Resistor (23A -> - Rail)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place ADC0834"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 10k\u03a9 Pot"
      }
    ]
  },
  {
    "id": "2.1.5",
    "title": "4x4 Matrix Keypad",
    "category": "Input",
    "slug": "2.1.5_keypad.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/2.1.5_keypad.html",
    "description": "Scan a 16-key matrix keypad (0-9, A-D, *, #) using row-column matrix scanning.",
    "bcm_pins": [
      17,
      18,
      27,
      22,
      23,
      24,
      25,
      4
    ],
    "youtube_id": "wuCABxky94g",
    "youtube_title": "Video 32: Matrix Keypad Scanning",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.1.5_keypad.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image315.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image186.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image188.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.1.5_keypad.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image314.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image315.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image316.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image186.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image187.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image187.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image188.jpeg"
    ],
    "python_file": "2.1.5_Keypad.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\n\nclass Keypad():\n\n    def __init__(self, rowsPins, colsPins, keys):\n        self.rowsPins = rowsPins\n        self.colsPins = colsPins\n        self.keys = keys\n        GPIO.setwarnings(False)\n        GPIO.setmode(GPIO.BCM)\n        GPIO.setup(self.rowsPins, GPIO.OUT, initial=GPIO.LOW)\n        GPIO.setup(self.colsPins, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)\n\n    def read(self):\n        pressed_keys = []\n        for i, row in enumerate(self.rowsPins):\n            GPIO.output(row, GPIO.HIGH)\n            for j, col in enumerate(self.colsPins):\n                index = i * len(self.colsPins) + j\n                if (GPIO.input(col) == 1):\n                    pressed_keys.append(self.keys[index])\n            GPIO.output(row, GPIO.LOW)\n        return pressed_keys\n\ndef setup():\n    global keypad, last_key_pressed\n    rowsPins = [18,23,24,25]\n    colsPins = [10,22,27,17]\n    keys = [\"1\",\"2\",\"3\",\"A\",\n            \"4\",\"5\",\"6\",\"B\",\n            \"7\",\"8\",\"9\",\"C\",\n            \"*\",\"0\",\"#\",\"D\"]\n    keypad = Keypad(rowsPins, colsPins, keys)\n    last_key_pressed = []\n\ndef loop():\n    global keypad, last_key_pressed\n    pressed_keys = keypad.read()\n    if len(pressed_keys) != 0 and last_key_pressed != pressed_keys:\n        print(pressed_keys)\n    last_key_pressed = pressed_keys\n    time.sleep(0.1)\n\n# Define a destroy function for clean up everything after the script finished\ndef destroy():\n    # Release resource\n    GPIO.cleanup() \n\nif __name__ == '__main__':     # Program start from here\n    try:\n        setup()\n        while True:\n            loop()\n    except KeyboardInterrupt:   # When 'Ctrl+C' is pressed, the program destroy() will be executed.\n        destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image186.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "ic",
          "label": "2x 74HC595",
          "startCol": 24,
          "cols": 8,
          "topRow": "F",
          "botRow": "E"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> 4x4 Matrix Keypad Terminal (Col 24A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Pin 12, Col 6J) -> 4x4 Matrix Keypad Terminal (Col 25J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Pin 13, Col 7A) -> 4x4 Matrix Keypad Terminal (Col 26A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#9c27b0",
          "label": "GPIO22 (Pin 15, Col 8A) -> 4x4 Matrix Keypad Terminal (Col 27A)",
          "bcm": 22
        },
        {
          "from": {
            "col": 8,
            "row": "J",
            "pin": 16,
            "bcm": 23
          },
          "to": {
            "col": 28,
            "row": "J"
          },
          "color": "#00bcd4",
          "label": "GPIO23 (Pin 16, Col 8J) -> 4x4 Matrix Keypad Terminal (Col 28J)",
          "bcm": 23
        },
        {
          "from": {
            "col": 9,
            "row": "J",
            "pin": 18,
            "bcm": 24
          },
          "to": {
            "col": 29,
            "row": "J"
          },
          "color": "#e91e63",
          "label": "GPIO24 (Pin 18, Col 9J) -> 4x4 Matrix Keypad Terminal (Col 29J)",
          "bcm": 24
        },
        {
          "from": {
            "col": 11,
            "row": "J",
            "pin": 22,
            "bcm": 25
          },
          "to": {
            "col": 30,
            "row": "J"
          },
          "color": "#8bc34a",
          "label": "GPIO25 (Pin 22, Col 11J) -> 4x4 Matrix Keypad Terminal (Col 30J)",
          "bcm": 25
        },
        {
          "from": {
            "col": 4,
            "row": "A",
            "pin": 7,
            "bcm": 4
          },
          "to": {
            "col": 31,
            "row": "A"
          },
          "color": "#ffc107",
          "label": "GPIO4 (Pin 7, Col 4A) -> 4x4 Matrix Keypad Terminal (Col 31A)",
          "bcm": 4
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> 4x4 Matrix Keypad Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Pin 12, Col 6J) -> 4x4 Matrix Keypad Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Pin 13, Col 7A) -> 4x4 Matrix Keypad Terminal (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO22 (Pin 15, Col 8A) -> 4x4 Matrix Keypad Terminal (Col 27A)"
      },
      {
        "kind": "wire",
        "color": "#00bcd4",
        "text": "GPIO23 (Pin 16, Col 8J) -> 4x4 Matrix Keypad Terminal (Col 28J)"
      },
      {
        "kind": "wire",
        "color": "#e91e63",
        "text": "GPIO24 (Pin 18, Col 9J) -> 4x4 Matrix Keypad Terminal (Col 29J)"
      },
      {
        "kind": "wire",
        "color": "#8bc34a",
        "text": "GPIO25 (Pin 22, Col 11J) -> 4x4 Matrix Keypad Terminal (Col 30J)"
      },
      {
        "kind": "wire",
        "color": "#ffc107",
        "text": "GPIO4 (Pin 7, Col 4A) -> 4x4 Matrix Keypad Terminal (Col 31A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 2x 74HC595"
      }
    ]
  },
  {
    "id": "2.1.6",
    "title": "Analog PS2 Joystick",
    "category": "Input",
    "slug": "2.1.6_joystick.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/2.1.6_joystick.html",
    "description": "Read 2-axis analog joystick coordinates (X, Y) via ADC0834 and tactile push button (Z).",
    "bcm_pins": [
      17,
      18,
      27,
      22
    ],
    "youtube_id": "T6HsRRXBVS8",
    "youtube_title": "Video 18: Joystick Control",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image317.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image319.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image193.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image194.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/mcp3008_and_adc0834.jpg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image317.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image318.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image319.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image320.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image193.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image194.jpeg"
    ],
    "python_file": "2.1.6_Joystick.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport ADC0834\nimport time\n\nBtnPin = 22\n\ndef setup():\n\t# Set the GPIO modes to BCM Numbering\n\tGPIO.setmode(GPIO.BCM)\n\tGPIO.setup(BtnPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)\n\tADC0834.setup()\n\ndef destroy():\n\t# Release resource\n\tGPIO.cleanup()\n\ndef loop():\n\twhile True:\n\t\tx_val = ADC0834.getResult(0)\n\t\ty_val = ADC0834.getResult(1)\n\t\tBtn_val = GPIO.input(BtnPin)\n\t\tprint ('X: %d  Y: %d  Btn: %d' % (x_val, y_val, Btn_val))\n\t\ttime.sleep(0.2)\n\nif __name__ == '__main__':\n\tsetup()\n\ttry:\n\t\tloop()\n\texcept KeyboardInterrupt: # When 'Ctrl+C' is pressed, the program destroy() will be executed.\n\t\tdestroy()\n\t\t\n\t\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image193.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "ic",
          "label": "ADC0834",
          "startCol": 24,
          "cols": 7,
          "topRow": "F",
          "botRow": "E"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> Analog PS2 Joystick Terminal (Col 24A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Pin 12, Col 6J) -> Analog PS2 Joystick Terminal (Col 25J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Pin 13, Col 7A) -> Analog PS2 Joystick Terminal (Col 26A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#9c27b0",
          "label": "GPIO22 (Pin 15, Col 8A) -> Analog PS2 Joystick Terminal (Col 27A)",
          "bcm": 22
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> Analog PS2 Joystick Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Pin 12, Col 6J) -> Analog PS2 Joystick Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Pin 13, Col 7A) -> Analog PS2 Joystick Terminal (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO22 (Pin 15, Col 8A) -> Analog PS2 Joystick Terminal (Col 27A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place ADC0834"
      }
    ]
  },
  {
    "id": "2.2.1",
    "title": "Photoresistor (LDR)",
    "category": "Input",
    "slug": "2.2.1_photoresistor.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/2.2.1_photoresistor.html",
    "description": "Measure ambient light brightness via a photoresistor voltage divider and ADC0834.",
    "bcm_pins": [
      17,
      18,
      27,
      22
    ],
    "youtube_id": "LLYJsXEQueM",
    "youtube_title": "Video 30: Photoresistor Light Sensing",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.2.1_photoresistor.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image321.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image198.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image199.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/mcp3008_and_adc0834.jpg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.2.1_photoresistor.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image196.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image321.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image322.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image198.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image199.jpeg"
    ],
    "python_file": "2.2.1_Photoresistor.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport ADC0834\nimport time\n\nLedPin = 22\n\ndef setup():\n\tglobal led_val\n\t# Set the GPIO modes to BCM Numbering\n\tGPIO.setmode(GPIO.BCM)\n\t# Set all LedPin's mode to output and initial level to High(3.3v)\n\tGPIO.setup(LedPin, GPIO.OUT, initial=GPIO.HIGH)\n\tADC0834.setup()\n\t# Set led as pwm channel and frequece to 2KHz\n\tled_val = GPIO.PWM(LedPin, 2000)\n\n\t# Set all begin with value 0\n\tled_val.start(0)\n\ndef destroy():\n\t# Stop all pwm channel\n\tled_val.stop()\n\t# Release resource\n\tGPIO.cleanup()\n\ndef loop():\n\twhile True:\n\t\tanalogVal = ADC0834.getResult()\n\t\tprint ('analog value = %d' % analogVal)\n\t\tled_val.ChangeDutyCycle(analogVal*100/255)\n\t\ttime.sleep(0.2)\n\nif __name__ == '__main__':\n\tsetup()\n\ttry:\n\t\tloop()\n\texcept KeyboardInterrupt: # When 'Ctrl+C' is pressed, the program destroy() will be executed.\n\t\tdestroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image198.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "ic",
          "label": "ADC0834",
          "startCol": 24,
          "cols": 7,
          "topRow": "F",
          "botRow": "E"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> Photoresistor (LDR) Terminal (Col 24A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Pin 12, Col 6J) -> Photoresistor (LDR) Terminal (Col 25J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Pin 13, Col 7A) -> Photoresistor (LDR) Terminal (Col 26A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#9c27b0",
          "label": "GPIO22 (Pin 15, Col 8A) -> Photoresistor (LDR) Terminal (Col 27A)",
          "bcm": 22
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> Photoresistor (LDR) Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Pin 12, Col 6J) -> Photoresistor (LDR) Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Pin 13, Col 7A) -> Photoresistor (LDR) Terminal (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO22 (Pin 15, Col 8A) -> Photoresistor (LDR) Terminal (Col 27A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place ADC0834"
      }
    ]
  },
  {
    "id": "2.2.2",
    "title": "Thermistor (NTC)",
    "category": "Input",
    "slug": "2.2.2_thermistor.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/2.2.2_thermistor.html",
    "description": "Calculate ambient temperature in Celsius/Fahrenheit using an NTC thermistor and Steinhart-Hart B-formula.",
    "bcm_pins": [
      17,
      18,
      27
    ],
    "youtube_id": "LLYJsXEQueM",
    "youtube_title": "Thermistor Temperature Calculation",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.2.2_thermistor.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image323.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image202.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image203.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/mcp3008_and_adc0834.jpg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.2.2_thermistor.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image325.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image323.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image324.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image202.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image203.jpeg"
    ],
    "python_file": "2.2.2_Thermistor.py",
    "python_code": "#!/usr/bin/env python3\n# -*- coding: utf-8 -*-\n\nimport RPi.GPIO as GPIO\nimport ADC0834\nimport time\nimport math\n\ndef init():\n\tADC0834.setup()\n\ndef loop():\n\twhile True:\n\t\tanalogVal = ADC0834.getResult()\n\t\tVr = 5 * float(analogVal) / 255\n\t\tRt = 10000 * Vr / (5 - Vr)\n\t\ttemp = 1/(((math.log(Rt / 10000)) / 3950) + (1 / (273.15+25)))\n\t\tCel = temp - 273.15\n\t\tFah = Cel * 1.8 + 32\n\t\tprint ('Celsius: %.2f C  Fahrenheit: %.2f F' % (Cel, Fah))\n\t\ttime.sleep(0.2)\n\nif __name__ == '__main__':\n\tinit()\n\ttry:\n\t\tloop()\n\texcept KeyboardInterrupt:\n\t\tADC0834.destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image202.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "ic",
          "label": "ADC0834",
          "startCol": 24,
          "cols": 7,
          "topRow": "F",
          "botRow": "E"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> Thermistor (NTC) Terminal (Col 24A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Pin 12, Col 6J) -> Thermistor (NTC) Terminal (Col 25J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Pin 13, Col 7A) -> Thermistor (NTC) Terminal (Col 26A)",
          "bcm": 27
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> Thermistor (NTC) Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Pin 12, Col 6J) -> Thermistor (NTC) Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Pin 13, Col 7A) -> Thermistor (NTC) Terminal (Col 26A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place ADC0834"
      }
    ]
  },
  {
    "id": "2.2.3",
    "title": "DHT11 Temp & Humidity Sensor",
    "category": "Input",
    "slug": "2.2.3_dht-11.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/2.2.3_dht-11.html",
    "description": "Read digital calibrated temperature and relative humidity data via 1-wire communication protocol.",
    "bcm_pins": [
      17
    ],
    "youtube_id": "iQvSpPhZOiY",
    "youtube_title": "Video 25: DHT11 Sensor Reading",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.2.3_dht-11.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image326.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image207.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image209.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.2.3_dht-11.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image205.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image326.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image207.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image209.jpeg"
    ],
    "python_file": "2.2.3_DHT.py",
    "python_code": "from gpiozero import OutputDevice, InputDevice\nimport time\n\n\nclass DHT11():\n    MAX_DELAY_COUINT = 100\n    BIT_1_DELAY_COUNT = 10\n    BITS_LEN = 40\n\n    def __init__(self, pin, pull_up=False):\n        self._pin = pin\n        self._pull_up = pull_up\n\n\n    def read_data(self):\n        bit_count = 0\n        delay_count = 0\n        bits = \"\"\n\n        # -------------- send start --------------\n        gpio = OutputDevice(self._pin)\n        gpio.off()\n        time.sleep(0.02)\n\n        gpio.close()\n        gpio = InputDevice(self._pin, pull_up=self._pull_up)\n\n        # -------------- wait response --------------\n        while gpio.value == 1:\n            pass\n        \n        # -------------- read data --------------\n        while bit_count < self.BITS_LEN:\n            while gpio.value == 0:\n                pass\n\n            # st = time.time()\n            while gpio.value == 1:\n                delay_count += 1\n                # break\n                if delay_count > self.MAX_DELAY_COUINT:\n                    break\n            if delay_count > self.BIT_1_DELAY_COUNT:\n                bits += \"1\"\n            else:\n                bits += \"0\"\n\n            delay_count = 0\n            bit_count += 1\n\n        # -------------- verify --------------\n        humidity_integer = int(bits[0:8], 2)\n        humidity_decimal = int(bits[8:16], 2)\n        temperature_integer = int(bits[16:24], 2)\n        temperature_decimal = int(bits[24:32], 2)\n        check_sum = int(bits[32:40], 2)\n\n        _sum = humidity_integer + humidity_decimal + temperature_integer + temperature_decimal\n\n        # print(bits)\n        # print(humidity_integer, humidity_decimal, temperature_integer, temperature_decimal)\n        # print(f'sum:{_sum}, check_sum:{check_sum}')\n        # print()\n\n        if check_sum != _sum:\n            humidity = 0.0\n            temperature = 0.0\n        else:\n            humidity = float(f'{humidity_integer}.{humidity_decimal}')\n            temperature = float(f'{temperature_integer}.{temperature_decimal}')\n\n        # -------------- return --------------\n        return humidity, temperature\n\n\nif __name__ == '__main__':\n    dht11 = DHT11(17)\n    while True:\n        humidity, temperature = dht11.read_data()\n        print(f\"{time.time():.3f}  temperature:{temperature}\u00b0C  humidity: {humidity}%\")\n        time.sleep(2)",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image207.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "module",
          "label": "DHT11 Temp & Humidity ",
          "startCol": 24,
          "row": "F",
          "widthCols": 4,
          "pins": [
            {
              "col": 24,
              "row": "E",
              "name": "G17"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> DHT11 Temp & Humidity Sensor Terminal (Col 24A)",
          "bcm": 17
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> DHT11 Temp & Humidity Sensor Terminal (Col 24A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place DHT11 Temp & Humidity "
      }
    ]
  },
  {
    "id": "2.2.4",
    "title": "PIR Motion Sensor",
    "category": "Input",
    "slug": "2.2.4_pir.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/2.2.4_pir.html",
    "description": "Detect human and animal body infrared thermal movement using a passive infrared (PIR) sensor.",
    "bcm_pins": [
      17,
      18,
      27,
      22
    ],
    "youtube_id": "lLc4KM8LZnY",
    "youtube_title": "Video 24: PIR Motion Detection",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.2.4_pir.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image327.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image214.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image215.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.2.4_pir.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image211.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image212.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image327.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image214.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/PIR_TTE.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/PIR_TTE.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image215.jpeg"
    ],
    "python_file": "2.2.4_PIR.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\n\nrgbPins = {'Red':18, 'Green':27, 'Blue':22}\npirPin = 17    # the pir connect to pin17\n\ndef setup():\n\tglobal p_R, p_G, p_B\n\tGPIO.setmode(GPIO.BCM)\t\t# Set the GPIO modes to BCM Numbering\n\tGPIO.setup(pirPin, GPIO.IN)    # Set pirPin to input\n\t# Set all LedPin's mode to output and initial level to High(3.3v)\n\tfor i in rgbPins:\n\t\tGPIO.setup(rgbPins[i], GPIO.OUT, initial=GPIO.HIGH)\n\n\t# Set all led as pwm channel and frequece to 2KHz\n\tp_R = GPIO.PWM(rgbPins['Red'], 2000)\n\tp_G = GPIO.PWM(rgbPins['Green'], 2000)\n\tp_B = GPIO.PWM(rgbPins['Blue'], 2000)\n\n\t# Set all begin with value 0\n\tp_R.start(0)\n\tp_G.start(0)\n\tp_B.start(0)\n\n# Define a MAP function for mapping values.  Like from 0~255 to 0~100\ndef MAP(x, in_min, in_max, out_min, out_max):\n\treturn (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min\n\n# Define a function to set up colors \ndef setColor(color):\n # configures the three LEDs' luminance with the inputted color value . \n\t# Devide colors from 'color' veriable\n\tR_val = (color & 0xFF0000) >> 16\n\tG_val = (color & 0x00FF00) >> 8\n\tB_val = (color & 0x0000FF) >> 0\n\t# Map color value from 0~255 to 0~100\n\tR_val = MAP(R_val, 0, 255, 0, 100)\n\tG_val = MAP(G_val, 0, 255, 0, 100)\n\tB_val = MAP(B_val, 0, 255, 0, 100)\n\t\n\t#Assign the mapped duty cycle value to the corresponding PWM channel to change the luminance. \n\tp_R.ChangeDutyCycle(R_val)\n\tp_G.ChangeDutyCycle(G_val)\n\tp_B.ChangeDutyCycle(B_val)\n\t#print (\"color_msg: R_val = %s,\tG_val = %s,\tB_val = %s\"%(R_val, G_val, B_val))\n\ndef loop():\n\twhile True:\n\t\tpir_val = GPIO.input(pirPin)\n\t\tif pir_val==GPIO.HIGH:\n\t\t\tsetColor(0xFFFF00)\n\t\telse :\n\t\t\tsetColor(0x0000FF)\n\ndef destroy():\n\tp_R.stop()\n\tp_G.stop()\n\tp_B.stop()\n\tGPIO.cleanup()                     # Release resource\n\nif __name__ == '__main__':     # Program start from here\n\tsetup()\n\ttry:\n\t\tloop()\n\texcept KeyboardInterrupt:  # When 'Ctrl+C' is pressed, the child program destroy() will be  executed.\n\t\tdestroy()\n\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image214.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "module",
          "label": "PIR Motion Sensor",
          "startCol": 24,
          "row": "F",
          "widthCols": 4,
          "pins": [
            {
              "col": 24,
              "row": "E",
              "name": "G17"
            },
            {
              "col": 25,
              "row": "F",
              "name": "G18"
            },
            {
              "col": 26,
              "row": "E",
              "name": "G27"
            },
            {
              "col": 27,
              "row": "E",
              "name": "G22"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> PIR Motion Sensor Terminal (Col 24A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Pin 12, Col 6J) -> PIR Motion Sensor Terminal (Col 25J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Pin 13, Col 7A) -> PIR Motion Sensor Terminal (Col 26A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#9c27b0",
          "label": "GPIO22 (Pin 15, Col 8A) -> PIR Motion Sensor Terminal (Col 27A)",
          "bcm": 22
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> PIR Motion Sensor Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Pin 12, Col 6J) -> PIR Motion Sensor Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Pin 13, Col 7A) -> PIR Motion Sensor Terminal (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO22 (Pin 15, Col 8A) -> PIR Motion Sensor Terminal (Col 27A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place PIR Motion Sensor"
      }
    ]
  },
  {
    "id": "2.2.5",
    "title": "Ultrasonic Distance Sensor HC-SR04",
    "category": "Input",
    "slug": "2.2.5_ultrasonic_sensor_module.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/2.2.5_ultrasonic_sensor_module.html",
    "description": "Measure distance to obstacles (2cm to 400cm) using 40kHz ultrasonic echo flight time calculation: distance = (time * 340m/s) / 2.",
    "bcm_pins": [
      23,
      24
    ],
    "youtube_id": "SoAGLXoQ5XI",
    "youtube_title": "Video 21: Ultrasonic Echolocation",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.2.5.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image329.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image220.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image221.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.2.5.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image217.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image328.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image218.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image329.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image220.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image221.jpeg"
    ],
    "python_file": "2.2.5_Ultrasonic.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\n\nTRIG = 16\nECHO = 18\n\ndef setup():\n\tGPIO.setmode(GPIO.BOARD)\n\tGPIO.setup(TRIG, GPIO.OUT)\n\tGPIO.setup(ECHO, GPIO.IN)\n\ndef distance():\n\tGPIO.output(TRIG, 0)\n\ttime.sleep(0.000002)\n\n\tGPIO.output(TRIG, 1)\n\ttime.sleep(0.00001)\n\tGPIO.output(TRIG, 0)\n\n\t\n\twhile GPIO.input(ECHO) == 0:\n\t\ta = 0\n\ttime1 = time.time()\n\twhile GPIO.input(ECHO) == 1:\n\t\ta = 1\n\ttime2 = time.time()\n\n\tduring = time2 - time1\n\treturn during * 340 / 2 * 100\n\ndef loop():\n\twhile True:\n\t\tdis = distance()\n\t\tprint ('Distance: %.2f' % dis)\n\t\ttime.sleep(0.3)\n\ndef destroy():\n\tGPIO.cleanup()\n\nif __name__ == \"__main__\":\n\tsetup()\n\ttry:\n\t\tloop()\n\texcept KeyboardInterrupt:\n\t\tdestroy()\n\t\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image220.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [],
      "components": [
        {
          "type": "module",
          "label": "HC-SR04 Ultrasonic",
          "startCol": 26,
          "row": "J",
          "widthCols": 6,
          "pins": [
            {
              "col": 26,
              "row": "J",
              "name": "VCC"
            },
            {
              "col": 27,
              "row": "J",
              "name": "TRIG"
            },
            {
              "col": 28,
              "row": "J",
              "name": "ECHO"
            },
            {
              "col": 29,
              "row": "J",
              "name": "GND"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 1,
            "row": "J",
            "pin": 2
          },
          "to": {
            "col": 26,
            "row": "I"
          },
          "color": "#e53935",
          "label": "5V0 (Pin 2, Col 1J) -> HC-SR04 VCC"
        },
        {
          "from": {
            "col": 8,
            "row": "J",
            "pin": 16,
            "bcm": 23
          },
          "to": {
            "col": 27,
            "row": "I"
          },
          "color": "#2196f3",
          "label": "GPIO23 / Board 16 (Col 8J) -> HC-SR04 TRIG",
          "bcm": 23
        },
        {
          "from": {
            "col": 9,
            "row": "J",
            "pin": 18,
            "bcm": 24
          },
          "to": {
            "col": 28,
            "row": "I"
          },
          "color": "#4caf50",
          "label": "GPIO24 / Board 18 (Col 9J) -> HC-SR04 ECHO",
          "bcm": 24
        },
        {
          "from": {
            "col": 10,
            "row": "J",
            "pin": 20
          },
          "to": {
            "col": 29,
            "row": "I"
          },
          "color": "#212121",
          "label": "GND (Pin 20, Col 10J) -> HC-SR04 GND"
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "wire",
        "color": "#e53935",
        "text": "5V0 (Pin 2, Col 1J) -> HC-SR04 VCC"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO23 / Board 16 (Col 8J) -> HC-SR04 TRIG"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO24 / Board 18 (Col 9J) -> HC-SR04 ECHO"
      },
      {
        "kind": "wire",
        "color": "#212121",
        "text": "GND (Pin 20, Col 10J) -> HC-SR04 GND"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place HC-SR04 Ultrasonic"
      }
    ]
  },
  {
    "id": "2.2.6",
    "title": "MPU6050 6-Axis Gyro & Accel",
    "category": "Input",
    "slug": "2.2.6_mpu6050_module.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/2.2.6_mpu6050_module.html",
    "description": "Track 3-axis acceleration and 3-axis angular velocity in real-time via I2C at address 0x68.",
    "bcm_pins": [
      2,
      3
    ],
    "youtube_id": "T6HsRRXBVS8",
    "youtube_title": "MPU6050 6-DOF IMU Sensor",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.2.6.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image330.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image227.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image228.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_2.2.6.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image223.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image224.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image225.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image330.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image227.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image228.jpeg"
    ],
    "python_file": "2.2.6_mpu6050.py",
    "python_code": "#!/usr/bin/python3\n\nimport smbus\nimport math\nimport time\n\n# Power management registers\npower_mgmt_1 = 0x6b\npower_mgmt_2 = 0x6c\n\ndef read_byte(adr):\n    return bus.read_byte_data(address, adr)\n\ndef read_word(adr):\n    high = bus.read_byte_data(address, adr)\n    low = bus.read_byte_data(address, adr+1)\n    val = (high << 8) + low\n    return val\n\ndef read_word_2c(adr):\n    val = read_word(adr)\n    if (val >= 0x8000):\n        return -((65535 - val) + 1)\n    else:\n        return val\n\ndef dist(a,b):\n    return math.sqrt((a*a)+(b*b))\n\ndef get_y_rotation(x,y,z):\n    radians = math.atan2(x, dist(y,z))\n    return -math.degrees(radians)\n\ndef get_x_rotation(x,y,z):\n    radians = math.atan2(y, dist(x,z))\n    return math.degrees(radians)\n\n\nbus = smbus.SMBus(1) # or bus = smbus.SMBus(1) for Revision 2 boards\naddress = 0x68       # This is the address value read via the i2cdetect command\n\n# Now wake the 6050 up as it starts in sleep mode\nbus.write_byte_data(address, power_mgmt_1, 0)\n\nwhile True:\n    time.sleep(0.1)\n    gyro_xout = read_word_2c(0x43)\n    gyro_yout = read_word_2c(0x45)\n    gyro_zout = read_word_2c(0x47)\n\n    print (\"gyro_xout : \", gyro_xout, \" scaled: \", (gyro_xout / 131))\n    print (\"gyro_yout : \", gyro_yout, \" scaled: \", (gyro_yout / 131))\n    print (\"gyro_zout : \", gyro_zout, \" scaled: \", (gyro_zout / 131))\n\n    accel_xout = read_word_2c(0x3b)\n    accel_yout = read_word_2c(0x3d)\n    accel_zout = read_word_2c(0x3f)\n\n    accel_xout_scaled = accel_xout / 16384.0\n    accel_yout_scaled = accel_yout / 16384.0\n    accel_zout_scaled = accel_zout / 16384.0\n\n    print (\"accel_xout: \", accel_xout, \" scaled: \", accel_xout_scaled)\n    print (\"accel_yout: \", accel_yout, \" scaled: \", accel_yout_scaled)\n    print (\"accel_zout: \", accel_zout, \" scaled: \", accel_zout_scaled)\n\n    print (\"x rotation: \" , get_x_rotation(accel_xout_scaled, accel_yout_scaled, accel_zout_scaled))\n    print (\"y rotation: \" , get_y_rotation(accel_xout_scaled, accel_yout_scaled, accel_zout_scaled))\n\n    time.sleep(0.5)\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image227.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "module",
          "label": "MPU6050 6-Axis Gyro & ",
          "startCol": 24,
          "row": "F",
          "widthCols": 4,
          "pins": [
            {
              "col": 24,
              "row": "E",
              "name": "G2"
            },
            {
              "col": 25,
              "row": "E",
              "name": "G3"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 2,
            "row": "A",
            "pin": 3,
            "bcm": 2
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO2 (Pin 3, Col 2A) -> MPU6050 6-Axis Gyro & Accel Terminal (Col 24A)",
          "bcm": 2
        },
        {
          "from": {
            "col": 3,
            "row": "A",
            "pin": 5,
            "bcm": 3
          },
          "to": {
            "col": 25,
            "row": "A"
          },
          "color": "#4caf50",
          "label": "GPIO3 (Pin 5, Col 3A) -> MPU6050 6-Axis Gyro & Accel Terminal (Col 25A)",
          "bcm": 3
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO2 (Pin 3, Col 2A) -> MPU6050 6-Axis Gyro & Accel Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO3 (Pin 5, Col 3A) -> MPU6050 6-Axis Gyro & Accel Terminal (Col 25A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place MPU6050 6-Axis Gyro & "
      }
    ]
  },
  {
    "id": "3.1.1",
    "title": "Digital Counting Device",
    "category": "Extension",
    "slug": "3.1.1_counting_device.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/3.1.1_counting_device.html",
    "description": "Increment and display count value on a 7-segment display whenever a push button is pressed.",
    "bcm_pins": [
      17,
      18,
      27,
      22
    ],
    "youtube_id": "az90qK3jmDo",
    "youtube_title": "74HC595 Counter with Button",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Counting_Device1.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one1.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image235.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image236.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Counting_Device1.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Counting_Device2.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one1.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image235.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image236.jpeg"
    ],
    "python_file": "3.1.1_CountingDevice.py",
    "python_code": "#!/usr/bin/env python3\nimport RPi.GPIO as GPIO\nimport time\n\nsensorPin = 26\n\nSDI = 24\nRCLK = 23\nSRCLK = 18\n\nplacePin = (10, 22, 27, 17)\nnumber = (0xc0, 0xf9, 0xa4, 0xb0, 0x99, 0x92, 0x82, 0xf8, 0x80, 0x90)\n\ncounter = 0\n\ndef clearDisplay():\n    for i in range(8):\n        GPIO.output(SDI, 1)\n        GPIO.output(SRCLK, GPIO.HIGH)\n        GPIO.output(SRCLK, GPIO.LOW)\n    GPIO.output(RCLK, GPIO.HIGH)\n    GPIO.output(RCLK, GPIO.LOW)    \n\ndef hc595_shift(data): \n    for i in range(8):\n        GPIO.output(SDI, 0x80 & (data << i))\n        GPIO.output(SRCLK, GPIO.HIGH)\n        GPIO.output(SRCLK, GPIO.LOW)\n    GPIO.output(RCLK, GPIO.HIGH)\n    GPIO.output(RCLK, GPIO.LOW)\n\ndef pickDigit(digit):\n    for i in placePin:\n        GPIO.output(i,GPIO.LOW)\n    GPIO.output(placePin[digit], GPIO.HIGH)\n\ndef display():\n    global counter                    \n    clearDisplay() \n    pickDigit(0)  \n    hc595_shift(number[counter % 10])\n\n    clearDisplay()\n    pickDigit(1)\n    hc595_shift(number[counter % 100//10])\n\n    clearDisplay()\n    pickDigit(2)\n    hc595_shift(number[counter % 1000//100])\n\n    clearDisplay()\n    pickDigit(3)\n    hc595_shift(number[counter % 10000//1000])\n\ndef loop():\n    global counter\n    currentState = 0\n    lastState = 0\n    while True:\n        display()\n        currentState=GPIO.input(sensorPin)\n        if (currentState == 0) and (lastState == 1):\n            counter +=1\n        lastState=currentState\n\ndef setup():\n    GPIO.setmode(GPIO.BCM)\n    GPIO.setup(SDI, GPIO.OUT)\n    GPIO.setup(RCLK, GPIO.OUT)\n    GPIO.setup(SRCLK, GPIO.OUT)\n    for i in placePin:\n        GPIO.setup(i, GPIO.OUT)\n    GPIO.setup(sensorPin, GPIO.IN)\n\ndef destroy():   # When \"Ctrl+C\" is pressed, the function is executed.\n    GPIO.cleanup()\n\nif __name__ == '__main__':  # Program starting from here\n    setup()\n    try:\n        loop()\n    except KeyboardInterrupt:\n        destroy()\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image235.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "button",
          "label": "Switch / Sensor",
          "bcm": 17,
          "pins": [
            {
              "col": 24,
              "row": "F",
              "name": "1"
            },
            {
              "col": 26,
              "row": "F",
              "name": "2"
            },
            {
              "col": 24,
              "row": "E",
              "name": "3"
            },
            {
              "col": 26,
              "row": "E",
              "name": "4"
            }
          ]
        },
        {
          "type": "led",
          "color": "red",
          "bcm": 22,
          "activeLow": true,
          "label": "Status LED",
          "pins": [
            {
              "col": 29,
              "row": "E",
              "name": "-"
            },
            {
              "col": 30,
              "row": "E",
              "name": "+"
            }
          ]
        },
        {
          "type": "resistor",
          "value": "220\u03a9",
          "bands": [
            "#e53935",
            "#e53935",
            "#212121",
            "#ffb300"
          ],
          "from": {
            "col": 30,
            "row": "A"
          },
          "to": {
            "col": 30,
            "row": "bot_plus"
          },
          "label": "220\u03a9 Resistor"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> Digital Counting Device Terminal (Col 24A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Pin 12, Col 6J) -> Digital Counting Device Terminal (Col 25J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Pin 13, Col 7A) -> Digital Counting Device Terminal (Col 26A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#9c27b0",
          "label": "GPIO22 (Pin 15, Col 8A) -> Digital Counting Device Terminal (Col 27A)",
          "bcm": 22
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> Digital Counting Device Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Pin 12, Col 6J) -> Digital Counting Device Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Pin 13, Col 7A) -> Digital Counting Device Terminal (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO22 (Pin 15, Col 8A) -> Digital Counting Device Terminal (Col 27A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Switch / Sensor"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Status LED"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 220\u03a9 Resistor"
      }
    ]
  },
  {
    "id": "3.1.2",
    "title": "Welcome Device (PIR + LCD + Buzzer)",
    "category": "Extension",
    "slug": "3.1.2_welcome.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/3.1.2_welcome.html",
    "description": "Greet guests with an LCD welcome greeting and chime when PIR detects movement.",
    "bcm_pins": [
      2,
      3,
      17,
      18
    ],
    "youtube_id": "AC8zuiIJOtY",
    "youtube_title": "Smart Greeter System",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Welcome.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one2.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image239.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image240.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Welcome.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one2.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image239.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image240.jpeg"
    ],
    "python_file": "3.1.2_Welcome.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\n\nSERVO_MIN_PULSE = 500\nSERVO_MAX_PULSE = 2500\n\nledPin = 18    # define the ledPin\npirPin = 17    # define the sensorPin\nservoPin = 22  # define the servoPin\nbuzPin = 27    # define the buzzerpin\n\n\nCL = [0, 131, 147, 165, 175, 196, 211, 248]        # Frequency of Low C notes\n\nCM = [0, 262, 294, 330, 350, 393, 441, 495]        # Frequency of Middle C notes\n\nCH = [0, 525, 589, 661, 700, 786, 882, 990]        # Frequency of High C notes\n\nsong = [    CH[5],CH[2],CM[6],CH[2],CH[3],CH[6],CH[3],CH[5],CH[3],CM[6],CH[2]    ]\n\nbeat = [    1,1,1,1,1,2,1,1,1,1,1,]\n\n\ndef setup():\n    global p\n    global Buzz                        # Assign a global variable to replace GPIO.PWM \n    GPIO.setmode(GPIO.BCM)       # Numbers GPIOs by physical location\n    GPIO.setup(ledPin, GPIO.OUT)   # Set ledPin's mode is output\n    GPIO.setup(pirPin, GPIO.IN)    # Set sensorPin's mode is input\n    GPIO.setup(servoPin, GPIO.OUT)   # Set servoPin's mode is output\n    GPIO.output(servoPin, GPIO.LOW)  # Set servoPin to low\n    GPIO.setup(buzPin, GPIO.OUT)    # Set pins' mode is output\n\n    Buzz = GPIO.PWM(buzPin, 440)    # 440 is initial frequency.\n    Buzz.start(50)                    # Start Buzzer pin with 50% duty ration\n\n    p = GPIO.PWM(servoPin, 50)     # set Frequece to 50Hz\n    p.start(0)                     # Duty Cycle = 0\n\ndef map(value, inMin, inMax, outMin, outMax):\n    return (outMax - outMin) * (value - inMin) / (inMax - inMin) + outMin\n\n    \ndef setAngle(angle):      # make the servo rotate to specific angle (0-180 degrees) \n    angle = max(0, min(180, angle))\n    pulse_width = map(angle, 0, 180, SERVO_MIN_PULSE, SERVO_MAX_PULSE)\n    pwm = map(pulse_width, 0, 20000, 0, 100)\n    p.ChangeDutyCycle(pwm)#map the angle to duty cycle and output it\n    \ndef doorbell():\n    for i in range(1, len(song)):        # Play song 1\n        Buzz.ChangeFrequency(song[i])    # Change the frequency along the song note\n        time.sleep(beat[i] * 0.25)        # delay a note for beat * 0.25s\n    time.sleep(1)                        # Wait a second for next song.\n\ndef closedoor():\n    GPIO.output(ledPin, GPIO.LOW)\n    for i in range(180, -1, -1): #make servo rotate from 180 to 0 deg\n        setAngle(i)\n        time.sleep(0.001)\n    time.sleep(1)\ndef opendoor():\n    GPIO.output(ledPin, GPIO.LOW)\n    for i in range(0, 181, 1):   #make servo rotate from 0 to 180 deg\n        setAngle(i)     # Write to servo\n        time.sleep(0.001)\n    time.sleep(1)\n    doorbell()\n    closedoor()\n\ndef loop():\n    while True:\n        if GPIO.input(pirPin)==GPIO.HIGH:\n            opendoor()\n\n\ndef destroy():\n    GPIO.cleanup()                     # Release resource\n    p.stop()\n    Buzz.stop()\n\nif __name__ == '__main__':     # Program start from here\n    setup()\n    try:\n        loop()\n    except KeyboardInterrupt:  # When 'Ctrl+C' is pressed, the program destroy() will be  executed.\n        destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image239.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "buzzer",
          "label": "Welcome Device (PI",
          "bcm": 2,
          "pins": [
            {
              "col": 24,
              "row": "E",
              "name": "G2"
            },
            {
              "col": 25,
              "row": "E",
              "name": "G3"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 2,
            "row": "A",
            "pin": 3,
            "bcm": 2
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO2 (Pin 3, Col 2A) -> Welcome Device (PIR + LCD + Buzzer) Terminal (Col 24A)",
          "bcm": 2
        },
        {
          "from": {
            "col": 3,
            "row": "A",
            "pin": 5,
            "bcm": 3
          },
          "to": {
            "col": 25,
            "row": "A"
          },
          "color": "#4caf50",
          "label": "GPIO3 (Pin 5, Col 3A) -> Welcome Device (PIR + LCD + Buzzer) Terminal (Col 25A)",
          "bcm": 3
        },
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO17 (Pin 11, Col 6A) -> Welcome Device (PIR + LCD + Buzzer) Terminal (Col 26A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 27,
            "row": "J"
          },
          "color": "#9c27b0",
          "label": "GPIO18 (Pin 12, Col 6J) -> Welcome Device (PIR + LCD + Buzzer) Terminal (Col 27J)",
          "bcm": 18
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO2 (Pin 3, Col 2A) -> Welcome Device (PIR + LCD + Buzzer) Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO3 (Pin 5, Col 3A) -> Welcome Device (PIR + LCD + Buzzer) Terminal (Col 25A)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO17 (Pin 11, Col 6A) -> Welcome Device (PIR + LCD + Buzzer) Terminal (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO18 (Pin 12, Col 6J) -> Welcome Device (PIR + LCD + Buzzer) Terminal (Col 27J)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Welcome Device (PI"
      }
    ]
  },
  {
    "id": "3.1.3",
    "title": "Reversing Alarm Radar",
    "category": "Extension",
    "slug": "3.1.3_reversing_alarm.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/3.1.3_reversing_alarm.html",
    "description": "Car backup proximity radar that beeps faster and displays distance on LCD as obstacles approach.",
    "bcm_pins": [
      23,
      24,
      17,
      2,
      3
    ],
    "youtube_id": "SoAGLXoQ5XI",
    "youtube_title": "Ultrasonic Parking Radar",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Reversing_Alarm.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one3.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image242.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image243.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Reversing_Alarm.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one3.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image242.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image243.jpeg"
    ],
    "python_file": "3.1.3_ReversingAlarm.py",
    "python_code": "#!/usr/bin/env python3\nimport LCD1602\nimport time\nimport RPi.GPIO as GPIO\n\nTRIG = 16\nECHO = 18\nBUZZER = 11\n\ndef lcdsetup():\n    LCD1602.init(0x27, 1)\t# init(slave address, background light)\n    LCD1602.clear()    \n    LCD1602.write(0, 0, 'Ultrasonic Starting')\n    LCD1602.write(1, 1, 'By SunFounder')\n    time.sleep(2)\n\ndef setup():\n    GPIO.setmode(GPIO.BOARD)\n    GPIO.setup(TRIG, GPIO.OUT)\n    GPIO.setup(ECHO, GPIO.IN)\n    GPIO.setup(BUZZER, GPIO.OUT, initial=GPIO.LOW)\n    lcdsetup()\n\ndef distance():\n    GPIO.output(TRIG, 0)\n    time.sleep(0.000002)\n\n    GPIO.output(TRIG, 1)\n    time.sleep(0.00001)\n    GPIO.output(TRIG, 0)\n\n    while GPIO.input(ECHO) == 0:\n        a = 0\n    time1 = time.time()\n    while GPIO.input(ECHO) == 1:\n        a = 1\n    time2 = time.time()\n\n    during = time2 - time1\n    return during * 340 / 2 * 100\n\ndef destroy():\n    GPIO.output(BUZZER, GPIO.LOW)\n    GPIO.cleanup()\n    LCD1602.clear()\n\ndef loop():\n    while True:\n        dis = distance()\n        print (dis, 'cm')\n        print ('')\n        GPIO.output(BUZZER, GPIO.LOW)\n        if (dis > 400):\n            LCD1602.clear()\n            LCD1602.write(0, 0, 'Error')\n            LCD1602.write(3, 1, 'Out of range')\n            time.sleep(0.5)\n        else:\n            LCD1602.clear()\n            LCD1602.write(0, 0, 'Distance is')\n            LCD1602.write(5, 1, str(round(dis,2)) +' cm')\n            if(dis>=50):\n                time.sleep(0.5)\n            elif(dis<50 and dis>20):\n                for i in range(0,2,1):\n                    GPIO.output(BUZZER, GPIO.HIGH)\n                    time.sleep(0.05)\n                    GPIO.output(BUZZER, GPIO.LOW)\n                    time.sleep(0.2)\n            elif(dis<=20):\n                for i in range(0,5,1):\n                    GPIO.output(BUZZER, GPIO.HIGH)\n                    time.sleep(0.05)\n                    GPIO.output(BUZZER, GPIO.LOW)\n                    time.sleep(0.05)\n\nif __name__ == \"__main__\":\n    setup()\n    try:        \n        loop()\n    except KeyboardInterrupt:\n        destroy()\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image242.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "buzzer",
          "label": "Reversing Alarm Ra",
          "bcm": 23,
          "pins": [
            {
              "col": 24,
              "row": "F",
              "name": "G23"
            },
            {
              "col": 25,
              "row": "F",
              "name": "G24"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 8,
            "row": "J",
            "pin": 16,
            "bcm": 23
          },
          "to": {
            "col": 24,
            "row": "J"
          },
          "color": "#2196f3",
          "label": "GPIO23 (Pin 16, Col 8J) -> Reversing Alarm Radar Terminal (Col 24J)",
          "bcm": 23
        },
        {
          "from": {
            "col": 9,
            "row": "J",
            "pin": 18,
            "bcm": 24
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO24 (Pin 18, Col 9J) -> Reversing Alarm Radar Terminal (Col 25J)",
          "bcm": 24
        },
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO17 (Pin 11, Col 6A) -> Reversing Alarm Radar Terminal (Col 26A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 2,
            "row": "A",
            "pin": 3,
            "bcm": 2
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#9c27b0",
          "label": "GPIO2 (Pin 3, Col 2A) -> Reversing Alarm Radar Terminal (Col 27A)",
          "bcm": 2
        },
        {
          "from": {
            "col": 3,
            "row": "A",
            "pin": 5,
            "bcm": 3
          },
          "to": {
            "col": 28,
            "row": "A"
          },
          "color": "#00bcd4",
          "label": "GPIO3 (Pin 5, Col 3A) -> Reversing Alarm Radar Terminal (Col 28A)",
          "bcm": 3
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO23 (Pin 16, Col 8J) -> Reversing Alarm Radar Terminal (Col 24J)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO24 (Pin 18, Col 9J) -> Reversing Alarm Radar Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO17 (Pin 11, Col 6A) -> Reversing Alarm Radar Terminal (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO2 (Pin 3, Col 2A) -> Reversing Alarm Radar Terminal (Col 27A)"
      },
      {
        "kind": "wire",
        "color": "#00bcd4",
        "text": "GPIO3 (Pin 5, Col 3A) -> Reversing Alarm Radar Terminal (Col 28A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Reversing Alarm Ra"
      }
    ]
  },
  {
    "id": "3.1.4",
    "title": "Smart Fan (Thermistor + Motor + Button)",
    "category": "Extension",
    "slug": "3.1.4_smart_fan.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/3.1.4_smart_fan.html",
    "description": "Automatically activate DC cooling fan when ambient temperature exceeds threshold or manual button override.",
    "bcm_pins": [
      17,
      18,
      27,
      5,
      6
    ],
    "youtube_id": "yJdN6LmGqvc",
    "youtube_title": "Smart Temperature-Controlled Fan",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Smart_Fan.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one4.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image245.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image246.png",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/mcp3008_and_adc0834.jpg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Smart_Fan.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one4.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image245.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image118.jpeg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image246.png"
    ],
    "python_file": "3.1.4_SmartFan.py",
    "python_code": "import RPi.GPIO as GPIO\nimport time\nimport ADC0834\nimport math\n\n# Set up pins\nMotorPin1   = 5\nMotorPin2   = 6\nMotorEnable = 13\nBtnPin  = 22\n\n\ndef setup():\n    global p_M1,p_M2\n    ADC0834.setup()\n    GPIO.setmode(GPIO.BCM)\n    GPIO.setup(MotorPin1, GPIO.OUT)\n    GPIO.setup(MotorPin2, GPIO.OUT)\n    p_M1=GPIO.PWM(MotorPin1,2000)\n    p_M2=GPIO.PWM(MotorPin2,2000)\n    p_M1.start(0)\n    p_M2.start(0)\n    GPIO.setup(MotorEnable, GPIO.OUT, initial=GPIO.LOW)\n    GPIO.setup(BtnPin, GPIO.IN)\n\ndef temperature():\n    analogVal = ADC0834.getResult()\n    Vr = 5 * float(analogVal) / 255\n    Rt = 10000 * Vr / (5 - Vr)\n    temp = 1/(((math.log(Rt / 10000)) / 3950) + (1 / (273.15+25)))\n    Cel = temp - 273.15\n    Fah = Cel * 1.8 + 32\n    return Cel\n\ndef motor(level):\n    if level == 0:\n        GPIO.output(MotorEnable, GPIO.LOW)\n        return 0\n    if level>=4:\n        level = 4\n    GPIO.output(MotorEnable, GPIO.HIGH)\n    p_M1.ChangeDutyCycle(level*25)\n    return level\n\n\ndef main():\n    lastState=0\n    level=0\n    markTemp = temperature()\n    while True:\n        currentState =GPIO.input(BtnPin)\n        currentTemp=temperature()\n        if currentState == 1 and lastState == 0:\n            level=(level+1)%5\n            markTemp = currentTemp\n            time.sleep(0.5)\n        lastState=currentState\n        if level!=0:\n            if currentTemp-markTemp <= -2:\n                level = level -1\n                markTemp=currentTemp            \n            if currentTemp-markTemp >= 2:\n                level = level +1\n                markTemp=currentTemp             \n        level = motor(level)\n\t\t\n\ndef destroy():\n\tGPIO.output(MotorEnable, GPIO.LOW)\n\tp_M1.stop()\n\tp_M2.stop()\n\tGPIO.cleanup()    \n\nif __name__ == '__main__':\n\tsetup()\n\ttry:\n\t\tmain()\n\texcept KeyboardInterrupt:\n\t\tdestroy()\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image245.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image118.jpeg"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "ic",
          "label": "ULN2003 / L293D",
          "startCol": 24,
          "cols": 5,
          "topRow": "F",
          "botRow": "E"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> Smart Fan (Thermistor + Motor + Button) Terminal (Col 24A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Pin 12, Col 6J) -> Smart Fan (Thermistor + Motor + Button) Terminal (Col 25J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Pin 13, Col 7A) -> Smart Fan (Thermistor + Motor + Button) Terminal (Col 26A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 15,
            "row": "A",
            "pin": 29,
            "bcm": 5
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#9c27b0",
          "label": "GPIO5 (Pin 29, Col 15A) -> Smart Fan (Thermistor + Motor + Button) Terminal (Col 27A)",
          "bcm": 5
        },
        {
          "from": {
            "col": 16,
            "row": "A",
            "pin": 31,
            "bcm": 6
          },
          "to": {
            "col": 28,
            "row": "A"
          },
          "color": "#00bcd4",
          "label": "GPIO6 (Pin 31, Col 16A) -> Smart Fan (Thermistor + Motor + Button) Terminal (Col 28A)",
          "bcm": 6
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> Smart Fan (Thermistor + Motor + Button) Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Pin 12, Col 6J) -> Smart Fan (Thermistor + Motor + Button) Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Pin 13, Col 7A) -> Smart Fan (Thermistor + Motor + Button) Terminal (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO5 (Pin 29, Col 15A) -> Smart Fan (Thermistor + Motor + Button) Terminal (Col 27A)"
      },
      {
        "kind": "wire",
        "color": "#00bcd4",
        "text": "GPIO6 (Pin 31, Col 16A) -> Smart Fan (Thermistor + Motor + Button) Terminal (Col 28A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place ULN2003 / L293D"
      }
    ]
  },
  {
    "id": "3.1.5",
    "title": "Battery Level Indicator",
    "category": "Extension",
    "slug": "3.1.5_battery_indicator.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/3.1.5_battery_indicator.html",
    "description": "Display simulated battery charge levels on a 10-segment LED bar graph via potentiometer.",
    "bcm_pins": [
      17,
      18,
      27,
      25,
      12,
      16,
      20,
      21,
      5,
      6,
      13,
      19,
      26
    ],
    "youtube_id": "yJdN6LmGqvc",
    "youtube_title": "LED Bar Voltage Gauge",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Battery_Indicator.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one5.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image248.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image249.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/mcp3008_and_adc0834.jpg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Battery_Indicator.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one5.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image248.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image249.jpeg"
    ],
    "python_file": "3.1.5_BatteryIndicator.py",
    "python_code": "\nimport RPi.GPIO as GPIO\nimport ADC0834\nimport time\n\nledPins = [25, 12, 16, 20, 21, 5, 6, 13, 19, 26]\n\ndef setup():\n    GPIO.setmode(GPIO.BCM)\n    ADC0834.setup()\n    for i in ledPins:\n        GPIO.setup(i, GPIO.OUT)\n        GPIO.output(i, GPIO.HIGH)\n\ndef LedBarGraph(value):\n    for i in ledPins:\n        GPIO.output(i,GPIO.HIGH)\n    for i in range(value):\n        GPIO.output(ledPins[i],GPIO.LOW)\n\ndef destroy():\n    GPIO.cleanup()\n\ndef loop():\n    while True:\n        analogVal = ADC0834.getResult()\n        LedBarGraph(int(analogVal/25))\n\nif __name__ == '__main__':\n    setup()\n    try:\n        loop()\n    except KeyboardInterrupt: # When 'Ctrl+C' is pressed, the program destroy() will be executed.\n        destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image248.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "ic",
          "label": "ADC0834",
          "startCol": 24,
          "cols": 7,
          "topRow": "F",
          "botRow": "E"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> Battery Level Indicator Terminal (Col 24A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Pin 12, Col 6J) -> Battery Level Indicator Terminal (Col 25J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Pin 13, Col 7A) -> Battery Level Indicator Terminal (Col 26A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 11,
            "row": "J",
            "pin": 22,
            "bcm": 25
          },
          "to": {
            "col": 27,
            "row": "J"
          },
          "color": "#9c27b0",
          "label": "GPIO25 (Pin 22, Col 11J) -> Battery Level Indicator Terminal (Col 27J)",
          "bcm": 25
        },
        {
          "from": {
            "col": 16,
            "row": "J",
            "pin": 32,
            "bcm": 12
          },
          "to": {
            "col": 28,
            "row": "J"
          },
          "color": "#00bcd4",
          "label": "GPIO12 (Pin 32, Col 16J) -> Battery Level Indicator Terminal (Col 28J)",
          "bcm": 12
        },
        {
          "from": {
            "col": 18,
            "row": "J",
            "pin": 36,
            "bcm": 16
          },
          "to": {
            "col": 29,
            "row": "J"
          },
          "color": "#e91e63",
          "label": "GPIO16 (Pin 36, Col 18J) -> Battery Level Indicator Terminal (Col 29J)",
          "bcm": 16
        },
        {
          "from": {
            "col": 19,
            "row": "J",
            "pin": 38,
            "bcm": 20
          },
          "to": {
            "col": 30,
            "row": "J"
          },
          "color": "#8bc34a",
          "label": "GPIO20 (Pin 38, Col 19J) -> Battery Level Indicator Terminal (Col 30J)",
          "bcm": 20
        },
        {
          "from": {
            "col": 20,
            "row": "J",
            "pin": 40,
            "bcm": 21
          },
          "to": {
            "col": 31,
            "row": "J"
          },
          "color": "#ffc107",
          "label": "GPIO21 (Pin 40, Col 20J) -> Battery Level Indicator Terminal (Col 31J)",
          "bcm": 21
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> Battery Level Indicator Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Pin 12, Col 6J) -> Battery Level Indicator Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Pin 13, Col 7A) -> Battery Level Indicator Terminal (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO25 (Pin 22, Col 11J) -> Battery Level Indicator Terminal (Col 27J)"
      },
      {
        "kind": "wire",
        "color": "#00bcd4",
        "text": "GPIO12 (Pin 32, Col 16J) -> Battery Level Indicator Terminal (Col 28J)"
      },
      {
        "kind": "wire",
        "color": "#e91e63",
        "text": "GPIO16 (Pin 36, Col 18J) -> Battery Level Indicator Terminal (Col 29J)"
      },
      {
        "kind": "wire",
        "color": "#8bc34a",
        "text": "GPIO20 (Pin 38, Col 19J) -> Battery Level Indicator Terminal (Col 30J)"
      },
      {
        "kind": "wire",
        "color": "#ffc107",
        "text": "GPIO21 (Pin 40, Col 20J) -> Battery Level Indicator Terminal (Col 31J)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place ADC0834"
      }
    ]
  },
  {
    "id": "3.1.6",
    "title": "Motion-Controlled Servo",
    "category": "Extension",
    "slug": "3.1.6_motion_control.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/3.1.6_motion_control.html",
    "description": "Steer a servo horn interactively using an analog joystick via ADC0834.",
    "bcm_pins": [
      17,
      18,
      27,
      22
    ],
    "youtube_id": "T6HsRRXBVS8",
    "youtube_title": "Joystick Servo Pointer",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Motion_Control.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one6.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image251.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image252.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Motion_Control.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one6.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image251.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image252.jpeg"
    ],
    "python_file": "3.1.6_MotionControl.py",
    "python_code": "#!/usr/bin/python3\n\nimport RPi.GPIO as GPIO\nimport smbus\nimport math\nimport time\n\n\n\n# Power management registers\npower_mgmt_1 = 0x6b\npower_mgmt_2 = 0x6c\n\nbus = smbus.SMBus(1) \naddress = 0x68     \nbus.write_byte_data(address, power_mgmt_1, 0)\n\n#Stepper motor pins\nmotorPin = (18,23,24,25) \nrolePerMinute =15\nstepsPerRevolution = 2048\nstepSpeed = (60/rolePerMinute)/stepsPerRevolution\n\n#mpu6050\ndef read_byte(adr):\n    return bus.read_byte_data(address, adr)\n\ndef read_word(adr):\n    high = bus.read_byte_data(address, adr)\n    low = bus.read_byte_data(address, adr+1)\n    val = (high << 8) + low\n    return val\n\ndef read_word_2c(adr):\n    val = read_word(adr)\n    if (val >= 0x8000):\n        return -((65535 - val) + 1)\n    else:\n        return val\n\ndef dist(a,b):\n    return math.sqrt((a*a)+(b*b))\n\ndef get_y_rotation(x,y,z):\n    radians = math.atan2(x, dist(y,z))\n    return -math.degrees(radians)\n\ndef get_x_rotation(x,y,z):\n    radians = math.atan2(y, dist(x,z))\n    return math.degrees(radians)\n\ndef mpu6050():\n    accel_xout = read_word_2c(0x3b)\n    accel_yout = read_word_2c(0x3d)\n    accel_zout = read_word_2c(0x3f)\n    accel_xout_scaled = accel_xout / 16384.0\n    accel_yout_scaled = accel_yout / 16384.0\n    accel_zout_scaled = accel_zout / 16384.0\n    angle=get_y_rotation(accel_xout_scaled, accel_yout_scaled, accel_zout_scaled)\n    return angle\n\n#Stepper Motor\ndef rotary(direction):\n    if(direction == 'c'):   \n        for j in range(4):\n            for i in range(4):\n                GPIO.output(motorPin[i],0x99>>j & (0x08>>i))\n            time.sleep(stepSpeed)\n\n    elif(direction == 'a'):\n        for j in range(4):\n            for i in range(4):\n                GPIO.output(motorPin[i],0x99<<j & (0x80>>i))\n            time.sleep(stepSpeed)\n\n\ndef setup():\n    GPIO.setwarnings(False)\n    GPIO.setmode(GPIO.BCM)\n    for i in motorPin:\n        GPIO.setup(i, GPIO.OUT)\n\n\ndef loop():\n    while True:\n        angle=mpu6050()\n        if angle >=45 :\n            rotary('a')\n        elif angle <=-45:\n            rotary('c')\n\ndef destroy():\n    GPIO.cleanup()   \n\nif __name__ == '__main__':    \n    setup()\n    try:\n        loop()        \n    except KeyboardInterrupt:\n        destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image251.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "module",
          "label": "Motion-Controlled Serv",
          "startCol": 24,
          "row": "F",
          "widthCols": 4,
          "pins": [
            {
              "col": 24,
              "row": "E",
              "name": "G17"
            },
            {
              "col": 25,
              "row": "F",
              "name": "G18"
            },
            {
              "col": 26,
              "row": "E",
              "name": "G27"
            },
            {
              "col": 27,
              "row": "E",
              "name": "G22"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> Motion-Controlled Servo Terminal (Col 24A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Pin 12, Col 6J) -> Motion-Controlled Servo Terminal (Col 25J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Pin 13, Col 7A) -> Motion-Controlled Servo Terminal (Col 26A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#9c27b0",
          "label": "GPIO22 (Pin 15, Col 8A) -> Motion-Controlled Servo Terminal (Col 27A)",
          "bcm": 22
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> Motion-Controlled Servo Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Pin 12, Col 6J) -> Motion-Controlled Servo Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Pin 13, Col 7A) -> Motion-Controlled Servo Terminal (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO22 (Pin 15, Col 8A) -> Motion-Controlled Servo Terminal (Col 27A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Motion-Controlled Serv"
      }
    ]
  },
  {
    "id": "3.1.7",
    "title": "Smart Traffic Light System",
    "category": "Extension",
    "slug": "3.1.7_traffic_light.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/3.1.7_traffic_light.html",
    "description": "Simulate real municipal traffic light cycles (Red -> Green -> Yellow) with pedestrian crossing button and countdown timer display.",
    "bcm_pins": [
      24,
      23,
      18,
      10,
      22,
      27,
      17,
      25,
      8,
      7
    ],
    "youtube_id": "yJdN6LmGqvc",
    "youtube_title": "Pedestrian Traffic Light with Countdown",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Traffic_Light.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one7.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image254.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/IMG_8319.jpg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Traffic_Light.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one7.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image254.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/IMG_8319.jpg"
    ],
    "python_file": "3.1.7_TrafficLight.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\nimport threading\n\n#define the pins connect to 74HC595\nSDI   = 24      #serial data input(DS)\nRCLK  = 23     #memory clock input(STCP)\nSRCLK = 18      #shift register clock input(SHCP)\nnumber = (0xc0,0xf9,0xa4,0xb0,0x99,0x92,0x82,0xf8,0x80,0x90)\n\nplacePin = (10,22,27,17)\nledPin =(25,8,7)\n\ngreenLight = 30\nyellowLight = 5\nredLight = 60\nlightColor=(\"Red\",\"Green\",\"Yellow\")\n\ncolorState=0\ncounter = 60\ntimer1 = 0\n\n\ndef setup():\n    GPIO.setmode(GPIO.BCM)\n    GPIO.setup(SDI, GPIO.OUT)\n    GPIO.setup(RCLK, GPIO.OUT)\n    GPIO.setup(SRCLK, GPIO.OUT)\n    for pin in placePin:\n        GPIO.setup(pin,GPIO.OUT)\n    for pin in ledPin:\n        GPIO.setup(pin,GPIO.OUT)\n    global timer1\n    timer1 = threading.Timer(1.0,timer)\n    timer1.start()\n\ndef clearDisplay():\n    for i in range(8):\n        GPIO.output(SDI, 1)\n        GPIO.output(SRCLK, GPIO.HIGH)\n        GPIO.output(SRCLK, GPIO.LOW)\n    GPIO.output(RCLK, GPIO.HIGH)\n    GPIO.output(RCLK, GPIO.LOW)\n\ndef hc595_shift(data):\n    for i in range(8):\n        GPIO.output(SDI, 0x80 & (data << i))\n        GPIO.output(SRCLK, GPIO.HIGH)\n        GPIO.output(SRCLK, GPIO.LOW)\n    GPIO.output(RCLK, GPIO.HIGH)\n    GPIO.output(RCLK, GPIO.LOW)\n\ndef pickDigit(digit):\n    for i in placePin:\n        GPIO.output(i,GPIO.LOW)\n    GPIO.output(placePin[digit], GPIO.HIGH)\n\ndef timer():        #timer function\n    global counter\n    global colorState\n    global timer1\n    timer1 = threading.Timer(1.0,timer)\n    timer1.start()\n    counter-=1\n    if (counter is 0):\n        if(colorState is 0):\n            counter= greenLight\n        if(colorState is 1):\n            counter=yellowLight\n        if (colorState is 2):\n            counter=redLight\n        colorState=(colorState+1)%3\n    print (\"counter : %d    color: %s \"%(counter,lightColor[colorState]))\n\ndef lightup():\n    global colorState\n    for i in range(0,3):\n        GPIO.output(ledPin[i], GPIO.HIGH)\n    GPIO.output(ledPin[colorState], GPIO.LOW)\n\ndef display():\n    global counter\n\n    a = counter % 10000//1000 + counter % 1000//100\n    b = counter % 10000//1000 + counter % 1000//100 + counter % 100//10\n    c = counter % 10000//1000 + counter % 1000//100 + counter % 100//10 + counter % 10\n\n    if (counter % 10000//1000 == 0):\n        clearDisplay()\n    else:\n        clearDisplay()\n        pickDigit(3)\n        hc595_shift(number[counter % 10000//1000])\n\n    if (a == 0):\n        clearDisplay()\n    else:\n        clearDisplay()\n        pickDigit(2)\n        hc595_shift(number[counter % 1000//100])\n\n    if (b == 0):\n        clearDisplay()\n    else:\n        clearDisplay()\n        pickDigit(1)\n        hc595_shift(number[counter % 100//10])\n\n    if(c == 0):\n        clearDisplay()\n    else:\n        clearDisplay()\n        pickDigit(0)\n        hc595_shift(number[counter % 10])\n\ndef loop():\n    while True:\n        display()\n        lightup()\n\ndef destroy():   # When \"Ctrl+C\" is pressed, the function is executed.\n    global timer1\n    GPIO.cleanup()\n    timer1.cancel()      #cancel the timer\n\nif __name__ == '__main__': # Program starting from here\n    setup()\n    try:\n        loop()\n    except KeyboardInterrupt:\n        destroy()\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image254.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "ic",
          "label": "74HC595",
          "startCol": 24,
          "cols": 7,
          "topRow": "F",
          "botRow": "E"
        },
        {
          "type": "seg7",
          "label": "7-Seg",
          "startCol": 32,
          "cols": 3,
          "topRow": "I",
          "botRow": "B"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 9,
            "row": "J",
            "pin": 18,
            "bcm": 24
          },
          "to": {
            "col": 24,
            "row": "J"
          },
          "color": "#2196f3",
          "label": "GPIO24 (Pin 18, Col 9J) -> Smart Traffic Light System Terminal (Col 24J)",
          "bcm": 24
        },
        {
          "from": {
            "col": 8,
            "row": "J",
            "pin": 16,
            "bcm": 23
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO23 (Pin 16, Col 8J) -> Smart Traffic Light System Terminal (Col 25J)",
          "bcm": 23
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 26,
            "row": "J"
          },
          "color": "#ff9800",
          "label": "GPIO18 (Pin 12, Col 6J) -> Smart Traffic Light System Terminal (Col 26J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 10,
            "row": "A",
            "pin": 19,
            "bcm": 10
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#9c27b0",
          "label": "GPIO10 (Pin 19, Col 10A) -> Smart Traffic Light System Terminal (Col 27A)",
          "bcm": 10
        },
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 28,
            "row": "A"
          },
          "color": "#00bcd4",
          "label": "GPIO22 (Pin 15, Col 8A) -> Smart Traffic Light System Terminal (Col 28A)",
          "bcm": 22
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 29,
            "row": "A"
          },
          "color": "#e91e63",
          "label": "GPIO27 (Pin 13, Col 7A) -> Smart Traffic Light System Terminal (Col 29A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 30,
            "row": "A"
          },
          "color": "#8bc34a",
          "label": "GPIO17 (Pin 11, Col 6A) -> Smart Traffic Light System Terminal (Col 30A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 11,
            "row": "J",
            "pin": 22,
            "bcm": 25
          },
          "to": {
            "col": 31,
            "row": "J"
          },
          "color": "#ffc107",
          "label": "GPIO25 (Pin 22, Col 11J) -> Smart Traffic Light System Terminal (Col 31J)",
          "bcm": 25
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO24 (Pin 18, Col 9J) -> Smart Traffic Light System Terminal (Col 24J)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO23 (Pin 16, Col 8J) -> Smart Traffic Light System Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO18 (Pin 12, Col 6J) -> Smart Traffic Light System Terminal (Col 26J)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO10 (Pin 19, Col 10A) -> Smart Traffic Light System Terminal (Col 27A)"
      },
      {
        "kind": "wire",
        "color": "#00bcd4",
        "text": "GPIO22 (Pin 15, Col 8A) -> Smart Traffic Light System Terminal (Col 28A)"
      },
      {
        "kind": "wire",
        "color": "#e91e63",
        "text": "GPIO27 (Pin 13, Col 7A) -> Smart Traffic Light System Terminal (Col 29A)"
      },
      {
        "kind": "wire",
        "color": "#8bc34a",
        "text": "GPIO17 (Pin 11, Col 6A) -> Smart Traffic Light System Terminal (Col 30A)"
      },
      {
        "kind": "wire",
        "color": "#ffc107",
        "text": "GPIO25 (Pin 22, Col 11J) -> Smart Traffic Light System Terminal (Col 31J)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 74HC595"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 7-Seg"
      }
    ]
  },
  {
    "id": "3.1.8",
    "title": "Overheat Monitor",
    "category": "Extension",
    "slug": "3.1.8_overheat_monitor.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/3.1.8_overheat_monitor.html",
    "description": "Trigger an alarm siren and RGB warning light when thermistor detects thermal threshold breach.",
    "bcm_pins": [
      17,
      18,
      27,
      2,
      3,
      22
    ],
    "youtube_id": "4CquOUVMvJc",
    "youtube_title": "Temperature Warning System",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Overheat_Monitor.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one8.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image258.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image259.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/mcp3008_and_adc0834.jpg",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Overheat_Monitor.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Overheat_Monitor2.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one8.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image258.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image259.jpeg"
    ],
    "python_file": "3.1.8_OverheatMonitor.py",
    "python_code": "#!/usr/bin/env python3\n\nimport LCD1602\nimport RPi.GPIO as GPIO\nimport ADC0834\nimport time\nimport math\n\nJoy_BtnPin = 22\nbuzzPin = 23\nledPin = 24\n\n\nupperTem = 40\n\ndef setup():\n    ADC0834.setup()\n    GPIO.setmode(GPIO.BCM)\n    GPIO.setup(ledPin, GPIO.OUT, initial=GPIO.LOW)\n    GPIO.setup(buzzPin, GPIO.OUT, initial=GPIO.LOW)\n    GPIO.setup(Joy_BtnPin, GPIO.IN, pull_up_down=GPIO.PUD_UP)\n    LCD1602.init(0x27, 1)\n\ndef get_joystick_value():\n    x_val = ADC0834.getResult(1)\n    y_val = ADC0834.getResult(2)\n    if(x_val > 200):\n        return 1\n    elif(x_val < 50):\n        return -1\n    elif(y_val > 200):\n        return -10\n    elif(y_val < 50):\n        return 10\n    else:\n        return 0\n\ndef upper_tem_setting():\n    global upperTem\n    LCD1602.write(0, 0, 'Upper Adjust: ')\n    change = int(get_joystick_value())\n    upperTem = upperTem + change\n    strUpperTem = str(upperTem)\n    LCD1602.write(0, 1, strUpperTem)\n    LCD1602.write(len(strUpperTem),1, '              ')\n    time.sleep(0.1)\n\ndef temperature():\n    analogVal = ADC0834.getResult()\n    Vr = 5 * float(analogVal) / 255\n    Rt = 10000 * Vr / (5 - Vr)\n    temp = 1/(((math.log(Rt / 10000)) / 3950) + (1 / (273.15+25)))\n    Cel = temp - 273.15\n    Fah = Cel * 1.8 + 32\n    return round(Cel,2)\n\ndef monitoring_temp():\n    global upperTem\n    Cel=temperature()\n    LCD1602.write(0, 0, 'Temp: ')\n    LCD1602.write(0, 1, 'Upper: ')\n    LCD1602.write(6, 0, str(Cel))\n    LCD1602.write(7, 1, str(upperTem))\n    time.sleep(0.1)\n    if Cel >= upperTem:\n        GPIO.output(buzzPin, GPIO.HIGH)\n        GPIO.output(ledPin, GPIO.HIGH)\n    else:\n        GPIO.output(buzzPin, GPIO.LOW)\n        GPIO.output(ledPin, GPIO.LOW)       \n\ndef loop():\n    lastState=1\n    stage=0\n    while True:\n        currentState=GPIO.input(Joy_BtnPin)\n        if currentState==1 and lastState ==0:\n            stage=(stage+1)%2\n            time.sleep(0.1)    \n            LCD1602.clear()\n        lastState=currentState\n        if stage == 1:\n            upper_tem_setting()\n        else:\n            monitoring_temp()\n    \ndef destroy():\n    LCD1602.clear() \n    ADC0834.destroy()\n    GPIO.cleanup()\n\nif __name__ == '__main__':     # Program start from here\n    try:\n        setup()\n        while True:\n            loop()\n    except KeyboardInterrupt:   # When 'Ctrl+C' is pressed, the program destroy() will be executed.\n        destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image258.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "ic",
          "label": "ADC0834",
          "startCol": 24,
          "cols": 7,
          "topRow": "F",
          "botRow": "E"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> Overheat Monitor Terminal (Col 24A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Pin 12, Col 6J) -> Overheat Monitor Terminal (Col 25J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Pin 13, Col 7A) -> Overheat Monitor Terminal (Col 26A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 2,
            "row": "A",
            "pin": 3,
            "bcm": 2
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#9c27b0",
          "label": "GPIO2 (Pin 3, Col 2A) -> Overheat Monitor Terminal (Col 27A)",
          "bcm": 2
        },
        {
          "from": {
            "col": 3,
            "row": "A",
            "pin": 5,
            "bcm": 3
          },
          "to": {
            "col": 28,
            "row": "A"
          },
          "color": "#00bcd4",
          "label": "GPIO3 (Pin 5, Col 3A) -> Overheat Monitor Terminal (Col 28A)",
          "bcm": 3
        },
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 29,
            "row": "A"
          },
          "color": "#e91e63",
          "label": "GPIO22 (Pin 15, Col 8A) -> Overheat Monitor Terminal (Col 29A)",
          "bcm": 22
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> Overheat Monitor Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Pin 12, Col 6J) -> Overheat Monitor Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Pin 13, Col 7A) -> Overheat Monitor Terminal (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO2 (Pin 3, Col 2A) -> Overheat Monitor Terminal (Col 27A)"
      },
      {
        "kind": "wire",
        "color": "#00bcd4",
        "text": "GPIO3 (Pin 5, Col 3A) -> Overheat Monitor Terminal (Col 28A)"
      },
      {
        "kind": "wire",
        "color": "#e91e63",
        "text": "GPIO22 (Pin 15, Col 8A) -> Overheat Monitor Terminal (Col 29A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place ADC0834"
      }
    ]
  },
  {
    "id": "3.1.9",
    "title": "Keypad Password Lock",
    "category": "Extension",
    "slug": "3.1.9_password_lock.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/3.1.9_password_lock.html",
    "description": "4x4 Keypad PIN entry lock with LCD prompt, correct PIN unlock chime, and intruder alert.",
    "bcm_pins": [
      17,
      18,
      27,
      22,
      23,
      24,
      25,
      4,
      2,
      3
    ],
    "youtube_id": "wuCABxky94g",
    "youtube_title": "Digital Security Lock",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Password_Lock.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one9.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image262.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image263.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Password_Lock.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one9.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image262.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image263.jpeg"
    ],
    "python_file": "3.1.9_PasswordLock.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO \nimport time\nimport LCD1602\n\n##################### HERE IS THE KEYPAD LIBRARY TRANSPLANTED FROM Arduino ############\n#class Key:Define some of the properties of Key\nclass Keypad():\n\n    def __init__(self, rowsPins, colsPins, keys):\n        self.rowsPins = rowsPins\n        self.colsPins = colsPins\n        self.keys = keys\n        GPIO.setwarnings(False)\n        GPIO.setmode(GPIO.BCM)\n        GPIO.setup(self.rowsPins, GPIO.OUT, initial=GPIO.LOW)\n        GPIO.setup(self.colsPins, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)\n\n    def read(self):\n        pressed_keys = []\n        for i, row in enumerate(self.rowsPins):\n            GPIO.output(row, GPIO.HIGH)\n            for j, col in enumerate(self.colsPins):\n                index = i * len(self.colsPins) + j\n                if (GPIO.input(col) == 1):\n                    pressed_keys.append(self.keys[index])\n            GPIO.output(row, GPIO.LOW)\n        return pressed_keys\n\n################ EXAMPLE CODE START HERE ################        \nLENS = 4\npassword=['1','9','8','4']\ntestword=['0','0','0','0']\nkeyIndex=0\n   \ndef check():\n    for i in range(0,LENS):\n        if(password[i]!=testword[i]):\n            return 0\n    return 1\n\ndef setup():\n    global keypad, last_key_pressed\n    rowsPins = [18,23,24,25]\n    colsPins = [10,22,27,17]\n    keys = [\"1\",\"2\",\"3\",\"A\",\n            \"4\",\"5\",\"6\",\"B\",\n            \"7\",\"8\",\"9\",\"C\",\n            \"*\",\"0\",\"#\",\"D\"]\n    keypad = Keypad(rowsPins, colsPins, keys)\n    last_key_pressed = []\n    LCD1602.init(0x27, 1)    # init(slave address, background light)\n    LCD1602.clear()\n    LCD1602.write(0, 0, 'WELCOME!')\n    LCD1602.write(2, 1, 'Enter password')\n    time.sleep(2)\n\ndef destroy():\n    LCD1602.clear()\n    GPIO.cleanup()\n\ndef loop():\n    global keyIndex\n    global LENS\n    global keypad, last_key_pressed\n    while(True):\n        pressed_keys = keypad.read()\n        if len(pressed_keys) != 0 and last_key_pressed != pressed_keys:\n            LCD1602.clear()\n            LCD1602.write(0, 0, \"Enter password:\")\n            LCD1602.write(15-keyIndex,1, pressed_keys)\n            testword[keyIndex]=pressed_keys\n            keyIndex+=1\n            if (keyIndex is LENS):\n                if (check() is 0):\n                    LCD1602.clear()\n                    LCD1602.write(3, 0, \"WRONG KEY!\")\n                    LCD1602.write(0, 1, \"please try again\")\n                else:\n                    LCD1602.clear()\n                    LCD1602.write(4, 0, \"CORRECT!\")\n                    LCD1602.write(2, 1, \"welcome back\")\n            keyIndex=keyIndex%LENS\n\n        last_key_pressed = pressed_keys\n        time.sleep(0.1)\n           \nif __name__ == '__main__':     # Program start from here\n    try:\n        setup()\n        loop()\n    except KeyboardInterrupt:  # When 'Ctrl+C' is pressed, the program destroy() will be  executed.\n        destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image262.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "module",
          "label": "4x4 Keypad Header",
          "startCol": 24,
          "row": "E",
          "widthCols": 8,
          "pins": [
            {
              "col": 24,
              "row": "E",
              "name": "G17"
            },
            {
              "col": 25,
              "row": "F",
              "name": "G18"
            },
            {
              "col": 26,
              "row": "E",
              "name": "G27"
            },
            {
              "col": 27,
              "row": "E",
              "name": "G22"
            },
            {
              "col": 28,
              "row": "F",
              "name": "G23"
            },
            {
              "col": 29,
              "row": "F",
              "name": "G24"
            },
            {
              "col": 30,
              "row": "F",
              "name": "G25"
            },
            {
              "col": 31,
              "row": "E",
              "name": "G4"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> Keypad Password Lock Terminal (Col 24A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Pin 12, Col 6J) -> Keypad Password Lock Terminal (Col 25J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Pin 13, Col 7A) -> Keypad Password Lock Terminal (Col 26A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#9c27b0",
          "label": "GPIO22 (Pin 15, Col 8A) -> Keypad Password Lock Terminal (Col 27A)",
          "bcm": 22
        },
        {
          "from": {
            "col": 8,
            "row": "J",
            "pin": 16,
            "bcm": 23
          },
          "to": {
            "col": 28,
            "row": "J"
          },
          "color": "#00bcd4",
          "label": "GPIO23 (Pin 16, Col 8J) -> Keypad Password Lock Terminal (Col 28J)",
          "bcm": 23
        },
        {
          "from": {
            "col": 9,
            "row": "J",
            "pin": 18,
            "bcm": 24
          },
          "to": {
            "col": 29,
            "row": "J"
          },
          "color": "#e91e63",
          "label": "GPIO24 (Pin 18, Col 9J) -> Keypad Password Lock Terminal (Col 29J)",
          "bcm": 24
        },
        {
          "from": {
            "col": 11,
            "row": "J",
            "pin": 22,
            "bcm": 25
          },
          "to": {
            "col": 30,
            "row": "J"
          },
          "color": "#8bc34a",
          "label": "GPIO25 (Pin 22, Col 11J) -> Keypad Password Lock Terminal (Col 30J)",
          "bcm": 25
        },
        {
          "from": {
            "col": 4,
            "row": "A",
            "pin": 7,
            "bcm": 4
          },
          "to": {
            "col": 31,
            "row": "A"
          },
          "color": "#ffc107",
          "label": "GPIO4 (Pin 7, Col 4A) -> Keypad Password Lock Terminal (Col 31A)",
          "bcm": 4
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> Keypad Password Lock Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Pin 12, Col 6J) -> Keypad Password Lock Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Pin 13, Col 7A) -> Keypad Password Lock Terminal (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO22 (Pin 15, Col 8A) -> Keypad Password Lock Terminal (Col 27A)"
      },
      {
        "kind": "wire",
        "color": "#00bcd4",
        "text": "GPIO23 (Pin 16, Col 8J) -> Keypad Password Lock Terminal (Col 28J)"
      },
      {
        "kind": "wire",
        "color": "#e91e63",
        "text": "GPIO24 (Pin 18, Col 9J) -> Keypad Password Lock Terminal (Col 29J)"
      },
      {
        "kind": "wire",
        "color": "#8bc34a",
        "text": "GPIO25 (Pin 22, Col 11J) -> Keypad Password Lock Terminal (Col 30J)"
      },
      {
        "kind": "wire",
        "color": "#ffc107",
        "text": "GPIO4 (Pin 7, Col 4A) -> Keypad Password Lock Terminal (Col 31A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 4x4 Keypad Header"
      }
    ]
  },
  {
    "id": "3.1.10",
    "title": "Burglar Alarm Bell",
    "category": "Extension",
    "slug": "3.1.10_alarm_bell.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/3.1.10_alarm_bell.html",
    "description": "Tripwire security alarm sounding buzzer siren when PIR motion sensor or tilt switch triggers.",
    "bcm_pins": [
      22,
      17,
      27,
      18
    ],
    "youtube_id": "4CquOUVMvJc",
    "youtube_title": "PIR Security Siren",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Alarm_Bell.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one10.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image266.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image267.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_Alarm_Bell.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one10.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image266.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image267.jpeg"
    ],
    "python_file": "3.1.10_AlarmBell.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\nimport threading\n\nBeepPin=22\nALedPin=17\nBLedPin=27\nswitchPin=18\n\nBuzz=0\nflag =0\nnote=150\npitch=20\n\ndef setup():\n    GPIO.setmode(GPIO.BCM)\n    GPIO.setup(BeepPin, GPIO.OUT)\n    GPIO.setup(ALedPin,GPIO.OUT,initial=GPIO.LOW)\n    GPIO.setup(BLedPin,GPIO.OUT,initial=GPIO.LOW)\n    GPIO.setup(switchPin,GPIO.IN)\n    global Buzz\n    Buzz=GPIO.PWM(BeepPin,note)\n\ndef ledWork():\n    while flag:\n        GPIO.output(ALedPin,GPIO.HIGH)\n        time.sleep(0.5)\n        GPIO.output(ALedPin,GPIO.LOW)\n        GPIO.output(BLedPin,GPIO.HIGH)\n        time.sleep(0.5)\n        GPIO.output(BLedPin,GPIO.LOW)\n\ndef buzzerWork():\n    global pitch\n    global note\n    while flag:\n        if note >= 800 or note <=130:\n            pitch = -pitch\n        note = note + pitch \n        Buzz.ChangeFrequency(note)\n        time.sleep(0.01)\n\n\ndef on():\n    global flag\n    flag = 1\n    Buzz.start(50)\n    tBuzz = threading.Thread(target=buzzerWork) \n    tBuzz.start()\n    tLed = threading.Thread(target=ledWork) \n    tLed.start()    \n\ndef off():\n    global flag\n    flag = 0\n    Buzz.stop()\n    GPIO.output(ALedPin,GPIO.LOW)\n    GPIO.output(BLedPin,GPIO.LOW)      \n\n\ndef main():\n    lastState=0\n    while True:\n        currentState =GPIO.input(switchPin)\n        if currentState == 1 and lastState == 0:\n            on()\n        elif currentState == 0 and lastState == 1:\n            off()\n        lastState=currentState\n\n \ndef destroy():\n    off()\n    GPIO.cleanup()\n\n\nif __name__ == '__main__':\n    setup()\n    try:\n        main()\n    except KeyboardInterrupt:\n        destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image266.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "buzzer",
          "label": "Burglar Alarm Bell",
          "bcm": 22,
          "pins": [
            {
              "col": 24,
              "row": "E",
              "name": "G22"
            },
            {
              "col": 25,
              "row": "E",
              "name": "G17"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO22 (Pin 15, Col 8A) -> Burglar Alarm Bell Terminal (Col 24A)",
          "bcm": 22
        },
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 25,
            "row": "A"
          },
          "color": "#4caf50",
          "label": "GPIO17 (Pin 11, Col 6A) -> Burglar Alarm Bell Terminal (Col 25A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Pin 13, Col 7A) -> Burglar Alarm Bell Terminal (Col 26A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 27,
            "row": "J"
          },
          "color": "#9c27b0",
          "label": "GPIO18 (Pin 12, Col 6J) -> Burglar Alarm Bell Terminal (Col 27J)",
          "bcm": 18
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO22 (Pin 15, Col 8A) -> Burglar Alarm Bell Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO17 (Pin 11, Col 6A) -> Burglar Alarm Bell Terminal (Col 25A)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Pin 13, Col 7A) -> Burglar Alarm Bell Terminal (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO18 (Pin 12, Col 6J) -> Burglar Alarm Bell Terminal (Col 27J)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Burglar Alarm Bell"
      }
    ]
  },
  {
    "id": "3.1.11",
    "title": "Morse Code Generator",
    "category": "Extension",
    "slug": "3.1.11_morse_code_generator.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/3.1.11_morse_code_generator.html",
    "description": "Convert text strings into International Morse code dot-and-dash audio buzzes and LED flashes.",
    "bcm_pins": [
      22,
      17
    ],
    "youtube_id": "4CquOUVMvJc",
    "youtube_title": "Morse Code Audio & Light Transmitter",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/3.1.10.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one11.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image269.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image270.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/3.1.10.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one11.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image269.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image270.jpeg"
    ],
    "python_file": "3.1.11_MorseCodeGenerator.py",
    "python_code": "#!/usr/bin/env python3\nimport RPi.GPIO as GPIO\nimport time\n\nBeepPin=22\nALedPin=17\n\nMORSECODE = {\n\t'A':'01', 'B':'1000', 'C':'1010', 'D':'100', 'E':'0', 'F':'0010', 'G':'110',\n\t'H':'0000', 'I':'00', 'J':'0111', 'K':'101', 'L':'0100', 'M':'11', 'N':'10',\n\t'O':'111', 'P':'0110', 'Q':'1101', 'R':'010', 'S':'000', 'T':'1',\n\t'U':'001', 'V':'0001', 'W':'011', 'X':'1001', 'Y':'1011', 'Z':'1100',\n\t'1':'01111', '2':'00111', '3':'00011', '4':'00001', '5':'00000',\n\t'6':'10000', '7':'11000', '8':'11100', '9':'11110', '0':'11111',\n\t'?':'001100', '/':'10010', ',':'110011', '.':'010101', ';':'101010',\n\t'!':'101011', '@':'011010', ':':'111000',\n\t}\n\ndef setup():\n    GPIO.setmode(GPIO.BCM)\n    GPIO.setup(BeepPin, GPIO.OUT, initial=GPIO.LOW)\n    GPIO.setup(ALedPin,GPIO.OUT,initial=GPIO.LOW)\n\ndef on():\n    GPIO.output(BeepPin, 1)\n    GPIO.output(ALedPin, 1)\n\ndef off():\n    GPIO.output(BeepPin, 0)\n    GPIO.output(ALedPin, 0)\n\ndef beep(dt):\t# dt for delay time.\n    on()\n    time.sleep(dt)\n    off()\n    time.sleep(dt)\n\ndef morsecode(code):\n    pause = 0.25\n    for letter in code:\n        for tap in MORSECODE[letter]:\n            if tap == '0':\n                beep(pause/2)\n            if tap == '1':\n                beep(pause)\n        time.sleep(pause)\n\ndef main():\n    while True:\n        code=input(\"Please input the messenger:\")\n        code = code.upper()\n        print(code)\n        morsecode(code)\n\ndef destroy():\n    print(\"\")\n    GPIO.output(BeepPin, GPIO.LOW)\n    GPIO.output(ALedPin, GPIO.LOW)\n    GPIO.cleanup()  \n\nif __name__ == '__main__':\n    setup()\n    try:\n        main()\n    except KeyboardInterrupt:\n        destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image269.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "buzzer",
          "label": "Morse Code Generat",
          "bcm": 22,
          "pins": [
            {
              "col": 24,
              "row": "E",
              "name": "G22"
            },
            {
              "col": 25,
              "row": "E",
              "name": "G17"
            }
          ]
        }
      ],
      "wires": [
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO22 (Pin 15, Col 8A) -> Morse Code Generator Terminal (Col 24A)",
          "bcm": 22
        },
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 25,
            "row": "A"
          },
          "color": "#4caf50",
          "label": "GPIO17 (Pin 11, Col 6A) -> Morse Code Generator Terminal (Col 25A)",
          "bcm": 17
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO22 (Pin 15, Col 8A) -> Morse Code Generator Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO17 (Pin 11, Col 6A) -> Morse Code Generator Terminal (Col 25A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place Morse Code Generat"
      }
    ]
  },
  {
    "id": "3.1.12",
    "title": "Game: Guess Number",
    "category": "Extension",
    "slug": "3.1.12_game_guess_number.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/3.1.12_game_guess_number.html",
    "description": "Interactive number guessing game with 4-digit display hint range (e.g. 0-99).",
    "bcm_pins": [
      17,
      18,
      27,
      22,
      23,
      24,
      25
    ],
    "youtube_id": "az90qK3jmDo",
    "youtube_title": "Guessing Game with Keypad & Display",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_GAME_Guess_Number.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one12.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image273.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image274.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_GAME_Guess_Number.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one12.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image273.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image274.jpeg"
    ],
    "python_file": "3.1.12_GAME_GuessNumber.py",
    "python_code": "#!/usr/bin/env python3\n\nimport RPi.GPIO as GPIO\nimport time\nimport LCD1602\nimport random\n\n##################### HERE IS THE KEYPAD LIBRARY TRANSPLANTED FROM Arduino ############\n#class Key:Define some of the properties of Key\nclass Keypad():\n\n    def __init__(self, rowsPins, colsPins, keys):\n        self.rowsPins = rowsPins\n        self.colsPins = colsPins\n        self.keys = keys\n        GPIO.setwarnings(False)\n        GPIO.setmode(GPIO.BCM)\n        GPIO.setup(self.rowsPins, GPIO.OUT, initial=GPIO.LOW)\n        GPIO.setup(self.colsPins, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)\n\n    def read(self):\n        pressed_keys = []\n        for i, row in enumerate(self.rowsPins):\n            GPIO.output(row, GPIO.HIGH)\n            for j, col in enumerate(self.colsPins):\n                index = i * len(self.colsPins) + j\n                if (GPIO.input(col) == 1):\n                    pressed_keys.append(self.keys[index])\n            GPIO.output(row, GPIO.LOW)\n        return pressed_keys\n\n################ EXAMPLE CODE START HERE ################  \n\ncount = 0\npointValue = 0\nupper=99\nlower=0\n\ndef setup():\n    global keypad, last_key_pressed,keys\n    rowsPins = [18,23,24,25]\n    colsPins = [10,22,27,17]\n    keys = [\"1\",\"2\",\"3\",\"A\",\n            \"4\",\"5\",\"6\",\"B\",\n            \"7\",\"8\",\"9\",\"C\",\n            \"*\",\"0\",\"#\",\"D\"]\n    keypad = Keypad(rowsPins, colsPins, keys)\n    last_key_pressed = []\n    LCD1602.init(0x27, 1)    # init(slave address, background light)\n    LCD1602.clear()\n    LCD1602.write(0, 0, 'Welcome!')\n    LCD1602.write(0, 1, 'Press A to Start!')\n\ndef init_new_value():\n    global pointValue,upper,count,lower\n    pointValue = random.randint(0,99)\n    upper = 99\n    lower = 0\n    count = 0\n    print('point is %d' %(pointValue))\n    \n\ndef detect_point():\n    global count,upper,lower\n    if count > pointValue:\n        if count < upper:\n            upper = count \n    elif count < pointValue:\n        if count > lower:\n            lower = count\n    elif count == pointValue:\n        count = 0\n        return 1\n    count = 0\n    return 0\n\ndef lcd_show_input(result):\n    LCD1602.clear()\n    if result == 1:\n        LCD1602.write(0,1,'You have got it!')\n        time.sleep(5)\n        init_new_value()\n        lcd_show_input(0)\n        return\n    LCD1602.write(0,0,'Enter number:')\n    LCD1602.write(13,0,str(count))\n    LCD1602.write(0,1,str(lower))\n    LCD1602.write(3,1,' < Point < ')\n    LCD1602.write(13,1,str(upper))\n\ndef loop():\n    global keypad, last_key_pressed,count\n    while(True):\n        result = 0\n        pressed_keys = keypad.read()\n        if len(pressed_keys) != 0 and last_key_pressed != pressed_keys:\n            if pressed_keys == [\"A\"]:\n                init_new_value()\n                lcd_show_input(0)\n            elif pressed_keys == [\"D\"]:\n                result = detect_point()\n                lcd_show_input(result)\n            elif pressed_keys[0] in keys:\n                if pressed_keys[0] in list([\"A\",\"B\",\"C\",\"D\",\"#\",\"*\"]):\n                    continue\n                count = count * 10\n                count += int(pressed_keys[0])\n                if count >= 10:\n                    result = detect_point()\n                lcd_show_input(result)\n            print(pressed_keys)\n        last_key_pressed = pressed_keys\n        time.sleep(0.1)\n\n# Define a destroy function for clean up everything after the script finished\ndef destroy():\n    # Release resource\n    GPIO.cleanup()\n    LCD1602.clear() \n\nif __name__ == '__main__':     # Program start from here\n    try:\n        setup()\n        while True:\n            loop()\n    except KeyboardInterrupt:   # When 'Ctrl+C' is pressed, the program destroy() will be executed.\n        destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image273.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "ic",
          "label": "74HC595",
          "startCol": 24,
          "cols": 7,
          "topRow": "F",
          "botRow": "E"
        },
        {
          "type": "seg7",
          "label": "7-Seg",
          "startCol": 32,
          "cols": 3,
          "topRow": "I",
          "botRow": "B"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> Game: Guess Number Terminal (Col 24A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Pin 12, Col 6J) -> Game: Guess Number Terminal (Col 25J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Pin 13, Col 7A) -> Game: Guess Number Terminal (Col 26A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#9c27b0",
          "label": "GPIO22 (Pin 15, Col 8A) -> Game: Guess Number Terminal (Col 27A)",
          "bcm": 22
        },
        {
          "from": {
            "col": 8,
            "row": "J",
            "pin": 16,
            "bcm": 23
          },
          "to": {
            "col": 28,
            "row": "J"
          },
          "color": "#00bcd4",
          "label": "GPIO23 (Pin 16, Col 8J) -> Game: Guess Number Terminal (Col 28J)",
          "bcm": 23
        },
        {
          "from": {
            "col": 9,
            "row": "J",
            "pin": 18,
            "bcm": 24
          },
          "to": {
            "col": 29,
            "row": "J"
          },
          "color": "#e91e63",
          "label": "GPIO24 (Pin 18, Col 9J) -> Game: Guess Number Terminal (Col 29J)",
          "bcm": 24
        },
        {
          "from": {
            "col": 11,
            "row": "J",
            "pin": 22,
            "bcm": 25
          },
          "to": {
            "col": 30,
            "row": "J"
          },
          "color": "#8bc34a",
          "label": "GPIO25 (Pin 22, Col 11J) -> Game: Guess Number Terminal (Col 30J)",
          "bcm": 25
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> Game: Guess Number Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Pin 12, Col 6J) -> Game: Guess Number Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Pin 13, Col 7A) -> Game: Guess Number Terminal (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO22 (Pin 15, Col 8A) -> Game: Guess Number Terminal (Col 27A)"
      },
      {
        "kind": "wire",
        "color": "#00bcd4",
        "text": "GPIO23 (Pin 16, Col 8J) -> Game: Guess Number Terminal (Col 28J)"
      },
      {
        "kind": "wire",
        "color": "#e91e63",
        "text": "GPIO24 (Pin 18, Col 9J) -> Game: Guess Number Terminal (Col 29J)"
      },
      {
        "kind": "wire",
        "color": "#8bc34a",
        "text": "GPIO25 (Pin 22, Col 11J) -> Game: Guess Number Terminal (Col 30J)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 74HC595"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 7-Seg"
      }
    ]
  },
  {
    "id": "3.1.13",
    "title": "Game: 10 Seconds Stop",
    "category": "Extension",
    "slug": "3.1.13_game_10_second.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/3.1.13_game_10_second.html",
    "description": "Test your reflexes to stop the running digital timer exactly at 10.00 seconds.",
    "bcm_pins": [
      17,
      18,
      27,
      22,
      23,
      24,
      25,
      4
    ],
    "youtube_id": "az90qK3jmDo",
    "youtube_title": "Precision Stopwatch Game",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_GAME_10_Second.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one13.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image277.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image278.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_GAME_10_Second.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one13.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image277.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image278.jpeg"
    ],
    "python_file": "3.1.13_GAME_10Second.py",
    "python_code": "#!/usr/bin/env python3\nimport RPi.GPIO as GPIO\nimport time\nimport threading\n\nsensorPin = 26\n\nSDI = 24\nRCLK = 23\nSRCLK = 18\n\nplacePin = (10, 22, 27, 17)\nnumber = (0xc0, 0xf9, 0xa4, 0xb0, 0x99, 0x92, 0x82, 0xf8, 0x80, 0x90)\n\ncounter = 0\ntimer =0\ngameState =0\n\ndef clearDisplay():\n    for i in range(8):\n        GPIO.output(SDI, 1)\n        GPIO.output(SRCLK, GPIO.HIGH)\n        GPIO.output(SRCLK, GPIO.LOW)\n    GPIO.output(RCLK, GPIO.HIGH)\n    GPIO.output(RCLK, GPIO.LOW)    \n\ndef hc595_shift(data): \n    for i in range(8):\n        GPIO.output(SDI, 0x80 & (data << i))\n        GPIO.output(SRCLK, GPIO.HIGH)\n        GPIO.output(SRCLK, GPIO.LOW)\n    GPIO.output(RCLK, GPIO.HIGH)\n    GPIO.output(RCLK, GPIO.LOW)\n\ndef pickDigit(digit):\n    for i in placePin:\n        GPIO.output(i,GPIO.LOW)\n    GPIO.output(placePin[digit], GPIO.HIGH)\n\ndef display():\n    global counter                    \n    clearDisplay() \n    pickDigit(0)  \n    hc595_shift(number[counter % 10])\n\n    clearDisplay()\n    pickDigit(1)\n    hc595_shift(number[counter % 100//10])\n\n    clearDisplay()\n    pickDigit(2)\n    hc595_shift(number[counter % 1000//100]-0x80)\n\n    clearDisplay()\n    pickDigit(3)\n    hc595_shift(number[counter % 10000//1000])\n\ndef stateChange():\n    global gameState\n    global counter\n    global timer1\n    if gameState == 0:\n        counter = 0\n        time.sleep(1)\n        timer() \n    elif gameState ==1:\n        timer1.cancel()\n        time.sleep(1)\n    gameState = (gameState+1)%2\n\ndef loop():\n    global counter\n    currentState = 0\n    lastState = 0\n    while True:\n        display()\n        currentState=GPIO.input(sensorPin)\n        if (currentState == 0) and (lastState == 1):\n            stateChange()\n        lastState=currentState\n\ndef timer():  \n    global counter\n    global timer1\n    timer1 = threading.Timer(0.01, timer) \n    timer1.start()  \n    counter += 1\n\ndef setup():\n    GPIO.setmode(GPIO.BCM)\n    GPIO.setup(SDI, GPIO.OUT)\n    GPIO.setup(RCLK, GPIO.OUT)\n    GPIO.setup(SRCLK, GPIO.OUT)\n    for i in placePin:\n        GPIO.setup(i, GPIO.OUT)\n    GPIO.setup(sensorPin, GPIO.IN)\n\ndef destroy():   # When \"Ctrl+C\" is pressed, the function is executed.\n    GPIO.cleanup()\n    global timer1\n    timer1.cancel()\n\nif __name__ == '__main__':  # Program starting from here\n    setup()\n    try:\n        loop()\n    except KeyboardInterrupt:\n        destroy()\n",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image277.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "ic",
          "label": "74HC595",
          "startCol": 24,
          "cols": 7,
          "topRow": "F",
          "botRow": "E"
        },
        {
          "type": "seg7",
          "label": "7-Seg",
          "startCol": 32,
          "cols": 3,
          "topRow": "I",
          "botRow": "B"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO17 (Pin 11, Col 6A) -> Game: 10 Seconds Stop Terminal (Col 24A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 25,
            "row": "J"
          },
          "color": "#4caf50",
          "label": "GPIO18 (Pin 12, Col 6J) -> Game: 10 Seconds Stop Terminal (Col 25J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO27 (Pin 13, Col 7A) -> Game: 10 Seconds Stop Terminal (Col 26A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 27,
            "row": "A"
          },
          "color": "#9c27b0",
          "label": "GPIO22 (Pin 15, Col 8A) -> Game: 10 Seconds Stop Terminal (Col 27A)",
          "bcm": 22
        },
        {
          "from": {
            "col": 8,
            "row": "J",
            "pin": 16,
            "bcm": 23
          },
          "to": {
            "col": 28,
            "row": "J"
          },
          "color": "#00bcd4",
          "label": "GPIO23 (Pin 16, Col 8J) -> Game: 10 Seconds Stop Terminal (Col 28J)",
          "bcm": 23
        },
        {
          "from": {
            "col": 9,
            "row": "J",
            "pin": 18,
            "bcm": 24
          },
          "to": {
            "col": 29,
            "row": "J"
          },
          "color": "#e91e63",
          "label": "GPIO24 (Pin 18, Col 9J) -> Game: 10 Seconds Stop Terminal (Col 29J)",
          "bcm": 24
        },
        {
          "from": {
            "col": 11,
            "row": "J",
            "pin": 22,
            "bcm": 25
          },
          "to": {
            "col": 30,
            "row": "J"
          },
          "color": "#8bc34a",
          "label": "GPIO25 (Pin 22, Col 11J) -> Game: 10 Seconds Stop Terminal (Col 30J)",
          "bcm": 25
        },
        {
          "from": {
            "col": 4,
            "row": "A",
            "pin": 7,
            "bcm": 4
          },
          "to": {
            "col": 31,
            "row": "A"
          },
          "color": "#ffc107",
          "label": "GPIO4 (Pin 7, Col 4A) -> Game: 10 Seconds Stop Terminal (Col 31A)",
          "bcm": 4
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO17 (Pin 11, Col 6A) -> Game: 10 Seconds Stop Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO18 (Pin 12, Col 6J) -> Game: 10 Seconds Stop Terminal (Col 25J)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO27 (Pin 13, Col 7A) -> Game: 10 Seconds Stop Terminal (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO22 (Pin 15, Col 8A) -> Game: 10 Seconds Stop Terminal (Col 27A)"
      },
      {
        "kind": "wire",
        "color": "#00bcd4",
        "text": "GPIO23 (Pin 16, Col 8J) -> Game: 10 Seconds Stop Terminal (Col 28J)"
      },
      {
        "kind": "wire",
        "color": "#e91e63",
        "text": "GPIO24 (Pin 18, Col 9J) -> Game: 10 Seconds Stop Terminal (Col 29J)"
      },
      {
        "kind": "wire",
        "color": "#8bc34a",
        "text": "GPIO25 (Pin 22, Col 11J) -> Game: 10 Seconds Stop Terminal (Col 30J)"
      },
      {
        "kind": "wire",
        "color": "#ffc107",
        "text": "GPIO4 (Pin 7, Col 4A) -> Game: 10 Seconds Stop Terminal (Col 31A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 74HC595"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 7-Seg"
      }
    ]
  },
  {
    "id": "3.1.14",
    "title": "Game: NOT NOT Brain Teaser",
    "category": "Extension",
    "slug": "3.1.14_game_not_not.html",
    "doc_url": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/3.1.14_game_not_not.html",
    "description": "Fast-paced brain teaser game shown on LCD challenging players to follow logic commands (e.g. NOT LEFT, RIGHT).",
    "bcm_pins": [
      2,
      3,
      17,
      18,
      27,
      22
    ],
    "youtube_id": "AC8zuiIJOtY",
    "youtube_title": "Brain Agility Game on LCD",
    "component_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_GAME_Not_Not.png",
    "schematic_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one14.png",
    "wiring_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image280.png",
    "phenomenon_image": "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image281.jpeg",
    "all_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/list_GAME_Not_Not.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/Schematic_three_one14.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image280.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/notnot3.png",
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image281.jpeg"
    ],
    "python_file": "3.1.14_GAME_NotNot.py",
    "python_code": "import RPi.GPIO as GPIO\nimport time\nimport threading\nimport random\n\nSDI   = 17\nRCLK  = 18\nSRCLK = 27\n\ntimerPlay = 0\ntimerCheck = 0\n\nAButtonPin = 20\nBButtonPin = 26\n\nwaypoint = \"NULL\"\nstage = \"NULL\"\n\narrow={\n    #\"down\" :[0xFF,0xEF,0xC7,0xAB,0xEF,0xEF,0xEF,0xFF],\n    #\"up\":[0xFF,0xEF,0xEF,0xEF,0xAB,0xC7,0xEF,0xFF],\n    \"right\" : [0xFF,0xEF,0xDF,0x81,0xDF,0xEF,0xFF,0xFF],    \n    \"left\":[0xFF,0xF7,0xFB,0x81,0xFB,0xF7,0xFF,0xFF]\n}\ncheck={\n    \"wrong\":[0xFF,0xBB,0xD7,0xEF,0xD7,0xBB,0xFF,0xFF],\n    \"right\":[0xFF,0xFF,0xF7,0xEB,0xDF,0xBF,0xFF,0xFF]\n}\n\ndef setup():\n    GPIO.setmode(GPIO.BCM)    # Number GPIOs by its BCM location\n    GPIO.setup(SDI, GPIO.OUT)\n    GPIO.setup(RCLK, GPIO.OUT)\n    GPIO.setup(SRCLK, GPIO.OUT)\n    GPIO.output(SDI, GPIO.LOW)\n    GPIO.output(RCLK, GPIO.LOW)\n    GPIO.output(SRCLK, GPIO.LOW)\n    GPIO.setup(AButtonPin,GPIO.IN)\n    GPIO.setup(BButtonPin,GPIO.IN)    \n  \n# Shift the data to 74HC595\ndef hc595_shift(dat):\n    for bit in range(0, 8): \n        GPIO.output(SDI, 0x80 & (dat << bit))\n        GPIO.output(SRCLK, GPIO.HIGH)\n        GPIO.output(SRCLK, GPIO.LOW)\n\ndef display(glyphCode):\n    for i in range(0, 8):\n        hc595_shift(glyphCode[i])\n        hc595_shift(0x80>>i)\n        GPIO.output(RCLK, GPIO.HIGH)\n        GPIO.output(RCLK, GPIO.LOW)\n\ndef creatGlyph():\n    global waypoint\n    global stage\n    global timerPlay    \n    waypoint=random.choice(list(arrow.keys()))\n    stage = \"PLAY\"\n    timerPlay = threading.Timer(2.0, timeOut)  \n    timerPlay.start()  \n\ndef checkPoint(inputKey):\n    global waypoint\n    global stage\n    global timerCheck    \n    if inputKey == \"empty\" or inputKey == waypoint:\n        waypoint = \"wrong\"\n    else:\n        waypoint = \"right\"\n    timerPlay.cancel()\n    stage = \"CHECK\"\n    timerCheck = threading.Timer(1.0, creatGlyph)\n    timerCheck.start()  \n\ndef timeOut():  \n    checkPoint(\"empty\")\n\ndef getKey():\n    if GPIO.input(AButtonPin)==1 and GPIO.input(BButtonPin)==0:\n        checkPoint(\"right\")\n    elif GPIO.input(AButtonPin)==0 and GPIO.input(BButtonPin)==1:\n        checkPoint(\"left\")\n    \ndef main():\n    creatGlyph()\n    while True:\n        if stage == \"PLAY\":\n            display(arrow[waypoint])\n            getKey()\n        elif stage == \"CHECK\":\n            display(check[waypoint])\n\ndef destroy():\n    global timer1\n    GPIO.cleanup()\n    timerPlay.cancel()  # cancel the timer\n    timerCheck.cancel()\n\nif __name__ == '__main__':\n    setup()\n    try:\n        main()\n    except KeyboardInterrupt:\n        destroy()",
    "wiring_images": [
      "https://docs.sunfounder.com/projects/davinci-kit/en/latest/_images/image280.png"
    ],
    "breadboard_spec": {
      "power_jumpers": [
        {
          "from": {
            "col": 1,
            "row": "A",
            "pin": 1
          },
          "to": {
            "col": 1,
            "row": "bot_plus"
          },
          "color": "#e53935",
          "label": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
        },
        {
          "from": {
            "col": 5,
            "row": "A",
            "pin": 9
          },
          "to": {
            "col": 5,
            "row": "bot_minus"
          },
          "color": "#212121",
          "label": "GND (Pin 9, Col 5A) -> Bottom - Rail"
        }
      ],
      "components": [
        {
          "type": "ic",
          "label": "74HC595",
          "startCol": 24,
          "cols": 7,
          "topRow": "F",
          "botRow": "E"
        },
        {
          "type": "seg7",
          "label": "7-Seg",
          "startCol": 32,
          "cols": 3,
          "topRow": "I",
          "botRow": "B"
        }
      ],
      "wires": [
        {
          "from": {
            "col": 2,
            "row": "A",
            "pin": 3,
            "bcm": 2
          },
          "to": {
            "col": 24,
            "row": "A"
          },
          "color": "#2196f3",
          "label": "GPIO2 (Pin 3, Col 2A) -> Game: NOT NOT Brain Teaser Terminal (Col 24A)",
          "bcm": 2
        },
        {
          "from": {
            "col": 3,
            "row": "A",
            "pin": 5,
            "bcm": 3
          },
          "to": {
            "col": 25,
            "row": "A"
          },
          "color": "#4caf50",
          "label": "GPIO3 (Pin 5, Col 3A) -> Game: NOT NOT Brain Teaser Terminal (Col 25A)",
          "bcm": 3
        },
        {
          "from": {
            "col": 6,
            "row": "A",
            "pin": 11,
            "bcm": 17
          },
          "to": {
            "col": 26,
            "row": "A"
          },
          "color": "#ff9800",
          "label": "GPIO17 (Pin 11, Col 6A) -> Game: NOT NOT Brain Teaser Terminal (Col 26A)",
          "bcm": 17
        },
        {
          "from": {
            "col": 6,
            "row": "J",
            "pin": 12,
            "bcm": 18
          },
          "to": {
            "col": 27,
            "row": "J"
          },
          "color": "#9c27b0",
          "label": "GPIO18 (Pin 12, Col 6J) -> Game: NOT NOT Brain Teaser Terminal (Col 27J)",
          "bcm": 18
        },
        {
          "from": {
            "col": 7,
            "row": "A",
            "pin": 13,
            "bcm": 27
          },
          "to": {
            "col": 28,
            "row": "A"
          },
          "color": "#00bcd4",
          "label": "GPIO27 (Pin 13, Col 7A) -> Game: NOT NOT Brain Teaser Terminal (Col 28A)",
          "bcm": 27
        },
        {
          "from": {
            "col": 8,
            "row": "A",
            "pin": 15,
            "bcm": 22
          },
          "to": {
            "col": 29,
            "row": "A"
          },
          "color": "#e91e63",
          "label": "GPIO22 (Pin 15, Col 8A) -> Game: NOT NOT Brain Teaser Terminal (Col 29A)",
          "bcm": 22
        }
      ]
    },
    "wiring_steps": [
      {
        "kind": "power",
        "color": "#e53935",
        "text": "3V3 (Pin 1, Col 1A) -> Bottom + Rail"
      },
      {
        "kind": "power",
        "color": "#212121",
        "text": "GND (Pin 9, Col 5A) -> Bottom - Rail"
      },
      {
        "kind": "wire",
        "color": "#2196f3",
        "text": "GPIO2 (Pin 3, Col 2A) -> Game: NOT NOT Brain Teaser Terminal (Col 24A)"
      },
      {
        "kind": "wire",
        "color": "#4caf50",
        "text": "GPIO3 (Pin 5, Col 3A) -> Game: NOT NOT Brain Teaser Terminal (Col 25A)"
      },
      {
        "kind": "wire",
        "color": "#ff9800",
        "text": "GPIO17 (Pin 11, Col 6A) -> Game: NOT NOT Brain Teaser Terminal (Col 26A)"
      },
      {
        "kind": "wire",
        "color": "#9c27b0",
        "text": "GPIO18 (Pin 12, Col 6J) -> Game: NOT NOT Brain Teaser Terminal (Col 27J)"
      },
      {
        "kind": "wire",
        "color": "#00bcd4",
        "text": "GPIO27 (Pin 13, Col 7A) -> Game: NOT NOT Brain Teaser Terminal (Col 28A)"
      },
      {
        "kind": "wire",
        "color": "#e91e63",
        "text": "GPIO22 (Pin 15, Col 8A) -> Game: NOT NOT Brain Teaser Terminal (Col 29A)"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 74HC595"
      },
      {
        "kind": "component",
        "color": "#8b9bb4",
        "text": "Place 7-Seg"
      }
    ]
  }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = DAVINCI_LESSONS;
} else if (typeof window !== "undefined") {
  window.DAVINCI_LESSONS = DAVINCI_LESSONS;
}
