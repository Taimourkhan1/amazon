import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Pressable,
  TextInput,
  ImageBackground,
  Dimensions,
  Platform
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductInfoScreen = () => {
  const [addedToCart, setAddedToCart] = useState(false);
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    dispatch(addToCart(item));
    setAddedToCart(true)
    setTimeout(()=>{
      setAddedToCart(false)
    },2000)
  };
  return (
    <ScrollView
      style={{ marginTop:50,
      flex: 1,
      backgroundColor: "white",}}
      showVerticalScrollIndicator={false}
    >
      <View
        style={{
          backgroundColor: "#00CED1",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ paddingLeft: 10 }}
            name="search1"
            size={22}
            color="black"
          />
          <TextInput placeholder="search Amazon.in" />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            borderRadius: 50,
            backgroundColor: "red",
            width: 50,
            height: 50,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center", // Center the text horizontally
            }}
          >
            {route.params.offer}
          </Text>
        </View>
        <View
          style={{
            borderRadius: 50,
            backgroundColor: "#E0E0E0",
            width: 50,
            height: 50,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            name="share-variant"
            size={24}
            color="black"
          />
        </View>
      </View>
      <ImageBackground
        style={{ width, height, resizeMode: "contain" }}
        source={route.params.image}
      ></ImageBackground>
      <View style={{ padding: 30 }}>
        <Text style={{ fontWeight: "500", fontSize: 15 }}>
          {route.params.title}
        </Text>
        <Text style={{ fontWeight: "600", fontSize: 18, marginTop: 18 }}>
          $ {route.params.price}
        </Text>
      </View>
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Text>Color:</Text>
        <Text style={{ fontWeight: "600", fontSize: 18 }}>
          {route.params.color}
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}
      >
        <Text>Size:</Text>
        <Text style={{ fontWeight: "600", fontSize: 18 }}>
          {route.params.size}
        </Text>
      </View>
      <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ padding: 20 }}>Total: ${route.params.price}</Text>
        <Text style={{ color: "#00ced1" }}>
          Free Delivery Tomorrow by 3.PM order within 10h
        </Text>
      </View>
      <Pressable
        onPress={() => addItemToCart(route.params.item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        {addedToCart ? (
          <Text style={{ color: "white", fontWeight: "500" }}>ADDED TO CART</Text>
        ) : (
          <Text style={{ color: "white", fontWeight: "500" }}>ADD TO CART</Text>
        )}
      </Pressable>
      <Pressable
        style={{
          backgroundColor: "#FFAC1C",
          padding: 10,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 10,
          marginVertical: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "500" }}>BUY NOW</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
