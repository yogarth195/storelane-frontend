import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HorizontalCard = ({ product, onRemoveAll }) => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between bg-white shadow-sm rounded-md p-3 m-3 border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-4">
                {/* Clickable Image */}
                <img
                    src={product.productId.imageUrl}
                    alt={product.productId.name}
                    onClick={() => navigate(`/products/${product.productId._id}/${product.productId.name}`)}
                    className="w-20 h-20 object-cover rounded-md border border-gray-300 cursor-pointer hover:scale-[1.03] transition-transform"
                />

                {/* Details */}
                <div className="space-y-1">
                    <h2 className="text-base font-medium text-gray-800">{product.productId.name}</h2>
                    <p className="text-gray-600 text-sm">₹ {product.productId.price}</p>

                    {/* Quantity Display (no +/- buttons) */}
                    <p className="text-sm text-gray-700">Qty: {product.quantity}</p>
                </div>
            </div>

            {/* Remove Button */}
            <button
                className="text-red-500 hover:text-red-600 transition-colors"
                onClick={() => {
                    if (window.confirm("Remove this item from cart?")) {
                        onRemoveAll(product.productId._id);
                    }
                }}
            >
                <Trash2 size={20} />
            </button>
        </div>
    );
};
