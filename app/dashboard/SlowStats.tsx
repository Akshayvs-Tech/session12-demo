// SlowStats is an async Server Component that deliberately waits 2 seconds
// before rendering. This makes it the perfect demo for React Suspense streaming:
// the dashboard page renders immediately and shows a "Loading stats..." fallback
// while this component is still fetching/computing on the server. Once it
// resolves, Next.js streams the finished HTML into the page without a full reload.
import { getTodos } from "../lib/db";

export default async function SlowStats() {
  // Artificial 2-second delay — in a real app this would be a slow DB query or API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // After the wait, render a simple count of all todos in the store
  return <p>Total todos: {getTodos().length}</p>;
}