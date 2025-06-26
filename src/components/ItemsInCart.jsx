import axios from "axios";
import { useSetRecoilState } from "recoil";
import { HorizontalCard } from "./HorizontalCard";
import { cartItemNumberState } from "../recoil/atoms/cartAtom";

export const ItemsInCart = ({ cartItems, setCartItems, loading, error }) => {
    const setCartItemNumber = useSetRecoilState(cartItemNumberState);
    const token = localStorage.getItem("token");

    const onRemoveAll = async (productId) => {
        if (!token) return;

        try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/cart/delete-from-cart/`, {
            headers: { Authorization: `Bearer ${token}` },
            data: { productId },
        });

        const updated = cartItems.filter((item) => item.productId._id !== productId);
        setCartItems(updated);

        const countRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/cart/cart-count/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setCartItemNumber(countRes.data.productCount);
        } catch (err) {
        console.error("Failed to remove item:", err);
        }
    };

    return (
        <div className="flex-1 max-h-[600px] overflow-y-auto pr-2 border border-gray-300 rounded-md shadow-sm">
            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && cartItems.length === 0 && (
                <p className="text-red-600 m-10">No items in cart.</p>
            )}

            <div className="pl-1">
                {cartItems.map((item, i) => (
                    <HorizontalCard key={i} product={item} onRemoveAll={onRemoveAll} />
                ))}
            </div>
        </div>
    );
};
