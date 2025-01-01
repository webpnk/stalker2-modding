import { useLaravelReactI18n } from "laravel-react-i18n";

export default function useFormatDate (options?: Intl.DateTimeFormatOptions) {
    const { currentLocale } = useLaravelReactI18n()

    return new Intl.DateTimeFormat(currentLocale(), options);
}
