<template>
  <fragment>
    <div class="filter-container">
      <sui-input
          class="input"
          :loading="loading"
          type="text"
          name="searchInput"
          v-model="inputValue"
          placeholder="Filter by name of the team"
          @input="searchTeam"
      />

        <sui-dropdown
            placeholder="Manager"
            class="drpd"
            selection
            :options="options"
            v-model="inputManager"
        />

    </div>
  </fragment>
</template>

<script>
export default {
  name: "SearchTeamsAdmin",
  props: ["updateList", "updateFilter", "filterId"],
  data: () => ({
    loading: false,
    inputValue: "",
    options: [],
    inputManager: null
  }),
  methods: {
    searchTeam() {
      this.loading = true;
      return this.axios.get(`/api/teamsSearch?name=${this.inputValue}`).then(({data}) => {
        this.loading = false;
        this.updateList(data.data);
        const ownersObject = data.data.map((team) => team.owner)
            .reduce((acc, owner) => ({...acc, [owner.id]: owner}),{});
        this.options = Object.entries(ownersObject).reduce((acc,[id,owner])=> [...acc,{text: owner.username, value: id}],[{text:'All', value: null}]);
        this.updateFilter(null);
      })
    },
  },
  watch: {
    inputManager: function(owner) {
      this.updateFilter(owner);
    }
  },
  mounted() {
    this.searchTeam(this.inputValue)
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
  margin-right: 20px;
  margin-top: 10px;
}

.drpd  {
  margin-top: 10px;
}

.radio-ctn {
  margin: 10px 20px;
}

.radio {
  margin-left: 10px;
}

</style>
