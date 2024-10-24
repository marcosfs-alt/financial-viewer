import { Transaction } from '@/types';
import transactions from '../../data/transactions.json';

export const getTransactions = async (): Promise<Transaction[]> => {
  return transactions as Transaction[];
};
