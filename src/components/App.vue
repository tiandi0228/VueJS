<style lang='sass'>
@import "static/scss/style.scss";
#content {
    padding: 28px 5px 10px;
    overflow-y: auto;
    background: #e1e1e1;
}

#app.show-offcanvas .offcanvas {
    visibility: visible;
}

#app.show-offcanvas .offcanvas {
    background-color: rgba(0, 0, 0, .3);
}

#app.show-offcanvas .offcanvas-bar {
    left: 235px;
}
</style>

<template>
<div>
    <sidebar :is-show-sidebar.sync="isShowSidebar" :is-login.sync="isLogin" :title.sync="title"></sidebar>
    <div id="content">
        <router-view></router-view>
    </div>
    <bartop :title="title" :is-show-sidebar.sync="isShowSidebar"></bartop>
</div>
</template>

<script>
import bartop from './BarTop.vue'
import sidebar from './SideBar.vue'
export default {
    components: {
        bartop: bartop,
        sidebar: sidebar,
    },
    data() {
        return {
            title: "",
            isShowSidebar: false,
            isLogin: localStorage.loginname ? true : false,
            loginname: localStorage.loginname,
            avatar_url: localStorage.avatar_url,
            accesstoken: localStorage.accesstoken
        }
    },
    created() {
        var temTitle = ""
        this.$route.router.afterEach((transition) => {
            var router = transition.to
            var routerName = router.name.trim()
            if (routerName === "list") {
                switch (router.query.tab) {
                    case "all":
                        temTitle = "全部";
                        break
                    case "good":
                        temTitle = "精华";
                        break
                    case "week":
                        temTitle = "week";
                        break
                    case "share":
                        temTitle = "分享";
                        break
                    case "ask":
                        temTitle = "问答";
                        break
                    case "job":
                        temTitle = "招聘";
                        break
                    default:
                        temTitle = "全部"
                }
            } else {
                if (routerName === "message") temTitle = "消息"
                else if (routerName === "about") temTitle = "关于"
                else if (routerName === "user") temTitle = "用户"
                else if (routerName === "login") temTitle = "登录"
                else if (routerName === "new") temTitle = "发帖"
                else if (routerName === 'topic') temTitle = "详情"
            }
            this.title = temTitle
            this.isShowSidebar = false
        })
    },
    watch: {
        isShowSidebar() {
            if (this.isShowSidebar) {
                document.getElementById('app').className = 'offcanvas-page show-offcanvas'
                console.log('显示左侧')
            } else {
                document.getElementById('app').className = ''
                console.log('隐藏左侧')
            }
        }
    }
}
</script>
