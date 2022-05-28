# Projero da disciplina de Serviços para Aplicações Web e Móveis


## Definição dos endpoints


`Events`
- /events           `GET` list all events
- /events/:id       `GET` list an event by id
- /events           `POST` add new event
- /events/:id       `PUT` edit an event
- /events/:id       `DELETE` remove an event


## Como correr a app


Correr um dos comandos:
- npm start
- npm run dev


## MySQL config


- Instalação do MySQL Server (as a Windows Server)
- Ininiar o serviço MySQL80
- CMD » mysql -u root -p
- Inserir a password do MySQL
- Criar novo user:
```sql
CREATE USER 'dantiii'@'localhost' IDENTIFIED WITH mysql_native_password BY 'xpto';
grant all privileges on *.* to 'dantiii'@'localhost';
```


## Dados MySQL


Query para criar BD projeto_sawm e inserir dados:
```sql
CREATE DATABASE IF NOT EXISTS projeto_sawm CHARACTER SET utf8 COLLATE utf8_general_ci;
USE projeto_sawm;

CREATE TABLE events (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(70) NOT NULL,
  description varchar(300),
  country varchar(50) NOT NULL,
  city varchar(50) NOT NULL,
  date timestamp NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

INSERT INTO events (id, name, description, country, city, date) VALUES
(1, "Forró do Bom", 'O melhor festival de Forró da cidade do Porto.', 'Portugal', 'Lisboa', '2022-06-27'),
(2, "Evento 2", 'O melhor festival de Forró da cidade do Porto.', 'Portugal', 'Lisboa', '2022-08-11'),
(3, "Evento 3", 'O melhor festival de Forró da cidade do Porto.', 'Portugal', 'Porto', '2022-08-15'),
(4, "Evento 4", 'O melhor festival de Forró da cidade do Porto.', 'UK', 'London', '2022-09-10'),
(5, "Evento 5", 'O melhor festival de Forró da cidade do Porto.', 'France', 'Paris', '2022-11-20');
```