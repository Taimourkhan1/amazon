import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React,{useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";
const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const cart = useSelector((state) => state.cart.cart);
console.log(cart)
  const dispatch=useDispatch()
  const addItemToCart=(item)=>{
    dispatch(addToCart(item));
    setAddedToCart(true)
    setTimeout(()=>{
      setAddedToCart(false)
    },2000)  }
  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />
      <Text numberOfLines={1} style={{ marginTop: 10, width: 150 }}>
        {item?.title}
      </Text>
      <View>
        <Text>$ {item?.price}</Text>
        <Text style={{ color: "#FFC72C", fontWeight: 500 }}>
          {item?.rating?.rate} ratings
        </Text>
      </View>
      <Pressable
      onPress={()=>addItemToCart(item)}
        style={{
          backgroundColor: "#FFC72C",
          marginHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
          borderRadius: 20,
          padding:10
        }}
      >
         {addedToCart ? (
          <Text style={{ color: "white", fontWeight: "500" }}>ADDED TO CART</Text>
        ) : (
          <Text style={{ color: "white", fontWeight: "500" }}>ADD TO CART</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
