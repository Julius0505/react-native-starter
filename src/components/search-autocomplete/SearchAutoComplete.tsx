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
import { useSetting } from "store/setting/hooks";

interface SearchAutoCompleteProps {}

const SearchAutoComplete: React.FC<SearchAutoCompleteProps> = () => {
  const { searchType } = useSetting();
  const { query: searchQuery, setQuery: setSearchQuery } = useSearch();
  const { query: newsQuery, setQuery: setNewsQuery } = useNews();

  const theme = useTheme();
  const { colors } = theme;
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  const handleSearch = () => {
    if (searchType === SEARCH_FIELD_TYPE.SEARCH)
      NavigationService.navigate(SCREENS.SEARCH, {
        screen: SCREENS.SEARCH_RESULT,
      });
    if (searchType === SEARCH_FIELD_TYPE.NEWS)
      NavigationService.navigate(SCREENS.NEWS, {
        screen: SCREENS.NEWS_DEFAULT,
      });
  };

  const query =
    searchType === SEARCH_FIELD_TYPE.SEARCH
      ? searchQuery
      : searchType === SEARCH_FIELD_TYPE.NEWS
      ? newsQuery
      : "";

  const handleChangeText = (text: string) => {
    if (searchType === SEARCH_FIELD_TYPE.SEARCH) setSearchQuery(text);
    if (searchType === SEARCH_FIELD_TYPE.NEWS) setNewsQuery(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        defaultValue={query}
        placeholder="Type here..."
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
