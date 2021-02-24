import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

// 配置开发时的请求URL。部署后和页面所在的host就是一致的了，就不需要配置了。
if (location.href.indexOf("localhost") !== -1) axios.defaults.baseURL = "http://localhost:8033"

import 'muse-ui/lib/styles/base.less';
import { Card, Avatar, Icon, List, LoadMore, Divider, Grid, Badge, Dialog, AppBar, Menu, Button, Checkbox, Radio, TextField, Picker, Snackbar } from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
import './assets/material-icons.css';
[Card, Avatar, Icon, List, LoadMore, Divider, Grid, Badge, Dialog, AppBar, Menu, Button, Checkbox, Radio, TextField, Picker, Snackbar].forEach(value => Vue.use(value))
// @ts-ignore
import Toast from 'muse-ui-toast';
// @ts-ignore
Vue.use(Toast);

export const DEFALUT_TYPE = 4 // 默认的showType（贝拉）
export const ALLOW_TYPES = [4, 14, 24] // 允许的所有showType（贝拉一组的三个：普通、二创、歌姬）

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
