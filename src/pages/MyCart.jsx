import { useEffect, useState } from "react";
import axios from "axios";
import { ItemsInCart } from "../components/ItemsInCart";
import { OrderSummary } from "../components/OrderSummary";
import { useSetRecoilState } from "recoil";
import { cartItemNumberState } from "../recoil/atoms/cartAtom";
import { useNavigate } from "react-router-dom";

export const MyCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const setCartItemNumber = useSetRecoilState(cartItemNumberState);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart/`, {
            headers: { Authorization: `Bearer ${token}` },
            });
            const items = response.data.productsInCart || [];
            setCartItems(items);
            setCartItemNumber(items.length || 0);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load cart");
        } finally {
            setLoading(false);
        }
        };

        fetchCartItems();
    }, [token]);

    return (
        <div className="flex-1 max-w-6xl mx-auto p-6 gap-8 min-h-[70vh]">
            <h2 className="text-2xl font-semibold mb-6 sticky top-0 z-0 px-2 py-1 text-black">
                Your Cart Items
            </h2>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                <ItemsInCart
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    loading={loading}
                    error={error}
                />

                <div className="sticky top-24 w-80 self-start">
                    <OrderSummary cartItems={cartItems} />
                </div>
            </div>
        </div>
    );
};
