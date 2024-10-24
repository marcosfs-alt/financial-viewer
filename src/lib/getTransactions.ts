import { Transaction } from '@/types';
import path from 'path';
import fs from 'fs/promises';
import { cache } from 'react';

export const getTransactions = cache(async (): Promise<Transaction[]> => {
  const filePath = path.join(process.cwd(), 'data', 'transactions.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const transactions: Transaction[] = JSON.parse(data);
  return transactions;
});
