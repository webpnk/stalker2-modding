import {useLaravelReactI18n} from "laravel-react-i18n";
import { useRoute, Config } from 'ziggy-js';
import {Ziggy} from "@/ziggy";
import {usePage} from "@inertiajs/react";
import {PageProps} from "@/types";

export default function useSsgRouter() {
    const { props: { app: { currentLocale: initialLocale } } } = usePage<PageProps>()
    const { currentLocale } = useLaravelReactI18n()

    const zRoute = useRoute(Ziggy as unknown as Config);

    const urlLocale = currentLocale() ?? initialLocale;

    const appRoute = (name: string, ...args: any) => zRoute(`${urlLocale}.${name}`, ...args)

    return {
        route: appRoute,
    }
}
