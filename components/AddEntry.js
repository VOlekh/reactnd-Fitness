import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { getMetricMetaInfo, timeToString } from "../utils/helpers";
import Slider from "./Slider";
import Steppers from "./Steppers";
import DateHeader from "./DateHeader";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";

function SubmitBtn ({ onPress }) {
    return (
      <TouchableOpacity
        onPress={onPress}>
          <Text>SUBMIT</Text>
      </TouchableOpacity>
    )
  }


export default class AddEntry extends Component {
    state = {
        //metrics
        run:10,
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

    submit = () => {
        const key = timeToString()
        const entry = this.state
    
        // Update Redux
        // reset lockal state
        this.setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 }))
    
        // Navigate to home
    
        // Save to "DB"
    
        // Clear local notification
      }

    reset = () => {
        const key = timeToString();
    
        // Update Redux
    
        // Route to Home
    
        // Update "DB"
    };
    
    render(){
        const metaInfo = getMetricMetaInfo()
        if (this.props.alreadyLogged) {
            return (
                <View>
                    <Ionicons name={"md-happy"} size={100} />
                    <Text>You already logged your information for today.</Text>
                    <TextButton onPress={this.reset}>Reset</TextButton>
                </View>
            )
            }  
            
            
            return (
                //display either slider or stepper
                <View>
                    <DateHeader date={(new Date()).toLocaleDateString()}/>
                    <Text>{JSON.stringify(this.state)}</Text>
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
                    <SubmitBtn onPress={this.submit} />
                </View>
            )
    }
}