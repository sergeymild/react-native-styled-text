import React from 'react';
import { Text } from 'react-native';

// 5. Парсер стилей без использования fullMatch
const parseStyledText = (input: string) => {
  const regex = /_(?:\(([^)]*)\))?\[([^\]]+)\]/g;
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
          const matchBold = s.match(/^bold(?::(\d{3}))?$/);
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
        } else if (/^fontSize:(\d+)$/.test(s)) {
          const [, size] = s.match(/^fontSize:(\d+)$/)!;
          if (size) {
            const fontSize = parseInt(size, 10);
            if (fontSize <= 0) {
              throw new Error(
                `Invalid font size: ${size}. Must be greater than 0.`
              );
            }
            style.fontSize = fontSize;
          }
        } else if (/^lineHeight:(\d+)$/.test(s)) {
          const [, lh] = s.match(/^lineHeight:(\d+)$/)!;
          if (lh) {
            const lineHeight = parseInt(lh, 10);
            if (lineHeight <= 0) {
              throw new Error(
                `Invalid line height: ${lh}. Must be greater than 0.`
              );
            }
            style.lineHeight = lineHeight;
          }
        } else if (
          /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(s) ||
          /^[a-zA-Z]+$/.test(s)
        ) {
          style.color = s;
        } else {
          throw new Error(
            `Invalid style: ${s}. See documentation for allowed styles.`
          );
        }
      }
    }

    parts.push(
      <Text style={style} key={matchStart}>
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

// 6. Типизированный компонент для текста с проверкой
type StyledTextProps = {
  text: string;
};

// 7. Сам компонент
const StyledText = ({ text }: StyledTextProps) => {
  const parsedText = parseStyledText(text);
  return <Text>{parsedText}</Text>;
};

export default StyledText;
