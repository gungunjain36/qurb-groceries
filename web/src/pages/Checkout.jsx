import React from "react";
import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";

export default function Checkout() {
  const { cart, updateQty, removeFromCart, subtotal, discount, total } = useCart();
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-700 mb-8">Checkout</h2>
      {cart.length === 0 ? (
        <div className="text-center text-gray-400 py-12">Your cart is empty.</div>
      ) : (
        <>
          {/* Cart items */}
          <div>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQtyChange={(qty) => updateQty(item.id, qty)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </div>
          {/* Order summary */}
          <div className="border-t border-gray-200 mt-12">
            <div className="flex items-center py-5">
              <div className="flex-1 text-gray-500 font-semibold">Subtotal</div>
              <div className="text-right font-medium text-gray-700">£{subtotal.toFixed(2)}</div>
            </div>
            <div className="flex items-center py-5 border-t border-gray-100">
              <div className="flex-1 text-gray-500 font-semibold">Discount</div>
              <div className="text-right font-medium text-gray-700">£{discount.toFixed(2)}</div>
            </div>
            <div className="flex items-center py-5 border-t border-gray-100">
              <div className="flex-1 font-bold text-gray-800 text-lg">Total</div>
              <div className="text-right font-bold text-lg text-gray-800">£{total.toFixed(2)}</div>
              <button className="ml-6 px-6 py-2 bg-green-400 text-white font-bold rounded-md hover:bg-green-500 transition">Checkout</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
