import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from '../config';

function SignUp() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${API_URL}/api/auth/signup`,{
      name,
      email,
      password
    });

    alert("Account created");

    navigate("/signin");
  };

  return (

    <div className="flex justify-center mt-20">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow rounded w-96"
      >

        <h2 className="text-2xl mb-6 font-bold">Sign Up</h2>

        <input
          className="border p-2 w-full mb-4"
          placeholder="Name"
          onChange={e=>setName(e.target.value)}
        />

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

        <button
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Create Account
        </button>

      </form>

    </div>
  );
}

export default SignUp;