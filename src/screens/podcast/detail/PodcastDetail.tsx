import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute, useTheme } from "@react-navigation/native";
import * as NavigationService from "react-navigation-helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";
/**
 * ? Local Imports
 */
import createStyles from "./PodcastDetail.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { SCREENS } from "@shared-constants";
import SearchAutoComplete from "components/search-autocomplete/SearchAutoComplete";
import { IEpisode, IPodcast, ISubscription } from "@services/models";
import { usePodcast } from "store/podcast/hooks";
import axios from "axios";
import Episode from "../components/episode/Episode";
import AudioPlayer from "../components/audio-player/AudioPlayer";
import Podcast from "../components/podcast/Podcast";

interface PodcastDetailProps {}

const PodcastDetail: React.FC<PodcastDetailProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const { params } = useRoute();
  const { id } = params as { id: string };
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [podcast, setPodcast] = useState<IPodcast>();
  const [episodeList, setEpisodeList] = useState<IEpisode[]>([]);

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

  console.log("params:", id);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://podcasts.valurank.com/api/podchaser/podcast/${id}`, {
        headers: {
          Authorization: "ApiKey UdEtwyaP33w_uJ069KNcbZqaZN8WfWpLANueVQi9Klc",
        },
      })
      .then((res) => {
        setLoading(false);
        setPodcast(res?.data.data);
        setEpisodeList(res?.data?.data?.episodes?.data ?? []);
      })
      .catch(() => {
        setLoading(false);
        setPodcast(undefined);
        setEpisodeList([]);
      });
  }, [id]);

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

      <TouchableOpacity onPress={handleNewEpisode}>
        <Text color={colors.primary}>go to New Episodes</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator
          color={colors.primary}
          style={{ marginTop: 20 }}
          size="large"
        />
      ) : (
        <>
          {podcast && (
            <FlatList
              style={styles.list}
              data={episodeList}
              renderItem={({ item }) => <Episode data={item} />}
              ListHeaderComponent={<Podcast data={podcast} />}
            />
          )}
          <AudioPlayer />
        </>
      )}
    </SafeAreaView>
  );
};

export default PodcastDetail;
