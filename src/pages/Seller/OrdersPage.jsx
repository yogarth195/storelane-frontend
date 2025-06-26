import axios from "axios";
import { useEffect, useState } from "react"

export const SellerOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [earning, setEarnings] = useState(0);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/seller/orders`, {
                    headers : {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setOrders(res.data.buyerInteractions);
                setEarnings(res.data.earning);
            } catch(err) {
                console.error(`Error fetching seller orders`, err);
            }
        }

        fetchOrders();
    }, [token]);

    const handleShip  = async(orderId, productId) => {
        setLoading(true);
        try {
            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/seller/mark-shipped`, 
                {orderId, productId}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setOrders((prev) => 
                prev.map((o) => 
                    o.orderId === orderId && o.productId._id === productId 
                    ? {...o, shipped: true} 
                    : o
                )            
            );
        } catch (err) {
            console.error("Failed to mark as shipped", err);
        } finally {
            setLoading(false);
        }
    }
    return (

        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Buyer Orders</h2>
            <p className="text-lg font-medium mb-6">Total Earnings: ₹{earning}</p>

            <div className="space-y-4">
                {orders.map((order, idx) => (
                <div
                    key={order._id}
                    className="flex items-center justify-between border p-4 rounded shadow-sm"
                >
                    <div className="flex items-center space-x-4">
                    <img
                        src={order.productId.imageUrl}
                        alt={order.productId.name}
                        className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                        <h3 className="text-lg font-semibold">
                        {order.productId.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                        Quantity: {order.quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                        Order ID: {order.orderId.slice(-6).toUpperCase()}
                        </p>
                        <p className="text-sm text-gray-600">
                        ₹{order.productId.price} × {order.quantity} = ₹
                        {order.productId.price * order.quantity}
                        </p>
                        <p
                        className={`text-sm mt-1 ${
                            order.shipped ? "text-green-600" : "text-yellow-600"
                        }`}
                        >
                        Status: {order.shipped ? "Shipped" : "Yet to be shipped"}
                        </p>
                    </div>
                    </div>

                    {!order.shipped && (
                    <button
                        onClick={() => handleShip(order.orderId, order.productId._id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Ship"}
                    </button>
                    )}
                </div>
                ))}
            </div>
        </div>
    )
}