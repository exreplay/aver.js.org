# Configuration

Every code-snippet on this page must be included at `averjs-config.js` in your `/src` directory.
[[toc]]

## Plugins <Badge text="beta" type="error"/>

The current Plugin API is not in it´s final state and lacking of flexibility and configurability.

``` js
export default {
    //...
    plugins: ['package-name']
    //...
} 
```

::: danger
currently only for internal plugin creation, use at your own risk :skull:
:::
## Webpack
``` js
//...
base: chain => {
    // manipulate webpack chain config for server and client
},
server: chain => {
    // manipulate webpack chain config for server
},
client: chain => {
    // manipulate webpack chain config for client
},
sw: {
    // service worker...
}
//...
```
### Base
``` js
export default {
    //...
    webpack: {
        base: chain => {
            // manipulate webpack chain config for server and client
        }
    }
    //...
} 
```

### Server
``` js
export default {
    //...
    webpack: {
        server: chain => {
            // manipulate webpack chain config for server
        }
    }
    //...
} 
```
### Client
``` js
export default {
    //...
    webpack: {
        client: chain => {
            // manipulate webpack chain config for client
        }
    }
    //...
} 
```
### Service Worker
[Webpack workbox plugin from google](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)

``` js
export default {
    //...
    webpack: {
        sw: {
            cacheId: 'Foo',
            skipWaiting: Boolean,
            runtimeCaching: [
                {
                    urlPattern: /Bar/,
                    handler: 'networkFirst'
                },
                //...
            ]
        }
    }
    //...
} 
```

## i18n
configuration for [vue-i18n](https://kazupon.github.io/vue-i18n/) and [vue-i18n-loader](https://github.com/kazupon/vue-i18n-loader)
vue-i18n-loader is implemented in the standard webpack configuration, so you can use the i18n-block in your single-file-components
``` html
<i18n>
    {
        "en": {
            //...
        },
        "de": {
            //...
        }
    }
</i18n>
```
Customize your i18n configuration:
```js
export default {
    //...
    i18n: {
        locale: 'de',
        fallbackLocale: 'de'
    }
    //...
} 
```

## ProgressBar
configuration for [vue-progressbar](https://github.com/hilongjw/vue-progressbar)

``` js
export default {
    //...
    progressbar: {
        color: '#000000',
        failedColor: '#ffffff',
        thickness: '2px',
        transition: {
            speed: '0.4s',
            opacity: '0.8s',
            termination: 400
        },
        autoRevert: true,
        location: 'left',
        inverse: false
    }
    //...
} 
```