import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: "All posts | Dmatrix's thoughts",
  description: 'Personal blog for my thoughts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const header = (
    <header>
      <div className="text-center bg-slate-800 p-8 my-6 rounded-md">
        <Link href="/">
          <h1 className="text-2xl text-white font-bold mt-4">Jack's Blog</h1>
        </Link>
        <p className="text-slate-300">Welcome to my tech blog. 💻</p>
      </div>
    </header>
  );

  const footer = (
    <footer>
      <div className="border-t border-slate-400 mt-12 py-6 text-center text-slate-400">
        <h3>Designed by Pixegami</h3>
      </div>
    </footer>
  );

  return (
    <html lang="en">
      <body>
        <div>
          {header}
          {children}
          {footer}
        </div>
      </body>
    </html>
  );
}
