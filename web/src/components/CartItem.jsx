import React from "react";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";

export default function CartItem({ item, onQtyChange, onRemove }) {
  return (
    <div className="flex items-center bg-white rounded-2xl shadow-sm px-6 py-5 mb-4 gap-4">
      <img
        src={item.img}
        alt={item.name}
        className="w-16 h-14 object-contain rounded-xl bg-gray-50 flex-shrink-0"
      />
      <div className="flex flex-col justify-center min-w-[120px] flex-1">
        <span className="font-semibold text-base text-gray-800">
          {item.name}
          {item.isFree && (
            <span className="ml-2 text-xs text-green-600 font-medium">
              (Free Offer)
            </span>
          )}
        </span>
        <span className="text-gray-400 text-xs mt-1">
          Product code: {item.code || item.id || "0939JOE3"}
        </span>
      </div>
      <div className="flex-1 flex flex-col items-end">
        {!item.isFree && (
          <div className="flex items-center gap-2 mb-1">
            <button
              type="button"
              className="bg-gray-200 rounded-full p-1.5 text-red-500 hover:bg-red-100 transition"
              onClick={() => onQtyChange(item.qty - 1)}
              disabled={item.qty <= 1}
            >
              <FiMinus size={16} />
            </button>
            <span className="text-base font-bold px-2 text-gray-700">
              {item.qty}
            </span>
            <button
              type="button"
              className="bg-gray-200 rounded-full p-1.5 text-green-600 hover:bg-green-100 transition"
              onClick={() => onQtyChange(item.qty + 1)}
              disabled={item.qty >= item.available}
            >
              <FiPlus size={16} />
            </button>
          </div>
        )}
        {!item.isFree && item.available - item.qty < 5 && (
          <span className="px-3 py-1 text-xs rounded-xl bg-orange-100 text-orange-600 font-semibold inline-block">
            Only {item.available - item.qty} left
          </span>
        )}
      </div>
      <div className="font-semibold text-gray-700 w-20 text-right">
        £{(parseFloat(item.price.replace(/[^\d.]/g, "")) * item.qty).toFixed(2)}
      </div>
      <button
        className="ml-4 text-gray-400 hover:text-green-500 rounded-full transition p-1.5 bg-gray-100"
        onClick={onRemove}
      >
        <FiX size={22} />
      </button>
    </div>
  );
}