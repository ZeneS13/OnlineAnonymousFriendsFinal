import * as React from 'react'
import {Header} from 'react-native-elements'
import {Text,TextInput,TouchableOpacity,StyleSheet,View,Alert} from 'react-native'
import HomeScreen from './HomeScreen'
import db from '../config'
import  firebase from 'firebase'
//import * as Font from 'expo-font'; 

export default class LoginScreen extends React.Component{
 constructor(){
     super()
     this.state={
         emailId:"",
         password:"",
         //fontsLoaded: false,

     }
 }

 /* async loadFonts() {
    await Font.loadAsync({
      
      "60sStripe": require('../assets/fonts/60sSTRIPE.ttf'),

    });
    this.setState({ fontsLoaded: true });
  } */

  componentDidMount() {
    //this.loadFonts();
  }

    SignIn=async()=>{
      await firebase.auth().signInWithEmailAndPassword(this.state.emailId, this.state.password)
      this.props.navigation.navigate("HomeScreen")
    }

    SignUp=async()=>{
       await firebase.auth().createUserWithEmailAndPassword(this.state.emailId, this.state.password)
       Alert.alert("User created")
    }
    

    render(){
     // if (this.state.fontsLoaded) {
        return(
          <View  style={styles.container}>

          <View style={{justifyContent:'center', alignItems:'center'}}>
          <Text style={[styles.title]}>ONLINE FRIENDS</Text>
         </View>

          <TextInput 
          style={styles.loginBox}
          placeholder={"Email Id"}
           onChangeText={(text)=>{
               this.setState({emailId:text})
           }}/> 
          <TextInput 
          style={styles.loginBox}
          placeholder={"Password"}
          onChangeText={(text)=>{
            this.setState({password:text})
          }}
          /> 

             
         <TouchableOpacity
            style={styles.button}
            onPress={()=>{
                this.SignUp()
            }}
            >
            <Text style={styles.buttonText}>
            Sign up 
          </Text>
         </TouchableOpacity>
           
         <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress={()=>{
                this.SignIn()
                

            }}>
            <Text  style={styles.buttonText}>
            Login 
          </Text>
         </TouchableOpacity>

        </View>
        )
         /*  }  else {
            return null;
          } */
    }
    
}
const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#9999ff',
   alignItems: 'center',
   justifyContent: 'center'
 },
 
 title :{
   fontSize:65,
   fontWeight:'300',
   paddingBottom:30,
   color : '#ffffff',
   marginLeft:100,

   
 },
 loginBox:{
   width: 300,
   height: 40,
   borderBottomWidth: 1.5,
   borderColor : '#ffffff',
   fontSize: 20,
   margin:10,
   paddingLeft:10,
   color:'#ffffff'
 },

 button:{
   width:300,
   height:50,
   justifyContent:'center',
   alignItems:'center',
   borderRadius:25,
   backgroundColor:"#3333ff",
   shadowColor: "#000",
   shadowOffset: {
      width: 0,
      height: 8,
   },
   shadowOpacity: 0.30,
   shadowRadius: 10.32,
   elevation: 16,
   padding: 10
 },
 buttonText:{
   color:'#e6e6ff',
   fontWeight:'200',
   fontSize:20
 }
})
