import React from 'react';
import {Icon} from "@iconify/react";

const statusItems = [
  {
    label: "Game Status",
    value: "Pre-release",
    color: "text-yellow-400"
  },
  {
    label: "SDK Status",
    value: "Not Available",
    color: "text-red-400"
  },
  {
    label: "Community Tools",
    value: "In Development",
    color: "text-green-400"
  }
];

export const ModdingStatus = () => {
  return (
    <div className="stalker-panel">
      <h2 className="stalker-header flex items-center gap-2">
        <Icon icon="lucide:terminal" className="w-5 h-5" />
        Zone Status Report
      </h2>
      <div className="stalker-grid">
        {statusItems.map((item) => (
          <div key={item.label} className="stalker-item">
            <div className="flex justify-between items-center">
              <span className="text-sm opacity-80">{item.label}</span>
              <span className={`${item.color} text-sm`}>{item.value}</span>
            </div>
          </div>
        ))}
        <div className="stalker-description mt-2">
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <Icon icon="lucide:triangle-alert" className="w-4 h-4" />
            <span className="text-sm">Early Development Phase</span>
          </div>
          <p>
            STALKER 2 modding capabilities are currently in preparation phase.
            Community tools are being developed based on Unreal Engine 5 modding framework.
          </p>
        </div>
      </div>
    </div>
  );
};
