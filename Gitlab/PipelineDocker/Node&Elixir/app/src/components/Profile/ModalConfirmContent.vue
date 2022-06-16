<template>
    <fragment>
        <div class="global">
            <h1>Are you sure you want to delete your account?</h1>
            <p>Deleting your account is permanent and will remove all content including comments, avatars and profile settings. Are you sure you want to delete your account?</p>
                <div class="buttons">
                    <div class="action">
                        <sui-button class="btn" negative @click.native="deleting">
                            Delete
                        </sui-button>
                        <sui-button class="btn"  @click.native="onClose">
                            Cancel
                        </sui-button>
                    </div>
                </div>
        </div>
    </fragment>
</template>

<script>
    export default {
        name: "ModalConfirmContent",
        props: {
            user: {
                type: Object
            },
            onClose: {
                type: Function
            },
        },
        methods: {
            deleting: function () {
                this.axios.delete(`/api/users/${this.user.id}`).then(() =>{
                    this.$store.dispatch("user/logout")
                })
            },
        }
    }
</script>

<style scoped>
    .global {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding: 8%;
    }
    h1 {
        font-size: 30px
    }
    p {
        margin-top: 10%;
        margin-bottom: 10%;
        font-size: 20px
    }
    .action {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        padding: 10px
    }

    .btn {
        margin: 0 10px
    }


</style>
