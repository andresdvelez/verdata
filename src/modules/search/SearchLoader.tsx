import React from "react";

export const SearchLoader = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="relative w-20 h-20 animate-spin">
        <div className="absolute inset-0 border-4 border-gray-300 rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin-fast"></div>
      </div>
    </div>
  );
};
