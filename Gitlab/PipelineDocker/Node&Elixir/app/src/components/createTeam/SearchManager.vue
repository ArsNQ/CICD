<template>
  <div class="field">
    <label>Search Manager</label>
    <div class="radio-ctn">
      <span>By : </span>
      <sui-checkbox class="radio" label="username" radio value="username" v-model="type" />
      <sui-checkbox class="radio" label="email" radio value="email" v-model="type" />
    </div>
    <sui-input
        class="input"
        :loading="loading"
        type="text"
        name="searchInput"
        v-model="inputValue"
        :placeholder="`Enter manager ${type}`"
        @input="searchUser"
    />
    <div class="result">
      <UserSegment
          v-for="user in data"
          :user="user"
          :key="`segment-${user.id}`"
          :handleUser="handleUser"
          :isSelected="selectedManager && user.id === selectedManager.id"
      />
    </div>
  </div>
</template>

<script>
import UserSegment from "../team/modalComponents/UserSegment";
export default {
  name: "SearchUser",
  components: {UserSegment},
  props:{
    isOpen: {
      type: Boolean
    },
    selectManager: {
      type: Function
    },
    selectedManager: {
      type: Object
    }
  },
  data: () => ({
    inputValue: "",
    type: 'username',
    loading: false,
    data: []
  }),
  methods: {
    searchUser(value) {
      this.loading = true;
      return this.axios.get(`api/usersSearch?${this.type}=${value}`)
          .then(({data}) => {
            this.loading = false;
            this.data = data.data.filter((user) => user.role === "ROLE_ADMIN" || user.role === "ROLE_MANAGER")
          })
          .catch((error) => {
            this.loading = false;
            console.log(error)
          })
    },
    handleUser(user) {
      this.selectManager(user)
    },
    resetField() {
      this.inputValue = "";
    }
  },
  watch: {
    type: function() {
      return this.searchUser(this.inputValue);
    },
    isOpen: function(newValue) {
      if (newValue) this.searchUser(this.inputValue);
    }
  }
}
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
}

.field label {
  font-size: 20px;
}

.input  {
  width: 300px;
  margin-top: 10px;
}

.radio-ctn {
  margin: 10px 0;
}

.radio {
  margin-left: 10px;
}

.result {
  min-height: 200px;
  max-height: 350px;
  margin: 10px 0;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}



</style>
