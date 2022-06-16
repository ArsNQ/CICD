<template>
  <fragment>
    <sui-modal-header>Remove from team <span v-if="team">{{team.name}}</span> </sui-modal-header>
    <sui-modal-content>
      <sui-modal-description>
        <p>
          You want to remove the user <span class="bold">{{user.username}}</span> from the team. You can't go back!
        </p>
        <p>Are you sure ? </p>
      </sui-modal-description>
    </sui-modal-content>
    <div class="action">
      <sui-button class="btn" negative @click.native="removeUser">
        Delete
      </sui-button>
      <sui-button class="btn"  @click.native="onClose">
        Cancel
      </sui-button>
    </div>
  </fragment>
</template>

<script>
export default {
  name: "ModalRemove",
  props: {
    user: {
      type: Object
    },
    team: {
      type: Object
    },
    onClose: {
      type: Function
    },
    updateTeam: {
      type: Function
    }
  },
  methods: {
    removeUser: function() {
      this.axios.delete(`/api/teams/${this.team.id}/members/${this.user.id}`).then(({data}) => this.updateTeam(data.data))
      this.onClose()
    }
  }
}
</script>

<style scoped>

p {
  font-size: 20px
}

.bold {
  font-weight: bold;
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
