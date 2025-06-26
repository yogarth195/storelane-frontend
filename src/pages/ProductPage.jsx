import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ProductCard } from "../components/ProductCard";
import { SortDropdown } from "../components/SortDropdown";

const MemoizedProductCard = React.memo(ProductCard);

function Spinner() {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
    </div>
  );
}

export function ProductPage({ isSideBarVisible }) {
  const [productlist, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const handleSortChange = ({ sortBy, order }) => {
    setSortBy(sortBy);
    setOrder(order);
    setPage(1);
  };

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const params = { page, limit };
        if (sortBy) params.sortBy = sortBy;
        if (order) params.order = order;

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products/`,
          { params }
        );
        setProductList(response.data.products || []);
        setTotalCount(response.data.totalCount || 0);
      } catch (err) {
        console.error("Error fetching products", err);
        setProductList([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [sortBy, order, page, limit]);

  const memoizedProductList = useMemo(() => {
    return productlist.map((product) => (
      <div
        key={product._id}
        className="p-3 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
      >
        <MemoizedProductCard
          productId={product._id}
          name={product.name}
          price={product.price}
          units={product.units}
          description={product.description}
          imgUrl={product.imageUrl}
        />
      </div>
    ));
  }, [productlist]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="p-6 bg-gray-50 min-h-screen mx-10s">
      <div className="max-w-7xl mx-auto">
        {/* Sort Dropdown */}
        <div className="mb-6">
          <SortDropdown onSortChange={handleSortChange} />
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Products
        </h2>

        <div
          className={`relative rounded-lg ${
            isSideBarVisible ? "lg:grid-cols-4" : "lg:grid-cols-5"
          } grid md:grid-cols-3 sm:grid-cols-2 grid-cols gap-6`}
          style={{
            minHeight: "480px",
            transition: "opacity 0.4s ease-in-out",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {/* Product Cards */}
          {memoizedProductList.length === 0 && !loading && (
            <div className="col-span-full text-center text-gray-500 py-20">
              No products found.
            </div>
          )}
          {memoizedProductList}

          {/* Loading overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center rounded-lg z-10">
              <Spinner />
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <button
            disabled={page === 1 || loading}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="px-5 py-2 bg-white border border-gray-300 rounded-lg shadow-sm disabled:opacity-50 hover:bg-gray-100 transition"
          >
            Previous
          </button>

          <span className="text-gray-600 font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages || loading}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="px-5 py-2 bg-white border border-gray-300 rounded-lg shadow-sm disabled:opacity-50 hover:bg-gray-100 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
