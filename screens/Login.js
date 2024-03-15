import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    KeyboardAvoidingView,
    TextInput,
    Pressable,
  } from "react-native";
  import React, { useState } from "react";
  import { useNavigation } from "@react-navigation/native";
  import { MaterialIcons } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import axios from "axios";
  const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setUserId] = useState("");
    const onhandlelogin = async () => {
      const user = {
        email: email,
        password: password,
      };
  
      axios
        .post("http://192.168.43.109:5000/login", user)
        .then(async (response) => {
          const token = response.data.token;
          console.log(token);
          await AsyncStorage.setItem("authToken", token);
          navigation.replace("Main");
          console.log("responsed data:", token);
          
        })
        .catch((res) => {
          console.log(res);
          alert("Invalid password and email");
        });
    };
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
      >
        <View>
          <Image
            style={{ width: 200, height: 100, marginTop: 45 }}
            source={require("../assets/Amazon-logo.png")}
          />
        </View>
        <KeyboardAvoidingView>
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginTop: 12,
                color: "#042E42",
              }}
            >
              Login in To your Account
            </Text>
          </View>
          <View style={{ marginTop: 70 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#d0d0d0",
                borderRadius: 5,
                paddingVertical: 5,
                marginTop: 30,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="grey"
              />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={{
                  color: "black",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 16 : 16,
                }}
                placeholder="enter your email"
              />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#d0d0d0",
                borderRadius: 5,
                paddingVertical: 5,
                marginTop: 30,
              }}
            >
              <AntDesign
                style={{ marginLeft: 8 }}
                name="lock"
                size={24}
                color="grey"
              />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={{
                  color: "black",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 16 : 16,
                }}
                placeholder="enter your email"
                secureTextEntry={true}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>Keep me logged in</Text>
            <Text style={{ color: "#007fff", fontWeight: "500" }}>
              Forgot password
            </Text>
          </View>
          <View style={{ marginTop: 70 }} />
          <Pressable
            onPress={onhandlelogin}
            style={{
              width: 200,
              backgroundColor: "#FEBE10",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 16,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("Main")}
            style={{ marginTop: 16 }}
          >
            <Text style={{ color: "grey", fontSize: 16, textAlign: "center" }}>
              Don't have an Account? Sign Up
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default Login;
  
  const styles = StyleSheet.create({});
  