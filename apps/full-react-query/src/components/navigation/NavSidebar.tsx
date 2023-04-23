import { Navbar } from '@mantine/core';
import { NavbarLinks } from './NavbarLinks';

interface Props {
  opened: boolean;
}

export const NavSidebar = ({ opened }: Props) => {
  return (
    <Navbar
      width={{ base: opened ? 200 : 70 }}
      height={'100vh'}
      p="xs"
      sx={{ transition: 'width 200ms ease-in-out' }}
      zIndex={4}
    >
      <Navbar.Section grow mt="xs">
        <NavbarLinks opened={opened} />
      </Navbar.Section>
      <Navbar.Section>{/* <User /> */}</Navbar.Section>
    </Navbar>
  );
};
