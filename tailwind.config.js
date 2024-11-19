/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                textPrimary: '#000000',
                bgPrimary: '#fafafa',
                textLight: '#FFFFFF',
                dark: '#0D0D0D',
                textAccent: '#878787',
                accent: '#333',
                'accent-2': '#8D9091',
                'accent-3': '#C9C9C9',
                'accent-4': '#545045',
                'accent-5': '#959595',
                'accent-6': '#5B5B5B',
                'accent-7': '#A2A2A2',
                lightGray: '#E5E5E5',
                'lightGray-2': '#959595',
                'lightGray-3': '#F0F0F0',
                'lightGray-4': '#545045',
                'lightGray-5': '#EFEFEF',
                'lightGray-6': '#B3B3B3',
                'lightGray-7': '#F2F2F2',
                'lightGray-8': '#A0A0A051',
                'lightGray-9': '#E9E9E9',
                primary: {
                    red: '#FF0000',
                },
            },
            borderRadius: {
                10: '10px',
            },
        },
    },
    plugins: [],
};
