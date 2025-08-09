'use client'  
import { Component, ReactNode } from 'react'  
  
interface Props {  
  children: ReactNode  
  fallback?: ReactNode  
}  
  
interface State {  
  hasError: boolean  
  error?: Error  
}  
  
export class ErrorBoundary extends Component<Props, State> {  
  constructor(props: Props) {  
    super(props)  
    this.state = { hasError: false }  
  }  
  
  static getDerivedStateFromError(error: Error): State {  
    return { hasError: true, error }  
  }  
  
  componentDidCatch(error: Error, errorInfo: any) {  
    console.error('Error caught by boundary:', error, errorInfo)  
  }  
  
  render() {  
    if (this.state.hasError) {  
      return this.props.fallback || (  
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">  
          <div className="text-6xl mb-4">😵</div>  
          <h2 className="text-2xl font-bold mb-2 text-red-500">Oops! Something went wrong</h2>  
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">  
            Don't worry, this happens sometimes. Try refreshing the page.  
          </p>  
          <button  
            onClick={() => window.location.reload()}  
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"  
          >  
            Refresh Page  
          </button>  
        </div>  
      )  
    }  
    return this.props.children  
  }  
}  