import React, { Component } from 'react'
import { View,Text} from 'react-native'
import { fetchCalendarData } from '../utils/api'
import { getDailyReminderValue, timeToString} from '../utils/helpers'
import {receiveEntries, addEntry } from '../actions'
import { connect } from 'react-redux'
import UdaciFitnessCalendar from 'udacifitness-calendar'

class History extends Component{
    componentDidMount() {
        const { dispatch } = this.props

        fetchCalendarData()
        .then( (entries) => dispatch(receiveEntries(entries)))
        .then( ({ entries }) => {
            if(!entries[timeToString()]){
                dispatch(addEntry({[timeToString()] : getDailyReminderValue()}))
            }
        })
    }
    renderItem = ({today, ...metrics}, formattedDate, key)=>(
            <View>
                {
                    today
                    ? <Text>{JSON.stringify(today)}</Text>
                    :<Text>{JSON.stringify(metrics)}</Text>
                }
            </View>
    )
    renderEmptyDate(formattedDate){ return (
            <View>
                <Text>No Data for this day</Text>
            </View>
        )
    }
    render() {
        const { entries } = this.props

        return (
            <UdaciFitnessCalendar
                items={entries}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
          />
        )
    }
}

function mapStateToProps(entries){
    return {
        entries
    }
}
export default connect(mapStateToProps)(History)