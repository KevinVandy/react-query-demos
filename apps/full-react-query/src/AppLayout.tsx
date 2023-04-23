import { type ReactNode } from "react";
import { AppShell } from "@mantine/core";
import { HeaderNavBar } from "./components/navigation/Header";
import { NavSidebar } from "./components/navigation/NavSidebar";

interface Props {
  children: ReactNode;
}

export const AppLayout = ({ children }: Props) => {
  return (
    <AppShell
      padding="md"
      fixed={false}
      navbar={<NavSidebar />}
      header={<HeaderNavBar />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};
