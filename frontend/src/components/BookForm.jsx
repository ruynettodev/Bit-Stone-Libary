import { useState } from 'react'
import { Plus, BookPlus, Calendar, User } from 'lucide-react'

function BookForm({ onAddBook }) {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    ano: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const currentYear = new Date().getFullYear()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpar mensagem quando usuário digitar
    if (message.text) {
      setMessage({ type: '', text: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validação client-side
    if (!formData.titulo.trim() || !formData.autor.trim() || !formData.ano) {
      setMessage({
        type: 'error',
        text: 'Todos os campos são obrigatórios'
      })
      return
    }

    const ano = parseInt(formData.ano)
    if (isNaN(ano) || ano < 1000 || ano > currentYear + 1) {
      setMessage({
        type: 'error',
        text: `O ano deve estar entre 1000 e ${currentYear + 1}`
      })
      return
    }

    setLoading(true)
    
    try {
      const result = await onAddBook(formData)
      
      if (result.success) {
        setFormData({ titulo: '', autor: '', ano: '' })
        setMessage({
          type: 'success',
          text: result.message || 'Livro adicionado com sucesso!'
        })
      } else {
        setMessage({
          type: 'error',
          text: result.message || 'Erro ao adicionar livro'
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Erro inesperado. Tente novamente.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-slate-900/20 p-4 lg:p-6 fade-in border border-slate-200 dark:border-slate-700 sticky top-4">
      <div className="flex items-center gap-2 mb-4 lg:mb-6">
        <BookPlus className="text-primary-600 dark:text-primary-400" size={20} />
        <h2 className="text-lg lg:text-xl font-semibold text-slate-800 dark:text-slate-100">
          Adicionar Novo Livro
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo Título */}
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Título do Livro *
          </label>
          <div className="relative">
            <BookPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              placeholder="Ex: O Senhor dos Anéis"
              className="w-full pl-10 pr-4 py-2.5 lg:py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 transition-all placeholder-slate-400 dark:placeholder-slate-500"
              disabled={loading}
            />
          </div>
        </div>

        {/* Campo Autor */}
        <div>
          <label htmlFor="autor" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Autor *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
            <input
              type="text"
              id="autor"
              name="autor"
              value={formData.autor}
              onChange={handleInputChange}
              placeholder="Ex: J.R.R. Tolkien"
              className="w-full pl-10 pr-4 py-2.5 lg:py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 transition-all placeholder-slate-400 dark:placeholder-slate-500"
              disabled={loading}
            />
          </div>
        </div>

        {/* Campo Ano */}
        <div>
          <label htmlFor="ano" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Ano de Publicação *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
            <input
              type="number"
              id="ano"
              name="ano"
              value={formData.ano}
              onChange={handleInputChange}
              placeholder={`Ex: ${currentYear}`}
              min="1000"
              max={currentYear + 1}
              className="w-full pl-10 pr-4 py-2.5 lg:py-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 transition-all placeholder-slate-400 dark:placeholder-slate-500"
              disabled={loading}
            />
          </div>
        </div>

        {/* Mensagem de feedback */}
        {message.text && (
          <div className={`p-3 rounded-lg text-sm fade-in ${
            message.type === 'success' 
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-500/50' 
              : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-500/50'
          }`}>
            {message.text}
          </div>
        )}

        {/* Botão de envio */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600 disabled:bg-slate-400 dark:disabled:bg-slate-600 text-white font-semibold py-2.5 lg:py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span className="hidden sm:inline">Adicionando...</span>
              <span className="sm:hidden">Salvando...</span>
            </>
          ) : (
            <>
              <Plus size={16} />
              <span className="hidden sm:inline">Adicionar Livro</span>
              <span className="sm:hidden">Adicionar</span>
            </>
          )}
        </button>
      </form>

      <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
        * Campos obrigatórios
      </p>
    </div>
  )
}

export default BookForm
