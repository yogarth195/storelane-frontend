import axios from "axios";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const UploadProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    imageUrl: "",
    description: "",
    category: "",
    sub_categories: "",
    units: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/seller/product`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Product Uploaded Successfully!");
      setForm({
        name: "",
        price: "",
        imageUrl: "",
        description: "",
        category: "",
        sub_categories: "",
        units: "",
      });

      // setTimeout(() => navigate("/seller-dashboard"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload Failed");
    }
  };

  const requiredFields = ["name", "price", "category", "units"];

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">Upload Product</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "name", label: "Product Name" },
          { name: "price", label: "Price (₹)" },
          { name: "imageUrl", label: "Image URL" },
          { name: "description", label: "Description" },
          { name: "category", label: "Category" },
          { name: "sub_categories", label: "Sub Categories" },
          { name: "units", label: "Units (e.g. pcs, kg)" },
        ].map(({ name, label }) => (
          <div key={name} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {label} {requiredFields.includes(name) && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={`Enter ${label}`}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required={requiredFields.includes(name)}
            />
          </div>
        ))}

        <div className="col-span-full mt-4">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition duration-200 ease-in-out active:scale-95"
          >
            Submit Product
          </button>
        </div>
      </form>
    </div>
  );
};
