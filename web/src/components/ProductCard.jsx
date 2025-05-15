import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const stock = product.stock || 10; // Default stock for demo

  return (
    <div className="p-4 bg-white rounded shadow">
      <img src={product.image} alt={product.name} className="w-full h-32 object-contain mb-2" />
      <h3 className="text-lg font-medium">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span
          className={`text-sm ${
            stock >= 10 ? 'text-green-500' : 'text-orange-500'
          }`}
        >
          {stock >= 10 ? 'Available' : `Only ${stock} left`}
        </span>
        <span className="text-lg font-semibold">£{product.price.toFixed(2)}</span>
      </div>
      <button
        onClick={() => addToCart(product)}
        disabled={stock === 0}
        className={`w-full mt-2 py-2 rounded ${
          stock === 0 ? 'bg-gray-300' : 'bg-green-500 text-white'
        }`}
      >
        Add to Cart
      </button>
    </div>
  );
}