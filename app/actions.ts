// This file contains Server Actions for the Todos feature.
// Server Actions run exclusively on the server (never in the browser),
// which means they can safely access the database, validate data, and
// revalidate the Next.js cache — all without writing a separate API route.
"use server";

import { revalidatePath } from "next/cache";
import { addTodoToDb, deleteTodoFromDb } from "./lib/db";

// Shape of the state object that is passed between renders by useActionState
type FormState = { error: string | null };

// addTodo — called by the TodoForm when the user submits a new todo.
// prevState  : the previous form state (used by useActionState in the client)
// formData   : the raw HTML form data sent by the browser
// Returns a new FormState: { error: null } on success, or an error message.
export async function addTodo(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const title = formData.get("title")?.toString().trim();

  // Always validate on the server
  if (!title) return { error: "Title is required" };
  if (title.length < 3) return { error: "Title must be at least 3 letters" };

  // Fake slow save, so we can see the "Saving..." state
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Persist the new todo and tell Next.js to refresh the /todos page data
  addTodoToDb(title);
  revalidatePath("/todos");
  return { error: null };
}

// deleteTodo — called by the inline delete form next to each todo item.
// Reads the hidden `id` field from the form, removes that todo from the
// in-memory store, then refreshes the /todos page so the list updates.
export async function deleteTodo(formData: FormData) {
  const id = Number(formData.get("id"));
  deleteTodoFromDb(id);
  revalidatePath("/todos");
}