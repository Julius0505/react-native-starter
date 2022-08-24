import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  title: TextStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 6,  
    },
    title: {
      marginHorizontal: 6
    }
  });
};
