<template>
    <sui-segment class="user-card" >
        <div class="item">
            <div class="content-left">
              <AvatarCustom :username="user.username" :size="50" @click.native="pushToDashboard" class="avatar"/>
            </div>
            <div v-if="isEditing" class="content-editing">
              <div class="content">
                <sui-input size="mini" class="formField" type="text" name="username" v-model="username" :placeholder="user.username" style="margin-bottom: 5px"/>
                <sui-input size="mini" class="formField" type="text" name="email" v-model="email" :placeholder="user.email"/>
              </div>
            </div>
            <div v-else class="content">
              <div class="content-row">
                <span class="bold user-link" @click="pushToDashboard">{{ user.username }}</span>
                <div  v-if="role[user.role]" class="tag-ctn" :class="`tag-${role[user.role]}`">
                  <span>{{role[user.role]}}</span>
                </div>
              </div>
              <span style="font-size:15px; ">{{ user.email }}</span>
            </div>
          <div class="content-right">
            <DropdownAdmin
                v-if="user.role !== 'ROLE_ADMIN'"
                :user="user"
                :toggle-edit="toggleEdit"
                :updateUser="updateUser"
                :removeFromList="removeFromList"
            />
            <div v-if="isEditing">
              <div
                  v-if="this.username === '' && this.email === ''"
                  class="btn-container btn-cancel"
                  @click="toggleEdit"
              >
                <sui-icon  name="times" />
              </div>
              <div
                  v-else
                  class="btn-container btn-confirm"
                  @click="editing"
              >
                <sui-icon  name="check" />
              </div>

            </div>
          </div>
        </div>
    </sui-segment>
</template>

<script>
    import AvatarCustom from "../Utils/AvatarCustom";
    import DropdownAdmin from "./utils/dropdownAdmin";
    export default {
        name: "AdminUser",
        components: {DropdownAdmin, AvatarCustom},
        props: ['user', 'updateUser', "removeFromList"],
        data: function () {
            return{
              username:'',
              email:'',
              isEditing: false,
              role: {
               ROLE_MANAGER:"manager",
               ROLE_ADMIN:"admin",
              },
            }
        },
        methods : {
            editing: function () {
                const user = {};
                if (this.username) user.username = this.username;
                if (this.email) user.email = this.email;

                return this.axios.put(`/api/users/${this.user.id}`, {user}).then((res) => {
                    this.username = '';
                    this.email = '';
                    this.updateUser(res.data.data)
                  this.isEditing = false;
                })
            },
          toggleEdit: function () {
              this.isEditing = !this.isEditing;
          },
          pushToDashboard: function () {
              this.$router.push({
                path: `/dashboard/user/${this.user.id}`
              })
          }
        }
    }

</script>

<style scoped>
  .item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 70px;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    height: 100%;
    flex: 1;
  }

  .content-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
  }

  .tag-ctn {
    margin-left: 5px;
    border-radius: 3px;
    padding: 0 6px;

  }
  .tag-ctn span {
    line-height: 1;
    color: #fff;
    font-weight: bold;
  }

  .user-link {
    font-size: 18px;
    cursor: pointer;
    color: #555;
  }

  .user-link:hover {
    color: #000;
  }

  .avatar {
    cursor: pointer;
  }
  .avatar:hover {
    transform: scale(1.02);
  }

  .tag-manager {
    background-color: #45b6fe;
  }

  .tag-admin {
    background-color: rgba(210,0,0,1);
  }
  .content-editing {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }



  .bold {
    font-weight: bold;
  }

  .user-card {
    width: 330px;
    margin-right: 10px;
    margin-left: 10px;
    padding: 10px 14px;

  }

  .user-card:first-child {
    margin-top: 14px;
  }
  .user-card:last-child {
    margin-bottom: 14px;
  }

  .formField {
    width: 100%;
  }

  .content-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    margin-left: 10px;
    padding: 3px 0;
  }

  .btn-container {
    display: flex;
    justify-content: center;
    height: 28px;
    width: 28px;
    border-radius: 14px;
    padding-left: 0.25rem;
    padding-top: 4px;
    cursor: pointer;
  }

  .btn-cancel {
    padding-top: 5px;
    background-color: rgba(210,0,0,0.8);
    font-size: 16px;
    color: #fff;
  }
  .btn-cancel:hover {
    background-color: rgba(210,0,0,1);
  }
  .btn-confirm {
    padding-top: 5px;
    background-color: rgba(0,150,0,0.8);
    font-size: 16px;
    color: #fff;
  }
  .btn-confirm:hover {
    background-color: rgba(0,150,0,1);
  }
</style>
