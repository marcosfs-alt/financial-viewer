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
import { grey } from '@mui/material/colors';

interface LineChartProps {
  transactions: Transaction[];
  isMobile: boolean;
}

const LineChart: React.FC<LineChartProps> = React.memo(
  ({ transactions, isMobile }) => {
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
          display: 'flex',
          flexDirection: {
            xs: 'column',
            lg: 'row',
          },
          justifyContent: 'center',
          alignItems: 'center',
          background: grey[100],
          padding: {
            xs: 2,
            lg: 8,
          },
          borderRadius: 8,
          width: {
            xs: '100%',
          },
          height: {
            xs: 400,
            lg: 400,
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Saldo/Tempo
        </Typography>
        <ResponsiveContainer width="100%" height="250px">
          <RechartsLineChart
            data={data}
            width={isMobile ? 390 : 730}
            height={250}
          >
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
  },
);

LineChart.displayName = 'LineChart';

export default LineChart;
