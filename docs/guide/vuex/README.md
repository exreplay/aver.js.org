# Vuex

> Implementation of vuex in aver.js

[[toc]]

## How it works

Aver looks for any folder, in the `src` dir, which is called `vuex` and requires all the files inside them automatically. Because we use `require.context`, set to watch recursively, to get your store files, you can place and nest your `vuex` folders.

## Configuration

You can either configure your vuex store in the aver config file or if you need more control over the store, you need to provide a `store.js` file in the root of the `src` folder.

Basic constructor options like setting the `strict` mode or disabling the `devtools`, can be done in the aver config. For anything else, please use the `store.js` file.
```js
// aver-config.js
export default {
  store: {
    strict: process.env.NODE_ENV === 'development'
  }
}
```

With the `store.js` file you are able to manipulate the whole store configuration. This is very helpful if you have plugins to register or you need to include a store module from a plugin. The `defaultConfig` is an `object` with the 2 following keys:

- *modules* `Object`
- *plugins* `Array`

```js
import SomeModuleFromPackage from 'implement-this-vuex-module';
export default ({ modules, plugins }) => {
  return {
    modules: {
      ...modules,
      ...SomeModuleFromPackage
    }
    plugins
  }
}
```

## Client hydration
## Vuex
- depends on @averjs/vuex-decorators
- server init action
- clientside hydration set initial state
- vuex persistate state automatically gets implemented
- hot reloading implemented

## Vuex modules
## Vuex-decorators