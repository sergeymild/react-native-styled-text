import { StyleSheet, View, ScrollView } from 'react-native';
import { StyledText } from 'react-native-styled-text';
import ExpandableText from '../../src/ExpandableText';

export default function App() {
  const longText =
    'Lorem ipsum dolor sit amet---Basic styles  Italic text Underlined text Underlined text Underlined text';
  return (
    <ScrollView style={styles.container}>
      <ExpandableText
        moreLabel="...read more"
        lessLabel=" less"
        text={longText}
        numberOfLines={2}
      />
      <View style={{ marginTop: 20 }} />
      <View style={styles.section}>
        <StyledText text="Basic styles:" />
        <StyledText text="_(fw)[Bold text]" />
        <StyledText text="_(italic)[Italic text]" />
        <StyledText text="_(underline)[Underlined text]" />
      </View>

      <View style={styles.section}>
        <StyledText text="Font weights:" />
        <StyledText text="_(fw:100)[Thin text]" />
        <StyledText text="_(fw:400)[Normal text]" />
        <StyledText text="_(fw:700)[Bold text]" />
        <StyledText text="_(fw:900)[Black text]" />
      </View>

      <View style={styles.section}>
        <StyledText text="Colors:" />
        <StyledText text="_(red)[Red text]" />
        <StyledText text="_(blue)[Blue text]" />
        <StyledText text="_(green)[Green text]" />
        <StyledText text="_(#FF0000)[Hex red]" />
        <StyledText text="_(#00FF00)[Hex green]" />
        <StyledText text="_(#0000FF)[Hex blue]" />
      </View>

      <View style={styles.section}>
        <StyledText text="Sizes:" />
        <StyledText text="_(fs:12)[Small text]" />
        <StyledText text="_(fs:16)[Normal text]" />
        <StyledText text="_(fs:24)[Large text]" />
        <StyledText text="_(lh:20)[Text with line height]" />
      </View>

      <View style={styles.section}>
        <StyledText text="Combined styles:" />
        <StyledText text="_(fw|italic)[Bold and italic]" />
        <StyledText text="_(fw|underline)[Bold and underlined]" />
        <StyledText text="_(italic|underline)[Italic and underlined]" />
        <StyledText text="_(fw|italic|underline)[All basic styles]" />
        <StyledText
          text="_(italic|#00f)[Click here](https://example.com)"
          onLinkPress={(link) => {
            console.log('[App.press]', link);
          }}
        />
        <StyledText
          text="[Click here](https://example.com)"
          styles={{ color: 'black' }}
          onLinkPress={(link) => {
            console.log('[App.press]', link);
          }}
        />
      </View>

      <View style={styles.section}>
        <StyledText text="Complex combinations:" />
        <StyledText text="_(fw:700|red|fs:20)[Bold red large text]" />
        <StyledText text="_(italic|blue|lh:30)[Italic blue text with line height]" />
        <StyledText text="_(fw:500|underline|#FF0000|fs:18)[Medium bold underlined red text]" />
      </View>

      <View style={styles.section}>
        <StyledText text="Mixed text:" />
        <StyledText text="Normal text _(fw)[bold text] normal again" />
        <StyledText text="_(fw)[Bold _(red)[red] text]" />
        <StyledText text="_(italic)[Italic _(underline)[underlined] text]" />
      </View>

      <View style={styles.section}>
        <StyledText text="Multiple styles in one text:" />
        <StyledText text="_(fw)[Bold] _(italic)[italic] _(underline)[underlined] _(red)[red] _(blue)[blue]" />
        <StyledText text="_(fw:700)[Bold] _(italic)[italic] _(#FF0000)[red] _(fs:20)[large]" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 140,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 24,
  },
});
