import { BookOpen } from 'lucide-react'

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-colors duration-300">
      <div className="text-center">
        <div className="relative mb-6">
          <BookOpen 
            className="text-primary-600 dark:text-primary-400 animate-pulse mx-auto mb-4" 
            size={48} 
          />
          <div className="absolute inset-0 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin w-16 h-16 mx-auto"></div>
        </div>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 mb-3">
          Carregando Bit Stone Library...
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          Aguarde enquanto buscamos seus livros favoritos
        </p>
        <div className="mt-4 flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
