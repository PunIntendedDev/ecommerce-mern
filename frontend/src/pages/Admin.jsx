import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; 
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

  useEffect(() => {
    const adminAuth = localStorage.getItem("isAdmin");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    
    const validEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const validPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    
    if (adminEmail === validEmail && adminPassword === validPassword) {
      localStorage.setItem("isAdmin", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid admin credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAuthenticated(false);
    setAdminEmail("");
    setAdminPassword("");
  };

  const addProduct = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      await axios.post(
        `${API_URL}/api/products/add`,
        {
          title,
          description,
          price,
          image
        },
        {
          headers: {
            Authorization: token 
          }
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
      <>
        <Navbar />
        <div className="flex justify-center mt-20">
          <form onSubmit={handleAdminLogin} className="bg-white p-8 shadow rounded w-96">
            <h2 className="text-2xl mb-6 font-bold">Admin Login</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <input
              type="email"
              className="border p-2 w-full mb-4"
              placeholder="Admin Email"
              value={adminEmail}
              onChange={e => setAdminEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="border p-2 w-full mb-4"
              placeholder="Admin Password"
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
            >
              Login as Admin
            </button>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <div className="p-8 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        
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