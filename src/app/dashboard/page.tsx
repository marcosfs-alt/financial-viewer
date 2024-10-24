import Dashboard from '@/components/Dashboard/Dashboard';
import { getTransactions } from '@/lib/getTransactions';
import { Box } from '@mui/material';

export default async function DashboardPage() {
  const transactions = await getTransactions();

  return (
    <Box sx={{ width: '100%', height: '100%', p: 8 }}>
      <Dashboard transactions={transactions} />
    </Box>
  );
}
