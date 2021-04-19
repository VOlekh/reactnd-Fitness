import React, { Component } from "react";
import { View } from "react-native";
import { getMetricMetaInfo } from "../utils/helpers";


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
        this.setState(()=>{
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
      return (
        <View>
            {getMetricMetaInfo("bike").getIcon()}
        </View>
      )
    }
}   
