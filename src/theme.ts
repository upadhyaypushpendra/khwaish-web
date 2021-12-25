import { grey, blue, lightBlue, red, deepOrange } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";

const getPalette = (mode: PaletteMode) => {
  const palette = {
    mode,
    primary: {
      light: lightBlue["A400"],
      main: blue["A400"],
      dark: blue["A400"],
      contrastText: "#ffffff"
    },
    secondary: {
      light: blue[100],
      main: blue[400],
      dark: blue[400],
      contrastText: "#ffffff"
    },
    error: {
      light: red[500],
      main: red[700],
      dark: red[800],
      contrastText: grey[50]
    },
    warning: {
      light: deepOrange[400],
      main: deepOrange[600],
      dark: deepOrange[700],
      contrastText: grey["A100"]
    },
    info: {
      light: lightBlue["A400"],
      main: blue["A400"],
      dark: blue["A400"],
      contrastText: "#ffffff"
    },
    success: {
      light: lightBlue["A400"],
      main: blue["A400"],
      dark: blue["A400"],
      contrastText: "#ffffff"
    },
    contrastThreshold: 3
  };

  if (mode === "light") {
    return {
      ...palette,
      background: {
        default: grey[50],
        paper: grey[100]
      }
    };
  } else if (mode === "dark") {
    return {
      ...palette,
      background: {
        default: grey[800],
        paper: grey[800]
      }
    };
  }
};

const getThemeDesign = (mode: PaletteMode) => ({
  palette: getPalette(mode)
  // palette: {
  //   ...(mode === "light"
  //     ? {
  //         // palette values for light mode
  //         primary: blue["A400"],
  //         divider: blue[700],
  //         text: {
  //           primary: grey[900],
  //           secondary: grey[800]
  //         }
  //       }
  //     : {
  //         // palette values for dark mode
  //         primary: blue["A400"],
  //         divider: blue[700],
  //         background: {
  //           default: grey[800],
  //           paper: grey[800]
  //         },
  //         text: {
  //           primary: "#fff",
  //           secondary: grey[50]
  //         }
  //       })
  // }
});

export { getThemeDesign };
