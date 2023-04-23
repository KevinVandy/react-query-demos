import { type ReactNode } from 'react';
import { AppShell, Box } from '@mantine/core';
import { NavbarHeader } from './components/navigation/NavbarHeader';
import { NavSidebar } from './components/navigation/NavSidebar';
import { useDisclosure } from '@mantine/hooks';
import { BreadCrumbs } from './components/navigation/BreadCrumbs';

interface Props {
  children: ReactNode;
}

export const AppLayout = ({ children }: Props) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <AppShell
      padding="md"
      fixed={true}
      navbar={<NavSidebar opened={opened} />}
      header={<NavbarHeader opened={opened} toggle={toggle} />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Box
        sx={{
          maxWidth: '1400px',
          margin: 'auto',
          padding: '1rem',
          paddingBottom: '500px',
        }}
      >
        <BreadCrumbs />
        {children}
      </Box>
    </AppShell>
  );
};
