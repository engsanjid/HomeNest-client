import React from "react";
import { Link, useLoaderData } from "react-router-dom";

export default function AllProperties() {
  const data = useLoaderData();

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400 min-h-[60vh] flex items-center justify-center text-lg">
        No properties found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
     
      <h1 className="text-4xl font-bold text-primary text-center mb-3 tracking-wide">
         All Properties
      </h1>
      <p className="text-center text-gray-400 mb-10">
        Discover your next home with <span className="text-primary font-semibold">HomeNest</span>
      </p>

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((p) => (
          <div
            key={p._id}
            className="bg-base-100 border border-gray-700/30 rounded-2xl overflow-hidden 
                       shadow-md hover:shadow-[0_8px_25px_rgba(138,180,255,0.25)] 
                       transform transition-all duration-300 ease-in-out hover:-translate-y-2"
          >
            
            <figure className="relative">
              <img
                src={p.image || "https://via.placeholder.com/400"}
                alt={p.propertyName}
                className="h-56 w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </figure>

        
            <div className="p-5 text-gray-200">
              <h2 className="font-bold text-lg text-primary mb-1">
                {p.propertyName}
              </h2>
              <p className="text-sm text-gray-400">{p.location}</p>
              <p className="text-sm text-gray-400 mt-1">
                Category: <span className="text-gray-300">{p.category}</span>
              </p>

              <p className="text-xl font-semibold text-green-400 mt-2">
                ৳{p.price?.toLocaleString?.() || p.price}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Posted by: <span className="text-gray-300">{p.postedBy || "Unknown"}</span>
              </p>

             
              <div className="flex justify-end mt-4">
                <Link
                  to={`/details/${p._id}`}
                  className="btn btn-outline btn-sm border-primary text-primary 
                             hover:bg-primary hover:text-white transition-all duration-300"
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
