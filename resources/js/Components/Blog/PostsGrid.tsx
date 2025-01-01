import React from 'react';
import { PostCard } from './PostCard';
import {Post} from "@/types";

export const PostsGrid = ({ posts }: { posts: Post[] }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};
