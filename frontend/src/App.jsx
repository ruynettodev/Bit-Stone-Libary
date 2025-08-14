import { useState, useEffect } from 'react'
import Header from './components/Header'
import BookForm from './components/BookForm'
import BookList from './components/BookList'
import LoadingSpinner from './components/LoadingSpinner'
import { bookService } from './services/bookService'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Carregar livros ao iniciar a aplicação
  useEffect(() => {
    loadBooks()
  }, [])

  const loadBooks = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await bookService.getAllBooks()
      setBooks(response.data)
    } catch (err) {
      setError('Erro ao carregar livros. Tente novamente.')
      console.error('Erro ao carregar livros:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddBook = async (bookData) => {
    try {
      const response = await bookService.createBook(bookData)
      setBooks([response.data, ...books])
      return { success: true, message: response.message }
    } catch (err) {
      console.error('Erro ao adicionar livro:', err)
      return { 
        success: false, 
        message: err.response?.data?.message || 'Erro ao adicionar livro' 
      }
    }
  }

  const handleToggleRead = async (bookId) => {
    try {
      const response = await bookService.toggleReadStatus(bookId)
      setBooks(books.map(book => 
        book.id === bookId ? response.data : book
      ))
    } catch (err) {
      setError('Erro ao atualizar status do livro.')
      console.error('Erro ao atualizar livro:', err)
    }
  }

  const handleToggleFavorite = async (bookId) => {
    try {
      const response = await bookService.toggleFavoriteStatus(bookId)
      setBooks(books.map(book => 
        book.id === bookId ? response.data : book
      ))
    } catch (err) {
      setError('Erro ao atualizar favorito.')
      console.error('Erro ao atualizar favorito:', err)
    }
  }

  const handleDeleteBook = async (bookId) => {
    try {
      await bookService.deleteBook(bookId)
      setBooks(books.filter(book => book.id !== bookId))
    } catch (err) {
      setError('Erro ao remover livro.')
      console.error('Erro ao remover livro:', err)
    }
  }

  const readBooksCount = books.filter(book => book.lido).length
  const favoriteBooksCount = books.filter(book => book.favorito).length

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <Header totalBooks={books.length} readBooks={readBooksCount} favoriteBooks={favoriteBooksCount} />
        
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-500/50 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6 fade-in backdrop-blur-sm">
            {error}
            <button 
              onClick={() => setError(null)}
              className="float-right text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-200 transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <div className="xl:col-span-1 order-2 xl:order-1">
            <BookForm onAddBook={handleAddBook} />
          </div>
          
          <div className="xl:col-span-2 order-1 xl:order-2">
            <BookList 
              books={books} 
              onToggleRead={handleToggleRead}
              onToggleFavorite={handleToggleFavorite}
              onDeleteBook={handleDeleteBook}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
