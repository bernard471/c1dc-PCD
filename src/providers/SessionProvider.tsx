'use client';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';

export default function NextAuthSessionProvider({ 
  children,
  session
}: { 
  children: React.ReactNode;
  session: Session | null | undefined;
}) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
