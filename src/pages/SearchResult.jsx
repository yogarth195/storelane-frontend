import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { SubHeading } from "../components/SubHeading";

const MemoizedProductCard = React.memo(ProductCard);

export function SearchResults({ isSideBarVisible }) {
  const { state } = useLocation();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 20;
  const [totalCount, setTotalCount] = useState(0);

  const gridClass = useMemo(() => {
    return isSideBarVisible ? "lg:grid-cols-4" : "lg:grid-cols-5";
  }, [isSideBarVisible]);

  useEffect(() => {
    
    window.scrollTo(0, 0);
    const query = new URLSearchParams(window.location.search).get("q");

    const fetchProducts = async () => {
      setLoading(true);

      // Case 1: Search query present → fetch from server
      if (query) {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/search`, {
            params: { q: query, page, limit },
          });
          setProductList(res.data.products || []);
          setTotalCount(res.data.totalCount || 0);
        } catch (err) {
          console.log("Error fetching search result");
          setProductList([]);
          setTotalCount(0);
        } finally {
          setLoading(false);
        }
      }
      // Case 2: Use `state.products` if no query
      else if (state?.products) {
        setProductList(state.products);
        setTotalCount(state.products.length);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, state]);

  const totalPages = Math.ceil(totalCount / limit);

  const memoizedProductList = useMemo(() => {
    return Array.isArray(productList) && productList.length > 0
      ? productList.map((product) => (
          <div key={product._id} className="p-2">
            <MemoizedProductCard
              productId={product._id}
              name={product.name}
              price={product.price}
              units={product.units}
              description={product.description}
              imgUrl={product.imageUrl}
            />
          </div>
        ))
      : [];
  }, [productList]);

  return (
    <div className={`p-4 transition-all duration-300 ease-in-out mx-10`}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="pb-4">
            <SubHeading label={"Here are the search results:"} />
          </div>
          <div className={`grid md:grid-cols-3 sm:grid-cols-2 ${gridClass} gap-4`}>
            {memoizedProductList.length > 0 ? memoizedProductList : <p>No products found.</p>}
          </div>

          {/* ✅ Pagination only if there are products */}
          {totalCount > 0 && (
            <div className="flex justify-center items-center gap-6 mt-6">
              <button
                disabled={page === 1 || loading}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="px-4 py-2 bg-white border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-600 font-medium">
                Page {page} of {totalPages || 1}
              </span>
              <button
                disabled={page === totalPages || loading}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="px-4 py-2 bg-white border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
