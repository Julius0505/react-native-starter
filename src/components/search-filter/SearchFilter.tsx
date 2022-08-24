import React from "react";
import { View, StyleProp, ViewStyle, Switch, Button } from "react-native";
import Text from "@shared-components/text-wrapper/TextWrapper";
import { useTheme } from "@react-navigation/native";
import createStyles from "./SearchFilter.style";
import { SearchFilterSettings, SettingType } from "@shared-constants";
import { useSearch } from "store/search/hooks";

interface SearchFilterProps {}

const SearchFilter: React.FC<SearchFilterProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const { filterSetting, setFilterSetting } = useSearch();
  const styles = React.useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      {SearchFilterSettings.map((sf: SettingType) => {
        const isEnabled = !!filterSetting.find((s) => s === sf.id);
        return (
          <View style={styles.switch} key={sf.id}>
            <Text h5 style={styles.switchTitle}>
              {sf.title}
            </Text>
            <View style={styles.switchBody}>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? colors.primary : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setFilterSetting(sf.id)}
                value={isEnabled}
              />
              <Text>{isEnabled ? "Show" : "Don't show"}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default SearchFilter;
