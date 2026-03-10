import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  // Calculate total safely
  const calculateTotal = () => {
    if (!cart || cart.length === 0) return 0;
    
    return cart.reduce((sum, item) => {
      const price = Number(item.productId?.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return sum + (price * quantity);
    }, 0);
  };

  const total = calculateTotal();

  return (
    <>
      <Navbar />

      <div className="p-8">
        <h1 className="text-2xl mb-6">Cart</h1>

        {(!cart || cart.length === 0) && (
          <p className="text-gray-600">Your cart is empty.</p>
        )}

        {cart && cart.map((item) => (
          <div
            key={item._id}
            className="border p-4 mb-3 flex justify-between items-center rounded"
          >
            <div className="flex items-center gap-4">
              {/* Optional: Show product image if available */}
              {item.productId?.image && (
                <img 
                  src={item.productId.image} 
                  alt={item.productId.title}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              
              <div>
                <p className="font-bold">{item.productId?.title || 'Product'}</p>
                <p>Price: ${Number(item.productId?.price || 0).toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <p className="font-semibold text-blue-600">
                  Subtotal: ${(Number(item.productId?.price || 0) * Number(item.quantity || 0)).toFixed(2)}
                </p>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.productId?._id || item._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}

        {/* Show total if cart has items */}
        {cart && cart.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center text-xl">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-blue-600">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;