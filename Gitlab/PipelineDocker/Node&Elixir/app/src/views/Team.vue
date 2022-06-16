<template>
  <fragment>
    <div v-if="team" class="container">
      <h1>{{team.name}}</h1>
      <h2> manager </h2>
      <sui-segment class="segment">
        <span class="bold">{{team.owner.username}}</span>
        <span class="email">{{team.owner.email}}</span>
      </sui-segment>
      <h2> members </h2>
      <router-link v-for="(member) in team.members" :key="`member-${member.id}`" :to="`/dashboard/user/${member.id}`" class="link">
        <sui-segment  :key="`member-${member.id}`" class="segment">
          <span class="bold">{{member.username}}</span>
          <div>
            <span class="email">{{member.email}}</span>
            <sui-icon v-if="user.role ==='ROLE_ADMIN' || user.id === (team.owner && team.owner.id)" @click="(event) => removeUser(event,member)" name="times circle" size="big" class="delete-btn" />
          </div>
        </sui-segment>
      </router-link>
    </div>
    <div v-else class="container-loader">
      <Loader size="100px" />
    </div>
    <sui-modal v-model="openRemove" v-if="user.role ==='ROLE_ADMIN' || user.id === (team && team.owner && team.owner.id)">
      <ModalRemoveContent
          :user="userModalRemove"
          :team="team"
          :onClose="onCloseModalRemove"
          :updateTeam="updateTeam"
      />
    </sui-modal>
    <sui-button v-if="user.role ==='ROLE_ADMIN' || user.id === ( team &&team.owner && team.owner.id)" class="btn-add" @click="addUser">
      Add member
    </sui-button>
    <sui-modal v-model="openAdd" v-if="user.role ==='ROLE_ADMIN' || user.id === (team && team.owner && team.owner.id)">
      <ModalAddContent
          :team="team"
          :onClose="onCloseModalAdd"
          :updateTeam="updateTeam"
          :isOpen="openAdd"
      />
    </sui-modal>
  </fragment>
</template>

<script>
import Loader from "../components/Loader";
import ModalRemoveContent from "../components/team/ModalRemoveContent";
import ModalAddContent from "../components/team/ModalAddContent";
export default {
  name: "Team",
  components: {ModalAddContent, ModalRemoveContent, Loader},
  data: () => ({
    team: null,
    openRemove: false,
    openAdd: false,
    userModalRemove: {}
  }),
  computed: {
    user: function() {
      return this.$store.getters["user/me"];
    }
  },
  mounted: function() {
    const {teamId} = this.$route.params;
    this.axios.get(`api/teams/${teamId}`)
        .then(({data}) => this.team = data.data)
        .catch((error) => console.log(error))
  },
  methods: {
    removeUser: function(event, member){
      event.preventDefault()
      this.userModalRemove = member;
      this.openRemove = true;
    },
    addUser: function(){
      this.openAdd = true;
    },
    onCloseModalRemove: function() {
      this.openRemove = false;
    },
    onCloseModalAdd: function() {
      this.openAdd = false;
    },
    updateTeam: function(newTeam) {
      this.team = newTeam;
    }
  }
}
</script>

<style scoped>
 .container {
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
 }
 .container h1 h2 {
   text-align: center;
 }

 .link {
   width: 100%;
   max-width: 600px;
   margin:5px;
   color: #555;
 }

 .link:hover {
   box-shadow: 0px 2px 4px 0px rgba(34, 36, 38, 0.12), 0px 2px 10px 0px rgba(34, 36, 38, 0.15);
 }


 .segment {
   width: 100%;
   max-width: 600px;
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
   margin: 0;
   padding: 15px 5px 15px 20px;
 }

 .bold {
   font-weight: bold;
 }

 .container-loader {
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
 }

 .email {
   margin-right: 10px;
   white-space: nowrap;
 }

 .delete-btn {
   cursor: pointer;
   color: #bbb;
 }
 .delete-btn:hover {
   color: #888;
 }

 .btn-add {
   position:absolute;
   top: 20px;
   right: 20px;
 }


</style>
