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
      <span className="px-3 py-1 text-xs rounded-xl bg-orange-300 text-white font-semibold">
        Only {product.available} left
      </span>
    );
  } else {
    tag = (
      <span className="px-3 py-1 text-xs rounded-xl bg-green-300 text-white font-semibold">
        Available
      </span>
    );
  }

  // Disable cart button if out of stock
  const isOutOfStock = product.available === 0;

  return (
    <div className="flex flex-row bg-white rounded-2xl transition shadow-lg p-5 gap-3 items-center min-h-[160px]">
      <img
        src={product.img}
        alt={product.name}
        className="w-50 h-50 object-contain rounded-xl bg-gray-50 flex-shrink-0"
      />
      <div className="flex-1 min-w-0 flex flex-col h-full">
        <div className="flex items-start mb-2">
          <span className="font-semibold text-lg text-gray-800 block">
            {product.name}
          </span>
        </div>
        <span className="text-gray-500 text-[13px] leading-tight mb-3 block">
          {product.description}
        </span>
        {tag}
        <div className="flex items-end justify-between mt-auto pt-4">
          <span className="text-gray-800 font-bold text-base pr-4">{product.price}</span>
          <div className="flex items-center gap-4">
            <button
              onClick={onCartToggle}
              className={classNames(
                "transition-colors text-gray-400",
                isOutOfStock ? "opacity-50 cursor-not-allowed" : "hover:text-gray-600"
              )}
              disabled={isOutOfStock}
            >
              <FiShoppingCart size={22} className={isCart ? "text-blue-500" : ""} />
            </button>
            <button
              onClick={onFavToggle}
              className="transition-colors text-gray-400 hover:text-gray-600"
            >
              <FiHeart size={22} className={isFav ? "text-red-500" : ""} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}