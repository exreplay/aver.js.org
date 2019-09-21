# Vue Router

## General
- `/src/pages/index.js` router config exports:
    - routes - `Array`
    - function - `Function`
        - payload - `object`
            - standard router config - `object`
                ``` js
                {
                    mode: 'history',
                    fallback: false
                }
                ```
            - i18n instance - `vue-i18n`