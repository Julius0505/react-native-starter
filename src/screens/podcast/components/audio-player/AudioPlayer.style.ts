import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  inline: ViewStyle;
  divider: TextStyle;
  button: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      padding: 6,
    },
    inline: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    divider: {
      marginHorizontal:6
    },
    button: {
      marginTop: 6,
      width: 100,
      padding: 6,
      borderRadius: 6,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: colors.primary
    }
  });
};
