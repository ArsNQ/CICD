<template lang="html">
    <fragment>
    <div class="column" style="margin-bottom: 3rem">
        <div class="ui two column grid">
            <div class="column">
                <h1>Pending tasks</h1>
            </div>
        </div>
        <fragment v-if="pendingTasks.length > 0">
            <TaskItem
                v-for="task in pendingTasks"
                :key="task.id"
                :title="task.name"
                :id="task.id"
                :creation="task.creation"
                :deleteTask="deleteTask"
                :createTask="createTask"
                :clock="task.clock"
                :user="user"
            />
        </fragment>
        <fragment v-else>
            <h2 is="sui-header" disabled block text-align="center">
                You don't have any tasks to do :)
            </h2>
        </fragment>
        <sui-button positive v-on:click="addTask()" fluid>Add a task</sui-button>
    </div>
    <div class="column" style="margin-bottom: 3rem">
        <div class="ui two column grid">
            <div class="column">
                <h1>Finished tasks</h1>
            </div>
        </div>
        <fragment v-if="finishedTasks.length > 0">
            <TaskItem
                v-for="task in finishedTasks"
                :key="task.id"
                :title="task.name"
                :id="task.id"
                :finished="true"
                :clock="task.clock"
            />
        </fragment>
        <fragment v-else>
            <h2 is="sui-header" disabled block text-align="center">
                You don't have any finished tasks :(
            </h2>
        </fragment>
    </div>
    </fragment>

</template>

<script>
import TaskItem from './TaskItem';

export default {
    name: 'Tasks',
    props:['userProps','finishedTasksProps','pendingTasksProps'],
    components: {
        TaskItem
    },
    data() {
        return ({
            isCreating: false
        })
    },
    computed: {
        pendingTasks: function() {
            return this.pendingTasksProps || this.$store.getters["user/pendingTasks"];
        },
        finishedTasks: function() {
            return this.finishedTasksProps || this.$store.getters["user/finishedTasks"];
        },
        user: function () {
            return this.userProps || this.$store.getters["user/me"];
        }
    },
    methods: {
        addTask() {
            if (this.isCreating) return;

            var lastId = this.pendingTasks.length > 0 ? this.pendingTasks[this.pendingTasks.length - 1].id : 0;
            this.pendingTasks.push({
                id: lastId + 1,
                creation: true,
                name: "",
                clock: null,
            });
            this.isCreating = true;
        },
        createTask(name) {
            return this.axios.post(`/api/tasks/${this.user.id}`, {
                task: {
                    name: name
                }
            }).then(({data}) => {
                var filteredTasks = this.pendingTasks.filter((obj) => obj.creation !== true);
                filteredTasks.push(data.data);
                if (this.$store.getters['user/me'].id === this.user.id) {
                  this.$store.commit('user/updatePendingTasks', filteredTasks);
                } else {
                  this.pendingTasksProps = filteredTasks;
                }
                this.isCreating = false;
            });
        },
        deleteTask(id) {
            return this.axios.delete(`/api/tasks/${id}`).then(({data}) => {
                var filteredTasks = this.pendingTasks.filter((obj) => obj.id !== id);
              if (this.$store.getters['user/me'].id === this.user.id) {
                this.$store.commit('user/updatePendingTasks', filteredTasks);
              } else {
                this.pendingTasksProps = filteredTasks;
              }

            });
        }
    }
};
</script>
