<template>
	<nav class="bar bar-tab easy-bottom-bar">
		<a class="tab-item"  v-link="{path:'/list'}">
			<span class="icon fa fa-codepen" :class="{'easy-fa-color': isOnePage}"></span>
			<span class="tab-label" :class="{'easy-fa-color': isOnePage}">主题</span>
		</a>
		<a class="tab-item" v-link="{path:'/collect'}">
			<span class="icon icon-star-filled" :class="{'easy-fa-color': isTwoPage}"></span>
			<span class="tab-label" :class="{'easy-fa-color': isTwoPage}">收藏</span>
		</a>
		<a class="tab-item" v-link="{path:'/user'}">
			<span class="icon icon-person" :class="{'easy-fa-color': isThreePage}"></span>
			<span class="tab-label" :class="{'easy-fa-color': isThreePage}">我的</span>
		</a>
	</nav>
</template>

<script>
module.exports = {
	data: function () {
		return {
			isOnePage: true,
			isTwoPage: false,
			isThreePage: false
		}
	},
	ready: function () {
		var url = window.location.hash;
		if (url === '#!/list') {
			this.isOnePage   = true;
			this.isTwoPage   = false;
			this.isThreePage = false;
		}
		if (url === '#!/collect') {
			this.isOnePage   = false;
			this.isTwoPage   = true;
			this.isThreePage = false;
		}
		if (url === '#!/user') {
			this.isOnePage   = false;
			this.isTwoPage   = false;
			this.isThreePage = true;
		}
	}
}
</script>

<style>
.easy-bottom-bar .easy-fa-color{
	color: #428bca;
}
</style>