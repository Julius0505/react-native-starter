import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./ScienceScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";

interface ScienceScreenProps {}

const ScienceScreen: React.FC<ScienceScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text h1 color={colors.text}>
        Scienific Studies
      </Text>
    </View>
  );
};

export default ScienceScreen;
