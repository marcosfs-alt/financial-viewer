import React, { useEffect } from 'react';
import { FiltersProps, Transaction } from '@/types';
import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
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
      <Box display="flex" flexDirection="column" gap={2}>
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
            renderInput={(params) => <TextField {...params} />}
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
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>

        <FormControl fullWidth>
          <InputLabel id="accounts-label">Contas</InputLabel>
          <Select
            labelId="accounts-label"
            multiple
            value={filters.accounts}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                accounts: event.target.value as string[],
              }))
            }
            renderValue={(selected) => selected.join(', ')}
          >
            {accounts.map((account) => (
              <MenuItem key={account} value={account}>
                {account}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="industries-label">Indústrias</InputLabel>
          <Select
            labelId="industries-label"
            multiple
            value={filters.industries}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                industries: event.target.value as string[],
              }))
            }
            renderValue={(selected) => selected.join(', ')}
          >
            {industries.map((industry) => (
              <MenuItem key={industry} value={industry}>
                {industry}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="states-label">Estados</InputLabel>
          <Select
            labelId="states-label"
            multiple
            value={filters.states}
            onChange={(event) =>
              setFilters((prev) => ({
                ...prev,
                states: event.target.value as string[],
              }))
            }
            renderValue={(selected) => selected.join(', ')}
          >
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
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
