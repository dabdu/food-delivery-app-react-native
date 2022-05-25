import { StyleSheet, FlatList, View } from "react-native";
import React, { useState, useEffect } from "react";
import RestaurantItem from "../component/RestaurantItem";
import { DataStore } from "aws-amplify";
import { Restaurant } from "../models";

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);

  // const fetchRestaurants = async () => {
  //   const results = await DataStore.query(Restaurant);
  //   setRestaurants(results);
  // };
  useEffect(() => {
    DataStore.query(Restaurant).then(setRestaurants);
  }, []);
  return (
    <View style={styles.container}>
      {/* Restaurant Item */}
      <FlatList
        data={restaurants}
        key={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <RestaurantItem data={item} />}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
});
