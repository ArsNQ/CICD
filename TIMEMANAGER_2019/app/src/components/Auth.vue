<template>
    <fragment>
        <div  v-if="isConnected === null" class="container">
          <Loader size="100px" />
        </div>
        <slot v-else></slot>
    </fragment>
</template>

<script>
    import Loader from "./Loader";
    export default {
        name: "Auth",
        components: {
          Loader

        },
        computed: {
          isConnected: function() {
              return this.$store.getters["user/me"].isConnected
          }
        },
        watch:  {
            isConnected(connected,oldValue) {
                if(connected === false) return this.$router.push({ path:  "/Sign"});
                if (oldValue === false || (connected && this.$route.path.toLowerCase() === "/sign") ) this.$router.push({ path:  "/Dashboard"});
            }
        },
        mounted() {
            if(this.isConnected === null) this.$store.dispatch('user/auth');
        }
    }
</script>

<style scoped>
  .container {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
