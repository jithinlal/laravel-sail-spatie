import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import daisyui from "daisyui";
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    daisyui: {
        themes: [
            {
                "darker": {
                    "primary": "#374151",
                    "secondary": "#6b7280",
                    "accent": "#9ca3af",
                    "neutral": "#e5e7eb",
                    "base-100": "#052537",
                    "info": "#5eead4",
                    "success": "#86efac",
                    "warning": "#fde047",
                    "error": "#fca5a5",
                    "--rounded-btn": "0.25rem",
                }
            },
            {
                "lighter": {
                    "primary": "#f3f4f6",
                    "secondary": "#d1d5db",
                    "accent": "#9ca3af",
                    "neutral": "#161807",
                    "base-100": "#fcfcfc",
                    "info": "#7dd3fc",
                    "success": "#6ee7b7",
                    "warning": "#fde047",
                    "error": "#f87171",
                    "--rounded-btn": "0.25rem",
                }
            }
        ],
    },

    plugins: [forms, typography, daisyui],
};
