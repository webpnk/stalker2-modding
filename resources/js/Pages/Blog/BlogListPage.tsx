import React from 'react';
import StalkerLayout from "@/Layouts/StalkerLayout";
import {Breadcrumbs} from "@/Components/Breadcrumbs";
import useBreadcrumbs from "@/utils/breadcrumbs";
import useSsgRouter from "@/lib/inertia-ssg/router";
import { useLaravelReactI18n } from 'laravel-react-i18n';
import {Category, PageProps, Post} from "@/types";
import {Pagination} from "@/Components/Pagination";
import {PostsGrid} from "@/Components/Blog/PostsGrid";
import NotebookIcon from "@/Components/Icons/Notebook";
import Link from "@/lib/inertia-ssg/Link";
import {Head} from "@inertiajs/react";

type BlogListProps = {
    posts: {
        data: Post[],
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
    categories: {
        data: Category[],
    },
    category?: Category,
    links: string[],
};

export default function BlogListPage ({ posts, categories, category, links }: PageProps<BlogListProps>) {
    const { route } = useSsgRouter();
    const { t } = useLaravelReactI18n();

    const breadcrumbs = useBreadcrumbs([
        { label: t('Read'), href: route('blog.list') },
        ...(
            category ? [{ label: category.name, href: route('blog.list', [category.slug]) }] : []
        ),
    ]);

    return (
        <>
            <Head>
                <title>STALKER 2 Modding Blog - Tips, Guides, Tools, and Updates</title>
                <meta name="description" content="Stay updated with the latest STALKER 2 modding tips, in-depth guides, tools releases, and news. Explore articles on optimizing gameplay, mod creation, and Heart of Chernobyl updates" />
            </Head>

            <StalkerLayout>
                <Breadcrumbs items={breadcrumbs}/>

                <menu className="stalker-panel flex gap-x-4 items-center px-3 py-2">
                    <span>{t('Categories')}:</span>
                    <ol className="flex items-center space-x-2 text-sm">
                        {categories.data.map((item) => (
                            <li className="stalker-item" key={item.id}>
                                <Link href={route('blog.list', [item.slug])} >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ol>
                </menu>

                <div className="stalker-panel">
                    <h2 className="stalker-header flex items-center gap-2">
                        <NotebookIcon className="w-5 h-5"/>
                        {
                            category
                                ? t('Recent Articles from «:category»', { category: category.name })
                                : t('Recent Articles')
                        }
                    </h2>
                    <div className="p-4">
                        <PostsGrid posts={posts.data}/>

                        <Pagination links={links} meta={posts.meta} />
                    </div>
                </div>
            </StalkerLayout>
        </>
    );
};
