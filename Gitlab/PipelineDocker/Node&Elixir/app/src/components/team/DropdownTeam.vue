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
      <sui-segment raised class="segment" @click="deleteTeam">
        <div class="field">
          <sui-icon name="trash" class="icon-del" />
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
  name: "DropdownTeam",
  props: ["team", "removeTeam"],
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
    deleteTeam: function(event) {
      event.preventDefault();
      event.stopPropagation();
      return this.axios.delete(`api/teams/${this.team.id}`)
          .then(() => {
            this.removeTeam(this.team);
          })
          .catch((error) => {
            console.log(error)
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
  padding: 12px;
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
