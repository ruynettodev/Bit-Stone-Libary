import { Library, BookOpen, Heart } from 'lucide-react'
import BookCard from './BookCard'

function BookList({ books, onToggleRead, onToggleFavorite, onDeleteBook }) {
  if (books.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-slate-900/20 p-6 lg:p-8 text-center fade-in border border-slate-200 dark:border-slate-700">
        <Library className="text-slate-400 dark:text-slate-500 mx-auto mb-4" size={48} />
        <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">
          Sua biblioteca está vazia
        </h3>
        <p className="text-slate-500 dark:text-slate-400 mb-4">
          Que tal adicionar seu primeiro livro favorito?
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-slate-400 dark:text-slate-500">
          <BookOpen size={16} />
          <span className="hidden sm:inline">Use o formulário ao lado para começar</span>
          <span className="sm:hidden">Use o formulário acima para começar</span>
        </div>
      </div>
    )
  }

  const favoriteBooks = books.filter(book => book.favorito)
  const readBooks = books.filter(book => book.lido)
  const unreadBooks = books.filter(book => !book.lido)

  return (
    <div className="fade-in">
      <div className="flex items-center gap-2 mb-4 lg:mb-6">
        <Library className="text-primary-600 dark:text-primary-400" size={20} />
        <h2 className="text-lg lg:text-xl font-semibold text-slate-800 dark:text-slate-100">
          Minha Biblioteca ({books.length} {books.length === 1 ? 'livro' : 'livros'})
        </h2>
      </div>

      {/* Container com scroll - altura máxima para não ultrapassar a tela */}
      <div className="space-y-4 lg:space-y-6 max-h-[calc(100vh-20rem)] lg:max-h-[calc(100vh-24rem)] overflow-y-auto scroll-area pr-2">
        {/* Livros favoritos */}
        {favoriteBooks.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <h3 className="text-base lg:text-lg font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2 sticky top-0 bg-white dark:bg-slate-800 pb-2">
              <Heart className="w-4 h-4 text-red-500 dark:text-red-400" />
              <span>Favoritos ({favoriteBooks.length})</span>
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto scroll-area">
              {favoriteBooks.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  onToggleRead={onToggleRead}
                  onToggleFavorite={onToggleFavorite}
                  onDeleteBook={onDeleteBook}
                />
              ))}
            </div>
          </div>
        )}

        {/* Livros não lidos */}
        {unreadBooks.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <h3 className="text-base lg:text-lg font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2 sticky top-0 bg-white dark:bg-slate-800 pb-2">
              <div className="w-3 h-3 bg-orange-500 dark:bg-orange-400 rounded-full"></div>
              <span>Para Ler ({unreadBooks.length})</span>
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto scroll-area">
              {unreadBooks.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  onToggleRead={onToggleRead}
                  onToggleFavorite={onToggleFavorite}
                  onDeleteBook={onDeleteBook}
                />
              ))}
            </div>
          </div>
        )}

        {/* Livros lidos */}
        {readBooks.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <h3 className="text-base lg:text-lg font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2 sticky top-0 bg-white dark:bg-slate-800 pb-2">
              <div className="w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full"></div>
              <span>Lidos ({readBooks.length})</span>
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto scroll-area">
              {readBooks.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  onToggleRead={onToggleRead}
                  onToggleFavorite={onToggleFavorite}
                  onDeleteBook={onDeleteBook}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookList
