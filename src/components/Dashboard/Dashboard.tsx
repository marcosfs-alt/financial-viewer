'use client';

import { FiltersProps, Transaction } from '@/types';
import { Box, Grid2 } from '@mui/material';
import SummaryCards from './SummaryCards';
import { useCallback, useEffect, useState } from 'react';
import Filters from './Filters';
import BarChart from '../Charts/Barchart';

const Dashboard = ({ transactions }: { transactions: Transaction[] }) => {
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(transactions);
  const [filters, setFilters] = useState<FiltersProps>({
    dateRange: {
      startDate: null,
      endDate: null,
    },
    accounts: [],
    industries: [],
    states: [],
  });

  const applyFilters = useCallback(() => {
    let filtered = transactions;

    if (filters.dateRange.startDate || filters.dateRange.endDate) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const startDate = filters.dateRange.startDate;
        const endDate = filters.dateRange.endDate;

        return (
          (!startDate || transactionDate >= startDate) &&
          (!endDate || transactionDate <= endDate)
        );
      });
    }

    if (filters.accounts.length > 0) {
      filtered = filtered.filter((transaction) =>
        filters.accounts.includes(transaction.account),
      );
    }

    if (filters.industries.length > 0) {
      filtered = filtered.filter((transaction) =>
        filters.industries.includes(transaction.industry),
      );
    }

    if (filters.states.length > 0) {
      filtered = filtered.filter((transaction) =>
        filters.states.includes(transaction.state),
      );
    }

    setFilteredTransactions(filtered);
  }, [filters, transactions]);

  useEffect(() => {
    applyFilters();
  }, [filters, applyFilters]);

  return (
    <Box sx={{ padding: 4, gap: 8, display: 'flex', flexDirection: 'column' }}>
      <Grid2 size={12}>
        <Filters
          allTransactions={transactions}
          filters={filters}
          setFilters={setFilters}
        />
      </Grid2>
      <Grid2
        size={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Grid2
          size={2}
          sx={{
            height: '40vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SummaryCards transactions={filteredTransactions} />
        </Grid2>
        <Grid2
          size={10}
          sx={{
            height: '40vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BarChart transactions={filteredTransactions} />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Dashboard;
