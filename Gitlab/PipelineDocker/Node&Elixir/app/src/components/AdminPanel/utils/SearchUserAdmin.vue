<template>
  <fragment>
    <div class="filter-container" style="margin-top: 10px;">
      <sui-input
          class="input"
          :loading="loading"
          type="text"
          name="searchInput"
          v-model="inputValue"
          :placeholder="`Enter ${type}`"
          @input="searchUser"
      />
      <div class="radio-ctn" style="margin-top: 10px;">
        <span class="bold">By : </span>
        <sui-checkbox class="radio" label="username" radio value="username" v-model="type" />
        <sui-checkbox class="radio" label="email" radio value="email" v-model="type" />
      </div>
      <sui-dropdown
          style="margin-top: 10px;"
          class="drodp"
          placeholder="Role"
          selection
          :options="[
              {
                text: 'All',
                value: null,
              },
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
  </fragment>
</template>

<script>
export default {
  name: "SearchUserAdmin",
  props: ["updateList"],
  data: () => ({
    loading: false,
    inputValue: "",
    type: "username",
    role: null
  }),
  methods: {
    searchUser() {
      this.loading = true;
      return this.axios.get(`/api/usersSearch?${this.type}=${this.inputValue}${this.role ? `&role=${this.role}` : ''}`).then(({data}) => {
        this.loading = false;
        this.updateList(data.data);
      })
    },
  },
  watch: {
    type: function() {
      return this.searchUser();
    },
    role: function() {
      return this.searchUser();
    }
  },
  mounted() {
    this.searchUser(this.inputValue);
  }
}
</script>

<style scoped>
.filter-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
.field label {
  font-size: 20px;
}
.bold {
  font-weight: bold;
}
.input  {
  width: 300px;
}
@media screen and (max-width: 1050px) {
  .drodp {
    width: 100%;
  }

  .input {
    width: 100%;
  }
}

.radio-ctn {
  margin: 10px 20px;
}

.radio {
  margin-left: 10px;
}


</style>
