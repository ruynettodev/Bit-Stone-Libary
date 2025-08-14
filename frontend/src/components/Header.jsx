import { BookOpen, Star, CheckCircle, Heart, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

function Header({ totalBooks, readBooks, favoriteBooks = 0 }) {
  const { isDark, toggleTheme } = useTheme()
  const unreadBooks = totalBooks - readBooks
  const progressPercentage = totalBooks > 0 ? Math.round((readBooks / totalBooks) * 100) : 0

  return (
    <header className="text-center mb-6 lg:mb-8 fade-in">
      {/* Cabeçalho com título e botão de tema */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BookOpen className="text-primary-600 dark:text-primary-400" size={32} />
          <div className="text-left">
            <h1 className="text-2xl lg:text-4xl font-bold text-slate-800 dark:text-slate-100">
              Bit Stone Library
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Biblioteca de Livros Favoritos
            </p>
          </div>
        </div>
        
        {/* Botão de alternância de tema */}
        <button
          onClick={toggleTheme}
          className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:scale-105"
          title={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
        >
          {isDark ? (
            <Sun className="text-yellow-500" size={24} />
          ) : (
            <Moon className="text-slate-600" size={24} />
          )}
        </button>
      </div>
      
      <p className="text-slate-600 dark:text-slate-300 text-base lg:text-lg mb-6 max-w-2xl mx-auto">
        Organize seus livros favoritos de forma simples e acompanhe seu progresso de leitura.
      </p>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-slate-900/20 p-3 lg:p-4 border-l-4 border-primary-500 dark:border-primary-400 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2">
            <BookOpen className="text-primary-600 dark:text-primary-400" size={18} />
            <div>
              <p className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-100">{totalBooks}</p>
              <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-400">Total de Livros</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-slate-900/20 p-3 lg:p-4 border-l-4 border-red-500 dark:border-red-400 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2">
            <Heart className="text-red-600 dark:text-red-400" size={18} />
            <div>
              <p className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-100">{favoriteBooks}</p>
              <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-400">Favoritos</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-slate-900/20 p-3 lg:p-4 border-l-4 border-green-500 dark:border-green-400 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-green-600 dark:text-green-400" size={18} />
            <div>
              <p className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-100">{readBooks}</p>
              <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-400">Livros Lidos</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-slate-900/20 p-3 lg:p-4 border-l-4 border-orange-500 dark:border-orange-400 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-2">
            <Star className="text-orange-600 dark:text-orange-400" size={18} />
            <div>
              <p className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-slate-100">{unreadBooks}</p>
              <p className="text-xs lg:text-sm text-slate-600 dark:text-slate-400">Para Ler</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de progresso */}
      {totalBooks > 0 && (
        <div className="mt-6 max-w-md mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Progresso de Leitura</span>
            <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
