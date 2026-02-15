import React from "react";

export default function SearchBox({ label, placeholder, value, handleSearch }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full">
      <label className="text-base sm:text-lg font-semibold shrink-0">
        {label}
      </label>
      <input
        type="text"
        className="w-full sm:w-auto px-4 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark  dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter"
        placeholder={placeholder}
        value={value}
        onChange={(event) => handleSearch(event.target.value)}
      />
    </div>
  );
}
