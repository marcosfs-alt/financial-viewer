'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    setIsAuthenticated(!!authToken);
  }, []);

  return isAuthenticated;
}
