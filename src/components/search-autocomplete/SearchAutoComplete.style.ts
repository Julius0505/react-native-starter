import { ViewStyle, StyleSheet, TextStyle, ImageStyle } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  textInput: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      margin: 10,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      zIndex: 1,
      backgroundColor: colors.lightDark,
      borderRadius: 30,
      width: ScreenWidth*0.9,
      paddingRight: 15,
      paddingLeft: 15,
      borderColor: colors.gray,
      borderWidth: 1,
    },
    textInput: {
      marginLeft: 5,
      flex: 1,
    }
  });
};
