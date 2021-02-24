<template>
  <div>
    <span style="color: grey">{{ item.fromUser.nickname }}: </span>
    <span v-if="item.toUser">回复
      <span style="color: grey">{{ item.toUser.nickname }}: </span>
    </span>
    <span>{{ item.content }}</span>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {PostCommentReplyItem} from "@/utils/PostItem";

@Component
export default class PostCard extends Vue {
  @Prop() item?: PostCommentReplyItem
}
</script>

<style scoped>

</style>
