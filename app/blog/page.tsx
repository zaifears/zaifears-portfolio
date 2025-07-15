import Link from 'next/link';
import Image from 'next/image';

// ✅ UPDATED: Removed the 'image' property from the placeholder posts.
const mockPosts = [
  {
    slug: 'immich',
    title: 'My Adventure in Ditching Google Photos for Immich',
    summary: 'For years, I lived under the rule of Google Photos. It was easy, but limiting. So, I asked myself a simple question: "Why not take back control?"',
    date: '2025-07-16',
    image: '/immich-post.png', // Image for the hero post
  },
  {
    slug: 'thoughts-on-web-development',
    title: 'Thoughts on Web Development',
    summary: 'Exploring the latest trends in the world of Next.js, React, and modern web development.',
    date: '2025-07-15',
    // No image for this post
  },
  {
    slug: 'a-look-into-the-future',
    title: 'A Look into the Future',
    summary: 'What does the future hold for technology and finance? Here are some of my predictions.',
    date: '2025-07-14',
    // No image for this post
  },
];

const heroPost = mockPosts[0];
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
              {/* ✅ FIXED: Conditionally render the image only if heroPost.image exists */}
              {heroPost.image && (
                <div className="mb-4">
                  <Image
                    src={heroPost.image}
                    alt={`Cover image for ${heroPost.title}`}
                    width={1200}
                    height={630}
                    className="rounded-lg object-cover shadow-md"
                  />
                </div>
              )}
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
                  {/* ✅ REMOVED: Image component from the list of other posts */}
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
