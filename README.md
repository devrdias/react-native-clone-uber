# React Native Template App

Template projeto React-native [React Native](https://facebook.github.io/react-native/)

Arquitetura escolhida para separar UI de lógica de negócio.

## Arquitetura

- **Presentational Components & Containers(Screens)**

    Presentational components => parte react, componentes menores;
    Containers => parte redux/saga (containers contém presentational components e conectam tudo ao redux/saga;
    
    [Post](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) do Dan Abramov sobre o assunto.

- **State/Store com Redux [Redux](https://redux.js.org/)**.

    Redux facilita o compartilhamento de estado entre todos os componentes da aplicação, evitando passar props entre diversos componentes.

    Com Redux, o estado é compartilhado utilizando *stores* globais, e alterações de estado são previsíveis: *actions* são aplicadas por *reducers* ao estado/store.
    
- **Chamadas Asyncronas são gerenciadas com [Redux Saga](https://redux-saga.js.org/)**.

    Sagas são disparadas por Redux Actions e também podem alterar a Store redux, utilizando Javascript generator  (`yield`).


## Links auxiliares

- [Pastas](#Pastas) estrutura de pastas do projeto
- [Redux](https://redux.js.org/) gerenciar estado global da aplicação
- [Redux Persist](https://github.com/rt2zz/redux-persist) Persiste store na AsyncStorage
- [Redux Sagas](https://redux-saga.js.org) controlar fluxos asyncronos 
- [React Navigation](https://reactnavigation.org/) 
    [`NavigationService`](App/Services/NavigationService.js) Usa navegaçao como um servico para tratar as rotas e adicionar splash screen
- [prettier](https://prettier.io/) & [eslint](https://eslint.org/) configurados pra react-native

### OPCIONAL - Bibliotecas auxiliáres para facilitar a integracao com redux e axios - não obrigatórias
- [reduxsauce](https://github.com/infinitered/reduxsauce) (v0.7) to facilitate using Redux
- [apisauce](https://github.com/infinitered/apisauce) facilita usar o axios [axios](https://github.com/axios/axios) 


## Pastas 

- [`App/Components`](App/Components): presentational components (telas)
- [`App/Config`](App/Config): configuracao global do app (variáveis, funções)
- [`App/Containers`](App/Containers): container components/ Screens - contém lógica redux
- [`App/Images`](App/Images): imagens da aplicacao
- [`App/Services`](App/Services): API
- [`App/Redux/Sagas`](App/Redux/Sagas): redux sagas
- [`App/Redux/Stores`](App/Redux/Stores): Config para criar store, aplicar middlewares, sagas, etc
- [`App/Redux/Actions`](App/Redux/Actions): actions e actions creators
- [`App/Redux/Reducers`](App/Redux/Reducers): reducers
- [`App/Redux/Helpers`](App/Redux/Helpers): helpers - auxiliam em funcoes get na store, padronizando chamadas 
- [`App/Theme`](App/Theme): thema para o app

## Requisitos 

- Node 8.+ 
- Xcode 9.+

Também instalar as dependências requeridas para React Native.

- [Android development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies-3)
- [iOS development](https://facebook.github.io/react-native/docs/getting-started.html#installing-dependencies)

## Utilizando o projeto

- clonar o repositório
- remova qualquer histórico do git: `rm -rf .git/`
- crie um novo projeto git: `git init`
- npm install 
- renomear o projeto utilizando [reacnt-native-rename](https://www.npmjs.com/package/react-native-rename), conforme abaixo:
```
$ npm install react-native-rename -g
$ git checkout -b rename-app
$ react-native-rename <novoNome> -b <com.agileteam.novoNome>

// Remove pastas android e ios antigas
$ rm -rf android/ ios/

// Regerar pastas android e ios com novo nome do app
$ react-native upgrade

$ react-native link 
```



## Rodando o projeto

- `react-native run-android` (lembre-se de já ter o emulador ou um telefone android conectado)
- `react-native run-ios`  (lembre-see de já ter o simulator ou um telefone iPhone conectado)

### Build para distribuição Betas

[Beta builds](docs/beta%20builds.md)
