import {InlineIcon} from "@iconify/react";
import {Link, router, useForm, usePage} from "@inertiajs/react";
import React from "react";
import {useLaravelReactI18n} from "laravel-react-i18n";
import {PageProps} from "@/types";

export default function LocaleSwitcher() {
    const { currentLocale, getLocales, setLocale } = useLaravelReactI18n();
    const { props } = usePage<PageProps>()

    const onSwitch = (newLocale: string) => {
        setLocale(newLocale)
    }

    return (
        <div className="dropdown dropdown-end mr-2">
            <div tabIndex={0} role="button"
                 className="btn uppercase pl-4 pr-3 py-1 rounded bg-stalker-rust-950 hover:bg-stalker-rust-900 border-0">
                {currentLocale()}
                <InlineIcon icon="lucide:chevron-down"/>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-stalker-rust-900 rounded z-[1] w-52 p-2 mt-2 shadow">
                {getLocales().map((locale) => (
                    <li key={locale}>
                        <Link className="uppercase" onSuccess={() => onSwitch(locale)} as="button" href={props.localizedUrls[locale]}>{locale}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
