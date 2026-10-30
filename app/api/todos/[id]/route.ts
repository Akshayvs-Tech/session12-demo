// REST API route for a single todo item identified by its numeric [id].
// This file handles:
//   GET    /api/todos/:id  → returns the todo with the given id (404 if missing)
//   DELETE /api/todos/:id  → deletes the todo with the given id (404 if missing)
//
// The [id] folder name tells Next.js that `id` is a dynamic segment,
// made available through the `params` promise in each handler.
import { NextResponse } from "next/server";
import { getTodos, deleteTodoFromDb } from "../../../lib/db";

// GET /api/todos/:id
// Looks up a single todo by id and returns it as JSON.
// Responds with 404 if no todo with that id exists.
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // unwrap the dynamic route segment
  const todo = getTodos().find((t) => t.id === Number(id));
  if (!todo) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(todo);
}

// DELETE /api/todos/:id
// Removes the todo with the given id from the in-memory store.
// Returns { deleted: true } on success, or 404 if the todo didn't exist.
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // unwrap the dynamic route segment
  const deleted = deleteTodoFromDb(Number(id));
  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ deleted: true });
}