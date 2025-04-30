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
          400: "#d93f6c",
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
          100: "#31292b",
          200: "#635356",
          300: "#947c82",
          400: "#c6a6ad",
          500: "#f7cfd8",
          600: "#f9d9e0",
          700: "#fae2e8",
          800: "#fcecef",
          900: "#fdf5f7",
        },
        whiteAccent: {
          100: "#31322a",
          200: "#626354",
          300: "#92957f",
          400: "#c3c6a9",
          500: "#f4f8d3",
          600: "#f6f9dc",
          700: "#f8fbe5",
          800: "#fbfced",
          900: "#fdfef6",
        },
        primary: {
          100: "#212b2b",
          200: "#425656",
          300: "#648080",
          400: "#85abab",
          500: "#a6d6d6",
          600: "#b8dede",
          700: "#cae6e6",
          800: "#dbefef",
          900: "#edf7f7",
        },
        redAccent: {
          100: "#1c1926",
          200: "#39324c",
          300: "#554b72",
          400: "#726498",
          500: "#8e7dbe",
          600: "#a597cb",
          700: "#bbb1d8",
          800: "#d2cbe5",
          900: "#e8e5f2",
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
