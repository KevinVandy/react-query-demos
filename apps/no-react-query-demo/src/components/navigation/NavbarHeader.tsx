import {
  ActionIcon,
  Burger,
  Group,
  Header,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

interface Props {
  opened: boolean;
  toggle: () => void;
}

export const NavbarHeader = ({ opened, toggle }: Props) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const label = opened ? 'Close navigation' : 'Open navigation';

  return (
    <Header height={60} zIndex={4}>
      <Group sx={{ height: '100%' }} px={20} position="apart">
        <Burger opened={opened} onClick={toggle} aria-label={label} />
        <Title order={1}>React Query Demo</Title>
        <ActionIcon
          variant="default"
          onClick={() => toggleColorScheme()}
          size={30}
        >
          {colorScheme === 'dark' ? (
            <IconSun size="1rem" />
          ) : (
            <IconMoonStars size="1rem" />
          )}
        </ActionIcon>
      </Group>
    </Header>
  );
};
