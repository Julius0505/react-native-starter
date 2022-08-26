import React, { useMemo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import createStyles from "./NewsFilter.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import Slider from "@react-native-community/slider";
import { ENewsCategory, NewsCategories, NewsSource } from "store/news/types";
import { useNews } from "store/news/hooks";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import Icon from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
import { getExpLocalData, setExpLocalData } from "shared/functions";

interface INewsFilterProps {}

const NewsFilter: React.FC<INewsFilterProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const {
    category,
    cutoffs,
    unCheckedSources,
    allSources,
    setCategory,
    setCutOffs,
    setSourceCheck,
    setUnCheckedSources,
    setAllSources,
  } = useNews();
  const [checkAll, setCheckAll] = React.useState(true);
  const styles = useMemo(() => createStyles(theme), [theme]);

  React.useEffect(() => {
    const fetchData = async () => {
      const expAllSources = await getExpLocalData("NEWS_ALL_SOURCES");
      if (expAllSources) setAllSources(expAllSources);
      else {
        axios
          .get("https://s.valurank.com/api/v1/otherweb/news-sources")
          .then((res) => {
            setExpLocalData(
              "NEWS_ALL_SOURCES",
              res.data?.items,
              1000 * 60 * 60,
            );
            setAllSources(res.data?.items);
          });
      }
    };
    fetchData().catch(console.error);
  }, []);

  const handleCheckAll = () => {
    if (!checkAll) {
      setUnCheckedSources([]);
    } else {
      setUnCheckedSources(allSources.map((source) => source.username));
    }
    setCheckAll((c) => !c);
  };

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
        <Text h3 bold color={colors.text} style={styles.subTitle}>
          Categories
        </Text>

        {Object.keys(NewsCategories).map((cId: string) => (
          <TouchableOpacity
            style={styles.categoryItem}
            key={cId}
            onPress={() => setCategory(cId as ENewsCategory)}
          >
            <Text h4 color={category === cId ? colors.primary : colors.text}>
              {NewsCategories[cId as keyof typeof NewsCategories]}
            </Text>
            <Text h5 color={colors.text}>
              results
            </Text>
          </TouchableOpacity>
        ))}

        <Text h3 bold color={colors.text} style={styles.subTitle}>
          My Preferences
        </Text>

        <View style={styles.preferenceIndicator}>
          <Text h5 color={colors.primary}>
            Higher quality
          </Text>
          <Image source={require("/assets/img/bidirection.png")} />
          <Text h5 color={colors.text}>
            Larger quantity
          </Text>
        </View>

        {Object.keys(cutoffs).map((cId: string) => (
          <View key={cId}>
            <Text h4 color={category === cId ? colors.primary : colors.text}>
              {NewsCategories[cId as keyof typeof NewsCategories]}
            </Text>
            <Slider
              value={cutoffs[cId as keyof typeof cutoffs]}
              onValueChange={(v) => {
                setCutOffs({ ...cutoffs, [cId]: v });
              }}
              minimumValue={0}
              style={styles.slider}
              step={1}
              // thumbImage={require("/assets/img/slider_thumb.png")}
              maximumValue={100}
              thumbTintColor={colors.white}
              minimumTrackTintColor={colors.gray}
              maximumTrackTintColor={colors.primary}
            />
          </View>
        ))}

        <TouchableOpacity style={styles.sourceCheck} onPress={handleCheckAll}>
          {checkAll ? (
            <Image source={require("/assets/img/check.png")} />
          ) : (
            <Image source={require("/assets/img/uncheck.png")} />
          )}
          <Text h3 bold color={colors.text} style={styles.subTitle}>
            My Sources
          </Text>
        </TouchableOpacity>
        {allSources.map((source: NewsSource) => (
          <TouchableOpacity
            key={source.username}
            style={styles.sourceCheck}
            onPress={() => setSourceCheck(source.username)}
          >
            {unCheckedSources.includes(source.username) ? (
              <Image source={require("/assets/img/uncheck.png")} />
            ) : (
              <Image source={require("/assets/img/check.png")} />
            )}
            <Text h5 style={styles.sourceLabel}>
              {source.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsFilter;
