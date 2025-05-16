import React from "react";
import { FiSearch, FiArrowLeft, FiArrowRight } from "react-icons/fi"; // Using arrows instead of filter icon

export default function SearchBar({ value, onChange, placeholder = "Search", onFilter }) {
  return (
    <div className="flex items-center relative max-w-xl w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <FiSearch size={18} />
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-12 py-2 rounded-xl bg-white border border-gray-200 text-base focus:border-gray-300 outline-none transition shadow-sm"
      />
      {onFilter && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 text-gray-400 hover:text-gray-600">
          <button onClick={onFilter} className="p-1">
            <FiArrowLeft size={14} />
          </button>
          <button onClick={onFilter} className="p-1">
            <FiArrowRight size={14} />
          </button>
        </div>
      )}

      
    </div>
  );
}