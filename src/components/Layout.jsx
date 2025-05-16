import React from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import useCart from "../hooks/useCart";

export default function Layout({ children, searchBar, favIds = [] }) {
  const navigate = useNavigate();
  const { cart } = useCart();

  // Calculate total number of items in the cart by summing quantities
  const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);

  // Total number of liked items
  const totalLikedItems = favIds.length;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white min-h-screen">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6">
          {/* Header */}
          <div className="flex flex-col gap-4">
            {/* Top row with GROCERIES, search and user icons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center justify-between sm:justify-start sm:gap-6 flex-1">
                <button
                  className="flex items-center font-extrabold text-lg md:text-xl"
                  onClick={() => {
                    console.log("Navigating to /");
                    navigate("/");
                  }}
                  type="button"
                  aria-label="Go to home"
                >
                  GROCERIES
                </button>
                {/* Search bar - hidden on mobile, shown on desktop */}
                <div className="hidden sm:flex flex-1 max-w-xl">
                  {searchBar || <div />}
                </div>
                {/* Mobile cart icon */}
                <div className="sm:hidden relative group">
                  <button
                    onClick={() => {
                      console.log("Navigating to /checkout");
                      navigate("/checkout");
                    }}
                    type="button"
                    aria-label="Go to cart"
                  >
                    <svg width="24" height="24" viewBox="0 0 53 51" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Shopping Cart">
                      <title>Shopping Cart</title>
                      <path d="M47.4506 7.53333H11.6023L8.53936 2.00508C8.19556 1.38456 7.54517 1 6.83951 1H2.9465C1.87148 1 1 1.87752 1 2.96C1 4.04248 1.87148 4.92 2.9465 4.92H5.69652L8.71929 10.3757L15.6906 25.9074L15.6977 25.9232L16.3117 27.2912L9.31251 34.8088C8.80925 35.3493 8.65171 36.1294 8.90535 36.825C9.159 37.5205 9.78047 38.0125 10.5115 38.0967L16.8912 38.8308C24.871 39.7491 32.9288 39.7491 40.9086 38.8308L47.2883 38.0967C48.3563 37.9738 49.1232 37.0023 49.0012 35.9268C48.8791 34.8513 47.9143 34.0791 46.8462 34.202L40.4666 34.9362C32.7805 35.8207 25.0193 35.8207 17.3333 34.9362L14.8015 34.6448L19.9386 29.1272C19.9883 29.0738 20.0345 29.0184 20.0771 28.9612L22.0309 29.2172C24.7688 29.5759 27.5363 29.6462 30.2887 29.427C36.7082 28.9158 42.6578 25.84 46.8115 20.885L48.3118 19.0954C48.3622 19.0353 48.4089 18.9722 48.4518 18.9064L51.2479 14.6157C53.2299 11.5744 51.0632 7.53333 47.4506 7.53333Z" fill="#585858"/>
                      <path d="M14.6255 42.16C12.4755 42.16 10.7325 43.915 10.7325 46.08C10.7325 48.245 12.4755 50 14.6255 50C16.7756 50 18.5185 48.245 18.5185 46.08C18.5185 43.915 16.7756 42.16 14.6255 42.16Z" fill="#585858"/>
                      <path d="M39.2812 46.08C39.2812 43.915 41.0242 42.16 43.1742 42.16C45.3243 42.16 47.0672 43.915 47.0672 46.08C47.0672 48.245 45.3243 50 43.1742 50C41.0242 50 39.2812 48.245 39.2812 46.08Z" fill="#585858"/>
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-blue-400 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                      {totalCartItems}
                    </span>
                  </button>
                </div>
              </div>
              {/* User profile, cart and likes - always at the end */}
              <div className="hidden sm:flex items-center gap-6">
                <div className="relative group">
                  <svg width="24" height="24" viewBox="0 0 53 45" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Favorites">
                    <title>Favorites</title>
                    <path d="M16.0086 1C7.90436 1 1 7.16621 1 15.1746C1 20.6992 3.54227 25.3504 6.9116 29.2033C10.2694 33.043 14.6014 36.266 18.5177 38.9635L25.2748 43.6177C26.0148 44.1274 26.9852 44.1274 27.7252 43.6177L34.4823 38.9635C38.3986 36.266 42.7306 33.043 46.0884 29.2033C49.4577 25.3504 52 20.6992 52 15.1746C52 7.16621 45.0956 1 36.9914 1C32.8139 1 29.1379 2.99324 26.5 5.57233C23.8621 2.99324 20.1861 1 16.0086 1Z" fill="#E86F6F" stroke="#FF5E5E" strokeOpacity="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                    {totalLikedItems}
                  </span>
                </div>
                <div className="relative">
                  <img
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-white drop-shadow-md object-cover"
                  />
                </div>
                <div className="relative group">
                  <button
                    onClick={() => {
                      console.log("Navigating to /checkout");
                      navigate("/checkout");
                    }}
                    type="button"
                    aria-label="Go to cart"
                  >
                    <svg width="24" height="24" viewBox="0 0 53 51" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Shopping Cart">
                      <title>Shopping Cart</title>
                      <path d="M47.4506 7.53333H11.6023L8.53936 2.00508C8.19556 1.38456 7.54517 1 6.83951 1H2.9465C1.87148 1 1 1.87752 1 2.96C1 4.04248 1.87148 4.92 2.9465 4.92H5.69652L8.71929 10.3757L15.6906 25.9074L15.6977 25.9232L16.3117 27.2912L9.31251 34.8088C8.80925 35.3493 8.65171 36.1294 8.90535 36.825C9.159 37.5205 9.78047 38.0125 10.5115 38.0967L16.8912 38.8308C24.871 39.7491 32.9288 39.7491 40.9086 38.8308L47.2883 38.0967C48.3563 37.9738 49.1232 37.0023 49.0012 35.9268C48.8791 34.8513 47.9143 34.0791 46.8462 34.202L40.4666 34.9362C32.7805 35.8207 25.0193 35.8207 17.3333 34.9362L14.8015 34.6448L19.9386 29.1272C19.9883 29.0738 20.0345 29.0184 20.0771 28.9612L22.0309 29.2172C24.7688 29.5759 27.5363 29.6462 30.2887 29.427C36.7082 28.9158 42.6578 25.84 46.8115 20.885L48.3118 19.0954C48.3622 19.0353 48.4089 18.9722 48.4518 18.9064L51.2479 14.6157C53.2299 11.5744 51.0632 7.53333 47.4506 7.53333Z" fill="#585858"/>
                      <path d="M14.6255 42.16C12.4755 42.16 10.7325 43.915 10.7325 46.08C10.7325 48.245 12.4755 50 14.6255 50C16.7756 50 18.5185 48.245 18.5185 46.08C18.5185 43.915 16.7756 42.16 14.6255 42.16Z" fill="#585858"/>
                      <path d="M39.2812 46.08C39.2812 43.915 41.0242 42.16 43.1742 42.16C45.3243 42.16 47.0672 43.915 47.0672 46.08C47.0672 48.245 45.3243 50 43.1742 50C41.0242 50 39.2812 48.245 39.2812 46.08Z" fill="#585858"/>
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-blue-400 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                      {totalCartItems}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            {/* Search bar - shown on mobile only */}
            <div className="sm:hidden w-full">
              {searchBar || <div />}
            </div>
          </div>
          {/* Render the main content */}
          {children}
        </div>
      </div>
    </div>
  );
}