// Posts page — demonstrates Next.js data fetching with ISR (Incremental Static Regeneration).
//
// Key concepts shown here:
//  1. Artificial delay (2 s) — so you can see loading.tsx kick in while the
//     page is being generated on the server. Next.js automatically shows
//     loading.tsx as a Suspense boundary for the whole route segment.
//  2. fetch with `next: { revalidate: 60 }` — caches the response for 60 seconds.
//     After 60 s, the next request triggers a background re-fetch (ISR),
//     so users always see fast-cached HTML while the data stays reasonably fresh.

// Type that matches the shape of each post from the API
type Post = { id: number; title: string };

export default async function PostsPage() {
  // Slow on purpose, so we can see loading.tsx
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Fetch 5 posts from the public JSONPlaceholder API.
  // `next.revalidate: 60` tells Next.js to cache this response for 60 seconds (ISR).
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", {
    next: { revalidate: 60 }, // keep this data for 60 seconds
  });
  const posts: Post[] = await res.json();

  return (
    <div>
      <h1>Posts</h1>
      <p>This data is cached for 60 seconds.</p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}