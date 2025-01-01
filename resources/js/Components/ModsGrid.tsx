import React from 'react';
import { ModCard } from './ModCard';
import {Mod} from "@/types";

export const ModsGrid = ({ mods }: { mods: Mod[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mods.map(mod => (
                <ModCard key={mod.id} mod={mod} />
            ))}
        </div>
    );
};
