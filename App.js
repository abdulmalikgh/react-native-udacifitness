import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Reducer from './reducers'
import History from './components/History'

export default function App() {
  return (
      <Provider store={createStore(Reducer)}>
        <View style={{flex:1}}>
          <History />
        </View>
      </Provider>
  );
}


