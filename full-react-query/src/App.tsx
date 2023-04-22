import { useState } from "react";
import {
  MantineProvider,
  type ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./AppRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

export const App = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme: colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <AppRoutes />
        </MantineProvider>
      </ColorSchemeProvider>
    </QueryClientProvider>
  );
};
