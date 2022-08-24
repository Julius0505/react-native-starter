import axios from "axios";
import React, { useMemo } from "react";
import { ActivityIndicator, Button, FlatList, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationService from "react-navigation-helpers";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon from "react-native-dynamic-vector-icons";
import createStyles from "./NewsScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import SearchAutoComplete from "components/search-autocomplete/SearchAutoComplete";
import { SCREENS } from "@shared-constants";
import NewsResult from "../components/news-item/NewsResult";
import { INews, SelectItem } from "@services/models";
import { useSearch } from "store/search/hooks";
import { NEWS_SEARCH_SORT, SEARCH_FIELD_TYPE } from "enums/constants";
import { useNews } from "store/news/hooks";

export const NEWS_SORT: SelectItem<NEWS_SEARCH_SORT>[] = [
  { text: "Most relevant first", value: NEWS_SEARCH_SORT.RELEVANT },
  { text: "Most recent first", value: NEWS_SEARCH_SORT.RECENT },
  { text: "Most informative first", value: NEWS_SEARCH_SORT.INFORMATIVE },
];

interface NewsScreenProps {}

const NewsScreen: React.FC<NewsScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const { type, setType } = useSearch();
  const { query, sort, setSort } = useNews();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [loading, setLoading] = React.useState(false);
  const [searchAfter, setSearchAfter] = React.useState<string>();
  const [results, setResults] = React.useState<INews[]>([]);
  const [total, setTotal] = React.useState();

  React.useEffect(() => {
    setType(SEARCH_FIELD_TYPE.NEWS);
    loadMore(true);
    setResults([]);
  }, []);

  const loadMore = (init?: boolean) => {
    setLoading(true);
    const preData = init ? [] : results;
    axios
      .get(
        `https://s.valurank.com/api/v1/otherweb/news?query=${query}${
          !init && searchAfter ? "&search_after=" + searchAfter : ""
        }`,
      )
      .then((res) => {
        setTotal(res.data.total);
        const r = preData.concat(res.data.items);
        setResults(r);
        setSearchAfter(res.data.search_after);
        setLoading(false);
      });
  };

  const handleItemPress = () => {
    NavigationService.navigate(SCREENS.NEWS, { screen: SCREENS.NEWS_DETAIL });
  };

  const handleFilterPress = () => {
    console.log("filterpress");
    NavigationService.navigate(SCREENS.NEWS, { screen: SCREENS.NEWS_FILTER });
  };

  const Header = () => (
    <View style={styles.header}>
      <Text h3 bold>
        News
      </Text>
      <RNBounceable onPress={handleFilterPress}>
        <Icon name="filter" type="Feather" />
      </RNBounceable>
    </View>
  );

  const StatusBar = () => (
    <View style={styles.statusBar}>
      <Text h5>{results.length} results</Text>
      <View style={styles.select}>
        <Text h5>Sort by</Text>
        <SelectDropdown
          data={NEWS_SORT}
          defaultValue={sort}
          renderDropdownIcon={() => (
            <Icon
              name="caret-down"
              type="Ionicons"
              color={colors.primary}
              size={16}
            />
          )}
          dropdownIconPosition="right"
          onSelect={(selectedItem) => setSort(selectedItem)}
          buttonTextAfterSelection={(
            selectedItem: SelectItem<NEWS_SEARCH_SORT>,
          ) => selectedItem.text}
          rowTextForSelection={(item: SelectItem<NEWS_SEARCH_SORT>) =>
            item.text
          }
          buttonStyle={{
            backgroundColor: colors.transparent,
          }}
          buttonTextStyle={{
            color: colors.primary,
            fontSize: 14,
            textAlign: "left",
          }}
        />
      </View>
    </View>
  );

  const Footer = () => (
    <View style={styles.footer}>
      {loading ? (
        <ActivityIndicator color={colors.primary} />
      ) : results.length > 0 ? (
        !!searchAfter ? (
          <Button
            onPress={() => loadMore()}
            disabled={loading}
            title="load more"
          />
        ) : (
          <Text h4 style={styles.infoText}>
            End of recent results on this topic.
          </Text>
        )
      ) : (
        !loading && (
          <Text h4 style={styles.infoText}>
            No results. Perhaps the quality cutoffs settings are a bit too high?
          </Text>
        )
      )}
    </View>
  );

  const List = () => (
    <View style={styles.listContainer}>
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <NewsResult data={item} onPress={handleItemPress} />
        )}
        ListFooterComponent={Footer}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SearchAutoComplete />
      <StatusBar />
      <List />
    </SafeAreaView>
  );
};

export default NewsScreen;
