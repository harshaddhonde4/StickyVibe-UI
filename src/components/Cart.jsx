import React from "react";
import PageTitle from "./PageTitle";
import { Link } from "react-router-dom";
import emptyCartImage from "../assets/util/emptycart.png";
import { useCart } from "../store/Cart-Context";
import { useMemo } from "react";
import CartTable from "./CartTable";

export default function Cart() {
  const { cart } = useCart();
  //Memomize the cart length to avoid unnecessary re-renders
  const isCartEmpty = useMemo(() => cart.length === 0, [cart.length]);

  return (
    <div className="min-h-[852px] py-12 bg-normalbg dark:bg-darkbg font-primary">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title="Your Cart" />
        {!isCartEmpty ? (
          <>
            <CartTable />
            <div className="flex justify-between mt-8 space-x-4">
              <Link
                to="/home"
                className="py-2 px-6 bg-primary dark:bg-light text-white dark:text-black text-lg font-semibold rounded-md hover:bg-dark dark:hover:bg-lighter transition"
              >
                Back to Products
              </Link>
              {/*Procees to checkout button can be added here*/}
              <button className="py-2 px-6 bg-primary dark:bg-light text-white dark:text-black text-lg font-semibold rounded-md hover:bg-dark dark:hover:bg-lighter transition">
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600 dark:text-lighter flex flex-col items-center">
            <p className="max-w-[576px] px-2 mx-auto text-base mb-4">
              Oops... Your cart is empty. Continue shopping
            </p>
            <img
              src={emptyCartImage}
              alt="Empty Cart"
              className="max-w-[300px] mx-auto mb-6 dark:bg-light dark:rounded-md"
            />
            <Link
              to="/home"
              className="py-2 px-4 bg-primary dark:bg-light text-white dark:text-black text-xl font-semibold rounded-sm flex justify-center items-center hover:bg-dark dark:hover:bg-lighter transition"
            >
              Back to Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
