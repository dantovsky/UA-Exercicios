Exame Exemplo (2º dev)

Nesta implementação eu fiz estritamente o que foi pedido no exame. Então não fiz validações com recurso a Middlewares e nem fiz um frontend mais aprimorado com listagem de todos os eventos, deixando-os clicáveis para exibição dos detalhes (como fiz no desenvolvimento 1 deste exame exemplo).

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

## Questão 2 ::

Respondido no file app.js

## Questão 3 ::

Respondido no file public/index.html

# Packages instalados

- nodemon
- mysql
- cors

# Exemplo de JSON para inserir artigo

```json
{
	"autores": "Dante",
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
    Poderia permitir utilizar também o https://developer.mozilla.org/en-US/
    
# Help links

https://www.w3schools.com/
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch