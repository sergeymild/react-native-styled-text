import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
  text: string;
  numberOfLines: number;
  moreLabel?: string;
  lessLabel?: string;
}

const ExpandableText: React.FC<Props> = ({
  text,
  numberOfLines,
  moreLabel = '...more',
  lessLabel = 'Less',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [displayedText, setDisplayedText] = useState<string | null>(null);
  const [measured, setMeasured] = useState(false);

  const handleTextLayout = (e: any) => {
    if (measured) return;
    setMeasured(true);

    const lines = e.nativeEvent.lines;

    if (!isExpanded && lines.length > numberOfLines) {
      setShowMore(true);

      const visibleLines = lines.slice(0, numberOfLines);
      const lastLine = visibleLines[visibleLines.length - 1].text;

      // Обрезаем по словам, чтобы moreLabel влезло
      const words = lastLine.trim().split(' ');
      let trimmedLast = '';
      for (let i = 0; i < words.length; i++) {
        const withWord = trimmedLast + (trimmedLast ? ' ' : '') + words[i];
        if ((withWord + moreLabel).length <= lastLine.length) {
          trimmedLast = withWord;
        } else {
          break;
        }
      }

      const combined = visibleLines
        .slice(0, numberOfLines - 1)
        .map((l: { text: string }) => l.text)
        .join('');

      setDisplayedText(combined + trimmedLast);
    } else {
      // текст помещается полностью, ничего не обрезаем
      setDisplayedText(text);
    }
  };
  console.log('[ExpandableText.ExpandableText.render]');

  return (
    <>
      {!measured ? (
        <Text style={styles.text} onTextLayout={handleTextLayout}>
          {text}
        </Text>
      ) : !isExpanded ? (
        <Text style={styles.text}>
          {displayedText}
          {showMore && (
            <Text onPress={() => setIsExpanded(true)} style={styles.more}>
              {' '}
              {moreLabel}
            </Text>
          )}
        </Text>
      ) : (
        <Text style={styles.text}>
          {text}
          <Text onPress={() => setIsExpanded(false)} style={styles.more}>
            {' '}
            {lessLabel}
          </Text>
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  more: {
    color: 'blue',
  },
});

export default ExpandableText;
