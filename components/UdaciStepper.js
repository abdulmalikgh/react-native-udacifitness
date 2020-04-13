import React from 'react'
import { View, Text,TouchableOpacity,StyleSheet,Platform} from 'react-native'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { white , gray, purple} from '../utils/colors'

export default function UdaciStepper({max,unit,value,step,onIncrement,onDecrement}) {
    return (
        <View style={[styles.row,{justifyContent:'space-between'}]}> 
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity 
                    onPress={onDecrement}
                    style={styles.iosBtn}> 
                    <FontAwesome 
                    name='minus' size={30} color={'black'}/>
                </TouchableOpacity> 
                <TouchableOpacity 
                    onPress={onIncrement}
                    style={styles.iosBtn}>
                    <FontAwesome 
                    name='plus' size={30} color={'black'}/>
                </TouchableOpacity> 
            </View>
             <View style={styles.metricContainer}>
                <Text style={{textAlign:'center', fontSize:24}}>{value}</Text>
                <Text style={{fontSize:18, color:gray}}>{unit}</Text>
             </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection:'row',
         flex:1,
        alignItems: 'center'
    },
    iosBtn: {
        backgroundColor:white,
        borderColor:purple,
        borderWidth:1,
        borderRadius:3,
        padding:5,
        paddingLeft:25,
        paddingRight:25
    },
    metricContainer: {
        width:85,
        justifyContent:'center',
        alignItems:'center'
    }
})