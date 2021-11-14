<template>
  <fragment>
    <sui-modal-header>Add new users to the team <span v-if="team">{{team.name}}</span> </sui-modal-header>
    <sui-modal-content class="content-ctn-modal-add">
      <div class="tag-ctn">
        <TagUser v-for="user in users" :user="user" :onDelete="deleteUser" :key="`tag-${user.id}`" />
      </div>
      <sui-modal-description>
        <SearchUser ref="searchComponent" :team="team" :selectUser="selectUser" :usersSelected="users" :isOpen="isOpen" />
      </sui-modal-description>
    </sui-modal-content>
    <div class="action-modal-add">
      <sui-button positive :disabled="!users" class="btn-modal-add" @click.native="addUsers" >
        Add
      </sui-button>
      <sui-button class="btn-modal-add"  @click.native="onClose">
        Cancel
      </sui-button>
    </div>
  </fragment>
</template>

<script>
import SearchUser from "./modalComponents/SearchUser";
import TagUser from "./modalComponents/TagUser";
export default {
  name: "ModalAddContent",
  components: {TagUser, SearchUser},
  data: () => ({
    users: [],
  }),
  props: {
    isOpen: {
      type: Boolean
    },
    team: {
      type: Object
    },
    onClose: {
      type: Function
    },
    updateTeam: {
      type: Function
    }
  },
  methods: {
    selectUser: function(user) {
      if (!this.users.filter((item) => item.id === user.id ).length) this.users = [...this.users, user];
    },
    deleteUser :function (user){
      this.users = this.users.filter((item) => item.id !== user.id);
    },
    addUsers: function() {
      return this.axios.post(`/api/teams/${this.team.id}/members`,{
        users_id : this.users.map((user) => user.id)
      }).then(({data}) => {
        this.updateTeam({...data.data});
        this.onClose();
        this.users = [];
        if (this.$refs.searchComponent) this.$refs.searchComponent.resetField();
      })
    }
  }
}
</script>

<style>
.tag-ctn{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.action-modal-add {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px
}

.btn-modal-add {
  margin: 0 10px
}
.content-ctn-modal-add {
  position: relative;
}

</style>
