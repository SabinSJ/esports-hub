import type { ReactNode } from 'react';
import Link from 'next/link';

import AuthLeft from '@/components/auth/AuthLeftSide';
import AuthTabs from '@/components/auth/AuthTabs';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* <header className="flex h-16 items-center justify-between border-b border-line px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-accent text-sm font-bold text-black">
            EH
          </span>
          <span className="text-sm font-semibold tracking-wide">ESPORTS HUB</span>
        </Link>
        <Link href="/" className="font-mono text-xs text-ink-faint transition-colors hover:text-ink-muted">
          Back to app
        </Link>
      </header> */}

      {/* <div className="grid min-h-[calc(100vh-64px)] lg:grid-cols-[1.35fr_1fr]"> */}
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
