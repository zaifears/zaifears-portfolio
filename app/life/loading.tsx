export default function LifeLoading() {
  return (
    <section className="max-w-6xl mx-auto">
      <div className="mb-10 lg:mb-14">
        <div className="h-10 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4 animate-pulse"></div>
        <div className="h-6 w-full max-w-2xl bg-gray-200 dark:bg-gray-800 rounded mb-2 animate-pulse"></div>
        <div className="h-6 w-3/4 max-w-xl bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
      </div>
      
      {/* Featured Post Skeleton */}
      <div className="mb-16 lg:mb-20">
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-6 animate-pulse"></div>
        <div className="flex flex-col bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-3xl overflow-hidden animate-pulse">
          <div className="w-full h-64 md:h-112 bg-gray-200 dark:bg-gray-800"></div>
          <div className="p-6 md:p-8">
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
            <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded mb-3"></div>
            <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-6"></div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded mb-8"></div>
            <div className="h-10 w-36 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Grid Skeleton */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-8 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
          <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-800"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 animate-pulse overflow-hidden">
              <div className="h-56 w-full bg-gray-200 dark:bg-gray-800"></div>
              <div className="flex flex-col flex-1 p-6">
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-3"></div>
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                <div className="h-6 w-4/5 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
                <div className="space-y-2 mb-6 flex-1">
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
                  <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                </div>
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}