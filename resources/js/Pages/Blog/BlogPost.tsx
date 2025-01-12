import StalkerLayout from "@/Layouts/StalkerLayout";
import {Category, PageProps, Post} from "@/types";
import {Breadcrumbs} from "@/Components/Breadcrumbs";
import {BlogCover} from "@/Components/BlogCover";
import Markdown from "react-markdown";
import {useLaravelReactI18n} from "laravel-react-i18n";
import useSsgRouter from "@/lib/inertia-ssg/router";
import useFormatDate from "@/utils/useFormat";
import useBreadcrumbs from "@/utils/breadcrumbs";
import {Head} from "@inertiajs/react";
import rehypeRaw from "rehype-raw";
import NotebookIcon from "@/Components/Icons/Notebook";
import Link from "@/lib/inertia-ssg/Link";
import React from "react";

type BlogPostProps = {
    category: Category,
    post: Post
    images: string[]
    suggestions: { data: Post[] }
}

export default function BlogPost({ category, post, images, suggestions }: PageProps<BlogPostProps>) {
    const { t } = useLaravelReactI18n()
    const { route } = useSsgRouter()

    const breadcrumbs = useBreadcrumbs([
        { label: t('Read'), href: route('blog.list') },
        { label: category.name, href: route('blog.list', [category.slug]) },
        { label: post.title, href: route('blog.post', [category.slug, post.slug]) },
    ]);

    const formatDate = useFormatDate({
        dateStyle: 'long',
    });

    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.seo_description} />
            </Head>
            <StalkerLayout>
                <Breadcrumbs items={breadcrumbs} />

                <BlogCover
                    imageUrl={post.cover_image}
                    title={post.title}
                    date={formatDate.format(new Date(post.published_at))}
                />

                {images && (
                    <div>
                        {images.map((image, index) => (
                            <div>
                                <img key={index} src={image} alt={post.title} className="w-full h-full object-cover"/>
                                {image}
                            </div>
                        ))}
                    </div>
                )}

                <article className="stalker-panel stalker-blog-post">
                    <div className="stalker-description prose prose-stalker max-w-none">
                        <Markdown rehypePlugins={[rehypeRaw]}>{post.body}</Markdown>
                    </div>
                </article>

                {suggestions && suggestions.data.length > 0 && (
                    <div className="stalker-panel">
                        <h2 className="stalker-header flex items-center gap-2">
                            <NotebookIcon className="w-5 h-5"/>
                            {t('Read Also')}
                        </h2>
                        {suggestions.data.map((post) => (
                            <div className="stalker-grid grid-cols-1" key={post.id}>
                                <Link href={route("blog.post", [post.category?.slug, post.slug])}
                                      className="stalker-item">
                                    <div className="flex justify-between items-start">
                                        <div className="flex gap-x-4">
                                            <img src={post.cover_image} alt={`Cover image for ${post.title}`}
                                                 className="w-16 h-16 object-cover"/>
                                            <div className="block">
                                                <h3 className="font-bold text-[#c4a782] line-clamp-1">{post.title}</h3>
                                                <div className="mt-2 text-sm opacity-80">
                                                    <p>{t('Author')}: stalker2mods.pro</p>
                                                    <p className="mt-1 text-[#8b8b83]"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs px-2 py-1 rounded bg-[#4a2b23]/50">
                                        {post.category?.name}
                                    </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </StalkerLayout>
        </>
    )
}
