import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function UpdateProperty() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const property = data?.result || data; 
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      propertyName: form.propertyName.value,
      description: form.description.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      location: form.location.value,
      image: form.image.value,
    };

    fetch(`http://localhost:5000/property/${property._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: " Updated!",
            text: "Your property has been updated successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          navigate(`/details/${property._id}`);
        } else {
          Swal.fire("Error!", "Update failed.", "error");
        }
      })
      .catch(() =>
        Swal.fire("Error!", "Server error, please try again later.", "error")
      );
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-base-200 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center">
        ✏️ Update Property
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
   
        <div>
          <label className="label">Property Name</label>
          <input
            name="propertyName"
            defaultValue={property.propertyName}
            className="input input-bordered w-full"
            placeholder="Property Name"
            required
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            name="description"
            defaultValue={property.description}
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            required
          ></textarea>
        </div>

        <div>
          <label className="label">Category</label>
          <select
            name="category"
            defaultValue={property.category}
            className="select select-bordered w-full"
            required
          >
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>
        </div>

        <div>
          <label className="label">Price</label>
          <input
            name="price"
            type="number"
            defaultValue={property.price}
            className="input input-bordered w-full"
            placeholder="Price"
            required
          />
        </div>

        <div>
          <label className="label">Location</label>
          <input
            name="location"
            defaultValue={property.location}
            className="input input-bordered w-full"
            placeholder="Location"
            required
          />
        </div>

        <div>
          <label className="label">Image URL</label>
          <input
            name="image"
            defaultValue={property.image}
            className="input input-bordered w-full"
            placeholder="Image URL"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">User Name</label>
            <input
              type="text"
              value={property.userName || "Unknown"}
              readOnly
              className="input input-bordered w-full "
            />
          </div>

          <div>
            <label className="label">User Email</label>
            <input
              type="email"
              value={property.userEmail || "Unknown"}
              readOnly
              className="input input-bordered w-full "
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4">
          Update Property
        </button>
      </form>
    </div>
  );
}
