import React, { useMemo, useState } from "react";
import { useAuth } from "store/auth/hooks";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { Image, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import createStyles from "./Subscription.style";
import { ISubscription } from "@services/models";
import { usePodcast } from "store/podcast/hooks";
import Icon from "react-native-dynamic-vector-icons";

interface SubscriptionProps {
  data: ISubscription;
}

const Subscription = ({ data }: SubscriptionProps) => {
  const { id, title } = data;
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { subscriptions, checks, setChecks } = usePodcast();

  const isChecked = checks.find((c) => c === id);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setChecks(id)}>
        {isChecked ? (
          <Image source={require("/assets/img/check.png")} />
        ) : (
          <Image source={require("/assets/img/uncheck.png")} />
        )}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Icon name="rightcircle" type="AntDesign" color={colors.primary} />
    </View>
  );
};

export default Subscription;
