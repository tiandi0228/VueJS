import Vue from 'vue'
import Router from 'vue-router'
import vueResource from 'vue-resource'
import routerMap from './router'
import filters from "./filters"
import $ from 'jquery'
import App from './components/App.vue'

Vue.use(vueResource)
Vue.use(Router)
Object.keys(filters).forEach((k) => {
	Vue.filter(k, filters[k])
})
var router = new Router()

routerMap(router)

router.start(App, '#app')