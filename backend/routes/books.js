const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

// GET /api/books - Listar todos os livros
router.get('/', async (req, res) => {
  try {
    const { data: books, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar livros:', error);
      return res.status(500).json({
        error: 'Erro ao buscar livros',
        message: error.message
      });
    }

    res.json({
      success: true,
      data: books,
      count: books.length
    });
  } catch (error) {
    console.error('Erro interno:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Não foi possível buscar os livros'
    });
  }
});

// POST /api/books - Cadastrar novo livro
router.post('/', async (req, res) => {
  try {
    const { titulo, autor, ano } = req.body;

    // Validação básica
    if (!titulo || !autor || !ano) {
      return res.status(400).json({
        error: 'Dados incompletos',
        message: 'Título, autor e ano são obrigatórios'
      });
    }

    // Validar ano
    const anoNumero = parseInt(ano);
    if (isNaN(anoNumero) || anoNumero < 1000 || anoNumero > new Date().getFullYear() + 1) {
      return res.status(400).json({
        error: 'Ano inválido',
        message: 'O ano deve ser um número válido'
      });
    }

    const { data: newBook, error } = await supabase
      .from('books')
      .insert([
        {
          titulo: titulo.trim(),
          autor: autor.trim(),
          ano: anoNumero,
          lido: false,
          favorito: false
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Erro ao cadastrar livro:', error);
      return res.status(500).json({
        error: 'Erro ao cadastrar livro',
        message: error.message
      });
    }

    res.status(201).json({
      success: true,
      data: newBook,
      message: 'Livro cadastrado com sucesso!'
    });
  } catch (error) {
    console.error('Erro interno:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Não foi possível cadastrar o livro'
    });
  }
});

// PUT /api/books/:id/toggle-read - Marcar/desmarcar livro como lido
router.put('/:id/toggle-read', async (req, res) => {
  try {
    const { id } = req.params;

    // Primeiro, buscar o livro atual
    const { data: currentBook, error: fetchError } = await supabase
      .from('books')
      .select('lido')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return res.status(404).json({
          error: 'Livro não encontrado',
          message: 'O livro especificado não existe'
        });
      }
      throw fetchError;
    }

    // Alternar o status de lido
    const { data: updatedBook, error } = await supabase
      .from('books')
      .update({ lido: !currentBook.lido })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar livro:', error);
      return res.status(500).json({
        error: 'Erro ao atualizar livro',
        message: error.message
      });
    }

    res.json({
      success: true,
      data: updatedBook,
      message: `Livro marcado como ${updatedBook.lido ? 'lido' : 'não lido'}!`
    });
  } catch (error) {
    console.error('Erro interno:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Não foi possível atualizar o livro'
    });
  }
});

// PUT /api/books/:id/toggle-favorite - Marcar/desmarcar livro como favorito
router.put('/:id/toggle-favorite', async (req, res) => {
  try {
    const { id } = req.params;

    // Primeiro, buscar o livro atual
    const { data: currentBook, error: fetchError } = await supabase
      .from('books')
      .select('favorito')
      .eq('id', id)
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        return res.status(404).json({
          error: 'Livro não encontrado',
          message: 'O livro especificado não existe'
        });
      }
      throw fetchError;
    }

    // Alternar o status de favorito
    const { data: updatedBook, error } = await supabase
      .from('books')
      .update({ favorito: !currentBook.favorito })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar favorito:', error);
      return res.status(500).json({
        error: 'Erro ao atualizar favorito',
        message: error.message
      });
    }

    res.json({
      success: true,
      data: updatedBook,
      message: `Livro ${updatedBook.favorito ? 'adicionado aos' : 'removido dos'} favoritos!`
    });
  } catch (error) {
    console.error('Erro interno:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Não foi possível atualizar o favorito'
    });
  }
});

// DELETE /api/books/:id - Remover livro
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data: deletedBook, error } = await supabase
      .from('books')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          error: 'Livro não encontrado',
          message: 'O livro especificado não existe'
        });
      }
      console.error('Erro ao remover livro:', error);
      return res.status(500).json({
        error: 'Erro ao remover livro',
        message: error.message
      });
    }

    res.json({
      success: true,
      data: deletedBook,
      message: 'Livro removido com sucesso!'
    });
  } catch (error) {
    console.error('Erro interno:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Não foi possível remover o livro'
    });
  }
});

module.exports = router;
