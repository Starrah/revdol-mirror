<template>
  <mu-dialog :open="open" @update:open="$emit('update:open', $event)" :max-width="dialogMaxWidth" :padding="48" scrollable
             lock-scroll>
    <div>
      <img :src="imageUrl" alt="图片" style="width: 100%; height: 100%; object-fit: contain"/>
    </div>
  </mu-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class ImagePreview extends Vue {
  @Prop({type: Boolean, default: false}) open?: boolean
  @Prop(String) imageUrl?: string

  get dialogMaxWidth() {
    return screen.width > 700 ? "70%" : "80%"
  }
}
</script>

<style scoped>
.mu-dialog-wrapper >>> .mu-dialog-body {
  padding: 0;
}
</style>
