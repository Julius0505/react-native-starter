import { ExtendedTheme } from "@react-navigation/native";
import { ViewStyle, StyleSheet, TextStyle } from "react-native";

interface Style {
  goBack: ViewStyle;
  container: ViewStyle;
  provider: ViewStyle;
  providerInfo: TextStyle;
  inline: ViewStyle;
  leftButton: ViewStyle;
  rightButton: ViewStyle;
  summaryItem: ViewStyle;
  summary: ViewStyle;
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    goBack: {
      padding: 10,
    },
    container: {
      padding: 12,
    },
    provider: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    providerInfo: {
      padding: 4
    },
    inline: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    leftButton: {
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderColor: colors.primary,
      borderWidth: 1,
    },
    rightButton: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      borderColor: colors.primary,
      borderWidth: 1,
    },
    summaryItem: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 6
    },
    summary: {
      margin: 8
    }
  });
};
