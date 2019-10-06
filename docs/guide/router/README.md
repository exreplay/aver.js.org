# Vue Router

> Implementation of the Vue Router in aver.js

[[toc]]

## How it works

Every route you create should live inside the pages folder (even though you are not restricted to this behaviour). The most important part is that there has to be an `index.js` file, inside the folder, which either exports a valid routes `array` or a `function`. This file is importet by aver and extends or replaces the Vue Router configuration.

## Basic Configuration

The configuration has to be done inside the `index.js` file in the `pages` folder. Given the following example content inside the index file:

```js
export default [
    {
        name: 'home',
        path: '/',
        component: () => import('./Home').then(m => m.default)
    }
];
```

Aver automatically uses the Array as the [`routes`](https://router.vuejs.org/api/#routes) constructor option for Vue Router. In the upper case, the folder structure should look something like this:

``` bash
src
├─ pages
│  ├─ index.js
│  └─ Home
│     └─ index.vue
```

## Extended Configuration

As your appliction grows and gets more complex, there are cases where just exporting an `array` is not enough. Thats because you are able to export a `function` which basically lets you change the whole router configuration.

```js
export default ({ config, i18n }) => {
    const newConfig = {
        ...config
    };

    newConfig.routes = [
        {
            name: 'home',
            path: '/',
            component: () => import('./Home').then(m => m.default)
        }
    ];

    return newConfig;
};
```

:::warning
By using the `function` method, the router config gets replaced with the one you export. So keep in mind to either (like shown above) reuse the default config or set it on your own.
:::

The payload of the function is an `object` which holds the basic router config and the `vue-i18n` instance. The basic config looks like this:

``` js
{
    mode: 'history',
    fallback: false
}
```

Because aver supports `i18n` out of the box, the `vue-i18n` instance is passed to the function payload. This comes in handy if you need to for example translate the route paths.