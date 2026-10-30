// Todos page — displays all todos and lets users add or delete them.
//
// Key concepts demonstrated:
//  1. force-dynamic  : opt out of Next.js static caching so the list always
//     reflects the latest in-memory store on every request.
//  2. Server Component reads data directly — no useEffect / fetch needed.
//  3. TodoForm (Client Component) handles the add form with pending state.
//  4. Delete uses a plain <form> wired to the deleteTodo Server Action;
//     the hidden `id` input passes the todo's id to the server.
import { getTodos } from "../lib/db";
import { deleteTodo } from "../actions";
import TodoForm from "./TodoForm";

// The data changes, so build this page on every request (disable static caching)
export const dynamic = "force-dynamic";

export default function TodosPage() {
  // Read todos directly from the in-memory store — this runs on the server
  const todos = getTodos();

  return (
    <div>
      <h1>Todos</h1>

      {/* Client Component: handles add form with optimistic pending state */}
      <TodoForm />

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}{" "}

            {/*
              Inline delete form: posting this form calls the deleteTodo Server Action.
              The hidden input carries the todo's id so the action knows what to delete.
              display:inline keeps the form on the same line as the title text.
            */}
            <form action={deleteTodo} style={{ display: "inline" }}>
              <input type="hidden" name="id" value={todo.id} />
              <button>Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}