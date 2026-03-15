import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import API_URL from "../config";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    console.log("Login attempt with:", { email, password });
    
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/signin`,
        { email, password }
      );
      
      console.log("Login response:", res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/products");
    } catch (err) {
      console.error("Login error:", err);
      console.error("Error response:", err.response?.data);
      
      if (err.response?.status === 400) {
        setError(err.response?.data || "Invalid email or password");
      } else {
        setError("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const googleSuccess = async (res) => {
    try {
      const result = await axios.post(
        `${API_URL}/api/auth/google`,
        { token: res.credential }
      );
      localStorage.setItem("token", result.data.token);
      navigate("/products");
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <Link 
        to="/" 
        className="self-start ml-8 mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-1"
      >
        <span>←</span> Back to Home
      </Link>

      <form onSubmit={handleLogin} className="bg-white p-8 shadow rounded w-96">
        <h2 className="text-2xl mb-6 font-bold">Sign In</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <input
          className="border p-2 w-full mb-4"
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading} 
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading} 
        />

        <button 
          type="submit"
          disabled={loading} 
          className={`w-full py-2 rounded mb-4 text-white ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex justify-center">
          <GoogleLogin onSuccess={googleSuccess} onError={() => setError("Google login failed")} />
        </div>
      </form>
    </div>
  );
}

export default SignIn;