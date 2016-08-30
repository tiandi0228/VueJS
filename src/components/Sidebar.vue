<template>
  	<div class="offcanvas">
        <nav class="offcanvas-bar">
            <div class="navicon" @click="hide">
                <i class="fa fa-navicon"></i>
            </div>
            <div class="list">
                  <!-- 已登录 -->
                  <ul v-if="isLogin" @click="goEnter" class="user">
                        <li>
                           <img :src="avatar_url">
                           <p v-text="loginname"></p>
                        </li>
                  </ul>
                  <!-- 未登录 -->
                  <ul v-else>
                        <li class="login" @click="login"><i class="fa fa-arrow-circle-right"></i>登录</li>
                  </ul>
                  <ul>
                        <li class="tit">版块</li>
                        <li v-for="item in itemForum" v-link="{path: '/'+item.view, query:{'tab': item.tab}}">
                              <i class="fa pull-left" :class="item.icon"></i>
                             {{item.name}}
                        </li>
                  </ul>
                  <ul>
                        <li class="tit">其他</li>
                        <li v-for="item in itemInfo" v-link="{path: '/'+ item.view}">
                              <i class="fa pull-left" :class="item.icon"></i>
                             {{item.name}}
                        </li>
                  </ul>
                  <div v-if="isLogin" @click="logout" class="logout"><i class="fa fa-sign-out"></i>退出</div>
            </div>
        </nav>
    </div>
</template>

<script>
export default{
    data() {
        return {
            tab: this.$route.query.tab,
            itemForum: [{
                icon: "fa-list",
                name: "全部",
                view: "list",
                tab: "all"
            },{
                icon: "fa-star",
                name: "精华",
                view: "list",
                tab: "good"
              },{
                icon: "fa-calendar-minus-o",
                name:"week",
                view: "list",
                tab: "week"
              },{
                icon: "fa-share-alt-square",
                name:"分享",
                view: "list",
                tab: "share"
              },{
                icon: "fa-question-circle",
                name: "问答",
                view: "list",
                tab: "ask"
              },{
                icon: "fa-users",
                name: "招聘",
                view: "list",
                tab: "job"
              }],
              itemInfo:[{
                icon: "fa-bell",
                name:"消息",
                view: "message"
              },{
                icon: "fa-info-circle",
                name:"关于",
                view: "about"
              }],
        }
    },
    props:{
      isShowSidebar:{
        type: Boolean,
        required: true,
        twoWay: true
      },
      isLogin: {
        type: Boolean,
        required: true,
        twoWay: true
      },
      avatar_url: {
        type: String,
        required: true,
        twoWay: true
      },
      loginname: {
        type: String,
        required: true,
        twoWay: true
      }
    },
    methods:{
        hide(){
            this.isShowSidebar = false
        },
        login(){
            var link = '/login?redirect='+ encodeURIComponent(this.$route.path);
            this.$route.router.go(link);
        },
        goEnter(){
          //this.$route.router.go({name:'user',params:{loginname:localStorage.loginname}});
          console.log(this.avatar_url)
        },
        logout(){
            localStorage.loginname = localStorage.avatar_url = localStorage.user_id = localStorage.accesstoken = ""
            this.isLogin = false
            this.$route.router.go({path: "/list"})
        }
    }
}
</script>

<style scoped>
.offcanvas {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    visibility: hidden;
    z-index: 1001;
    color: #7f8c8d;
  }
  .offcanvas .tit{
    background-color: #f5f5f5;
    font-size: 12px;
    padding-left: 10px;
  }
  .offcanvas .navicon{
    text-align: center;
    color: #444;
    border-bottom: 1px #ccc solid;
    height: 44px;
  }
  .offcanvas .navicon .fa-navicon {
    margin: 0;
    color: #444;
    line-height: 44px;
  }
  .offcanvas .list .login{
    text-align: center;
  }
  .offcanvas .list .logout{
    margin: 10px;
    text-align: center;
    background-color: #ff0000;
    color: #fff;
    padding: 5px 0;
    border-radius: 5px;
  }
  .offcanvas .list i{
    width: 20px;
    text-align: center;
    padding: 5px 10px 0 0;
  }
  .offcanvas-bar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 235px;
    background-color: #fff;
    border-right: 1px #ccc solid;
    box-shadow: 0 0 2px #ccc;
    max-width: 100%;
    -webkit-transform: translateX(-100%);
    -ms-transform: translateX(-100%);
    -o-transform: translateX(-100%);
    transform: translateX(-100%);
    -webkit-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }
  
  .offcanvas-bar ul li {
    line-height: 1.8;
    padding: 4px 15px;
    border-bottom: 1px #ccc solid;
    font-size: 14px;
  }
  .offcanvas-bar ul li a{
  	display: block;
  }
  .offcanvas .iconfont {
    margin-right: 8px;
  }
  
  .offcanvas a {
    color: #7f8c8d;
    text-decoration: none;
  }
  .user li{
    text-align: center;
    padding: 10px 0;
  }
  .user li img{
    float: none;
    width: 48px;
    padding: 10px 0 0 0;
    border-radius: 10px;
    border: 1px #ccc solid;
  }
  .user li p{
    margin: 0;
  }
  .message .unreadTip{
  }
  li.unread .iconfont{
    color: #b1b15c;
    display: inline-block;
    transform-origin: 50% 0;
    animation: shake 2.5s linear infinite;
  }
  @keyframes shake{
    0%,100%{
      transform: rotateZ(0deg);
    }
    20%{
      transform: rotateZ(15deg);
    }
    80%{
      transform: rotateZ(-15deg);
    }
  }
</style>