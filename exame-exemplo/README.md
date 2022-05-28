# Exame exemplo

# Criação da BD

```sql
CREATE DATABASE exame_exemplo;
use exame_exemplo;

CREATE TABLE artigos (
    id int NOT NULL AUTO_INCREMENT,
    autor varchar(50) NOT NULL,
    titulo varchar(70),
    keywords varchar(255),
    documento varchar(255),
    nacionalidade_autor varchar(30),
    PRIMARY KEY (id)
);
```