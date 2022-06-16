<template>
  <div>
    <Auth>
      <Sidebar>
        <router-view />
      </Sidebar>
    </Auth>
    <Snackbar />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Auth from "./components/Auth";
import Snackbar from "./components/Utils/Snackbar";

export default {
  name: 'App',
  components: {
    Snackbar,
    Auth,
    Sidebar
  }
}
</script>
<style scoped>
.container{
  height: 100vh;
  width: 100vw;
}
</style>
