'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export function useLogout() {
  const router = useRouter();

  const logout = () => {
    Cookies.remove('authToken');
    router.push('/login');
  };

  return logout;
}
