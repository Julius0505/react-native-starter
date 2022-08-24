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

interface EpisodeProps {
  data: IEpisode;
}

const Episode = ({ data }: EpisodeProps) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { access_token } = useAuth();

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

  return (
    <View style={styles.container}>
      <Text h4 bold color={colors.black}>
        {title}
      </Text>
      <View style={styles.inline}>
        <Text>{podcast_title}</Text>
        <Text style={styles.divider}>|</Text>
        <Text>{moment(data?.airDate).calendar()}</Text>
      </View>
      <Text>{handleMaxWordCount(data?.description, 20)}</Text>
      <TouchableOpacity style={styles.button}>
        <Icon name="play-circle-outline" type="Ionicons" color={colors.white} />
        <Text bold color={colors.white} style={{ marginLeft: 6 }}>
          Play
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Episode;
