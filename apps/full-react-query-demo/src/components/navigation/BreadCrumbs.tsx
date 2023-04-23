import { Anchor, Breadcrumbs } from '@mantine/core';
import { useMemo } from 'react';

import { Link, useLocation } from 'react-router-dom';

export const BreadCrumbs = () => {
  const { pathname } = useLocation();

  const breadCrumbLinks = useMemo(() => {
    const routes = pathname.split('/');
    routes.shift();
    const links: string[] = [];
    for (let i = 0; i < routes.length + 1; i++) {
      if (routes[i] && routes[i] !== '/')
        if (routes[i] === 'posts') {
          links.push(`/`);
        } else links.push(`/${routes.slice(0, i + 1).join('/')}`);
    }
    return links;
  }, [pathname]);

  if (breadCrumbLinks.length === 1) {
    breadCrumbLinks.unshift('/');
  }

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ paddingBottom: '16px' }}>
      {breadCrumbLinks.map((link, index) => (
        <Link key={index} to={link} style={{ textDecoration: 'none' }}>
          <Anchor
            color="inherit"
            sx={{
              cursor: 'pointer',
              textTransform: 'capitalize',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'hover' },
            }}
          >
            {link === '/' ? 'Home Feed' : link.split('/').pop()}
          </Anchor>
        </Link>
      ))}
    </Breadcrumbs>
  );
};
