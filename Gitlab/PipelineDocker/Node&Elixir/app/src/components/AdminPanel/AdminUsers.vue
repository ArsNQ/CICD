<template>
    <fragment>
      <div class="header">
        <SearchUserAdmin :updateList="updateList" />
        <CreateUser :addToList="addToList" />
      </div>
        <div class="ui list" >
          <AdminUser
              v-for="user in result"
              :key="`user-${user.id}`"
              :user="user"
              :updateUser="updateUser"
              :removeFromList="removeFromList"
          />
        </div>
    </fragment>
</template>

<script>
    import AdminUser from "./AdminUser";
    import SearchUserAdmin from "./utils/SearchUserAdmin";
    import CreateUser from "./utils/CreateUser";

    export default {
        name: "AdminUsers",
        components: {SearchUserAdmin, AdminUser, CreateUser},
        data: () => ({
            result:[],

        }),
        methods: {
            updateUser(user) {
                this.result=this.result.map((item) => {
                    if (user.id===item.id) return user;
                    return item;
                })
            },
            removeFromList(user) {
                this.result = this.result.filter((item) => item.id !== user.id)
            },
            addToList: function(user) {
                this.result = [...this.result, user];
            },
            updateList: function (newList) {
                this.result = newList;
            }
        },
    }
</script>

<style scoped>

    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    @media screen and (max-width: 1200px) {
      .header {

        flex-direction: column-reverse;
      }
    }
    .list {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
</style>
