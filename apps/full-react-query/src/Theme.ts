import { ColorScheme } from '@mantine/core';

export const theme = (colorScheme: ColorScheme) => ({
  colorScheme: colorScheme,
  components: {
    Card: {
      defaultProps: {
        shadow: 'sm',
        padding: 'md',
        radius: 'md',
        withBorder: true,
      },
    },
    Loader: {
      defaultProps: {
        variant: 'dots',
      },
    },
  },
});
