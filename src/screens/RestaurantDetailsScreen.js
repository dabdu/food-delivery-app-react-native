import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { DishListItem } from "../component";
import { useRoute, useNavigation } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Dish, Restaurant } from "../models";
import { useBasketContext } from "../contexts/BasketContext";
const RestaurantDetailsScreen = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const navigation = useNavigation();

  const route = useRoute();
  const id = route.params?.id;

  const {
    setRestaurant: setBasketRestaurant,
    basket,
    basketDishes,
  } = useBasketContext();

  useEffect(() => {
    if (!id) return;
    setBasketRestaurant(null);
    DataStore.query(Restaurant, id).then(setRestaurant);
    DataStore.query(Dish, (dish) => dish.restaurantID("eq", id)).then(
      setDishes
    );
  }, [id]);
  useEffect(() => {
    setBasketRestaurant(restaurant);
  }, [restaurant]);
  if (!restaurant) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} color="#00bbf9" />
      </View>
    );
  }

  function renderHeader(restaurant) {
    return (
      <View>
        <Image source={{ uri: restaurant.image }} style={styles.image} />
        <Ionicons
          name="arrow-back-circle"
          size={45}
          color="white"
          style={styles.iconConatiner}
          onPress={() => navigation.goBack()}
        />

        <View style={styles.container}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text
            style={styles.subtitle}
          >{`N${restaurant.deliveryFee}   ${restaurant.minDeliveryTime}-${restaurant.maxDeliveryTime} Minutes`}</Text>
        </View>
        {/* <Text>Menu</Text> */}
      </View>
    );
  }
  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={renderHeader(restaurant)}
        data={dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
      />
      {basket && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Basket")}
        >
          <Text style={styles.buttonText}>
            Open Basket ({basketDishes.length})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RestaurantDetailsScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  iconConatiner: {
    position: "absolute",
    top: 40,
    left: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 4,
  },
  title: {
    fontSize: 35,
    fontWeight: "600",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
  container: {
    margin: 10,
  },
  button: {
    backgroundColor: "#00bbf9",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
});
