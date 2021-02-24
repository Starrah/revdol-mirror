<template>
  <mu-card-text style="padding-bottom: 0; padding-top: 8px; display: grid">
    <b class="title" style="grid-area: 1/1/2/2">
      {{ item.title }}
    </b>
    <div :class="contentClass" style="grid-area: 2/1/3/2; white-space: pre-wrap">
      {{ item.content }}
    </div>
    <a v-if="item.vids" :href="`https://v.qq.com/x/page/${item.vids}.html`">该帖子有视频，点击跳转到腾讯视频查看</a>
    <a v-if="item.video_url" :href="convertResUrl(item.video_url)">该帖子有视频，点击查看或下载</a>
    <a v-if="item.audio_url" :href="convertResUrl(item.audio_url)">该帖子有音频，点击查看或下载</a>
  </mu-card-text>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {PostItem} from "@/utils/PostItem.d";
import {convertResUrl} from "@/utils/request";

@Component
export default class PostCard extends Vue {
  @Prop() item?: PostItem
  @Prop({type: Boolean, default: false}) ellipsis?: boolean

  convertResUrl(url?: string) {
    return convertResUrl(url)
  }

  get contentClass() {
    return this.ellipsis ? "ellipsis_twoline" : ""
  }
}
</script>

<style scoped>
.title {
  font-size: large;
}

.ellipsis_twoline {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
