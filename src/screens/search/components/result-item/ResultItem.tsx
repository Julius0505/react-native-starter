import React, { useMemo } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@react-navigation/native";
import Icon from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";
import createStyles from "./ResultItem.style";
import { ISearchResult } from "@services/models";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { handleLongString } from "shared/functions";

type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;

interface ISearchResultProps {
  style?: CustomStyleProp;
  data: ISearchResult;
}

const SearchResult: React.FC<ISearchResultProps> = ({ style, data }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { name, url, displayUrl, snippet, groupParent, description } = data;

  return (
    <RNBounceable style={[styles.container, style]}>
      <Text h4 bold color={colors.primary}>
        {name}
      </Text>
      <Text h5 color={colors.calpyse}>
        {handleLongString(url, 40)}
      </Text>
      <Text h5 color={colors.text} style={styles.descriptionTextStyle}>
        {snippet}
      </Text>
    </RNBounceable>
  );
};

export default SearchResult;
