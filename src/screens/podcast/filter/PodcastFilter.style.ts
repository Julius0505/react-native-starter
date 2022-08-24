import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";

interface Style {
  goBack: ViewStyle;
  container: ViewStyle;
  subTitle: TextStyle;
  slider: ViewStyle;
  categoryItem: ViewStyle;
  preferenceIndicator: ViewStyle;
  sourceCheck: ViewStyle;
  sourceLabel: TextStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    goBack: {
      padding: 10,
    },
    container: {
      paddingHorizontal: 20,
      paddingBottom: 100
    },
    subTitle: {
      textTransform: 'uppercase',
      paddingVertical: 8
    },
    slider: {
      padding: 6
    },
    categoryItem: {
      margin: 6,
      paddingLeft: 6, 
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    preferenceIndicator: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: 12,
    },
    sourceCheck: {
      paddingVertical: 6,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    sourceLabel: {
      paddingLeft: 6
    }
  });
};
