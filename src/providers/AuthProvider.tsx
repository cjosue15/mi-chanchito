'use client';

import { useAuth } from '@/hooks/auth/useAuth';
import { AuthContextData } from '@/infraestructure/interfaces/auth/auth.interface';
import { createContext, PropsWithChildren, useContext } from 'react';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { getUserMutation } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   App.addListener('appUrlOpen', (data) => {
  //     const url = data.url;
  //     if (url.startsWith('habitshero://auth/change-password')) {
  //       const urlParams = url.split('#')[1];
  //       router.push(`/auth/change-password?${urlParams}`);
  //     }
  //   });
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        user: getUserMutation.data ?? null,
        loading: getUserMutation.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
