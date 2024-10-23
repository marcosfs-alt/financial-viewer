import LoginCard from '@/components/Login/LoginCard';
import { Box } from '@mui/material';

export default function LoginPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <LoginCard />
    </Box>
  );
}
