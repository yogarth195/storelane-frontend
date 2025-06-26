import { useNavigate } from "react-router-dom";
import { Button2 } from "./Button2";
import { useState } from "react";
import { InputBox } from "./InputBox";
import axios from "axios";
import { Toaster } from "./Toasters/AddToCartToast";
import { useRecoilState } from "recoil";
import { cartItemNumberState } from "../recoil/atoms/cartAtom";

const Star = ({ filled }) => (
  <svg
    className={`w-3 h-3 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.92-.755 1.688-1.54 1.118L10 13.347l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.97a1 1 0 00-.364-1.118L3.623 9.397c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" />
  </svg>
);

export const ProductCard = ({
  name,
  imgUrl,
  price,
  units,
  description,
  productId,
}) => {
  const [count, setCount] = useState(1);
  const [toasterMsg, setToasterMsg] = useState("");
  const [toasterType, setToasterType] = useState("success");
  const [cartCount, setCartCount] = useRecoilState(cartItemNumberState);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const addToCart = async () => {
    if (!isLoggedIn) {
      setToasterMsg("Please login first");
      setToasterType("error");
      return;
    }

    
    if (count <= 0 || count > units) {
      setToasterMsg("Invalid quantity");
      setToasterType("error");
      return;
    }


    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/cart/add-to-cart/`,
        { productId, quantity: count },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/cart/cart-count/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartCount(response.data.productCount);
      setToasterMsg("Item added to cart!");
      setToasterType("success");
    } catch (err) {
      console.error("Add to cart error", err);
      setToasterMsg("Failed to add item to cart.");
      setToasterType("error");
    }
  };

  return (
    <>
      <div
        className="flex flex-col bg-white rounded-xl shadow border border-gray-200
                   hover:shadow-lg hover:-translate-y-0.5 transition-transform duration-200 
                   cursor-pointer max-w-xs overflow-hidden"
        onClick={() => navigate(`/products/${productId}/${name}`)}
      >
        {/* Image */}
        <div className="relative h-48 w-full flex items-center justify-center bg-white p-2">
          <img
            src={imgUrl}
            alt={name}
            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
            draggable={false}
          />
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-md font-semibold text-gray-900 truncate">{name}</h3>
            <div className="flex space-x-0.5 my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} filled={i < 4} />
              ))}
            </div>
            <p className="text-xs text-gray-600 line-clamp-2 mb-2" title={description}>
              {description}
            </p>
          </div>

          <p className="text-lg font-bold text-indigo-600 mt-auto">₹{price}</p>
        </div>

        {/* Footer */}
        <div
          className="p-3 gap-2 bg-gray-50 border-t border-gray-200 flex items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pb-5">

            <InputBox
              type="number"
              value={count}
              onTyping={(e) => setCount(Number(e.target.value))}
              min="1"
              max={units}
              placeHolder={`Qty (${units})`}
              className="w-16 h-8 text-sm py-1 px-2 border rounded"
            />
          </div>

          <div className="">

            <Button2
              aria-label="Add"
              className="h-8 px-3 text-sm flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded shadow-sm transition"
              onPress={addToCart}
              label="Add"
            />
          </div>
        </div>
      </div>

      {/* Toaster outside the card */}
      {toasterMsg && (
        <Toaster
          message={toasterMsg}
          type={toasterType}
          position={toasterMsg === "Please login first" ? "top" : "bottom"}
          onClose={() => setToasterMsg("")}
        />
      )}
    </>
  );
};
