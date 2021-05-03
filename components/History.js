import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import { Agenda } from 'react-native-calendars'
import { white } from '../utils/colors'
import DateHeader from './DateHeader'

class History extends Component {
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
        <View>
          {today
            ? <Text>{JSON.stringify(today)}</Text>
            : <Text>{JSON.stringify(metrics)}</Text>}
        </View>
    )


    renderEmptyDate(formattedDate) {
        return (
          <View>
            <Text>No Data for this day</Text>
          </View>
        )
    }

    // under render we will have enteries we got when we called fetch
    render() {
        const { entries } = this.props
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
  
  function mapStateToProps (entries) {
    return {
      entries
    }
  }
  
  export default connect(mapStateToProps)(History)