import React from 'react';
import {Mod, PageProps} from "@/types";
import useSsgRouter from "@/lib/inertia-ssg/router";
import {useLaravelReactI18n} from "laravel-react-i18n";
import useBreadcrumbs from "@/utils/breadcrumbs";
import StalkerLayout from "@/Layouts/StalkerLayout";
import {ModSource} from "@/Components/ModSource";
import useFormatDate from "@/utils/useFormat";
import {Breadcrumbs} from "@/Components/Breadcrumbs";
import PackageIcon from "@/Components/Icons/PackageIcon";
import UserIcon from "@/Components/Icons/User";
import FolderIcon from "@/Components/Icons/FolderIcon";
import CalendarIcon from "@/Components/Icons/Calendar";
import ChevronLeftIcon from "@/Components/Icons/ChevronLeft";
import ExternalLinkIcon from "@/Components/Icons/ExternalLink";
import Link from "@/lib/inertia-ssg/Link";
import {Head} from "@inertiajs/react";
import NotebookIcon from "@/Components/Icons/Notebook";

export default function ModInfoPage({ mod }: PageProps<{ mod: Mod }>) {
    const { route } = useSsgRouter();
    const { t } = useLaravelReactI18n();

    const formatDate = useFormatDate({
        dateStyle: 'long',
    })

    const breadcrumbItems = useBreadcrumbs([
        { label: t('Mods'), href: route('mods.list') },
        { label: t('Minor Improvements'), href: route('mods.list') },
        { label: mod.name, href: route('mods.info', [mod.id]) }
    ]);

    const title = `${mod.name} mod for STALKER 2`;

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={`${mod.name} mod for STALKER 2 - Explore the best STALKER 2 mods`} />
            </Head>

            <StalkerLayout>
                <Breadcrumbs items={breadcrumbItems} />

                <div className="stalker-panel">
                    <h2 className="stalker-header flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <PackageIcon className="inline w-5 h-5"/>
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
                                <UserIcon className="w-4 h-4" />
                                <span>{mod.author}</span>
                            </div>
                            <Link href={route('mods.list')} className="stalker-item flex items-center gap-2">
                                <FolderIcon className="w-4 h-4" />
                                <span>{t('Minor Improvements')}</span>
                            </Link>
                            <div className="stalker-item cursor-default flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
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
                                <ChevronLeftIcon className="w-4 h-4" />
                                {t('Back to modifications')}
                            </Link>

                            <a
                                href={mod.source_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 stalker-item px-4 py-2 hover:border-[#DA8E35] text-[#DA8E35]"
                            >
                                <ExternalLinkIcon className="w-4 h-4" />
                                {t('View on :source', { source: mod.source })}
                            </a>
                        </div>
                    </div>
                </div>

                {mod.relatedPosts && mod.relatedPosts.length > 0 && (
                    <div className="stalker-panel">
                        <h2 className="stalker-header flex items-center gap-2">
                            <NotebookIcon className="w-5 h-5"/>
                            {t('Related Articles')}
                        </h2>
                        {mod.relatedPosts.map((post) => (
                            <div className="stalker-grid grid-cols-1" key={post.id}>
                                <Link href={route("blog.post", [post.category?.slug, post.slug])}
                                      className="stalker-item">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-bold text-[#c4a782]">{post.title}</h3>
                                        <span className="text-xs px-2 py-1 rounded bg-[#4a2b23]/50">
                                        {post.category?.name}
                                    </span>
                                    </div>
                                    <div className="mt-2 text-sm opacity-80">
                                        <p>{t('Author')}: stalker2mods.pro</p>
                                        <p className="mt-1 text-[#8b8b83]"></p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </StalkerLayout>
        </>
    );
};
