import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import orders from "../../assets/data/orders.json";
import restaurants from "../../assets/data/restaurants.json";
import { BasketDishItem } from "../component";
const order = orders[0];
const OrderDetailsScreen = () => {
  const Header = () => {
    return (
      <View>
        <Image source={{ uri: order.Restaurant.image }} style={styles.image} />
        <Ionicons
          name="arrow-back-circle"
          size={45}
          color="white"
          style={styles.iconConatiner}
        />
        <View style={styles.container}>
          <Text style={styles.title}>{order.Restaurant.name}</Text>
          <Text style={styles.subtitle}>
            {order.status} {"  "} 2 days ago
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={<Header />}
        data={restaurants[0].dishes}
        renderItem={({ item }) => <BasketDishItem BasketDishes={item} />}
      />
    </View>
  );
};

export default OrderDetailsScreen;

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
});
