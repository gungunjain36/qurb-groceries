import React from "react";
import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";
import { useFavorites } from "../context/FavouritesContext";
import { useProducts } from "../context/ProductContext";
import Layout from "../components/Layout";

export default function Checkout() {
  const { cart, updateQty, removeFromCart, subtotal, discount, total } = useCart();
  const { favIds } = useFavorites();
  const { products } = useProducts();

  return (
    <Layout
      favIds={favIds}
      searchBar={
        <div className="flex items-center relative max-w-xl w-full">
          <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                fill="currentColor"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-8 sm:pl-10 pr-10 sm:pr-12 py-2 rounded-xl bg-white border border-gray-200 text-sm sm:text-base focus:border-gray-300 outline-none transition shadow-sm"
          />
        </div>
      }
    >
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>
        {cart.length === 0 ? (
          <div className="text-center text-gray-400 py-8">Your cart is empty.</div>
        ) : (
          <>
            <div>
              {cart.map((item) => {
                const product = products.find((p) => p.id === item.id);
                const available = product ? product.available : 0;
                return (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQtyChange={(qty) => updateQty(item.id, qty)}
                    onRemove={() => removeFromCart(item.id)}
                    available={available}
                  />
                );
              })}
            </div>
            <div className="w-full max-w-md mx-auto border-t border-gray-200 mt-8">
              <div className="flex items-center py-4">
                <div className="flex-1 text-gray-500 font-semibold text-sm">Subtotal</div>
                <div className="w-20 text-right font-medium text-gray-700 text-sm">
                  £{subtotal.toFixed(2)}
                </div>
              </div>
              <div className="flex items-center py-4 border-t border-gray-100">
                <div className="flex-1 text-gray-500 font-semibold text-sm">Discount</div>
                <div className="w-20 text-right font-medium text-gray-700 text-sm">
                  £{discount.toFixed(2)}
                </div>
              </div>
              <div className="flex items-center py-4 border-t border-gray-100">
                <div className="flex-1 font-bold text-gray-800 text-base">Total</div>
                <div className="flex items-center gap-6">
                  <div className="w-20 text-right font-bold text-base text-gray-800">
                    £{total.toFixed(2)}
                  </div>
                  <button
                    className="px-6 py-2 bg-green-400 text-white font-bold rounded-md hover:bg-green-500 transition"
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