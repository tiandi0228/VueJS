<template>
	<header class="bar bar-nav bar-easy-vue">
		<h2 class="vue-fa-hide" :class="{'vue-fa-show': isHome}">主题</h2>
		<a class="vue-fa-hide pull-left vue-back" :class="{'vue-fa-show': isTopic}">< 返回</a>
		<h2 class="vue-fa-hide" :class="{'vue-fa-show': isTopic}">正文</h2>
		<h2 class="vue-fa-hide" :class="{'vue-fa-show': isCollect}">收藏</h2>
		<h2 class="vue-fa-hide" :class="{'vue-fa-show': isUser}">我的</h2>
	</header>
</template>

<script>
module.exports = {
	data: function () {
		return {
			isHome: true,
			isTopic: false,
			isCollect: false,
			isUser: false
		}
	},
	ready: function () {
		var url = window.location.hash;
		if (url.substr(3) === 'list') {
			this.isHome   = true;
			this.isTopic   = false;
			this.isCollect = false;
			this.isUser = false;
		}
		if (url.substr(3,5) === 'topic') {
			this.isHome   = false;
			this.isTopic   = true;
			this.isCollect = false;
			this.isUser = false;
		}
		if (url.substr(3) === 'collect') {
			this.isHome   = false;
			this.isTopic   = false;
			this.isCollect = true;
			this.isUser = false;
		}
		if (url.substr(3) === 'user') {
			this.isHome   = false;
			this.isTopic   = false;
			this.isCollect = false;
			this.isUser = true;
		}
	}
}
</script>

<style>
.bar-easy-vue {
	background-color: hsla(0,0%,100%,.95);
	line-height: 44px;
	position: fixed;
	left: 0;
	right: 0;
	-webkit-transform: translateZ(0);
	transform: translateZ(0);
	z-index: 999;
}
.vue-back{
	color: #333;
}
.bar-easy-vue .vue-fa-hide{
	display: none;
}
.bar-easy-vue .vue-fa-show{
	display: block;
	text-align: center;
	font-size: 16px;
	margin-bottom: 0;
	line-height: 44px;
	font-weight: 400;
}
</style>