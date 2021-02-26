import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import PostList from "@/views/PostList.vue";
import PostDetail from "@/views/PostDetail.vue";
import About from "@/views/About.vue";

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
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/:idol(all|katya|rose|qingge|isabella|tamamo|moxi)',
    name: 'PostList',
    component: PostList
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return savedPosition? savedPosition : {x:0, y:0}
  }
})

export default router
