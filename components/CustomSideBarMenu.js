import React, { Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import { DrawerItems} from 'react-navigation-drawer';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {Avatar} from 'react-native-elements';
import db from '../config'

import firebase from 'firebase';

export default class CustomSideBarMenu extends Component{
  constructor(){
    super()
    this.state={
      image:"",
      name:"",
      userId:firebase.auth().currentUser.email,
      docId:"",
    }
  }
  fetchImage=(userName)=>{
   var ref=firebase.storage().ref().child("userprofile/"+userName)
   ref.getDownloadURL().then((url)=>{
    this.setState({image:url})
   }).catch(
     (error)=>{
       this.setState({image:""})
     }
   )
  }

  getUserProfile=()=>{
    db.collection("users").where("userid","==",this.state.userId).onSnapshot((snapshot)=>{
      snapshot.forEach((doc)=>{
        var docs =doc.data()
        this.setState({name:docs.username,
        docId:doc.id,
        image:docs.image})
      })
    })
  }

  uploadImage=async (uri,userName)=>{
  var response = await fetch(uri)
  var blob=await response.blob()
  var ref=firebase.storage().ref().child("userprofile/"+userName)

  return ref.put(blob).then(()=>{
    this.fetchImage(userName)
  })

  }

  selectPic=async()=>{
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.uploadImage(result.uri,this.state.userId)
    }
  }

  componentDidMount=()=>{
    this.fetchImage(this.state.userId)
    this.getUserProfile()
  }
  render(){
    return(
      <View style={{flex:1}}>
        <View>
          <Avatar
          rounded
          source={{uri:this.state.image}}
          size={"xlarge"}
          onPress={()=>{
            this.selectPic()
          }}
          showEditButton></Avatar>
          <Text>{this.state.name}</Text>
        </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props}/>
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.logOutButton}
          onPress = {() => {
              this.props.navigation.navigate('LoginScreen')
              firebase.auth().signOut()
          }}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container : {
    flex:1
  },
  drawerItemsContainer:{
    flex:0.8
  },
  logOutContainer : {
    flex:0.2,
    justifyContent:'flex-end',
    paddingBottom:30
  },
  logOutButton : {
    height:30,
    width:'100%',
    justifyContent:'center',
    padding:10
  },
  logOutText:{
    fontSize: 30,
    fontWeight:'bold'
  }
})