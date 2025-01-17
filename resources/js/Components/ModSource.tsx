import React from 'react';
import DatabaseIcon from "@/Components/Icons/Database";

export const ModSource = ({ source, short = false }: { source: string, short?: boolean }) => {
    return (
        <div className={`flex items-center gap-1`}>
          <span className="px-2 py-0.5 text-xs rounded bg-[#DA8E35]/20 text-[#DA8E35] border border-[#DA8E35]">
              {!short && <DatabaseIcon className="inline" />} {source}
          </span>
        </div>
    );
};
