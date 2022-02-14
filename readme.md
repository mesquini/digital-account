# Digital Account API

<p align="center">
  <a href="#page_with_curl-summary">Introdução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#fire-getting-started">Começando</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#wave">Pré-requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-como-rodar">Como rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-recomendacoes">Recomendações</a>&nbsp;&nbsp;&nbsp;
</p>

## :page_with_curl: Introdução

This repository is a template for a microservice with the standard that a Digital Rent squad.
Express, TS, TypeORM, ESLint, Husky, Commitizen, TSRing (injection of dependencies), Swagger and more others.

## :fire: Começando

These instructions will get this project up and running in your machine.

Before you start developing:

- Modify the name in packege.json;
- Add in the .env.example the environment variations, if you have one;
- Change the swagger by adding the routes;
- Then modify the readme with the API information;

### :wave: Pré-requisitos

> [Node.js](http://nodejs.org/) \
> [YARN](https://yarnpkg.com/)

### :rocket: Como rodar

Running project:

- Clone the project:

  ```sh
  git clone git@gitlab.ingaia.com.br:digital-rent/microservices/template-node.git
  ```

- Open folder:

  ```sh
  cd template-node
  ```

- Install all packages via YARN:

  ```sh
  yarn
  ```

- Configure .env

- Dev mode:

  ```sh
  yarn dev
  ```

- Build mode:

  ```sh
  yarn build
  ```

## :information_source: Recomendações

> [StopLight](https://stoplight.io/) - Config Swagger \
> [VS Code](https://code.visualstudio.com/) - Editor Code
