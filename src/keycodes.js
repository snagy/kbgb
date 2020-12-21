/**
 * USB HID Keyboard scan codes as per USB spec 1.11
 * plus some additional codes
 * 
 * Created by MightyPork, 2016
 * Public domain
 * 
 * Adapted from:
 * https://source.android.com/devices/input/keyboard-devices.html
 */
export const keyCodes = {
  
/**
 * Modifier masks - used for the first byte in the HID report.
 * NOTE: The second byte in the report is reserved, 0x00
 */
    "KEY_MOD_LCTRL": { "linuxCode":"0x01" },
    "KEY_MOD_LSHIFT": { "linuxCode":"0x02" },
    "KEY_MOD_LALT": { "linuxCode":"0x04" },
    "KEY_MOD_LMETA": { "linuxCode":"0x08" },
    "KEY_MOD_RCTRL": { "linuxCode":"0x10" },
    "KEY_MOD_RSHIFT": { "linuxCode":"0x20" },
    "KEY_MOD_RALT": { "linuxCode":"0x40" },
    "KEY_MOD_RMETA": { "linuxCode":"0x80" },

/**
 * Scan codes - last N slots in the HID report (usually 6).
 * 0x00 if no key pressed.
 * 
 * If more than N keys are pressed, the HID reports 
 * KEY_ERR_OVF in all slots to indicate this condition.
 */

    "KEY_NONE": { "linuxCode":"0x00" }, // No key pressed
    "KEY_ERR_OVF": { "linuxCode":"0x01" }, //  Keyboard Error Roll Over - used for all slots if too many keys are pressed ("Phantom key")
    "//  Keyboard POST Fail": { "linuxCode":"0x02" },
    "//  Keyboard Error Undefined": { "linuxCode":"0x03" },
    "KEY_A": { "linuxCode":"0x04" }, // Keyboard a and A
    "KEY_B": { "linuxCode":"0x05" }, // Keyboard b and B
    "KEY_C": { "linuxCode":"0x06" }, // Keyboard c and C
    "KEY_D": { "linuxCode":"0x07" }, // Keyboard d and D
    "KEY_E": { "linuxCode":"0x08" }, // Keyboard e and E
    "KEY_F": { "linuxCode":"0x09" }, // Keyboard f and F
    "KEY_G": { "linuxCode":"0x0a" }, // Keyboard g and G
    "KEY_H": { "linuxCode":"0x0b" }, // Keyboard h and H
    "KEY_I": { "linuxCode":"0x0c" }, // Keyboard i and I
    "KEY_J": { "linuxCode":"0x0d" }, // Keyboard j and J
    "KEY_K": { "linuxCode":"0x0e" }, // Keyboard k and K
    "KEY_L": { "linuxCode":"0x0f" }, // Keyboard l and L
    "KEY_M": { "linuxCode":"0x10" }, // Keyboard m and M
    "KEY_N": { "linuxCode":"0x11" }, // Keyboard n and N
    "KEY_O": { "linuxCode":"0x12" }, // Keyboard o and O
    "KEY_P": { "linuxCode":"0x13" }, // Keyboard p and P
    "KEY_Q": { "linuxCode":"0x14" }, // Keyboard q and Q
    "KEY_R": { "linuxCode":"0x15" }, // Keyboard r and R
    "KEY_S": { "linuxCode":"0x16" }, // Keyboard s and S
    "KEY_T": { "linuxCode":"0x17" }, // Keyboard t and T
    "KEY_U": { "linuxCode":"0x18" }, // Keyboard u and U
    "KEY_V": { "linuxCode":"0x19" }, // Keyboard v and V
    "KEY_W": { "linuxCode":"0x1a" }, // Keyboard w and W
    "KEY_X": { "linuxCode":"0x1b" }, // Keyboard x and X
    "KEY_Y": { "linuxCode":"0x1c" }, // Keyboard y and Y
    "KEY_Z": { "linuxCode":"0x1d" }, // Keyboard z and Z

    "KEY_1": { "linuxCode":"0x1e" }, // Keyboard 1 and !
    "KEY_2": { "linuxCode":"0x1f" }, // Keyboard 2 and @
    "KEY_3": { "linuxCode":"0x20" }, // Keyboard 3 and #
    "KEY_4": { "linuxCode":"0x21" }, // Keyboard 4 and $
    "KEY_5": { "linuxCode":"0x22" }, // Keyboard 5 and %
    "KEY_6": { "linuxCode":"0x23" }, // Keyboard 6 and ^
    "KEY_7": { "linuxCode":"0x24" }, // Keyboard 7 and &
    "KEY_8": { "linuxCode":"0x25" }, // Keyboard 8 and *
    "KEY_9": { "linuxCode":"0x26" }, // Keyboard 9 and (
    "KEY_0": { "linuxCode":"0x27" }, // Keyboard 0 and )

    "KEY_ENTER": { "linuxCode":"0x28" }, // Keyboard Return (ENTER)
    "KEY_ESC": { "linuxCode":"0x29" }, // Keyboard ESCAPE
    "KEY_BACKSPACE": { "linuxCode":"0x2a" }, // Keyboard DELETE (Backspace)
    "KEY_TAB": { "linuxCode":"0x2b" }, // Keyboard Tab
    "KEY_SPACE": { "linuxCode":"0x2c" }, // Keyboard Spacebar
    "KEY_MINUS": { "linuxCode":"0x2d" }, // Keyboard - and _
    "KEY_EQUAL": { "linuxCode":"0x2e" }, // Keyboard = and +
    "KEY_LEFTBRACE": { "linuxCode":"0x2f" }, // Keyboard [ and {
    "KEY_RIGHTBRACE": { "linuxCode":"0x30" }, // Keyboard ] and }
    "KEY_BACKSLASH": { "linuxCode":"0x31" }, // Keyboard \ and |
    "KEY_HASHTILDE": { "linuxCode":"0x32" }, // Keyboard Non-US # and ~
    "KEY_SEMICOLON": { "linuxCode":"0x33" }, // Keyboard ; and :
    "KEY_APOSTROPHE": { "linuxCode":"0x34" }, // Keyboard ' and "
    "KEY_GRAVE": { "linuxCode":"0x35" }, // Keyboard ` and ~
    "KEY_COMMA": { "linuxCode":"0x36" }, // Keyboard , and <
    "KEY_DOT": { "linuxCode":"0x37" }, // Keyboard . and >
    "KEY_SLASH": { "linuxCode":"0x38" }, // Keyboard / and ?
    "KEY_CAPSLOCK": { "linuxCode":"0x39" }, // Keyboard Caps Lock

    "KEY_F1": { "linuxCode":"0x3a" }, // Keyboard F1
    "KEY_F2": { "linuxCode":"0x3b" }, // Keyboard F2
    "KEY_F3": { "linuxCode":"0x3c" }, // Keyboard F3
    "KEY_F4": { "linuxCode":"0x3d" }, // Keyboard F4
    "KEY_F5": { "linuxCode":"0x3e" }, // Keyboard F5
    "KEY_F6": { "linuxCode":"0x3f" }, // Keyboard F6
    "KEY_F7": { "linuxCode":"0x40" }, // Keyboard F7
    "KEY_F8": { "linuxCode":"0x41" }, // Keyboard F8
    "KEY_F9": { "linuxCode":"0x42" }, // Keyboard F9
    "KEY_F10": { "linuxCode":"0x43" }, // Keyboard F10
    "KEY_F11": { "linuxCode":"0x44" }, // Keyboard F11
    "KEY_F12": { "linuxCode":"0x45" }, // Keyboard F12

    "KEY_SYSRQ": { "linuxCode":"0x46" }, // Keyboard Print Screen
    "KEY_SCROLLLOCK": { "linuxCode":"0x47" }, // Keyboard Scroll Lock
    "KEY_PAUSE": { "linuxCode":"0x48" }, // Keyboard Pause
    "KEY_INSERT": { "linuxCode":"0x49" }, // Keyboard Insert
    "KEY_HOME": { "linuxCode":"0x4a" }, // Keyboard Home
    "KEY_PAGEUP": { "linuxCode":"0x4b" }, // Keyboard Page Up
    "KEY_DELETE": { "linuxCode":"0x4c" }, // Keyboard Delete Forward
    "KEY_END": { "linuxCode":"0x4d" }, // Keyboard End
    "KEY_PAGEDOWN": { "linuxCode":"0x4e" }, // Keyboard Page Down
    "KEY_RIGHT": { "linuxCode":"0x4f" }, // Keyboard Right Arrow
    "KEY_LEFT": { "linuxCode":"0x50" }, // Keyboard Left Arrow
    "KEY_DOWN": { "linuxCode":"0x51" }, // Keyboard Down Arrow
    "KEY_UP": { "linuxCode":"0x52" }, // Keyboard Up Arrow

    "KEY_NUMLOCK": { "linuxCode":"0x53" }, // Keyboard Num Lock and Clear
    "KEY_KPSLASH": { "linuxCode":"0x54" }, // Keypad /
    "KEY_KPASTERISK": { "linuxCode":"0x55" }, // Keypad *
    "KEY_KPMINUS": { "linuxCode":"0x56" }, // Keypad -
    "KEY_KPPLUS": { "linuxCode":"0x57" }, // Keypad +
    "KEY_KPENTER": { "linuxCode":"0x58" }, // Keypad ENTER
    "KEY_KP1": { "linuxCode":"0x59" }, // Keypad 1 and End
    "KEY_KP2": { "linuxCode":"0x5a" }, // Keypad 2 and Down Arrow
    "KEY_KP3": { "linuxCode":"0x5b" }, // Keypad 3 and PageDn
    "KEY_KP4": { "linuxCode":"0x5c" }, // Keypad 4 and Left Arrow
    "KEY_KP5": { "linuxCode":"0x5d" }, // Keypad 5
    "KEY_KP6": { "linuxCode":"0x5e" }, // Keypad 6 and Right Arrow
    "KEY_KP7": { "linuxCode":"0x5f" }, // Keypad 7 and Home
    "KEY_KP8": { "linuxCode":"0x60" }, // Keypad 8 and Up Arrow
    "KEY_KP9": { "linuxCode":"0x61" }, // Keypad 9 and Page Up
    "KEY_KP0": { "linuxCode":"0x62" }, // Keypad 0 and Insert
    "KEY_KPDOT": { "linuxCode":"0x63" }, // Keypad . and Delete

    "KEY_102ND": { "linuxCode":"0x64" }, // Keyboard Non-US \ and |
    "KEY_COMPOSE": { "linuxCode":"0x65" }, // Keyboard Application
    "KEY_POWER": { "linuxCode":"0x66" }, // Keyboard Power
    "KEY_KPEQUAL": { "linuxCode":"0x67" }, // Keypad =

    "KEY_F13": { "linuxCode":"0x68" }, // Keyboard F13
    "KEY_F14": { "linuxCode":"0x69" }, // Keyboard F14
    "KEY_F15": { "linuxCode":"0x6a" }, // Keyboard F15
    "KEY_F16": { "linuxCode":"0x6b" }, // Keyboard F16
    "KEY_F17": { "linuxCode":"0x6c" }, // Keyboard F17
    "KEY_F18": { "linuxCode":"0x6d" }, // Keyboard F18
    "KEY_F19": { "linuxCode":"0x6e" }, // Keyboard F19
    "KEY_F20": { "linuxCode":"0x6f" }, // Keyboard F20
    "KEY_F21": { "linuxCode":"0x70" }, // Keyboard F21
    "KEY_F22": { "linuxCode":"0x71" }, // Keyboard F22
    "KEY_F23": { "linuxCode":"0x72" }, // Keyboard F23
    "KEY_F24": { "linuxCode":"0x73" }, // Keyboard F24

    "KEY_OPEN": { "linuxCode":"0x74" }, // Keyboard Execute
    "KEY_HELP": { "linuxCode":"0x75" }, // Keyboard Help
    "KEY_PROPS": { "linuxCode":"0x76" }, // Keyboard Menu
    "KEY_FRONT": { "linuxCode":"0x77" }, // Keyboard Select
    "KEY_STOP": { "linuxCode":"0x78" }, // Keyboard Stop
    "KEY_AGAIN": { "linuxCode":"0x79" }, // Keyboard Again
    "KEY_UNDO": { "linuxCode":"0x7a" }, // Keyboard Undo
    "KEY_CUT": { "linuxCode":"0x7b" }, // Keyboard Cut
    "KEY_COPY": { "linuxCode":"0x7c" }, // Keyboard Copy
    "KEY_PASTE": { "linuxCode":"0x7d" }, // Keyboard Paste
    "KEY_FIND": { "linuxCode":"0x7e" }, // Keyboard Find
    "KEY_MUTE": { "linuxCode":"0x7f" }, // Keyboard Mute
    "KEY_VOLUMEUP": { "linuxCode":"0x80" }, // Keyboard Volume Up
    "KEY_VOLUMEDOWN": { "linuxCode":"0x81" }, // Keyboard Volume Down
    "Keyboard Locking Caps Lock": { "linuxCode":"0x82" },
    "Keyboard Locking Num Lock": { "linuxCode":"0x83" },
    "Keyboard Locking Scroll Lock": { "linuxCode":"0x84" },
    "KEY_KPCOMMA": { "linuxCode":"0x85" }, // Keypad Comma
    "Keypad Equal Sign": { "linuxCode":"0x86" },
    "KEY_RO": { "linuxCode":"0x87" }, // Keyboard International1
    "KEY_KATAKANAHIRAGANA": { "linuxCode":"0x88" }, // Keyboard International2
    "KEY_YEN": { "linuxCode":"0x89" }, // Keyboard International3
    "KEY_HENKAN": { "linuxCode":"0x8a" }, // Keyboard International4
    "KEY_MUHENKAN": { "linuxCode":"0x8b" }, // Keyboard International5
    "KEY_KPJPCOMMA": { "linuxCode":"0x8c" }, // Keyboard International6
    "Keyboard International7": { "linuxCode":"0x8d" },
    "Keyboard International8": { "linuxCode":"0x8e" },
    "Keyboard International9": { "linuxCode":"0x8f" },
    "KEY_HANGEUL": { "linuxCode":"0x90" }, // Keyboard LANG1
    "KEY_HANJA": { "linuxCode":"0x91" }, // Keyboard LANG2
    "KEY_KATAKANA": { "linuxCode":"0x92" }, // Keyboard LANG3
    "KEY_HIRAGANA": { "linuxCode":"0x93" }, // Keyboard LANG4
    "KEY_ZENKAKUHANKAKU": { "linuxCode":"0x94" }, // Keyboard LANG5
    "Keyboard LANG6": { "linuxCode":"0x95" },
    "Keyboard LANG7": { "linuxCode":"0x96" },
    "Keyboard LANG8": { "linuxCode":"0x97" },
    "Keyboard LANG9": { "linuxCode":"0x98" },
    "Keyboard Alternate Erase": { "linuxCode":"0x99" },
    "Keyboard SysReq/Attention": { "linuxCode":"0x9a" },
    "Keyboard Cancel": { "linuxCode":"0x9b" },
    "Keyboard Clear": { "linuxCode":"0x9c" },
    "Keyboard Prior": { "linuxCode":"0x9d" },
    "Keyboard Return": { "linuxCode":"0x9e" },
    "Keyboard Separator": { "linuxCode":"0x9f" },
    "Keyboard Out": { "linuxCode":"0xa0" },
    "Keyboard Oper": { "linuxCode":"0xa1" },
    "Keyboard Clear/Again": { "linuxCode":"0xa2" },
    "Keyboard CrSel/Props": { "linuxCode":"0xa3" },
    "Keyboard ExSel": { "linuxCode":"0xa4" },

    "Keypad 00": { "linuxCode":"0xb0" },
    "Keypad 000": { "linuxCode":"0xb1" },
    "Thousands Separator": { "linuxCode":"0xb2" },
    "Decimal Separator": { "linuxCode":"0xb3" },
    "Currency Unit": { "linuxCode":"0xb4" },
    "Currency Sub-unit": { "linuxCode":"0xb5" },
    "KEY_KPLEFTPAREN": { "linuxCode":"0xb6" }, // Keypad (
    "KEY_KPRIGHTPAREN": { "linuxCode":"0xb7" }, // Keypad )
    "Keypad { ": { "linuxCode":"0xb8" },
    "Keypad }": { "linuxCode":"0xb9" },
    "Keypad Tab": { "linuxCode":"0xba" },
    "Keypad Backspace": { "linuxCode":"0xbb" },
    "Keypad A": { "linuxCode":"0xbc" },
    "Keypad B": { "linuxCode":"0xbd" },
    "Keypad C": { "linuxCode":"0xbe" },
    "Keypad D": { "linuxCode":"0xbf" },
    "Keypad E": { "linuxCode":"0xc0" },
    "Keypad F": { "linuxCode":"0xc1" },
    "Keypad XOR": { "linuxCode":"0xc2" },
    "Keypad ^": { "linuxCode":"0xc3" },
    "Keypad %": { "linuxCode":"0xc4" },
    "Keypad <": { "linuxCode":"0xc5" },
    "Keypad >": { "linuxCode":"0xc6" },
    "Keypad &": { "linuxCode":"0xc7" },
    "Keypad &&": { "linuxCode":"0xc8" },
    "Keypad |": { "linuxCode":"0xc9" },
    "Keypad ||": { "linuxCode":"0xca" },
    "Keypad :": { "linuxCode":"0xcb" },
    "Keypad #": { "linuxCode":"0xcc" },
    "Keypad Space": { "linuxCode":"0xcd" },
    "Keypad @": { "linuxCode":"0xce" },
    "Keypad !": { "linuxCode":"0xcf" },
    "Keypad Memory Store": { "linuxCode":"0xd0" },
    "Keypad Memory Recall": { "linuxCode":"0xd1" },
    "Keypad Memory Clear": { "linuxCode":"0xd2" },
    "Keypad Memory Add": { "linuxCode":"0xd3" },
    "Keypad Memory Subtract": { "linuxCode":"0xd4" },
    "Keypad Memory Multiply": { "linuxCode":"0xd5" },
    "Keypad Memory Divide": { "linuxCode":"0xd6" },
    "Keypad +/-": { "linuxCode":"0xd7" },
    "Keypad Clear": { "linuxCode":"0xd8" },
    "Keypad Clear Entry": { "linuxCode":"0xd9" },
    "Keypad Binary": { "linuxCode":"0xda" },
    "Keypad Octal": { "linuxCode":"0xdb" },
    "Keypad Decimal": { "linuxCode":"0xdc" },
    "Keypad Hexadecimal": { "linuxCode":"0xdd" },

    "KEY_LEFTCTRL": { "linuxCode":"0xe0" }, // Keyboard Left Control
    "KEY_LEFTSHIFT": { "linuxCode":"0xe1" }, // Keyboard Left Shift
    "KEY_LEFTALT": { "linuxCode":"0xe2" }, // Keyboard Left Alt
    "KEY_LEFTMETA": { "linuxCode":"0xe3" }, // Keyboard Left GUI
    "KEY_RIGHTCTRL": { "linuxCode":"0xe4" }, // Keyboard Right Control
    "KEY_RIGHTSHIFT": { "linuxCode":"0xe5" }, // Keyboard Right Shift
    "KEY_RIGHTALT": { "linuxCode":"0xe6" }, // Keyboard Right Alt
    "KEY_RIGHTMETA": { "linuxCode":"0xe7" }, // Keyboard Right GUI

    "KEY_MEDIA_PLAYPAUSE": { "linuxCode":"0xe8" },
    "KEY_MEDIA_STOPCD": { "linuxCode":"0xe9" },
    "KEY_MEDIA_PREVIOUSSONG": { "linuxCode":"0xea" },
    "KEY_MEDIA_NEXTSONG": { "linuxCode":"0xeb" },
    "KEY_MEDIA_EJECTCD": { "linuxCode":"0xec" },
    "KEY_MEDIA_VOLUMEUP": { "linuxCode":"0xed" },
    "KEY_MEDIA_VOLUMEDOWN": { "linuxCode":"0xee" },
    "KEY_MEDIA_MUTE": { "linuxCode":"0xef" },
    "KEY_MEDIA_WWW": { "linuxCode":"0xf0" },
    "KEY_MEDIA_BACK": { "linuxCode":"0xf1" },
    "KEY_MEDIA_FORWARD": { "linuxCode":"0xf2" },
    "KEY_MEDIA_STOP": { "linuxCode":"0xf3" },
    "KEY_MEDIA_FIND": { "linuxCode":"0xf4" },
    "KEY_MEDIA_SCROLLUP": { "linuxCode":"0xf5" },
    "KEY_MEDIA_SCROLLDOWN": { "linuxCode":"0xf6" },
    "KEY_MEDIA_EDIT": { "linuxCode":"0xf7" },
    "KEY_MEDIA_SLEEP": { "linuxCode":"0xf8" },
    "KEY_MEDIA_COFFEE": { "linuxCode":"0xf9" },
    "KEY_MEDIA_REFRESH": { "linuxCode":"0xfa" },
    "KEY_MEDIA_CALC": { "linuxCode":"0xfb"}
}
