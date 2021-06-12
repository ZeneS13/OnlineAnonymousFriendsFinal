import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';

import db from '../config.js';

export default class FriendScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      userId          : firebase.auth().currentUser.email,
      userName        : "",
      friendId      : this.props.navigation.getParam('details')["userid"],
      requestId       : this.props.navigation.getParam('details')["requestid"],
      likes           : this.props.navigation.getParam('details')["likes"],
      friendName    : '',
      friendContact : '',
      friendCity : '',
      friendCountry:'',
      friendRequestDocId : ''
    }
  }



  getFriendDetails(){
    db.collection('users').where('userid','==',this.state.friendId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
            friendName   : doc.data().username,
            friendContact : doc.data().contact,
            friendCity : doc.data().city,
            friendCountry:doc.data().country,
        })
      })
    });

    db.collection('users').where('requestid','==',this.state.requestId).get()
    .then(snapshot=>{
      snapshot.forEach(doc => {
        this.setState({friendRequestDocId:doc.id})
     })
  })}


  getUserDetails=(userId)=>{
    db.collection("users").where('userid','==', userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        this.setState({
          userName  :doc.data().username
        })
      })
    })
  }

  addNotification=()=>{
    var message = this.state.userName + " wants to be you friend, here is their contact:" + this.state.
    db.collection("allNotifications").add({
      "targetedFriendId"    : this.state.friendId,
      "senderid"            : this.state.userId,
      "request_id"          : this.state.requestId,
      "date"                : firebase.firestore.FieldValue.serverTimestamp(),
      "notification_status" :"delivered",
      "message"             : message
    })
  }



  componentDidMount(){
    this.getFriendDetails()
    this.getUserDetails(this.state.userId)
  }


    render(){
      return(
        <View style={styles.container}>
          <View style={{flex:0.1}}>
            <Header
              leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
              centerComponent={{ text:"Add Friends", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
              backgroundColor = "#eaf8fe"
            />
          </View>
          <View style={{flex:0.3}}>
            <Card
              title={"Friend Information"}
              titleStyle= {{fontSize : 20}}
              >
              <Card>
                <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>City: {this.state.friendCity}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Country: {this.state.friendCountry}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'bold'}}>Likes : {this.state.likes}</Text>
              </Card>
            </Card>
          </View>
          <View style={styles.buttonContainer}>
            {
              this.state.friendId !== this.state.userId
              ?(
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                      
                      this.addNotification()
                     
                    }}>
                  <Text>Add Friend</Text>
                </TouchableOpacity>
              )
              : null
            }
          </View>
        </View>
      )
    }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: 'orange',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16
  }
})
