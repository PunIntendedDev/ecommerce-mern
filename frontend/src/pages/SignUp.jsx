import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; 
import API_URL from '../config';

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(`${API_URL}/api/auth/signup`, {
        name,
        email,
        password
      });

      alert("Account created successfully!");
      navigate("/signin");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data || "Error creating account");
    } finally {
      setLoading(false);
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

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow rounded w-96"
      >
        <h2 className="text-2xl mb-6 font-bold">Sign Up</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <input
          className="border p-2 w-full mb-4"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          disabled={loading}
        />

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
          className={`w-full py-2 rounded text-white ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;