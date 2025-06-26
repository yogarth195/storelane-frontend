// components/CartIcon.jsx
import React from "react";
import { useRecoilValue } from "recoil";
import { cartItemNumberState } from "../recoil/atoms/cartAtom";

// perfect cart icon. 
// for more details understand the svg and icon alignment
const CartIcon = () => {
  const cartItemNumber = useRecoilValue(cartItemNumberState);

  return (
    <div className="relative group cursor-pointer dark:text-white">
      <a href="/myCart" className="relative">
        {/* Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 md:w-8 md:h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>

        {/* Badge */}
        {cartItemNumber > 0 && (
          <span className="absolute top-0 right-0 left-3.5 -mt-1 -mr-1 bg-red-500 border border-gray-800 text-white text-xs md:text-sm font-bold rounded-full w-4 h-4 flex items-center justify-center md:w-5 md:h-5 md:[left:1.125rem] md:[top:-0.15rem]">
            {cartItemNumber > 9 ? "9+" : cartItemNumber}
          </span>
        )}
      </a>

      {/* Tooltip */}
      {/* Tooltip below the cart, in the below className tailwind class, if you remoe the pointer-events-none then when you hover over the text that is "your cart has x item" will not fade away when you hover over it */}
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            Your cart has {cartItemNumber} item{cartItemNumber !== 1 ? "s" : ""}
        </div>

    </div>
  );
};

export default CartIcon;
