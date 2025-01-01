import StalkerLayout from "@/Layouts/StalkerLayout";
import {Category, PageProps, Post} from "@/types";
import {Breadcrumbs} from "@/Components/Breadcrumbs";
import {BlogCover} from "@/Components/BlogCover";
import Markdown from "react-markdown";
import {useLaravelReactI18n} from "laravel-react-i18n";
import useAppRouter from "@/utils/router";
import useFormatDate from "@/utils/useFormat";

type BlogPostProps = {
    category: Category,
    post: Post
}

const useBlogBreadcrumbs = (category: Category, post: Post) => {
    const { t, currentLocale } = useLaravelReactI18n()
    const { route } = useAppRouter()

    return [
        { label: t('Home'), href: route('home') },
        { label: t('Read'), href: '#' },
        { label: category.name, href: `#` },
        { label: post.title, href: route('blog.post', [category.slug, post.slug]) },
    ];
}

export default function BlogPost({ category, post }: PageProps<BlogPostProps>) {
    const breadcrumbs = useBlogBreadcrumbs(category, post);
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
