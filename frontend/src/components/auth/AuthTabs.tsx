'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type AuthMode = 'signin' | 'register';

const TABS: { mode: AuthMode; href: string; label: string }[] = [
  { mode: 'signin', href: '/login', label: 'Sign In' },
  { mode: 'register', href: '/register', label: 'Register' },
];

export default function AuthTabs() {
  const pathname = usePathname();
  const mode: AuthMode = pathname === '/register' ? 'register' : 'signin';

  return (
    <div className="mb-8 flex overflow-hidden rounded-md border border-line-strong">
      {TABS.map((tab) => (
        <Link
          key={tab.mode}
          href={tab.href}
          className={`flex-1 py-2.5 text-center text-sm font-medium transition-colors ${
            mode === tab.mode ? 'bg-accent text-black' : 'text-ink-muted'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
