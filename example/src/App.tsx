import { StyleSheet, View, ScrollView } from 'react-native';
import { StyledText } from 'react-native-styled-text';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <StyledText text="Basic styles:" />
        <StyledText text="_(bold)[Bold text]" />
        <StyledText text="_(italic)[Italic text]" />
        <StyledText text="_(underline)[Underlined text]" />
      </View>

      <View style={styles.section}>
        <StyledText text="Font weights:" />
        <StyledText text="_(bold:100)[Thin text]" />
        <StyledText text="_(bold:400)[Normal text]" />
        <StyledText text="_(bold:700)[Bold text]" />
        <StyledText text="_(bold:900)[Black text]" />
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
        <StyledText text="_(fontSize:12)[Small text]" />
        <StyledText text="_(fontSize:16)[Normal text]" />
        <StyledText text="_(fontSize:24)[Large text]" />
        <StyledText text="_(lineHeight:20)[Text with line height]" />
      </View>

      <View style={styles.section}>
        <StyledText text="Combined styles:" />
        <StyledText text="_(bold|italic)[Bold and italic]" />
        <StyledText text="_(bold|underline)[Bold and underlined]" />
        <StyledText text="_(italic|underline)[Italic and underlined]" />
        <StyledText text="_(bold|italic|underline)[All basic styles]" />
      </View>

      <View style={styles.section}>
        <StyledText text="Complex combinations:" />
        <StyledText text="_(bold:700|red|fontSize:20)[Bold red large text]" />
        <StyledText text="_(italic|blue|lineHeight:30)[Italic blue text with line height]" />
        <StyledText text="_(bold:500|underline|#FF0000|fontSize:18)[Medium bold underlined red text]" />
      </View>

      <View style={styles.section}>
        <StyledText text="Mixed text:" />
        <StyledText text="Normal text _(bold)[bold text] normal again" />
        <StyledText text="_(bold)[Bold _(red)[red] text]" />
        <StyledText text="_(italic)[Italic _(underline)[underlined] text]" />
      </View>

      <View style={styles.section}>
        <StyledText text="Multiple styles in one text:" />
        <StyledText text="_(bold)[Bold] _(italic)[italic] _(underline)[underlined] _(red)[red] _(blue)[blue]" />
        <StyledText text="_(bold:700)[Bold] _(italic)[italic] _(#FF0000)[red] _(fontSize:20)[large]" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 24,
  },
});
