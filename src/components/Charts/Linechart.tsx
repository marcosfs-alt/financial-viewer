import React, { useMemo } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Transaction } from '@/types';
import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';

interface LineChartProps {
  transactions: Transaction[];
}

const LineChart: React.FC<LineChartProps> = React.memo(({ transactions }) => {
  const data = useMemo(() => {
    if (transactions.length === 0) return [];

    const sortedTransactions = transactions
      .slice()
      .sort((a, b) => a.date - b.date);

    let cumulativeBalance = 0;
    const dataPoints: { date: string; balance: number }[] = [];

    sortedTransactions.forEach((transaction) => {
      const amount = parseInt(transaction.amount, 10) / 100;
      cumulativeBalance +=
        transaction.transaction_type === 'deposit' ? amount : -amount;

      const date = format(new Date(transaction.date), 'dd/MM/yyyy');

      const lastDataPoint = dataPoints[dataPoints.length - 1];
      if (lastDataPoint && lastDataPoint.date === date) {
        lastDataPoint.balance = cumulativeBalance;
      } else {
        dataPoints.push({ date, balance: cumulativeBalance });
      }
    });

    return dataPoints;
  }, [transactions]);

  const tooltipFormatter = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <Box
      sx={{
        background: 'white',
        padding: 4,
        borderRadius: 2,
        boxShadow: 1,
        height: {
          xs: 300,
          md: 400,
        },
        width: '100%',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Saldo Acumulado ao Longo do Tempo
      </Typography>
      <ResponsiveContainer width="100%" height="85%">
        <RechartsLineChart data={data} width={730} height={250}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={tooltipFormatter} />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#8884d8"
            name="Saldo"
            dot={false}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </Box>
  );
});

LineChart.displayName = 'LineChart';

export default LineChart;
