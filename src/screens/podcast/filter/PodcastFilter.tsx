import React, { useMemo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import createStyles from "./PodcastFilter.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import Icon from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { usePodcast } from "store/podcast/hooks";
import Subscription from "../components/subscription/Subscription";
import { SCREENS } from "@shared-constants";

interface IPodcastFilterProps {}

const PodcastFilter: React.FC<IPodcastFilterProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { subscriptions } = usePodcast();

  const handleGoBack = () => {
    NavigationService.navigate(SCREENS.PODCAST, {
      screen: SCREENS.PODCAST_DEFAULT,
    });
  };

  const Header = () => (
    <Text h3 bold color={colors.text} style={styles.subTitle}>
      My Subscriptions
    </Text>
  );

  return (
    <SafeAreaView>
      <Icon
        name="arrowleft"
        type="AntDesign"
        style={styles.goBack}
        size={24}
        onPress={handleGoBack}
      />
      <FlatList
        style={styles.container}
        ListHeaderComponent={Header}
        data={subscriptions}
        renderItem={({ item }) => <Subscription data={item} />}
      ></FlatList>
    </SafeAreaView>
  );
};

export default PodcastFilter;
