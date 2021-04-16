import * as React from "react"
import { Text } from "react-native"
import AddEntry from "./components/AddEntry"

export default class App extends React.Component {
  render(){
  return (
    <View>
      <Text>Universal React with Expo</Text>
      <AddEntry/ >
    </View>
  );
}
}
