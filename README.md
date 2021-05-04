<p align="center">
  <a href="http://podcastr.yanlyra.com.br/">
    <img src="https://i.imgur.com/XRtLWR7.png"/>
  </a>
</p>

Tabela de conteúdos
=================
<!--ts-->
  - [Tabela de conteúdos](#tabela-de-conteúdos)
  - [Sobre](#sobre)
  - [Pré-requisitos](#pré-requisitos)
  - [Backend](#backend)
  - [Iniciando](#iniciando)
  - [Tecnologias](#tecnologias)
<!--te-->

## Sobre

Este site foi desenvolvido durante a [NLW#05](http://nextlevelweek.com/) o mesmo tem como o objetivo organizar os podcastes em um site para ajudar os ouvintes a escolher o que o mesmo deseja escutar.


## Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e caso queria indico a utilziação do [Yarn](https://yarnpkg.com/). Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

# Backend

Este projeto roda em um backend fictício então antes de iniciar o projeto no seu pc é necessário criar um deploy no heroku para que o seu server possa rodar, clicando no botão abaixo este processo será feito automaticamente.

<p align="center">
  <a href="https://heroku.com/deploy?template=https://github.com/ylyra/nwl5api">
    <img src="https://camo.githubusercontent.com/83b0e95b38892b49184e07ad572c94c8038323fb/68747470733a2f2f7777772e6865726f6b7563646e2e636f6d2f6465706c6f792f627574746f6e2e737667"/>
  </a>
</p>

## Iniciando
```bash
# Clone este repositório
git clone <https://github.com/ylyra/podcastr>

# Acesse a pasta do projeto no terminal/cmd
cd podcastr

# Instale as dependências
npm install
# caso tenha instaldo o yarn rode o comando abaixo
yarn

# Execute a aplicação em modo de desenvolvimento
npm run dev
# ou
yarn dev

# O projeto iniciará na porta :3000 para acessar ele no localhost basta ir em <http://localhost:3000>


# Em services/api troque a baseURL pela sua url gerada pelo heroku
```

## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Axios](https://axios-http.com/)
- [date-fns](https://date-fns.org/)
- [FramerMotion](https://www.framer.com/motion/)
- [rc-slider](http://react-component.github.io/slider/)
- [Sass](https://sass-lang.com/)
- [TypeScript](https://www.typescriptlang.org/)

<p align="center">
  <a href="http://moveit.yanlyra.com.br/">
    <img src="https://img.shields.io/static/v1?label=Site&message=Move.it&color=7159c1&style=for-the-badge&logo=ghost"/>
  </a>
</p>