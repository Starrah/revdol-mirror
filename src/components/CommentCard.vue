<template>
  <mu-card style="cursor: pointer; text-align: left; margin: 0 auto; padding-bottom: 8px" raised>
    <AvatarNameHeader :item="item">
      <PraiseComment :floor_number="floor_number" style="vertical-align: top; float: right" :item="item"></PraiseComment>
    </AvatarNameHeader>
    <PostContent style="padding-bottom: 8px" :item="item"></PostContent>
    <div v-if="item.reply_list && item.reply_list.length" style="display: flex; justify-content: flex-end; width: 100%; padding-bottom: 8px;">
      <div style="width: 80%; border-radius: 8px; background-color: #f0f0f0; padding: 8px; display: grid; grid-template-columns: 1fr; grid-row-gap: 8px; margin-right: 32px">
        <CommentReply v-for="reply in reversedList" :key="reply.id" :item="reply"></CommentReply>
      </div>
    </div>
  </mu-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {PostCommentItem} from "@/utils/PostItem";
import AvatarNameHeader from "@/components/AvatarNameHeader.vue";
import PostContent from "@/components/PostContent.vue";
import PraiseComment from "@/components/PraiseComment.vue";
import CommentReply from "@/components/CommentReply.vue";
import * as _ from "lodash"

@Component({
  components: {CommentReply, PraiseComment, PostContent, AvatarNameHeader}
})
export default class CommentCard extends Vue {
  @Prop() item?: PostCommentItem
  @Prop() floor_number?: number

  get reversedList() {
    return _.reverse(this.item?.reply_list || [])
  }
}
</script>

<style scoped>
.abstract_image {
  width: 120px;
  height: 120px;
  align-self: flex-end;
  justify-self: right;
  margin-right: 16px;
  margin-top: 8px;
  position: relative;
}

.abstract_image img {
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.badge-bottomright {
  position: absolute;
  right: 5%;
  bottom: 5%;
}


</style>
