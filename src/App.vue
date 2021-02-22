<template>
  <div id="app">

        <PostList></PostList>

<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->
<!--    <router-view/>-->
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
import PostDetail from "@/components/PostCard";
import PostList from "@/views/PostList";
@Component({
  components: {PostList, PostDetail}
})
export default class App extends Vue {
  qwq = {
    title: "哈哈哈",
    content: "阿迪娜三剑客打死你打死你开房间安抚巾阿里松放假啊额烦恼三等奖法芙娜司法局哪家反封建安抚巾ad阿放假啊DNF简单发电机房放哪的借款方农夫饿哦近三分地方买大了可能发电机房你拉的房间里卡地方吗DNF拉到",
    member: {
      nickname: "sfdsfsd"
    },
    created_time: "2020-01-01 11:11",
    praise_counts: 1,
    comments_counts: 2
  }
}
</script>
