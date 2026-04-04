import type { ReactNode } from 'react';
import { AppShell } from '@/components/mock/app-shell';

export default function MockLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
