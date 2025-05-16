import React from "react";
import { FiSearch, FiFilter } from "react-icons/fi";

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
        className="w-full pl-10 pr-12 py-2 rounded-xl bg-gray-50 border border-gray-200 text-base focus:border-gray-400 outline-none transition"
      />
      {onFilter && (
        <button onClick={onFilter} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600">
          <FiFilter size={21} />
        </button>
      )}
    </div>
  );
}
