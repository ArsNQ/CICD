<template lang="html">
    <div  class="container">
        <sui-sidebar-pushable class="desktop-menu" v-if="user.isConnected">
            <sui-menu
                    is="sui-sidebar"
                    :visible="visible"
                    inverted
                    vertical
                    :animation="isMobile ? 'overlay' : undefined"
                    v-on:click="isMobile ? visible = false : undefined"
            >
                <img class="logo" src="../assets/logo_white.png"/>
                <sui-menu-item>
            <div class="ui center aligned basic segment">
              <p>Welcome {{ user.username }} !</p>
            </div>
          </sui-menu-item>
          <router-link
              is="sui-menu-item"
              active-class="active"
              to="/dashboard"
          >
            <sui-icon name="home" /> Dashboard
          </router-link>
          <router-link
              is="sui-menu-item"
              active-class="active"
              to="/profile"
          >
            <sui-icon name="user circle" /> Profile
          </router-link>
          <router-link
              is="sui-menu-item"
              active-class="active"
              to="/teams"
          >
            <sui-icon name="users" /> My teams
          </router-link>
          <router-link
            v-if="user.role == 'ROLE_ADMIN'"
            is="sui-menu-item"
            active-class="active"
            to="/Administration"
          >
            <sui-icon name="chess queen" /> Admin
          </router-link>


           <sui-menu-item
               @click="logOut"
               class="no-link-item"
           >
             <sui-icon class="logoutIcon" name="sign out alternate icon" /> Logout
           </sui-menu-item>
        </sui-menu>
        <sui-sidebar-pusher>
            <div class="pusher" id="main-content">
                <!-- Top Fixed Menu -->
                <sui-menu fixed="top" class="mobile-menu">
                    <a
                        is="sui-menu-item"
                        v-on:click="visible = !visible"
                    >
                        <sui-icon name="big bars" />
                    </a>
                </sui-menu>
                <div class="row" id="page-content" v-on:click="isMobile ? visible = false : undefined">
                    <slot></slot>
                </div>
            </div>
        </sui-sidebar-pusher>
      </sui-sidebar-pushable>
      <slot v-else></slot>
    </div>
</template>

<script>

export default {
  name: 'Sidebar',

  data() {
    return {
      windowWidth: window.innerWidth,
      visible: window.innerWidth > 768 ? true : false,
      isMobile: window.innerWidth > 768 ? false : true,
    }
  },
  computed: {
      user() {
          return this.$store.getters["user/me"]
      }
  },
  watch: {
      windowWidth(newWidth, oldWidth) {
        if (newWidth > 768) {
            this.visible = true;
            this.isMobile = false;
        } else {
            this.visible = false;
            this.isMobile = true;
        }
      }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    logOut() {
        this.$store.dispatch("user/logout")
    },
  }
};
</script>
<style scoped>
    .container {
      height: 100vh;
      width: 100vw;
    }

    #main-content {
        height: 100vh;
        overflow-y: auto;
    }

    #page-content {
        height: -webkit-fill-available;
        height: -moz-fill-available;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 50px;
        margin-bottom: 50px;
    }

    .sidebar.visible + .pusher {
        width: calc(100% - 260px);
    }

    .mobile-menu {
        display: none;
    }

    .no-link-item {
      cursor: pointer;
    }

    .no-link-item:hover {
      background-color: rgba(255,255,255,.08)!important;
      color: #fff!important;
    }

    .logo {
        margin-left: 25%;
        margin-top: 5%;
        height: 105px;
        width: 125px;
    }
    @media screen and (max-width: 768px) {
        .mobile-menu {
            display: block !important;
        }
        .sidebar.visible + .pusher {
            width: 100%;
        }
        #page-content {
            margin-top: 80px;
        }
    }
</style>
