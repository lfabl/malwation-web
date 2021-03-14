const palettes = {
    "light": require("./palettes/light.json"),
    "dark": require("./palettes/dark.json")
};

const GenerateThemeColors = (theme) => {
    let colors = palettes[theme];
    colors.background = palettes[theme].gray96;
    colors.body = palettes[theme].gray10;
    return colors;
};
export default GenerateThemeColors;