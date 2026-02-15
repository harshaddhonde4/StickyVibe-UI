import React from "react";

export default function Dropdown({
  label,
  options,
  selectedValue,
  handleSort,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:pr-12 sm:justify-end">
      <label className="text-lg font-semibold text-primary dark:text-light">
        {label}
      </label>
      <select
        className="px-3 py-2 text-base border rounded-md transition border-primary focus:ring focus:ring-dark focus:outline-none text-gray-900  dark:focus:ring-lighter focus:outline-none text-gray-800 dark:text-lighter"
        value={selectedValue}
        onChange={(event) => handleSort(event.target.value)}
      >
        {options.map((optionVal, index) => (
          <option key={index} value={optionVal}>
            {optionVal}
          </option>
        ))}
      </select>
    </div>
  );
}
