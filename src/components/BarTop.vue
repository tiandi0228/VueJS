<style>
.bar-easy-vue {
    background-color: #444;
    line-height: 44px;
    position: fixed;
    left: 0;
    right: 0;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    z-index: 999;
}

.vue-back {
    color: #333;
}

.bar-easy-vue h2 {
    font-size: 16px;
    margin-bottom: 0;
    line-height: 44px;
    font-weight: 400;
    position: absolute;
    left: 50%;
    margin-left: -16px;
    color: #939393;
}

.fa-navicon {
    margin: 14px 0 0 10px;
    color: #939393;
    padding: 0;
}

.fa-edit {
    margin: 14px 10px 0 0;
    color: #939393;
}
</style>

<template>
<header class="bar bar-nav bar-easy-vue">
    <div class="pull-left" @click="sidebar">
        <i class="fa fa-navicon"></i>
    </div>
    <div class="pull-right" v-link="{path: '/new'}">
        <i class="fa fa-edit"></i>
    </div>
    <h2>{{title}}</h2>
</header>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "Vue.js",
            required: true
        },
        isShowSidebar: {
            type: Boolean,
            default: false,
            required: true,
            twoway: true
        }
    },
    methods: {
        sidebar() {
            this.isShowSidebar = true
        }
    }
}
</script>
