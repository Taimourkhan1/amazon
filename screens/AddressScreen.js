import { ScrollView,View,Pressable,Text,TextInput } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import jwt_decode from "jwt-decode";
const AddressScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [LandMark, setLandMark] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { userId, setUserId } = useContext(UserType);

  
useEffect(() => {
  const fetchUser = async () => {
    try {
      const gottoken = await AsyncStorage.getItem("authToken");
      if (gottoken) {
        const decodedToken = jwt_decode(gottoken);
        setUserId(decodedToken.userId);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  fetchUser();
}, []);
  const handleAddress = () => {
    const addressData = {
      userId: userId,
      address: {
        name: name,
        mobileNo: mobileNo,
        houseNo: houseNo,
        street: street,
        LandMark: LandMark,
        postalCode: postalCode,
      },
    };
    axios
      .post("http://192.168.43.109:5000/addresses", addressData)
      .then(() => {
        alert("Address added successfully");
      })
      .catch((error) => {
        console.error("Error adding address:", error);
        alert("Failed to add address");
      });
  };

 
  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View style={{ backgroundColor: "#00CED1", height: 40 }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Add New Addresses
        </Text>
        <TextInput
          placeholderTextColor={"black"}
          placeholder={"pakistan"}
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Full Name (First and Last Name)
          </Text>
        </View>
        <TextInput
          value={name}
          onChangeText={(txt) => setName(txt)}
          placeholderTextColor={"black"}
          placeholder="Enter your Name"
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Mobile No</Text>
        </View>
        <TextInput
          value={mobileNo}
          onChangeText={(txt) => setMobileNo(txt)}
          placeholderTextColor={"black"}
          placeholder="Enter your Mobile No"
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Flat,House No,Building,Company
          </Text>
        </View>
        <TextInput
          value={houseNo}
          onChangeText={(txt) => setHouseNo(txt)}
          placeholderTextColor={"black"}
          placeholder=""
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Area,Street,Sector,Village
          </Text>
        </View>
        <TextInput
          value={street}
          onChangeText={(txt) => setStreet(txt)}
          placeholderTextColor={"black"}
          placeholder=""
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>LandMark</Text>
        </View>
        <TextInput
          value={LandMark}
          onChangeText={(txt) => setLandMark(txt)}
          placeholderTextColor={"black"}
          placeholder="eg near oppollo Hospital"
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>PinCode</Text>
        </View>
        <TextInput
          value={postalCode}
          onChangeText={(txt) => setPostalCode(txt)}
          placeholderTextColor={"black"}
          placeholder="Enter your PinCode"
          style={{
            padding: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />
        <View style={{ marginTop: 50 }}>
          <Pressable
            onPress={handleAddress}
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
              }}
            >
              Add Address
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;
