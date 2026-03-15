import { createContext, useState, useEffect } from "react";
import axios from "axios";
import API_URL from '../config';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const getToken = () => localStorage.getItem("token");

  const getAuthHeaders = () => {
    const token = getToken();
    return {
      headers: {
        Authorization: token
      }
    };
  };

  const fetchCart = async () => {
    const token = getToken();
    if (!token) {
      setCart([]);
      return;
    }

    try {
      setLoading(true);
      console.log("Fetching cart...");
      const response = await axios.get(
        `${API_URL}/api/cart`,
        getAuthHeaders()
      );
      console.log("Cart fetched:", response.data);
      setCart(response.data);
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); 
    setCart([]); 
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    const token = getToken();
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      console.log("Adding to cart:", product);
      const response = await axios.post(
        `${API_URL}/api/cart/add`,
        { productId: product._id },
        getAuthHeaders()
      );
      setCart(response.data);
      console.log("Cart updated:", response.data);
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
      alert(err.response?.data || "Error adding to cart");
    }
  };

  const removeFromCart = async (productId) => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await axios.post(
        `${API_URL}/api/cart/remove`,
        { productId },
        getAuthHeaders()
      );
      setCart(response.data);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const clearCart = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await axios.post(
        `${API_URL}/api/cart/clear`,
        {},
        getAuthHeaders()
      );
      setCart(response.data);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      loading,
      addToCart,
      removeFromCart,
      clearCart,
      fetchCart, 
      logout 
    }}>
      {children}
    </CartContext.Provider>
  );
};