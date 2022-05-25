import { View, Text, StyleSheet } from "react-native";
const BasketDishItem = ({ BasketDish }) => {
  return (
    <View style={styles.row}>
      <View style={styles.quantityContainer}>
        <Text style={{ color: "white", fontWeight: "600", fontSize: 15 }}>
          {BasketDish?.quantity}
        </Text>
      </View>
      <Text style={{ fontWeight: "700", fontSize: 17 }}>
        {BasketDish?.Dish?.name}
      </Text>
      <Text
        style={{
          marginLeft: "auto",
          color: "gray",
          fontSize: 15,
          fontWeight: "600",
        }}
      >
        N{BasketDish?.Dish?.price}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  quantityContainer: {
    backgroundColor: "#00bbf9",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 2,
    marginRight: 5,
  },
});
export default BasketDishItem;
