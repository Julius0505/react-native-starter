import React, { useEffect, useMemo, useState } from "react";
import moment from "moment";
import { useAuth } from "store/auth/hooks";
import { useSetting } from "store/setting/hooks";
import axios from "axios";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { Image, TouchableOpacity, View } from "react-native";
import { IEpisode } from "@services/models";
import { useTheme } from "@react-navigation/native";
import createStyles from "./AudioPlayer.style";
import { handleMaxWordCount } from "shared/functions";
import Icon from "react-native-dynamic-vector-icons";
import SoundPlayer from "react-native-sound-player";
import { usePodcast } from "store/podcast/hooks";

const AudioPlayer = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { access_token } = useAuth();
  const { playing, setPlaying, episode, setEpisode } = usePodcast();

  useEffect(() => {
    if (!episode) return;
    try {
      if (playing) SoundPlayer.playUrl(episode.audioUrl);
      else SoundPlayer.pause();
    } catch (e) {
      console.log("Cannot play audio", e);
    }
  }, [playing, episode]);

  if (!episode)
    return (
      <View style={styles.container}>
        <Text>No Episode</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text>Audio Player</Text>
    </View>
  );
};

export default AudioPlayer;
