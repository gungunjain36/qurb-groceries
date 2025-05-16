import React from "react";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

export default function CartItem({ item, onQtyChange, onRemove, available = 0 }) {
  // Determine the specific offer label for free items
  const getOfferLabel = (item) => {
    if (!item.isFree) return null;
    if (item.name === "Coca-Cola") {
      return "Free Coca-Cola (Buy 6, Get 1 Offer)";
    }
    if (item.name === "Coffee") {
      return "Free Coffee (Buy 3 Croissants Offer)";
    }
    return "Free (Offer)";
  };

  // Check if the increment button should be disabled
  const isMaxQuantity = item.qty >= available;

  return (
    <div
      className={`flex flex-col sm:flex-row bg-white rounded-2xl shadow p-4 sm:p-5 gap-3 items-center min-h-[120px] sm:min-h-[160px] mb-4 ${
        item.isFree ? "bg-green-50" : ""
      }`}
    >
      <img
        src={item.img}
        alt={item.name}
        className="w-full sm:w-28 h-32 sm:h-24 object-contain rounded-xl bg-gray-50 flex-shrink-0"
      />
      <div className="flex-1 min-w-0 flex flex-col h-full w-full">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-1 gap-2">
          <span className="font-semibold text-base sm:text-lg text-gray-800 max-w-[150px] truncate block">
            {item.name}
          </span>
          {item.isFree && (
            <span className="text-green-600 text-xs sm:text-sm font-medium">
              {getOfferLabel(item)}
            </span>
          )}
        </div>
        <span className="text-gray-500 text-xs sm:text-[13px] leading-tight mb-2 block line-clamp-2">
          {item.description}
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-2 sm:mt-auto pt-2 sm:pt-6 gap-4 sm:gap-0">
          <span className="text-black font-bold text-sm sm:text-base order-2 sm:order-1">{item.price}</span>
          {!item.isFree && (
            <div className="flex items-center justify-between sm:justify-end gap-3 order-1 sm:order-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onQtyChange(item.qty - 1)}
                  className="p-1 rounded-lg bg-red-400 text-white"
                  type="button"
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={16} aria-hidden="true" />
                </button>
                <span className="w-8 text-center font-medium">{item.qty}</span>
                <button
                  onClick={() => onQtyChange(item.qty + 1)}
                  className={`p-1 rounded-lg bg-green-400 text-white ${
                    isMaxQuantity ? "opacity-50 cursor-not-allowed" :"bg-gray-200"
                  }`}
                  disabled={isMaxQuantity}
                  type="button"
                  aria-label="Increase quantity"
                >
                  <FiPlus size={16} aria-hidden="true" />
                </button>
              </div>
              <button
                onClick={onRemove}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                type="button"
                aria-label="Remove item"
              >
                <FiTrash2 size={16} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}