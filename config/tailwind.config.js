module.exports = {
    content: [
        "./app/views/**/*.html.erb",
        "./app/helpers/**/*.rb",
        "./app/javascript/**/*.js",
        "./app/assets/stylesheets/**/*.css",
        "./app/assets/tailwind/**/*.css",
         "./app/**/*.{html,erb,rb,js,css}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["K2D", "sans-serif"], // Set 'K2D' as the default font
            },
            colors: {
                primary: {
                    DEFAULT: "#7D58BF",
                    dark: "#343436",
                    light: "#9E80E5",
                },
            },
        },
    },
    plugins: [],
}
