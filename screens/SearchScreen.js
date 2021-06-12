import * as React from 'react'
import MyHeader from '../components/MyHeader'
import { List,Divider } from 'react-native-paper';

import {Text,View,TouchableOpacity,StyleSheet,FlatList,TextInput} from 'react-native'
import db from "../config"
import  firebase from "firebase"

export default class SearchScreen extends React.Component{

    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            allUserList:[]
        }
        this.requestRef=null
    }
    
    getRequests=async()=>{
     this.requestRef= await db.collection("users").where("userid","!=",this.state.userId)
     .onSnapshot((snapShot)=>{
         var allUsers=[]
          snapShot.forEach((doc)=>{
            allUsers.push (doc.data())
         })
         this.setState({allUserList:allUsers})
     })
    }
    
    keyExtractor = (item, index) => {
        index.toString();
        console.log(item)
                  }
    
    renderItem=({item,index})=>{
        return(
            <View>
            <View style={{marginTop:20,flexDirection:"row",justifyContent:"space-between"}}>
            <List.Item
            key={index}
            title={item.username}
            description={item.likes}
           />
            <TouchableOpacity 
            style={{borderWidth:1,width:70,height:40}}
           > 
               <Text style={{color:'black',fontSize:28}}>Add Friend</Text> 
            </TouchableOpacity>
            </View>
               <Divider/>
               </View>
        )
    }
    
    componentDidMount=()=>{
        this.getRequests()
    }
    
    componentWillUnmount=()=>{
        this.requestRef
    }
    
        render(){
            return(
                <View style={{flex:1}}>
                    <MyHeader title="Search screen" />
                    {console.log(this.state.allUserList)}
                    {this.state.allUserList.length===0
                    ? (<Text>List of All Friends</Text>)
                :
                   ( <FlatList
                    data={this.state.allUserList}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}></FlatList>
       )}
                </View>
            ) 
        }
    }