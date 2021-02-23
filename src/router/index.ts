import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import PostList from "@/views/PostList.vue";
import PostDetail from "@/views/PostDetail.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'PostList',
    component: PostList
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: PostDetail
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition? savedPosition : {x:0, y:0}
  }
})

export default router
