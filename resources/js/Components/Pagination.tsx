import React from 'react';
import Link from "@/lib/inertia-ssg/Link";
import ChevronLeftIcon from "@/Components/Icons/ChevronLeft";
import ChevronRightIcon from "@/Components/Icons/ChevronRight";

interface PaginationProps {
    links: string[];
    meta: {
        current_page: number,
        from: number,
        last_page: number,
        path: string,
        per_page: number,
        to: number,
        total: number,
    },
}

export const Pagination = ({ links, meta }: PaginationProps) => {
    return (
        <div className="flex items-center justify-center gap-2 mt-6">
            <Link
                href={meta.current_page === 1 ? '#' : links[0]}
                data-disabled={meta.current_page === 1}
                className="stalker-item p-2 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed"
            >
                <ChevronLeftIcon className="w-4 h-4" />
            </Link>

            {links.map((link, index) => (
                <Link
                    key={link}
                    href={meta.current_page === index + 1 ? '#' : link}
                    data-disabled={meta.current_page === index + 1}
                    className={`stalker-item w-8 h-8 flex items-center justify-center data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed
                        ${meta.current_page === index + 1 ? 'border-[#c4a782] bg-[#4a2b23]' : ''}`}
                >
                    {index + 1}
                </Link>
            ))}

            <Link
                href={meta.current_page >= links.length ? '#' : links[links.length - 1]}
                data-disabled={meta.current_page >= links.length}
                className="stalker-item p-2 data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed"
            >
                <ChevronRightIcon className="w-4 h-4" />
            </Link>
        </div>
    );
};
