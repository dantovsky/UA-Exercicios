# Challenge Talkdesk » Global Search React SSR

Goals: buila Global Search React SSR

Developer: Dante Ferreira Marinho | dantecnia@hotmail.com

## Challenge link:  
https://www.talkdesk.com/creative/creative-webdev-challenge/react-ssr/

## Data endpoint:  
https://www.talkdesk.com/wp-json/external/globalsearch

## Usable Programming Languages
- React
- Typescript (optional)
- SASS

## How to run this app

Install dependencies
```
npm install
```
Run the project

```
npm run dev
```

## Features done
- App using NextJS for SSR
- Search by a exact term
- Dinamically show category menu filter
- Styles using SCSS
- Using components
- Responsive app for mobile

## Features not implemented
- Pagination
- Search for multiples items in query tem
- Search button hidden when send query
- Couting exact category when click on menu filter ("Showing 'x' results for "term")
- Correct structure for link names
- Utilization of Redux for state mangement


# SAWM Project

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
  "name": "challenge-talkdesk",
  "version": "1.0.0",
  "description": "Challenge Talkdesk - Global Search React SSR",
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