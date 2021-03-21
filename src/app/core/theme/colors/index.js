const palettes = {
    "light": require("./palettes/light.json"),
    "dark": require("./palettes/dark.json")
};

const GenerateThemeColors = (theme) => {
    let colors = palettes[theme];
    colors.contrastBody = palettes[theme].gray92;
    colors.background = palettes[theme].gray96;
    colors.seperator = palettes[theme].gray80;
    colors.hideText = palettes[theme].gray50;
    colors.layer1 = palettes[theme].gray92;
    colors.layer2 = palettes[theme].gray90;
    colors.panel = palettes[theme].gray94;
    colors.body = palettes[theme].gray10;
    return colors;
};
export default GenerateThemeColors;