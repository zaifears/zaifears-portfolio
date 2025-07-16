// app/blog/[slug]/page.tsx

import Image from 'next/image'; // ✅ Using Next.js Image component for optimized images
import { fetchBlogPostBySlug, BlogPost } from '@/lib/contentful'; // ✅ Fetch function and type from lib
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'; // ✅ Render Contentful rich text
import { notFound } from 'next/navigation'; // ✅ next/navigation helper for 404
import type { Document } from '@contentful/rich-text-types'; // ✅ Type for rich text document

// Define the props type inline to avoid PageProps conflicts
// Thinking: Next.js expects params as a plain object, not Promise
export default async function BlogPostPage({ params }: {
  params: { slug: string } // ✅ slug is string
}) {
  const { slug } = params; // ✅ destructure slug

  // Fetch the post; returns BlogPost or null
  // Thinking: ensure fetch function returns correct type
  const post = await fetchBlogPostBySlug(slug) as BlogPost | null;

  // If no post, render 404
  // Thinking: must handle missing data to avoid undefined fields
  if (!post) {
    notFound();
  }

  // Debugging: log fields to verify shape
  console.log('Post fields:', post.fields); // ✅ confirm data shape

  // Destructure fields, knowing they exist
  // Thinking: safe because we returned early on !post
  const { title, date, coverImage, content } = post.fields;

  // Derive cover image URL or null
  const coverImageUrl = coverImage?.fields.file.url ?? null;

  return (
    <article className="prose dark:prose-invert max-w-none">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{title || 'Untitled Post'}</h1> {/* Thinking: fallback title */}

      {/* Date */}
      {date && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-8">
          Posted on {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric',
          })}
        </p>
      )} {/* Thinking: check typeof if needed */}

      {/* Cover Image */}
      {coverImageUrl && (
        <div className="relative w-full h-64 md:h-96 mb-8">
          <Image
            src={`https:${coverImageUrl}`} // Thinking: prepend https
            alt={`Cover image for ${title}`}
            fill // Thinking: use fill + objectFit style
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
            sizes="(max-width: 768px) 100vw, 768px" // Thinking: responsive size
          />
        </div>
      )}

      {/* Content */}
      <div>
        {content && documentToReactComponents(content as Document)} {/* Thinking: cast to Document */}
      </div>
    </article>
  );
}

/*
30 Reasons previous deployments failed:
1. params typed as Promise causing PageProps mismatch
2. Wrong import of PageProps
3. Using nested query object in getEntries
4. Incorrect typing for order parameter
5. Using deprecated layout/objectFit props on Image
6. Custom types/contentful.d.ts conflicts
7. Asset generic misuse causing ChainModifiers errors
8. BlogPostFields used where EntrySkeletonType expected
9. Conflicting Entry type requiring toPlainObject
10. Duplicate next.config.js
11. Missing fallback for null post
12. Misnamed content_type in fetchBlogPostBySlug
13. Not casting slug filter correctly
14. Leaving debug Promise in params definition
15. Inconsistent import paths (@/lib vs relative)
16. Not removing legacy MDX components errors
17. Ignored TypeScript errors with any leads to runtime
18. Using layout prop with latest Next.js 15
19. Using Link incorrectly for MDX
20. Incorrect MDX types causing TS cascade
21. Global types override from types/contentful.d.ts
22. Not clearing build cache after fixes
23. .env.local not included in build builder
24. Hosting region config mismatch
25. Node version mismatch causing TS errors
26. pnpm approve-builds warning ignored
27. Failing to restart dev server for caching
28. Not handling undefined coverImage
29. Wrong function signature: async vs sync
30. Not catching getEntries errors leading to silent failures
*/
