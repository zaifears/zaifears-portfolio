export default function LifePostLoading() {
  return (
    <article className="max-w-4xl mx-auto animate-pulse">
      {/* Back link skeleton */}
      <div className="h-4 w-36 bg-gray-200 dark:bg-gray-800 rounded mb-10" />

      {/* Title skeleton */}
      <div className="mb-6 space-y-3">
        <div className="h-10 md:h-12 bg-gray-200 dark:bg-gray-800 rounded w-full" />
        <div className="h-10 md:h-12 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
      </div>

      {/* Date & reading time skeleton */}
      <div className="flex gap-5 mb-10">
        <div className="h-4 w-36 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
      </div>

      {/* Cover image skeleton */}
      <div className="h-72 md:h-112 mb-12 bg-gray-200 dark:bg-gray-800 rounded-2xl" />

      {/* Content skeleton */}
      <div className="space-y-5">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-11/12" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/5" />
        <div className="h-8 mt-4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
      </div>

      {/* Bottom nav skeleton */}
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-neutral-800">
        <div className="h-10 w-28 bg-gray-200 dark:bg-gray-800 rounded-full" />
      </div>
    </article>
  );
}
