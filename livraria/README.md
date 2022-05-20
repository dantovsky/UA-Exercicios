# Aula 24/04/2022

## Escolher um dos exercícios

01. Utilizando o Swagger documente uma API que permita a gestão de uma `livraria`, e utilizando o Express, implemente a API REST documentada.
02. Utilizando o Swagger documente uma API que permita a gestão de uma `lista de tarefas`, e utilizando o Express, implemente a API REST documentada.

Passos para o exercício
- definir os endpoints
- implementar a documentação no Swagger no file yaml
- implementar os serviços REST

### Definição dos endpoints

/livraria/livros        GET list all
/livraria/livro/:id     GET list by id
/livraria/livro         POST add new
/livraria/livro/:id     PUT edit
/livraria/livro/:id     DELETE remove

## Preparar o ambiente

Criar a pasta do projeto
- livraria

A partir da pasta raiz, instalar
- Express » npx express -generator
- Swagger
    » npm i swagger -ui-express -S
    » npm i js-yaml
    - Criar o file `swagger.yaml`
    - No file `app.js`, implementar estas linhas de code_
    ```js
        const swaggerUI = require('swagger -ui-express');
        var fs = require('fs');
        var jsyaml = require('js-yaml');
        var spec = fs.readFileSync('swagger.yaml', 'utf8');
        swaggerDocument = jsyaml.load(spec);
        
        app.use(
            '/api-docs',
            swaggerUI.serve ,
            swaggerUI.setup(swaggerDocument)
        )
    ```

Instalar as dependências
- npm install

Executar a app
- npm start

Aceder à app
- Endereço web » http://localhost:3000

# MySQL config

- Instalação do MySQL Server (as a Windows Server)
- Ininiar o serviço MySQL80
- CMD » mysql -u root -p
- Criar novo user:
```sql
CREATE USER 'dantiii'@'localhost' IDENTIFIED WITH mysql_native_password BY 'dantiii';
grant all privileges on *.* to 'dantiii'@'localhost';
```
- OU alterar o user root:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
```

Query para criar BD books e inserir dados:
```sql
CREATE DATABASE IF NOT EXISTS bookstore CHARACTER SET utf8 COLLATE utf8_general_ci;
USE bookstore;

CREATE TABLE books (
  id int(11) NOT NULL AUTO_INCREMENT,
  isbn int(11) NOT NULL,
  title varchar(70) NOT NULL,
  description varchar(300),
  author varchar(50),
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

INSERT INTO books (id, isbn, title, description, author) VALUES
(1, 01112223334, 'Seja Bom', 'Um livro que fala como você pode ser uma pessoa melhor.', 'Dante Marinho'),
(2, 01112223335, 'Fábicra de Vencedores', 'Destinado às pessoas com forte vertente empreendedora, ou que almejam essa conquista.', 'Janguiê Diniz'),
(3, 01112223336, 'The Duck Donad', 'A história de como surgiu um dos personagens mais caricatos que alguma vez já existiu.', 'Paul Erold'),
(4, 01112223337, 'The Beatles History', 'A história completa da vida e do surgimento do grupo que foi amado por todo o mundo.', NULL),
(5, 01112223338, 'Foco', 'Aprenda a como realizar taregas e finalizá-las.', NULL);
```

# Infos

Swagger Editor » ajudar a construir o file Swagger.yaml
Link: https://editor.swagger.io/

Install and use nodemon » How To Restart Your Node.js Apps Automatically with nodemon
https://www.digitalocean.com/community/tutorials/workflow-nodemon

# Help links

MySQL Community Downloads
https://dev.mysql.com/downloads/installer/

ER_NOT_SUPPORTED_AUTH_MODE - MySQL server
https://stackoverflow.com/questions/44946270/er-not-supported-auth-mode-mysql-server

Getting Started with MySQL
https://dev.mysql.com/doc/mysql-getting-started/en/

Upgrade Node and NPM
https://www.freecodecamp.org/news/how-to-update-node-and-npm-to-the-latest-version/

Adminer :: Database management in a single PHP file
https://www.adminer.org/#download

Node.js, MySQL and async/await
https://codeburst.io/node-js-mysql-and-async-await-6fb25b01b628

how to wait for database query to finish in node” Code Answer
https://www.codegrepper.com/code-examples/sql/how+to+wait+for+database+query+to+finish+in+node

Using Express.js Routes for Promise-based Error Handling
https://www.toptal.com/express-js/routes-js-promises-error-handling

# ORM - Object-Relational Mapping

» Permite o mapeamento entre um registo numa BD relacional e um objeto.

É também necessário instalar o driver para a BD escolhida:
```table
Biblioteca  | comando npm
Sequelize        | npm install sequelize
Bookshelv        | npm install ...
Waterline        | npm install ...
```

## Tipos de ataques

- Intection
- Quebras de autenticação e gestão de sessões
- Utilização scripts cruzados (Cross-Site Scripting - XSS)
- Pedidos externos (Cross-Site Request Forgery - CSRF)

# Swagger

## POST

{
  "id": 100,
  "isbn": 1234567892111,
  "title": "Titulo do livro",
  "description": "Descrição do livro muito legal",
  "author": "Dante Mar"
}