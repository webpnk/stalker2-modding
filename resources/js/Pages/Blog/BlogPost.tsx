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

type BlogPostProps = {
    category: Category,
    post: Post
    images: string[]
}

export default function BlogPost({ category, post, images }: PageProps<BlogPostProps>) {
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
            </StalkerLayout>
        </>
    )
}
