type TransactionType = 'deposit' | 'withdraw';

type Currency = 'USD' | 'BRL' | 'EUR' | 'GBP' | 'JPY';

export interface Transaction {
  date: number;
  amount: string;
  transaction_type: TransactionType;
  currency: Currency;
  account: string;
  industry: string;
  state: string;
}
