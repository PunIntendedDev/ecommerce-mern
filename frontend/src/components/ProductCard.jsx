function ProductCard({product,addToCart}){

  return(

    <div className="border rounded-lg shadow p-4">

      <img
        src={product.image}
        className="h-40 w-full object-cover rounded"
      />

      <h2 className="font-bold mt-2">{product.title}</h2>

      <p className="text-gray-600">{product.description}</p>

      <p className="font-semibold mt-1">${product.price}</p>

      <button
        onClick={()=>addToCart(product)}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Add to Cart
      </button>

    </div>

  );

}

export default ProductCard;