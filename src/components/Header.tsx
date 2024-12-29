import React from 'react';
import { Radio } from 'lucide-react';

export const Header = () => {
  return (
    <header className="stalker-panel mb-6">
      <div className="flex items-center gap-3">
        <Radio className="w-8 h-8 text-[#98b37c]" />
        <div>
          <h1 className="text-2xl stalker-header">STALKER 2 Modding Hub</h1>
          <p className="text-sm opacity-70">Community Modding Resources & Tools</p>
        </div>
      </div>
    </header>
  );
};