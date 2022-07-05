# Aula 24/04/2022

## Escolher um dos exercícios

01. Utilizando o Swagger documente uma API que permita a gestão de uma `livraria`, e utilizando o Express, implemente a API REST documentada.
02. Utilizando o Swagger documente uma API que permita a gestão de uma `lista de tarefas`, e utilizando o Express, implemente a API REST documentada.

Passos para o exercício
- definir os endpoints
- implementar a documentação no Swagger no file yaml
- implementar os serviços REST

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