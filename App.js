import 'react-native-gesture-handler';
import React from 'react'
import { StyleSheet, Text, View, Platform} from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Reducer from './reducers'
import History from './components/History'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer} from 'react-navigation'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

const Tabs = createBottomTabNavigator({
    History : {
      screen : History,
      navigationOptions: {
        tabBarLabel : 'History',
        tabBarIcon : ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/> 
      }
    },
    AddEntry : {
      screen : AddEntry,
      navigationOptions: {
        tabBarLabel : 'Add Entry',
        tabBarIcon : ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />
      }
    }
  },
    {
    tabBarOptions : {
      ativeTintColor: Platform.OS === 'ios' ? purple : white,
      style : {
           height: 56,
           backgroundColor: Platform.OS === 'ios' ? purple:white,
           shadowColor: 'rgba(0,0,0,0.24)',
           shadowOffset: {
             width:0,
             height:3
           },
           shadowRadius: 6,
           shadowOpacity:1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
      }
    }
}) 
const AppContainer = createAppContainer(Tabs)

export default function App() {
  return (
      <Provider store=    {createStore(Reducer)}>
        <View style={{flex:1}}>
          <AppContainer />
        </View>
      </Provider>
  );
}


