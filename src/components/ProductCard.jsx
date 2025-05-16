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
  let tag = null;
  if (product.available <= 5) {
    tag = (
      <span className="inline-block p-2 w-max py-0.5 text-[10px] rounded-full bg-orange-400 text-white font-medium m-2 ml-0">
        Only {product.available} left
      </span>
    );
  } else {
    tag = (
      <span className="inline-block p-2 w-max py-0.5 text-[10px] rounded-full bg-green-500 text-white font-medium m-2 ml-0">
        Available
      </span>
    );
  }

  const isOutOfStock = product.available === 0;

  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md p-10 gap-4 items-center sm:items-center w-full max-w-[340px] sm:max-w-[480px]">
      <img
        src={product.img}
        alt={product.name}
        className="w-full sm:w-50 h-50 object-contain rounded-lg flex-shrink-0"
      />
      <div className="flex-1 min-w-0 flex flex-col h-full w-full">
        <div className="flex items-start mb-2">
          <span className="font-semibold text-sm text-gray-800 block mb-2">
            {product.name}
          </span>
        </div>
        <span className="text-gray-500 text-xs leading-tight block mb-10">
          {product.description}
        </span>
        {tag}
        <div className="flex items-end justify-between mt-4">
          <span className="text-gray-800 font-bold text-sm">{product.price}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onCartToggle}
              className={classNames(
                "transition-colors duration-300",
                isCart ? "text-gray-600" : "text-gray-400",
                isOutOfStock ? "opacity-50 cursor-not-allowed" : "hover:text-gray-600"
              )}
              disabled={isOutOfStock}
              type="button"
              aria-label={isCart ? "Remove from cart" : "Add to cart"}
            >
              <FiShoppingCart size={18} aria-hidden="true" />
            </button>
            <button
              onClick={onFavToggle}
              className="transition-colors text-gray-400 hover:text-red-400"
              type="button"
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <FiHeart size={18} className={isFav ? "text-red-400 fill-red-400" : ""} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}