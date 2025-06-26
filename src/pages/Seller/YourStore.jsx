import { useState, useEffect } from "react";
import axios from "axios";
import { SellerSideBar } from "../../components/Seller Components/SideBar";
import { SummaryCard } from "../../components/Seller Components/SummaryCard";
import { Eye, Pencil, Store, Trash2 } from "lucide-react";

export const YourStore = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [storeName, setStoreName] = useState("Your Store");

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/seller/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDashboard(res.data);
      setStoreName(res.data.storeName);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch Dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p className="text-center text-lg mt-10">Loading Dashboard...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">Error: {error}</p>;

  const summaryData = [
    { title: "Total Revenue", value: dashboard.earning, change: 43, previous: 17564, isIncrease: true },
    { title: "Total Orders", value: dashboard.totalSales, change: -12, previous: 218, isIncrease: false },
    { title: "Products Listed", value: dashboard.products.length, change: 6, previous: 33, isIncrease: true },
    // { title: "Customer Reviews", value: dashboard.buyerInteractions.length, change: 22, previous: 70, isIncrease: true },
  ];

  return (
    <div className="flex">
      <div className="flex-1 p-8 max-w-6xl mx-auto text-gray-800">
        {/* Store Heading */}
        <header className="flex items-center gap-3 mb-8">
          <Store size={32} className="text-indigo-500" />
          <h1 className="text-3xl font-bold tracking-wide">{storeName}</h1>
        </header>

        {/* Summary Cards */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Store Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryData.map((card, idx) => (
              <SummaryCard key={idx} {...card} />
            ))}
          </div>
        </section>

        {/* Product Table */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Your Products</h2>
          <div className="overflow-x-auto rounded shadow border border-gray-200">
            <table className="min-w-full bg-white text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-3 border-b">Product</th>
                  <th className="px-4 py-3 border-b">Price</th>
                  <th className="px-4 py-3 border-b">Buyers</th>
                  <th className="px-4 py-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.products.map((product) => {
                  const buyerCount = dashboard.buyerInteractions.filter(
                    (interaction) => interaction.productId?._id === product._id
                  ).length;

                  return (
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
                      <td className="px-4 py-3 border-b">{buyerCount}</td>
                      <td className="px-4 py-3 border-b">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => console.log("View", product._id)}
                            className="text-gray-600 hover:text-blue-600 transition"
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => console.log("Edit", product._id)}
                            className="text-gray-600 hover:text-green-600 transition"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => console.log("Delete", product._id)}
                            className="text-gray-600 hover:text-red-600 transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
