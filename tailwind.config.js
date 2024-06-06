const {nextui} = require("@nextui-org/react");

module.exports = {
    content: [
        "./src/**/*.{html,js,jsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [nextui({
        addCommonColors: true,
    })],
}

