'use client';

import { Grid2 } from '@mui/material';
import LoginForm from './LoginForm';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const LoginCard = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: '', password: '' },
  );
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.email === 'example@test.com' &&
      formData.password === 'example'
    ) {
      Cookies.set('authToken', 'fake-jwt-token');
      router.push('/dashboard');
      return;
    }
    setError('Invalid Credentials!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Grid2
      container
      spacing={2}
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid2
        size={{ xs: 10, md: 6, lg: 3 }}
        sx={{
          height: 6 / 12,
        }}
      >
        <LoginForm
          onSubmit={handleSubmit}
          onChange={handleChange}
          values={formData}
          error={error}
        />
      </Grid2>
    </Grid2>
  );
};

export default LoginCard;
