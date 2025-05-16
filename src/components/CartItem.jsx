import React from "react";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";

export default function CartItem({ item, onQtyChange, onRemove, available = 0 }) {
  const isMaxQuantity = item.qty >= available;

  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md p-4 gap-4 items-center sm:items-center w-full mb-4">
      <img
        src={item.img}
        alt={item.name}
        className="w-full sm:w-24 h-24 object-contain rounded-lg bg-gray-100 flex-shrink-0"
      />
      <div className="flex-1 min-w-0 flex flex-col h-full w-full">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-gray-800">
              {item.name}
            </span>
            <span className="text-gray-500 text-xs">
              Product code: {item.id}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onQtyChange(item.qty - 1)}
                  className="p-1 rounded-full bg-red-400 text-white"
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={item.qty <= 1}
                >
                  <FiMinus size={14} aria-hidden="true" />
                </button>
                <span className="w-6 text-center font-medium text-sm">
                  {item.qty}
                </span>
                <button
                  onClick={() => onQtyChange(item.qty + 1)}
                  className={`p-1 rounded-full bg-green-400 text-white ${
                    isMaxQuantity ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isMaxQuantity}
                  type="button"
                  aria-label="Increase quantity"
                >
                  <FiPlus size={14} aria-hidden="true" />
                </button>
              </div>
              {available <= 5 && (
                <div className="mt-2">
                  <span className="inline-block px-1 py-0.5 text-[10px] rounded-full bg-orange-300 text-white font-medium">
                    Only {available} left
                  </span>
                </div>
              )}
            </div>
            <span className="text-gray-800 font-bold text-sm ml-auto">
              £{(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.qty).toFixed(2)}
            </span>
            <button
              onClick={() => onRemove(item.id)}
              className="p-1 rounded-full bg-red-400 text-white"
              type="button"
              aria-label="Remove item from cart"
            >
              <FiX size={14} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}