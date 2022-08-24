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
import createStyles from "./NewEpisodes.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { SCREENS } from "@shared-constants";
import SearchAutoComplete from "components/search-autocomplete/SearchAutoComplete";
import SelectDropdown from "react-native-select-dropdown";
import { IEpisode, IPodcast, SelectItem } from "@services/models";
import { PODCAST_SEARCH_SORT } from "enums/constants";
import { PODCAST_SORT } from "store/podcast/types";
import { usePodcast } from "store/podcast/hooks";
import axios from "axios";
import Podcast from "../components/podcast/Podcast";
import Episode from "../components/episode/Episode";

interface NewEpisodesProps {}

const NewEpisodes: React.FC<NewEpisodesProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { query, sort, checks, setSort } = usePodcast();
  const [episodeList, setEpisodeList] = useState<IEpisode[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFilterPress = () => {
    console.log("nav");
    NavigationService.navigate(SCREENS.PODCAST, {
      screen: SCREENS.PODCAST_FILTER,
    });
  };

  const handleNewEpisode = () => {};

  useEffect(() => {
    console.log("podcast=>", query);
    setLoading(true);
    axios
      .post(
        `https://podcasts.valurank.com/api/episodes`,
        { ids: checks },
        {
          headers: {
            Authorization: "ApiKey UdEtwyaP33w_uJ069KNcbZqaZN8WfWpLANueVQi9Klc",
          },
        },
      )
      .then((res) => {
        setEpisodeList(
          (res?.data?.data?.results ?? []).map((r: any) => r._source),
        );
        setLoading(false);
      })
      .catch((res) => {
        setEpisodeList([]);
        setLoading(false);
        console.error(res);
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

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SearchAutoComplete />
      <Text bold>NEW EPISODES FROM MY PODCASTS</Text>
      {loading ? (
        <ActivityIndicator
          color={colors.primary}
          style={{ marginTop: 20 }}
          size="large"
        />
      ) : (
        <FlatList
          style={styles.list}
          data={episodeList}
          renderItem={({ item }) => <Episode data={item} />}
        />
      )}
    </SafeAreaView>
  );
};

export default NewEpisodes;
