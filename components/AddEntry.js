import React, { Component } from "react";
import { View, TouchableOpacity, Text, Platform, StyleSheet } from "react-native";
import {   getMetricMetaInfo,    timeToString,    getDailyReminderValue,    clearLocalNotification,    setLocalNotification } from "../utils/helpers";
import Slider from "./Slider";
import Steppers from "./Steppers";
import DateHeader from "./DateHeader";
import { Ionicons } from "@expo/vector-icons";
import TextButton from "./TextButton";
import { submitEntry, removeEntry } from '../utils/api'
import {connect} from "react-redux";
import { addEntry } from "../actions";
import { purple, white } from "../utils/colors";
import { CommonActions } from '@react-navigation/native';



function SubmitBtn ({ onPress }) {
    return (
      <TouchableOpacity
            // style={Platform.OS === "ios" ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            style={styles.iosSubmitBtn}
             onPress={onPress}>
            <Text  style={styles.submitBtnText}>SUBMIT</Text>
      </TouchableOpacity>
    )
  }


class AddEntry extends Component {
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
            const count = state[metric] + step
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
        this.props.dispatch(
            addEntry({
              [key]: entry
            })
          );

        // reset lockal state
        this.setState(() => ({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 }))
    
        // Navigate to home
        this.toHome()
        
    
        // Save to "DB"
        submitEntry({ key, entry })
    
        // Clear local notification
        clearLocalNotification()
        .then(setLocalNotification)
      }

    reset = () => {
        const key = timeToString();
    
        // Update Redux
        this.props.dispatch(
            addEntry({
              [key]: getDailyReminderValue()
            })
          );
    
        // Route to Home
        this.toHome()
    
        // Update "DB"
        removeEntry(key)
    };

    toHome = () => {
        this.props.navigation.dispatch({
          ...CommonActions.goBack(),
          source: 'AddEntry'
        })
      }

    render(){
        const metaInfo = getMetricMetaInfo()
        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons 
                        name={Platform.OS === "ios" ? "ios-happy-outline" : "md-happy"} 
                        size={100} />
                    <Text>You already logged your information for today.</Text>
                    <TextButton style={{padding:10}} onPress={this.reset}>Reset</TextButton>
                </View>
            )
            }  
            
            
            return (
                //display either slider or stepper
                <View style={styles.container}>
                    <DateHeader date={(new Date()).toLocaleDateString()}/>
                    <Text>{JSON.stringify(this.state)}</Text>
                    {Object.keys(metaInfo).map((key) => {
                        // get everything from metaInfo[key] and map over
                        const { getIcon, type, ...rest } = metaInfo[key]
                        const value = this.state[key]
                        return(
                            //return UI
                            <View key={key} style={styles.row}>
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
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: white
    },
    row: {
      flexDirection: "row",
      flex: 1,
      alignItems: "center"
    },
    iosSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40
    },
    AndroidSubmitBtn: {
      backgroundColor: purple,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      height: 45,
      borderRadius: 2,
      alignSelf: "flex-end",
      justifyContent: "center",
      alignItems: "center"
    },
    submitBtnText: {
      color: white,
      fontSize: 22,
      textAlign: "center"
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginLeft: 30,
      marginRight: 30
    }
  });
  
  function mapStateToProps(state) {
    const key = timeToString();
  
    return {
        // if state[key] not "0" and state[key].today undefined
    //   alreadyLogged: state[key] && typeof state[key].today === "undefined"
        alreadyLogged: state[key].length && typeof state[key][0].today === 'undefined'
    };
  }
  
  export default connect(mapStateToProps)(AddEntry);