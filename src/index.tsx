import React, { memo } from 'react';
import { type StyleProp, Text, type TextStyle } from 'react-native';

const regex = /_(?:\(([^)]*)\))?\[([^\]]+)\](?:\((https?:\/\/[^\s)]+)\))?/g;
const plainLinkRegex = /\[([^\]]+)\]\(([^\s)]+)\)/g;
const markdownBoldRegex = /\*\*([^*]+)\*\*/g;


const boldRegExp = /^fw(?::(\d{3}))?$/;
const fontSizeRegExp = /^fs:(\d+)$/;
const lineHeightRegExp = /^lh:(\d+)$/;
const hexRegExp = /^#([0-9a-fA-F]{3,6})$/;
const colorRegExp = /^[a-zA-Z]+$/;
const parseStyledText = (
  input: string,
  onLinkPress?: (link: string) => void
) => {
  const parts: React.ReactNode[] = [];
  let mdProcessed = input;
  mdProcessed = mdProcessed.replace(markdownBoldRegex, '_(fw:700)[$1]');
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(mdProcessed)) !== null) {
    const [, stylesStr, text, link] = match;
    const matchStart = match.index;
    const matchEnd = regex.lastIndex;

    if (lastIndex < matchStart) {
      parts.push(mdProcessed.slice(lastIndex, matchStart));
    }

    const style: any = {};
    if (stylesStr) {
      const styles = stylesStr.split('|').map((s) => s.trim());

      for (const s of styles) {
        if (!s) {
          throw new Error(
            'Empty style detected. Please provide at least one style.'
          );
        }

        if (s === 'italic') {
          style.fontStyle = 'italic';
        } else if (s === 'underline') {
          style.textDecorationLine = 'underline';
        } else if (s.startsWith('fw')) {
          const matchBold = s.match(boldRegExp);
          if (matchBold) {
            const weight = matchBold[1] ?? '700';
            if (parseInt(weight) < 100 || parseInt(weight) > 900) {
              throw new Error(
                `Invalid font weight: ${weight}. Must be between 100 and 900.`
              );
            }
            style.fontWeight = weight;
          } else {
            throw new Error(
              `Invalid bold style: ${s}. Use "bold" or "bold:100-900".`
            );
          }
        } else if (fontSizeRegExp.test(s)) {
          const [, size] = s.match(fontSizeRegExp)!;
          if (size) {
            const fontSize = parseInt(size, 10);
            if (fontSize <= 0) {
              throw new Error(
                `Invalid font size: ${size}. Must be greater than 0.`
              );
            }
            style.fontSize = fontSize;
          }
        } else if (lineHeightRegExp.test(s)) {
          const [, lh] = s.match(lineHeightRegExp)!;
          if (lh) {
            const lineHeight = parseInt(lh, 10);
            if (lineHeight <= 0) {
              throw new Error(
                `Invalid line height: ${lh}. Must be greater than 0.`
              );
            }
            style.lineHeight = lineHeight;
          }
        } else if (hexRegExp.test(s) || colorRegExp.test(s)) {
          style.color = s;
        } else {
          throw new Error(
            `Invalid style: ${s}. See documentation for allowed styles.`
          );
        }
      }
    }

    parts.push(
      <Text
        key={matchStart}
        style={style}
        onPress={link ? () => onLinkPress?.(link) : undefined}
      >
        {text}
      </Text>
    );
    lastIndex = matchEnd;
  }

  if (lastIndex < input.length) {
    parts.push(input.slice(lastIndex));
  }

  return parts;
};

function parsePlainLinks(
  nodes: React.ReactNode[],
  onLinkPress?: (link: string) => void,
  linkStyle?: StyleProp<TextStyle>
) {
  const result: React.ReactNode[] = [];

  for (const node of nodes) {
    if (typeof node !== 'string') {
      result.push(node);
      continue;
    }

    let lastIndex = 0;
    let match;

    while ((match = plainLinkRegex.exec(node)) !== null) {
      const matchStart = match.index;
      const matchEnd = plainLinkRegex.lastIndex;

      if (lastIndex < matchStart) {
        result.push(node.slice(lastIndex, matchStart));
      }

      const text = match[1];
      const link = match[2];
      if (!text || !link) {
        lastIndex = matchEnd;
        continue;
      }

      result.push(
        <Text
          key={`${link}-${matchStart}`}
          style={linkStyle}
          onPress={() => onLinkPress?.(link)}
        >
          {text}
        </Text>
      );

      lastIndex = matchEnd;
    }

    if (lastIndex < node.length) {
      result.push(node.slice(lastIndex));
    }
  }

  return result;
}

const parseText = (input: string, onLinkPress?: (link: string) => void, linkStyle?: StyleProp<TextStyle>) => {
  const styledParsed = parseStyledText(input, onLinkPress);
  return parsePlainLinks(styledParsed, onLinkPress, linkStyle);
};

type StyledTextProps = {
  text: string;
  styles?: StyleProp<TextStyle>;
  linkStyle?: StyleProp<TextStyle>;
  onLinkPress?: (link: string) => void;
};

// 7. Сам компонент
export const StyledText = memo(
  ({ text, styles, onLinkPress, linkStyle }: StyledTextProps) => {
    const parsedText = parseText(text, onLinkPress, linkStyle);
    return <Text style={styles}>{parsedText}</Text>;
  }
);
