<template lang="html">
    <div class="row" style="margin-top: 1rem; margin-bottom: 1rem">
          <sui-segment clearing>
            <div class="ui grid">
                <div v-if="!finished" class="two wide column computer only" style="padding: 0">
                    <sui-button v-if="!creation && !clockStarted"
                        fluid
                        positive
                        icon="play"
                        content="start clock"
                        floated="left"
                        style="height: 100%"
                        v-on:click="startClock()"
                        :disabled="$store.getters['user/me'].id !== user.id"
                    />
                    <sui-button v-else-if="!creation && clockStarted"
                        fluid
                        icon="stop"
                        :content="elapsedTime"
                        floated="left"
                        style="height: 100%"
                        v-on:click="stopClock()"
                        :disabled="$store.getters['user/me'].id !== user.id"
                    />
                    <sui-button v-else
                        fluid
                        positive
                        icon="plus"
                        content="create"
                        floated="left"
                        style="height: 100%"
                        v-on:click="createTask(inputTitle)"
                    />
                </div>
                <div v-if="!finished" class="one wide column tablet only" style="padding: 0">
                    <sui-button v-if="!creation && !clockStarted"
                        compact
                        positive
                        icon="play"
                        floated="left"
                        style="height: 100%"
                        v-on:click="startClock()"
                        :disabled="$store.getters['user/me'].id !== user.id"
                    />
                    <sui-button v-else-if="!creation && clockStarted"
                        fluid
                        icon="stop"
                        floated="left"
                        style="height: 100%"
                        v-on:click="stopClock()"
                        :disabled="$store.getters['user/me'].id !== user.id"
                    />
                    <sui-button v-else
                        compact
                        positive
                        icon="plus"
                        floated="left"
                        style="height: 100%"
                        v-on:click="createTask(inputTitle)"
                    />
                </div>
                <div v-if="!finished" class="two wide column mobile only" style="padding: 0">
                    <sui-button v-if="!creation && !clockStarted"
                        compact
                        positive
                        icon="play"
                        floated="left"
                        style="height: 100%"
                        v-on:click="startClock()"
                        :disabled="$store.getters['user/me'].id !== user.id"
                    />
                    <sui-button v-else-if="!creation && clockStarted"
                        fluid
                        icon="stop"
                        floated="left"
                        style="height: 100%"
                        v-on:click="stopClock()"
                        :disabled="$store.getters['user/me'].id !== user.id"
                    />
                    <sui-button v-else
                        compact
                        positive
                        icon="plus"
                        floated="left"
                        style="height: 100%"
                        v-on:click="createTask(inputTitle)"
                    />
                </div>

                <!-- input or paragraph of the task -->
                <div class="thirteen wide computer twelve wide mobile tablet column">
                    <p v-if="!creation">
                        {{ title }}
                    </p>
                    <sui-input v-else
                        placeholder="Enter a task title..."
                        fluid
                        @input="taskName"
                    />
                </div>
                <div class="one wide column" v-if="!creation && !finished">
                    <sui-icon class="right floated link icon" size="small" name="trash" color="red" v-on:click="deleteTask(id)" />
                </div>
                <!-- end input or paragraph -->
            </div>
        </sui-segment>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'TaskItem',
    data() {
        return ({
            clockStarted: false,
            elapsedTime: "00:00",
            clockTime: null,
            clockTimer: null,
            inputTitle: ""
        });
    },
    methods: {
        taskName(value) {
            this.inputTitle = value;
        },
        startClock(time = undefined) {
            this.clockStarted = true;
            this.elapsedTime = "00:00";
            this.clockTime = !time ? moment() : time;
            this.clockTimer = setInterval(() => {
                var tmp = moment().diff(this.clockTime, 'seconds');
                this.elapsedTime = this.toHHSS(tmp);
            }, 1000);
            if (!time) {
                this.axios.post(`/api/clocks/${this.id}`, {
                    clock: {
                        time: this.clockTime.format("YYYY-MM-DD HH:mm:ss")
                    }
                }).then(({data}) => {
                });
            }
        },
        stopClock() {
            this.clockStarted = false;
            clearInterval(this.clockTimer);
            this.axios.post(`/api/clocks/${this.id}/done`).then(({data}) => {
               this.$store.dispatch('user/getWorkingTimes');
               this.$store.dispatch('user/getTasks');
            });
        },
        toHHSS(secs) {
            var sec_num = parseInt(secs, 10)
            var hours   = Math.floor(sec_num / 3600)
            var minutes = Math.floor(sec_num / 60) % 60
            var seconds = sec_num % 60

            return [hours,minutes,seconds]
                .map(v => v < 10 ? "0" + v : v)
                .filter((v,i) => v !== "00" || i > 0)
                .join(":")
        },
    },
    beforeDestroy() {
        if (this.clockTimer) {
            clearInterval(this.clockTimer);
        }
    },
    mounted() {
        if (this.clock && this.clock.status === true) {
            var startingClock = moment(this.clock.time, "YYYY-MM-DD HH:mm:ss");
            this.startClock(startingClock);
        }
    },
    props: {
        title: String,
        clock: Object,
        id: Number,
        creation: Boolean,
        user: Object,
        deleteTask: Function,
        createTask: Function,
        finished: Boolean,
    }
};
</script>
