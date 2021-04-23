import * as React from "react"
import { Text } from "react-native"
import { View } from "react-native"
import AddEntry from "./components/AddEntry"
import { getMetricMetaInfo } from "./utils/helpers"

export default class App extends React.Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }
  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)

    this.setState((state) => {
      const count = state[metric] + step

      return {
        ...state,
        [metric]: count > max ? max : count,
      }
    })
  }
  decrement = (metric) => {
    this.setState((state) => {
      //metric is run/bike... value 
      const count = state[metric] - getMetricMetaInfo(metric).step

      return {
        ...state,
        [metric]: count < 0 ? 0 : count,
      }
    })
  }
  slide = (metric, value) => {
    this.setState(() => ({
      [metric]: value
    }))
  }
  render(){
  return (
    <View>
     
      <Text>Universal React with Expo</Text>
      <AddEntry></AddEntry>
{/*    
      <View>{getMetricMetaInfo("run").getIcon()}</View>
      <Text>{getMetricMetaInfo("run").displayName}</Text>
     
      <View>{getMetricMetaInfo("bike").getIcon()}</View>
      <Text>{getMetricMetaInfo("bike").displayName}</Text>

      <View>{getMetricMetaInfo("swim").getIcon()}</View>
      <Text>{getMetricMetaInfo("swim").displayName}</Text>
     
      <View>{getMetricMetaInfo("sleep").getIcon()}</View>
      <Text>{getMetricMetaInfo("sleep").displayName}</Text>

      <View>{getMetricMetaInfo("eat").getIcon()}</View>
      <Text>{getMetricMetaInfo("eat").displayName}</Text> */}
    </View>
  );
}
}
