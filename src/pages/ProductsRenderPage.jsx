import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button2 } from "../components/Button2";
import { InputBox } from "../components/InputBox";
import { Toaster } from "../components/Toasters/AddToCartToast";
import { cartItemNumberState } from "../recoil/atoms/cartAtom";
import { useRecoilState } from "recoil";
import { ReviewSection } from "../components/ReviewSection";

export function ProductsRenderPage() {
  const loggedIn = localStorage.getItem("token");
  const { productId, productName } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [cartCount, setCartCount] = useRecoilState(cartItemNumberState);
  const [seller, setSeller] = useState("");
  const [toasterMsg, setToasterMsg] = useState("");
  const [toasterType, setToasterType] = useState("success");
  const [activeTab, setActiveTab] = useState("review");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products/${productId}/${productName}/`
        );
        setProduct(response.data);
        setSeller(`${response.data.seller.firstName} ${response.data.seller.lastName || ""}`);
        setMainImage(response.data.imageUrl);
      } catch (err) {
        console.error("Error fetching products from the backend", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, productName]);

  const addToCart = async () => {
    if (count <= 0) {
      alert("Please enter a valid quantity");
      setCount(product.units || 1);
      return;
    }

    if (count > product.units) {
      alert("Not Enough Stock.");
      return;
    }

    if (!loggedIn) {
      alert("Please login to add items to cart.");
      return;
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/cart/add-to-cart/`,
        { productId, quantity: count },
        { headers: { Authorization: `Bearer ${loggedIn}` } }
      );
      setToasterMsg("Item added to cart!");
      setToasterType("success");

      const countResponse = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/cart/cart-count/`,
        { headers: { Authorization: `Bearer ${loggedIn}` } }
      );

      setCartCount(countResponse.data.productCount);
    } catch (err) {
      console.error("Error adding to the cart", err);
      setToasterMsg("Failed to add item to cart.");
      setToasterType("error");
    }
  };

  const handleInputChange = (e) => {
    let newCount = Number(e.target.value);
    setCount(newCount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500 text-xl font-semibold">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-12">
      {/* Product Info Section */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
        {/* Image Section */}
        <div className="w-full max-w-lg mx-auto">
          <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden border">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-contain"
              draggable={false}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 max-w-xl flex flex-col justify-start space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            {product.name}
          </h1>

          <p className="text-sm text-gray-600">
            Sold by: <span className="font-medium text-indigo-700">{seller}</span>
          </p>

          {product.reviews?.length > 0 && (
            <div className="text-sm text-gray-600">
              ⭐ {(
                product.reviews.reduce((acc, cur) => acc + cur.rating, 0) /
                product.reviews.length
              ).toFixed(1)}{" "}
              ({product.reviews.length} reviews)
            </div>
          )}

          <h2 className="text-xl font-semibold text-gray-800 mt-4">Description</h2>
          <p className="text-gray-700 text-lg leading-relaxed text-justify whitespace-pre-wrap">
            {product.description}
          </p>

          <p className="text-3xl font-bold text-indigo-600">₹{product.price}</p>
          <p className="text-sm text-gray-500 tracking-wide">
            Available units: <span className="font-semibold">{product.units}</span>
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-4 max-w-xs">
              <InputBox
                type="number"
                value={count}
                onTyping={handleInputChange}
                min="1"
                placeHolder="Quantity"
                lable="Quantity"
                className="w-28"
              />
              <Button2
                label="Add To Cart"
                onPress={addToCart}
                className="px-6 py-3 rounded-lg shadow-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <section className="bg-gray-50 rounded-lg shadow-lg max-w-7xl mx-auto">
        <nav className="flex border-b border-gray-300">
          {["review", "specs", "similar"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-center font-semibold text-lg transition-colors duration-300 ${
                activeTab === tab
                  ? "border-b-4 border-indigo-600 text-indigo-600"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
              aria-current={activeTab === tab ? "page" : undefined}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        <div className="p-8 bg-white rounded-b-lg min-h-[16rem]">
          {activeTab === "review" && (
            <ReviewSection
              loggedIn={loggedIn}
              productId={productId}
              productName={productName}
            />
          )}

          {activeTab === "specs" && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Product Specifications</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 max-w-prose">
                <li>High-Quality Materials</li>
                <li>24-Hour Battery Life</li>
                <li>Water-Resistant Design</li>
              </ul>
            </>
          )}

          {activeTab === "similar" && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Similar Products</h2>
              <p className="text-gray-600 max-w-prose">
                Here we can render other products based on history and recommendations.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Toaster */}
      <Toaster message={toasterMsg} type={toasterType} onClose={() => setToasterMsg("")} />
    </div>
  );
}
