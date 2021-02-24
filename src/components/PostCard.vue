<template>
  <mu-container>
    <mu-card @click="jumpToDetail" style="cursor: pointer; text-align: left; margin: 0 auto;" raised>
      <div style="display: flex; margin-bottom: 8px;">
        <div style="flex: 1">
          <AvatarNameHeader :item="item"></AvatarNameHeader>
          <PostContent :item="item" ellipsis></PostContent>
        </div>
        <div v-if="first_image_src" class="abstract_image">
          <img :src="first_image_src" alt="帖子图片">
          <mu-badge v-if="item.images.length > 1" :content="item.images.length + '图片'" class="badge-bottomright"></mu-badge>
        </div>
      </div>
      <mu-card-actions style="text-align: right; padding-top: 0; vertical-align: center; padding-right: 16px">
        <PraiseComment :item="item"></PraiseComment>
      </mu-card-actions>
    </mu-card>
  </mu-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {PostItem} from "@/utils/PostItem";
import {convertResUrl} from "@/utils/request";
import AvatarNameHeader from "@/components/AvatarNameHeader.vue";
import PostContent from "@/components/PostContent.vue";
import PraiseComment from "@/components/PraiseComment.vue";
@Component({
  components: {PraiseComment, PostContent, AvatarNameHeader}
})
export default class PostCard extends Vue {
  @Prop() item?: PostItem

  get first_image_src() {
    return this.item?.images.length ? convertResUrl(this.item?.images[0]) : ""
  }

  jumpToDetail() {
    this.$router.push(`/post/${this.item?.id}`)
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
@media screen and (max-width: 700px) {
  .abstract_image {
    width: 90px;
  }
  .mu-card >>> .mu-card-text {
    padding-left: 8px;
    padding-right: 8px;
  }
}

</style>
