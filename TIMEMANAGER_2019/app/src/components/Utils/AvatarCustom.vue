<template>
  <Avatar :username="username" :size="size"/>
</template>

<script>
    import Avatar from 'vue-avatar'
    export default {
        name: "AvatarCustom",

        components: {
            Avatar
        },
        props: {
            username: {
                type: String
            },
            size: {
                type: Number
            },
        },
    }
</script>

<style scoped>

</style>
