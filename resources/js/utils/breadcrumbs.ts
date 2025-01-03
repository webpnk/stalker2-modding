import {useLaravelReactI18n} from "laravel-react-i18n";
import useSsgRouter from "@/lib/inertia-ssg/router";

export default function useBreadcrumbs (items: Array<{ label: string, href: string }>) {
    const { t } = useLaravelReactI18n()
    const { route } = useSsgRouter()

    return [
        { label: t('Home'), href: route('home') },
        ...items,
    ];
}
