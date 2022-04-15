"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("windicss/helpers");
const colors_1 = require("windicss/colors");
const plugin_1 = require("windicss/plugin");
exports.default = (0, helpers_1.defineConfig)({
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                'sm': '640px',
                'md': '768px',
                'lg': '1024px',
                'xl': '1280px',
                '2xl': '1536px',
            },
            colors: {
                blue: colors_1.default.sky,
                red: colors_1.default.rose,
                pink: colors_1.default.fuchsia,
            },
            fontFamily: {
                sans: ['Graphik', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
            spacing: {
                128: '32rem',
                144: '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
    plugins: [
        (0, plugin_1.default)(({ addUtilities }) => {
            const newUtilities = {
                '.skew-10deg': {
                    transform: 'skewY(-10deg)',
                },
                '.skew-15deg': {
                    transform: 'skewY(-15deg)',
                },
            };
            addUtilities(newUtilities);
        }),
        (0, plugin_1.default)(({ addComponents }) => {
            const buttons = {
                '.btn': {
                    padding: '.5rem 1rem',
                    borderRadius: '.25rem',
                    fontWeight: '600',
                },
                '.btn-blue': {
                    'backgroundColor': '#3490dc',
                    'color': '#fff',
                    '&:hover': {
                        backgroundColor: '#2779bd',
                    },
                },
                '.btn-red': {
                    'backgroundColor': '#e3342f',
                    'color': '#fff',
                    '&:hover': {
                        backgroundColor: '#cc1f1a',
                    },
                },
            };
            addComponents(buttons);
        }),
        (0, plugin_1.default)(({ addDynamic, variants }) => {
            addDynamic('skew', ({ Utility, Style }) => {
                return Utility.handler
                    .handleStatic(Style('skew'))
                    .handleNumber(0, 360, 'int', number => `skewY(-${number}deg)`)
                    .createProperty('transform');
            }, variants('skew'));
        }),
        require('windicss/plugin/filters'),
        require('windicss/plugin/forms'),
        require('windicss/plugin/aspect-ratio'),
        require('windicss/plugin/line-clamp'),
        require('windicss/plugin/typography')({
            modifiers: ['DEFAULT', 'sm', 'lg', 'red'],
        }),
    ],
});
//# sourceMappingURL=windi.config.js.map