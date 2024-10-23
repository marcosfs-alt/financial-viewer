import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Input,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';

const LoginForm = ({
  onSubmit,
  onChange,
  values,
  error,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  values: { email: string; password: string };
  error: string;
}) => {
  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        bgcolor: grey[200],
        width: '100%',
        height: '100%',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography sx={{ color: 'black', fontWeight: 700, fontSize: 34 }}>
        Financial Viewer
      </Typography>
      <FormControl error={error.length > 0}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          name="email"
          value={values.email}
          onChange={onChange}
          sx={{
            border: `1px solid ${grey[400]}`,
            borderRadius: 1,
            px: 0.8,
          }}
        />
      </FormControl>
      <FormControl error={error.length > 0}>
        <InputLabel htmlFor="password">Senha</InputLabel>
        <Input
          id="password"
          name="password"
          value={values.password}
          onChange={onChange}
          type="password"
          sx={{
            border: `1px solid ${grey[400]}`,
            borderRadius: 1,
            px: 0.8,
          }}
        />
        {error.length > 0 && (
          <Typography sx={{ color: 'red' }}>{error}</Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};

export default LoginForm;
