import React from "react";
import { FiSearch, FiArrowLeft, FiArrowRight } from "react-icons/fi"; // Using arrows instead of filter icon

export default function SearchBar({ value, onChange, placeholder = "Search", onFilter }) {
  return (
    <div className="flex items-center relative max-w-xl w-full">
      <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <FiSearch size={16} className="sm:w-[18px] sm:h-[18px]" aria-hidden="true" />
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-8 sm:pl-10 pr-10 sm:pr-12 py-2 rounded-xl bg-white border border-gray-200 text-sm sm:text-base focus:border-gray-300 outline-none transition shadow-sm"
      />
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