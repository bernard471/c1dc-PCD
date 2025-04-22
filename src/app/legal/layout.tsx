'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  useEffect(() => {
    // This will ensure the tab state is synchronized with the URL parameter
    if (tab) {
      const event = new CustomEvent('tabChange', { detail: tab });
      window.dispatchEvent(event);
    }
  }, [tab]);

  return <>{children}</>;
}