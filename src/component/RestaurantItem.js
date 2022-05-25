import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RestaurantItem = ({ data }) => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("Restaurant", { id: data.id });
  };
  return (
    <Pressable onPress={onPress} style={styles.restaurantContainer}>
      <Image
        source={{
          uri: data.image,
        }}
        style={styles.image}
      />
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{data.name}</Text>
          <Text
            style={styles.subtitle}
          >{`N${data.deliveryFee}   ${data.minDeliveryTime}-${data.maxDeliveryTime} Minutes`}</Text>
        </View>
        <View style={styles.rating}>
          <Text style={{ color: "#fff" }}>{data.rating.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RestaurantItem;

const styles = StyleSheet.create({
  restaurantContainer: {
    width: "100%",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 4 / 3,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
  },
  subtitle: {
    color: "grey",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: "auto",
    color: "#fff",
    backgroundColor: "#003566",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
