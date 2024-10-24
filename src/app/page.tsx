// src/app/page.tsx

'use client';

import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useLogout } from '@/hooks/useLogout';

export default function Home() {
  const isAuthenticated = useAuth();
  const logout = useLogout();

  if (isAuthenticated === null) {
    return null;
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
      height="100vh"
    >
      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height="100vh"
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              color: 'white',
              fontWeight: 600,
              textJustify: 'center',
              textAlign: 'center',
            }}
          >
            Bem-vindo ao Financial Viewer
          </Typography>
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" passHref>
                <Button variant="contained" color="primary" sx={{ m: 1 }}>
                  Dashboard
                </Button>
              </Link>
              <Button
                variant="contained"
                color="secondary"
                onClick={logout}
                sx={{ m: 1 }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login" passHref>
              <Button variant="contained" color="primary" sx={{ m: 1 }}>
                Fazer Login
              </Button>
            </Link>
          )}
        </Box>
      </main>
      <footer></footer>
    </Box>
  );
}
