import { useContext, useState, useMemo, createContext } from "react";
import { createTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "#cccccc",
          200: "#999999",
          300: "#666666",
          400: "#333333",
          500: "#000000",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
        secondary: {
          100: "#f5cfda",
          200: "#ec9fb5",
          300: "#e26f91",
          400: "#333333",
          500: "#cf0f47",
          600: "#a60c39",
          700: "#7c092b",
          800: "#53061c",
          900: "#29030e",
        },
        redAccent: {
          100: "#ffcedd",
          200: "#ff9dbb",
          300: "#ff6d99",
          400: "#ff3c77",
          500: "#ff0b55",
          600: "#cc0944",
          700: "#990733",
          800: "#660422",
          900: "#330211",
        },
        whiteAccent: {
          100: "#fff8f8",
          200: "#fff2f2",
          300: "#ffebeb",
          400: "#ffe5e5",
          500: "#ffdede",
          600: "#ccb2b2",
          700: "#998585",
          800: "#665959",
          900: "#332c2c",
        },
      }
    : {
        secondary: {
          100: "#fbfaf7",
          200: "#f7f4ee",
          300: "#f2efe6",
          400: "#eee9dd",
          500: "#eae4d5",
          600: "#bbb6aa",
          700: "#8c8980",
          800: "#5e5b55",
          900: "#2f2e2b",
        },
        redAccent: {
          900: "#f0efec",
          200: "#e2dfd9",
          300: "#d3d0c5",
          800: "#c5c0b2",
          500: "#b6b09f",
          600: "#928d7f",
          700: "#6d6a5f",
          400: "#eee9dd",
          100: "#242320",
        },
        primary: {
          100: "#fcfcfc",
          700: "#fafafa",
          300: "#f7f7f7",
          400: "#f5f5f5",
          500: "#f2f2f2",
          800: "#c2c2c2",
          200: "#919191",
          600: "#616161",
          900: "#303030",
        },
        whiteAccent: {
          100: "#cccccc",
          200: "#999999",
          300: "#666666",
          400: "#333333",
          500: "#000000",
          600: "#000000",
          700: "#000000",
          800: "#000000",
          900: "#000000",
        },
      }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);
  //   console.log(colors);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary["500"],
            },
            secondary: {
              main: colors.redAccent["500"],
            },
            neutral: {
              dark: colors.primary["700"],
              main: colors.primary["500"],
              light: colors.primary["100"],
            },
            background: {
              default: colors.secondary["500"],
            },
          }
        : {
            primary: {
              main: colors.primary["500"],
            },
            secondary: {
              main: colors.redAccent["500"],
            },
            neutral: {
              dark: colors.primary["700"],
              main: colors.primary["500"],
              light: colors.primary["100"],
            },
            background: {
              default: colors.secondary["500"],
            },
          }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};
