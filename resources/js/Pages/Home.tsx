import {Mod, PageProps, Post} from '@/types';
import {Insights} from "@/Components/Insights";
import {ModList} from "@/Components/ModList";
import StalkerLayout from "@/Layouts/StalkerLayout";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {Icon} from "@iconify/react";
import React from "react";
import {Link} from "@inertiajs/react";
import useAppRouter from "@/utils/router";
import Markdown from "react-markdown";

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
    const { route } = useAppRouter()

    return (
        <>
            <StalkerLayout>
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
                    <h2 className="stalker-header flex items-center gap-2">
                        <Icon icon="lucide:notebook" className="w-5 h-5"/>
                        {t('Recent Articles')}
                    </h2>
                    {recentPosts.map((post) => (
                        <div className="stalker-grid grid-cols-1">
                            <Link href={route("blog.post", [post.category?.slug, post.slug])} className="stalker-item">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-[#c4a782]">{post.title}</h3>
                                    <span className="text-xs px-2 py-1 rounded bg-[#4a2b23]/50">
                                        {post.category?.name}
                                    </span>
                                </div>
                                <div className="mt-2 text-sm opacity-80">
                                    <p>{t('Author')}: <Link href="/">stalker2-modding</Link></p>
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
