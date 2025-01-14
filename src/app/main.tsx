import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
// import customTheme from "../shared/ui/theme/theme.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider
    // theme={customTheme}
    >
      <App />
    </ChakraProvider>
  </StrictMode>
);
