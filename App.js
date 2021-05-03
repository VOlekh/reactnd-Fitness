import * as React from "react"
import { View, Text, StyleSheet} from "react-native"
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'


export default class App extends React.Component {
 
  render(){
  return (
    <Provider store={createStore(reducer)}>
      <View style={{flex: 1}}>
      <History />
        <AddEntry></AddEntry>
      </View>
    </Provider>
  );
}
}