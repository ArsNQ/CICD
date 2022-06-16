<template>
    <AdminPanel v-if="user.role == 'ROLE_ADMIN'" />
    <h1 v-else>Access denied, you must be an administrator.</h1>
</template>

<script>
    import AdminPanel from "../components/AdminPanel/AdminPanel";
    export default {
        name: "Administration",
        components: {AdminPanel},
        computed: {
            user() {
                return this.$store.getters["user/me"]
            }
        },
    }
</script>
