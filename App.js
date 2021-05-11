import * as React from "react"
import { View, Text, StyleSheet} from "react-native"
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { enableScreens } from 'react-native-screens';
import PagerView from 'react-native-pager-view';
import { purple, white } from './utils/colors'


function UdaciStatusBar ({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}
const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()

export default class App extends React.Component {
    // Uncomment to reset local data:
  // AsyncStorage.clear()
 
  render(){
  return (
    <Provider store={createStore(reducer)}>
      {/* <View style={{flex: 1}}>
      <History />
        <AddEntry></AddEntry>
      </View> */}
       <NavigationContainer>
          <Tab.Navigator
            initialRouteName='History'
            tabBarOptions={{
              activeTintColor: Platform.OS === 'ios' ? purple : white,
              style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? white : purple,
                shadowColor: 'rgba(0, 0, 0, 0.24)',
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
              name='Add Entry'
              component={ConnectedAddEntry}
              options={{
                tabBarIcon: ({ color }) => (
                  <FontAwesome name='plus-square' size={30} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name='History'
              component={ConnectedHistory}
              options={{
                tabBarIcon: ({ color }) => (
                  <Ionicons name='ios-bookmarks' size={30} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>

    </Provider>
  );
}
}