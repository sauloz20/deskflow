import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

export const metadata: Metadata = { title: 'DeskFlow | Design System', description: 'Biblioteca visual e protótipo do DeskFlow' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={GeistSans.variable}><body>{children}</body></html>;
}
