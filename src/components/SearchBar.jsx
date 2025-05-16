import React from "react";
import { FiSearch, FiArrowLeft, FiArrowRight } from "react-icons/fi"; // Using arrows instead of filter icon

export default function SearchBar({ value, onChange, placeholder = "Search", onFilter }) {
  return (
    <div className="flex items-center relative max-w-xl w-full sm:ml-20 ">
      <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <FiSearch size={16} className="sm:w-[18px] sm:h-[18px]" aria-hidden="true" />
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-8 sm:pl-10 pr-10 sm:pr-20 py-3 rounded-2xl bg-white border border-gray-200 text-sm sm:text-base focus:border-gray-300 outline-none transition shadow-sm"
      />
      <span className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400">
          <svg width="20" height="20" viewBox="0 0 34 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.5482 7.2H1.47433C0.674506 7.2 0.026123 6.39411 0.026123 5.4C0.026123 4.40589 0.674506 3.6 1.47433 3.6H20.5482C21.1446 1.50265 22.7539 0 24.6456 0C26.5373 0 28.1466 1.50265 28.743 3.6H32.3693C33.1692 3.6 33.8175 4.40589 33.8175 5.4C33.8175 6.39411 33.1692 7.2 32.3693 7.2H28.743C28.1466 9.29735 26.5373 10.8 24.6456 10.8C22.7539 10.8 21.1446 9.29735 20.5482 7.2Z" fill="#6A6A6A"/>
            <path d="M32.3693 26.4C33.1692 26.4 33.8175 25.5941 33.8175 24.6C33.8175 23.6059 33.1692 22.8 32.3693 22.8H13.2955C12.699 20.7027 11.0897 19.2 9.19808 19.2C7.30641 19.2 5.69711 20.7027 5.10068 22.8H1.47433C0.674507 22.8 0.026123 23.6059 0.026123 24.6C0.026123 25.5941 0.674507 26.4 1.47433 26.4H5.10068C5.69711 28.4973 7.30641 30 9.19808 30C11.0897 30 12.699 28.4973 13.2955 26.4H32.3693Z" fill="#6A6A6A"/>
          </svg>
       </span>

      {onFilter && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 text-gray-400 hover:text-gray-600">
          <button 
            onClick={onFilter} 
            className="p-1" 
            type="button"
            aria-label="Previous filter"
          >
            <FiArrowLeft size={12} className="sm:w-[14px] sm:h-[14px]" aria-hidden="true" />
          </button>
          <button 
            onClick={onFilter} 
            className="p-1" 
            type="button"
            aria-label="Next filter"
          >
            <FiArrowRight size={12} className="sm:w-[14px] sm:h-[14px]" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}