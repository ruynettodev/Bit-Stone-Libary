import axios from 'axios'

// Configuração da URL base da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Criar instância do axios
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para log de requests (desenvolvimento)
api.interceptors.request.use(
  (config) => {
    console.log(`📡 ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error('❌ Erro na requisição:', error)
    return Promise.reject(error)
  }
)

// Interceptor para tratamento de responses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`)
    return response.data
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.data || error.message)
    
    // Tratamento personalizado de erros
    if (error.response?.status === 404) {
      throw new Error('Recurso não encontrado')
    } else if (error.response?.status >= 500) {
      throw new Error('Erro interno do servidor')
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Timeout na requisição')
    } else if (!error.response) {
      throw new Error('Erro de conexão. Verifique se o servidor está rodando.')
    }
    
    throw error
  }
)

export const bookService = {
  // Buscar todos os livros
  async getAllBooks() {
    try {
      return await api.get('/books')
    } catch (error) {
      console.error('Erro ao buscar livros:', error)
      throw error
    }
  },

  // Criar novo livro
  async createBook(bookData) {
    try {
      const { titulo, autor, ano } = bookData
      
      // Validação client-side
      if (!titulo?.trim() || !autor?.trim() || !ano) {
        throw new Error('Todos os campos são obrigatórios')
      }

      return await api.post('/books', {
        titulo: titulo.trim(),
        autor: autor.trim(),
        ano: parseInt(ano)
      })
    } catch (error) {
      console.error('Erro ao criar livro:', error)
      throw error
    }
  },

  // Alternar status de lido
  async toggleReadStatus(bookId) {
    try {
      if (!bookId) {
        throw new Error('ID do livro é obrigatório')
      }

      return await api.put(`/books/${bookId}/toggle-read`)
    } catch (error) {
      console.error('Erro ao atualizar status de leitura:', error)
      throw error
    }
  },

  // Alternar status de favorito
  async toggleFavoriteStatus(bookId) {
    try {
      if (!bookId) {
        throw new Error('ID do livro é obrigatório')
      }

      return await api.put(`/books/${bookId}/toggle-favorite`)
    } catch (error) {
      console.error('Erro ao atualizar status de favorito:', error)
      throw error
    }
  },

  // Deletar livro
  async deleteBook(bookId) {
    try {
      if (!bookId) {
        throw new Error('ID do livro é obrigatório')
      }

      return await api.delete(`/books/${bookId}`)
    } catch (error) {
      console.error('Erro ao deletar livro:', error)
      throw error
    }
  }
}

// Função para verificar conexão com a API
export const checkApiConnection = async () => {
  try {
    const response = await api.get('/health')
    console.log('✅ Conexão com API estabelecida:', response.message)
    return true
  } catch (error) {
    console.error('❌ Falha na conexão com API:', error.message)
    return false
  }
}
