import React, { useMemo } from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Transaction } from '@/types';
import { Box } from '@mui/material';
import { green, grey, red } from '@mui/material/colors';

interface BarChartProps {
  transactions: Transaction[];
  isMobile: boolean;
}

const BarChart: React.FC<BarChartProps> = React.memo(
  ({ transactions, isMobile }) => {
    const data = useMemo(() => {
      const dataMap: {
        [industry: string]: {
          industry: string;
          deposit: number;
          withdraw: number;
        };
      } = {};

      transactions.forEach((transaction) => {
        const industry = transaction.industry;
        const amount = parseInt(transaction.amount, 10) / 100;
        if (!dataMap[industry]) {
          dataMap[industry] = { industry, deposit: 0, withdraw: 0 };
        }
        if (transaction.transaction_type === 'deposit') {
          dataMap[industry].deposit += amount;
        } else if (transaction.transaction_type === 'withdraw') {
          dataMap[industry].withdraw += amount;
        }
      });

      const dataArray = Object.values(dataMap);
      dataArray.sort(
        (a, b) => b.deposit + b.withdraw - (a.deposit + a.withdraw),
      );

      return dataArray;
    }, [transactions]);

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: grey[100],
          padding: {
            xs: 2,
            lg: 8,
          },
          borderRadius: 8,
          width: {
            xs: '94%',
          },
          height: {
            xs: 400,
            lg: 400,
          },
        }}
      >
        <ResponsiveContainer width="100%" height="250px">
          <RechartsBarChart
            width={isMobile ? 390 : 730}
            height={250}
            data={data}
            layout="vertical"
          >
            <XAxis type="number" />
            <YAxis dataKey="industry" type="category" width={100} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="deposit"
              stackId="a"
              fill={green[500]}
              name="Receitas"
            />
            <Bar
              dataKey="withdraw"
              stackId="a"
              fill={red[500]}
              name="Despesas"
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </Box>
    );
  },
);

BarChart.displayName = 'BarChart';

export default BarChart;
