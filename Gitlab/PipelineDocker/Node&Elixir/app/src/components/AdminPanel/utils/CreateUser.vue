<template>
  <fragment>
    <sui-button @click="toggle" class="btn">Create User</sui-button>
    <sui-modal v-model="open">
      <sui-modal-header>Create new user</sui-modal-header>
      <sui-modal-content class="content-modal" >
        <sui-modal-description class="modal-desc" >
          <div class="modal-inner">

            <div class="field" >
              <span>Username</span>
              <sui-input class="input-sui" v-model="username" />
            </div>
            <div class="field" >
              <span>Email</span>
              <sui-input class="input-sui" v-model="email" />
            </div>
            <div class="field" >
              <span>Password</span>
              <sui-input class="input-sui" v-model="password" type="password" />
            </div>
            <sui-dropdown
                placeholder="Role"
                class="select-role"
                selection
                :options="[
              {
                text: 'Employee',
                value: 'ROLE_USER',
              },
              {
                text: 'Manager',
                value: 'ROLE_MANAGER',
              },
              {
                text: 'Admin',
                value: 'ROLE_ADMIN',
              },
          ]"
                v-model="role"
            />
          </div>

        </sui-modal-description>
        <div class="action-modal-add">
          <sui-button positive @click="createUser">
            Create
          </sui-button>
        </div>
      </sui-modal-content>
    </sui-modal>
  </fragment>
</template>

<script>
export default {
  name: "CreateUser",
  props: ["addToList"],
  data: () => ({
    open: false,
    email: "",
    username: "",
    password: "",
    role: "ROLE_USER"
  }),
  methods : {
    toggle: function() {
      this.open = !this.open;
    },
    resetFields: function() {
      this.email= ""
      this.username= ""
      this.password= ""
      this.role= "ROLE_USER"
    },
    createUser:function() {
      this.axios.post(`/api/users`, {
        user: {
          email: this.email,
          username: this.username,
          password: this.password,
          role: this.role,
        }
      }).then(({data}) => {
        this.addToList(data.data);
        this.$store.dispatch('snackbar/showSnackbar', {message: `user ${data.data.username} successfully created`, type: 'info'});
        this.toggle();
        this.resetFields()
      })
    }
  }
}
</script>

<style scoped>

.btn {
  min-width: 100px;
}

@media screen and (max-width: 1200px) {
  .btn {

    width: 100%;
    margin-bottom: 20px;
  }
}

.modal-inner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.field {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.input-sui {
  width: 300px
}

.select-role {
  margin-top: 20px;
  width: 300px;
}

.action-modal-add {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px
}

</style>
