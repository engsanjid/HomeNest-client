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
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!property?._id) return;
    fetch(`http://localhost:5000/reviews/${property._id}`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [property._id]);

  
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire("Login Required!", "Please log in to post a review.", "info");
      return;
    }

    if (rating < 1 || rating > 5) {
      Swal.fire("Invalid Rating!", "Please select a rating between 1–5.", "warning");
      return;
    }

    const newReview = {
      propertyId: property._id,
      propertyName: property.propertyName,
      reviewerName: user?.displayName || "Anonymous",
      reviewerEmail: user?.email || "Unknown",
      reviewerPhoto: user?.photoURL || "https://i.pravatar.cc/100?img=12",
      rating: parseInt(rating),
      comment: comment.trim(),
      createdAt: new Date(),
      image: property.image || "",
    };

    try {
      const token = await user.getIdToken(); 
      const res = await fetch("http://localhost:5000/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(newReview),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire(" Success!", "Your review has been added!", "success");

        
        setRating(0);
        setComment("");

       
        setReviews((prev) => [newReview, ...prev]);
      } else {
        Swal.fire(" Error!", "Failed to post review.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire(" Server Error!", "Server not responding.", "error");
    }
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
           Ratings & Reviews
        </h3>

      
        <form
          onSubmit={handleSubmitReview}
          className="bg-base-200 p-4 rounded-lg mb-6 shadow-sm"
        >
          <label className="block mb-2 font-semibold">Your Rating (1–5):</label>
          <select
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="select select-bordered w-full mb-3"
            required
          >
            <option value="0">Select Rating</option>
            <option value="1">⭐ 1</option>
            <option value="2">⭐⭐ 2</option>
            <option value="3">⭐⭐⭐ 3</option>
            <option value="4">⭐⭐⭐⭐ 4</option>
            <option value="5">⭐⭐⭐⭐⭐ 5</option>
          </select>

          <textarea
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Write your review..."
            rows="3"
            required
          ></textarea>

          <button
            type="submit"
            className="btn btn-primary w-full mt-3 hover:brightness-110"
          >
            Submit Review
          </button>
        </form>

        
        {loading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner text-primary loading-lg"></span>
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-gray-500 text-center">
            No reviews yet. Be the first to review this property!
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="p-4 bg-base-100 border border-gray-700/30 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={r.reviewerPhoto || "https://i.pravatar.cc/100?img=12"}
                    alt={r.reviewerName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-primary">
                      {r.reviewerName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p className="text-yellow-500 mb-1">
                  {"⭐".repeat(r.rating)}{" "}
                  <span className="text-gray-600 text-sm">({r.rating}/5)</span>
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
