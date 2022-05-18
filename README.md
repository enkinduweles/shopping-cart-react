<h1 align="center">Rocketshoes</h1>
<p align="center">Este projeto foi criado para o desafio do <strong> Programa Ignite da Rocketseat,</strong> através de um projeto base as atividades da aplicação foram criadas</p>

<p align="center">Acompanhando cada passo seu rumo ao próximo nível.</p>

<p align="center">
 <a href="#objetivo">Objetivo</a> •
 <a href="#tecnologias">Tecnologias</a> • 
 <a href="#rodando-o-app">Rodando o app</a> •
 <a href="#rotas">Rotas</a> •
 <a href="#licença">Licença</a> • 
 <a href="#autor">Autor</a>
</p>

<p align="center">
  <img src="https://media.giphy.com/media/hsqItGZnnh1BLEDzgt/giphy.gif" />
</p>

## Objetivo

Através do projeto base, criar as seguintes funcionalidades

- Adicionar um produto
- Remover um produto
- Adicionar ou remover quantidades de um produto
- Validar ação de adicionar produto com base no valor em estoque

## Rodando o app

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com),
[Node](https://nodejs.dev/),
[Yarn](https://yarnpkg.com/).

Além disto é bom ter um editor para trabalhar com o código como <a href="https://code.visualstudio.com/">VsCode</a>.

## Tecnologias

- [React](https://reactjs.org/)
- [Node sass](https://github.com/sass/node-sass)
- [Axios](https://axios-http.com)
- [Typescript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)
- [Polished](https://polished.js.org/)

## Rodando o app

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e .

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

Para rodar o frontend da aplicação

```bash
# Clone este repositório
$ git clone <https://github.com/enkinduweles/shopping-cart-react.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd shopping-cart-react

# Instale as dependências
$ yarn install

# Execute a aplicação em modo de desenvolvimento
# A aplicação inciará na porta:8080 - acesse <http://localhost:3000>
$ yarn start
```

Para rodar o backend da aplicação

```bash
# Executar server (fake api com json server)
# Server iniciará na porta: 3333 - acesse <http://localhost:3333>
$ yarn server
```

Para rodar os testes

```bash
$ yarn test
```

## Rotas

### Produtos

```
GET /products

GET /products/:id
```

### Estoque

```
GET /stock

GET /stock/:id
```

## Licença

Este projeto está sob a licença [MIT](https://github.com/enkinduweles/shopping-cart-react/blob/main/LICENSE)

## Autor

Feito com ❤️ por **Enkindú Weles** 👋 [Entre em contato](https://www.linkedin.com/in/enkindu-weles/)

**#NeverStopLearning**
