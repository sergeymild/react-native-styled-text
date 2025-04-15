import React, { memo } from 'react';
import { Text } from 'react-native';

const regex = /_(?:\(([^)]*)\))?\[([^\]]+)\]/g;
const boldRegExp = /^bold(?::(\d{3}))?$/;
const fontSizeRegExp = /^fontSize:(\d+)$/;
const lineHeightRegExp = /^lineHeight:(\d+)$/;
const hexRegExp = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const colorRegExp = /^[a-zA-Z]+$/;
const parseStyledText = (input: string) => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(input)) !== null) {
    const [, stylesStr, text] = match;
    const matchStart = match.index;
    const matchEnd = regex.lastIndex;

    if (lastIndex < matchStart) {
      parts.push(input.slice(lastIndex, matchStart));
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
        } else if (s.startsWith('bold')) {
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

    parts.push(<Text style={style} key={matchStart} children={text} />);
    lastIndex = matchEnd;
  }

  if (lastIndex < input.length) {
    parts.push(input.slice(lastIndex));
  }

  return parts;
};

type StyledTextProps = {
  text: string;
};

// 7. Сам компонент
export const StyledText = memo(({ text }: StyledTextProps) => {
  const parsedText = parseStyledText(text);
  return <Text>{parsedText}</Text>;
});
