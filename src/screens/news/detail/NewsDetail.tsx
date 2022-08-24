import React, { useMemo } from "react";
import { View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
import createStyles from "./NewsDetail.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { handleMaxWordCount, stripHTML } from "shared/functions";
import { useNews } from "store/news/hooks";
import Icon from "react-native-dynamic-vector-icons";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import * as NavigationService from "react-navigation-helpers";
import Report from "../components/report/Report";

const AUTH = "Bearer fa123alallvq12cd9012avlq12pq23zx";

interface PropsItem {
  children?: React.ReactNode;
}

interface INewsDetailProps {}

const NewsDetail: React.FC<INewsDetailProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const { news } = useNews();
  const [isSummary, setIsSummary] = React.useState(true);
  const [report, setReport] = React.useState<any>();
  const [reportLoading, setReportLoading] = React.useState(true);
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (!news)
    return (
      <SafeAreaView style={styles.container}>
        <Text h4 bold color={colors.primary}>
          No Data
        </Text>
      </SafeAreaView>
    );

  const handleSwitch = () => {
    setIsSummary((s) => !s);
  };

  const SwitchButton = () => (
    <View style={styles.inline}>
      <TouchableOpacity
        onPress={handleSwitch}
        style={
          isSummary
            ? [styles.leftButton, { backgroundColor: colors.primary }]
            : styles.leftButton
        }
      >
        <Text h5 color={isSummary ? colors.white : colors.black}>
          Summary
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSwitch}
        style={
          !isSummary
            ? [styles.rightButton, { backgroundColor: colors.primary }]
            : styles.rightButton
        }
      >
        <Image
          source={
            isSummary
              ? require("/assets/img/vr_logo_1.png")
              : require("/assets/img/vr_logo_2.png")
          }
          style={{ marginRight: 6 }}
        />
        <Text h5 color={isSummary ? colors.black : colors.white}>
          Show nutrition label
        </Text>
      </TouchableOpacity>
    </View>
  );

  const Item = ({ children }: PropsItem) => {
    return (
      <View style={styles.summaryItem}>
        <Icon name="dot-fill" type="Octicons" style={{ marginRight: 6 }} />
        {children}
      </View>
    );
  };

  const { id, headline, source_name, created_at, source_url } = news;

  const items = useMemo(() => {
    setIsSummary(true);
    setReportLoading(true);
    axios
      .get(`https://api.valurank.com/v1/newsreader/${id}`, {
        headers: {
          Authorization: AUTH,
          Accept: "application/json",
        },
      })
      .then((res) => {
        setReport(res?.data);
        setReportLoading(false);
      });

    const summary = news.summary ?? "";

    return summary.replace("*", "").split("\n*");
  }, [news]);

  console.log("report >>>", report);

  return (
    <SafeAreaView>
      <Icon
        name="arrowleft"
        type="AntDesign"
        style={styles.goBack}
        size={24}
        onPress={() => NavigationService.goBack()}
      />
      <ScrollView style={styles.container}>
        <Text h4 bold color={colors.black}>
          {handleMaxWordCount(headline, 40)}
        </Text>
        <View style={styles.provider}>
          <Text h5 color={colors.text} style={styles.providerInfo}>
            by
          </Text>
          <Text h5 bold color={colors.text} style={styles.providerInfo}>
            {source_name}
          </Text>
          <Text h5 color={colors.text} style={styles.providerInfo}>
            |
          </Text>
          <Text h5 color={colors.text} style={styles.providerInfo}>
            {moment(created_at).calendar()}
          </Text>
        </View>

        <SwitchButton />

        {isSummary ? (
          <View style={styles.summary}>
            {items.map((item, i) => (
              <Item key={i}>
                <Text>{stripHTML(item)}</Text>
              </Item>
            ))}
          </View>
        ) : reportLoading ? (
          <ActivityIndicator
            color={colors.primary}
            style={{ marginTop: 20 }}
            size="large"
          />
        ) : (
          <Report data={report} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetail;
