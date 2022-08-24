import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";

interface Style {
  container: ViewStyle;
  descriptionTextStyle: TextStyle;
  
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      padding: 12,
      width: ScreenWidth * 0.95,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderColor,
    },
    descriptionTextStyle: {
      marginTop: 8,
    },
  });
};
