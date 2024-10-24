import React, { useEffect } from 'react';
import { FiltersProps, Transaction } from '@/types';
import { Box, Button } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import StyledDatePickerInput from '../CustomInputs/StyledDataPickerInput';
import FilterSelect from '../CustomInputs/FilterSelect';

interface FiltersComponentProps {
  filters: FiltersProps;
  setFilters: React.Dispatch<React.SetStateAction<FiltersProps>>;
  allTransactions: Transaction[];
}

const Filters: React.FC<FiltersComponentProps> = ({
  filters,
  setFilters,
  allTransactions,
}) => {
  const accounts = Array.from(new Set(allTransactions.map((t) => t.account)));
  const industries = Array.from(
    new Set(allTransactions.map((t) => t.industry)),
  );
  const states = Array.from(new Set(allTransactions.map((t) => t.state)));

  useEffect(() => {
    const savedFilters = localStorage.getItem('filters');
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: 2,
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Box display="flex" gap={2}>
          <DatePicker
            label="Data Inicial"
            value={filters.dateRange.startDate}
            onChange={(date) =>
              setFilters((prev) => ({
                ...prev,
                dateRange: { ...prev.dateRange, startDate: date },
              }))
            }
            renderInput={(params) => <StyledDatePickerInput {...params} />}
          />
          <DatePicker
            label="Data Final"
            value={filters.dateRange.endDate}
            onChange={(date) =>
              setFilters((prev) => ({
                ...prev,
                dateRange: { ...prev.dateRange, endDate: date },
              }))
            }
            renderInput={(params) => <StyledDatePickerInput {...params} />}
          />
        </Box>

        <FilterSelect
          label="Contas"
          value={filters.accounts}
          options={accounts}
          onChange={(event) =>
            setFilters((prev) => ({
              ...prev,
              accounts: event.target.value as string[],
            }))
          }
        />

        <FilterSelect
          label="Indústrias"
          value={filters.industries}
          options={industries}
          onChange={(event) =>
            setFilters((prev) => ({
              ...prev,
              industries: event.target.value as string[],
            }))
          }
        />

        <FilterSelect
          label="Estados"
          value={filters.states}
          options={states}
          onChange={(event) =>
            setFilters((prev) => ({
              ...prev,
              states: event.target.value as string[],
            }))
          }
        />

        <Button
          variant="contained"
          onClick={() => {
            setFilters({
              dateRange: {
                startDate: null,
                endDate: null,
              },
              accounts: [],
              industries: [],
              states: [],
            });
          }}
        >
          Limpar Filtros
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default Filters;
