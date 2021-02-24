<template>
  <div id="app">
    <MyAppBar style="margin-bottom: 1px"></MyAppBar>
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script>
import Vue from "vue";
import {Component} from "vue-property-decorator";
import MyAppBar from "@/components/MyAppBar";
@Component({
  components: {MyAppBar}
})
export default class App extends Vue {
  test_data = {
    title: "哈哈哈",
    content: "阿迪娜三剑客打死你打死你开房间安抚巾阿里松放假啊额烦恼三等奖法芙娜司法局哪家反封建安抚巾ad阿放假啊DNF简单发电机房放哪的借款方农夫饿哦近三分地方买大了可能发电机房你拉的房间里卡地方吗DNF拉到",
    member: {
      nickname: "sfdsfsd"
    },
    created_time: "2020-01-01 11:11",
    praise_counts: 1,
    comments_counts: 2
  }
  created() {
    console.log("果然还是有人打开控制台了哈哈哈！")
    console.log("不过，请先点击最右上角的标志，确保阅读过声明再回来！")
    console.log("如果希望对源码、架构等进行研究的话，没有问题，请随便研究~")
    console.log("但是注意不要使用太多的流量和发起太多的请求，不要使用脚本对数据进行二次爬取，更不要进行攻击哦~你的每一次请求数据都在花费开发者的真金白银TAT")
    console.log("如果有意见建议，或者希望参与贡献，可以到Github上提Issue，或者通过声明中的联系方式联系开发者~")
  }
}
</script>
