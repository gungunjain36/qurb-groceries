import React from "react";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductCard({
  product,
  isFav = false,
  isCart = false,
  onFavToggle,
  onCartToggle,
}) {
  // Tag logic — only 5 left or available
  let tag = null;
  if (product.available <= 5) {
    tag = (
      <span className="px-3 py-1 text-xs rounded-xl bg-orange-100 text-orange-600 font-semibold">
        Only {product.available} left
      </span>
    );
  } else {
    tag = (
      <span className="px-3 py-1 text-xs rounded-xl bg-green-100 text-green-600 font-semibold">
        Available
      </span>
    );
  }
  return (
    <div className="flex flex-row bg-white rounded-2xl transition shadow-lg p-5 gap-3 items-center min-h-[160px]">
      <img
        src={product.img}
        alt={product.name}
        className="w-28 h-24 object-contain rounded-xl bg-gray-50 flex-shrink-0"
      />
      <div className="flex-1 min-w-0 flex flex-col h-full">
        <div className="flex items-start mb-1">
          <span className="font-semibold text-lg text-gray-800 mr-2 max-w-[150px] truncate block">
            {product.name}
          </span>
        </div>
        <span className="text-gray-500 text-[13px] leading-tight mb-2 block line-clamp-2">
          {product.description}
        </span>
        {tag}
        <div className="flex items-end justify-between mt-auto pt-6">
          <span className="text-black font-bold text-base">{product.price}</span>
          <div className="flex items-center gap-4">
            <button
              onClick={onCartToggle}
              className={classNames(
                "transition-colors",
                isCart ? "text-black" : "text-gray-400 hover:text-black"
              )}
            >
              <FiShoppingCart size={22} />
            </button>
            <button
              onClick={onFavToggle}
              className={classNames(
                "transition-colors",
                isFav ? "text-red-400" : "text-gray-400 hover:text-red-400"
              )}
            >
              <FiHeart size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}