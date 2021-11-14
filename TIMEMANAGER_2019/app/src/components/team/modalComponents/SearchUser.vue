<template>
  <div class="field">
    <label>Search user</label>
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
        :placeholder="`Enter ${type}`"
        @input="searchUser"
    />
    <div class="result">
      <UserSegment
          v-for="user in data"
          :user="user"
          :key="`segment-${user.id}`"
          :isSelected="!!usersSelected.filter((item)=> item.id === user.id ).length"
          :handleUser="handleUser"
      />
    </div>
  </div>
</template>

<script>
import UserSegment from "./UserSegment";
export default {
  name: "SearchUser",
  components: {UserSegment},
  props:{
    selectUser: {
      type:Function
    },
    usersSelected: {
      type: Array
    },
    team: {
      type: Object
    },
    isOpen: {
      type: Boolean
    },
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
      console.log(value)
      return this.axios.get(`api/usersSearch?${this.type}=${value}`)
          .then(({data}) => {
            this.loading = false;
            this.data = this.team?.members ? data.data.filter((item) => !this.team.members.find((member) => member.id === item.id)) : data.data
          })
          .catch((error) => {
            this.loading = false;
            console.log(error)
          })
    },
    handleUser(user) {
      this.selectUser(user)
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
