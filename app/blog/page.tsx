    import Link from 'next/link';
    import Image from 'next/image';
    import { fetchBlogPosts } from '@/lib/contentful'; // Import our new function

    export default async function BlogPage() {
      const posts = await fetchBlogPosts();

      if (!posts || posts.length === 0) {
        return <p>No blog posts found.</p>;
      }

      const heroPost = posts[0];
      const morePosts = posts.slice(1);

      // --- ADDED CONSOLE LOGS FOR DEBUGGING ---
      console.log('Hero Post Slug:', heroPost.fields.slug);
      morePosts.forEach((post, index) => {
        console.log(`More Post ${index + 1} Slug:`, post.fields.slug);
      });
      // --- END DEBUGGING ADDITIONS ---

      return (
        <section>
          <h1 className="font-bold text-4xl md:text-5xl tracking-tight leading-tight mb-8">
            Blog
          </h1>

          {/* --- Hero Post Section --- */}
          <div className="mb-8 md:mb-16">
            <Link href={`/blog/${heroPost.fields.slug}`} className="group">
              <article>
                {heroPost.fields.coverImage?.fields?.file?.url && ( // Safely access nested properties
                  <div className="mb-4">
                    <Image
                      src={`https:${heroPost.fields.coverImage.fields.file.url}`}
                      alt={`Cover image for ${heroPost.fields.title}`}
                      width={1200}
                      height={630}
                      className="rounded-lg object-cover shadow-md"
                    />
                  </div>
                )}
                <h2 className="text-2xl md:text-3xl font-bold mb-2 group-hover:underline">
                  {heroPost.fields.title}
                </h2>
                {heroPost.fields.date && ( // Only render date if it exists
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                    Posted on {new Date(heroPost.fields.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </article>
            </Link>
          </div>

          {/* --- More Posts Section --- */}
          {morePosts.length > 0 && (
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                More Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-12 mb-16">
                {morePosts.map((post) => (
                  <Link
                    key={post.sys.id}
                    href={`/blog/${post.fields.slug}`}
                    className="block group"
                  >
                    <article>
                      <h3 className="text-xl font-bold mb-1 group-hover:underline">
                        {post.fields.title}
                      </h3>
                      {post.fields.date && ( // Only render date if it exists
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-2">
                          {new Date(post.fields.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      );
    }
    