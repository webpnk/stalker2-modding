import React from 'react';
import {Icon} from "@iconify/react";
import {Link} from "@inertiajs/react";

interface PaginationProps {
    data: {
        links: {
            first: string,
            last: string,
            prev: string,
            next: string,
        },
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
}

export const Pagination = ({ data }: PaginationProps) => {
    const pages = Array.from({ length: data.meta.last_page }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <Link
                href={data.links.first}
                data-disabled={data.meta.current_page === 1}
                className="stalker-item p-2 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed"
            >
                <Icon icon="lucide:chevron-left" className="w-4 h-4" />
            </Link>

            {pages.map(page => (
                <Link
                    key={page}
                    href={`${data.meta.path}?page=${page}`}
                    data-disabled={data.meta.current_page === page}
                    className={`stalker-item w-8 h-8 flex items-center justify-center data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed
                        ${data.meta.current_page === page ? 'border-[#c4a782] bg-[#4a2b23]' : ''}`}
                >
                    {page}
                </Link>
            ))}

            <Link
                href={data.links.next}
                data-disabled={data.meta.current_page === data.meta.last_page}
                className="stalker-item p-2 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed"
            >
                <Icon icon="lucide:chevron-right" className="w-4 h-4" />
            </Link>
        </div>
    );
};
