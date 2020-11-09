import React, {Component} from "react";
import { Text, StyleSheet, View } from "react-native";
import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'   
// redux thunk allows us to make asynchronous request inside our action creator. it is a middleware, so we have to 
// import applyMiddleware from redux before we can use redux thunk
import reducers from '../reducers/combineReducers'
//import LoginForm from '../components/LoginForm'
import Router from '../Router'

class Home extends Component {

  UNSAFE_componentWillMount(){
    const firebaseConfig = {
      apiKey: "AIzaSyADNF5mJbB9wka1inZBGbVsac7YV7jvYoA",
      authDomain: "manager-925e0.firebaseapp.com",
      databaseURL: "https://manager-925e0.firebaseio.com",
      //projectId: "manager-925e0",
      storageBucket: "manager-925e0.appspot.com",
      messagingSenderId: "853708551398",
     // appId: "1:853708551398:web:55dfb2890de8a077aa7727",
      //measurementId: "G-J3BVV2L2HL"
    }

    if(!firebase.apps.length){  
      firebase.initializeApp(firebaseConfig) // initializing firebase
    }
  }

  render(){
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Router />
      </Provider>
    )
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default Home;
