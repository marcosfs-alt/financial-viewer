import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const BlueSpinner: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default BlueSpinner;
