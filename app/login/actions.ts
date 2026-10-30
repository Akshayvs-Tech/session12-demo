// Server Actions for authentication.
// These functions run only on the server ("use server" directive).
// They are imported and used directly as <form action={...}> values, so
// no API route or fetch() call is needed from the client.
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// login — handles the login form submission.
// Takes the user's name from the form, stores it in an httpOnly cookie
// called "token", then redirects to the dashboard.
//
// DEMO ONLY: a real app must check a password and use a secure session.
export async function login(formData: FormData) {
  // Fall back to "student" if the name field is blank
  const name = formData.get("name")?.toString().trim() || "student";
  const cookieStore = await cookies();
  // Set an httpOnly cookie so it's not accessible from JavaScript (XSS protection)
  cookieStore.set("token", name, { httpOnly: true, path: "/" });
  // Redirect to the protected dashboard after successful login
  redirect("/dashboard");
}

// logout — clears the "token" cookie and sends the user back to /login.
// Called via the logout <form action={logout}> on the dashboard page.
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token"); // remove the session cookie
  redirect("/login");
}