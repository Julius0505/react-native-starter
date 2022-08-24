import { ScreenWidth } from "@freakycoder/react-native-helpers";
import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";

interface Style {
  container: ViewStyle;
  provider: ViewStyle;
  providerInfo: TextStyle;
  indicators_head: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      marginTop: 10,
      marginBottom: 80,
      padding: 6,
      borderWidth: 5,
      borderColor: '#1c2133',
      borderRadius: 5,
    },
    provider: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    providerInfo: {
      padding: 4
    },
    indicators_head:{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  });
};
