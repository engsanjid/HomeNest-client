import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import Swal from "sweetalert2";

export default function FeaturedRealEstate() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetch("https://homenest-server-nine.vercel.app/featured-properties")
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center my-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-4xl font-bold text-center text-primary mb-3">
        Featured Real Estate
      </h2>
<p className="text-center text-gray-400 mb-12">
        Explore the latest & most popular properties
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((p) => (
          <div
            key={p._id}
            className="bg-base-100 border border-gray-700/30 rounded-2xl overflow-hidden 
                       shadow-md hover:shadow-[0_8px_30px_rgba(138,180,255,0.3)]
                       transition-all duration-300 hover:-translate-y-2"
          >
            <img
              src={p.image}
              alt={p.propertyName}
              className="h-56 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="text-xl font-bold text-primary">{p.propertyName}</h3>
              <p className="text-sm text-gray-400">{p.location}</p>

<p className="text-sm text-gray-400 mt-1">
  {p.description?.slice(0, 60) || "No description available"}...
</p>

<p className="text-sm mt-1">
  Category: <span className="text-gray-200">{p.category}</span>
</p>


              <p className="mt-2 text-xl font-semibold text-green-400">
                ৳ {p.price}
              </p>

              <div className="mt-4 text-right">
                <Link
                  to={`/details/${p._id}`}
                  className="btn btn-outline btn-sm border-primary text-primary hover:bg-primary hover:text-white"
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
