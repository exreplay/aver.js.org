# Vuex

> Implementation of vuex in aver.js

[[toc]]

## How it works

Aver looks for any folder, in the `src` dir, which is called `vuex` and requires all the files inside them automatically. Because we use `require.context`, set to watch recursively, you can create your folders anywhere you want. Every subfolder inside any `vuex` folder will be ignored.

``` bash
src
├─ vuex
│  ├─ TestStore.js        # This file will be required by aver
│  └─ subfolder
│     └─ test.js          # This file will not be required by aver
└─ pages
   └─ Home
      └─ vuex
         └─ TestStore.js  # This file will be required by aver
```

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

## Writing basic Vuex Store

To get you started, simply create a `vuex` folder which holds a `test.js` file with the following content:

```js
const state = () => ({
    test: 'test'
});

// getters
const getters = {
    getTest: (state) => {
        return state.test;
    }
};

// actions
const actions = {
    test({ state, commit }, val) {
        commit('setTest', val);
    }
};

// mutations
const mutations = {
    setTest(state, val) {
        state.test = val;
    }
};

export default {
    namespaced: true,
    moduleName: 'test',
    state,
    getters,
    actions,
    mutations
};

```

This is a basic Vuex Store which exports a Module called `test`. It is totally up to you how you structure your code inside the folder and files. So giving the following folder structur:

```
src
├─ vuex
│  ├─ test.js
│  └─ subfolder
│     ├─ state.js
│     ├─ getters.js
│     ├─ actions.js
│     └─ mutations.js
```

You are also able to split you Store into single files. The only restriction you should keep in mind is that if you want to create a Module, you need to export an additional key `moduleName`. We could also just use the filename but in our opinion this method is more versatile and gives you the freedom of naming your files however your convention is.

### Global Vuex Store

By leaving out the `moduleName`, you automatically create a global Vuex Store. Be aware that there can only be 1 global file, however it can be anywhere, in any `vuex` folder inside the `src` folder. Aver is clever enough to detect if there are multiple files, trying to set the global store, and tells you which was used and which were ignored. 

## Class-based Vuex Store

You can either write your Vuex Store the traditional way or use our package [@averjs/vuex-decorators](https://github.com/exreplay/vuex-decorators) which lets you use a classes. The package is installed alongside the `@averjs/core` package and you can use it right out of the box. Be aware that this Method only allows you to write Modules. If you need a global Vuex State, please use the traditional way.

This is how a Vuex Module could look like with decorators:
```js
// MyNewAwesomeVuexModuleFile.js
import { VuexClass, Action, HasGetterAndMutation } from '@averjs/vuex-decorators';
import axios from 'axios';

@VuexClass
export default class MyNewAwesomeVuexModuleFile {
  moduleName = 'myAwesomeVuexModule';

  @HasGetterAndMutation variable = 'awesome';

  get getAwesomeVariable() {
    return this.variable;
  }

  set setAwesomeVariable(payload) {
    this.variable = payload;
  }

  @Action async awesomeAction(url) {
    const { data } = await axios({ method: 'GET', url });
    this.$store.commit('variable', data);
  }
}
```

## The serverInit Action

Because aver supports SSR, it could be handy if there would be a way to execute a function on the server. This is where the `serverInit` Action comes in place. Aver looks in every Module you create and it the Action was found, it is executed on the server, to prefetch data you probably need for SSR. Using the `Decorators` method of writing a Module, this is how the `serverInit` Action could be implemented:

```js
// TestStore.js
import { VuexClass, Action, HasGetterAndMutation } from '@averjs/vuex-decorators';

@VuexClass
export default class Test {
  moduleName = 'test';

  @HasGetterAndMutation test = 'awesome';

  @Action async serverInit(context) {
    const { data } = await axios({ method: 'GET', url: 'api-for-prefetch' });
    this.$store.commit('test', data);
  }
}
```

Inside the Action you have access to the whole store, because it is initialized, before executing. Also the `context` from the server is passed to the Action and can be used.

> The server `context` is still a WIP. In a future release you should be able to manipulate it, to provide the data you need.

## Client Side Hydration

Because you are able to adjust your store on the server side, the client should know what the actual state is and use it. This is done by setting the `window.__INITIAL_STATE__` variable so the client can read and use it. This lets you use something like the `serverPrefetch` or the `asyncData` hook where you can call Vuex Actions and mutate states. By doing this, the server has the correct data to render the initial state of the requested page and the client knows where to pick up.

## Persisted State


## ToDo
- vuex persistate state automatically gets implemented
- hot reloading implemented