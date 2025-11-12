import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export default function AllProperties() {
  const data = useLoaderData(); 

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 min-h-[60vh] flex items-center justify-center">
        No properties found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-primary text-center">
        All Properties
      </h1>
      <p className="text-center mb-8">HomeNest</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((p) => (
          <div
            key={p._id}
            className="card bg-base-100 shadow-xl border border-gray-100"
          >
            <figure>
              <img
                src={p.image || "https://via.placeholder.com/400"}
                alt={p.propertyName}
                className="h-56 w-full object-cover rounded-t-xl"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold">
                {p.propertyName}
              </h2>
              <p className="text-sm text-gray-500">{p.location}</p>
              <p className="text-sm">Category: {p.category}</p>
              <p className="text-primary font-bold text-lg mt-1">
                ৳{p.price?.toLocaleString?.() || p.price}
              </p>
              <p className="text-xs opacity-70">
                Posted by: {p.postedBy || "Unknown"}
              </p>
              <div className="card-actions justify-end mt-3">
                <Link
                  to={`/details/${p._id}`}
                  className="btn btn-outline btn-sm text-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
