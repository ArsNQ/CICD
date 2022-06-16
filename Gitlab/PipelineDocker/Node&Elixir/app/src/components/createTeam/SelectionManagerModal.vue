<template>
  <fragment>
    <sui-modal-header><span>Choose a Manager</span> </sui-modal-header>
    <sui-modal-content class="content-ctn-modal-add">
      <sui-modal-description>
        <SearchManager ref="searchManagerComponent" :selectManager="selectManager" :selectedManager="manager" :isOpen="isOpen" />
      </sui-modal-description>
    </sui-modal-content>
    <div class="action-modal-add">
      <sui-button class="btn-modal-add" @click="onClose">
        Cancel
      </sui-button>
    </div>
  </fragment>
</template>

<script>

import SearchManager from "./SearchManager"
export default {
  name: "SelectionManagerModal",
  props: ["isOpen", "manager", "selectManager", "onClose"],
  components: {
    SearchManager
  }
}
</script>

<style scoped>

.action-modal-add {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px
}

.btn-modal-add {
  margin: 0 10px
}

</style>
