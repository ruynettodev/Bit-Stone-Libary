import { useState } from 'react'
import { Check, RotateCcw, Trash2, Calendar, User, BookOpen, Heart } from 'lucide-react'

function BookCard({ book, onToggleRead, onToggleFavorite, onDeleteBook }) {
  const [loading, setLoading] = useState({ read: false, favorite: false, delete: false })

  const handleToggleRead = async () => {
    setLoading(prev => ({ ...prev, read: true }))
    try {
      await onToggleRead(book.id)
    } finally {
      setLoading(prev => ({ ...prev, read: false }))
    }
  }

  const handleToggleFavorite = async () => {
    setLoading(prev => ({ ...prev, favorite: true }))
    try {
      await onToggleFavorite(book.id)
    } finally {
      setLoading(prev => ({ ...prev, favorite: false }))
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja remover "${book.titulo}" da sua biblioteca?`)) {
      setLoading(prev => ({ ...prev, delete: true }))
      try {
        await onDeleteBook(book.id)
      } finally {
        setLoading(prev => ({ ...prev, delete: false }))
      }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-slate-900/20 border-l-4 transition-all duration-200 hover:shadow-lg relative border border-slate-200 dark:border-slate-700 ${
      book.lido 
        ? 'border-l-green-500 dark:border-l-green-400 bg-green-50/30 dark:bg-green-900/10' 
        : book.favorito
        ? 'border-l-red-500 dark:border-l-red-400 bg-red-50/30 dark:bg-red-900/10'
        : 'border-l-orange-500 dark:border-l-orange-400 hover:border-l-primary-500 dark:hover:border-l-primary-400'
    }`}>
      <div className="p-3 lg:p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Título */}
            <h3 className={`text-base lg:text-lg font-semibold mb-2 ${
              book.lido ? 'text-green-800 dark:text-green-300' : book.favorito ? 'text-red-800 dark:text-red-300' : 'text-slate-800 dark:text-slate-100'
            }`}>
              <div className="flex items-center gap-2">
                <BookOpen size={16} className={
                  book.lido ? 'text-green-600 dark:text-green-400' : book.favorito ? 'text-red-600 dark:text-red-400' : 'text-primary-600 dark:text-primary-400'
                } />
                <span className={`${book.lido ? 'line-through decoration-2' : ''} truncate`}>
                  {book.titulo}
                </span>
                {book.favorito && (
                  <Heart size={14} className="text-red-500 dark:text-red-400 fill-current flex-shrink-0" />
                )}
              </div>
            </h3>

            {/* Informações do livro */}
            <div className="space-y-1 mb-3">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <User size={12} />
                <span className="text-sm truncate">{book.autor}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Calendar size={12} />
                <span className="text-sm">{book.ano}</span>
              </div>
            </div>

            {/* Status e data de adição */}
            <div className="flex flex-col gap-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex gap-2 flex-wrap">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium text-xs ${
                  book.lido 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                    : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                }`}>
                  {book.lido ? (
                    <>
                      <Check size={10} />
                      <span className="hidden sm:inline">Lido</span>
                      <span className="sm:hidden">✓</span>
                    </>
                  ) : (
                    <>
                      <BookOpen size={10} />
                      <span className="hidden sm:inline">Para Ler</span>
                      <span className="sm:hidden">📖</span>
                    </>
                  )}
                </span>
                {book.favorito && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full font-medium text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                    <Heart size={10} />
                    <span className="hidden sm:inline">Favorito</span>
                    <span className="sm:hidden">❤️</span>
                  </span>
                )}
              </div>
              <span className="text-xs">
                <span className="hidden sm:inline">Adicionado em </span>
                {formatDate(book.created_at)}
              </span>
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-1.5 lg:gap-2 flex-shrink-0">
            <button
              onClick={handleToggleFavorite}
              disabled={loading.favorite}
              className={`p-2 lg:p-2.5 rounded-lg transition-all duration-200 flex items-center justify-center ${
                book.favorito
                  ? 'bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300'
                  : 'bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300'
              } disabled:opacity-50 hover:scale-105 disabled:hover:scale-100`}
              title={book.favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              {loading.favorite ? (
                <div className="animate-spin rounded-full h-3 w-3 lg:h-4 lg:w-4 border-2 border-current border-t-transparent"></div>
              ) : (
                <Heart size={14} className={book.favorito ? 'fill-current' : ''} />
              )}
            </button>

            <button
              onClick={handleToggleRead}
              disabled={loading.read}
              className={`p-2 lg:p-2.5 rounded-lg transition-all duration-200 flex items-center justify-center ${
                book.lido
                  ? 'bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-900/50 text-orange-700 dark:text-orange-300'
                  : 'bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300'
              } disabled:opacity-50 hover:scale-105 disabled:hover:scale-100`}
              title={book.lido ? 'Marcar como não lido' : 'Marcar como lido'}
            >
              {loading.read ? (
                <div className="animate-spin rounded-full h-3 w-3 lg:h-4 lg:w-4 border-2 border-current border-t-transparent"></div>
              ) : book.lido ? (
                <RotateCcw size={14} />
              ) : (
                <Check size={14} />
              )}
            </button>

            <button
              onClick={handleDelete}
              disabled={loading.delete}
              className="p-2 lg:p-2.5 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg transition-all duration-200 disabled:opacity-50 hover:scale-105 disabled:hover:scale-100"
              title="Remover livro"
            >
              {loading.delete ? (
                <div className="animate-spin rounded-full h-3 w-3 lg:h-4 lg:w-4 border-2 border-current border-t-transparent"></div>
              ) : (
                <Trash2 size={14} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard
