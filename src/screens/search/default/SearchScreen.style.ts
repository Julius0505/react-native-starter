import { ViewStyle, StyleSheet, TextStyle, ImageStyle } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";

interface Style {
  container: ViewStyle;
  titleTextStyle: TextStyle;
  logoImage: ImageStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.white,
    },
    titleTextStyle: {
      fontSize: 16,
      fontWeight: "500",
      textTransform: 'uppercase',
      marginTop: 20
    },
    logoImage: {
      margin: 20,
    },
  });
};
