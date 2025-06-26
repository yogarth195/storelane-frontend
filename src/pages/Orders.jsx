import axios from "axios";
import { useEffect, useState } from "react"

export const MyOrders = () => {
    const [orders, setOrder] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("all");

    const token = localStorage.getItem('token');


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/myOrders`, {
                    headers : {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setOrder(res.data.orders);
                setFilteredOrders(res.data.orders);
            } catch(err) {
                console.error('Failed to fetch orders', err);
            }
        };

        fetchOrders();
    }, [token]);


    useEffect(() => {
        if(filterStatus === "all") {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(
                orders.filter((order) =>
                order.products.some((p) => p.status === filterStatus)
                )
            );
        }
    }, [filterStatus, orders])


    const handleFilterChange = (e) => {
            setFilterStatus(e.target.value);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>

            <div className="mb-4">
                <label className="font-medium mr-2">Filter by status:</label>
                <select
                className="border px-3 py-1 rounded"
                value={filterStatus}
                onChange={handleFilterChange}
                >
                <option value="all">All</option>
                <option value="yet-to-ship">Yet to be Shipped</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                </select>
            </div>

            {filteredOrders.length === 0 ? (
                <p>No orders found for this category.</p>
            ) : (
                filteredOrders.map((order) => (
                <div key={order._id} className="border rounded p-4 mb-4 shadow-sm">
                    <h3 className="text-lg font-semibold mb-2">
                    Order #{order._id.slice(-6)}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <ul className="divide-y">
                    {order.products.map((product, idx) => (
                        <li key={idx} className="py-2 flex justify-between">
                        <div>
                            <p className="font-medium">{product.productId?.name}</p>
                            <p className="text-xs text-gray-500">
                            Qty: {product.quantity}
                            </p>
                        </div>
                        <p
                            className={`text-sm font-semibold capitalize ${
                            product.status === "delivered"
                                ? "text-green-600"
                                : product.status === "shipped"
                                ? "text-blue-600"
                                : "text-orange-500"
                            }`}
                        >
                            {product.status || "Yet to be Shipped"}
                        </p>
                        </li>
                    ))}
                    </ul>
                </div>
                ))
            )}
        </div>
    )
}