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
import { NEWS_SEARCH_SORT } from "enums/constants";
import { useNews } from "store/news/hooks";
import { NewsSource, NEWS_SORT } from "store/news/types";

interface NewsScreenProps {}

const NewsScreen: React.FC<NewsScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const {
    query,
    sort,
    searchAfter,
    category,
    cutoffs,
    unCheckedSources,
    allSources,
    setSort,
    setNews,
    setSearchAfter,
  } = useNews();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<INews[]>([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    loadMore(true);
    setResults([]);
  }, [query, sort, category, cutoffs, unCheckedSources, allSources]);

  const loadMore = (init?: boolean) => {
    setLoading(true);
    const preData = init ? [] : results;
    axios
      .get(
        `https://s.valurank.com/api/v1/otherweb/news?query=${query}${
          !init && searchAfter ? "&search_after=" + searchAfter : ""
        }${
          category === "all"
            ? Object.keys(cutoffs)
                .map(
                  (cId) =>
                    `&category=${cId}&cutoff=${cId}:${
                      cutoffs[cId as keyof typeof cutoffs]
                    }`,
                )
                .join("")
            : `&category=${category}&cutoff=${category}:${
                cutoffs[category as keyof typeof cutoffs]
              }`
        }${
          !unCheckedSources.length
            ? ""
            : allSources
                .filter(
                  (x: NewsSource) => !unCheckedSources.includes(x?.username),
                )
                .map((s: NewsSource) => `&source=${s?.username}`)
                .join("")
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

  const handleItemPress = (item: INews) => {
    setNews(item);
    NavigationService.navigate(SCREENS.NEWS, { screen: SCREENS.NEWS_DETAIL });
  };

  const handleFilterPress = () => {
    NavigationService.navigate(SCREENS.NEWS, { screen: SCREENS.NEWS_FILTER });
  };

  const Header = () => (
    <View style={styles.header}>
      <Text h3 bold>
        NEWS
      </Text>
      <RNBounceable onPress={handleFilterPress}>
        <Icon name="filter" type="Feather" />
      </RNBounceable>
    </View>
  );

  const StatusBar = () => (
    <View style={styles.statusBar}>
      <Text h5>{total} results</Text>
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
              size={12}
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
            width: 180,
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
          <NewsResult data={item} onPress={() => handleItemPress(item)} />
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
