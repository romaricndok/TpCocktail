import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import Store from './Store/configureStore'
import Navigation from './Navigation/Navigation';


export default function App() {
  return (
    <Provider store={Store}>
      <Navigation/> 
    </Provider>
  );
}

