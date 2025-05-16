import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";
import { useFavorites } from "../context/FavouritesContext";
import { useProducts } from "../context/ProductContext"; // Import useProducts
import Layout from "../components/Layout";

export default function Checkout() {
  const { cart, appliedOffers, updateQty, removeFromCart, subtotal, discount, total } = useCart();
  const { favIds } = useFavorites();
  const { products } = useProducts(); // Get products to access stock
  const navigate = useNavigate();

  // Debug: Log the cart and applied offers
  console.log("Checkout - Cart:", cart);
  console.log("Checkout - Applied Offers:", appliedOffers);

  return (
    <Layout favIds={favIds}>
      <div className="mt-4 sm:mt-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-3 sm:mb-4"
          type="button"
          aria-label="Back to groceries"
        >
          <FiArrowLeft size={18} className="mr-2" aria-hidden="true" />
          <span className="text-sm font-medium">Back to Groceries</span>
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-6 sm:mb-8">Checkout</h2>
        {cart.length === 0 ? (
          <div className="text-center text-gray-400 py-8 sm:py-12">Your cart is empty.</div>
        ) : (
          <>
            {/* Offer Notification Banner */}
            {appliedOffers.length > 0 ? (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-100 text-green-800 rounded-lg">
                <p className="font-semibold text-sm sm:text-base">Offers Applied!</p>
                {appliedOffers.map((offer) => (
                  <p key={`offer-${offer.description}`} className="text-xs sm:text-sm">
                    {offer.description}
                  </p>
                ))}
              </div>
            ) : (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-yellow-100 text-yellow-800 rounded-lg">
                <p className="text-xs sm:text-sm">No offers applied. Add 6 Coca-Cola cans to get 1 free!</p>
              </div>
            )}
            {/* Cart items */}
            <div>
              {cart.map((item) => {
                // Find the product in the products array to get its availability
                const product = products.find((p) => p.id === item.id);
                const available = product ? product.available : 0; // Default to 0 if not found
                return (
                  <CartItem
                    key={item.id + (item.isFree ? "-free" : "")}
                    item={item}
                    onQtyChange={(qty) => updateQty(item.id, qty)}
                    onRemove={() => removeFromCart(item.id)}
                    available={available} // Pass available stock to CartItem
                  />
                );
              })}
            </div>
            {/* Order summary */}
            <div className="border-t border-gray-200 mt-8 sm:mt-12">
              <div className="flex items-center py-4 sm:py-5">
                <div className="flex-1 text-gray-500 font-semibold text-sm sm:text-base">Subtotal</div>
                <div className="text-right font-medium text-gray-700 text-sm sm:text-base">
                  £{subtotal.toFixed(2)}
                </div>
              </div>
              {appliedOffers.length > 0 && (
                <div className="py-4 sm:py-5 border-t border-gray-100">
                  <div className="flex-1 text-gray-500 font-semibold text-sm sm:text-base">Offers Applied</div>
                  {appliedOffers.map((offer) => (
                    <div key={`offer-summary-${offer.description}`} className="flex items-center py-2">
                      <div className="flex-1 text-gray-600 text-xs sm:text-sm">
                        {offer.description}
                      </div>
                      <div className="text-right font-medium text-green-600 text-xs sm:text-sm">
                        -£{offer.discount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center py-4 sm:py-5 border-t border-gray-100">
                <div className="flex-1 text-gray-500 font-semibold text-sm sm:text-base">Discount</div>
                <div className="text-right font-medium text-gray-700 text-sm sm:text-base">
                  £{discount.toFixed(2)}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center py-4 sm:py-5 border-t border-gray-100 gap-4 sm:gap-0">
                <div className="flex-1 font-bold text-gray-800 text-base sm:text-lg">Total</div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
                  <div className="text-right font-bold text-base sm:text-lg text-gray-800 order-2 sm:order-1">
                    £{total.toFixed(2)}
                  </div>
                  <button 
                    className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-green-400 text-white font-bold rounded-md hover:bg-green-500 transition order-1 sm:order-2"
                    type="button"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}