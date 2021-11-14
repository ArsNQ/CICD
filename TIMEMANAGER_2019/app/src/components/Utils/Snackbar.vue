<template>
  <snackbar ref="snackbar" :holdTime="config.holdTime" :multiple="true" :position="config.position" />
</template>

<script>
import snackbar from 'vuejs-snackbar';
export default {
  name: "Snackbar",
  components : {
    snackbar
  },
  data: () => ({

  }),
  mounted: function() {
    this.$nextTick(() => {
      this.$store.dispatch("snackbar/updateRef", this.$refs.snackbar);
    })
  },
  computed: {
    config : function () {
      return this.$store.getters["snackbar/config"];
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
