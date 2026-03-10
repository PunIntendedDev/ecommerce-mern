import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";

function Checkout(){

  const {cart} = useContext(CartContext);

  const total = cart.reduce(
    (sum,item)=> sum + item.price * item.quantity,0
  );

  return(

    <>
    <Navbar/>

    <div className="p-8">

      <h1 className="text-2xl mb-6">Checkout</h1>

      {cart.map(item=>(
        <p key={item._id}>
          {item.title} x {item.quantity}
        </p>
      ))}

      <h2 className="mt-6 text-xl font-bold">
        Total: ${total}
      </h2>

      <p className="mt-4">
        Payment Method: Cash on Delivery
      </p>

      <button className="mt-6 bg-green-600 text-white px-6 py-2 rounded">
        Place Order
      </button>

    </div>
    </>

  );
}

export default Checkout;