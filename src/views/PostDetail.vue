<template>
  <div>
    <mu-container class="container-width-control">
      <mu-card style="text-align: left; margin: 0 auto;" raised>
        <AvatarNameHeader :item="item"></AvatarNameHeader>
        <PostContent :item="item"></PostContent>

        <div style="display: grid; grid-gap: 16px; margin: 24px" class="imageThumbtails">
          <div v-for="rawUrl in (item.images)" :key="rawUrl" class="square-image" @click="clickPreview(rawUrl)">
            <img :src="convertResUrl(rawUrl)" alt="帖子图片">
          </div>
        </div>
        <mu-card-actions style="text-align: right; padding-top: 0; vertical-align: center; padding-right: 16px">
          <PraiseComment :item="item"></PraiseComment>
        </mu-card-actions>
      </mu-card>
      <mu-divider/>
      <CommentCard v-for="(comment, index) in reversedList" :key="comment.id" :floor_number="index + 1"
                   :item="comment"></CommentCard>
    </mu-container>
    <ImagePreview :open.sync="onPreview" :image-url="previewUrl"></ImagePreview>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {PostItem} from "@/utils/PostItem";
import {convertResUrl} from "@/utils/request";
import {getDefaultItem} from "@/utils/pageUtil";
import AvatarNameHeader from "@/components/AvatarNameHeader.vue";
import PostContent from "@/components/PostContent.vue";
import PraiseComment from "@/components/PraiseComment.vue";
import CommentCard from "@/components/CommentCard.vue";
import * as _ from "lodash";
import ImagePreview from "@/components/ImagePreview.vue";

@Component({
  components: {ImagePreview, CommentCard, PraiseComment, PostContent, AvatarNameHeader}
})
export default class PostDetail extends Vue {
  item: PostItem = (getDefaultItem() as any)
  onPreview = false
  previewUrl = ""

  clickPreview(rawUrl?: string) {
    this.previewUrl = convertResUrl(rawUrl)
    this.onPreview = true
  }

  convertResUrl(url?: string) {
    return convertResUrl(url)
  }

  @Watch('$route')
  async changeItem() {
    let id = Number(this.$route.params.id)
    if (id) await this.$store.dispatch('ensurePost', id)
    let item = this.$store.state.postInfos[id]
    this.item = item ? item : getDefaultItem()
  }

  get reversedList() {
    return _.reverse(this.item?.comments || [])
  }

  async created() {
    await this.changeItem()
  }
}
</script>

<style scoped>

.square-image {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
}

.square-image > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.container-width-control {
  width: 100%;
  max-width: 700px;
}
.imageThumbtails {
  grid-template-columns: repeat(3, 1fr);
}
@media screen and (max-width: 700px){
  .container {
    padding: 0;
  }
  .imageThumbtails {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
