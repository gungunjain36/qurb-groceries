import React from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import SearchBar from "./SearchBar";
import useCart from "../hooks/useCart";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const { cart } = useCart();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 md:p-8">
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow px-4 md:px-10 py-8 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center font-extrabold text-lg md:text-xl mr-2 cursor-pointer" onClick={() => navigate("/")}>GROCERIES</div>
          {/* Modular search is only shown on product page. Use <SearchBar> if passed as a prop. Otherwise blank. */}
          <div className="flex-1 flex items-center relative max-w-xl md:mx-6">
            {/* Filled by page if needed */}
          </div>
          <div className="flex items-center justify-end gap-5 md:min-w-[196px] ml-auto">
            <div className="relative group">
              <FiHeart size={26} className="text-gray-400 cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">3</span>
            </div>
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white drop-shadow-md object-cover"
              />
            </div>
            <div className="relative group">
              <button onClick={() => navigate("/checkout")}>
                <FiShoppingCart size={26} className="text-gray-400 hover:text-black cursor-pointer" />
                <span className="absolute -top-1 -right-1 bg-blue-400 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">{cart.length}</span>
              </button>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
