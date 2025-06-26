import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import axios from "axios";
import { ProductCard } from "../components/ProductCard";
import { SlidingBar } from "../components/SlidingBar";
import { LoadingIcon } from "../components/LoadingIcon";
import { HeroItems } from "../components/HeroItems";
import { LaptopSection} from "../components/ImpactComponents/MainDiv";
import { BecomeSeller } from "../components/ImpactComponents/BecomeASeller";

const MemoizedProductCard = React.memo(ProductCard);

export function HomePage({ isSideBarVisible }) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/`, {
          params: { page, limit },
        });

        const newProducts = response.data.products || [];

        setProductList((prev) => [...prev, ...newProducts]);

        // If fewer products than limit returned, no more data
        if (newProducts.length < limit) setHasMore(false);
      } catch (err) {
        console.error("Error fetching products", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);






  // Impact Compnents Props 
  
const categories = [
  {
    title: "Headphones",
    keyword: "headphones",
    image:
      "https://images.unsplash.com/photo-1583224521508-8d9a9fc1ecb4?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Books",
    keyword: "book",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Perfume",
    keyword: "perfume",
    image:
      "https://images.unsplash.com/photo-1622443331370-eaada92c3e0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Sneakers",
    keyword: "shoes",
    image:
      "https://images.unsplash.com/photo-1598300181755-6398c1a0e08f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Makeup",
    keyword: "makeup",
    image:
      "https://images.unsplash.com/photo-1621839677134-ff740aab41b6?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Laptops",
    keyword: "laptop",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Cameras",
    keyword: "camera",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Watches",
    keyword: "watches",
    image:
      "https://images.unsplash.com/photo-1612817159966-78645cd8500b?auto=format&fit=crop&w=800&q=80",
  },
];

  const memoizedProductList = useMemo(() => {
    return productList.map((product, index) => (
      <div
        key={product._id}
        ref={index === productList.length - 1 ? lastProductRef : null}
        className="p-2"
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
  }, [productList]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const html = document.documentElement;
    if (savedTheme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, []);
  return (
  <div className={`p-4 transition-all duration-300 ease-in-out dark:bg-[#13293D]`}>
    <SlidingBar />




    {/* Impact  Components:  */}
    <HeroItems/>
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Explore Our Categories
      </h1>
        
        <LaptopSection/>




          <BecomeSeller/>










    <div className="pb-4 font-bold flex justify-center">Here are all the products:</div>
    {/* Wrapper to add horizontal space away from viewport edges */}
    <div className="px-6 mx-auto max-w-[1280px]">
      <div
        className={`grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 pb-3 ${
          isSideBarVisible ? "lg:grid-cols-4" : "lg:grid-cols-5"
        }`}
      >
        {memoizedProductList}
      </div>
    </div>

    {/* Loading Indicator while fetching more */}
    {loading && (
      <div className="flex justify-center py-6">
        <LoadingIcon />
      </div>
    )}

    {!hasMore && (
      <div className="text-center text-gray-500 py-4">No more products to show.</div>
    )}
  </div>
);
}
