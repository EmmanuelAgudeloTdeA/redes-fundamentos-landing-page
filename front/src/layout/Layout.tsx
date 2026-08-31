import type { ReactNode } from 'react';
import { Navbar, Header, Footer } from '../components';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Header />
      <main className="flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
