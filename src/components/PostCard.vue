<template>
  <mu-container>
    <mu-card @click="jumpToDetail" style="text-align: left; margin: 0 auto;" raised>
      <div style="display: flex; margin-bottom: 8px;">
        <div style="flex: 1">
          <mu-card-header :title="item.member.nickname" :sub-title="item.created_time" style="padding-bottom: 0">
            <template v-slot:avatar>
              <mu-avatar class="avatar-overlap">
                <img :src="headimg_src" alt="头像" class="headimg"/>
                <img v-if="head_frame_src" :src="head_frame_src" alt="" class="head_frame"/>
              </mu-avatar>
            </template>
          </mu-card-header>
          <!--      <mu-card-media title="Image Title" sub-title="Image Sub Title">-->
          <!--        <img src="../../assets/images/sun.jpg">-->
          <!--      </mu-card-media>-->
          <!--      <mu-card-title :title="item.title"></mu-card-title>-->
          <mu-card-text style="padding-bottom: 0; padding-top: 8px; display: grid">
            <b class="title" style="grid-area: 1/1/2/2">
              {{ item.title }}
            </b>
            <div class="content" style="grid-area: 2/1/3/2">
              {{ item.content }}
            </div>

          </mu-card-text>
        </div>
        <div v-if="first_image_src" class="abstract_image">
          <img :src="first_image_src" alt="帖子图片">
          <mu-badge v-if="item.images.length > 1" :content="item.images.length + '图片'" class="badge-bottomright"></mu-badge>
        </div>
      </div>
      <mu-card-actions style="text-align: right; padding-top: 0; vertical-align: center; padding-right: 16px">
        <span style="margin-right: 1em">
          <mu-icon value="thumb_up" size="14"></mu-icon>
          {{ item.praise_counts }}
        </span>
        <span>
          <mu-icon value="chat" size="14"></mu-icon>
          {{ item.comments_counts }}
        </span>
      </mu-card-actions>
    </mu-card>
  </mu-container>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {PostItem} from "@/utils/PostItem";
import {convertResUrl} from "@/utils/request";

@Component
export default class PostCard extends Vue {
  @Prop() item?: PostItem

  get headimg_src() {
    return convertResUrl(this.item?.member?.headimg)
  }

  get head_frame_src() {
    return convertResUrl(this.item?.member?.head_frame)
  }

  get first_image_src() {
    return this.item?.images.length ? convertResUrl(this.item?.images[0]) : ""
  }

  jumpToDetail() {
    this.$router.push(`/post/${this.item?.id}`)
  }
}
</script>

<style scoped>
.title {
  font-size: large;
}

.content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.avatar-overlap img {
  position: absolute;
}

.headimg {
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}

.head_frame {
  height: 130%;
  width: 130%;
  top: -15%;
  left: -15%;
  border-radius: 0;
}

.avatar-overlap {
  position: relative;
}

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
