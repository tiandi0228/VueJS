<template>
	<div class="topic-list">
		<ul>
			<li :class="topic.top ? 'top' : (topic.tab || 'unknow')" v-for="topic in topics">
				<h3 class="tit" v-link="{path: '/topic/' + topic.id}">
					<span class="tab">{{tabName(topic)}}</span>{{topic.title}}
				</h3>
				<div class="info">
					<div class="right">
						<p><strong title="回复数">{{topic.reply_count}}</strong> / <span title="阅读数">{{topic.visit_count}}</span></p>
						<p class="latest_reply_time">{{topic.last_reply_at | getLastTimeStr true}}</p>
					</div>
					<div class="userPanel" v-link="{path: '/user/' + topic.author.loginname}">
						<img :src="topic.author.avatar_url">
						<div >
							<p class="one">{{topic.author.loginname}}</p>
							<p class="two">{{topic.create_at | getLastTimeStr true}}</p>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<button type="button" class="loadMoreBtn" @click="getScrollData">{{scroll ? "加载更多" :"正在加载"}}</button>
</template>

<script>
export default {
	data() {
		return {
			topics: [],
			page: 1,
			limit: 20,
	                    	tab: 'all',
	                    	scroll: true
		}
	},
	route: {
		data(transition){
			let query = transition.to.query
			this.limit = 20
			this.tab = query.tab
			this.getTopics({tab: this.tab})
		}
	},
	methods:{
		// 分类名称
		tabName(topic) {
			let name = ""
			if(topic.top === true) {
				name = "置顶"
			}else if(topic.good === true){
				name = "精华"
			}else{
				switch(topic.tab) {
					case "weex" : name="weex"; break;
					case "ask" : name ="问答"; break;
					case "share": name = "分享"; break;
					case "job": name = "招聘"; break;
				}
			}
			return name
		},
		// 列表数据
		getTopics(key) {
			this.$http.get('http://www.vue-js.com/api/v1/topics?',{params:{tab: key.tab || this.tab,page: key.page || this.page,limit: key.limit || this.limit}}).then(function(res) {
		        		if(res && res.data){
		                    		this.topics = res.data.data
		                	}
		        	})
		},
		// 加载数据
	            getScrollData() {
	            	if(this.scroll){
	            		this.limit += 20
	                        	this.getTopics({tab: this.tab})
	            	}
	            }
	}
}
</script>

<style>
.topic-list ul{
	padding: 20px 0;
}
.topic-list li {
	padding: 10px 8px;
	overflow: hidden;
	background-color: #fff;
	border-bottom: 1px solid #d5dbdb;
}
.topic-list h3 {
	margin-bottom: 8px;
	line-height: 1.6;
	font-size: 16px;
	font-weight: normal;
}
.topic-list .tab {
	border-radius: 4px;
	padding: 3px 6px;
	color: #fff;
	font-size: 14px;
	margin-right: 6px;
}
.topic-list .good .tab {
	background-color: #5bb12f;
}
.topic-list .weex .tab {
	background-color: #ff5003;
}
.topic-list .share .tab {
	background-color: #1abc9c;
}
.topic-list .ask .tab {
    	background-color: #3498db;
}
.topic-list .top .tab {
    	background-color: #e74c3c;
}
.topic-list .job .tab {
	background-color: #9b59b6;
}
.topic-list .info {
	font-size: 14px;
}
.right {
	float: right;
}
.info p {
	color: #34495e;
	line-height: 1.6;
	margin-bottom: 0;
}
.info .right>p {
	text-align: right;
}
.right strong {
	color: #42b983;
}
.info img{
	float: left;
	width: 44px;
	height: 44px;
	border-radius: 4px;
	margin-right: 6px;
}
.loadMoreBtn {
	background-color: #80bd01;
	border: 0;
	color: #fff;
	width: 100%;
	line-height: 32px;
	border-radius: 5px;
}
</style>