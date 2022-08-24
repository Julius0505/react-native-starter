import React, { useEffect, useMemo } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Button,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationService from "react-navigation-helpers";
import createStyles from "./SearchResultScreen.style";
import SearchResult from "../components/result-item/ResultItem";
import { SCREENS } from "@shared-constants";
import SearchAutoComplete from "components/search-autocomplete/SearchAutoComplete";
import axios, { AxiosRequestConfig } from "axios";
import { useSearch } from "store/search/hooks";
import { ISearchResult } from "@services/models";
import Text from "@shared-components/text-wrapper/TextWrapper";
import Icon from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";
import { SEARCH_FIELD_TYPE } from "enums/constants";

interface SearchResultScreenProps {}

const SearchResultScreen: React.FC<SearchResultScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [results, setResults] = React.useState<ISearchResult[]>([]);
  const [scrollPos, setScrollPos] = React.useState(0);
  const [lastResults, setLastResults] = React.useState<ISearchResult[]>();
  const { query, lang, market, offset, bingOffset, setOffset, setBingOffset } =
    useSearch();

  const config: AxiosRequestConfig = {
    method: "post",
    url: "https://s.valurank.com/api/v1/search",
    data: {
      query: query,
      lang: lang,
      market: market,
      offset: offset,
      bingOffset: bingOffset,
      limit: 30,
      strictLanguage: true,
      useOnlyBing: true,
    },
  };

  useEffect(() => {
    loadMore(true);
  }, []);

  const loadMore = async (init = false) => {
    let r = results;
    if (init) {
      setOffset(0);
      setBingOffset(0);
      setResults((r = []));
      setScrollPos(0);
    }
    setLastResults(undefined);
    axios(config).then((res) => {
      const newList = r.concat(res.data.data);
      setLastResults(res.data.data ?? []);
      setResults(newList);
      setScrollPos(0);
      setOffset(newList.filter((v) => !v.isBing).length);
      setBingOffset(newList.filter((v) => v.isBing).length);
    });
  };

  const loading = lastResults === undefined;
  const noMore = !((lastResults && lastResults.length) || results.length);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollPos(event.nativeEvent.contentOffset.y);
  };

  const Header = () => (
    <View style={styles.header}>
      <Text h3 bold>
        SEARCH
      </Text>
      <RNBounceable>
        <Icon name="filter" type="Feather" />
      </RNBounceable>
    </View>
  );

  const Footer = () => (
    <View style={styles.footer}>
      {loading ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : noMore ? (
        <Text h4 style={styles.infoText}>
          No more results available for this query.
        </Text>
      ) : (
        <Button
          onPress={() => loadMore()}
          disabled={loading}
          title="load more"
        />
      )}
    </View>
  );

  const List = () => (
    <View style={styles.listContainer}>
      <FlatList
        data={results}
        renderItem={({ item }) => <SearchResult data={item} />}
        ListFooterComponent={Footer}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SearchAutoComplete />
      <List />
    </SafeAreaView>
  );
};

export default SearchResultScreen;
