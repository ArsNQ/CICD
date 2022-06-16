<template>
  <div class="container">
    <div
        class="btn-container"
        @click="prevent"
    >
      <sui-icon  name="ellipsis vertical" />
    </div>
    <transition name="dropdown-fade">
      <div class="dropdown" v-if="open" v-on-clickaway="toggleDropdown">
        <sui-segment raised class="segment" >
          <div class="field" @click="handleEditing">
            <sui-icon name="edit" class="icon-del" />
            <span>Edit</span>
          </div>
          <div class="field" v-if="user.role !== 'ROLE_ADMIN'" @click="promote">
            <sui-icon name="angle double up" class="icon-del" />
            <span>Promote</span>
          </div>
          <div class="field" @click="deleteUser">
            <sui-icon name="trash" class="icon-del"  />
            <span>Delete</span>
          </div>
        </sui-segment>
      </div>
    </transition>
  </div>
</template>

<script>
import { mixin as clickaway } from "vue-clickaway";
export default {
  name: "DropdownAdmin",
  props: ["user", "toggleEdit", "removeFromList", "updateUser" ],
  mixins: [clickaway],
  data: () => ({
    open: false
  }),
  methods: {
    prevent: function (event) {
      event.preventDefault();
      this.toggleDropdown();
    },
    toggleDropdown: function() {
      this.open = !this.open;
    },
    handleEditing: function () {
      this.toggleEdit();
      this.open = false;
    },
    deleteUser: function(event) {
      event.preventDefault();
      event.stopPropagation();
      return this.axios.delete(`/api/users/${this.user.id}`).then(() =>{
        this.removeFromList(this.user);
        this.$store.dispatch('snackbar/showSnackbar', {type:'info', message: `user ${this.user.username} successfully deleted`});
      })
    },
    promote: function () {
      const user = {...this.user};
      if (user.role === "ROLE_USER") {
        user.role = "ROLE_MANAGER";
      }else if (user.role === "ROLE_MANAGER") {
        user.role = "ROLE_ADMIN";
      }
      return this.axios.put(`/api/users/${this.user.id}`,{user}).then(() =>{
        this.updateUser(user);
        this.toggleDropdown();
      })

    }
  }
}
</script>

<style scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.1s ease-in-out;
}
.dropdown-fade-enter,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

.container {
  position: relative;

}

.btn-container {
  display: flex;
  justify-content: center;
  height: 28px;
  width: 28px;
  border-radius: 14px;
  background-color: #eee;
  padding-left: 0.25rem;
  padding-top: 4px;
  cursor: pointer;
}

.btn-container:hover {
  background-color: #ccc;
}

.segment {
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.field {
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-radius: 5px;
  transition: all 250ms;
  cursor: pointer;
}

.field:hover {
  background-color: #eee;
}

.field span {
  font-size: 18px;
}

.dropdown {
  position: absolute;
  right: 0px;
  top: 35px;
  z-index: 10;
}

.icon-del {
  height: fit-content;
  font-size: 18px;
}

</style>
