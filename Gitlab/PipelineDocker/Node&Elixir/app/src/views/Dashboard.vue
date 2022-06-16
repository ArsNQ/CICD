<template>
      <div class="thirteen wide column">
          <div class="row">
            <WorkingTimesChart />
          </div>
          <div class="row">
            <Tasks />
            <!-- <WorkingTime /> -->
          </div>
      </div>
</template>

<script>
  import WorkingTimesChart from '../components/WorkingTimesChart.vue'
  import WorkingTime from '../components/WorkingTime'
  import Tasks from '../components/tasks/Tasks'

  export default {
    components: {
      WorkingTime, WorkingTimesChart, Tasks
    },
    mounted() {
      this.$store.dispatch('user/getWorkingTimes');
      this.$store.dispatch('user/getTasks');
    }
  }
</script>
