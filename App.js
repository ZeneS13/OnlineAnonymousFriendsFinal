import * as React from 'react';
import {  Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator,} from 'react-navigation';

import LoginScreen from './screens/LoginScreen'

import {AppDrawerNavigator} from './components/AppDrawerNavigator'
import  AppTabNavigator  from './components/AppTabNavigator'


const SwitchNavigator=createSwitchNavigator(
  {
    Login: {screen:LoginScreen},
    Drawer:{screen:AppDrawerNavigator},
    BottomTab:{screen:AppTabNavigator}
  }
)

const AppContainer=createAppContainer(SwitchNavigator)

export default class App extends React.Component {
  render(){
   return(
     <AppContainer/>
   )

  }
}
