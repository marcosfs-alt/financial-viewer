'use client';

import React from 'react';
import { Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import Link from 'next/link';
import { useLogout } from '@/hooks/useLogout';
import { blue } from '@mui/material/colors';

const Sidebar: React.FC = () => {
  const logout = useLogout();

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
          <ListItem sx={{ ':hover': { color: blue[900] } }}>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Divider />
        <ListItem
          onClick={logout}
          sx={{ cursor: 'pointer', ':hover': { color: blue[900] } }}
        >
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
