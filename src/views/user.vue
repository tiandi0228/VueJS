<template>
	<div>
		<bar-top @bar-top-refresh="refresh">
		</bar-top>
		<bar-bottom></bar-bottom>
	</div> 
</template>

<script>
	var BarTop  = require('../components/BarTop.vue');
	var BarBottom  = require('../components/BarBottom.vue');
	module.exports = {
		components:{
			'bar-top':BarTop,
			'bar-bottom':BarBottom,
		},
		methods:{
			refresh: function () {
				this.$broadcast('refresh');
			}
		}
	}
</script>