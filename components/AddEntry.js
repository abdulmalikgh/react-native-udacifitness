import React, { Component } from 'react'
import { View, Text,TouchableOpacity, Platform , StyleSheet} from 'react-native'
import { getMetricMetaInfo,timeToString, getDailyReminderValue } from '../utils/helpers'
import { Ionicons} from '@expo/vector-icons'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'
import TextButton from './TextButton'
import {removeEntry,submitEntry } from '../utils/api'
import { white , purple} from '../utils/colors'
import { connect } from 'react-redux'
import { addEntry } from '../actions'

const SubmitBtn = ({onPress})=>{
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={Platform.OS === 'ios'? styles.iosBtn : styles.androidSubmitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}
class AddEntry extends Component{
    state = {
        run:0,
        bike:0,
        swim:0,
        sleep:0,
        eat:0
      }
    Submit = ()=> {
        const key = timeToString() 
        const entry = this.state
        this.props.dispatch(addEntry({
            [key] : entry
        }))
        this.setState(()=>({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        }))

        submitEntry({ entry, key })
    }
      increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)
        this.setState( (state) => {
            const count = state[metric] + step
            return {
                ...state, 
                [metric] : count > max ? max: count
            }
        })
      }
      decrement = (metric) => {
        const {max, step } = getMetricMetaInfo(metric)
        this.setState( (state) => {
            const count = state[metric] - step
            return {
                ...state,
                [metric] : count < 0 ? 0: count
            }
        })
      }
      slide = (metric, value)=> {
         this.setState( () => ({
             [metric] : value
         })) 
      }
      reset = () => {
          const key = timeToString();

          this.props.dispatch(addEntry({
              [key] : getDailyReminderValue()
          }))
         
          removeEntry(key)
      }
    render() {
        const metaInfo = getMetricMetaInfo();

        if(this.props.alreadyLoggedIn){
            return (
            <View style={styles.center}>
                <Ionicons
                 name={Platform.OS === 'ios' ? 'ios-happy':'md-happy'}
                 size={100}
                 />
                 <Text>You already logged your information for today</Text>
                  <TextButton onPress={this.reset} style={{padding:10}}>
                      Reset
                  </TextButton>
            </View>
            )
        }
        return (
            <View style={styles.constainer}>
                <DateHeader date={new Date().toLocaleDateString()}/>
                {Object.keys(metaInfo).map(key => {
                    const { getIcon, type, ...rest} = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View key={key} style={styles.row}>  
                            {getIcon()}
                            {
                                type === 'slider'
                                ? <UdaciSlider value={value} 
                                onChange = { (value)=> this.slide(key, value)} 
                                {...rest}/>
                                : <UdaciStepper value={value}
                                  onIncrement={()=> this.increment(key)}
                                  onDecrement={()=> this.decrement(key)}
                                  {...rest}/>
                            }
                        </View> 
                    )
                })}
                <SubmitBtn onPress={this.Submit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constainer: {
       flex:1,
       padding:20,
       backgroundColor:white
    },
    row : {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center'
    }
    ,
    iosBtn: {
        backgroundColor: purple,
        padding:10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor:purple,
        padding:10,
        paddingRight: 30,
        paddingLeft:30,
        borderRadius: 2,
        alignSelf:'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color:white,
        fontSize:22,
        textAlign:'center'
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        marginRight:30,
        marginLeft:30  
    }
})

function mapStateToProps(state) {
    const key = timeToString()

    return {
        alreadyLoggedIn : state[key] && typeof state[key].today === 'undefined'
    }
}
export default connect(mapStateToProps)(AddEntry)

