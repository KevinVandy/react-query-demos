import { useState, useEffect, lazy, Suspense, type ReactNode } from 'react';
import {
  MantineProvider,
  ColorSchemeProvider,
  type ColorScheme,
} from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './Theme';

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

interface Props {
  children: ReactNode;
}

export const AppProviders = ({ children }: Props) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    () => (localStorage.getItem('colorScheme') as ColorScheme) || 'light',
  );
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    localStorage.setItem('colorScheme', colorScheme);
  }, [colorScheme]);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={theme(colorScheme)}
            withGlobalStyles
            withNormalizeCSS
          >
            {children}
            <Suspense fallback={null}>
              <ReactQueryDevtoolsProduction />
            </Suspense>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
