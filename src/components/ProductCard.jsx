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
      <span className="inline-block px-3 py-1 text-xs rounded-full bg-orange-400 text-white font-semibold">
        Only {product.available} left
      </span>
    );
  } else {
    tag = (
      <span className="inline-block px-3 py-1 text-xs rounded-full bg-green-400 text-white font-semibold">
        Available
      </span>
    );
  }

  // Disable cart button if out of stock
  const isOutOfStock = product.available === 0;

  return (
    <div className="flex flex-row bg-white rounded-2xl transition shadow-lg p-10 gap-3 items-center min-h-[160px]">
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
          <span className="text-gray-800 font-bold text-base">{product.price}</span>
          <div className="flex items-center gap-4">
            <button
              onClick={onCartToggle}
              className={classNames(
                "transition-colors duration-300",
                isCart ? "text-blue-500" : "text-gray-400",
                isOutOfStock ? "opacity-50 cursor-not-allowed" : "hover:text-gray-600"
              )}
              disabled={isOutOfStock}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 53 51"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M47.4506 7.53333H11.6023L8.53936 2.00508C8.19556 1.38456 7.54517 1 6.83951 1H2.9465C1.87148 1 1 1.87752 1 2.96C1 4.04248 1.87148 4.92 2.9465 4.92H5.69652L8.71929 10.3757L15.6906 25.9074L15.6977 25.9232L16.3117 27.2912L9.31251 34.8088C8.80925 35.3493 8.65171 36.1294 8.90535 36.825C9.159 37.5205 9.78047 38.0125 10.5115 38.0967L16.8912 38.8308C24.871 39.7491 32.9288 39.7491 40.9086 38.8308L47.2883 38.0967C48.3563 37.9738 49.1232 37.0023 49.0012 35.9268C48.8791 34.8513 47.9143 34.0791 46.8462 34.202L40.4666 34.9362C32.7805 35.8207 25.0193 35.8207 17.3333 34.9362L14.8015 34.6448L19.9386 29.1272C19.9883 29.0738 20.0345 29.0184 20.0771 28.9612L22.0309 29.2172C24.7688 29.5759 27.5363 29.6462 30.2887 29.427C36.7082 28.9158 42.6578 25.84 46.8115 20.885L48.3118 19.0954C48.3622 19.0353 48.4089 18.9722 48.4518 18.9064L51.2479 14.6157C53.2299 11.5744 51.0632 7.53333 47.4506 7.53333Z"
                  fill="currentColor"
                />
                <path
                  d="M14.6255 42.16C12.4755 42.16 10.7325 43.915 10.7325 46.08C10.7325 48.245 12.4755 50 14.6255 50C16.7756 50 18.5185 48.245 18.5185 46.08C18.5185 43.915 16.7756 42.16 14.6255 42.16Z"
                  fill="currentColor"
                />
                <path
                  d="M39.2812 46.08C39.2812 43.915 41.0242 42.16 43.1742 42.16C45.3243 42.16 47.0672 43.915 47.0672 46.08C47.0672 48.245 45.3243 50 43.1742 50C41.0242 50 39.2812 48.245 39.2812 46.08Z"
                  fill="currentColor"
                />
                <path
                  d="M47.4506 7.53333H11.6023L8.53936 2.00508C8.19556 1.38456 7.54517 1 6.83951 1H2.9465C1.87148 1 1 1.87752 1 2.96C1 4.04248 1.87148 4.92 2.9465 4.92H5.69652L8.71929 10.3757L15.6906 25.9074L15.6977 25.9232L16.3117 27.2912L9.31251 34.8088C8.80925 35.3493 8.65171 36.1294 8.90535 36.825C9.159 37.5205 9.78047 38.0125 10.5115 38.0967L16.8912 38.8308C24.871 39.7491 32.9288 39.7491 40.9086 38.8308L47.2883 38.0967C48.3563 37.9738 49.1232 37.0023 49.0012 35.9268C48.8791 34.8513 47.9143 34.0791 46.8462 34.202L40.4666 34.9362C32.7805 35.8207 25.0193 35.8207 17.3333 34.9362L14.8015 34.6448L19.9386 29.1272C19.9883 29.0738 20.0345 29.0184 20.0771 28.9612L22.0309 29.2172C24.7688 29.5759 27.5363 29.6462 30.2887 29.427C36.7082 28.9158 42.6578 25.84 46.8115 20.885L48.3118 19.0954C48.3622 19.0353 48.4089 18.9722 48.4518 18.9064L51.2479 14.6157C53.2299 11.5744 51.0632 7.53333 47.4506 7.53333Z"
                  stroke="currentColor"
                  strokeOpacity="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14.6255 42.16C12.4755 42.16 10.7325 43.915 10.7325 46.08C10.7325 48.245 12.4755 50 14.6255 50C16.7756 50 18.5185 48.245 18.5185 46.08C18.5185 43.915 16.7756 42.16 14.6255 42.16Z"
                  stroke="currentColor"
                  strokeOpacity="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M39.2812 46.08C39.2812 43.915 41.0242 42.16 43.1742 42.16C45.3243 42.16 47.0672 43.915 47.0672 46.08C47.0672 48.245 45.3243 50 43.1742 50C41.0242 50 39.2812 48.245 39.2812 46.08Z"
                  stroke="currentColor"
                  strokeOpacity="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={onFavToggle}
              className="transition-colors text-gray-400 hover:text-gray-600"
            >
              <FiHeart size={22} className={isFav ? "text-red-300 fill-red-300" : ""} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}