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
      className={`flex flex-row bg-white rounded-2xl shadow p-5 gap-3 items-center min-h-[160px] mb-4 ${
        item.isFree ? "bg-green-50" : ""
      }`}
    >
      <img
        src={item.img}
        alt={item.name}
        className="w-28 h-24 object-contain rounded-xl bg-gray-50 flex-shrink-0"
      />
      <div className="flex-1 min-w-0 flex flex-col h-full">
        <div className="flex items-start justify-between mb-1">
          <span className="font-semibold text-lg text-gray-800 max-w-[150px] truncate block">
            {item.name}
          </span>
          {item.isFree && (
            <span className="text-green-600 text-sm font-medium">
              {getOfferLabel(item)}
            </span>
          )}
        </div>
        <span className="text-gray-500 text-[13px] leading-tight mb-2 block line-clamp-2">
          {item.description}
        </span>
        <div className="flex items-end justify-between mt-auto pt-6">
          <span className="text-black font-bold text-base">{item.price}</span>
          {!item.isFree && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onQtyChange(item.qty - 1)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <FiMinus size={16} />
                </button>
                <span className="w-8 text-center font-medium">{item.qty}</span>
                <button
                  onClick={() => onQtyChange(item.qty + 1)}
                  className={`p-1 rounded-full bg-gray-100 ${
                    isMaxQuantity ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
                  }`}
                  disabled={isMaxQuantity}
                >
                  <FiPlus size={16} />
                </button>
              </div>
              <button
                onClick={onRemove}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}