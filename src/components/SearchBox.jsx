import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from 'lucide-react';

export function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/search?q=${query}`);
        navigate(`/searchresults?q=${query}`, { state: { products: response.data } });
      } catch (err) {
        navigate(`/searchresults?q=${query}`, { state: { products: [] } });
      }
    }
  };

  return (
    <div className="flex items-center gap-3 bg-white rounded-lg shadow-lg px-3 py-1.5 max-w-md mx-auto my-2 transition-all">
      <input
        className="flex-1 px-3 py-1.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key =='Enter' && handleSearch()}
      />
      <button
        onClick={handleSearch}
        className="p-2 text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
      >
        <Search size={18} />
      </button>
    </div>
  );
}
