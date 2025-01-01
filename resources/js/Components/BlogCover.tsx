import React from 'react';

interface BlogCoverProps {
    imageUrl: string;
    title: string;
    date: string;
}

export const BlogCover = ({ imageUrl, title, date }: BlogCoverProps) => {
    return (
        <div className="stalker-panel overflow-hidden">
            <div className="relative h-[300px]">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h1 className="text-3xl font-bold text-[#c4a782] mb-2">{title}</h1>
                    <time className="text-sm opacity-70">{date}</time>
                </div>
            </div>
        </div>
    );
}
