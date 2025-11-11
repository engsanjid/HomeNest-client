const BASE = import.meta.env.VITE_API_URL;



//  Get All Properties
export async function getProperties() {
  const res = await fetch(`${BASE}/properties`);
  return res.json();
}

//  Get Single Property
export async function getPropertyById(id) {
  const res = await fetch(`${BASE}/properties/${id}`);
  return res.json();
}

//  Add Property
export async function addProperty(data) {
  const res = await fetch(`${BASE}/properties`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

//  Update Property
export async function updateProperty(id, data) {
  const res = await fetch(`${BASE}/properties/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

//  Delete Property
export async function deleteProperty(id) {
  const res = await fetch(`${BASE}/properties/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
