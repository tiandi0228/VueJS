<template>
	<div>
		<bar-top @bar-top-refresh="refresh">
		</bar-top>
		<bar-bottom></bar-bottom>
	</div> 
</template>

<script>
	var BarTop  = require('../components/BarTop.vue');
	module.exports = {
		components:{
			'bar-top':BarTop,
		}
	}
</script>