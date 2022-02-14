# Digital Account API

<div align="center">
  <a href="https://www.ume.com.br/">
    <img alt="logo" width="200" src="https://assets-global.website-files.com/60c113054112e93527bc6ec1/60c115f6684e466dd3d0d1f9_logo_ume.svg" />
  </a>
</div>

<p align="center">
  <a href="#page_with_curl-introdução">Introdução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#wave-pré-requisitos">Pré-requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-como-rodar">Como rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-recomendações">Recomendações</a>&nbsp;&nbsp;&nbsp;
</p>

<p align='center'>
  <a href="https://insomnia.rest/run/?label=DigitalAccount&uri=https%3A%2F%2Fgithub.com%2Fmesquini%2Fdigital-account%2Fblob%2Fmaster%2Finsomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

<div align="center">
  <img alt="project version" src="badges/project-version.svg" />
  <img alt="global coverage" src="badges/coverage.svg" />
</div>

## :page_with_curl: Introdução

| Method   | Endpoint                                            | Description                                                                            |
| -------- | --------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **GET**  | /health                                       | Informações sobre API Health e versão.                                         |
| **POST** | /digital-account                                     | Cria uma conta digital                                           |
| **POST** | /transfer                    | Faz transferencia entre duas contas |
| **GET** | /transfer/history/{document}                      |    Mostra todo historico de transações de uma conta  |                                                         |
| **GET**  | /swagger                                            | Mostra informações do swagger                  |

  Esse projeto foi desenvolvido aplicando Clean Code e SOLID.

- [Celebrate](https://www.npmjs.com/package/celebrate)/[JOI](https://www.npmjs.com/package/joi): validação da entrada de dados nas rotas;
- [Cpf-cnpj-validator](https://www.npmjs.com/package/cpf-cnpj-validator): Validar o documento e formatar ele;
- [Dotenv](https://www.npmjs.com/package/dotenv): para variável de ambiente;
- [Express](https://www.npmjs.com/package/express): framework para Node.js que fornece recursos mínimos para construção de servidores web;
- [Helmet](https://www.npmjs.com/package/helmet): Adicionar mais segurança na API;
- [Log4js](https://www.npmjs.com/package/log4js): para logs na aplicação;
- [Moment](https://www.npmjs.com/package/moment): formação/validação da data-time;
- [Morgan](https://www.npmjs.com/package/morgan): uma biblioteca que pode ser utilizada no NodeJS para salvar o log das requisições feitas a API;
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express): libera uma rota na API com a interface do Swagger;
- [tsyringe](https://www.npmjs.com/package/tsyringe): controla a injeção de dependência;
- [husky](https://www.npmjs.com/package/husky): padronizar os commits;
- [jest](https://www.npmjs.com/package/jest): para fazer os tests da API;
- [eslint](https://www.npmjs.com/package/eslint): padronizar a formação do código;

### :wave: Pré-requisitos

> [Node.js](http://nodejs.org/) \
> [YARN](https://yarnpkg.com/) \
> [VS Code](https://code.visualstudio.com/) - Editor Code

### :rocket: Como rodar

Rodando o proejto:

- Primeiramente clone o projeto:

  ```sh
  git clone https://github.com/mesquini/digital-account.git
  ```

- Abra a pasta:

  ```sh
  cd digital-account
  ```

- Instala todos os pacotes via YARN:

  ```sh
  npm i
  ```

- Dev mode:

  ```sh
  npm run dev
  ```

- Build mode:

  ```sh
  npm run build
  ```

## :information_source: Recomendações

> [StopLight](https://stoplight.io/) - Configuração do Swagger \
> [Insomnia](https://insomnia.rest/) - Configuração das requisições \
