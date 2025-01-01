import {useLaravelReactI18n} from "laravel-react-i18n";
import useAppRouter from "@/utils/router";

export default function useBreadcrumbs (items: Array<{ label: string, href: string }>) {
    const { t } = useLaravelReactI18n()
    const { route } = useAppRouter()

    return [
        { label: t('Home'), href: route('home') },
        ...items,
    ];
}
