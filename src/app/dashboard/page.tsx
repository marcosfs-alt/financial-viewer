import Dashboard from '@/components/Dashboard/Dashboard';
import Sidebar from '@/components/Dashboard/Sidebar';
import { getTransactions } from '@/lib/getTransactions';
import { Box } from '@mui/material';

export default async function DashboardPage() {
  const transactions = await getTransactions();

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: {
          xs: 'column',
          lg: 'row',
        },
      }}
    >
      <Sidebar />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Dashboard transactions={transactions} />
      </Box>
    </Box>
  );
}
