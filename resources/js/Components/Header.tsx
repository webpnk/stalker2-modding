import React from 'react';
import {usePage} from "@inertiajs/react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {PageProps} from "@/types";
// import LocaleSwitcher from "@/Components/LocaleSwitcher";
import useSsgRouter from "@/lib/inertia-ssg/router";
import RadiationIcon from "@/Components/Icons/Radiation";
import Link from "@/lib/inertia-ssg/Link";

export const Header = () => {
    const page = usePage<PageProps>();
    const { t } = useLaravelReactI18n();
    const { route } = useSsgRouter()

    return (
        <header className="stalker-panel mb-6 flex items-center justify-between">
            <Link href={route('home')} className="flex items-center">
                <div className="w-16 flex items-center justify-center">
                    <RadiationIcon className="w-8 h-8 text-[#98b37c]"/>
                </div>
                <div>
                    <span className="text-2xl stalker-header">{page.props.app.name}</span>
                    <p className="text-sm opacity-70 pl-1">{t('Community Modding Resources & Tools')}</p>
                </div>
            </Link>

            {/*<LocaleSwitcher />*/}
        </header>
    );
};
