<template>
  <sui-segment  class="tag">
    <span style="margin-right: 10px; margin-left: 10px">{{user.username}}</span>
    <sui-icon name="times circle" class="btn-delete" @click="onDelete(user)" />
  </sui-segment>
</template>

<script>
export default {
  name: "TagUser",
  props: {
    user: {
      type: Object
    },
    onDelete: {
      type: Function
    }
  }
}
</script>

<style scoped>

.ui.segment:first-child {
  margin-top: 3px;
}

.tag {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  margin: 3px 5px;
  padding: 10px 5px;
  border-radius:20px;
  height:40px
}
.btn-delete {
  cursor: pointer;
  color: #bbb;
  font-size: 19px;
  line-height: 1;
}
.btn-delete:hover {
  color: #888;
}


</style>
