import { createContext, useContext } from "react";
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

export { CartContext };
export default CartContext;
export const useCart = () => {
  return useContext(CartContext);
};
export const CartProvider = ({ children }) => {
  //Initalize cart from localStorage as Empty Array if not present
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      return [];
    }
  });
  //Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
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
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.productId !== productId)
    );
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, totalQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
