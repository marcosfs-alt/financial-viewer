'use client';

import React from 'react';
import { Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Sidebar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('authToken');
    router.push('/login');
  };

  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        backgroundColor: 'white',
        borderRight: '1px solid #e0e0e0',
        position: 'inline-block',
      }}
    >
      <List component="nav">
        <Link href="/" passHref>
          <ListItem component="a">
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Divider />
        <ListItem onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
