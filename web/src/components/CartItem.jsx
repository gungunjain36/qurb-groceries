import { useCart } from '../context/CartContext.jsx';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center p-4 bg-white rounded shadow">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-contain mr-4" />
      <div className="flex-1">
        <h3 className="text-lg font-medium">
          {item.name} {item.isFree && <span className="text-sm italic">(Free)</span>}
        </h3>
        <p className="text-sm text-gray-500">Product code: {item.id}</p>
        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={() => updateQuantity(item.id, -1)}
            className="w-8 h-8 bg-red-500 text-white rounded"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, 1)}
            className="w-8 h-8 bg-green-500 text-white rounded"
          >
            +
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-lg font-semibold">
          £{(item.price * item.quantity).toFixed(2)}
        </span>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-red-500"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}