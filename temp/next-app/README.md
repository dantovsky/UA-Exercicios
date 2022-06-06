# `Frontend` do Projero da disciplina de Serviços para Aplicações Web e Móveis

Developer: Dante Ferreira Marinho

## Como rodar a app

Instalar dependências
```
npm install
```

Rodar o projeto

```
npm run dev
```

## Requisitos

- [x] Listar todos os eventos
- [x] Listar os detalhes um evento (GET by ID)
- [x] Adicionar um evento
- [x] Atualizar um evento
- [x] Remover um evento
- [x] Restaurar o estado inicial da BD

## Regras de negócio

- [x] Listar todos os eventos assim que entra na app
- [x] Validar os dados, ao adicionar eevnto, para ir de encontro com os requisitos da API e estrutura da BD
- [x] Quando a pesquisa não traz resultados, não deve exibir a listagem e deve apresentar uma mensagem

# Help links

How to change port in Next.js App  
https://onecompiler.com/posts/3w5u9patd/how-to-change-port-in-next-js-app

React: how to pass arguments to the callback  
https://stackoverflow.com/questions/41807604/react-how-to-pass-arguments-to-the-callback

Modern API data-fetching methods in React  
https://blog.logrocket.com/modern-api-data-fetching-methods-react/

React app 'crashes' due to fetch/axios inability to correctly pass error to catch block  
https://stackoverflow.com/questions/67401141/react-app-crashes-due-to-fetch-axios-inability-to-correctly-pass-error-to-catc

Material UI  
https://mui.com/material-ui/getting-started/usage/

How to get the value of an input field using ReactJS?  
https://stackoverflow.com/questions/36683770/how-to-get-the-value-of-an-input-field-using-reactjs


# COPY do package.json

Cópia de 04/06/2022 (roda perfeito com node v14.19.3 e npm v6.14.17)
```json
{
  "name": "projeto-sawm-frontend",
  "version": "1.0.0",
  "description": "Parte frontendo do Projeto de Serviços para Aplicações Web e Móveis",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@emotion/react": "^11.9.0",
    "@emotion/styled": "^11.8.1",
    "@mui/icons-material": "^5.8.2",
    "@mui/material": "^5.8.2",
    "@zeit/next-sass": "^1.0.1",
    "next": "^10.0.3",
    "node-sass": "^5.0.0",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "sass": "^1.30.0"
  },
  "devDependencies": {
    "link": "^1.5.0",
    "npm": "^8.12.0",
    "webpack": "^4.44.0"
  }
}
```

Cópia de 05/06/2022 (depois das atualizações dos pacotes e melhoria do uso do SASS
```json
{
  "name": "projeto-sawm-frontend",
  "version": "1.0.0",
  "description": "Parte frontendo do Projeto de Serviços para Aplicações Web e Móveis",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start"
  },
  "keywords": [],
  "author": "Dante Marinho",
  "license": "ISC",
  "dependencies": {
    "@emotion/react": "^11.9.0",
    "@emotion/styled": "^11.8.1",
    "@mui/icons-material": "^5.8.2",
    "@mui/material": "^5.8.2",
    "next": "^12.1.6",
    "react": "^18.1.0",
    "react-dom": "^18.1.0"
  },
  "devDependencies": {
    "link": "^1.5.0",
    "npm": "^8.12.0",
    "sass": "^1.52.2",
    "webpack": "^4.44.0"
  }
}
```