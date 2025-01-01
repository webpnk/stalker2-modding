import React from 'react';
import {Post} from "@/types";
import useFormatDate from "@/utils/useFormat";
import {InlineIcon} from "@iconify/react";
import {Link} from "@inertiajs/react";
import useAppRouter from "@/utils/router";

interface PostCardProps {
    post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
    const { route } = useAppRouter();

    const dateFormatter = useFormatDate({
        dateStyle: 'medium',
    })

    if (!post.category) {
        throw new Error('Invalid state!');
    }

    return (
        <Link href={route('blog.post', [post.category.slug, post.slug])} className="stalker-item flex flex-col">
            <div className="relative h-48 mb-4">
                <img
                    src={post.cover_image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 text-xs rounded bg-[#4a2b23]/90 border border-[#c4a782]">
                    <InlineIcon icon="lucide:folder" className="inline"/> {post.category.name}
                  </span>
                </div>
            </div>

            <h3 className="text-xl font-bold text-[#c4a782] mb-2 line-clamp-2">{post.title}</h3>

            <div className="space-y-2 text-sm text-[#8b8b83]">
                <div className="flex items-center gap-2">
                    <InlineIcon icon="lucide:user" className="w-4 h-4 inline" />
                    <span>stalker2-mods</span>
                </div>
                <div className="flex items-center gap-2">
                    <InlineIcon icon="lucide:calendar" className="w-4 h-4 inline" />
                    <span>{dateFormatter.format(new Date(post.published_at))}</span>
                </div>
            </div>
        </Link>
    );
};
