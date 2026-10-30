// A tiny fake database that lives in memory (no real DB needed for the demo).
// It resets when you restart the dev server.
//
// Why globalThis?
// In Next.js development mode the server module graph is re-evaluated on every
// hot-reload, which would wipe a plain module-level variable each time.
// Attaching the store to `globalThis` (the Node.js global object) ensures
// there is only ONE copy of the data no matter how many times this module
// is re-imported during hot-reloads.
type Todo = { id: number; title: string };

// Extend globalThis with our custom store shape so TypeScript is happy
const g = globalThis as unknown as {
  store?: { todos: Todo[]; nextId: number };
};

// Only initialise the store if it doesn't already exist on globalThis
if (!g.store) {
  g.store = {
    todos: [
      { id: 1, title: "Learn Server Actions" }, // seed data so the page isn't empty on first load
      { id: 2, title: "Build an API route" },
    ],
    nextId: 3, // auto-increment counter for new todo ids
  };
}
// Local reference — all exported functions use this
const store = g.store;

// Returns a copy of all todos currently in the store
export function getTodos(): Todo[] {
  return store.todos;
}

// Creates a new todo with an auto-incrementing id, stores it, and returns it
export function addTodoToDb(title: string): Todo {
  const todo = { id: store.nextId++, title };
  store.todos.push(todo);
  return todo;
}

// Removes the todo with the given id.
// Returns true if a todo was actually deleted, false if id was not found.
export function deleteTodoFromDb(id: number): boolean {
  const before = store.todos.length;
  store.todos = store.todos.filter((todo) => todo.id !== id);
  return store.todos.length < before; // true means something was removed
}