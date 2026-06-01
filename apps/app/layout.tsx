import './globals.css';

export const metadata = {
  title: 'Absensi Digital',
  description: 'Admin panel and Expo integration',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head />
      <body className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
