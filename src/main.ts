import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

axios.defaults.baseURL = "http://localhost:8033"

import 'muse-ui/lib/styles/base.less';
import { Card, Avatar, Icon, List, LoadMore, Divider, Grid, Badge, Dialog } from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
import './assets/material-icons.css';
[Card, Avatar, Icon, List, LoadMore, Divider, Grid, Badge, Dialog].forEach(value => Vue.use(value))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
