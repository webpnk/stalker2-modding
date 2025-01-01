import React from 'react';
import {Mod} from "@/types";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import useFormatDate from "@/utils/useFormat";
import {InlineIcon} from "@iconify/react";
import {Link} from "@inertiajs/react";
import useAppRouter from "@/utils/router";

interface ModCardProps {
    mod: Mod;
}

export const ModCard = ({ mod }: ModCardProps) => {
    const { t } = useLaravelReactI18n();
    const { route } = useAppRouter();

    const dateFormatter = useFormatDate({
        dateStyle: 'medium',
    })

    return (
        <Link href={route('mods.info', mod.id)} className="stalker-item flex flex-col">
            <div className="relative h-48 mb-4">
                <img
                    src={mod.picture_url}
                    alt={mod.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 text-xs rounded bg-[#4a2b23]/90 border border-[#c4a782]">
                    <InlineIcon icon="lucide:database" className="inline" /> {mod.source}
                  </span>
                </div>
            </div>

            <h3 className="text-xl font-bold text-[#c4a782] mb-2 line-clamp-2">{mod.name}</h3>
            <p className="text-sm text-[#8b8b83] mb-4 flex-grow line-clamp-4">{mod.summary}</p>

            <div className="space-y-2 text-sm text-[#8b8b83]">
                <div className="flex items-center gap-2">
                    <InlineIcon icon="lucide:user" className="w-4 h-4 inline" />
                    <span>{mod.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <InlineIcon icon="lucide:calendar" className="w-4 h-4 inline" />
                    <span>{t('Minor Improvements')}</span>
                </div>
                <div className="flex items-center gap-2">
                    <InlineIcon icon="lucide:calendar" className="w-4 h-4 inline" />
                    <span>{dateFormatter.format(new Date(mod.published_at))}</span>
                </div>
            </div>
        </Link>
    );
};
