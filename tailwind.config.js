/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    theme: {
        container: {
            center: true,
        },
        fontFamily: {
            sans: ["Poppins", "sans-serif"],
        },
        extend: {
            backgroundImage: {
                home: "url('/assets/images/banner.jpg')",
            },
            dropShadow: {
                "3xl": "0 35px 35px rgba(0,0,0,0.5)",
            },
            keyframes: {
                moveForever1: {
                    "0%": { transform: "translate(85px, 0%)" },
                    "100%": { transform: "translate(-90px, 0%)" },
                },
                moveForever2: {
                    "0%": { transform: "translate(-90px, 0%)" },
                    "100%": { transform: "translate(85px, 0%)" },
                },
                moveForever3: {
                    "0%": { transform: "translate(85px, 0%)" },
                    "100%": { transform: "translate(-90px, 0%)" },
                },
                moveForever4: {
                    "0%": { transform: "translate(-90px, 0%)" },
                    "100%": { transform: "translate(85px, 0%)" },
                },
            },
            animation: {
                moveForever1: "moveForever1 10s linear infinite",
                moveForever2: "moveForever2 8s linear infinite",
                moveForever3: "moveForever3 6s linear infinite",
                moveForever4: "moveForever4 4s linear infinite",
            },
        },
    },
    plugins: [],
};
