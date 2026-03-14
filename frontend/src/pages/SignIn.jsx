import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext"; 
import { GoogleLogin } from "@react-oauth/google";
import API_URL from '../config';

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { fetchCart } = useContext(CartContext); 

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${API_URL}/api/cart/auth/signin`,
      { email, password }
    );

    localStorage.setItem("token", res.data.token);
    await fetchCart(); 
    navigate("/products");
  };

  const googleSuccess = async (res) => {
    const result = await axios.post(
      `${API_URL}/api/cart/auth/google`,
      { token: res.credential }
    );

    localStorage.setItem("token", result.data.token);
    await fetchCart(); 
    navigate("/products");
  };

  return(

    <div className="flex flex-col items-center mt-20">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 shadow rounded w-96"
      >

        <h2 className="text-2xl mb-6 font-bold">Sign In</h2>

        <input
          className="border p-2 w-full mb-4"
          placeholder="Email"
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          onChange={e=>setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white w-full py-2 rounded mb-4">
          Login
        </button>

        <div className="flex justify-center">
          <GoogleLogin onSuccess={googleSuccess}/>
        </div>

      </form>

    </div>

  );
}

export default SignIn;