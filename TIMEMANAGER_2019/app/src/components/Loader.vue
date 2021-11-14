<template>
  <MoonLoader :loading="true" color="#21ba45" :size="size" />
</template>

<script>
import MoonLoader from 'vue-spinner/src/MoonLoader.vue'
export default {
  name: "Loader",
  props: {
    size :{
      type: String,
      default: "60px"
    }
  },
  components: {
    MoonLoader
  }
}
</script>

<style scoped>

</style>
