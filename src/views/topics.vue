<template>
	<div class="topic-list">
		<ul>
			<li class="share">
				<h3 class="tit">
					<span class="tab">分享</span>
					【杭州】 Node Party Github 资料库现已建立，欢迎 watch/star 并持续关注活动信息
				</h3>
				<div class="info">
					<div class="right">
						<p><strong title="回复数">14</strong> / <span title="阅读数">1314</span></p>
						<p class="latest_reply_time">19 小时前</p>
					</div>
					<div class="userPanel">
						<img alt="" src="//gravatar.com/avatar/d00d8e3461257418a62b1cb7abeea85a?size=48">
						<div >
							<p slot="one">xinyu198736</p>
							<p slot="two">2 天前</p>
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
	<button type="button" class="loadMoreBtn">加载更多</button>
</template>

<style>
.topic-list ul{
	padding: 0;
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
img{
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