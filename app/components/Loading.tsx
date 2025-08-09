export function Loading({ message = "Loading..." }: { message?: string }) {  
  return (  
    <div className="flex flex-col items-center justify-center min-h-[200px] text-center">  
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>  
      <p className="text-neutral-600 dark:text-neutral-400">{message}</p>  
    </div>  
  )  
}  
  
export function SkeletonCard() {  
  return (  
    <div className="bg-neutral-900 p-6 rounded-lg border border-neutral-800 animate-pulse">  
      <div className="flex items-center gap-6">  
        <div className="flex-grow">  
          <div className="h-6 bg-neutral-700 rounded mb-2 w-3/4"></div>  
          <div className="h-4 bg-neutral-700 rounded mb-4 w-full"></div>  
          <div className="h-4 bg-neutral-700 rounded w-1/4"></div>  
        </div>  
        <div className="w-20 h-20 bg-neutral-700 rounded-lg"></div>  
      </div>  
    </div>  
  )  
}  