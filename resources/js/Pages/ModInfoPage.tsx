import React from 'react';
import {Mod, PageProps} from "@/types";
import useAppRouter from "@/utils/router";
import {useLaravelReactI18n} from "laravel-react-i18n";
import useBreadcrumbs from "@/utils/breadcrumbs";
import StalkerLayout from "@/Layouts/StalkerLayout";
import {ModSource} from "@/Components/ModSource";
import useFormatDate from "@/utils/useFormat";
import {Breadcrumbs} from "@/Components/Breadcrumbs";
import {Icon, InlineIcon} from "@iconify/react";
import {Link} from "@inertiajs/react";

export default function ModInfoPage({ mod }: PageProps<{ mod: Mod }>) {
    const { route } = useAppRouter();
    const { t } = useLaravelReactI18n();

    const formatDate = useFormatDate({
        dateStyle: 'long',
    })

    const breadcrumbItems = useBreadcrumbs([
        { label: t('Mods'), href: route('mods.list') },
        { label: t('Minor Improvements'), href: route('mods.list') },
        { label: mod.name, href: `/mods/${mod.id}` }
    ]);

    return (
        <StalkerLayout>
            <Breadcrumbs items={breadcrumbItems} />

            <div className="stalker-panel">
                <h2 className="stalker-header flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <InlineIcon icon="lucide:package" className="w-5 h-5"/>
                        {mod.name}
                    </div>

                    <ModSource source={mod.source} />
                </h2>

                <div className="p-6 space-y-6">
                    <div className="relative h-[400px]">
                        <img
                            src={mod.picture_url}
                            alt={mod.name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>

                    <div className="stalker-grid grid-cols-3 gap-4">
                        <div className="stalker-item cursor-default flex items-center gap-2">
                            <InlineIcon icon="lucide:user" className="w-4 h-4" />
                            <span>{mod.author}</span>
                        </div>
                        <Link href={route('mods.list')} className="stalker-item flex items-center gap-2">
                            <InlineIcon icon="lucide:calendar" className="w-4 h-4" />
                            <span>{t('Minor Improvements')}</span>
                        </Link>
                        <div className="stalker-item cursor-default flex items-center gap-2">
                            <InlineIcon icon="lucide:calendar" className="w-4 h-4" />
                            <span>{formatDate.format(new Date(mod.published_at))}</span>
                        </div>
                    </div>

                    <div className="stalker-description">
                        <p>{mod.summary}</p>
                    </div>

                    <div className="flex gap-4">
                        <Link
                            href={route('mods.list')}
                            className="inline-flex items-center gap-2 stalker-item px-4 py-2 hover:border-[#c4a782]"
                        >
                            <InlineIcon icon="lucide:chevron-left" className="w-4 h-4" />
                            {t('Back to modifications')}
                        </Link>

                        <a
                            href={mod.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 stalker-item px-4 py-2 hover:border-[#DA8E35] text-[#DA8E35]"
                        >
                            <InlineIcon icon="lucide:external-link" className="w-4 h-4" />
                            {t('View on :source', { source: mod.source })}
                        </a>
                    </div>
                </div>
            </div>
        </StalkerLayout>
    );
};
