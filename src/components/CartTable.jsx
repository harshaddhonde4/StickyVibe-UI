import React from "react";
import { useCart } from "../store/Cart-Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function CartTable() {
  const { cart, addToCart, removeFromCart } = useCart();

  const subtotal = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const updateCartQuantity = (productId, quantity) => {
    if (quantity < 1) return; // Prevent negative or zero quantity
    const product = cart.find((item) => item.productId === productId);
    if (product) {
      addToCart(product, quantity - product.quantity);
    }
  };

  const incrementQuantity = (productId, currentQuantity) => {
    if (currentQuantity >= 99) return; // Max quantity limit
    updateCartQuantity(productId, currentQuantity + 1);
  };

  const decrementQuantity = (productId, currentQuantity) => {
    if (currentQuantity <= 1) return; // Min quantity limit
    updateCartQuantity(productId, currentQuantity - 1);
  };

  return (
    <div className="min-h-80 max-w-4xl mx-auto my-8 w-full font-primary overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="uppercase text-sm text-primary dark:text-light border-b border-primary dark:border-light">
            <th className="px-6 py-4 text-left">Product</th>
            <th className="px-6 py-4">Quantity</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Total</th>
            <th className="px-6 py-4">Remove</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-primary dark:divide-light">
          {cart.map((item) => (
            <tr
              key={item.productId}
              className="text-sm sm:text-base text-primary dark:text-light text-center"
            >
              <td className="px-4 sm:px-6 py-4">
                <Link
                  to={`/products/${item.productId}`}
                  state={{ product: item }}
                  className="flex items-center"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover mr-4 hover:scale-110 transition-transform"
                  />
                  <span className="text-primary dark:text-light hover:underline text-left">
                    {item.name}
                  </span>
                </Link>
              </td>
              <td className="px-4 sm:px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      decrementQuantity(item.productId, item.quantity)
                    }
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    aria-label="Decrease quantity"
                  >
                    <FontAwesomeIcon icon={faMinus} className="text-xs" />
                  </button>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="1"
                    max="99"
                    value={item.quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10);
                      if (!isNaN(value) && value >= 1 && value <= 99) {
                        updateCartQuantity(item.productId, value);
                      }
                    }}
                    className="w-16 px-2 py-1 border rounded-md text-center focus:ring focus:ring-light dark:focus:ring-gray-600 dark:bg-gray-800 text-gray-900 dark:text-gray-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    aria-label="Product quantity"
                  />
                  <button
                    onClick={() =>
                      incrementQuantity(item.productId, item.quantity)
                    }
                    disabled={item.quantity >= 99}
                    className="w-8 h-8 flex items-center justify-center border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    aria-label="Increase quantity"
                  >
                    <FontAwesomeIcon icon={faPlus} className="text-xs" />
                  </button>
                </div>
              </td>
              <td className="px-4 sm:px-6 py-4 text-base font-light">
                ${item.price.toFixed(2)}
              </td>
              <td className="px-4 sm:px-6 py-4 text-base font-light">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
              <td className="px-4 sm:px-6 py-4">
                <button
                  aria-label="delete-item"
                  onClick={() => removeFromCart(item.productId)}
                  className="text-primary dark:text-red-400 border border-primary dark:border-red-400 p-2 rounded hover:bg-lighter dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </td>
            </tr>
          ))}
          {cart.length > 0 && (
            <tr className="text-center">
              <td colSpan="2"></td>
              <td className="text-base text-gray-600 dark:text-gray-300 font-semibold uppercase px-4 sm:px-6 py-4">
                Subtotal
              </td>
              <td className="text-lg text-primary dark:text-blue-400 font-medium px-4 sm:px-6 py-4">
                ${subtotal}
              </td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
