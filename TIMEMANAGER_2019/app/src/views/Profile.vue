<template>
    <fragment>
    <div class="Page">
        <sui-segment class="team">
        <div class="cardProfile">
          <div class="columnImage">
            <h1>Hello {{ user.username }}</h1>
            <div class="imageGlob">
                <div class="image">
                    <AvatarCustom class="imageSize" :username="user.username" :size="125"/>
                </div>
              <h3>Grade - {{role[user.role]}}</h3>
            </div>
              </div>
            <div class="treaty"></div>
            <div class="columForm">
                    <form class="ui form">
                        <div class="field">
                            <h2> Informations </h2>
                        </div>
                        <div class="field">
                            <span class="pForm"><sui-icon name="user" />  Username </span>
                            <input class="formSize" type="text" name="username" v-model="username" :placeholder="user.username">
                        </div>
                        <div class="field">
                            <span class="pForm"><sui-icon name="mail"/> E-mail </span>
                            <input class="formSize" type="text" name="email" v-model="email" :placeholder="user.email">
                        </div>
                        <div class="buttonGrp">
                            <button class="ui green button" type="button" @click="editing">Edit</button>
                            <button class="ui red button" type="button" @click="openDelete">Delete</button>
                        </div>
                    </form>
            </div>
        </div>
        </sui-segment>
    </div>

    <sui-modal v-model="confirmDelete">
        <ModalConfirmContent
        :onClose="closeDelete"
        :user="user"
        />
    </sui-modal>
    </fragment>
</template>

<script>
    import Dashboard from "./Dashboard";
    import ModalConfirmContent from "../components/Profile/ModalConfirmContent"
    import AvatarCustom from "../components/Utils/AvatarCustom";
    export default {
        components: {Dashboard, ModalConfirmContent, AvatarCustom},
        data() {
          return({
              username: '',
              email:'',
              confirmDelete: false,
              role: {
                  ROLE_USER:"Employee",
                  ROLE_MANAGER:"Manager",
                  ROLE_ADMIN:"Administrator",
              },
          })
        },
        computed: {
            user: function() {
                return this.$store.getters["user/me"]
            }
        },
        methods: {
            editing: function () {
                const user = {};
                if (this.username) user.username = this.username;
                if (this.email) user.email = this.email;

                return this.$store.dispatch("user/editUser", user).then(()=> {
                    this.username = '';
                    this.email = '';
                })
            },
            openDelete: function() {
                this.confirmDelete = true;
            },
            closeDelete: function() {
                this.confirmDelete = false;
            },
        },
    }
</script>

<style scoped>
    .Page {
        display: flex;
        justify-content: center;
    }
    .cardProfile {
        display: flex;
        flex-direction: row;
        max-width: 600px;
    }

    @media screen and (max-width: 500px) {
      .cardProfile {
        flex-direction: column;

      }
    }

    .imageGlob {
        display: flex;
        flex-direction: column;
        align-items: center;

    }
    .image{
        border: 3px solid rgba(34,36,38,.15);
        border-radius: 100%;
    }
    h3 {
        font-weight: bold;
        color: #1b1c1d;
    }
    .treaty {
        border: 1px solid rgba(34,36,38,.15);
        margin: 20px;
    }
    .columnImage {
        min-width: 210px;
        display: flex;
        flex-direction: column;
        align-items: center;

    }

    .ui.button{
        margin: 5%;
        width: 90px;
    }
    .buttonGrp {
        display: flex;
        justify-content: center;
    }
    .pForm {
        font-weight: bold;
        font-size: 15px;

    }

    .formSize {
      margin-top: 10px!important;
    }

</style>
