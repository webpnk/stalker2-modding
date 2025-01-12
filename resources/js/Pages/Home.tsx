import {Mod, PageProps, Post} from '@/types';
import {Insights} from "@/Components/Insights";
import {ModList} from "@/Components/ModList";
import StalkerLayout from "@/Layouts/StalkerLayout";
import {useLaravelReactI18n} from "laravel-react-i18n";
import React from "react";
import Link from "@/lib/inertia-ssg/Link";
import useSsgRouter from "@/lib/inertia-ssg/router";
import Markdown from "react-markdown";
import NotebookIcon from "@/Components/Icons/Notebook";
import {Head, usePage} from "@inertiajs/react";

type HomeProps = {
    insights: Record<string, string>;
    recentPosts: {
        data: Post[],
    };
    dashboardPosts: {
        [key: string]: Post,
    };
    latestMods: {
        data: Mod[],
    }
};

export default function Home({ insights, recentPosts: { data: recentPosts }, dashboardPosts, latestMods: { data: latestMods } }: PageProps<HomeProps>) {
    const { t } = useLaravelReactI18n()
    const { route } = useSsgRouter()

    return (
        <>
            <Head>
                <title>STALKER 2 Mods, Tools, SDK, Fixes & Heart of Chernobyl Modding Updates</title>
                <meta name="description" content="Discover the latest STALKER 2 mods, tools, and SDK updates for Heart of Chernobyl. Stay informed about the modding state, tools and patches" />
            </Head>

            <StalkerLayout>
                <div className="stalker-panel">
                    <div className="stalker-description bg-transparent">
                        <h1 className="text-2xl font-bold text-stalker-rust-400">
                            STALKER 2 <span className="text-olivine-400">Mods</span>, Tools, SDK, Fixes & <span className="p-1 bg-stalker-rust-900">Heart of Chernobyl</span> Modding Updates
                        </h1>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Insights insights={insights} />
                    <ModList mods={latestMods} />
                </div>

                <div className="stalker-panel">
                    <h2 className="stalker-header">{t('About STALKER 2 Modding')}</h2>
                    <div className="stalker-description prose prose-stalker max-w-none">
                        <Markdown>
                            {dashboardPosts.about.body}
                        </Markdown>
                        <div className="mt-4 pb-1 bg-[#4a2b23]/30 rounded">
                            <Markdown>{dashboardPosts.focus.body}</Markdown>
                        </div>
                    </div>
                </div>

                <div className="stalker-panel">
                    <div className="stalker-header flex items-center justify-between gap-2">
                        <div>
                            <NotebookIcon className="w-5 h-5 inline mr-2"/>
                            {t('Recent Articles')}
                        </div>

                        <Link href={route('blog.list')}>
                            <span className="px-2 py-1 text-xs rounded bg-[#4a2b23]/90 border border-[#c4a782]">
                                {t('View All')}
                            </span>
                        </Link>
                    </div>
                    {recentPosts.map((post) => (
                        <div className="stalker-grid grid-cols-1" key={post.id}>
                            <Link href={route("blog.post", [post.category?.slug, post.slug])} className="stalker-item">
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
            </StalkerLayout>
        </>
    );
}
