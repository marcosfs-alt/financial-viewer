'use client';

import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Drawer,
  Button,
  useMediaQuery,
} from '@mui/material';
import Link from 'next/link';
import { useLogout } from '@/hooks/useLogout';
import { blue } from '@mui/material/colors';

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:1024px)');
  const logout = useLogout();

  return isMobile ? (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        sx={{
          width: '30px',
          height: '30px',
          color: 'white',
          fontSize: '32px',
          fontWeight: 800,
          borderRight: '1px solid black',
          borderBottom: '1px solid black',
        }}
      >
        &#8801;
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 240,
            height: '100vh',
            backgroundColor: 'white',
            borderRight: '1px solid #e0e0e0',
            borderRadius: '0 8px 8px 0',
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
      </Drawer>
    </>
  ) : (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        backgroundColor: 'white',
        borderRight: '1px solid #e0e0e0',
        borderRadius: '0 8px 8px 0',
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
