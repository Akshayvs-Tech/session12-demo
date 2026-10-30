// REST API route for the /api/todos collection.
// This file handles two HTTP methods:
//   GET  /api/todos        → returns all todos (supports ?q= search filter)
//   POST /api/todos        → creates a new todo from a JSON body
//
// Unlike Server Actions, API routes are useful when external clients
// (e.g. mobile apps, curl, other servers) need to call the backend.
import { NextRequest, NextResponse } from "next/server";
import { getTodos, addTodoToDb } from "../../lib/db";

// GET /api/todos  or  /api/todos?q=api
// Optional query param `q` filters todos by title (case-insensitive).
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");
  let todos = getTodos();
  // If a search query was provided, filter the list before returning
  if (q) {
    todos = todos.filter((todo) => todo.title.toLowerCase().includes(q.toLowerCase()));
  }
  return NextResponse.json(todos);
}

// POST /api/todos  with body { "title": "..." }
// Creates a new todo and returns it with HTTP 201 Created.
// Returns 400 Bad Request if the title is missing.
export async function POST(request: Request) {
  const body = await request.json();
  if (!body.title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }
  const todo = addTodoToDb(body.title);
  return NextResponse.json(todo, { status: 201 });
}