<template lang="html">
    <div class="column">
        <h1>Working times</h1>
        <sui-table celled>
            <sui-table-header>
                <sui-table-row>
                    <sui-table-header-cell>Start</sui-table-header-cell>
                    <sui-table-header-cell>End</sui-table-header-cell>
                    <sui-table-header-cell>Actions</sui-table-header-cell>
                </sui-table-row>
            </sui-table-header>
            <sui-table-body>
                <sui-table-row v-for="workingTime in workingTimes" :key="workingTime.id">
                    <sui-table-cell>
                        {{ workingTime.start }}
                    </sui-table-cell>
                    <sui-table-cell>{{ workingTime.end }}</sui-table-cell>
                    <sui-table-cell>Cell</sui-table-cell>
                </sui-table-row>
            </sui-table-body>
            <sui-table-footer>
                <sui-table-row>
                    <sui-table-header-cell colspan="3">
                    <sui-menu pagination>
                        <a is="sui-menu-item" icon>
                        <sui-icon name="left chevron" />
                        </a>
                        <a is="sui-menu-item">1</a>
                        <a is="sui-menu-item">2</a>
                        <a is="sui-menu-item">3</a>
                        <a is="sui-menu-item">4</a>
                        <a is="sui-menu-item" icon>
                        <sui-icon name="right chevron" />
                        </a>
                    </sui-menu>
                    </sui-table-header-cell>
                </sui-table-row>
            </sui-table-footer>
        </sui-table>
    </div>
</template>

<script>
export default {
    name: 'WorkingTime',
    computed: {
        workingTimes: function() {
            return this.$store.getters["user/workingtimes"]
        }
    },
};
</script>
