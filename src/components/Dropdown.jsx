import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const Dropdown = () => {
  const [userIn, setUserIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [isActive, setActive] = useState(true);
  const token = localStorage.getItem('token');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setUserIn(false);
        setUsername("");
        return;
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.user) {
          setUserIn(true);
          setUsername(response.data.user.firstName);
        }
      } catch (err) {
        console.error("Error", err.message);
        setUserIn(false);
        setUsername("");
      }
    };
    fetchUserData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserIn(false);
    setUsername("");
    navigate("/signin");
  };

  if (!userIn) {
    return (
      <button
        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition"
        onClick={() => navigate("/signin")}
      >
        Log in
      </button>
    );
  }

  return (
    <div ref={dropdownRef} className="relative inline-block text-left font-sans">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 cursor-pointer px-5 py-3 rounded-xl border border-emerald-600 bg-white text-emerald-700 font-semibold shadow-md hover:bg-emerald-50 transition duration-300 select-none"
      >
        <span className="capitalize">{username}</span>
        {isActive && (
          <span className="bg-green-500 h-3 w-3 rounded-full border-2 border-white shadow" title="Active" />
        )}
        <svg
          className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <div
        className={`absolute right-0 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="py-3 text-gray-700 font-medium text-base">
          <li className="px-6 py-3 hover:bg-emerald-100 cursor-pointer transition" onClick={() => navigate("/profile")}>
            Profile
          </li>
          <li className="px-6 py-3 hover:bg-emerald-100 cursor-pointer transition" onClick={() => navigate("/myCart")}>
            Cart
          </li>
          <li className="px-6 py-3 hover:bg-emerald-100 cursor-pointer transition" onClick={() => navigate("/myOrders")}>
            MyOrders
          </li>
          <li className="px-6 py-3 hover:bg-emerald-100 cursor-pointer transition">
            Notifications
          </li>
          <li
            className="px-6 py-3 text-red-600 hover:bg-red-100 cursor-pointer transition"
            onClick={handleLogout}
          >
            Logout →
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
