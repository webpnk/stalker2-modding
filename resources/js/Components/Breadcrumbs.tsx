import {Fragment} from "react";
import ChevronRightIcon from "@/Components/Icons/ChevronRight";
import Link from "@/lib/inertia-ssg/Link";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <nav className="stalker-panel px-3 py-2">
            <ol className="flex items-center space-x-2 text-sm">
                {items.map((item, index) => (
                    <Fragment key={item.label}>
                        {index > 0 && <ChevronRightIcon className="w-4 h-4 opacity-50" />}
                        <li>
                            <Link
                                href={item.href}
                                title={item.label}
                                className="hover:text-[#98b37c] transition-colors line-clamp-1"
                            >
                                {item.label}
                            </Link>
                        </li>
                    </Fragment>
                ))}
            </ol>
        </nav>
    );
}
