import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Commerz - Africa E-Commerce Platform',
  description: 'E-commerce platform tailored for African markets with mobile money integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
