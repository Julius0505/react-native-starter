import { ViewStyle, StyleSheet, TextStyle, ImageStyle } from "react-native";
import { ExtendedTheme } from "@react-navigation/native";
import { ScreenWidth } from "@freakycoder/react-native-helpers";

interface Style {
  container: ViewStyle;
  header: ViewStyle;
  listContainer: ViewStyle;
  footer: ViewStyle;
  infoText: TextStyle;
  loadMoreButton: ViewStyle
}

export default (theme: ExtendedTheme) => {
  const { colors } = theme;
  return StyleSheet.create<Style>({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: colors.background,
    },
    header: {
      width: ScreenWidth * 0.9,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    listContainer: {
      marginTop: 8,
      paddingBottom: 100
    },
    footer: {
      flex: 1,
      alignItems: 'center',
      padding: 12
    },
    infoText: {
      color: colors.primary
    },
    loadMoreButton: {
      borderRadius: 10
    }
  });
};
