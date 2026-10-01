import type { ReactNode } from 'react';
import Link from 'next/link';

import AuthLeft from '@/components/auth/AuthLeftSide';
import AuthTabs from '@/components/auth/AuthTabs';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="grid min-h-screen lg:grid-cols-[1.35fr_1fr]">
        <AuthLeft />

        <section className="flex flex-col justify-center bg-panel px-6 py-12 lg:px-14 lg:py-16">
          <div className="mx-auto w-full max-w-sm">
            <AuthTabs />
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
