export default function LifeLoading() {
  return (
    <section>
      <h1 className="font-bold text-3xl md:text-4xl mb-8">Life Journey</h1>
      
      {/* Featured Post Skeleton */}
      <div className="mb-12 animate-pulse">
        <div className="h-64 md:h-96 mb-6 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
        </div>
      </div>

      <hr className="my-12 border-gray-200 dark:border-neutral-800" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse bg-white dark:bg-neutral-900 p-6 rounded-lg border border-gray-200 dark:border-neutral-800">
            <div className="h-48 mb-4 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-4/5"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
