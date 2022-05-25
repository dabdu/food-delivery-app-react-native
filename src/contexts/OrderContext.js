import { createContext, useContext, useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Order, OrderDish, Basket } from "../models";
import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketContext";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { dbUser } = useAuthContext();
  const { restaurant, totalPrice, basketDishes, basket } = useBasketContext();

  useEffect(() => {
    DataStore.query(Order, (o) => o.userID("eq", dbUser.id)).then(setOrders);
  }, [dbUser]);
  const createOrder = async () => {
    // CreateOrder
    const newOrder = await DataStore.save(
      new Order({
        userID: dbUser.id,
        Restaurant: restaurant,
        status: "NEW",
        total: totalPrice,
      })
    );

    // All all basketDishes to the order
    await Promise.all(
      basketDishes.map((basketDish) =>
        DataStore.save(
          new OrderDish({
            quantit: basketDish.quantity,
            orderID: newOrder.id,
            Dish: basketDish.Dish,
          })
        )
      )
    );
    // Delete Basket
    await DataStore.delete(basket);
    setOrders([...orders, newOrder]);
  };

  return (
    <OrderContext.Provider value={{ createOrder, orders }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
