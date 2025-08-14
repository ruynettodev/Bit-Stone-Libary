-- Script para inserir 10 livros de exemplo no sistema Konige
-- Execute este script no SQL Editor do Supabase

INSERT INTO books (titulo, autor, ano, lido, favorito) VALUES
('1984', 'George Orwell', 1949, true, true),
('Dom Casmurro', 'Machado de Assis', 1899, true, false),
('O Senhor dos Anéis: A Sociedade do Anel', 'J.R.R. Tolkien', 1954, false, true),
('Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 1997, true, true),
('O Alquimista', 'Paulo Coelho', 1988, false, false),
('Cem Anos de Solidão', 'Gabriel García Márquez', 1967, false, true),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 1943, true, false),
('Clean Code', 'Robert C. Martin', 2008, false, true),
('Orgulho e Preconceito', 'Jane Austen', 1813, false, false),
('A Guerra dos Tronos', 'George R.R. Martin', 1996, false, true);

-- Verificar se os livros foram inseridos corretamente
SELECT 
    id,
    titulo,
    autor,
    ano,
    CASE WHEN lido THEN 'Lido' ELSE 'Para Ler' END as status_leitura,
    CASE WHEN favorito THEN 'Favorito' ELSE 'Normal' END as status_favorito,
    created_at
FROM books 
ORDER BY created_at DESC;
