<template>
    <fragment>
        <div class="ui two item menu">
            <div class="tab-btn" :class="tab==='users' && 'selected'" @click="switchTab('users')"><span>Users</span></div>
            <div class="tab-btn" :class="tab==='teams' && 'selected'" @click="switchTab('teams')"><span>Teams</span></div>
        </div>
        <div class="sizePage">
            <AdminUser v-if="tab==='users'"/>
            <AdminTeams v-if="tab==='teams'"/>
        </div>
    </fragment>
</template>

<script>
    import AdminUser from "./AdminUsers";
    import AdminTeams from "./AdminTeams";

    export default {
        name: "AdminPanel",
        props: ["isOpen","selectUser", "users", "onClose" ],
        components: {AdminUser, AdminTeams},
        data: () => ({
        tab: 'users'
    }),
        methods: {
            switchTab: function (newTab) {
                this.tab = newTab;
            }
        }
    }

</script>

<style scoped>
    h1{
        display: flex;
        justify-content: center;
    }

    .tab-btn {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      width: 100%;
    }
    .tab-btn:hover {
      background-color: rgba(0,0,0,.02);
    }

    .selected {
      background-color: rgba(0,0,0,.09)!important;
    }
    .selected span {
      font-weight: bold;
    }


</style>
