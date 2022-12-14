import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
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
import { IEpisode, ISubscription } from "@services/models";
import { usePodcast } from "store/podcast/hooks";
import axios from "axios";
import Episode from "../components/episode/Episode";
import AudioPlayer from "../components/audio-player/AudioPlayer";

interface NewEpisodesProps {}

const NewEpisodes: React.FC<NewEpisodesProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { query, sort, unChecks, subscriptions, setSort } = usePodcast();
  const [episodeList, setEpisodeList] = useState<IEpisode[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFilterPress = () => {
    NavigationService.navigate(SCREENS.PODCAST, {
      screen: SCREENS.PODCAST_FILTER,
    });
  };

  const handleNewEpisode = () => {};

  const ids = subscriptions
    .map((s: ISubscription) => s.id)
    .filter((id: string) => !unChecks.includes(id));

  console.log("ids", ids);

  useEffect(() => {
    console.log("podcast=>", query);
    setLoading(true);
    axios
      .post(
        `https://podcasts.valurank.com/api/episodes`,
        { ids },
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

      {loading ? (
        <ActivityIndicator
          color={colors.primary}
          style={{ marginTop: 20 }}
          size="large"
        />
      ) : (
        <>
          <FlatList
            style={styles.list}
            data={episodeList}
            renderItem={({ item }) => <Episode data={item} />}
            ListHeaderComponent={
              <Text h4 bold>
                NEW EPISODES FROM MY PODCASTS
              </Text>
            }
          />
          <AudioPlayer />
        </>
      )}
    </SafeAreaView>
  );
};

export default NewEpisodes;
