# Vue Meta

To manage the metadata for your webapp, we use [vue-meta](https://vue-meta.nuxtjs.org/). The package is also implemented in a way to support SSR.

## How to use it

Every Page-Level component can hold a `metaInfo` Object or Function. When using the class based component approach, you can define a class method or set the object inside the `@Component` class decorator. For a more detailed documentation of whats possible, head over to the [Vue Meta API Documentation](https://vue-meta.nuxtjs.org/api/).

#### Default usage
``` vue
<script>
  export default {
    metaInfo: {
      title: 'Welcome',
      titleTemplate: '%s | Site'
    }
  }
</script>
```

#### Class based usage
This works because internally we register a hook to `vue-class-components` for `metaInfo`.
``` vue
<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Home extends Vue {
    metaInfo() {
      return {
        title: 'Welcome',
        titleTemplate: '%s | Site'
      }
    }
  }
</script>
```