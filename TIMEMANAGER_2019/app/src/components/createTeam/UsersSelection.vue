<template>
  <fragment>
    <div class="field">
      <span class="title"> Users</span>
      <sui-button class="btn-open" @click="openModal">
        Add users
      </sui-button>
    </div>
    <sui-modal v-model="openAdd" >
      <SelectionUsersModal :users="users" :selectUser="selectUser" :isOpen="openAdd" :onClose="onClose" />
    </sui-modal>
  </fragment>
</template>

<script>
import SelectionUsersModal from "./SelectionUsersModal";
export default {
  name: "UsersSelection",
  props: ["users","selectUser"],
  components: {SelectionUsersModal},
  data: () => ({
    openAdd: false
  }),
  methods: {
    openModal: function() {
      this.openAdd= true;
    },
    onClose: function () {
      this.openAdd = false
    }
  }
}
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
}

.title {
  margin: 20px 0;
  font-size: 20px;
  font-weight: bold;
}
.btn-open {
  margin-top: 10px;
  width: 300px;
}

</style>
