<template>
  <fragment>
    <SearchTeamsAdmin :updateList="updateList" :updateFilter="updateFilter" :filterId="filterId" />
    <div class="ui list" >
      <router-link
          v-for="(team) in result.filter(({owner}) =>filterId ?  (owner && owner.id == filterId) : true)"
         :key="`managedTeam-${team.id}`"
         :to="`/teams/${team.id}`"
         class="link"
      >
        <sui-segment class="team">
          <div>
            <span class="bold">{{ team.name }}</span>
          </div>
          <div class="right-team">
            <span class="bold">{{team.members.length}} members</span>
            <DropdownTeam
                :team="team"
                :removeTeam="removeFromList"
            />
          </div>
        </sui-segment>
      </router-link>
    </div>
  </fragment>
</template>

<script>
import SearchTeamsAdmin from "./utils/SearchTeamsAdmin";
import DropdownTeam from "../team/DropdownTeam";

export default {
  name: "AdminTeams",
  components: {
    SearchTeamsAdmin,
    DropdownTeam
  },
  data: () => ({
    result:[],
    filterId: null
  }),
  methods: {
    removeFromList(team) {
      this.result = this.result.filter((item) => item.id !== team.id);
      this.$store.dispatch('snackbar/showSnackbar', {type:'info', message: `team ${team.name} successfully deleted`});
    },
    updateList: function (newList) {
      this.result = newList;
    },
    updateFilter: function(filter) {
      this.filterId = filter;
    },
  },
}
</script>

<style scoped>
.list {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.link {
  margin: 10px;
  width: 100%;
  max-width: 400px;
}
.team {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin:5px;
  padding: 15px 5px 15px 20px;
  color: #333;


}

.team:hover {
  box-shadow: 0px 2px 4px 0px rgba(34, 36, 38, 0.12), 0px 2px 10px 0px rgba(34, 36, 38, 0.15);
}

.bold{
  font-weight: bold;
}


.right-team {
  display: flex;
  align-items: center;
}
.right-team span{
  margin-right: 10px;
  white-space: nowrap;

}


</style>
