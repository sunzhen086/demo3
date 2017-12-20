<template>
	<div class="leftBox">
		<leftBoxTop></leftBoxTop>
		<leftBoxBottom></leftBoxBottom>
	</div>
</template>

<script>
import leftBoxTop from './leftBoxTop.vue';
import leftBoxBottom from './leftBoxBottom.vue';
export default {
	props:{
		
	},
	data() {
		return {
			boxData:{}
		}
	},
	components: {
		leftBoxTop,
		leftBoxBottom,
	},
	methods: {
		
	},
	created(){

	},
	mounted() {

	},
	beforeDestroy(){
		
	},
}
</script>

<style lang="scss" scoped>
	.leftBox{
		float: left;
		margin-left: 0.28rem;
		margin-top: 0.15rem;
		width: 3.8rem;
		background-color:transparent;
		-moz-box-shadow: 0 0 0.1rem 0.05rem rgba(63,169,245,0.4) inset;
		box-shadow:0 0 0.1rem 0.05rem rgba(63,169,245,0.4) inset;
		padding: 0.17rem 0.15rem 0.22rem 0.15rem;
	}
</style>