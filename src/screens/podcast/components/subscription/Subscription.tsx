import React, { useMemo, useState } from "react";
import { useAuth } from "store/auth/hooks";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { Image, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import createStyles from "./Subscription.style";
import { ISubscription } from "@services/models";
import { usePodcast } from "store/podcast/hooks";
import Icon from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "@shared-constants";
interface SubscriptionProps {
  data: ISubscription;
}

const Subscription = ({ data }: SubscriptionProps) => {
  const { id, title } = data;
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { subscriptions, unChecks, setChecks } = usePodcast();

  const unChecked = unChecks.find((c) => c === id);

  const handleGoDetail = () => {
    NavigationService.navigate(SCREENS.PODCAST, {
      screen: SCREENS.PODCAST_DETAIL,
      params: { id },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setChecks(id)}>
        {unChecked ? (
          <Image source={require("/assets/img/uncheck.png")} />
        ) : (
          <Image source={require("/assets/img/check.png")} />
        )}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Icon
        name="rightcircle"
        type="AntDesign"
        color={colors.primary}
        onPress={handleGoDetail}
      />
    </View>
  );
};

export default Subscription;
