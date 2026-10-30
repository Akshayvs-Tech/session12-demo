// Home page — the landing page rendered at the "/" route.
// It's a simple static Server Component: no data fetching, no client JS.
// Users are directed from here to the other demo pages via the nav bar in layout.tsx.
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Session 12</h1>
      <p>Use the menu to open each demo page.</p>
    </div>
  );
}