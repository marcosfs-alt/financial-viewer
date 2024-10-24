import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDatePickerInput = styled((props: TextFieldProps) => (
  <TextField {...props} />
))(() => ({
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
}));

export default StyledDatePickerInput;
