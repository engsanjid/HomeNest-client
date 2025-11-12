import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

export default function MyProperties() {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:5000/my-properties/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/property/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Deleted!", "Property has been removed.", "success");
              setProperties((prev) => prev.filter((p) => p._id !== id));
            }
          })
          .catch(() =>
            Swal.fire("Error!", "Failed to delete property.", "error")
          );
      }
    });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        My Properties
      </h2>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <div
              key={p._id}
              className="card bg-base-100 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
            >
              <figure>
                <img
                  src={p.image || "https://via.placeholder.com/400"}
                  alt={p.propertyName}
                  className="h-48 w-full object-cover rounded-t-lg"
                />
              </figure>
              <div className="card-body">
                <h3 className="font-semibold text-lg ">
                  {p.propertyName}
                </h3>
                <p className="text-sm text-gray-600">{p.location}</p>
                <p className="text-sm text-gray-500">Category: {p.category}</p>
                <p className="font-bold text-primary text-lg">
                  ৳ {p.price?.toLocaleString?.() || p.price}
                </p>

              
                <p className="text-xs text-gray-400 mt-1">
                  Posted:{" "}
                  {p.createdAt
                    ? new Date(p.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      (window.location.href = `/update-property/${p._id}`)
                    }
                    className="btn btn-outline btn-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() =>
                      (window.location.href = `/details/${p._id}`)
                    }
                    className="btn btn-primary btn-sm"
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
