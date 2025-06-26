import { useEffect, useState } from "react";
import axios from "axios";
import { Button2 } from "./Button2";

export function ReviewSection({ loggedIn, productId, setToasterMsg, setToasterType, productName }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [productTitle, setProductTitle] = useState("");
  const [canReview, setCanReview] = useState(true); // To prevent review if not eligible

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/${productId}/${productName}`);
        setReviews(res.data.reviews || []);
        setProductTitle(res.data.name || "");
      } catch (err) {
        console.error("Error fetching product info", err);
        setToasterMsg?.("Unable to load product reviews.");
        setToasterType?.("error");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, productName]);

  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= count ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  const submitReview = async () => {
    if (!rating || !comment.trim()) {
      setToasterMsg?.("Please provide both rating and comment.");
      setToasterType?.("error");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/products/${productId}/${productName}/review`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setReviews((prev) => [...prev, { ...res.data.review }]);
      setRating(0);
      setComment("");
      setToasterMsg?.("Review submitted successfully.");
      setToasterType?.("success");
    } catch (err) {
      if (err.response?.status === 403) {
        alert("You need to buy this product before reviewing")
        setCanReview(false);
        setToasterMsg?.("You must buy this product to submit a review.");
        setToasterType?.("error");
      } else {
        setToasterMsg?.("Failed to submit review.");
        setToasterType?.("error");
      }
      console.error("Review submission failed", err);
    }
  };

  if (loading) return <div className="text-gray-500">Loading reviews...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Reviews for: <span className="text-indigo-600">{productTitle}</span>
      </h2>

      {reviews.length > 0 ? (
        <ul className="space-y-6 mb-8">
          {reviews.map((review, idx) => (
            <li key={idx} className="border p-4 rounded shadow-sm">
              <p className="font-semibold text-indigo-700">{review.name}</p>
              <p className="text-sm">
                {renderStars(review.rating)}
                <span className="text-gray-500 ml-2 text-xs">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </p>
              <p className="text-gray-700 mt-1">{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mb-6">No reviews yet.</p>
      )}


      {loggedIn && (
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold">Add Your Review</h3>

          {!canReview ? (
            <p className="text-red-500 font-medium">
              You must purchase this product to submit a review.
            </p>
          ) : (
            <>
              <textarea
                rows={3}
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border p-2 rounded w-24"
                placeholder="Rating (1-5)"
              />
              <Button2 label="Submit Review" onPress={submitReview} />
            </>
          )}
        </div>
      )}

    </div>
  );
}
