import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import SearchScreen from '../screens/SearchScreen';
import FreindDetails from '../screens/FriendDetails'


export const AppStackNavigator = createStackNavigator({
    FriendsList : {
      screen : SearchScreen,
      navigationOptions:{
        headerShown : false
      }
    },
    FreindsDetails : {
      screen : FreindDetails,
      navigationOptions:{
        headerShown : false
      }
    }
  },
    {
      initialRouteName: 'FriendsList'
    }
  );
  