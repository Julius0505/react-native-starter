import { ViewStyle, StyleSheet, TextStyle, ImageStyle } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  switch: ViewStyle;
  switchBody: ViewStyle;
  switchTitle: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      width: ScreenWidth*0.9,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start'
    },
    switch: {
      marginTop: 16,
      width: '50%',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    switchBody: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    switchTitle: {
      textTransform: 'uppercase',
      fontWeight: "700"
    }
  });
};
