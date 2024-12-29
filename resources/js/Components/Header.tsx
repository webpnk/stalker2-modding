import React from 'react';
import {Icon} from "@iconify/react";

export const Header = () => {
  return (
    <header className="stalker-panel mb-6">
      <div className="flex items-center">
        <div className="w-16 flex items-center justify-center">
            <Icon icon="lucide:radiation" className="w-8 h-8 text-[#98b37c]" />
        </div>
        <div>
          <h1 className="text-2xl stalker-header">STALKER 2 Modding Hub</h1>
          <p className="text-sm opacity-70 pl-1">Community Modding Resources & Tools</p>
        </div>
      </div>
    </header>
  );
};
