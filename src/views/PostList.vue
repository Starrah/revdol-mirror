<template>
  <mu-container ref="container" class="container-width-control">
    <mu-load-more :loading="loading" @load="load" :loaded-all="loadedAll">
      <!--      <mu-list>-->
      <div v-for="item in toShowList" :key="item.id">
        <PostCard :item="item"></PostCard>
      </div>
      <!--        <mu-divider/>-->
      <!--      </mu-list>-->
    </mu-load-more>
  </mu-container>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import PostCard from "@/components/PostCard.vue";

@Component({
  components: {PostCard}
})
export default class PostList extends Vue {
  get toShowList() {
    return this.$store.getters.showPostArr
  }

  get loadedAll() {
    console.log(this.$store.getters.loadedAll)
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

  @Watch('$route') async changeTypeAndPageAccordingToQuery() {
    console.log("Qwq")
    const DEFALUT_TYPE = 4
    const ALLOW_TYPES = [4, 14]
    let type = this.$route.query.type !== undefined? Number(this.$route.query.type): undefined
    let page = this.$route.query.page !== undefined? Number(this.$route.query.page) - 1: undefined
    if (!ALLOW_TYPES.find(value => value === type)) type = DEFALUT_TYPE // 如果并非允许的type，直接重置为默认type
    await this.$store.dispatch('changeShowType', {type, page})
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

</style>
