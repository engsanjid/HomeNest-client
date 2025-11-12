import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

export default function PropertyDetails() {
  const data = useLoaderData();
  const property = data?.result || data;
  const { user } = useContext(AuthContext);

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/reviews/${property._id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [property._id]);


  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      return Swal.fire("Login required", "Please login to add a review.", "info");
    }

    if (!rating || !comment.trim()) {
      return Swal.fire("Error", "Please provide both rating and review text.", "error");
    }

    const newReview = {
      propertyId: property._id,
      propertyName: property.propertyName,
      reviewerName: user.displayName || "Anonymous User",
      reviewerEmail: user.email,
      reviewerPhoto: user.photoURL || "https://i.pravatar.cc/100?u=user",
      rating: parseInt(rating),
      comment,
      createdAt: new Date(),
      image: property.image,
    };

    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire("Thanks!", "Your review has been added.", "success");
          setReviews((prev) => [newReview, ...prev]);
          setRating(0);
          setComment("");
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
     
      <img
        src={property.image || "https://via.placeholder.com/800"}
        alt={property.propertyName}
        className="w-full h-80 object-cover rounded-xl shadow-lg"
      />

     
      <h2 className="text-3xl font-bold mt-6 text-primary">
        {property.propertyName}
      </h2>
      <p className="text-gray-600 text-sm mb-2">
        Category: <span className="font-medium">{property.category}</span>
      </p>
      <p className="text-gray-600 text-sm mb-2">
        Location: <span className="font-medium">{property.location}</span>
      </p>
      <p className="text-xl font-bold text-green-600 mb-4">
        ৳ {property.price?.toLocaleString?.() || property.price}
      </p>
      <p className="text-gray-700 leading-relaxed">{property.description}</p>

      

      <div className="mt-10 border-t pt-6">
        <h3 className="text-2xl font-bold text-primary mb-4">
          ⭐ Ratings & Reviews
        </h3>

      
        <form
          onSubmit={handleSubmitReview}
          className="bg-base-200 p-4 rounded-lg mb-6"
        >
          <label className="block mb-2 font-semibold">Your Rating (1–5):</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="select select-bordered w-full mb-3"
          >
            <option value="0">Select Rating</option>
            <option value="1">⭐ 1</option>
            <option value="2">⭐⭐ 2</option>
            <option value="3">⭐⭐⭐ 3</option>
            <option value="4">⭐⭐⭐⭐ 4</option>
            <option value="5">⭐⭐⭐⭐⭐ 5</option>
          </select>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Write your review..."
            rows="3"
          ></textarea>

          <button type="submit" className="btn btn-primary w-full mt-3">
            Submit Review
          </button>
        </form>

        {/* --- Reviews List --- */}
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first!</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="p-4 bg-base-100 border rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={r.reviewerPhoto}
                    alt={r.reviewerName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{r.reviewerName}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-yellow-500 mb-1">
                  {"⭐".repeat(r.rating)}{" "}
                  <span className="text-gray-600 text-sm">
                    ({r.rating}/5)
                  </span>
                </p>
                <p className="text-gray-700">{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
