import { createContext, useContext, useReducer } from "react";
import { useState, useEffect } from "react";
//Step 1: Create Context
const CartContext = createContext();

// const initialCartContext = {
//   cart: [],
//   setCart: () => {},
//   addToCart: () => {
//     console.log("Product added to cart");
//   },
//   removeFromCart: () => {},
//   totalQuantity: 0,
// };

const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CLEAR_CART = "CLEAR_CART";

const cartReducer = (prevCart, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { product, quantity } = action.payload;
      const existingItem = prevCart.find(
        (item) => item.productId === product.productId
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...state, { ...product, quantity }];
    }
    case "REMOVE_FROM_CART": {
      return prevCart.filter(
        (item) => item.productId !== action.payload.productId
      );
    }
    case "CLEAR_CART": {
      return [];
    }
    default:
      return prevCart;
  }
};

const initialCartState = (() => {
  try {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
    return [];
  }
})();
const [cart, dispatch] = useReducer(cartReducer, initialCartState);

export { CartContext };
export default CartContext;
export const useCart = () => {
  return useContext(CartContext);
};
export const CartProvider = ({ children }) => {
  //Initalize cart from localStorage as Empty Array if not present
  //   const [cart, setCart] = useState(() => {
  //     try {
  //       const storedCart = localStorage.getItem("cart");
  //       return storedCart ? JSON.parse(storedCart) : [];
  //     } catch (error) {
  //       console.error("Error parsing cart from localStorage:", error);
  //       return [];
  //     }
  //   });
  //Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //   const addToCart = (product, quantity) => {
  //     setCart((prevCart) => {
  //       const existingItem = prevCart.find(
  //         (item) => item.productId === product.productId
  //       );
  //       if (existingItem) {
  //         return prevCart.map((item) =>
  //           item.productId === product.productId
  //             ? { ...item, quantity: item.quantity + quantity }
  //             : item
  //         );
  //       }
  //       return [...prevCart, { ...product, quantity }];
  //     });
  //   };

  //   const removeFromCart = (productId) => {
  //     setCart((prevCart) =>
  //       prevCart.filter((item) => item.productId !== productId)
  //     );
  //   };

  const addToCart = (product, quantity) => {
    dispatch({ type: ADD_TO_CART, payload: { product, quantity } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: REMOVE_FROM_CART, payload: { productId } });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
