import React, { useMemo, useState } from "react";
import moment from "moment";
import { useAuth } from "store/auth/hooks";
import { useSetting } from "store/setting/hooks";
import axios from "axios";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { Image, TouchableOpacity, View } from "react-native";
import { IEpisode } from "@services/models";
import { useTheme } from "@react-navigation/native";
import createStyles from "./Episode.style";
import { handleMaxWordCount } from "shared/functions";
import Icon from "react-native-dynamic-vector-icons";
import SoundPlayer from "react-native-sound-player";
import { usePodcast } from "store/podcast/hooks";

interface EpisodeProps {
  data: IEpisode;
}

const Episode = ({ data }: EpisodeProps) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { access_token } = useAuth();
  const { playing, setPlaying, episode, setEpisode } = usePodcast();

  const {
    id,
    title,
    airDate,
    audioUrl,
    description,
    fileSize,
    htmlDescription,
    imageUrl,
    length,
    url,
    podcast_id,
    podcast_title,
  } = data;

  const isPlaying = playing && episode?.id === id;

  const handlePlay = () => {
    setPlaying(true);
    if (isPlaying) setPlaying(false);
    setEpisode(data);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePlay}>
        <Text h4 bold color={colors.black}>
          {title}
        </Text>
      </TouchableOpacity>
      <View style={styles.inline}>
        <Text>{podcast_title}</Text>
        <Text style={styles.divider}>|</Text>
        <Text>{moment(data?.airDate).calendar()}</Text>
      </View>
      <Text>{handleMaxWordCount(data?.description, 20)}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePlay}>
        <Icon
          name={`${isPlaying ? "pause" : "play"}-circle-outline`}
          type="Ionicons"
          color={colors.white}
        />
        <Text bold color={colors.white} style={{ marginLeft: 6 }}>
          {isPlaying ? "Puase" : "Play"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Episode;
