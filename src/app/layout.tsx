import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';

export const metadata: Metadata = {
  title: "Blog Via Comet",
  description: "Un blog dynamique créé avec Next.js et Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Providers>
        <nav className="bg-gray-900 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">🚀 Blog Via Comet</Link>
            <Link href="/admin" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
              Admin
            </Link>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-100 p-4 text-center mt-8">
          <p>© 2026 Blog Via Comet - Créé avec ❤️ par Manidrim</p>
        </footer>
              </Providers>
      </body>
    </html>
  );
}
