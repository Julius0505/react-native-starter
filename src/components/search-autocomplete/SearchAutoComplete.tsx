import React from "react";
import { View, StyleProp, ViewStyle, TextInput, Button } from "react-native";
import { useTheme } from "@react-navigation/native";
// import Select, {
//   SelectConfig,
//   SelectItem,
// } from "@redmin_delishaj/react-native-select";
import createStyles from "./SearchAutoComplete.style";
// import { SEARCH_FIELD_TYPE } from "enums/constants";
import { useSearch } from "store/search/hooks";
import Icon from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
import { SCREENS } from "@shared-constants";
import RNBounceable from "@freakycoder/react-native-bounceable";

interface SearchAutoCompleteProps {}

// const data: SelectItem[] = [
//   { text: "News only", value: SEARCH_FIELD_TYPE.NEWS },
//   { text: "Entire web", value: SEARCH_FIELD_TYPE.SEARCH },
//   { text: "Podcasts", value: SEARCH_FIELD_TYPE.PODCAST },
// ];

// const getSelectItem = (value: SEARCH_FIELD_TYPE) =>
//   data.find((item) => item.value === value);

const SearchAutoComplete: React.FC<SearchAutoCompleteProps> = () => {
  const { query, type, setQuery, setType } = useSearch();

  const theme = useTheme();
  const { colors } = theme;
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  // const config: SelectConfig = {
  //   fontSize: 14,
  //   textColor: "black",
  //   backgroundColor: colors.transparent,
  //   selectedBackgroundColor: colors.gray,
  // };

  const handleSearch = () => {
    NavigationService.navigate(SCREENS.SEARCH, {
      screen: SCREENS.SEARCH_RESULT,
    });
  };

  return (
    <View style={styles.container}>
      {/* <Select
        data={data}
        onSelect={(s: SelectItem) => setType(s.value)}
        value={getSelectItem(type)}
        width={120}
        config={config}
        textBoxStyle={{
          marginBottom: -3,
          paddingBottom: 0,
          backgroundColor: colors.gray,
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
        }}
        dropdownStyle={{ backgroundColor: colors.white }}
        selectedTextStyle={{ color: colors.primary, fontSize: 14 }}
      /> */}
      <TextInput
        value={query}
        placeholder="type here..."
        onSubmitEditing={handleSearch}
        onChangeText={(newText) => setQuery(newText)}
        style={styles.textInput}
      />
      <RNBounceable onPress={handleSearch}>
        <Icon
          name="search"
          type="FontAwesome"
          color={colors.primary}
          onPress={handleSearch}
        />
      </RNBounceable>
    </View>
  );
};

export default SearchAutoComplete;
