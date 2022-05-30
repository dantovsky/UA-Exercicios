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

# Comandos MySQL úteis

- Update da info de uma coluna  
  update artigos set autor = 'Dan Mar' where id = 1;

- Alterar estrutura uma coluna  
  alter table artigos modify autor varchar(255) not null;

## Dados para testar

POST » http://localhost:3000/artigos

```json
{
    "autor": "Dan Mar",
    "titulo": "O Poder da Ação",
    "keywords": "autoajuda, motivação",
    "documento": "o-poder-acao.pdf",
    "nacionalidade_autor": "Brasil"
}
```

# Links

REST API com Node.js: back-end e front-end  
https://imasters.com.br/back-end/rest-api-com-node-js-back-end-e-front-end

Fetch: POST JSON data  
https://stackoverflow.com/questions/29775797/fetch-post-json-data

SQL UPDATE all values in a field with appended string CONCAT not working
https://stackoverflow.com/questions/4128335/sql-update-all-values-in-a-field-with-appended-string-concat-not-working
```sql
update table_name set data = concat(data, 'a');
UPDATE mytable SET spares = CONCAT(spares, ',', '818') WHERE id = 1;
UPDATE table SET data = CONCAT_WS(',', data, 'a');
```