import { useState, type ReactNode } from "react";
import {
  MantineProvider,
  type ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

interface Props {
  children: ReactNode;
}

export const AppProviders = ({ children }: Props) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <BrowserRouter>
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
            {children}
            {/* <ReactQueryDevtools /> */}
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
