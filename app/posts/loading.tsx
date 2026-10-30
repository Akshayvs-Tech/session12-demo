// loading.tsx — Next.js Route Segment Loading UI.
//
// Next.js automatically treats this file as a Suspense boundary for the
// entire /posts route. While posts/page.tsx is still rendering on the server
// (including the artificial 2-second delay), Next.js streams this component
// to the browser immediately so the user sees feedback right away instead of
// a blank page.
export default function Loading() {
  return <p>Loading the posts...</p>;
}