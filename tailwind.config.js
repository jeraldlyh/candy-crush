const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}"],
    mode: "jit",
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", ...defaultTheme.fontFamily.sans]
            },
            width: {
                "board": "40rem",
                "box": "4.375rem",
            },
            height: {
                "board": "35rem",
                "box": "4.375rem",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
