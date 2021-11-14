<template>
  <fragment>
    <sui-modal-header>Add new users to the team </sui-modal-header>
    <sui-modal-content class="content-ctn-modal-add">
      <sui-modal-description>
        <SearchUser ref="searchComponent" :team="{}" :selectUser="selectUser" :usersSelected="users" :isOpen="isOpen" />
      </sui-modal-description>
    </sui-modal-content>
    <div class="action-modal-add">
      <sui-button positive :disabled="!users" class="btn-modal-add" @click.native="onClose" >
        ok
      </sui-button>
    </div>
  </fragment>
</template>

<script>

import SearchUser from "../../components/team/modalComponents/SearchUser";
export default {
  name: "SelectionUsersModal",
  components: {SearchUser},
  props: ["isOpen","selectUser", "users", "onClose" ]
}
</script>

<style scoped>
.action-modal-add {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px
}

</style>
