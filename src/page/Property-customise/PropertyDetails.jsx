import React from "react";
import { useLoaderData } from "react-router-dom";

export default function PropertyDetails() {
  const data = useLoaderData();
  const property=data.result;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={property.image || "https://via.placeholder.com/800"}
        alt={property.propertyName}
        className="w-full h-80 object-cover rounded"
      />
      <h2 className="text-3xl font-bold mt-4">{property.propertyName}</h2>
      <p className="text-gray-500">{property.location}</p>
      <p className="font-semibold text-xl mt-2 text-green-600">${property.price}</p>
      <p className="mt-4">{property.description}</p>

      <div className="mt-6 border-t pt-4 text-sm text-gray-400">
        <p> Posted on: {new Date(property.createdAt).toLocaleDateString()}</p>
        <p> Posted by: {property.postedBy || "Unknown"}</p>
      </div>
    </div>
  );
}
