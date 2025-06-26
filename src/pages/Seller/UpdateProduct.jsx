import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/seller/product/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const product = res.data.product;

        setProductData(product);
        setFormData({
          ...product,
          category: Array.isArray(product.category) ? product.category.join(", ") : "",
          sub_categories: Array.isArray(product.sub_categories)
            ? product.sub_categories.join(", ")
            : "",
        });
      } catch (err) {
        console.error("Failed to fetch product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const updatePayload = {
      ...formData,
      category: formData.category.split(",").map((c) => c.trim()),
      sub_categories: formData.sub_categories.split(",").map((s) => s.trim()),
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/seller/product/${id}`, updatePayload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/seller-dashboard");
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading product...</div>;

  if (!productData) return <div className="p-6 text-red-600">Product not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-800">Product Details</h2>

        {!editMode ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={productData.imageUrl}
                  alt={productData.name}
                  className="rounded-lg w-full object-cover shadow-md"
                />
              </div>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Name:</span> {productData.name}</p>
                <p><span className="font-semibold">Price:</span> ₹{productData.price}</p>
                <p><span className="font-semibold">Description:</span> {productData.description}</p>
                <p><span className="font-semibold">Category:</span> {productData.category.join(", ")}</p>
                <p><span className="font-semibold">Sub-categories:</span> {productData.sub_categories.join(", ")}</p>
                <p><span className="font-semibold">Units Available:</span> {productData.units}</p>
              </div>
            </div>
            <button
              onClick={() => setEditMode(true)}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition"
            >
              Edit Product
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">Product Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">Price (₹)</label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">Category (comma separated)</label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">Sub-categories (comma separated)</label>
                <input
                  name="sub_categories"
                  value={formData.sub_categories}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">Units Available</label>
                <input
                  name="units"
                  type="number"
                  value={formData.units}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-600">Image URL</label>
                <input
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium text-gray-600">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end mt-6">
              <button
                type="submit"
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
