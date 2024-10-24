import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '15%',
  },
}));

const StyledInputLabel = styled(InputLabel)(() => ({
  color: 'black',
  '&.Mui-focused': {
    color: 'black',
  },
}));

const StyledSelect = styled(Select)(() => ({
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
}));

const StyledMenuItem = styled(MenuItem)(() => ({
  color: 'black',
  '&.Mui-focused': {
    color: 'black',
  },
}));

interface FilterSelectProps {
  label: string;
  value: string[];
  options: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const labelId = `${label}-label`;

  return (
    <StyledFormControl>
      <StyledInputLabel id={labelId}>{label}</StyledInputLabel>
      <StyledSelect
        labelId={labelId}
        multiple
        value={value}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200,
            },
          },
        }}
        onChange={(event: SelectChangeEvent<unknown>) =>
          onChange(event as SelectChangeEvent<string[]>)
        }
        renderValue={(selected) => (selected as string[]).join(', ')}
      >
        {options.map((option) => (
          <StyledMenuItem key={option} value={option}>
            {option}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
};

export default FilterSelect;
