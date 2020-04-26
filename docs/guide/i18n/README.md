# Vue I18n

Aver supports i18n out of the box by using the [vue-i18n](https://kazupon.github.io/vue-i18n/) package.

## How it works

To make i18n work with SSR, we use a cookie to store the current selected language. This way the server side knows what the current language is and can render the correct messages. The coookie which is set is named `language`.

## How to use it

Interally webpack is configured with [vue-i18n-loader](https://github.com/intlify/vue-i18n-loader) and so you are able to use `<i18n>` custom blocks in your Single file components.

```vue
<template>
  <div>
    {{ $t('hello') }}
  </div>
</template>

<i18n>
{
  "de": {
    "hello": "hallo"
  },
  "en": {
    "hello": "hello"
  }
}
</i18n>
```

To change the locale, the cookie also needs to be updated. To make that as easy as possible, we provide an instance variable `$locale` which holds two functions. It can be used in the script or template part.

### current

- Return: `{string} locale`

This function returns the currently set i18n locale.

### change

- Arguments:
  - `{string} locale`

This function accepts a string with the new locale, changes the locale in i18n and also updates the cookie.

### Example

```vue
<template>
  <div>
    <span @click="changeLocale"></span>
    <span>current locale is {{ $locale.current() }}</span>
    <span @click="$locale.change('en')">{{ $t('hello') }}</span>
  </div>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Test extends Vue {
    changeLocale() {
      this.$locale.change('en')
    }
  }
</script>

<i18n>
{
  "de": {
    "hello": "hallo"
  },
  "en": {
    "hello": "hello"
  }
}
</i18n>
```

## Configuration

If you need more control over the i18n configuration, you can add a `i18n.js` file in the `src` folder. This is also the way to go when you want to provide global messages for your app. The file needs to export a function which is getting passed the default configuration. Keep in mind that the config you export overwrites the default, so either reuse it or set your own.

```js
export default config => {
  return {
    ...config,
    messages: {
      de: {
        hello: 'hallo'
      },
      en: {
        hello: 'hello'
      }
    }
  };
};

```