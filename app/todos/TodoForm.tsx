// TodoForm is a Client Component ("use client") because it needs to hook
// into React state to show pending / error feedback during the Server Action call.
//
// useActionState wires together:
//   - the Server Action (addTodo) that runs on the server
//   - local state (the returned FormState with error/null)
//   - a pending boolean that is true while the action is in-flight
//
// This lets us disable the button and show "Saving..." with zero extra fetch code.
"use client";

import { useActionState } from "react";
import { addTodo } from "../actions";

export default function TodoForm() {
  // state    : the latest FormState returned by addTodo ({ error: null } or { error: "..." })
  // action   : the enhanced form action to pass to <form action={...}>
  // pending  : true while the Server Action is executing (used to disable the button)
  const [state, action, pending] = useActionState(addTodo, { error: null });

  return (
    <form action={action}>
      <input name="title" placeholder="New todo" />

      {/* Disable the button while saving to prevent double-submissions */}
      <button disabled={pending}>{pending ? "Saving..." : "Add"}</button>

      {/* Show the server-side validation error if one was returned */}
      {state?.error && <p style={{ color: "crimson" }}>{state.error}</p>}
    </form>
  );
}
