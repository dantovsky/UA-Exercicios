# BD

## Questão 1 ::

```sql
CREATE DATABASE exame_exeplo_2;

CREATE TABLE artigos (
    id int NOT NULL AUTO_INCREMENT,
    autores varchar(255) NOT NULL,
    titulo varchar(255),
    keywords varchar(255),
    documento varchar(255),
    nacionalidade_autor varchar(255),
    PRIMARY KEY (id)
);
```

# Packages instalados

- nodemon
- mysql
- cors

# Exemplo de JSON para inserir artigo

```json
{
	"autores": "Dan",
	"titulo": "O Meu Artigo",
	"keywords": "artigos, books",
	"documento": "meu-artigo.pdf",
	"nacionalidade_autor": "Brasil"
}
```

# Possíveis problemas para o exame

- user do MySQL
- programa para testar a API (questão de login)
- dificuldade para encontrar conteúdo útil acerca do método fetch() no W3Schools
    Poderia permitir utilizar também o https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch