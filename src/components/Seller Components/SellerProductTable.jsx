import { useEffect, useState } from "react";
import axios from "axios";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SellerProductTable = () => {
    const [products, setProducts] = useState([]);
    const [interactions, setInteractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchSellerData = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/seller/dashboard`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducts(res.data.products);
            setInteractions(res.data.buyerInteractions);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSellerData();
    }, []);

    if (loading) return <p className="p-4">Loading products...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;

    const getBuyerCount = (productId) =>
        interactions.filter((i) => i.productId?._id === productId).length;

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Your Listed Products</h2>
            <div className="overflow-x-auto rounded shadow">
                <table className="min-w-full bg-white border border-gray-200 text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase">
                        <tr>
                            <th className="px-4 py-2 border-b">Product</th>
                            <th className="px-4 py-2 border-b">Price</th>
                            <th className="px-4 py-2 border-b">Buyers</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 border-b">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="w-12 h-12 object-cover rounded border"
                                        />
                                        <div>
                                            <div className="font-medium">{product.name}</div>
                                            <div className="text-xs text-gray-500">{product._id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 border-b">₹{product.price}</td>
                                <td className="px-4 py-3 border-b">{getBuyerCount(product._id)}</td>
                                <td className="px-4 py-3 border-b">
                                    <div className="flex items-center gap-3">
                                        <button className="text-gray-600 hover:text-blue-600" title="View">
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            className="text-gray-600 hover:text-green-600"
                                            title="Edit"
                                            onClick={() => navigate(`/seller/product/update/${product._id}/`)}
                                            >
                                            <Pencil size={18} />
                                        </button>
                                        <button className="text-gray-600 hover:text-red-600" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
