---
sidebarDepth: 3
sidebar: auto
---

# API Reference

Every parameter described here, belongs into the `aver-config.js` file in your projects root directory.

## Basic Config

### i18n

- Type: `object`
- Default: `{ silentTranslationWarn: true }`

Set a default [vue-i18n](https://kazupon.github.io/vue-i18n/) config. You will need this to set the basic i18n config. If you need more control over the configuration, please consider creating a `i18n.js` entry file in your `src` folder which is described [here](/guide/i18n/#configuration).

### progressbar

- Type: `object | boolean`
- Default: `true`

Set the configuration for [vue-progressbar](https://github.com/hilongjw/vue-progressbar). When you leave the default value, internally the following configuration will be used.

``` js
{
  color: '#003B8E',
  failedColor: '#E0001A',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
```

### store

- Type: `object`
- Default: `{}`

Basic configuration for [vuex](https://vuex.vuejs.org). Only use this for really basic stuff. If you need more control, create a `store.js` entry file in your `src` folder. Head to the [vuex documentation](/guide/vuex/#configuration) page, to see how this works.

## Core

### aliases

- Type: `object`
- Default: `{}`

Extend server aliases for [module-alias](https://github.com/ilearnio/module-alias). The default aliases, set by aver, are:

``` js
{
  '@models': 'api/models',
  '@errors': 'api/errors',
  '@middlewares': 'api/middlewares',
  '@mail': 'api/mail',
  '@database': 'api/database',
  '@queues': 'api/queues',
  '@routes': 'api/routes'
}
```

### buildPlugins

- Type: `array`
- Default: `[]`

An array of plugins, which are only used in the build process. Check out the [Plugins section](/guide/plugins/), to learn more about Plugins.

### plugins

- Type: `array`
- Default: `[]`

An array of runtime plugins. Check out the [Plugins section](/guide/plugins/), to learn more about Plugins.

## Server

### csrf

- Type: `boolean`
- Default: `true`

Tell aver to either enable or disable csrf tokens. When enabled, a meta tag with the token is rendered to the page head on every request. Also the `X-CSRF-TOKEN` header, with the generated token, is set in the default axios headers.

### csrfExclude

- Type: `array`
- Default: `[]`

An array of paths which should be excluded from the csrf check.

### createRenderer

- Type: `object`
- Default: `{}`

Extend the bundle renderer options. Head over to the [Renderer Options Documentation](https://ssr.vuejs.org/api/#renderer-options) to see what is possible. Be carefull with this but it is really handy if you need some Server Side control for eg. directives.

```js
// aver-config.js
export default {
  createRenderer: {
    directives: {
      example(vnode, directiveMeta) {
        // Do something on the Server Side
      }
    }
  }
}
```

## Webpack

Note that the webpack config has to be in its own object with the `webpack` key.

```js
// aver-config.js
export default {
  webpack: {
  }
}
```

### babel

- Type: `object`
- Default: `{}`

Extend the config for the `@averjs/babel-preset-app` preset. This is usefull if you eg. want to use `core-js 3`.

### additionalExtensions

- Type: `array`
- Default: `[ 'js' ]`

An array which holds all the file extension which aver considers. Those extensions are used for entry files. This lets you eg. define the `ts` extension, create a `entry-client.ts` file and aver uses it.

### transpileDependencies

- Type: `array`
- Default: `[]`

An array of dependencies the `babel-loader` does not ignore while transpiling. If you have a dependencie which uses `esm` and you need to compile it, just add the package name to the array. Keep in mind that aver always transpiles `vue` files found in the modules directory.

### postcss

- Type: `object`
- Default: `{}`

Extend the config for the `postcss-loader` webpack plugin. The preset config is removed and processed separatly. See the [preset section](/api/#preset) below.

#### preset

- Type: `object`
- Default: `{}`

Additional presets for postcss. It has to be an object with an unique key. This allows plugins to eg. extend a preset.

### css

#### extract

- Type: `boolean`
- Default: `false`

Aver uses `extract-css-chunks-webpack-plugin` to extract css into css files. Set it to true to enable this behaviour.

#### styleResources

- Type: `object`
- Default: `{ resources: [], options: {} }`

Aver uses the `style-resources-loader`. This lets you define css files which are injected into every style block of your vue files.

The `resources` array holds all the paths to the css files you provide. The path has to be relative to your projects root folder. Internally those paths are getting resolved and set to the `patterns` parameter for the plugin.

The `options` object is for extending the plugins options, which can be found [here](https://github.com/yenshih/style-resources-loader#options).

### alias

- Type: `object`
- Default: 
```js
{
    '@': path.join(process.env.PROJECT_PATH),
    '@@': path.resolve(process.env.PROJECT_PATH, '../'),
    '@components': path.resolve(process.env.PROJECT_PATH, './components'),
    '@resources': path.resolve(process.env.PROJECT_PATH, './resources'),
    '@mixins': path.resolve(process.env.PROJECT_PATH, './mixins'),
    '@pages': path.resolve(process.env.PROJECT_PATH, './pages'),
    '@vuex': path.resolve(process.env.PROJECT_PATH, './vuex')
  }
```

Extend the webpack aliases set by aver.

### base

- Type: `function | boolean`
- Default: `false`

Extend the base webpack config for averjs. This config is used for the client and server. The chain from [webpack-chain](https://github.com/neutrinojs/webpack-chain) is passed to the function.

``` js
export default {
  webpack: {
    base: chain => {
      // manipulate webpack chain config for server and client
    }
  }
} 
```

### client

- Type: `function | boolean`
- Default: `false`

Extend the client webpack config for averjs.

``` js
export default {
  webpack: {
    client: chain => {
      // manipulate webpack chain config for client
    }
  }
} 
```

### server

- Type: `function | boolean`
- Default: `false`

Extend the server webpack config for averjs.

``` js
export default {
  webpack: {
    server: chain => {
      // manipulate webpack chain config for server
    }
  }
} 
```

### sw
- Type: `object | boolean`
- Default: `false`

Enable the [workbox-webpack-plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin) in averjs. The configuration you set is directly passed to the plugin.

If you use the `InjectManifest` mode, use a relative path to the src directory for the `swSrc` parameter.

``` js
export default {
  webpack: {
    sw: {
      cacheId: 'Foo',
      skipWaiting: Boolean,
      runtimeCaching: [
        {
          urlPattern: /Bar/,
          handler: 'networkFirst'
        }
      ]
    }
  }
} 
```


### process

- Type: `object`
- Default: `{ env: {} }`

Every parameter you pass in the `env` parameter is getting passed to the `webpack.DefinePlugin` plugin. This way your env variables are available on the client side.

``` js
export default {
  webpack: {
    process: {
      env: {
        'process.env.EXAMPLE': JSON.stringify(process.env.EXAMPLE)
      }
    },
  }
} 
```