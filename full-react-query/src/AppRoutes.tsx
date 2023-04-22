import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ActionIcon,
  AppShell,
  Group,
  Header,
  Navbar,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
  },
]);

export const AppRoutes = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <AppShell
      padding="md"
      fixed={false}
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <Navbar.Section grow mt="xs">
            {/* <MainLinks /> */}
          </Navbar.Section>
          <Navbar.Section>{/* <User /> */}</Navbar.Section>
        </Navbar>
      }
      header={
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
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <RouterProvider router={router} />
    </AppShell>
  );
};
