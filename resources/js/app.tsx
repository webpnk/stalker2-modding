import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import {LaravelReactI18nProvider} from "laravel-react-i18n";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

document.addEventListener('inertia:invalid', (e) => {
    e.preventDefault();
})

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el, <App {...props} />);
            return;
        }

        const root = createRoot(el);

        root.render(
            <LaravelReactI18nProvider
                locale={props.initialPage.props.app.currentLocale}
                fallbackLocale={props.initialPage.props.app.currentLocale}
                files={{}}
            >
                <App {...props} />
            </LaravelReactI18nProvider>
        )
    },
    progress: {
        color: '#4B5563',
    },
});
