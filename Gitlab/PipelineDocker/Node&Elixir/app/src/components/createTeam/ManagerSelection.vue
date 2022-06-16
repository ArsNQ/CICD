<template>
  <fragment>
    <div class="field" v-if="user.role === 'ROLE_MANAGER'">
      <span class="title">Manager</span>
      <span class="content">{{ user.username }} <span class="parenthesis">(you are the manager)</span></span>
    </div>
    <div class="field" v-if="user.role === 'ROLE_ADMIN'">
      <span class="title">Manager</span>
      <div class="action-ctn">
        <sui-button class="btn-select-manager" @click="makeMyself">
          Maker yourself
        </sui-button>
        <sui-button class="btn-select-manager" @click="openModalSelection">
          Select a manager
        </sui-button>
      </div>
    </div>
    <sui-modal v-model="openModal">
      <SelectionManagerModal :isOpen="openModal" :selectManager="selectManager" :manager="manager" :onClose="onClose"/>
    </sui-modal>
  </fragment>
</template>

<script>
import SelectionManagerModal from "./SelectionManagerModal";
export default {
  name: "ManagerSelection",
  props: ["manager", "selectManager"],
  components: {SelectionManagerModal},
  data: () => ({
    openModal: false
  }),
  computed: {
    user : function() {
      return this.$store.getters["user/me"];
    }
  },
  methods :{
    openModalSelection: function() {
      this.openModal = true;
    },
    onClose: function () {
      this.openModal = false;
    },
    makeMyself: function() {
      this.selectManager(this.user);
    }
  }
}
</script>

<style scoped>
  .field {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    width: 300px;
  }

  .content {
    font-size: 18px;
    margin-top: 10px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .parenthesis {
    font-size: 16px;
    font-style: italic;
  }

  .btn-select-manager {
    margin-top: 10px;
  }
  .action-ctn {
    display: flex;
    width: 300px;
    justify-content: space-between;

  }

</style>
