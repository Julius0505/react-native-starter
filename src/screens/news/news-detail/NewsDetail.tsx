import React, { useMemo } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import moment from "moment";
import Icon from "react-native-dynamic-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import createStyles from "./NewsDetail.style";
import { INews } from "@services/models";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { handleLongString, handleMaxWordCount } from "shared/functions";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface INewsDetailProps {}

const NewsDetail: React.FC<INewsDetailProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  // const { id, headline, source_name, created_at, source_url } = data;

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text h4 bold color={colors.primary}>
        {handleMaxWordCount(headline, 40)}
      </Text>
      <Text h5 color={colors.calpyse}>
        {moment(created_at).calendar()}
      </Text>
      <Text h5 color={colors.text} style={styles.descriptionTextStyle}>
        {source_name}
      </Text> */}
    </SafeAreaView>
  );
};

export default NewsDetail;
