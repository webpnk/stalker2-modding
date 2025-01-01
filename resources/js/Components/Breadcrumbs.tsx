import {Fragment} from "react";
import {Icon} from "@iconify/react";

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
                        {index > 0 && <Icon icon="lucide:chevron-right" className="w-4 h-4 opacity-50" />}
                        <li>
                            <a
                                href={item.href}
                                title={item.label}
                                className="hover:text-[#98b37c] transition-colors line-clamp-1"
                            >
                                {item.label}
                            </a>
                        </li>
                    </Fragment>
                ))}
            </ol>
        </nav>
    );
}
