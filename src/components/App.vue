<template>
	<div>
		<sidebar></sidebar>
		<div id="content">
			<router-view></router-view>
		</div>
		<bartop></bartop>
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
	}
</script>

<style lang='sass'>
@import "static/scss/style.scss";
#content {
	padding: 28px 5px 10px;
	overflow-y: auto;
}
</style>