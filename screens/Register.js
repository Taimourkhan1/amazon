import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
const Register = () => {
  const navigation=useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name,setName]=useState('')
  const handleRegister=()=>{
    const user={
      name:name,
      email:email,
      password:password
    }
    axios.post('http://192.168.43.109:5000/register',user)
    .then(res=>{
      alert('registration successfully')
      console.log('reg',res.data)
      setName('')
      setEmail('')
      setPassword('')
    }).catch(err => {
      if (err.response && err.response.status === 400 && err.response.data.message === 'User already existed') {
        alert('Email is already in use. Please use a different email.')
      } else {
        alert('Registration failed. Please try again later.')
        console.error('Registration error:', err)
      }
    });
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
    <View>
      <Image
        style={{ width: 200, height: 100, marginTop: 45 }}
        source={require('../assets/Amazon-logo.png')} />
    </View>
    <KeyboardAvoidingView>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 17, fontWeight: 'bold', marginTop: 12, color: '#042E42' }}>Register To your Account</Text>
      </View>
      <View style={{ marginTop: 70 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#d0d0d0', borderRadius: 5, paddingVertical: 5, marginTop: 30 }}>
        <Ionicons style={{ marginLeft: 8 }} name="person-sharp" size={24} color="grey" />        
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={{ color: 'black', marginVertical: 10, width: 300, fontSize: email ? 16 : 16 }}
            placeholder='enter your name' />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#d0d0d0', borderRadius: 5, paddingVertical: 5, marginTop: 30 }}>
          <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="grey" />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{ color: 'black', marginVertical: 10, width: 300, fontSize: email ? 16 : 16 }}
            placeholder='enter your email' />
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#d0d0d0', borderRadius: 5, paddingVertical: 5, marginTop: 30 }}>
          <AntDesign style={{ marginLeft: 8 }} name="lock" size={24} color="grey" />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={{ color: 'black', marginVertical: 10, width: 300, fontSize: email ? 16 : 16 }} placeholder='enter your password'
            secureTextEntry={true} />
        </View>
      </View>
      <View style={{flexDirection:'row',marginTop:15,justifyContent:'space-between',alignItems:'center'}}>
        <Text>Keep me logged in</Text>
        <Text style={{color:'#007fff',fontWeight:'500'}}>Forgot password</Text>

      </View>
      <View style={{marginTop:70}}/>
        <Pressable 
        onPress={handleRegister}
        style={{
          width:200,
          backgroundColor:'#FEBE10',
          borderRadius:6,
          marginLeft:'auto',
          marginRight:'auto',
          padding:16}}>
          <Text style={{textAlign:'center',color:'white',fontWeight:'bold',fontSize:16}}>Register</Text>
        </Pressable>
      <Pressable 
      onPress={()=>navigation.goBack( )}
      style={{marginTop:16}}>
        <Text style={{color:'grey',fontSize:16,textAlign:'center'}}>already have an Account? Sign In</Text>
        </Pressable>
    </KeyboardAvoidingView>
  </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({})