<template>

  <fragment>
    <h1 style="text-align: center">{{user.username}}'s dashboard</h1>
    <div v-if="loading" class="container-loader">
      <Loader size="100px" />
    </div>
    <div v-else>
      <WorkingTimesChart :workingtimes="workingTimes" />
      <Tasks :userProps="user" :pendingTasksProps="pendingTasks" :finishedTasksProps="finishedTasks" />
    </div>
  </fragment>
</template>

<script>
import Loader from "../components/Loader";
import WorkingTimesChart from "../components/WorkingTimesChart";
import Tasks from "../components/tasks/Tasks";

export default {
  name: "UserDashboard",
  components: {
    Tasks,
    Loader,
    WorkingTimesChart
  },
  data : function() {
    return{
      user: null,
      workingTimes: [],
      pendingTasks: [],
      finishedTasks: [],
      loading: true
    }
  },
  methods: {
    getUser: function() {
      return this.axios.get(`/api/users/${this.$route.params.user_id}`).then(({data}) => data.data)
    },
    getWorkingTimes: function () {
      return this.axios.get(`/api/workingtimes/${this.$route.params.user_id}`).then(({data}) => data.data)
    },
    getTasks: function() {
      return this.axios.get(`api/tasks/${this.$route.params.user_id}`).then(({data}) => data.data)
    }
  },
  mounted: function() {
    Promise.all([this.getUser(),this.getWorkingTimes(),this.getTasks()]).then(([user, workingTimes, tasks]) => {
      this.user = user;
      this.workingTimes = workingTimes;
      this.pendingTasks = tasks.filter(task => !task.clock || task.clock.status)
      this.finishedTasks = tasks.filter(task => task.clock && !task.clock.status)
      this.loading = false;
    })
  }
}
</script>

<style scoped>
.container-loader {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
