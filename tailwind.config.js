/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            desktop: "1440px",
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-rubik)'],
                mono: ['var(--font-rubik)'],
            },
        },
        container: {
            padding: '30px',
            center:true,
            screens: {
                desktop: "1440px",
            },
        },
    },
    plugins: [],
}