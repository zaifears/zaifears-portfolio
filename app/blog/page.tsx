import Link from 'next/link';

// In the future, this data will come from your Markdown files.
// For now, it's just placeholder content.
const mockPosts = [
  {
    slug: 'my-first-post',
    title: 'My First Blog Post: A New Beginning',
    summary: 'This is a summary of my very first post. I am excited to start sharing my thoughts with the world! Join me on this new journey as I explore various topics and ideas.',
    date: '2025-07-16',
  },
  {
    slug: 'thoughts-on-web-development',
    title: 'Thoughts on Web Development',
    summary: 'Exploring the latest trends in the world of Next.js, React, and modern web development.',
    date: '2025-07-15',
  },
  {
    slug: 'a-look-into-the-future',
    title: 'A Look into the Future',
    summary: 'What does the future hold for technology and finance? Here are some of my predictions.',
    date: '2025-07-14',
  },
];

// This function gets the first post to be featured as the "hero" post.
const heroPost = mockPosts[0];
// This gets all the other posts.
const morePosts = mockPosts.slice(1);

export default function BlogPage() {
  return (
    <section>
      <h1 className="font-bold text-4xl md:text-5xl tracking-tight leading-tight mb-8">
        Blog
      </h1>
      
      {/* --- Hero Post Section --- */}
      {heroPost && (
        <div className="mb-8 md:mb-16">
          <Link href={`/blog/${heroPost.slug}`} className="group">
            <article>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:underline">
                {heroPost.title}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                {new Date(heroPost.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                {heroPost.summary}
              </p>
            </article>
          </Link>
        </div>
      )}

      {/* --- More Posts Section --- */}
      {morePosts.length > 0 && (
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            More Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-12 mb-16">
            {morePosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <article>
                  <h3 className="text-xl font-bold mb-1 group-hover:underline">
                    {post.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    {post.summary}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
