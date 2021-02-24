<template>
  <mu-appbar style="width: 100%;" color="primary">
    <mu-button flat slot="left" class="mu-appbar-title" @click="jumpToMainPage">
      战斗吧歌姬小程序镜像站
    </mu-button>

    <div v-if="$route.matched[0].name === 'PostList'" slot="right" style="display: flex">
      <div class="mu-appbar-title">{{ idol_name[$store.state.showType % 10] }}</div>
      <mu-menu style="align-self: center" placement="bottom-end">
        <mu-button flat>
          <mu-icon value="auto_stories" size="32"></mu-icon>
        </mu-button>
        <mu-container slot="content">
          <mu-flex align-items="center">
            <span style="margin: 0 16px;">
              第
              <mu-text-field v-model="inputPageValue" style="width: 77px;" :action-icon="action_icon"
                             :action-click="changeToOtherPage" :error-text="pageInputErrorText"></mu-text-field>
              /
              {{ totalPageCount }}
              页
            </span>
          </mu-flex>
        </mu-container>
      </mu-menu>
      <mu-menu style="align-self: center" placement="bottom-end">
        <mu-button flat>
          <mu-icon value="date_range" size="32"></mu-icon>
        </mu-button>
        <div slot="content" style="display: flex; flex-direction: column;">
          <mu-date-picker :date.sync="date"></mu-date-picker>
          <mu-button @click="changeDate" color="primary" style="margin-bottom: 8px; width: 50px; align-self: center">
            确认
          </mu-button>
        </div>
      </mu-menu>
      <mu-menu style="align-self: center" placement="left-end">
        <mu-button flat>
          <mu-icon value="settings" size="32"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button @click="changeType(4)">
            <mu-list-item-content>
              <mu-list-item-title>贝拉</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <!--          <mu-list-item button>-->
          <!--            <mu-list-item-action>-->
          <!--              <mu-checkbox v-model="erchuangOnly"></mu-checkbox>-->
          <!--            </mu-list-item-action>-->
          <!--            <mu-list-item-title>-->
          <!--              只看二创-->
          <!--            </mu-list-item-title>-->
          <!--          </mu-list-item>-->
          <mu-list-item>
            <mu-radio :value="0" :input-value="radioValue" @change="onChangeRadio" label="全部帖子"></mu-radio>
          </mu-list-item>
          <mu-list-item>
            <mu-radio :value="10" :input-value="radioValue" @change="onChangeRadio" label="只看二创"></mu-radio>
          </mu-list-item>
          <mu-list-item>
            <mu-radio :value="20" :input-value="radioValue" @change="onChangeRadio" label="只看歌姬"></mu-radio>
          </mu-list-item>
        </mu-list>
      </mu-menu>
      <mu-button flat @click="jumpToAboutPage" style="align-self: center">
        <mu-icon value="info" size="32"></mu-icon>
      </mu-button>
    </div>
  </mu-appbar>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";

@Component
export default class MyAppBar extends Vue {
  idol_name = ["", "卡缇娅", "罗兹", "清歌", "贝拉", "玉藻", "墨汐"]
  get radioValue() {
    return Math.floor(this.$store.state.showType / 10) * 10
  }
  date = new Date()

  inputPageValue = 1

  @Watch('$store.state.startPage') onStartPageChange() {
    this.inputPageValue = this.$store.state.startPage + 1
  }

  get totalPageCount() {
    return this.$store.state.showType > 0 ? this.$store.state.pageInfos[this.$store.state.showType].pageIds.length : 0
  }

  get action_icon() {
    return !this.pageInputErrorText && this.inputPageValue - 1 !== this.$store.state.startPage ? "done" : ""
  }

  get pageInputErrorText() {
    if (Number.isInteger(Number(this.inputPageValue)) && this.inputPageValue > 0 && this.inputPageValue <= this.totalPageCount) return ""
    else return "无效页码"
  }

  changeType(newType: number) {
    if (this.$store.state.showType !== newType) this.$router.push(`/?type=${newType}`)
  }

  onChangeRadio(value: number) {
    this.changeType(this.$store.state.showType % 10 + value)
  }

  jumpToMainPage() {
    this.$router.push('/')
  }

  jumpToAboutPage() {
    this.$router.push('/about')
  }

  changeToOtherPage() {
    this.$router.push({query: {page: String(this.inputPageValue)}})
  }

  async changeDate() {
    let res = await this.$store.dispatch('getDateFromPage', this.date)
    if (typeof res === "number") {
      // 找到了页码，执行跳转
      this.$router.push({query: {page: String(res)}})
    } else {
      this.$toast.error(res)
    }
  }
}
</script>

<style scoped>

</style>
