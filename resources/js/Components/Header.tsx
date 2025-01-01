import React from 'react';
import {Icon, InlineIcon} from "@iconify/react";
import {Link, usePage} from "@inertiajs/react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {PageProps} from "@/types";
import LocaleSwitcher from "@/Components/LocaleSwitcher";
import useAppRouter from "@/utils/router";

export const Header = () => {
    const page = usePage<PageProps>();
    const { t } = useLaravelReactI18n();
    const { route } = useAppRouter()

    return (
        <header className="stalker-panel mb-6 flex items-center justify-between">
            <Link href={route('home')} className="flex items-center">
                <div className="w-16 flex items-center justify-center">
                    <Icon icon="lucide:radiation" className="w-8 h-8 text-[#98b37c]"/>
                </div>
                <div>
                    <h1 className="text-2xl stalker-header">{page.props.app.name}</h1>
                    <p className="text-sm opacity-70 pl-1">{t('Community Modding Resources & Tools')}</p>
                </div>
            </Link>

            <LocaleSwitcher />
        </header>
    );
};
