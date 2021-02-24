<template>
  <span>
    <span v-if="floor_number" style="margin-right: 1em">
<!--      <mu-icon value="tag" size="14"></mu-icon>-->
      #{{ floor_number }}
    </span>
    <span style="margin-right: 1em">
      <mu-icon value="thumb_up" size="14"></mu-icon>
      {{ item.praise_counts }}
    </span>
    <span>
      <mu-icon value="chat" size="14"></mu-icon>
      {{ item.comments_counts }}
    </span>
  </span>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {PostItem} from "@/utils/PostItem";

@Component
export default class PraiseComment extends Vue {
  @Prop() item?: PostItem
  @Prop() floor_number?: number
}
</script>

<style scoped>

</style>
