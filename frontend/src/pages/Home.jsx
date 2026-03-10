import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-gray-900 text-white flex justify-between p-4">
        <h1 className="text-xl font-bold">MyStore</h1>

        <div className="space-x-4">
          <Link to="/signin" className="hover:underline">Sign In</Link>
          <Link to="/signup" className="hover:underline">Sign Up</Link>
        </div>
      </div>

      <div className="flex flex-col items-center mt-20 text-center">

        <h1 className="text-5xl font-bold mb-6">
          Welcome to MyStore
        </h1>

        <p className="text-lg text-gray-600 max-w-xl">
          MyStore is an online platform where you can explore a variety
          of products at affordable prices. Sign in to start shopping
          and add items to your cart.
        </p>

        <Link
          to="/signin"
          className="mt-8 bg-blue-600 text-white px-6 py-3 rounded"
        >
          Start Shopping
        </Link>

      </div>

    </div>
  );
}

export default Home;