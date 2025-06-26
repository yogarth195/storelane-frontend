import { useNavigate } from "react-router-dom";
import { CheckoutButton } from "./CheckoutButton";

export const OrderSummary = ({ cartItems }) => {
    const navigate = useNavigate();

    const totalMRP = cartItems.reduce(
        (sum, item) => sum + item.productId.price * item.quantity,
        0
    );

    const discount = 50;
    const coupon = 20;
    const platformFee = 10;
    const shipping = 40;
    const total = totalMRP - discount - coupon + platformFee + shipping;

    
    if (!cartItems || cartItems.length === 0) {
    return (
        <div className="w-80 p-6 bg-white rounded-lg shadow-md border border-gray-300">
            <h2 className="text-lg font-semibold text-gray-800">Cart Summary</h2>
            <p className="text-sm text-gray-600 mt-2">No items in the cart.</p>
        </div>
    );
}
    return (
        <div className="w-80 p-6 bg-white rounded-lg shadow-md border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Cart Summary</h2>

            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-700">Total MRP:</span>
                    <span className="text-gray-500">₹{totalMRP + discount}</span>
                </div>
                    <div className="flex justify-between">
                    <span className="text-gray-700">Discount:</span>
                    <span className="text-green-600">-₹{discount}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-700">Coupon:</span>
                    <span className="text-blue-600">-₹{coupon}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-700">Platform Fee:</span>
                    <span className="text-gray-700">₹{platformFee}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-700">Shipping:</span>
                    <span className="text-gray-700">₹{shipping}</span>
                </div>
            </div>

            <div className="flex justify-between mt-5 font-semibold text-lg text-black mb-3">
                <span>Total:</span>
                <span>₹{total}</span>
            </div>

            <CheckoutButton onClick={() => navigate("/checkout")} className="mt-5" />
        </div>
    );
};
