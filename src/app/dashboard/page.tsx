import Dashboard from '@/components/Dashboard/Dashboard';
import { getTransactions } from '@/lib/getTransactions';

export default async function DashboardPage() {
  const transactions = await getTransactions();

  return <Dashboard transactions={transactions} />;
}
