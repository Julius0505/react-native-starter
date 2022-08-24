import React, { useMemo } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import moment from "moment";
import RNBounceable from "@freakycoder/react-native-bounceable";
import createStyles from "./NewsResult.style";
import { INews } from "@services/models";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { handleMaxWordCount } from "shared/functions";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface INewsResultProps {
  style?: CustomStyleProp;
  data: INews;
  onPress: () => void;
}

const NewsResult: React.FC<INewsResultProps> = ({ style, data, onPress }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { id, headline, source_name, created_at, source_url } = data;

  return (
    <RNBounceable style={[styles.container, style]} onPress={onPress}>
      <Text h4 bold color={colors.black}>
        {handleMaxWordCount(headline, 40)}
      </Text>
      <View style={styles.provider}>
        <Text h5 color={colors.text} style={styles.providerInfo}>
          by
        </Text>
        <Text h5 bold color={colors.text} style={styles.providerInfo}>
          {source_name}
        </Text>
        <Text h5 color={colors.text} style={styles.providerInfo}>
          |
        </Text>
        <Text h5 color={colors.text} style={styles.providerInfo}>
          {moment(created_at).calendar()}
        </Text>
      </View>
    </RNBounceable>
  );
};

export default NewsResult;
