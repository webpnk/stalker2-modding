import React from 'react';
import {useLaravelReactI18n} from "laravel-react-i18n";
import {Mod} from "@/types";
import Link from "@/lib/inertia-ssg/Link";
import useSsgRouter from "@/lib/inertia-ssg/router";
import {ModSource} from "@/Components/ModSource";
import PackageIcon from "@/Components/Icons/PackageIcon";
import ChevronRightIcon from "@/Components/Icons/ChevronRight";

export const ModList = ({ mods }: {mods: Mod[]}) => {
    const {t} = useLaravelReactI18n();
    const { route } = useSsgRouter();

    return (
        <div className="stalker-panel">
            <h2 className="stalker-header flex items-center gap-2">
                <PackageIcon className="w-5 h-5"/>
                {t('Available Modifications')}
            </h2>
            <div className="stalker-grid border-0 bg-transparent grid-cols-1">
                {mods.map((mod) => (
                    <Link href={route('mods.info', mod.id)} key={mod.id} className="stalker-item">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-[#c4a782]">{mod.name}</h3>
                            <ModSource source={mod.source} short />
                        </div>
                        <div className="mt-2 text-sm opacity-80">
                            <p>{t('Author')}: {mod.author}</p>
                        </div>
                    </Link>
                ))}

                <div className="stalker-item">
                    <Link href={route('mods.list')}>
                        <ChevronRightIcon className="inline" /> {t('View All')}
                    </Link>
                </div>
            </div>
        </div>
    );
};
