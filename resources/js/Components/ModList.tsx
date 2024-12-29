import React from 'react';
import {Icon} from "@iconify/react";

const mods = [
  {
    name: "Weapon Pack",
    status: "In Development",
    author: "STALKER_Modder",
    description: "Adds new weapons and animations",
    category: "Weapons"
  },
  {
    name: "Weather Overhaul",
    status: "Planned",
    author: "ZoneExplorer",
    description: "Enhanced weather and atmosphere",
    category: "Environment"
  }
];

export const ModList = () => {
  return (
    <div className="stalker-panel">
      <h2 className="stalker-header flex items-center gap-2">
        <Icon icon="lucide:package" className="w-5 h-5" />
        Available Modifications
      </h2>
      <div className="stalker-grid grid-cols-1">
        {mods.map((mod) => (
          <div key={mod.name} className="stalker-item">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-[#c4a782]">{mod.name}</h3>
              <span className="text-xs px-2 py-1 rounded bg-[#4a2b23]/50">
                {mod.status}
              </span>
            </div>
            <div className="mt-2 text-sm opacity-80">
              <p>Author: {mod.author}</p>
              <p>Category: {mod.category}</p>
              <p className="mt-1 text-[#8b8b83]">{mod.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
