import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle, ImageStyle } from "react-native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  inline: ViewStyle;
  divider: TextStyle;
  title: TextStyle;
  image: ImageStyle;
  button: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      marginHorizontal: 6,
      marginVertical: 8,
    },
    inline: {
      display: 'flex',
      flexDirection: "row",
      alignItems: "center",
    },
    divider: {
      paddingHorizontal: 6
    },
    title: {
      color: colors.primary
    },
    image: {
      width: 60, height: 60, marginRight: 6
    }, 
    button: {
      backgroundColor: colors.primary,
      width: 120,
      padding: 6,
      borderRadius: 6,
      marginTop: 4,
      alignItems: 'center'
    }

  });
};
