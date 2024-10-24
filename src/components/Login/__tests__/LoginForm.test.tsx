import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../LoginForm';

describe('LoginForm Component', () => {
  const mockOnSubmit = jest.fn();
  const mockOnChange = jest.fn();
  const values = { email: '', password: '' };
  const error = '';

  test('should render the form correctly', () => {
    render(
      <LoginForm
        onSubmit={mockOnSubmit}
        onChange={mockOnChange}
        values={values}
        error={error}
      />,
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  test('should call onChange when typing in inputs', () => {
    render(
      <LoginForm
        onSubmit={mockOnSubmit}
        onChange={mockOnChange}
        values={values}
        error={error}
      />,
    );

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  test('should display error message when error exists', () => {
    render(
      <LoginForm
        onSubmit={mockOnSubmit}
        onChange={mockOnChange}
        values={values}
        error="Invalid Credentials!"
      />,
    );

    expect(screen.getByText(/Invalid Credentials!/i)).toBeInTheDocument();
  });
});
