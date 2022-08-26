import React from "react";
import { Image, useColorScheme } from "react-native";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
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
import NewsScreen from "@screens/news/default/NewsScreen";
import ProfileScreen from "@screens/profile/ProfileScreen";
import PodcastScreen from "@screens/podcast/default/PodcastScreen";
import NewsFilter from "@screens/news/filter/NewsFilter";
import NewsDetail from "@screens/news/detail/NewsDetail";
import { SEARCH_FIELD_TYPE } from "enums/constants";
import { useSetting } from "store/setting/hooks";
import PodcastFilter from "@screens/podcast/filter/PodcastFilter";
import NewEpisodes from "@screens/podcast/new-episodes/NewEpisodes";
import PodcastDetail from "@screens/podcast/detail/PodcastDetail";
import OpinionScreen from "@screens/opinion/Opinion";
import WikiScreen from "@screens/wiki/WikiScreen";
import ScienceScreen from "@screens/Science/ScienceScreen";
import CourseScreen from "@screens/Course/CourseScreen";
import BookScreen from "@screens/Book/BookScreen";
import Signin from "@screens/auth/signin/SigninScreen";
import { useAuth } from "store/auth/hooks";
import Signup from "@screens/auth/signup/SignupScreen";

// ? If you want to use stack or tab or both
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const AuthStack = createStackNavigator();
const SearchStack = createStackNavigator();
const NewsStack = createStackNavigator();
const PodcastStack = createStackNavigator();

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

const PodcastScreens = () => {
  return (
    <PodcastStack.Navigator screenOptions={{ headerShown: false }}>
      <PodcastStack.Screen
        name={SCREENS.PODCAST_DEFAULT}
        component={PodcastScreen}
      />
      <PodcastStack.Screen
        name={SCREENS.PODCAST_FILTER}
        component={PodcastFilter}
      />
      <PodcastStack.Screen name={SCREENS.PODCAST_NEW} component={NewEpisodes} />
      <PodcastStack.Screen
        name={SCREENS.PODCAST_DETAIL}
        component={PodcastDetail}
      />
    </PodcastStack.Navigator>
  );
};

const AuthScreens = () => {
  const { access_token } = useAuth();
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {access_token ? (
        <>
          <AuthStack.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
        </>
      ) : (
        <>
          <AuthStack.Screen name={SCREENS.SIGNIN} component={Signin} />
          <AuthStack.Screen name={SCREENS.SIGNUP} component={Signup} />
        </>
      )}
    </AuthStack.Navigator>
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
    switch (route.name) {
      case SCREENS.PODCAST:
        if (focused)
          return <Image source={require("/assets/img/podcast_1.png")} />;
        else return <Image source={require("/assets/img/podcast.png")} />;
      case SCREENS.OPINION:
        if (focused)
          return <Image source={require("/assets/img/opinion_1.png")} />;
        else return <Image source={require("/assets/img/opinion.png")} />;
      case SCREENS.SEARCH:
        if (focused)
          return <Image source={require("/assets/img/search_1.png")} />;
        else return <Image source={require("/assets/img/search.png")} />;
      case SCREENS.MORE:
        return (
          <Icon name="more-vertical" type="Feather" color={color} size={size} />
        );
      case SCREENS.NEWS:
      default:
        if (focused)
          return <Image source={require("/assets/img/news_1.png")} />;
        else return <Image source={require("/assets/img/news.png")} />;
    }
  };

  const renderDrawerIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName = "home";
    let type: IconType = "Ionicons";
    switch (route.name) {
      case SCREENS.AUTH:
        iconName = "user";
        type = "AntDesign";
        break;
      case SCREENS.WIKI:
        iconName = "wikipedia";
        type = "Fontisto";
        break;
      case SCREENS.SCIENCE:
        iconName = "chemistry";
        type = "SimpleLineIcons";
        break;
      case SCREENS.COURCES:
        iconName = "graduation";
        type = "SimpleLineIcons";
        break;
      case SCREENS.BOOKS:
        iconName = "book";
        type = "AntDesign";
        break;
      case SCREENS.HOME:
      default:
        iconName = "home";
        type = "AntDesign";
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
          name={SCREENS.NEWS}
          component={NewsScreens}
          listeners={{
            tabPress: () => {
              setSearchType(SEARCH_FIELD_TYPE.NEWS);
            },
          }}
        />
        <Tab.Screen name={SCREENS.OPINION} component={OpinionScreen} />
        <Tab.Screen
          name={SCREENS.PODCAST}
          component={PodcastScreens}
          listeners={{
            tabPress: () => {
              setSearchType(SEARCH_FIELD_TYPE.PODCAST);
            },
          }}
        />
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
          name={SCREENS.MORE}
          component={NewsScreen}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.openDrawer();
            },
          })}
        />
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
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          drawerPosition: "right",
          headerShown: false,
          drawerIcon: ({ focused, color, size }) =>
            renderDrawerIcon(route, focused, color, size),
          drawerStyle: {
            borderBottomLeftRadius: 16,
            borderTopLeftRadius: 16,
          },
        })}
      >
        <Drawer.Screen name={SCREENS.HOME} component={RenderTabNavigation} />
        <Drawer.Screen
          name={SCREENS.AUTH}
          component={AuthScreens}
          options={{ title: "Profile" }}
        />
        <Drawer.Screen name={SCREENS.WIKI} component={WikiScreen} />
        <Drawer.Screen name={SCREENS.SCIENCE} component={ScienceScreen} />
        <Drawer.Screen name={SCREENS.COURCES} component={CourseScreen} />
        <Drawer.Screen name={SCREENS.BOOKS} component={BookScreen} />
      </Drawer.Navigator>
      {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
      </Stack.Navigator> */}
    </NavigationContainer>
  );
};

export default Navigation;
