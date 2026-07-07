import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Verdant — Premium Plant Store',
    template: '%s | Verdant',
  },
  description: 'Shop the finest indoor plants, curated and delivered with care. Monstera, fiddle-leaf figs, rare tropicals and more. Free shipping over $75.',
  keywords: ['indoor plants', 'houseplants', 'tropical plants', 'plant shop', 'buy plants online'],
  openGraph: {
    title: 'Verdant — Premium Plant Store',
    description: 'Beautiful indoor plants, curated and delivered with care.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
