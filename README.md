# react-native-styled-text

A component for styled text formatting in React Native using a concise and expressive syntax.

## Installation

```bash
npm install react-native-styled-text
# or
yarn add react-native-styled-text
```

## Usage

```tsx
import { StyledText } from 'react-native-styled-text';

// Simple styled text
<StyledText text="_(fw)[Bold text]" />

// Multiple styles
<StyledText text="_(italic|underline)[Italic and underlined]" />

// Colors
<StyledText text="_(red)[Red text]" />
<StyledText text="_(#FF0000)[Hex color text]" />

// Font size and line height
<StyledText text="_(fs:20)[Large text]" />
<StyledText text="_(lh:30)[Text with more line height]" />

// Combination of styles
<StyledText text="_(fw:700|italic|#00f|fs:18|lh:26)[Complex styled text]" />

// Links
<StyledText text="_(underline)[Google](https://google.com)" onLinkPress={(url) => console.log(url)} />

// Plain links without styles
<StyledText text="Visit [GitHub](https://github.com)" />

// Plain URLs — automatically detected and clickable
<StyledText
  text="Visit https://example.com for more info"
  linkStyle={{ color: 'blue', textDecorationLine: 'underline' }}
  onLinkPress={(url) => console.log(url)}
/>
```

## Syntax

Styled text uses the following syntax:

```
_(style1|style2|...)[Text](optional_link)
```

You can also use standard Markdown-style links like `[text](url)` without any styles.

## Supported Styles

### Text Styles

- `italic` — italic font style
- `underline` — underline text
- `fw` — bold (default to `700`)
- `fw:100` to `fw:900` — specific font weight

### Font Size & Line Height

- `fs:number` — font size (e.g., `fs:16`)
- `lh:number` — line height (e.g., `lh:24`)

### Colors

- Named colors (e.g., `red`, `blue`, `green`)
- Hex codes (e.g., `#FF0000`, `#0f0`, `#000000`)

## Links

- Styled links: `_(underline)[Text](https://example.com)`
- Markdown links: `[Text](https://example.com)` — automatically detected and clickable
- Plain URLs: `https://example.com` — raw URLs in text are auto-detected and rendered as clickable links

Use the `onLinkPress` prop to handle link clicks. Use `linkStyle` to customize the appearance of markdown and plain URL links.

## Component Props

```ts
type StyledTextProps = {
  text: string;
  styles?: StyleProp<TextStyle>;
  linkStyle?: StyleProp<TextStyle>;
  onLinkPress?: (url: string) => void;
  disableLinks?: boolean;
};
```

| Prop | Type | Description |
|------|------|-------------|
| `text` | `string` | Text with styled/link markup |
| `styles` | `StyleProp<TextStyle>` | Base text styles |
| `linkStyle` | `StyleProp<TextStyle>` | Style for markdown and plain URL links |
| `onLinkPress` | `(url: string) => void` | Link press handler |
| `disableLinks` | `boolean` | When `true`, links are still rendered visually but clicks are disabled |

## Examples

```tsx
// Plain and styled mix
<StyledText text="Normal _(fw|red)[Bold red] text with [a link](https://example.com)" />

// Nested appearance using multiple inline styles
<StyledText text="_(fw:500|fs:20|#444)[Styled text with link](https://google.com)" />

// Plain URLs auto-detected in text
<StyledText
  text="Check https://github.com and https://google.com"
  linkStyle={{ color: 'blue', textDecorationLine: 'underline' }}
  onLinkPress={(url) => console.log(url)}
/>
```

## Error Handling

The component will throw clear errors when:

- Styles are empty or unknown
- Font weights are outside 100–900
- Font size or line height is invalid (must be > 0)
- Style syntax is invalid

## Limitations

- Nested styles are not supported (no recursion inside `[...]`)
- Style names must be exact (`fw`, not `bold`, `fs`, not `fontSize`, etc.)
- Both `http://` and `https://` URLs are recognized
