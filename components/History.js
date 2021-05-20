import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import { Agenda } from 'react-native-calendars'
import { white } from '../utils/colors'
import DateHeader from './DateHeader'
import MetricCard from "./MetricCard"
import AppLoading from 'expo-app-loading'

class History extends Component {
    state = {
        ready: false,
      }
  componentDidMount () {
        const { dispatch } = this.props

        fetchCalendarResults()
        //update redux with results of fetch, this will go to rerender
        .then((entries) => dispatch(receiveEntries(entries)))
        .then(({ entries }) => {
            //if we entered no information for the current day
            if (!entries[timeToString()]) {
            dispatch(addEntry({
                //  [timeToString()] the value is going to be a result of calling getDailyReminderValue()
                [timeToString()]: getDailyReminderValue()
            }))
            }
        })
        .then(() => this.setState(() => ({ready: true})))
    }

    renderItem = ({ today, ...metrics }, formattedDate, key) => (
        <View style={styles.item}>
          {today
                // ? <Text>{JSON.stringify(today)}</Text>
                // : <Text>{JSON.stringify(metrics)}</Text>
             ? <View>
                    {/* <DateHeader date={formattedDate}/> */}
                    <Text style={styles.noDataText}>
                        {today}
                    </Text>
                </View>

            // :   <TouchableOpacity onPress={() => console.log('Pressed!')}>
                
            :   <TouchableOpacity onPress={() => this.props.navigation.navgate(
                 "EntryDetails",
                 { entryId: key }
            )}>
                    {/* <Text>{JSON.stringify(metrics)}</Text> */}
                    <MetricCard metrics={metrics} date={formattedDate}/>
                </TouchableOpacity>
            
            }
        </View>
    )


    renderEmptyDate = formattedDate => {
        return (
        //   <View>
        //     <Text>No Data for this day</Text>
        //   </View>
            <View style={styles.item}>
                {/* <DateHeader date={formattedDate}/> */}
                
                <Text style={styles.noDataText}>
                    You didn't log any data on this day.
                </Text>
            </View>
        )
    }

    // under render we will have enteries we got when we called fetch
    render() {
        const { entries } = this.props
        const { ready } = this.state

        if (ready === false) {
          return <AppLoading />
        }
        return (
            // <View>
            // <Text>{JSON.stringify(this.props)}</Text>
            // </View>
          
            <Agenda
                items={entries}
                //pass a function which return some ui or JSX that will be rendered whenever the calendar is going to render a cpecific day
                //renderItem - method
                renderItem={this.renderItem}
                //and if date is empty , then jsx from this
                //renderEmptyDate - method
                renderEmptyDate={this.renderEmptyDate} 
            />
         
        )
    }
  }

  const styles = StyleSheet.create({
    item: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
     },

    noDataText: {
        fontSize: 20,
        paddingTop: 20,
        paddingBottom: 20
    }

  })
  
  function mapStateToProps (entries) {
    return {
      entries
    }
  }
  
  export default connect(mapStateToProps)(History)