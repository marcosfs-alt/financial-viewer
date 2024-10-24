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
import { format, parse } from 'date-fns';

interface LineChartProps {
  transactions: Transaction[];
}

const LineChart: React.FC<LineChartProps> = ({ transactions }) => {
  const data = useMemo(() => {
    const sortedTransactions = [...transactions].sort(
      (a, b) => a.date - b.date,
    );

    let cumulativeBalance = 0;
    const dataPoints: { date: string; balance: number }[] = [];

    sortedTransactions.forEach((transaction) => {
      const amount = parseInt(transaction.amount, 10) / 100;
      cumulativeBalance +=
        transaction.transaction_type === 'deposit' ? amount : -amount;

      const date = format(new Date(transaction.date), 'dd/MM/yyyy');

      const existingDataPoint = dataPoints.find((d) => d.date === date);
      if (existingDataPoint) {
        existingDataPoint.balance = cumulativeBalance;
      } else {
        dataPoints.push({ date, balance: cumulativeBalance });
      }
    });

    dataPoints.sort((a, b) => {
      const dateA = parse(a.date, 'dd/MM/yyyy', new Date());
      const dateB = parse(b.date, 'dd/MM/yyyy', new Date());
      return dateA.getTime() - dateB.getTime();
    });

    return dataPoints;
  }, [transactions]);

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
          <Tooltip />
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
};

export default LineChart;
