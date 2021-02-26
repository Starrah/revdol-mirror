<template>
  <mu-container ref="container" class="container-width-control">
    <mu-load-more :loading="loading" @load="load" :loaded-all="loadedAll">
      <!--      <mu-list>-->
      <div v-for="item in toShowList" :key="item.id">
        <PostCard :item="item"></PostCard>
<!--        <mu-divider/>-->
      </div>
<!--              <mu-divider/>-->
      <!--      </mu-list>-->
    </mu-load-more>
  </mu-container>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import PostCard from "@/components/PostCard.vue";
import {ALLOW_TYPES, DEFALUT_TYPE} from "@/main";
import delay from "delay";
import {idol_english_names} from "@/utils/pageUtil";

@Component({
  components: {PostCard}
})
export default class PostList extends Vue {
  get toShowList() {
    return this.$store.getters.showPostArr
  }

  get loadedAll() {
    return this.$store.getters.loadedAll
  }

  loading = false

  async load() {
    this.loading = true;
    try {
      await this.$store.dispatch('loadOneMorePage')
    } finally {
      this.loading = false
    }
  }

  // globalloading = false

  @Watch('$route') async changeTypeAndPageAccordingToQuery() {
    // 根据idol字符串参数和query中type数值综合确定实际的type
    let typeFromNumber = this.$route.query.type !== undefined? Number(this.$route.query.type): undefined
    let typeFromString = idol_english_names.indexOf(this.$route.params.idol) !== -1? idol_english_names.indexOf(this.$route.params.idol): undefined
    if (typeFromNumber === undefined) typeFromNumber = typeFromString
    if (typeFromNumber !== undefined && typeFromString !== undefined && typeFromNumber % 10 !== typeFromString) {
      // 名称和type数值不匹配，强制清空query
      console.error("名称和type数值不匹配，强制清空query")
      this.$router.push({query: {}})
    }
    let type = typeFromNumber
    console.log(type)
    let page = this.$route.query.page !== undefined? Number(this.$route.query.page) - 1: undefined
    if (type === undefined || ALLOW_TYPES.indexOf(type) === -1) type = DEFALUT_TYPE // 如果并非允许的type，直接重置为默认type
    let toastId
    console.log({type, page})
    try {
      // this.globalloading = true TODO 为什么加载组件用不了？
      // 替代方案：Promise.race，若超过一定时间未完成加载就弹出Toast提示
      let prom = this.$store.dispatch('changeShowType', {type, page})
      let delayP = delay(400)
      let firstFinish = await Promise.race([prom, delayP]) // 竞争看谁先结束
      if (firstFinish === undefined) { // 说明超过一定时间还没有完成加载
        toastId = this.$toast.info("加载中，请稍候")
      }
      await prom // 等待加载真的结束
      // this.$toast.success("加载完成")
    } finally {
      // this.globalloading = false
      if (toastId !== undefined) this.$toast.close(toastId)
    }
    if (type !== undefined) localStorage.setItem("lastType", String(type)); else localStorage.removeItem("lastType")
    if (page !== undefined) localStorage.setItem("lastPage", String(page + 1)); else localStorage.removeItem("lastPage")
  }

  async created() {
    await this.changeTypeAndPageAccordingToQuery()
  }
}
</script>

<style scoped>
.container-width-control {
  width: 100%;
  max-width: 700px;
}
@media screen and (max-width: 700px){
  .container {
    padding: 0;
  }
}


</style>
