<template>
	<div class="reply-list">
	  	<div class="header">
	    		<h4>已有<span> {{replies.length}} </span>回复</h4>
	  	</div>
	  	<ul v-if="replies.length > 0">
	  		<li v-for="reply in replies">
	  			<div class="user">
	          				<div class="pull-right">
	          					<div class="like-btn" @click="toggleUps($index)">
	          						<i class="fa pull-left" :class="isUps(reply.ups) ? 'fa-heart-o' : 'fa-heart'"></i>
	          						<span class="pull-left">{{reply.ups.length}}</span>
	          					</div>
					          	<div class="reply-btn" @click="toggleReply($index)">
					          		<i class="fa fa-reply"></i>
					          	</div>
	          				</div>
	          				<div class="pull-left">
						<img :src="reply.author.avatar_url" class="pull-left">
						<div class="pull-left">
							<p class="one">{{reply.author.loginname}}</p>
							<p class="two">回复时间：{{reply.create_at | getLastTimeStr true}}</p>
						</div>
					</div>
	  			</div>
	  			<div class="reply-content">
	  				{{{reply.content}}}  
	  			</div>
	  			{{reply.isShowReply}}
	  			<div class="reply-form" v-if="reply.isShowReply">
	  				<form @submit.prevent="replyToComment($index)">
				            	<textarea v-model="replyContent">@{{reply.author.loginname}} </textarea>
				            	<button type="submit">确定</button>    
				          </form>
	  			</div>
	  		</li>
		</ul>
	</div>
</template>

<script>
import markdown from 'markdown'
export default {
	data() {
		return {
			userId: localStorage.userId || '',
			loginname: localStorage.loginname || ''
		}
	},
	props: ['replies','topicId'],
	methods: {
		isUps (ups) {
			return ups >= 0
		},
		toggleReply(index) {
			if(!this.userId) {
				var link = "/login?redirect=" + encodeURIComponent(this.$route.path)
				this.$route.router.go(link)
				return
			}
			var reply = this.replies[index] 
			this.replies.forEach((r, i) => {
				if (i !== index){
					r.isShowReply = false
				}
			})
			reply.isShowReply = reply.isShowReply
		},
		// 点赞
		toggleUps(index) {
			if(!this.userId) {
				var link = "/login?redirect=" + encodeURIComponent(this.$route.path)
				this.$route.router.go(link)
				return
			}
			var reply = this.replies[index]
			if(this.loginname !== reply.author.loginname) {
				this.$http.post('http://www.vue-js.com/api/v1/reply/'+reply.id+'/ups',{accesstoken:localStorage.accesstoken}).then((res) => {
		           	 		if(res.data.action === "down") {
		           	 			var index = reply.ups.indexOf(this.topicId)
		           	 			reply.ups.splice(index,1)
		           	 		}else{
		           	 			reply.ups.push(this.topicId)
		           	 		}
				})
			}else{
				alert("不能为自己点赞哦。^_^")
			}
		}
	}
}
</script>

<style scoped>
.reply-list{
	margin-top: 15px;
}
.reply-list .header{
	background-color: #ccc;
	padding: 10px;
	border-radius: 3px 3px 0 0;
}
.reply-list .header h4{
	margin-bottom: 0;
}
.user{
	overflow: hidden;
	margin: 10px 0;
}
.user img{
	width: 44px;
	height: 44px;
	margin-right: 6px;
	border-radius: 50%;
}
.user p{
	font-size: 14px;
	margin-bottom: 0px;
}
.user p.two{
	margin-top: 1px;
}
.like-btn, .reply-btn{
	float: left;
}
.like-btn{
	margin-right: 6px;
}
.like-btn .fa{
	margin-top: 3px;
    	font-size: 14px;
}
.reply-list ul li{
	padding: 6px;
	border-bottom: 1px solid #f0f0f0;
	overflow: hidden;
}
.reply-form{
	clear: both;
}
.reply-form textarea{
	width: 100%;
	resize: none;
	margin-top: 12px;
	border: 1px solid #d5dbdb;
	border-radius: 3px;
	height: 60px;
	display: block;
	margin-bottom: 5px;
}
.reply-form textarea+button{
	width: 80px;
	color: #fff;
	border: 0;
	line-height: 28px;
}
</style>