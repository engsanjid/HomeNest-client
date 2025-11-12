import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

export default function MyProperties() {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchData = async () => {
      try {
        const token = await user.getIdToken(); // ✅ Firebase token আনো
        const res = await fetch(`http://localhost:5000/my-properties/${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ token পাঠানো হচ্ছে
          },
        });

        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error(error);
        Swal.fire("Error!", "Failed to load your properties.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = await user.getIdToken(); // ✅ token আনো
        const res = await fetch(`http://localhost:5000/property/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ token পাঠানো হচ্ছে
          },
        });

        const data = await res.json();
        if (data.success) {
          Swal.fire("Deleted!", "Property has been removed.", "success");
          setProperties((prev) => prev.filter((p) => p._id !== id));
        } else {
          Swal.fire("Error!", "Failed to delete property.", "error");
        }
      } catch {
        Swal.fire("Error!", "Server not responding.", "error");
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-center text-primary mb-8">
        My Properties
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          You haven’t added any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((p) => (
            <div
              key={p._id}
              className="bg-base-100 border border-gray-700/30 rounded-2xl overflow-hidden shadow-md hover:shadow-[0_8px_25px_rgba(138,180,255,0.25)] transform transition-all duration-300 ease-in-out hover:-translate-y-2"
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
                <h3 className="font-semibold text-lg text-primary mb-1">
                  {p.propertyName}
                </h3>
                <p className="text-sm text-gray-400">{p.location}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Category: <span className="text-gray-300">{p.category}</span>
                </p>
                <p className="text-lg font-semibold text-green-400 mt-2">
                  ৳ {p.price?.toLocaleString?.() || p.price}
                </p>

                <div className="flex justify-between items-center mt-5">
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="btn btn-error btn-sm text-white hover:opacity-90"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      (window.location.href = `/update-property/${p._id}`)
                    }
                    className="btn btn-outline btn-sm border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    Update
                  </button>
                  <button
                    onClick={() =>
                      (window.location.href = `/details/${p._id}`)
                    }
                    className="btn btn-outline btn-sm border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
