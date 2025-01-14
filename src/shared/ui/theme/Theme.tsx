// theme.ts
import { extendTheme } from "@chakra-ui/react";

// Extend the theme
const customTheme = extendTheme({
  colors: {
    brand: {
      50: "#e3f2f9",
      100: "#c5e4f3",
      200: "#a2d4ec",
      300: "#7ac1e4",
      400: "#47a9da",
      500: "#0088cc", // Custom primary color
      600: "#007ab8",
      700: "#006ba1",
      800: "#005885",
      900: "#FFC0CB",
    },
  },
  fonts: {
    heading: `'Times New Roman', sans-serif`,
    body: `'Times New Roman', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "gray.800",
      },
    },
  },
});

export default customTheme;
