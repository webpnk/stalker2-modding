import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { RouteName } from 'ziggy-js';
import { route } from '../../vendor/tightenco/ziggy';
import {LaravelReactI18nProvider} from "laravel-react-i18n";

createServer((page) =>
    createInertiaApp({
        page,
        title: title => title,
        render: ReactDOMServer.renderToString,
        resolve: (name) =>
            resolvePageComponent(
                `./Pages/${name}.tsx`,
                import.meta.glob('./Pages/**/*.tsx'),
            ),
        setup: ({ App, props }) => {
            /* eslint-disable */
            // @ts-expect-error
            global.route<RouteName> = (name, params, absolute) =>
                route(name, params as any, absolute, {
                    ...page.props.ziggy,
                    location: new URL(page.props.ziggy.location),
                });
            /* eslint-enable */

            return (
                <LaravelReactI18nProvider
                    locale={props.initialPage.props.app.currentLocale}
                    fallbackLocale={'en'}
                    files={{}}
                >
                    <App {...props} />)
                </LaravelReactI18nProvider>
            );
        },
    }),
);
