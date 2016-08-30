<template>
	<div>
		<div class="user-info">
			<img :src="user.avatar_url">
			<p>{{user.loginname}}</p>
			<p>注册时间：{{user.create_at | getLastTimeStr true}}</p>
			<p>积分：{{user.score}}</p>
		</div>
	</div>

	<section class="tab">
        <ul class="tab-nav">
            <li class="item" :class='{"selected":selectItem === 1}' @click="changeItem(1)">最近回复</li>
            <li class="item" :class='{"selected":selectItem === 2}' @click="changeItem(2)">最新发布</li>
        </ul>
        <div class="tab-content" v-for="item in currentData">
            <section class="user">
                <img class="head" :src="item.author.avatar_url"
                    v-link="{name:'user',params:{loginname:item.author.loginname}}" />
                <div class="info" v-link="{name:'topic',params:{id:item.id}}">
                    <div class="t-title">{{item.title}}</div>
                    <span class="cl">
                        <span class="name">{{item.author.loginname}}</span>
                    </span>
                    <span class="cr">
                        <span class="name">{{item.last_reply_at | getLastTimeStr true}}</span>
                    </span>
                </div>
            </section>
        </div>
        <div class="no-data" v-show="currentData.length === 0">
            暂无数据!
        </div>
    </section>
</template>

<script>
export default {
    data () {
      	return {
        	user:{},
            currentData:[],
            selectItem:1
      	}
    },
    route:{
    	data (transition){
	    	let _self = this
	        let loginname = transition.to.params.loginname
	        this.$http.get('http://www.vue-js.com/api/v1/user/'+loginname).then(function(res) {
	        	if(res && res.data){
                    let data = res.data.data;
                    _self.user = data;
                    if(data.recent_replies.length > 0){
                        _self.currentData = data.recent_replies;
                    }
                    else{
                        _self.currentData = data.recent_topics;
                        _self.selectItem = 2;
                    }
                }
	        })
	    }
    },
    methods:{
        //切换tab
        changeItem (idx){
            this.selectItem = idx;
            this.currentData = idx ===1 ? this.user.recent_replies:this.user.recent_topics;
        }
    },
}
</script>

<style>
.user-info{
	text-align: center;
	overflow: hidden;
	padding-top: 40px;
}
.user-info img{
	width: 48px;
	height: 48px;
	border-radius: 50%;
	box-shadow: 0 0 8px rgba(0,0,0,.5)
}
.user-info p{
	margin: 5px 0 0 0;
}
.tab{
	margin-top: 20px;
}
.tab-nav{
	height: 40px;
	padding: 0;
	text-align: center;
}
.tab-nav li{
	float: left;
	width: 50%;
	border-bottom: solid 1px #d4d4d4;
	position: relative;
	line-height: 37px;
	font-size: 14px;
	padding-bottom: 2px;
	cursor: pointer;
}
.tab-nav li:not(:last-child):after{
	content: "";
	position: absolute;
	right: 0;
	top: 0;
	bottom: 0;
	width: 1px;
	background-color: #d4d4d4;
}
.tab-nav li.selected{
	border-bottom:2px solid #42b983;
	color: #42b983;
	padding-bottom: 1px;
}
.tab-content{
	position: relative;
	clear:both;
}
.tabpanel{
	width: 100%;
	padding: 10px;
	display: none;
}
.tabpanel.active{
	display: block;
}
.tabpanel li{
	position: relative;
	padding: 5px;
	border-bottom: solid 1px #d4d4d4
}
.tabpanel .header div>p{
	margin-bottom: 0;
	overflow: hidden;
	line-height: 22px;
}
.header{
	overflow: hidden;
}
.header .date{
	position: absolute;
	right: 5px;
	top: 5px;
}
.left{
	float: left;
	overflow: hidden;
}
.left img{
	width: 44px;
	height: 44px;
	vertical-align: bottom;
}
.post-list .info{
	font-size: 14px;
}
.left>div{
	float: right;
	margin-left: 6px;
}
.info p{
	color: #34495e;
	line-height: 1.6;
}
.right strong{
	color: #42b983
}
.right p{
	margin-bottom: 0;
}
.related-topic{
	background-color: #f0f0f0;
	padding: 5px;
	margin:10px 5px;
	border-radius: 5px;
}
.no-data{
	text-align: center;
	padding: 20px 0;
}
</style>