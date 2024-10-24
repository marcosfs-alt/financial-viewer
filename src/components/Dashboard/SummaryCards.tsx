import React from 'react';
import { Transaction } from '@/types';
import { Box } from '@mui/material';

interface SummaryCardsProps {
  transactions: Transaction[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.transaction_type === 'deposit')
    .reduce((acc, curr) => acc + parseInt(curr.amount, 10), 0);

  const expenses = transactions
    .filter((t) => t.transaction_type === 'withdraw')
    .reduce((acc, curr) => acc + parseInt(curr.amount, 10), 0);

  const totalTransactions = transactions.length;

  const totalBalance = income - expenses;

  return (
    <Box color="white">
      <div>
        <h3>Receitas</h3>
        <p>{(income / 100).toFixed(2)}</p>
      </div>
      <div>
        <h3>Despesas</h3>
        <p>{(expenses / 100).toFixed(2)}</p>
      </div>
      <div>
        <h3>Total de Transações</h3>
        <p>{totalTransactions}</p>
      </div>
      <div>
        <h3>Saldo Total</h3>
        <p>{(totalBalance / 100).toFixed(2)}</p>
      </div>
    </Box>
  );
};

export default SummaryCards;
