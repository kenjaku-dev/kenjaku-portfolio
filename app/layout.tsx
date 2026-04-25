import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Omega | Frontend Developer & Engineer',
  description: 'Portfolio for Omega (kenjaku-dev). Creative developer, building modern and stylish web experiences.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="bg-[#0A0A0A] text-white font-sans antialiased selection:bg-[#4F46E5]/30 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
