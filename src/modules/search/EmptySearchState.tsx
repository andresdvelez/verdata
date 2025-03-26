import React from "react";

export const EmptySearchState = () => {
  return (
    <div className="h-[calc(100vh-102px)] w-full flex flex-col justify-center items-center">
      <span className="icon-[ph--magnifying-glass-duotone] text-6xl text-gray-400"></span>
      <h2 className="text-center text-4xl font-semibold lg:text-6xl mt-6">
        Realiza una búsqueda para encontrar un informe
      </h2>
    </div>
  );
};
