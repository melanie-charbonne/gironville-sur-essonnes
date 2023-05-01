/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                base: [
                    'ITCAvantGardeStdBk',
                    'Helvetica',
                    'Arial',
                    'sans-serif',
                ],
                medium: [
                    'ITCAvantGardeStdMd',
                    'Helvetica',
                    'Arial',
                    'sans-serif',
                ],
                hn: ['Nunito', 'Helvetica', 'Arial', 'sans-serif'],
                fontAwesome: ['FontAwesome'],
            },
            colors: {
                blue: {
                    darker: '#37536C',
                    dark: '#40607D',
                    medium: '#649BCE',
                    light: '#DBF2F2',
                    70: 'rgba(100, 190, 196, .7)',
                    30: 'rgba(100, 190, 196, .3)',
                },
                grey: {
                    79: '#797979',
                    dark: '#4A4A4A',
                    E6: '#E6E6E6',
                    AF: '#AFAFAF',
                },
            },
        },
    },
    plugins: [],
}
