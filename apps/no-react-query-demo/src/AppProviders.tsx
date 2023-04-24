import { useState, type ReactNode, useEffect } from 'react';
import {
  MantineProvider,
  ColorSchemeProvider,
  type ColorScheme,
} from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './Theme';

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
        </MantineProvider>
      </ColorSchemeProvider>
    </BrowserRouter>
  );
};
