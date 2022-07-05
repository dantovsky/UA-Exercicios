# Exame Exemplo 4

# BD

```sql
CREATE DATABASE exame_exemplo_4;
USE exame_exemplo_4;

CREATE TABLE artigos (
    id int NOT NULL AUTO_INCREMENT,
    autores varchar(255) NOT NULL,
    titulo varchar(255),
    keywords varchar(255),
    documento varchar(255),
    nacionalidade varchar(255),
    PRIMARY KEY (id)
);
```

# Exemplos

```json
{
    "autores": "Dan",
    "titulo": "Meu Libro",
    "keywords": "books, love story",
    "documento": "meu-livro.pdf",
    "nacionalidade": "Portugal"
}
```