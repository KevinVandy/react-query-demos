import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { IconHome, IconUsersGroup } from '@tabler/icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';

interface MainLinkProps {
  icon: ReactNode;
  color: string;
  label: string;
  href: string;
  opened: boolean;
}

export const NavbarLink = ({
  icon,
  color,
  label,
  href,
  opened,
}: MainLinkProps) => {
  return (
    <Link to={href} style={{ textDecoration: 'none' }}>
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
      >
        <Group sx={{ display: 'flex', flexWrap: 'nowrap' }}>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>
          {opened ? (
            <Text size="sm" sx={{ whiteSpace: 'nowrap' }}>
              {label}
            </Text>
          ) : null}
        </Group>
      </UnstyledButton>
    </Link>
  );
};

const data = [
  {
    icon: <IconHome size="1rem" />,
    color: 'blue',
    label: 'Home Feed',
    href: '/',
  },
  {
    icon: <IconUsersGroup size="1rem" />,
    color: 'teal',
    label: 'Users',
    href: '/users',
  },
];

interface Props {
  opened: boolean;
}

export const NavbarLinks = ({ opened }: Props) => {
  const links = data.map((link) => (
    <NavbarLink {...link} key={link.label} opened={opened} />
  ));
  return <div>{links}</div>;
};
