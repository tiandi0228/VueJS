import Vue from 'vue'
import Router from 'vue-router'
import vueResource from 'vue-resource'
import routerMap from './router'
import App from './components/App.vue'

Vue.use(vueResource)
Vue.use(Router)

var router = new Router()

routerMap(router)

router.start(App, '#app')