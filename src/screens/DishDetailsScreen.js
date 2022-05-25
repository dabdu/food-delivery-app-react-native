import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Dish } from "../models";
import { useBasketContext } from "../contexts/BasketContext";

const DishDetailsScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const [dish, setDish] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  const { addDishToBasket } = useBasketContext();

  useEffect(() => {
    if (!id) return;
    DataStore.query(Dish, id).then(setDish);
  }, [id]);
  const onMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setQuantity(1);
    }
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };
  const getTotal = () => {
    return (dish.price * quantity).toFixed(2);
  };

  const onAddToBasket = async () => {
    await addDishToBasket(dish, quantity);
    navigation.goBack();
  };
  if (!dish) {
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
  return (
    <View style={styles.page}>
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.description}>{dish.description}</Text>
      <View style={styles.separator}></View>
      <View style={styles.row}>
        <AntDesign
          onPress={onMinus}
          name="minuscircleo"
          size={50}
          color={"#00bbf9"}
        />
        <Text style={styles.quantity}>{quantity}</Text>
        <AntDesign
          onPress={onPlus}
          name="pluscircleo"
          size={50}
          color={"#00bbf9"}
        />
      </View>
      <TouchableOpacity onPress={onAddToBasket} style={styles.button}>
        <Text style={styles.buttonText}>
          Add {quantity} to basket (N{getTotal()})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DishDetailsScreen;

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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
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
});
