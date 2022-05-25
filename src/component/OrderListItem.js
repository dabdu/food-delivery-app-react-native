import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const OrderListItem = ({ order }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate("Order", { id: order.id })}
      style={{ flexDirection: "row", margin: 10, alignItems: "center" }}
    >
      <Image
        source={{ uri: order.Restaurant.image }}
        style={{ height: 80, width: 80, marginRight: 10, borderRadius: 20 }}
      />
      <View>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          {order.Restaurant.name}
        </Text>
        <Text style={{ marginVertical: 5 }}>3 Items N4000</Text>
        <Text>2days ago {order.status}</Text>
      </View>
    </Pressable>
  );
};

export default OrderListItem;

const styles = StyleSheet.create({});
