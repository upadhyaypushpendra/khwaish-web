import { grey, blue, lightBlue, red, deepOrange } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";

const getPalette = (mode: PaletteMode = "light") => {
    const palette = {
        mode,
        primary: {
            dark: '#8e24aa',
            main: '#7b1fa2',
            light: "#9a4abd"
        },
        secondary: {
            light: "#bdbdbd",
            main: "#9e9e9e",
            dark: "#e0e0e0",
        }
    };

    if (mode === "light" as PaletteMode) {
        return {
            ...palette,
            background: {
                default: grey[200],
                paper: grey[100]
            }
        };
    } else if (mode === "dark" as PaletteMode) {
        return {
            ...palette,
            background: {
                default: grey[900],
                paper: grey[800]
            }
        };
    }
    return palette;
};

const getThemeDesign = (mode: PaletteMode) => ({
    palette: getPalette(mode),
    typography: {
        fontFamily: [
            'Source Sans Pro Bold',
            'sans-serif',
            'Arial',
            'Apple Color Emoji',
            'Segoe UI Emoji',
            'Segoe UI Symbol',
        ].join(','),
    },
});

export { getThemeDesign };
