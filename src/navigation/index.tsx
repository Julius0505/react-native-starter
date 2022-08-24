import React from "react";
import { useColorScheme } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
/**
 * ? Local & Shared Imports
 */
import { SCREENS } from "@shared-constants";
import { LightTheme, DarkTheme, palette } from "@theme/themes";
// ? Screens
import SearchScreen from "@screens/search/default/SearchScreen";
import SearchResultScreen from "@screens/search/result/SearchResultScreen";
import NewsScreen from "@screens/news/news-default/NewsScreen";
import DetailScreen from "@screens/detail/DetailScreen";
import ProfileScreen from "@screens/profile/ProfileScreen";
import MoreScreen from "@screens/more/MoreScreen";
import PodcastScreen from "@screens/podcast/PodcastScreen";
import NewsFilter from "@screens/news/news-filter/NewsFilter";
import NewsDetail from "@screens/news/news-detail/NewsDetail";
import { SEARCH_FIELD_TYPE } from "enums/constants";
import { useSetting } from "store/setting/hooks";

// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const SearchStack = createStackNavigator();
const NewsStack = createStackNavigator();

const SearchScreens = () => {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen
        name={SCREENS.SEARCH_DEFAULT}
        component={SearchScreen}
      />
      <SearchStack.Screen
        name={SCREENS.SEARCH_RESULT}
        component={SearchResultScreen}
      />
    </SearchStack.Navigator>
  );
};

const NewsScreens = () => {
  return (
    <NewsStack.Navigator screenOptions={{ headerShown: false }}>
      <NewsStack.Screen name={SCREENS.NEWS_DEFAULT} component={NewsScreen} />
      <NewsStack.Screen name={SCREENS.NEWS_DETAIL} component={NewsDetail} />
      <NewsStack.Screen name={SCREENS.NEWS_FILTER} component={NewsFilter} />
    </NewsStack.Navigator>
  );
};

const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  React.useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName = "home";
    let type: IconType = "Ionicons";
    switch (route.name) {
      case SCREENS.NEWS:
        iconName = focused ? "newspaper" : "newspaper-outline";
        break;
      case SCREENS.PODCAST:
        iconName = "podcast";
        type = "Fontisto";
        break;
      case SCREENS.PROFILE:
        iconName = focused ? "person" : "person-outline";
        break;
      case SCREENS.MORE:
        iconName = "more-vertical";
        type = "Feather";
        break;
      case SCREENS.SEARCH:
      default:
        iconName = focused ? "search" : "search-outline";
        break;
    }
    return <Icon name={iconName} type={type} size={size} color={color} />;
  };

  const RenderTabNavigation = () => {
    const { setSearchType } = useSetting();
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) =>
            renderTabIcon(route, focused, color, size),
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: palette.black,
          tabBarStyle: {
            backgroundColor: isDarkMode ? palette.black : palette.gray,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          },
        })}
      >
        <Tab.Screen
          name={SCREENS.SEARCH}
          component={SearchScreens}
          listeners={{
            tabPress: () => {
              setSearchType(SEARCH_FIELD_TYPE.SEARCH);
            },
          }}
        />
        <Tab.Screen
          name={SCREENS.NEWS}
          component={NewsScreens}
          listeners={{
            tabPress: () => {
              setSearchType(SEARCH_FIELD_TYPE.NEWS);
            },
          }}
        />
        <Tab.Screen
          name={SCREENS.PODCAST}
          component={PodcastScreen}
          listeners={{
            tabPress: () => {
              setSearchType(SEARCH_FIELD_TYPE.PODCAST);
            },
          }}
        />
        <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
        <Tab.Screen name={SCREENS.MORE} component={MoreScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.TABS} component={RenderTabNavigation} />
        <Stack.Screen name={SCREENS.DETAIL}>
          {(props) => <DetailScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
