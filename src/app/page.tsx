import { Box } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <main>
        <Link href="/login">
          <button>login</button>
        </Link>
      </main>
      <footer></footer>
    </Box>
  );
}
