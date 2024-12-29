import React from 'react';
import { Wrench, ExternalLink } from 'lucide-react';

const tools = [
  {
    name: "X-Ray SDK",
    description: "Expected official modding toolkit (unreleased)",
    status: "Anticipated",
    link: "#"
  },
  {
    name: "Community Mod Tools",
    description: "In-development unofficial tools by the community",
    status: "In Development",
    link: "#"
  }
];

export const ToolsList = () => {
  return (
    <div className="stalker-panel space-y-4">
      <h2 className="stalker-header flex items-center gap-2">
        <Wrench className="w-5 h-5" />
        Available Tools
      </h2>
      <div className="space-y-4">
        {tools.map((tool) => (
          <div key={tool.name} className="border border-[#2a3f2d]/50 p-3 rounded">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-[#98b37c]">{tool.name}</h3>
              <span className="text-xs px-2 py-1 rounded bg-[#2a3f2d]/50">
                {tool.status}
              </span>
            </div>
            <p className="text-sm mt-2 opacity-80">{tool.description}</p>
            <a 
              href={tool.link}
              className="inline-flex items-center gap-1 text-xs mt-2 text-[#98b37c] hover:underline"
            >
              Learn More <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};