<template>
	<div class="main">
		<top></top>
		<div class="main-body">
			<leftBox></leftBox>
			<rightBox></rightBox>
		</div>
	</div>
</template>

<script>
import top from './common/top.vue';
import leftBox from './common/leftBox.vue';
import rightBox from './common/rightBox.vue';

export default {
	data() {
		return {
			boxData:{}
		}
	},
	components: {
		top,
		leftBox,
		rightBox,
	},
	methods: {
		
	},
	created(){

	},
	mounted() {

	}
}
</script>

<style lang="scss" scoped>
	.main{
		color: #FFFFFF;
		font-size: 0.14rem;
		font-family: "微软雅黑";
		overflow: hidden;
		background:url(../../../assets/images/yunpos/realtime/mainbg.png) no-repeat;
		background-size: 16rem 9rem;
		position: relative;
		height: 9rem;
		width: 16rem;
		.main-body{
			margin: 0.1rem;
		}
	}
</style>