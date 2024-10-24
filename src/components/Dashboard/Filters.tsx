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
      <Box
        display="flex"
        flexDirection="row"
        gap={2}
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
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  '.MuiSvgIcon-root': {
                    color: 'black',
                  },
                  '& label': {
                    color: 'black',
                  },
                  '& label.Mui-focused': {
                    color: 'black',
                  },
                }}
              />
            )}
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
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  backgroundColor: 'white',
                  color: 'black',
                  '.MuiSvgIcon-root': {
                    color: 'black',
                  },
                  '& label': {
                    color: 'black',
                  },
                  '& label.Mui-focused': {
                    color: 'black',
                  },
                }}
              />
            )}
          />
        </Box>

        <FormControl sx={{ width: '15%' }}>
          <InputLabel
            id="accounts-label"
            sx={{
              color: 'black',
              '&.Mui-focused': {
                color: 'black',
              },
            }}
          >
            Contas
          </InputLabel>
          <Select
            labelId="accounts-label"
            multiple
            sx={{
              backgroundColor: 'white',
              color: 'black',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              '.MuiSvgIcon-root': {
                color: 'black',
              },
            }}
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
              <MenuItem
                key={account}
                value={account}
                sx={{
                  color: 'black',
                  '&.Mui-focused': {
                    color: 'black',
                  },
                }}
              >
                {account}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: '15%' }}>
          <InputLabel
            id="industries-label"
            sx={{
              color: 'black',
              '&.Mui-focused': {
                color: 'black',
              },
            }}
          >
            Indústrias
          </InputLabel>
          <Select
            labelId="industries-label"
            multiple
            sx={{
              backgroundColor: 'white',
              color: 'black',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              '.MuiSvgIcon-root': {
                color: 'black',
              },
            }}
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

        <FormControl sx={{ width: '15%' }}>
          <InputLabel
            id="states-label"
            sx={{
              color: 'black',
              '&.Mui-focused': {
                color: 'black',
              },
            }}
          >
            Estados
          </InputLabel>
          <Select
            labelId="states-label"
            multiple
            sx={{
              backgroundColor: 'white',
              color: 'black',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              '.MuiSvgIcon-root': {
                color: 'black',
              },
            }}
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
