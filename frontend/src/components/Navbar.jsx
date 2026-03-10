import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { cart, logout } = useContext(CartContext);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    logout(); 
    navigate("/signin"); 
  };

  return (
    <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold hover:text-gray-300">
        MyStore
      </Link>

      <div className="flex items-center space-x-6">
        <Link to="/products" className="hover:text-gray-300">
          Products
        </Link>

        <Link to="/cart" className="hover:text-gray-300 relative">
          Cart
          {cart && cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-blue-500 text-xs rounded-full px-1.5 py-0.5">
              {cart.length}
            </span>
          )}
        </Link>

        {isLoggedIn && (
          <Link to="/admin" className="hover:text-gray-300">
            Admin
          </Link>
        )}

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/signin" className="hover:text-gray-300">
              Sign In
            </Link>
            <Link to="/signup" className="hover:text-gray-300">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;