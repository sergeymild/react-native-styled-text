import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  type StyleProp,
  type TextStyle,
  Image,
  type ImageSourcePropType,
  type ImageStyle,
} from 'react-native';

interface Props {
  text: string;
  numberOfLines: number;
  moreLabel?: string;
  lessLabel?: string;
  style?: StyleProp<TextStyle>;
  moreLessStyle?: StyleProp<TextStyle>;
  startImage?: ImageSourcePropType;
  endImage?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
}

const ExpandableText: React.FC<Props> = ({
  text,
  numberOfLines,
  moreLabel = '...more',
  lessLabel = 'Less',
  style,
  moreLessStyle,
  startImage,
  endImage,
  imageStyle,
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

  const renderStartImage = () =>
    startImage ? (
      <Image source={startImage} style={[styles.image, imageStyle]} />
    ) : null;

  const renderEndImage = () =>
    endImage ? (
      <Image source={endImage} style={[styles.image, imageStyle]} />
    ) : null;

  return (
    <>
      {!measured ? (
        <Text style={[styles.text, style]} onTextLayout={handleTextLayout}>
          {text}
        </Text>
      ) : !isExpanded ? (
        <Text style={[styles.text, style]}>
          {renderStartImage()}
          {displayedText}
          {showMore && (
            <Text
              onPress={() => setIsExpanded(true)}
              style={[styles.more, moreLessStyle]}
            >
              {' '}
              {moreLabel}
            </Text>
          )}
          {renderEndImage()}
        </Text>
      ) : (
        <Text style={[styles.text, style]}>
          {renderStartImage()}
          {text}
          <Text
            onPress={() => setIsExpanded(false)}
            style={[styles.more, moreLessStyle]}
          >
            {' '}
            {lessLabel}
          </Text>
          {renderEndImage()}
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
  image: {
    width: 16,
    height: 16,
  },
});

export default ExpandableText;
