import React, { useMemo } from "react";
import { Image, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import createStyles from "./SearchScreen.style";
import SearchAutoComplete from "components/search-autocomplete/SearchAutoComplete";
import SearchFilter from "components/search-filter/SearchFilter";
import { useSearch } from "store/search/hooks";
import { SEARCH_FIELD_TYPE } from "enums/constants";

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { setType } = useSearch();

  React.useEffect(() => {
    setType(SEARCH_FIELD_TYPE.SEARCH);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("/assets/img/logo_title.png")}
        style={styles.logoImage}
      />
      <SearchAutoComplete />
      <Text style={styles.titleTextStyle}>Search Result</Text>
      <SearchFilter />
    </SafeAreaView>
  );
};

export default HomeScreen;
