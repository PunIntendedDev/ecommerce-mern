import { useState } from "react";
import axios from "axios";
import API_URL from '../config';
import { useNavigate } from "react-router-dom";

function Admin() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    
    const validEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    
    if (adminEmail === validEmail && adminPassword === validPassword) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid admin credentials");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminEmail("");
    setAdminPassword("");
  };

  const addProduct = async () => {
    try {
      setLoading(true);
      
      await axios.post(
        `${API_URL}/api/products/add`,
        {
          title,
          description,
          price,
          image
        }
      );

      alert("Product added successfully!");
      
      setTitle("");
      setDescription("");
      setPrice("");
      setImage("");
      
    } catch (err) {
      console.error("Error adding product:", err);
      alert(err.response?.data?.error || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 shadow rounded w-96">
          <h1 className="text-3xl font-bold text-center mb-2">MyStore</h1>
          <h2 className="text-xl mb-6 text-center text-gray-600">Admin Login</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleAdminLogin}>
            <input
              type="email"
              className="border p-2 w-full mb-4 rounded"
              placeholder="Admin Email"
              value={adminEmail}
              onChange={e => setAdminEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="border p-2 w-full mb-4 rounded"
              placeholder="Admin Password"
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>
          
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-blue-600 hover:text-blue-800 text-sm w-full text-center"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-900 text-white p-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">MyStore Admin</h1>
          <div className="flex gap-2">
            <a
              href={`${API_URL}/api/products`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
            >
              View Products
            </a>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="p-8 max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          
          <input
            className="border p-3 w-full mb-4 rounded"
            placeholder="Product Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={loading}
          />

          <input
            className="border p-3 w-full mb-4 rounded"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={loading}
          />

          <input
            type="number"
            className="border p-3 w-full mb-4 rounded"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            disabled={loading}
          />

          <input
            className="border p-3 w-full mb-4 rounded"
            placeholder="Image URL"
            value={image}
            onChange={e => setImage(e.target.value)}
            disabled={loading}
          />

          <button
            onClick={addProduct}
            disabled={loading}
            className={`w-full px-6 py-3 rounded text-white transition-colors ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admin;