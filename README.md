# react-native-styled-text

A component for text formatting in React Native using a simple syntax.

## Installation

```bash
npm install react-native-styled-text
# or
yarn add react-native-styled-text
```

## Usage

```tsx
import StyledText from 'react-native-styled-text';

// Simple example
<StyledText text="_(bold)[This is bold text]" />

// Combining styles
<StyledText text="_(italic|underline)[This text is italic and underlined]" />

// Using colors
<StyledText text="_(red)[Red text]" />
<StyledText text="_(#FF0000)[Text in hex color]" />

// Font size
<StyledText text="_(fontSize:20)[Large text]" />

// Line height
<StyledText text="_(lineHeight:30)[Text with increased line height]" />

// Combining all styles
<StyledText text="_(bold:700|italic|red|fontSize:20)[Complex style]" />
```

## Supported Styles

### Basic Styles

- `italic` - italic text
- `underline` - underlined text
- `bold` - bold text (default 700)
- `bold:100-900` - bold text with specified weight (100-900)

### Sizes

- `fontSize:number` - font size
- `lineHeight:number` - line height

### Colors

- Color names (e.g., `red`, `blue`, `green`)
- Hex color codes (e.g., `#FF0000`, `#00FF00`)

## Syntax

Basic syntax: `_(style)[text]`

Where:

- `style` - one or more styles separated by `|`
- `text` - text to apply styles to

## Examples

```tsx
// Simple text
<StyledText text="Normal text _(bold)[bold text] normal again" />

// Multiple styles
<StyledText text="_(bold|italic|red)[Bold italic red text]" />

// Nested styles
<StyledText text="_(bold)[Bold _(red)[red] text]" />

// Complex example
<StyledText text="_(fontSize:20|lineHeight:30|bold:700)[Large text with settings]" />
```

## Limitations

- Styles must be valid
- Colors must be either names or hex codes
- Font sizes and line heights must be positive numbers
- Font weight must be in range 100-900

## Errors

The component provides clear error messages for:

- Invalid syntax
- Invalid styles
- Invalid size values
- Invalid font weight values

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
