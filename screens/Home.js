import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Platform,
    ScrollView,
    Pressable,
    TextInput,
    Image,
  } from "react-native";
  import React, { useState, useEffect, useCallback } from "react";
  import { SliderBox } from "react-native-image-slider-box";
  import { AntDesign } from "@expo/vector-icons";
  import { Feather } from "@expo/vector-icons";
  import { EvilIcons } from "@expo/vector-icons";
  import { MaterialIcons } from "@expo/vector-icons";
  import { Entypo } from "@expo/vector-icons";
  import { Ionicons } from "@expo/vector-icons";
  import axios from "axios";
  import ProductItem from "../components/ProductItem";
  import DropDownPicker from "react-native-dropdown-picker";
  import { useNavigation } from "@react-navigation/native";
  import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";
  const Home = () => {
    const list = [
      {
        id: "0",
        title: "chair table",
        offer: "100% off",
        oldPrice: 7200,
        price: 4500,
        image: require("../assets/home.png"),
        name: "Home",
        color: "Green",
        size: "Normal",
      },
      {
        id: "1",
        title: "Scooter is best",
        offer: "22% off",
        oldPrice: 70200,
        price: 45000,
        image: require("../assets/scooter.png"),
        name: "vehicles",
        color: "Green",
        size: "Normal",
      },
      {
        id: "2",
        title: "16 ram 256 rom 8mgp",
        offer: "26% off",
        oldPrice: 70000,
        price: 45000,
        image: require("../assets/mobile.png"),
        name: "Mobiles",
        color: "grey",
        size: "Normal",
      },
      {
        id: "3",
        title: "2th gen ",
        offer: "26% off",
        oldPrice: 7000,
        price: 5000,
        image: require("../assets/airpods.webp"),
        name: "Electronics",
        color: "white",
        size: "Normal",
      },
      {
        id: "4",
        title: "fashion for girl",
        offer: "26% off",
        oldPrice: 7000,
        price: 2000,
        image: require("../assets/fashion.png"),
        name: "Fashion",
        color: "colorful",
        size: "Normal",
      },
      {
        id: "5",
        title: "music is for just fun",
        offer: "26% off",
        oldPrice: 70000,
        price: 45000,
        image: require("../assets/music.webp"),
        name: "Music",
        color: "black",
        size: "Normal",
      },
    ];
    const images = [
      require("../assets/movie1.jpg"),
      require("../assets/movie2.jpg"),
    ];
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState("jewelery");
    const [items, setItems] = useState([
      { label: "Men's Clothing", value: "men's clothing" },
      { label: "Jewelery", value: "jewelery" },
      { label: "electronics", value: "electronics" },
      { label: "Women's Clothing", value: "women's clothing" },
    ]);
    const navigation = useNavigation();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://fakestoreapi.com/products");
          setProducts(response.data);
        } catch (error) {
          console.log("error");
        }
      };
      fetchData();
    }, []);
    const onGenderOpen = useCallback(() => {
      setOpen(!open); // Toggle the 'open' state
    }, [open]);
    const [modalVisible, setModalVisible] = useState(false);
    //console.log("pro", products);
    //const cart=useSelector((state)=>state.cart.cart)
    return (
      <>
        <SafeAreaView
          style={{
            paddingTop: Platform.OS === "android" ? 40 : 0,
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <ScrollView>
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
  
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                flexDirection: "row",
                backgroundColor: "#AFEEEE",
                padding: 7,
                gap: 5,
                alignItems: "center",
              }}
            >
              <EvilIcons name="location" size={24} color="black" />
              <Pressable>
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Deliver to Taimor - Mailsi 003031
                </Text>
              </Pressable>
              <View>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="black"
                />
              </View>
            </Pressable>
  
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {list?.map((item, index) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("Info", {
                      id: item?.id,
                      offer: item?.offer,
                      title: item?.title,
                      price: item?.price,
                      image: item?.image,
                      color: item?.color,
                      size: item?.size,
                      oldPrice: item?.oldPrice,
                      images: images, // Pass the images array here
                      item: item,
                    })
                  }
                  key={index}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10,
                  }}
                >
                  <Image
                    style={{
                      width: 60,
                      height: 60,
                      resizeMode: "contain",
                    }}
                    source={item.image}
                  />
                  <Text>{item?.name}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <SliderBox
              images={images}
              autoPlay
              circleLoop
              dotColor={"#13274F"}
              inactiveDotColor="#90A4AE"
              imageComponentStyle={{
                width: "100%",
                alignSelf: "center",
                flex: 1,
              }}
            />
            <Text style={{ fontSize: 18, fontWeight: "bold", margin: 10 }}>
              Trending Deals of the week
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {list?.map((item, index) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate("Info", {
                      id: item?.id,
                      offer: item?.offer,
                      title: item?.title,
                      price: item?.price,
                      image: item?.image,
                      color: item?.color,
                      size: item?.size,
                      oldPrice: item?.oldPrice,
                      images: images, // Pass the images array here
                      item: item,
                    })
                  }
                  key={index}
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ width: 180, height: 180, resizeMode: "contain" }}
                    source={item?.image}
                  />
                </Pressable>
              ))}
            </View>
            <Text
              style={{
                borderWidth: 2,
                height: 1,
                borderColor: "#D0D0D0",
                marginTop: 15,
              }}
            />
            <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>
              Today's Deals
            </Text>
            <View
              style={{
                marginHorizontal: 10,
                width: "45%", // Set the width to 45%
                marginBottom: open ? 50 : 15,
              }}
            >
              <DropDownPicker
                style={{
                  // Set the width to 100% to fill the parent container
                  marginTop: 10,
                  borderColor: "#B7B7B7",
                  marginBottom: open ? 120 : 15, // Show dropdown list if open, otherwise hide
                }}
                open={open}
                value={category}
                items={items}
                setOpen={setOpen}
                setValue={(value) => setCategory(value)} // Update category based on selected value
                setItems={setItems}
                placeholder="Choose Category"
                placeholderStyle={styles.placeholderStyle}
                onOpen={onGenderOpen}
                zIndex={3000}
                zIndexInverse={1000}
              />
            </View>
  
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {products
                ?.filter((item) => item.category === category)
                .map((item, index) => (
                  <ProductItem item={item} key={index} />
                ))}
            </View>
          </ScrollView>
        </SafeAreaView>
        <BottomModal
          onBackdropPress={() => setModalVisible(!modalVisible)}
          swipeDirection={["up", "down"]}
          swipeThreshold={200}
          modalAnimation={
            new SlideAnimation({
              slideFrom: "bottom",
            })
          }
          onHardwareBackPress={() => setModalVisible(!modalVisible)}
          onTouchOutside={() => setModalVisible(!modalVisible)}
          visible={modalVisible}
        >
          <ModalContent style={{ width: "100%", height: 400 }}>
            <View style={{ marginBottom: 8 }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Choose your Location
              </Text>
              <Text style={{ marginTop: 16, fontSize: 16, color: "grey" }}>
                Select a Delivery Location To see product availability and
                delivery options
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Pressable
                onPress={() => {
                  navigation.navigate("Address");
                  setModalVisible(false)
                }}
                style={{
                  width: 140,
                  height: 140,
                  justifyContent: "center",
                  borderColor: "#D0D0D0",
                  marginTop: 10,
                  borderWidth: 1,
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#0066b2",
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  Add an Address and pickup-point
                </Text>
              </Pressable>
            </ScrollView>
            <View style={{ marginBottom: 12, flexDirection: "column", gap: 5 }}>
              <View style={{ flexDirection: "row", gap: 7 }}>
                <Entypo name="location-pin" size={24} color="black" />
                <Text style={{ color: "#0066b2" }}>Enter your pinCode</Text>
              </View>
  
              <View style={{ flexDirection: "row", gap: 7 }}>
                <Ionicons name="locate-sharp" size={24} color="black" />
                <Text style={{ color: "#0066b2" }}>Use my Current Location</Text>
              </View>
  
              <View style={{ flexDirection: "row", gap: 7 }}>
                <AntDesign name="earth" size={22} color="black" />
                <Text style={{ color: "#0066b2" }}>Deliver outside Pakistan</Text>
              </View>
            </View>
          </ModalContent>
        </BottomModal>
      </>
    );
  };
  
  export default Home;
  
  const styles = StyleSheet.create({});
  