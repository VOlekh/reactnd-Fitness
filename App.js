import * as React from "react";
import { View, Text, Platform, StatusBar } from "react-native";
import AddEntry from "./components/AddEntry";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import History from "./components/History";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { enableScreens } from "react-native-screens";
import PagerView from "react-native-pager-view";
import { purple, white } from "./utils/colors";
import Constants from "expo-constants";
import Title from "./components/Title";
import Live from "./components/Live";
import { setLocalNotification } from "./utils/helpers";
import { createStackNavigator } from '@react-navigation/stack';
import EntryDetail from './components/EntryDetails';

const Stack = createStackNavigator();
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ color }) => {
            if (route.name === 'History') {
              return <Ionicons name='ios-bookmarks' size={30} color={color} />
            } else if (route.name === 'AddEntry') {
              return <FontAwesome name='plus-square' size={30} color={color} />
            } else if (route.name === 'Live') {
            return <Ionicons name='ios-speedometer' size={30} color={color} />
          }
          },
        })}
      tabBarOptions={{
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
          height: 56,
          backgroundColor: Platform.OS === 'ios' ? white : purple,
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3
          },
          shadowRadius: 6,
          shadowOpacity: 1
        }
      }}>
      <Tab.Screen
        name="History"
        component={History}
        options={{ headerShown: false }} />
      <Tab.Screen
        name="AddEntry"
        component={AddEntry}
        options={{ headerShown: false }} />
      <Tab.Screen
          name="Live"
          component={Live}
          options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}

{/* <Tab.Navigator
    initialRouteName="History"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        if (route.name === "History") {
          return (
            <Ionicons name="ios-bookmarks" size={30} color={color} />
          );
        } else if (route.name === "AddEntry") {
          return (
            <FontAwesome name="plus-square" size={30} color={color} />
          );
        } else if (route.name === "Live") {
          return (
            <Ionicons
              name="ios-speedometer"
              size={30}
              color={color}
            />
          );
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: Platform.OS === "ios" ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : purple,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    }}
    >
    <Tab.Screen
      name="Add Entry"
      component={AddEntry}
      options={{
        tabBarIcon: ({ color }) => (
          <FontAwesome name="plus-square" size={30} color={color} />
        ),
      }}
    />

    <Tab.Screen
      name="History"
      component={History}
      options={{
        tabBarIcon: ({ color }) => (
          <Ionicons name="ios-bookmarks" size={30} color={color} />
        ),
      }}
    />

    <Tab.Screen
      name="Live"
      component={Live}
      options={{ headerShown: false }}
    />
</Tab.Navigator> */}

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
const Tab =
  Platform.OS === "ios"
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

export default class App extends React.Component {
  // Uncomment to reset local data:
  // AsyncStorage.clear()
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        {/* <View style={{flex: 1}}>
        <History />
          <AddEntry></AddEntry>
        </View> */}
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            <UdaciStatusBar backgroundColor={purple} style='light' />
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={Tabs} />
              <Stack.Screen
                  name="EntryDetail"
                  component={EntryDetail}
                  options={({ route }) => ({
                    headerTintColor: white,
                    headerStyle: {
                      backgroundColor: purple
                    },
                    title: route.params.entryId,
                    headerTitle: props => <Title {...props} />
                  })} />
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </Provider>
    );
  }
}
