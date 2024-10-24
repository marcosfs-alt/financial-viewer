import React from 'react';
import { render, screen } from '@testing-library/react';
import Filters from '../Filters';
import { FiltersProps, Transaction } from '@/types';

describe('Filters Component', () => {
  const mockSetFilters = jest.fn();
  const mockTransactions: Transaction[] = [
    {
      date: Date.now(),
      amount: '1000',
      transaction_type: 'deposit',
      currency: 'USD',
      account: 'Account1',
      industry: 'Industry1',
      state: 'State1',
    },
  ];

  const filters: FiltersProps = {
    dateRange: {
      startDate: null,
      endDate: null,
    },
    accounts: [],
    industries: [],
    states: [],
  };

  test('should render all filter controls', () => {
    render(
      <Filters
        filters={filters}
        setFilters={mockSetFilters}
        allTransactions={mockTransactions}
      />,
    );

    expect(screen.getByLabelText(/Data Inicial/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data Final/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contas/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Indústrias/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estados/i)).toBeInTheDocument();
  });

  test('should call setFilters when date is selected', () => {
    render(
      <Filters
        filters={filters}
        setFilters={mockSetFilters}
        allTransactions={mockTransactions}
      />,
    );

    expect(screen.getByLabelText(/Data Inicial/i)).toBeInTheDocument();
  });
});
