import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./PodcastScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";

interface PodcastScreenProps {}

const PodcastScreen: React.FC<PodcastScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text h1 color={colors.text}>
        Notification
      </Text>
    </View>
  );
};

export default PodcastScreen;
