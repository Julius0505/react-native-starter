import React, { useMemo, useState } from "react";
import moment from "moment";
import { useAuth } from "store/auth/hooks";
import { useSetting } from "store/setting/hooks";
import axios from "axios";
import Text from "@shared-components/text-wrapper/TextWrapper";
import {
  ActivityIndicator,
  Button,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { IPodcast } from "@services/models";
import { useTheme } from "@react-navigation/native";
import createStyles from "./Podcast.style";
import { handleLongString } from "shared/functions";
import { usePodcast } from "store/podcast/hooks";

interface PodcastProps {
  data: IPodcast;
}

const Podcast = ({ data }: PodcastProps) => {
  const theme = useTheme();
  const { colors } = theme;
  const { loading, subscriptions, subscribe } = usePodcast();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { access_token } = useAuth();

  const { id, title, latestEpisodeDate, description, imageUrl } = data;

  console.log("subscriptions >>>", subscriptions);

  const isSubscribed = subscriptions.find((sub) => sub.id === id);

  const handleSubscribe = () => {
    subscribe({ id, title });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inline}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={{ flex: 1 }}>
          <Text h4 bold color={colors.primary}>
            {title}
          </Text>
          <View style={styles.inline}>
            {/* <Text>{id}</Text>
            <Text style={styles.divider}>|</Text> */}
            <Text>{moment(data?.latestEpisodeDate).calendar()}</Text>
          </View>
        </View>
      </View>
      <Text>{handleLongString(description, 200)}</Text>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isSubscribed ? colors.secondary : colors.primary },
        ]}
        onPress={handleSubscribe}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text color={colors.white}>
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Podcast;
