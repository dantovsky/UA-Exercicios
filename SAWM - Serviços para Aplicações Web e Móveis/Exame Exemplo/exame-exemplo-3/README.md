# Exame Exemplo 3

Neste app de treino realizei uma separação do code adicionando o controllers/artigosController.js.  
Foi feito o mais direto possível e ainda foi criado um Middleware para verificar a existência do ID antes de seguir para a ação.

# Pacotes instalados

- nodemon
- mysql
- cors

# DB

```sql
CREATE DATABASE exame_exemplo_3;
USE exame_exemplo_3;

CREATE TABLE artigos (
    id int NOT NULL AUTO_INCREMENT,
    autores varchar(255) NOT NULL,
    titulo varchar(255),
    keywords varchar(255),
    documento varchar(255),
    nacionalidade varchar(255),
    data date,
    PRIMARY KEY (id)
);
```

# Exemplos

Inserir artigo
```json
{
	"autores": "Dante Marinho",
	"titulo": "Meu Livrinho Perfeito",
	"keywords": "books",
	"documento": "meu-book.pdf",
	"nacionalidade": "Brasil",
	"data": "2021-08-15"
}
```