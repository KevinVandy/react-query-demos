import {
  ActionIcon,
  Group,
  Header,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export const HeaderNavBar = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Header height={60}>
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <ActionIcon
          variant="default"
          onClick={() => toggleColorScheme()}
          size={30}
        >
          {colorScheme === "dark" ? (
            <IconSun size="1rem" />
          ) : (
            <IconMoonStars size="1rem" />
          )}
        </ActionIcon>
      </Group>
    </Header>
  );
};
