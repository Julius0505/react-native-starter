import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, ImageStyle, StyleSheet } from "react-native";

interface Style {
  container: ViewStyle;
  logoImage: ImageStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.background,
    },
    logoImage: {
      margin: 20,
    },
  });
};
