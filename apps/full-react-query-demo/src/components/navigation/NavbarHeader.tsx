import {
  ActionIcon,
  Burger,
  Flex,
  Group,
  Header,
  Title,
  Tooltip,
  useMantineColorScheme,
} from '@mantine/core';
import { IconBrandGithub, IconMoonStars, IconSun } from '@tabler/icons-react';

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
        <Flex gap="1rem">
          <Tooltip withArrow label="Github">
            <a
              href="https://github.com/KevinVandy/react-query-demos"
              rel="noopener"
              target="_blank"
            >
              <ActionIcon
                aria-label="Github"
                sx={{
                  '&:hover': { backgroundColor: 'transparent' },
                }}
              >
                <IconBrandGithub />
              </ActionIcon>
            </a>
          </Tooltip>
          <Tooltip withArrow label="Toggle light/dark mode">
            <ActionIcon onClick={() => toggleColorScheme()}>
              {colorScheme === 'dark' ? (
                <IconSun size="1rem" />
              ) : (
                <IconMoonStars size="1rem" />
              )}
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Group>
    </Header>
  );
};
