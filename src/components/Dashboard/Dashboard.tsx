'use client';

import { DataType, FiltersProps, Transaction } from '@/types';
import { Box, Button, Grid2, useMediaQuery } from '@mui/material';
import SummaryCards from './SummaryCards';
import { Suspense, lazy, useCallback, useMemo, useState } from 'react';
import Filters from './Filters';
import { grey } from '@mui/material/colors';
import BlueSpinner from '../Loading/BlueSpinner';
const BarChart = lazy(() => import('../Charts/Barchart'));
const LineChart = lazy(() => import('../Charts/Linechart'));

const Dashboard = ({ transactions }: { transactions: Transaction[] }) => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const [filters, setFilters] = useState<FiltersProps>({
    dateRange: {
      startDate: null,
      endDate: null,
    },
    accounts: [],
    industries: [],
    states: [],
  });
  const [dataType, setDataType] = useState<DataType>(DataType.T);

  const filteredTransactions = useMemo(() => {
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

    return filtered;
  }, [filters, transactions]);

  const handleChangeData = useCallback((type: DataType) => {
    setDataType(type);
  }, []);

  return (
    <Box
      sx={{
        gap: {
          xs: 2,
          lg: 8,
        },
        display: 'flex',
        flexDirection: 'column',
        p: {
          xs: 0,
          lg: 8,
        },
      }}
    >
      <Grid2
        size={12}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
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
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Grid2
          size={1}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={() => handleChangeData(DataType.T)}
            disabled={dataType === DataType.T}
          >
            Total
          </Button>
          <Button
            variant="contained"
            onClick={() => handleChangeData(DataType.P)}
            disabled={dataType === DataType.P}
          >
            Lucro
          </Button>
        </Grid2>
        <Grid2
          size={11}
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              lg: 'row',
            },
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Grid2
            size={2}
            sx={{
              height: {
                lg: '40vh',
              },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <SummaryCards
              allTransactions={transactions}
              transactions={filteredTransactions}
              endDate={filters.dateRange.endDate}
            />
          </Grid2>
          <Grid2
            size={9}
            sx={{
              height: {
                lg: '40vh',
              },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Suspense
              fallback={
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: {
                      xs: '94%',
                      lg: 730,
                    },
                    background: grey[100],
                    padding: 8,
                    borderRadius: 8,
                    height: {
                      xs: 200,
                      lg: 400,
                    },
                  }}
                >
                  <BlueSpinner />
                </Box>
              }
            >
              {dataType === DataType.T ? (
                <BarChart
                  transactions={filteredTransactions}
                  isMobile={isMobile}
                />
              ) : (
                <LineChart
                  transactions={filteredTransactions}
                  isMobile={isMobile}
                />
              )}
            </Suspense>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Dashboard;
