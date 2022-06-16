<template>
  <div class="container">
      <h1>Create a new team</h1>
    <div class="form-container">
      <div class="field">
        <label for="nameInput" class="label" >Name</label>
        <sui-input
            class="input"
            id="nameInput"
            type="text"
            name="searchInput"
            v-model="name"
            placeholder="Enter the name of the team"
        />
      </div>
      <ManagerSelection v-if="(user.role === 'ROLE_ADMIN' && manager === null) || user.role === 'ROLE_MANAGER'" :manager="manager" :selectManager="selectManager" />
      <div v-else >
        <div class="field">
          <span class="title">Manager</span>
          <UserSegment :user="manager" :customStyle="{width: '300px', margin: '0'}" />
          <sui-button negative class="btn-delete" @click="deleteManager">
            Delete
          </sui-button>
        </div>
      </div>
      <UsersSelection :users="users" :selectUser="selectUser" />
      <sui-segment class="tag-ctn">
        <TagUser v-for="user in users" :user="user"  :key="`tag-${user.id}`" :onDelete="removeUser" />
      </sui-segment>
      <sui-button
          positive
          class="btn-create"
          @click="createTeam"
          :disabled="!manager || !name"
      >
        Create Team
      </sui-button>
    </div>
  </div>
</template>

<script>
import ManagerSelection from "../components/createTeam/ManagerSelection";
import UserSegment from "../components/team/modalComponents/UserSegment";
import UsersSelection from "../components/createTeam/UsersSelection";
import TagUser from "../components/team/modalComponents/TagUser";
export default {
  name: "CreateTeam",
  components: {TagUser, UsersSelection, UserSegment, ManagerSelection},
  data: () => ({
    name: "",
    manager: null,
    users: []
  }),
  computed: {
    user: function () {
      return this.$store.getters["user/me"];
    }
  },
  mounted: function() {
    if (this.user.role === "ROLE_MANAGER") this.manager = {...this.user};
  },
  methods: {
    selectManager : function(manager) {
      this.manager = manager;
    },
    selectUser : function(user) {
      if (!this.users.filter((item) => item.id === user.id ).length ) {
        if (user.id !== this.manager?.id)this.users = [...this.users, user]
      }else {
        this.removeUser(user);
      }
    },
    deleteManager: function () {
      this.manager = null;
    },
    removeUser: function(user) {
      this.users = this.users.filter((item) => item.id !== user.id);
    },
    createTeam: function() {
      this.axios.post(`/api/teams`,{
        name: this.name,
        owner_id: this.manager.id,
        members: this.users.map((user) => user.id)
      }).then(()=> {
        this.$store.dispatch('snackbar/showSnackbar', {message: "Team successfully created", type:'info'})
        return this.$router.push({
          path: '/teams'
        })
      })
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.input {
  width: 300px;
}

.label {
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
}

.field {
  display: flex;
  flex-direction: column;
}

.title {
  margin: 20px 0;
  font-size: 20px;
  font-weight: bold;
}

.btn-delete {
  margin-top: 10px;
  width: 300px;
}

.btn-create {
  margin-top: 20px;
  width: 300px;
}

.tag-ctn{
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width:600px;
  min-width: 300px;
  min-height: 100px;
}

</style>
