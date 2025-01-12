import React from 'react';
import {Post} from "@/types";
import useFormatDate from "@/utils/useFormat";
import Link from "@/lib/inertia-ssg/Link";
import useSsgRouter from "@/lib/inertia-ssg/router";
import FolderIcon from "@/Components/Icons/FolderIcon";
import UserIcon from "@/Components/Icons/User";
import CalendarIcon from "@/Components/Icons/Calendar";

interface PostCardProps {
    post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
    const { route } = useSsgRouter();

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
                  <span className="px-2 py-1 text-xs rounded bg-[#4a2b23]/90 border border-[#c4a782] line-clamp-1">
                    <FolderIcon className="inline"/> {post.category.name}
                  </span>
                </div>
            </div>

            <h3 className="text-xl font-bold text-[#c4a782] mb-2 line-clamp-2">{post.title}</h3>

            <div className="space-y-2 text-sm text-[#8b8b83]">
                <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 inline" />
                    <span>stalker2mods.pro</span>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 inline" />
                    <span>{dateFormatter.format(new Date(post.published_at))}</span>
                </div>
            </div>
        </Link>
    );
};
