# Getting started

[[toc]]

## Introduction
Aver is a progressive framework based on Vue.js with support for Server Server-Side Rendering.

Modern web applications need a lot of boilerplate to be powerful. It starts with setting up a bundler like webpack, get your server up and running with express, make use of SSR, and the list goes on.

Managing such a project can be painful and even more when you want to reuse all that logic in different projects. This is where we try to provide you a solid base which handles all that and you can concenrate on building awesome web applications.

## Features

- Server-Side Rendering
- i18n support using [vue-i18n](https://kazupon.github.io/vue-i18n/)
- Hot Module Replacement in development
- Plugin-System
- Code Splitting
- Transpile your code with Babel to ES2015+
- Support for class-based SFC using [vue-class-component](https://github.com/vuejs/vue-class-component) and [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)
- Writing class-based vuex modules with [vuex-decorators](https://github.com/exreplay/vuex-decorators)
- Server-Side API with express routes and middlewares

## Installation

There are 2 main packages you need to get started. One is the `@averjs/core` and the other is `@averjs/renderer`. The `core` holds the server logic like express to serve your application. The `renderer` handels the bundling of your application. By splitting the logic into 2 packages, the `renderer` can be placed in the `devDependencies` and all the bundling logic, which is not needed in production, is not getting installed.

To install both, execute the following commands inside a new and empty directory.

``` bash
yarn add @averjs/core
yarn add --dev @averjs/renderer

# or

npm install @averjs/core
npm install -D @averjs/renderer
```

### Setup

To get you started as fast as possible with a new project, there is a executable, which lets you set this up with ease.  

Jump into your working directory and execute the following command.
```bash
yarn aver init
```

When the executable is done setting up the new Project, you can start the dev server by executing `yarn run dev` or `npm run dev`.

### Folder structure

There are 2 main root folders, `api` and `src`. All your Vue.js code belongs inside the `src` and all the server side code belongs in the `api` folder. When you setup the project by running the `aver init` command, you will see how the `api` and `src` folders should be structured.

#### api folder
```
api
└───database (@database)
│   └───seeds
└───errors (@errors)
└───mail (@mail)
│   └───templates
└───middlewares (@middlewares)
└───models (@models)
└───queues (@queues)
└───routes (@routes)
```

#### src folder
```
src (@)
└───components (@components)
└───mixins (@mixins)
└───pages (@pages)
└───vuex (@vuex)
└───resources (@resources)
```