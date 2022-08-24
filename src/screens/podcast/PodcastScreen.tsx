import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import * as NavigationService from "react-navigation-helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-dynamic-vector-icons";
import RNBounceable from "@freakycoder/react-native-bounceable";
/**
 * ? Local Imports
 */
import createStyles from "./PodcastScreen.style";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { SCREENS } from "@shared-constants";
import SearchAutoComplete from "components/search-autocomplete/SearchAutoComplete";
import SelectDropdown from "react-native-select-dropdown";
import { SelectItem } from "@services/models";
import { PODCAST_SEARCH_SORT } from "enums/constants";
import { PODCAST_SORT } from "store/podcast/types";
import { usePodcast } from "store/podcast/hooks";

interface PodcastScreenProps {}

const PodcastScreen: React.FC<PodcastScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { sort, setSort } = usePodcast();

  const handleFilterPress = () => {
    NavigationService.navigate(SCREENS.NEWS, { screen: SCREENS.NEWS_FILTER });
  };

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

  const StatusBar = () => (
    <View style={styles.statusBar}>
      <Text h5>0 results</Text>
      <View style={styles.select}>
        <Text h5>Sort by</Text>
        <SelectDropdown
          data={PODCAST_SORT}
          defaultValue={sort}
          renderDropdownIcon={() => (
            <Icon
              name="caret-down"
              type="Ionicons"
              color={colors.primary}
              size={12}
            />
          )}
          dropdownIconPosition="right"
          onSelect={(selectedItem) => setSort(selectedItem)}
          buttonTextAfterSelection={(
            selectedItem: SelectItem<PODCAST_SEARCH_SORT>,
          ) => selectedItem.text}
          rowTextForSelection={(item: SelectItem<PODCAST_SEARCH_SORT>) =>
            item.text
          }
          buttonStyle={{
            width: 120,
            backgroundColor: colors.transparent,
          }}
          buttonTextStyle={{
            color: colors.primary,
            fontSize: 14,
            textAlign: "left",
          }}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <SearchAutoComplete />
      <StatusBar />
    </SafeAreaView>
  );
};

export default PodcastScreen;
