import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chord Book",
  description: "A guitar chord reference app",
};

const NAV = [
  { href: "/", label: "Keys" },
  { href: "/types/", label: "Types" },
  { href: "/moveable/", label: "Moveable" },
  { href: "/progressions/", label: "Progressions" },
  { href: "/search/", label: "Search" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-wood-50 text-wood-900">
        <header className="sticky top-0 z-10 bg-wood-900 text-wood-50 px-4 py-3 shadow">
          <h1 className="text-lg font-bold tracking-wide">
            <Link href="/">Chord Book</Link>
          </h1>
        </header>
        <main className="flex-1 px-4 py-4 pb-20 max-w-2xl mx-auto w-full">{children}</main>
        <nav className="fixed bottom-0 left-0 right-0 bg-wood-900 text-wood-50 flex justify-around py-2 text-xs">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="px-2 py-1 hover:text-wood-200">
              {item.label}
            </Link>
          ))}
        </nav>
      </body>
    </html>
  );
}
