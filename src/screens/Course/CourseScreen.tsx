import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./CourseScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";

interface CourseScreenProps {}

const CourseScreen: React.FC<CourseScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <Text h1 color={colors.text}>
        Courses
      </Text>
    </View>
  );
};

export default CourseScreen;
