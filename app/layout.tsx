// Root Layout — wraps every page in the app with shared HTML structure.
//
// This is the single place where:
//  • HTML metadata (title, description) is declared for SEO
//  • Global CSS is imported
//  • The top navigation bar is rendered (it stays mounted across page navigations)
//  • The <main> slot renders whichever page is currently active
//
// `children` is the currently matched page or a nested layout.
// `Readonly<...>` ensures the prop object is not accidentally mutated.
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

// Next.js exports this object to populate <head> meta tags automatically
export const metadata: Metadata = {
  title: "Session 12 Demo",
  description: "Server Actions, API Routes and Middleware",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {/* Global navigation bar — visible on every page */}
        <nav>
          {/* App name read from an environment variable (see .env.local) */}
          <strong>{process.env.NEXT_PUBLIC_APP_NAME}</strong>
          <Link href="/">Home</Link>
          <Link href="/posts">Posts</Link>
          <Link href="/todos">Todos</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>

        {/* The active page or nested layout is rendered here */}
        <main>{children}</main>
      </body>
    </html>
  );
}