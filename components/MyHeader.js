import React, { Component} from 'react';
import { Header,Icon,Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import db from '../config'



export default class MyHeader extends React.Component{
  constructor(props){
    super(props)
    this.state={
      unreadValue:""
    }
  }
  
render(){
    return (
      <Header
        leftComponent={<Icon name='ellipsis-v' type='font-awesome' color='#696969'  onPress={() => this.props.navigation.toggleDrawer()}/>}
        centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
        
        backgroundColor = "#eaf8fe"
      />
    );
    }
  }