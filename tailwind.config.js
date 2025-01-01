import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'stalker-rust': {
                    '50': '#faf6f0',
                    '100': '#efe6d6',
                    '200': '#decba9',
                    '300': '#cdad7c',
                    '400': '#c1955e',
                    '500': '#b67d4a',
                    '600': '#a0643f',
                    '700': '#864d37',
                    '800': '#6e4032',
                    '900': '#4a2b23',
                    '950': '#331a15',
                },
                'stalker-text': '#c4a782',
                'stalker-grid': '#1a1a1a',
                'stalker-background': '#0a0a0a',
                'olivine': {
                    '50': '#f3f6ef',
                    '100': '#e4ecdb',
                    '200': '#ccdbbb',
                    '300': '#acc393',
                    '400': '#98b37c',
                    '500': '#709052',
                    '600': '#56723e',
                    '700': '#445833',
                    '800': '#39482c',
                    '900': '#323e29',
                    '950': '#192013',
                },

            },
            typography: ({ theme }) => ({
                stalker: {
                    css: {
                        '--tw-prose-counters': theme('colors.stalker-text'),
                        '--tw-prose-bullets': theme('colors.stalker-text'),
                        '--tw-prose-bold': theme('colors.stalker-text'),
                        '--tw-prose-quotes': theme('colors.olivine.500'),
                        '--tw-prose-links': theme('colors.olivine.200'),
                        '--tw-prose-code': theme('colors.stalker-rust.600'),
                    },
                },
            }),
        },
    },

    plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
