import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { SearchBar } from "./SearchBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartItemNumberState } from "../recoil/atoms/cartAtom";
import CartIcon from "./CartIcon";
import { StartSelling } from "./Seller Components/Start";

const MemoizedDropDown = React.memo(Dropdown);
const MemoizedSearchBar = React.memo(SearchBar);

export const Navbar = ({ toggleSideBar, isSideBarVisible }) => {
    const cartItemNumber = useRecoilValue(cartItemNumberState);
    const setCartItemNumber = useSetRecoilState(cartItemNumberState);

    
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const fetchCartCount = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart/cart-count/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItemNumber(response.data.productCount);
      };

      fetchCartCount();
    }
  }, [token]); // added dependency to avoid re-runs on every render

  return (
    <div className="flex items-center justify-between sticky top-0 left-0 z-10 backdrop-blur-lg bg-white/70 dark:backdrop-blur-2xl dark:bg-black/80 text-black px-4 py-3 shadow-lg">
      {/* Container flex wraps on smaller screens */}
      <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
        {/* button to toggle theme: */}
        {/* <button
          onClick={() => {
            const html = document.documentElement;
            html.classList.toggle("dark");
            localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
          }}
          className="ml-2 px-3 py-1.5 border border-gray-400 dark:border-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          T
        </button> */}
        {/* Sidebar toggle button */}
        {/* <button
          className="p-1 rounded hover:bg-gray-600 "
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button> */}
        {/* Logo */}
        <a href="/home" className="ml-5 text-lg text-black dark:text-white font-bold whitespace-nowrap md:text-2xl">
          StoreLane
        </a>


         
        {/* 🔘 Dark mode toggle button */}
        {/* Dark mode isn't applied good - ly right now, will work on that  later.  */}
        {/* <button
          onClick={() => {
            const html = document.documentElement;
            html.classList.toggle("dark");
            localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
          }}
          className="ml-2 px-3 py-1.5 border border-gray-400 dark:border-gray-600 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          Toggle Theme
        </button> */}
      </div>

      {/* Search bar: hidden on xs, visible md and above */}
      <div className="flex-grow hidden md:block">
        <MemoizedSearchBar />
      </div>

      {/* Right side: dropdown and cart */}
      <div className="flex items-center space-x-4">
        <StartSelling/>
        <div className="hidden sm:block">
          <MemoizedDropDown />
        </div>

        <CartIcon/>
      {/* below is a cart that isn't a component rather part of the navbar
        <a href="/myCart" className="relative cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          
          {cartItemNumber > 0 && (
            <span className="absolute top-0 right-0 left-3.5 -mt-1 -mr-1 bg-red-500 border border-gray-800 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartItemNumber > 9 ? "9+" : cartItemNumber}
            </span>
          )}


          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
            Your cart has 3 items
          </div>
        </a> 
          */}
      </div>
    </div>
  );
};
