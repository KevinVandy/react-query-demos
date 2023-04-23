import { Navbar } from "@mantine/core";
import { NavbarLinks } from "./NavbarLinks";

export const NavSidebar = () => {
  return (
    <Navbar width={{ base: 300 }} height={500} p="xs">
      <Navbar.Section grow mt="xs">
        <NavbarLinks />
      </Navbar.Section>
      <Navbar.Section>{/* <User /> */}</Navbar.Section>
    </Navbar>
  );
};
