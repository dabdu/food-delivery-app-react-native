import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { BasketDishItem } from "../component";
import { useBasketContext } from "../contexts/BasketContext";
import { useOrderContext } from "../contexts/OrderContext";

const BasketScreen = () => {
  const { restaurant, basketDishes, totalPrice } = useBasketContext();
  const { createOrder } = useOrderContext();
  return (
    <View style={styles.page}>
      <Text style={styles.name}>{restaurant?.name}</Text>
      <Text style={{ fontWeight: "bold", marginTop: 20, fontSize: 19 }}>
        Your Items
      </Text>
      <FlatList
        style={{ marginTop: 10 }}
        data={basketDishes}
        renderItem={({ item }) => <BasketDishItem BasketDish={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <TouchableOpacity onPress={createOrder} style={styles.button}>
        <Text style={styles.buttonText}>
          Complete Order - ({totalPrice.toFixed(2)})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 40,
    padding: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: "400",
    marginVertical: 10,
  },
  description: {
    color: "grey",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginVertical: 10,
  },
  quantity: {
    fontSize: 25,
    marginHorizontal: 20,
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityContainer: {
    backgroundColor: "#00bbf9",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 2,
    marginRight: 5,
  },
});
