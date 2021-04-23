import React, { Component } from "react";
import { View, Text } from "react-native";
import { getMetricMetaInfo } from "../utils/helpers";
import Slider from './Slider'
import Steppers from './Steppers'


export default class AddEntry extends Component {
    state = {
        //metrics
        run:0,
        bike: 0,
        swime: 0,
        //
        sleep:0,
        eat: 0,
    }
    //create increment method
    increment = (metric) =>{
        //max what should metric to be and a step to increment - step
        const{max, step}= getMetricMetaInfo(metric)
        this.setState((state)=>{
            const count = statate[metric] + step
        //object you return from setState is gona be merjed with the current state
            return{
                //keep all we have
                ...state,
                //update metric with if : count is bigger than max value, than count
                [metric]:count > max ? max : count
            }
        })
    }


    decrement = (metric) =>{
        this.setState((state) => {
            const count = state[metric] - getMetricMetaInfo(metric).step
            return {
                ...state,
                [metric]: count > max ? max : count,
            }
        })
    }


    slide = (metric, value) => {
      this.setState(() => ({
        [metric]: value
      }))
    }

    render(){
        const metaInfo = getMetricMetaInfo()
      return (
          //display either slider or stepper
        <View>
            <View>
            <Text>{getMetricMetaInfo("run").displayName}</Text>
            <View>{getMetricMetaInfo("run").getIcon()}</View>
             </View>
             {Object.keys(metaInfo).map((key) => {
                 // get everything from metaInfo[key] and map over
                const { getIcon, type, ...rest } = metaInfo[key]
                const value = this.state[key]
                return(
                    //return UI
                    <View key={key}>
                        {getIcon()}
                        {type === 'slider'
                            ? <Slider
                            //take value from this state key
                                value={value}
                                onChange={(value) => this.slide(key, value)}
                                {...rest}
                            />
                            : <Steppers
                                value={value}
                                onIncrement={() => this.increment(key)}
                                onDecrement={() => this.decrement(key)}
                                {...rest}
                            />}
                    </View>
                )
             })
             }
        </View>
      )
    }
}