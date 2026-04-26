import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date_desc");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    },1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);


  useEffect(() => {
 
  if (debouncedSearch === "") {
    setLoading(true);
    fetch(`https://homenest-server-nine.vercel.app/all-properties?sort=${sortOption}`)
      .then(res => res.json())
      .then(data => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return;
  }

  setLoading(false);

  fetch(
    `https://homenest-server-nine.vercel.app/all-properties?search=${debouncedSearch}&sort=${sortOption}`
  )
    .then((res) => res.json())
    .then((data) => {
      setProperties(data);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, [debouncedSearch, sortOption]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-primary text-center mb-3 tracking-wide">
        All Properties
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Discover your next home with <span className="text-primary font-semibold">HomeNest</span>
      </p>

     
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

     
        <input
          type="text"
          placeholder="Search by property name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/2"
        />


        <select
          className="select select-bordered w-full md:w-1/4"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="date_asc">Newest First</option>
          <option value="date_desc">Oldest First</option>
          <option value="price_asc">Price (Low → High)</option>
          <option value="price_desc">Price (High → Low)</option>
        </select>
      </div>

 
      {properties.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((p) => (
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
                <h2 className="font-bold text-lg text-primary mb-1">{p.propertyName}</h2>
                <p className="text-sm text-gray-400">{p.location}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Category: <span className="text-gray-300">{p.category}</span>
                </p>
                <p className="text-xl font-semibold text-green-400 mt-2">
                  ৳ {p.price?.toLocaleString?.() || p.price}
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
      )}
    </div>
  );
}
