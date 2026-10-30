// Login page — the entry point for unauthenticated users.
// The middleware redirects any visitor without a "token" cookie here.
// On submit, the form calls the `login` Server Action directly (no fetch needed).
// The Server Action sets an httpOnly cookie and redirects to /dashboard.
import { login } from "./actions";

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      {/*
        `action={login}` wires this form directly to the login Server Action.
        When submitted, Next.js sends the FormData to the server and the
        Server Action handles cookie creation + redirect — zero client JS required.
      */}
      <form action={login}>
        <input name="name" placeholder="Your name" />
        <button>Login</button>
      </form>
    </div>
  );
}