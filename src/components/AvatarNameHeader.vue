<template>
  <mu-card-header :title="item.member.nickname" :sub-title="item.created_time || item.release_time"
                  style="padding-bottom: 0">
    <template v-slot:avatar>
      <mu-avatar class="avatar-overlap">
        <img :src="headimg_src" alt="头像" class="headimg"/>
        <img v-if="head_frame_src" :src="head_frame_src" alt="" class="head_frame"/>
      </mu-avatar>
    </template>
    <mu-icon v-if="item.member.official_verify" value="verified" color="orange"
             style="vertical-align: top"></mu-icon>
    <slot></slot>
  </mu-card-header>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
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
}
</script>

<style scoped>
.mu-card-header >>> .mu-card-header-title {
  padding-right: 8px;
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


</style>
