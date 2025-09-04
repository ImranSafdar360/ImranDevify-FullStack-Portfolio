'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import LoginDialogProvider from './LoginDialogProvider';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <LoginDialogProvider>
        {children}
      </LoginDialogProvider>
    </SessionProvider>
  );
}

