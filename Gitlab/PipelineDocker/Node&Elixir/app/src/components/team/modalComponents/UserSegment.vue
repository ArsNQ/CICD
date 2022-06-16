<template>
  <sui-segment
      class="user-segment"
      @click="handleUser(user)"
      :style="{...customStyle ,borderColor: isSelected ? '#21ba45' : 'rgba(34,36,38,.15)'}" >
      <AvatarCustom class="imageSize" :username="user.username" :size="40"/>
    <div class="segment-info">
      <span class="bold">{{user.username}}</span>
      <span>{{user.email}}</span>
    </div>

  </sui-segment>
</template>

<script>
  import AvatarCustom from "../../Utils/AvatarCustom";
  export default {
  name: "UserSegment",
  components: {AvatarCustom},
  props: {
    user: {
      type: Object
    },
    handleUser: {
      type: Function
    },
    isSelected: {
      type: Boolean
    },
    customStyle: {
      type: Object
    }
  },
}
</script>

<style scoped>
.ui.segment:first-child {
  margin-top: 5px;
}

.user-segment {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
  height: fit-content;
  cursor: pointer;
  min-width: 250px;
  min-height: 60px;
}

.user-segment:hover {
  box-shadow: 0px 2px 4px 0px rgba(34, 36, 38, 0.12), 0px 2px 10px 0px rgba(34, 36, 38, 0.15);
}

.segment-info{
  display: flex;
  flex-direction: column;
  margin-left: 10px;

}
</style>
