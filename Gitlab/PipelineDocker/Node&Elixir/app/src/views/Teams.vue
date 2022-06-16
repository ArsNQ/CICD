<template>
  <fragment>
    <div v-if="managedTeams.length" class="container">
      <h1>My Teams as manager</h1>
      <router-link v-for="(team) in managedTeams" :key="`managedTeam-${team.id}`" :to="`/teams/${team.id}`" class="link">
        <sui-segment class="team">
          <div>
            <span class="bold">{{ team.name }}</span>
          </div>
          <div class="right-team">
            <span class="bold">{{team.members.length}} members</span>
            <DropdownTeam
                v-if="user.role ==='ROLE_ADMIN' || user.id ===  (team && team.owner && team.owner.id)"
                :team="team"
                :removeTeam="removeTeam"
            />
          </div>
        </sui-segment>
      </router-link>
    </div>
    <div v-if="user.teams.length" class="container">
      <h1>My Teams</h1>
      <router-link v-for="(team) in user.teams || []" :key="`team-${team.id}`" :to="`/teams/${team.id}`" class="link">
        <sui-segment class="team">
          <div>
            <span class="bold">{{ team.name }}</span> managed by <span class="bold">{{team.owner.username}} </span>
          </div>
          <div class="right-team">
            <span class="bold">{{team.nbMembers}} members</span>
            <DropdownTeam
                v-if="user.role ==='ROLE_ADMIN' || user.id === (team && team.owner && team.owner.id)"
                :team="team"
                :removeTeam="removeTeam"
            />
          </div>
        </sui-segment>
      </router-link>
    </div>
    <h1 v-if="!user.teams.length && !managedTeams.length" style="text-align: center">You don't have any Teams</h1>

    <router-link to="/teams/create" v-if="user.role ==='ROLE_ADMIN' || user.role ==='ROLE_MANAGER'">
      <sui-button  class="btn-create" >
        Create Team
      </sui-button>
    </router-link>
  </fragment>
</template>

<script>
import DropdownTeam from "../components/team/DropdownTeam";
export default  {
  name: "Teams",
  components: {DropdownTeam},
  computed: {
    user: function() {
      return this.$store.getters['user/me'];
    }
  },
  data: () => ({
    managedTeams: []
  }),
  methods: {
    removeTeam: function(team) {
      if (this.user.teams.filter((team) => team.id === team.id).length) {
        this.$store.dispatch('user/updateUser', {teams: this.user.teams.filter((team) => team.id !== team.id)});
      }
      this.managedTeams = this.managedTeams.filter((team) => team.id !== team.id);
    }
  },
  mounted: function () {
    if (this.user.role === 'ROLE_ADMIN' || this.user.role  === 'ROLE_MANAGER') {
      this.axios.get(`api/managedTeams`).then(({data}) => {
        this.managedTeams = data.data;
      })
    }
  },
}


</script>

<style scoped>
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .link {
    margin: 10px;
    width: 100%;
    max-width: 600px;
  }
  .team {
    width: 100%;
    max-width: 600px;
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

  .btn-create {
    position:absolute;
    top: 20px;
    right: 20px;
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
