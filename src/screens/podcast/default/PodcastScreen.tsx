import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import * as NavigationService from "react-navigation-helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";
/**
 * ? Local Imports
 */
import createStyles from "./PodcastScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { SCREENS } from "@shared-constants";
import SearchAutoComplete from "components/search-autocomplete/SearchAutoComplete";
import SelectDropdown from "react-native-select-dropdown";
import { IPodcast, SelectItem } from "@services/models";
import { PODCAST_SEARCH_SORT } from "enums/constants";
import { PODCAST_SORT } from "store/podcast/types";
import { usePodcast } from "store/podcast/hooks";
import axios from "axios";
import Podcast from "../components/podcast/Podcast";

interface PodcastScreenProps {}

const PodcastScreen: React.FC<PodcastScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { query, sort, setSort } = usePodcast();
  const [podcastList, setPodcastList] = useState<IPodcast[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFilterPress = () => {
    NavigationService.navigate(SCREENS.PODCAST, {
      screen: SCREENS.PODCAST_FILTER,
    });
  };

  const handleNewEpisode = () => {
    NavigationService.navigate(SCREENS.PODCAST, {
      screen: SCREENS.PODCAST_NEW,
    });
  };

  useEffect(() => {
    console.log("podcast=>", query);
    setLoading(true);
    axios
      .get(
        `https://podcasts.valurank.com/api/podchaser/search?q=${query}&sort_by=${sort.value}&direction=desc`,
        {
          headers: {
            Authorization: "ApiKey UdEtwyaP33w_uJ069KNcbZqaZN8WfWpLANueVQi9Klc",
          },
        },
      )
      .then((res) => {
        setLoading(false);
        setPodcastList(res?.data.data);
        setCount(res?.data?.data.length ?? 0);
      })
      .catch(({ response }) => {
        setLoading(false);
        console.log("error:", response?.data?.errors);
      });
  }, [query, sort]);

  const Header = () => (
    <View style={styles.header}>
      <Text h3 bold>
        PODCASTS
      </Text>
      <RNBounceable onPress={handleFilterPress}>
        <Icon name="filter" type="Feather" />
      </RNBounceable>
    </View>
  );

  const StatusBar = () => (
    <View style={styles.statusBar}>
      <Text h5>{count} results</Text>
      <View style={styles.select}>
        <Text h5>Sort by</Text>
        <SelectDropdown
          data={PODCAST_SORT}
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
            selectedItem: SelectItem<PODCAST_SEARCH_SORT>,
          ) => selectedItem.text}
          rowTextForSelection={(item: SelectItem<PODCAST_SEARCH_SORT>) =>
            item.text
          }
          buttonStyle={{
            width: 120,
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

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SearchAutoComplete />
      <TouchableOpacity onPress={handleNewEpisode}>
        <Text color={colors.primary}>go to New Episodes</Text>
      </TouchableOpacity>
      <StatusBar />
      {loading ? (
        <ActivityIndicator
          color={colors.primary}
          style={{ marginTop: 20 }}
          size="large"
        />
      ) : (
        <FlatList
          data={podcastList}
          renderItem={({ item }) => <Podcast data={item} />}
          // ListFooterComponent={Footer}
        />
      )}
    </SafeAreaView>
  );
};

export default PodcastScreen;
