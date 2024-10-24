import { Box, Button } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
      height="100vh"
    >
      <header>
        <Box
          sx={{
            width: '100vw',
            height: 11 / 12,
            p: 2,
            borderBottom: '1px solid ',
          }}
        >
          <Link href="/login">
            <Button variant="contained" sx={{ color: 'white' }}>
              login
            </Button>
          </Link>
        </Box>
      </header>
      <main></main>
      <footer></footer>
    </Box>
  );
}
