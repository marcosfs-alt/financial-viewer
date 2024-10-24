import React from 'react';
import { Transaction } from '@/types';
import { Box, Typography } from '@mui/material';
import { green, grey, purple, red } from '@mui/material/colors';

interface SummaryCardsProps {
  transactions: Transaction[];
  endDate: Date | null;
  allTransactions: Transaction[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({
  transactions,
  endDate,
  allTransactions,
}) => {
  const income = transactions
    .filter((t) => t.transaction_type === 'deposit')
    .reduce((acc, curr) => acc + parseInt(curr.amount, 10), 0);

  const expenses = transactions
    .filter((t) => t.transaction_type === 'withdraw')
    .reduce((acc, curr) => acc + parseInt(curr.amount, 10), 0);

  const isFutureDate = (dateString: string | number) => {
    const transactionDate = new Date(dateString);
    const referenceDate = endDate ? new Date(endDate) : new Date();

    transactionDate.setHours(0, 0, 0, 0);
    referenceDate.setHours(0, 0, 0, 0);

    return transactionDate > referenceDate;
  };

  const pendingTransactionsCount = allTransactions.filter((t) =>
    isFutureDate(t.date),
  ).length;

  const totalBalance = income - expenses;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        background: grey[100],
        p: 4,
        borderRadius: 8,
        width: {
          xs: '94vw',
          lg: '100%',
        },
        height: {
          xs: 200,
          lg: 400,
        },
      }}
    >
      <Box>
        <Typography sx={{ fontWeight: 700, color: 'black' }}>
          Receitas
        </Typography>
        <Typography sx={{ fontWeight: 600, color: green[800] }}>
          {(income / 100).toFixed(2)}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 700, color: 'black' }}>
          Despesas
        </Typography>
        <Typography sx={{ fontWeight: 600, color: red[800] }}>
          {(expenses / 100).toFixed(2)}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 700, color: 'black' }}>
          Transações Pendentes
        </Typography>
        <Typography sx={{ fontWeight: 700, color: purple[300] }}>
          {pendingTransactionsCount}
        </Typography>
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 700, color: 'black' }}>
          Saldo Total
        </Typography>
        <Typography
          sx={{
            fontWeight: 600,
            color: `${totalBalance > 0 ? green[800] : red[800]}`,
          }}
        >
          {(totalBalance / 100).toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default SummaryCards;
