CREATE DATABASE IF NOT EXISTS books_api;

USE books_api;

CREATE TABLE authors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birth_year INT,
    nationality VARCHAR(50)
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    author_id INT,
    publication_year INT,
    pages INT,
    genre VARCHAR(50),
    isbn VARCHAR(20) UNIQUE,
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

-- Testdata
INSERT INTO authors (name, birth_year, nationality) VALUES
('J.K. Rowling', 1965, 'British'),
('George Orwell', 1903, 'British'),
('Astrid Lindgren', 1907, 'Swedish'),
('Stephen King', 1947, 'American'),
('Agatha Christie', 1890, 'British');

INSERT INTO books (title, author_id, publication_year, pages, genre, isbn) VALUES
('Harry Potter and the Philosopher''s Stone', 1, 1997, 223, 'Fantasy', '978-0747532699'),
('Harry Potter and the Chamber of Secrets', 1, 1998, 251, 'Fantasy', '978-0747538493'),
('1984', 2, 1949, 328, 'Dystopia', '978-0451524935'),
('Animal Farm', 2, 1945, 112, 'Political Fiction', '978-0451526342'),
('Pippi Långstrump', 3, 1945, 160, 'Children', '978-9129697704'),
('Ronja Rövardotter', 3, 1981, 240, 'Children', '978-9129697711'),
('The Shining', 4, 1977, 447, 'Horror', '978-0385121675'),
('It', 4, 1986, 1138, 'Horror', '978-0450411434'),
('Murder on the Orient Express', 5, 1934, 256, 'Mystery', '978-0062693662'),
('And Then There Were None', 5, 1939, 272, 'Mystery', '978-0062073488');