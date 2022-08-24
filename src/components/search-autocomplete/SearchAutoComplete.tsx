import React from "react";
import { View, TextInput } from "react-native";
import { useTheme } from "@react-navigation/native";
import createStyles from "./SearchAutoComplete.style";
import { useSearch } from "store/search/hooks";
import Icon from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "@shared-constants";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { SEARCH_FIELD_TYPE } from "enums/constants";
import { useNews } from "store/news/hooks";

interface SearchAutoCompleteProps {}

const SearchAutoComplete: React.FC<SearchAutoCompleteProps> = () => {
  const { query: searchQuery, type, setQuery: setSearchQuery } = useSearch();
  const { query: newsQuery, setQuery: setNewsQuery } = useNews();

  const theme = useTheme();
  const { colors } = theme;
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const handleSearch = () => {
    if (type === SEARCH_FIELD_TYPE.SEARCH)
      NavigationService.navigate(SCREENS.SEARCH, {
        screen: SCREENS.SEARCH_RESULT,
      });
    if (type === SEARCH_FIELD_TYPE.NEWS)
      NavigationService.navigate(SCREENS.NEWS, {
        screen: SCREENS.NEWS_DEFAULT,
      });
  };

  const query =
    type === SEARCH_FIELD_TYPE.SEARCH
      ? searchQuery
      : type === SEARCH_FIELD_TYPE.NEWS
      ? newsQuery
      : "";

  const handleChangeText = (text: string) => {
    if (type === SEARCH_FIELD_TYPE.SEARCH) setSearchQuery(text);
    if (type === SEARCH_FIELD_TYPE.NEWS) setNewsQuery(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        placeholder="type here..."
        onSubmitEditing={handleSearch}
        onChangeText={handleChangeText}
        style={styles.textInput}
      />
      <RNBounceable onPress={handleSearch}>
        <Icon
          name="search"
          type="FontAwesome"
          color={colors.primary}
          onPress={handleSearch}
        />
      </RNBounceable>
    </View>
  );
};

export default SearchAutoComplete;
