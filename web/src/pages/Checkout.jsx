import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";
import Layout from "../components/Layout";

export default function Checkout() {
  const { cart, appliedOffers, updateQty, removeFromCart, subtotal, discount, total } = useCart();
  const navigate = useNavigate();

  // Debug: Log the cart and applied offers
  console.log("Checkout - Cart:", cart);
  console.log("Checkout - Applied Offers:", appliedOffers);

  return (
    <Layout>
      <div className="mt-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FiArrowLeft size={20} className="mr-2" />
          <span className="text-sm font-medium">Back to Groceries</span>
        </button>
        <h2 className="text-2xl font-bold text-gray-700 mb-8">Checkout</h2>
        {cart.length === 0 ? (
          <div className="text-center text-gray-400 py-12">Your cart is empty.</div>
        ) : (
          <>
            {/* Offer Notification Banner */}
            {appliedOffers.length > 0 ? (
              <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                <p className="font-semibold">Offers Applied!</p>
                {appliedOffers.map((offer, index) => (
                  <p key={index} className="text-sm">
                    {offer.description}
                  </p>
                ))}
              </div>
            ) : (
              <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
                <p className="text-sm">No offers applied. Add 6 Coca-Cola cans to get 1 free!</p>
              </div>
            )}
            {/* Cart items */}
            <div>
              {cart.map((item) => (
                <CartItem
                  key={item.id + (item.isFree ? "-free" : "")}
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
                <div className="text-right font-medium text-gray-700">
                  £{subtotal.toFixed(2)}
                </div>
              </div>
              {appliedOffers.length > 0 && (
                <div className="py-5 border-t border-gray-100">
                  <div className="flex-1 text-gray-500 font-semibold">Offers Applied</div>
                  {appliedOffers.map((offer, index) => (
                    <div key={index} className="flex items-center py-2">
                      <div className="flex-1 text-gray-600 text-sm">
                        {offer.description}
                      </div>
                      <div className="text-right font-medium text-green-600 text-sm">
                        -£{offer.discount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center py-5 border-t border-gray-100">
                <div className="flex-1 text-gray-500 font-semibold">Discount</div>
                <div className="text-right font-medium text-gray-700">
                  £{discount.toFixed(2)}
                </div>
              </div>
              <div className="flex items-center py-5 border-t border-gray-100">
                <div className="flex-1 font-bold text-gray-800 text-lg">Total</div>
                <div className="text-right font-bold text-lg text-gray-800">
                  £{total.toFixed(2)}
                </div>
                <button className="ml-6 px-6 py-2 bg-green-400 text-white font-bold rounded-md hover:bg-green-500 transition">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}