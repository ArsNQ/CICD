<template lang="html">
        <sui-grid centered vertical-align="middle" class="background">
        <sui-grid-column :computer="4" :mobile="14">
            <h2 is="sui-header" color="teal" image>
            <sui-header-content>Log-in to your account</sui-header-content>
            </h2>

            <sui-form>
            <sui-segment >
                <sui-form-field>
                <sui-input
                    type="email"
                    placeholder="E-mail address"
                    icon="user"
                    icon-position="left"
                    v-model="email"
                />
                </sui-form-field>
                <sui-form-field>
                <sui-input
                    type="password"
                    placeholder="Password"
                    icon="lock"
                    icon-position="left"
                    v-model="password"
                />
                </sui-form-field>
                <button
                    is="sui-button"
                    color="teal"
                    size="large"
                    type="button"
                    @click="log"
                    fluid
                >
                    Login
                </button>
            </sui-segment>
            </sui-form>

        </sui-grid-column>

        </sui-grid>
</template>

<script>
    export default {
        name: "Sign",
        data() {
            return({
                email:'',
                password: ''
            })
        },
        methods: {
          log: function() {
              this.$store.dispatch('user/signIn',{email: this.email, password: this.password});
          }
        }
    }
</script>

<style lang="css" scoped>
    .background {
        background-color: #dadada !important;
        height: 100%;
        margin: 0;
    }
</style>
