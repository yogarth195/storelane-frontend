import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

export const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const items = res.data.productsInCart || [];
        setCartItems(items);
        const total = items.reduce(
          (sum, item) => sum + item.productId.price * item.quantity,
          0
        );
        setTotalAmount(total);
        setError("");
      } catch (err) {
        setError("Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token]);

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/checkout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order placed successfully!", {
        duration: 2000,
        position: "top-center",
      });
      setTimeout(() => navigate("/myorders"), 2000);
    } catch (err) {
      toast.error("Failed to place order", {
        duration: 2500,
        position: "top-center",
      });
    } finally {
        setIsPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 text-black">
      <Toaster />
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {loading && <p className="text-gray-500">Loading your cart...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Items in Your Cart
              </h2>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <li key={index} className="py-4 flex gap-4">
                    <img
                      src={item.productId.imageUrl}
                      alt={item.productId.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {item.productId.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.productId.description?.slice(0, 80)}...
                      </p>
                      <p className="text-sm">
                        Price: ₹{item.productId.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-bold text-lg text-emerald-600">
                      ₹{item.productId.price * item.quantity}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                Shipping Details
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" className="border p-2 rounded" />
                <input type="text" placeholder="Address" className="border p-2 rounded" />
                <input type="text" placeholder="City" className="border p-2 rounded" />
                <input type="text" placeholder="Pincode" className="border p-2 rounded" />
                <input type="text" placeholder="Phone Number" className="border p-2 rounded col-span-full" />
              </form>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Order Summary
            </h2>
            <div className="text-sm space-y-2">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between text-gray-700">
                  <span>
                    {item.productId.name} × {item.quantity}
                  </span>
                  <span>₹{item.productId.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{totalAmount}</span>
            </div>

            <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className={`mt-6 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition ${
                    isPlacingOrder ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {isPlacingOrder ? (
                    <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Placing...
                    </span>
                ) : (
                    "Place Order"
                )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
