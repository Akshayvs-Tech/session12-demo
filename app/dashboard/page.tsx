// Dashboard page — only accessible to logged-in users.
// The middleware (middleware.ts) guards this route: any visitor without a
// "token" cookie is redirected to /login before this component ever runs.
//
// Key concepts shown here:
//  1. Reading cookies on the server with `cookies()` from next/headers
//  2. React Suspense + streaming: SlowStats takes 2 s to render, so we wrap
//     it in <Suspense> and show a fallback while it loads — the rest of the
//     page is sent to the browser immediately without waiting for SlowStats.
//  3. Using a Server Action (logout) directly as a <form action>.
import { Suspense } from "react";
import { cookies } from "next/headers";
import { logout } from "../login/actions";
import SlowStats from "./SlowStats";

export default async function DashboardPage() {
  // Read the cookie store on the server to get the logged-in user's name
  const cookieStore = await cookies();
  const name = cookieStore.get("token")?.value; // value was set during login

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {name}!</p>

      {/*
        SlowStats is an async component that takes ~2 s.
        Wrapping it in Suspense lets Next.js stream the page:
        the browser sees the rest of the dashboard immediately,
        then SlowStats's HTML is streamed in once it resolves.
      */}
      <Suspense fallback={<p>Loading stats...</p>}>
        <SlowStats />
      </Suspense>

      {/* Logout button — submits to the `logout` Server Action which
          clears the cookie and redirects back to /login */}
      <form action={logout}>
        <button>Logout</button>
      </form>
    </div>
  );
}