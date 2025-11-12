import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

export default function AddProperty() {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const newProperty = {
      propertyName: form.propertyName.value,
      description: form.description.value,
      category: form.category.value,
      price: parseFloat(form.price.value),
      location: form.location.value,
      image: form.image.value,
      userName: user?.displayName || "Anonymous",
      userEmail: user?.email || "Unknown",
      postedBy: user?.email || "Guest",
      createdAt: new Date(),
    };

   
    fetch("http://localhost:5000/all-properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProperty),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "Success!",
            text: "Property added successfully ....",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          form.reset(); 
        } else {
          Swal.fire("Error!", "Something went wrong ", "error");
        }
      })
      .catch(() => {
        Swal.fire("Error!", "Server not responding ", "error");
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-base-200 rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
         Add New Property
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      
        <div>
          <label className="label">Property Name</label>
          <input
            type="text"
            name="propertyName"
            placeholder="Enter property name"
            required
            className="input input-bordered w-full"
          />
        </div>

     
        <div>
          <label className="label">Description</label>
          <textarea
            name="description"
            placeholder="Write short details..."
            required
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

       
        <div>
          <label className="label">Category</label>
          <select name="category" className="select select-bordered w-full" required>
            <option value="">Select category</option>
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>
        </div>
    
        <div>
          <label className="label">Price</label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            required
            className="input input-bordered w-full"
          />
        </div>

 
        <div>
          <label className="label">Location</label>
          <input
            type="text"
            name="location"
            placeholder="e.g. Gulshan, Dhaka"
            required
            className="input input-bordered w-full"
          />
        </div>
 
        <div>
          <label className="label">Image URL</label>
          <input
            type="url"
            name="image"
            placeholder="https://example.com/photo.jpg"
            required
            className="input input-bordered w-full"
          />
        </div>

  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">User Name</label>
            <input
              type="text"
              value={user?.displayName || "Unknown User"}
              readOnly
              className="input input-bordered w-full "
            />
          </div>
          <div>
            <label className="label">User Email</label>
            <input
              type="email"
              value={user?.email || "Not Available"}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
        </div>

   
        <button
          type="submit"
          className="btn btn-primary w-full mt-3"
        >
          Add Property
        </button>
      </form>
    </div>
  );
}
