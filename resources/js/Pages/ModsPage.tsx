import React from 'react';
import StalkerLayout from "@/Layouts/StalkerLayout";
import {ModsGrid} from "@/Components/ModsGrid";
import {Breadcrumbs} from "@/Components/Breadcrumbs";
import useBreadcrumbs from "@/utils/breadcrumbs";
import useSsgRouter from "@/lib/inertia-ssg/router";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import {Mod, PageProps} from "@/types";
import {Pagination} from "@/Components/Pagination";
import PackageIcon from "@/Components/Icons/PackageIcon";
import {Head} from "@inertiajs/react";

type ModsListProps = {
    mods: {
        data: Mod[],
        links: {
            first: string,
            last: string,
            prev: string,
            next: string,
        },
        meta: {
            current_page: number,
            from: number,
            last_page: number,
            path: string,
            per_page: number,
            to: number,
            total: number,
        },
    },
};

export default function ModsPage ({ mods }: PageProps<ModsListProps>) {
    const { route } = useSsgRouter();
    const { t } = useLaravelReactI18n();

    const breadcrumbItems = useBreadcrumbs([
        { label: t('Mods'), href: route('mods.list') },
        { label: t('Minor Improvements'), href: route('mods.list') },
    ]);

    return (
        <>
            <Head>
                <title>STALKER 2 Mods List - Weight, Optimizer, Longer Sprint, Inventory & Fixes</title>
                <meta name="description" content="Explore the best STALKER 2 mods, including weight adjustments, inventory enhancements, longer sprint, optimizer tools, longer days, and essential fixes. Find the perfect mod to elevate your Heart of Chernobyl experience" />
            </Head>
            <StalkerLayout>
                <Breadcrumbs items={breadcrumbItems} />

                <div className="stalker-panel">
                    <h2 className="stalker-header flex items-center gap-2">
                        <PackageIcon className="w-5 h-5"/>
                        {t('Available Modifications')}
                    </h2>
                    <div className="p-4">
                        <ModsGrid mods={mods.data} />

                        <Pagination data={mods} />
                    </div>
                </div>
            </StalkerLayout>
        </>
    );
};