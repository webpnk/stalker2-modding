import StalkerLayout from "@/Layouts/StalkerLayout";
import {Category, PageProps, Post} from "@/types";
import {Breadcrumbs} from "@/Components/Breadcrumbs";
import {BlogCover} from "@/Components/BlogCover";
import Markdown from "react-markdown";
import {useLaravelReactI18n} from "laravel-react-i18n";
import useSsgRouter from "@/lib/inertia-ssg/router";
import useFormatDate from "@/utils/useFormat";
import useBreadcrumbs from "@/utils/breadcrumbs";

type BlogPostProps = {
    category: Category,
    post: Post
}

export default function BlogPost({ category, post }: PageProps<BlogPostProps>) {
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
            <StalkerLayout>
                <Breadcrumbs items={breadcrumbs} />

                <BlogCover
                    imageUrl={post.cover_image}
                    title={post.title}
                    date={formatDate.format(new Date(post.published_at))}
                />

                <article className="stalker-panel stalker-blog-post">
                    {/*<h2 className="stalker-header mb-4">Community Development</h2>*/}
                    <div className="stalker-description prose prose-stalker max-w-none">
                        <Markdown>{post.body}</Markdown>
                    </div>
                </article>
            </StalkerLayout>
        </>
    )
}
