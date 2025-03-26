"use client";

import React from "react";
import { StatCard } from "./stat-cards/StatCard";

export const StatCardGrid = () => {
  return (
    <aside className="grid-cols-1 xl:grid-cols-3 gap-6 hidden md:grid">
      {/* Database Stats Card */}
      <StatCard
        icon={<span className="text-3xl">%</span>}
        title="Bases de datos actualizadas"
        value={100}
        maxValue={100}
        progressSuffix="%"
        variant="purple"
        action={{
          text: "Realizar búsqueda",
          onClick: () => console.log("Search database"),
        }}
        subtitle="Se ha actualizado el 100% satisfactoriamente"
        animationDelay={0}
      />

      {/* Search Credits Card */}
      <StatCard
        icon={
          <i
            className="icon-[tdesign--search] size-8"
            role="img"
            aria-hidden="true"
          />
        }
        title="Créditos de búsqueda"
        value={5}
        maxValue={100}
        variant="lime"
        progressSuffix="/100"
        action={{
          text: "Recargar ahora",
          onClick: () => console.log("Reload credits"),
        }}
        subtitle="Tienes 5 de 100 créditos"
        animationDelay={0.2}
      />

      {/* Promotion Card */}
      <StatCard
        icon={
          <i
            className="icon-[lucide--calendar] size-8"
            role="img"
            aria-hidden="true"
          />
        }
        rightIcon={
          <i
            className="icon-[material-symbols--database] size-36 2xl:size-40"
            role="img"
            aria-hidden="true"
          />
        }
        title="¡Promoción!"
        subtitle="Solo por hoy 2x1"
        value={0}
        showProgress={false}
        variant="white"
        action={{
          text: "Recargar ahora",
          onClick: () => console.log("Use promotion"),
        }}
        animationDelay={0.4}
      />
    </aside>
  );
};
