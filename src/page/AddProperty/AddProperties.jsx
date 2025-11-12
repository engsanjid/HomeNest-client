import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

export default function AddProperties() {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const setForm = {
      propertyName: e.target.name.value,
      category: e.target.category.value,
      price: e.target.price.value,
      location: e.target.location.value,
      image: e.target.image.value,
      description: e.target.description.value,
      postedBy: user?.email || "Guest User",
    };
fetch('http://localhost:5000/all-properties',{
  method:"POST",
  headers:{
    "Content-Type":"application/json",
  },
  body:JSON.stringify(setForm)
})
.then(res=>res.json())
.then(data=>{
  console.log(data)
}) 
.catch(err=>{
  console.log(err)
})
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Property</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="propertyName" placeholder="Property Name" className="input input-bordered w-full" />
        <input name="category" placeholder="Category" className="input input-bordered w-full" />
        <input name="price" placeholder="Price" className="input input-bordered w-full" />
        <input name="location" placeholder="Location" className="input input-bordered w-full" />
        <input name="image" placeholder="Image URL" className="input input-bordered w-full" />
        <textarea name="description" placeholder="Description" className="textarea textarea-bordered w-full"></textarea>
        <button type="submit" className="btn btn-primary w-full">Add Property</button>
      </form>
    </div>
  );
}
