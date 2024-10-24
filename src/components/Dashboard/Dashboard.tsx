'use client';

import { FiltersProps, Transaction } from '@/types';
import { Grid2 } from '@mui/material';
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
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Filters
          allTransactions={transactions}
          filters={filters}
          setFilters={setFilters}
        />
      </Grid2>
      <Grid2 size={12} sx={{ display: 'flex' }}>
        <SummaryCards transactions={filteredTransactions} />
        <BarChart transactions={filteredTransactions} />
      </Grid2>
    </Grid2>
  );
};

export default Dashboard;
