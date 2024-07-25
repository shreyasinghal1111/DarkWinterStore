import { createContext, useContext, useReducer } from "react";
import faker from "faker";
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();
faker.seed(99);
const fakeImageUrl = (width, height) => {
  return `https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTZSPZ2DiCefYQQPwH5hH6rtls5oAVR0g7y1g7CD-9RkXTqOamySDOD_1eHUSM0tAK3XDJLhSMW6uyfTcmI2IXymx78b3HKP6hWBYzfcK7b`
};

const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image:fakeImageUrl(400,400),
    inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  console.log(productState);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
