import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; // Import Navbar

function Admin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const addProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      
      await axios.post(
        "http://localhost:5000/api/products/add",
        {
          title,
          description,
          price,
          image
        },
        {
          headers: {
            Authorization: token // Send token for authentication
          }
        }
      );

      alert("Product added successfully!");
      
      // Clear form
      setTitle("");
      setDescription("");
      setPrice("");
      setImage("");
      
    } catch (err) {
      console.error("Error adding product:", err);
      alert(err.response?.data?.error || "Error adding product");
    }
  };

  return (
    <>
      <Navbar /> {/* Add Navbar here */}
      
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
        
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          
          <input
            className="border p-3 w-full mb-4 rounded"
            placeholder="Product Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <input
            className="border p-3 w-full mb-4 rounded"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <input
            type="number"
            className="border p-3 w-full mb-4 rounded"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />

          <input
            className="border p-3 w-full mb-4 rounded"
            placeholder="Image URL"
            value={image}
            onChange={e => setImage(e.target.value)}
          />

          <button
            onClick={addProduct}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-colors w-full"
          >
            Add Product
          </button>
        </div>

        {/* Optional: Add a preview section */}
        {title && description && price && image && (
          <div className="mt-8 bg-gray-100 p-6 rounded">
            <h3 className="text-lg font-semibold mb-2">Preview:</h3>
            <div className="border rounded-lg shadow p-4 bg-white">
              <img
                src={image}
                alt={title}
                className="h-40 w-full object-cover rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x200?text=Invalid+Image+URL";
                }}
              />
              <h4 className="font-bold mt-2">{title}</h4>
              <p className="text-gray-600">{description}</p>
              <p className="font-semibold mt-1">${price}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Admin;