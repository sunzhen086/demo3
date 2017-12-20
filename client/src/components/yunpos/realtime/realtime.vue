<template>
	<div class="main">
		<div class="main-body">
			<top></top>
			<leftBox></leftBox>
			<leftBarChart></leftBarChart>
			<middleMap @show-box="showBox"></middleMap>
			<middleLineChart></middleLineChart>
			<shopBox :box-data = 'boxData'></shopBox>
			<custBox :box-data = 'boxData'></custBox>
		</div>
	</div>
</template>

<script>
import top from './common/top.vue';
import leftBox from './common/leftBox.vue';
import leftBarChart from './common/leftBarChart.vue';
import middleMap from './common/middleMap.vue';
import middleLineChart from './common/middleLineChart.vue';
import shopBox from './common/shopBox.vue';
import custBox from './common/custBox.vue';

export default {
	data() {
		return {
			boxData:{}
		}
	},
	components: {
		top,
		leftBox,
		leftBarChart,
		middleMap,
		middleLineChart,
		shopBox,
		custBox,
	},
	methods: {
		showBox:function(data){
			this.boxData = data;
		}
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
		width: 16rem;
		height: 9rem;
		.main-body{
			margin: 0.1rem;
		}
	}
</style>