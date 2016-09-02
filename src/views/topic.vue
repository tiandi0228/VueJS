<template>
	<div class="topic-header">
		<h3>{{topic.title}}</h3>
		<div class="pull-right">
			<p class="tab top">{{tabName(topic)}}</p>
			<p>{{topic.visit_count}}次浏览</p>

		</div>
		<div class="userPanel">
			<img :src="topic.author.avatar_url" />
			<div>
				<p class="one">{{topic.author.loginname}}</p>
				<p class="two">发布时间：{{topic.create_at | getLastTimeStr true}}</p>
			</div>
		</div>
	</div>
	<div class="topic-content">
		<div class="markdown-text">
			{{{topic.content}}}
		</div>
	</div>
	<replylist :replies="topic.replies" :topic-id="topic.id"></replylist>
  	<form @submit.prevent="replyHandler" class="reply-form">
    		<textarea v-model="replyContent"></textarea>
    		<button type="submit">回复</button>
  	</form>
</template>

<script>
import ReplyList from "../components/ReplyList.vue"
export default {
	components: {
      		replylist: ReplyList
    	},
	data() {
		return {
			topic: {},
			replyContent: ""
		}
	},
	route: {
		data(transition){
			var topicId = transition.to.params.id
			this.getTopic(topicId)
		}
	},
	methods:{
		// 分类名称
		tabName(topic) {
			let name = ""
			switch(topic.tab) {
				case "weex" : name="weex"; break;
				case "ask" : name ="问答"; break;
				case "share": name = "分享"; break;
				case "job": name = "招聘"; break;
			}
			return name
		},
		getTopic(id) {
			this.$http.get('http://www.vue-js.com/api/v1/topic/'+id).then(function(res) {
		        		if(res && res.data){
		                    		this.topic = res.data.data
		                	}
		        	})
		}
	}
}
</script>

<style>
.topic-header{
	overflow: hidden;
	margin-top: 30px;
	border-bottom: 1px solid #e5e5e5;
	padding: 0 10px;
}
.topic-header h3{
	margin-bottom: 15px;
	line-height: 1.5;
	font-size: 16px;
	font-weight: normal;
}
.topic-header .tab{
	border-radius: 4px;
	padding: 2px 6px;
	color: #fff;
	font-size: 14px;
	margin-right: 6px;
	text-align: center;
}
.topic-header .top.tab {
	background-color: #E74C3C
}
.topic-header .userPanel{
	padding: 0 0 10px 0;
}
.topic-header img{
	float: left;
	width: 44px;
	height: 44px;
	border-radius: 4px;
	margin-right: 6px
}
.topic-header p{
	font-size: 14px;
	line-height: 1.6;
	margin-bottom: 0;
}
.topic-content{
	padding: 20px 5px;
	margin: 0;
}
.topic-content a{
	color: #4078c0;
	text-decoration: none;
}
.topic-content a:hover{
	text-decoration: underline;
}
.topic-content ul{
	list-style: inside disc;
	line-height: 1.42
}
.topic-content h1{
	font-size: 32.5px;
	margin: 30px 0 15px;
	border-bottom: 1px solid #eee
}
.topic-content p{
	font-size: 15px;
	line-height: 1.6
}
.reply-form textarea{
	min-height: 80px;
	border: 1px solid #e5e5e5;
	padding: 4px 6px;
	border-radius: 4px;
	color: #666;
	margin-bottom: 0;
}
.reply-form button {
	background-color: #80bd01;
	border: 0;
	color: #fff;
	width: 100%;
	padding: 0 16px;
	line-height: 40px;
	border-radius: 5px;
}
.markdown-text p{
	font-size: 100%;
	margin-bottom: 5px;
	white-space: pre-wrap;
	word-wrap: break-word;
	line-height: 1.4em;
}
.markdown-text img{
	vertical-align: middle;
}
.markdown-text .prettyprint{
	background-color: #2d2d2d;
	color: #ccc;
	overflow: hidden;
	padding: 0.6em;
	white-space: pre-wrap;
	word-break: break-word;
	word-wrap: break-word;
}
.markdown-text .prettyprint code{
	font-size: 100%;
	padding: 15px 0;
	line-height: 1.6;
	font-family: consolas, Menlo, "PingFang SC", "Microsoft YaHei", monospace;
}
</style>