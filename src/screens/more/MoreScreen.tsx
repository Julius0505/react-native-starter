import React, { useMemo } from "react";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./MoreScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";

interface MoreScreenProps {}

const MoreScreen: React.FC<MoreScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("/assets/img/logo_title.png")}
        style={styles.logoImage}
      />
      <Text h1 color={colors.text}>
        More
      </Text>
    </SafeAreaView>
  );
};

export default MoreScreen;
