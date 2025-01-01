import {useLaravelReactI18n} from "laravel-react-i18n";

export default function useAppRouter() {
    const { currentLocale } = useLaravelReactI18n()
    const appRoute = (name: string, ...args: any) => route(`${currentLocale()}.${name}`, ...args)

    return {
        route: appRoute,
    }
}
