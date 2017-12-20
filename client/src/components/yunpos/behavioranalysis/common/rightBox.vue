<template>
	<div class="rightBox">
		<rightBoxTop class="top" @show-charts = showCharts></rightBoxTop>
		<rightBoxMap></rightBoxMap>
		
		<rightBoxPie class="pie" :chartData = panelData></rightBoxPie>
		<rightBoxTower class="tower" :chartData = panelData></rightBoxTower>
		
		<rightBoxRadar class="radar" :chartData = panelData></rightBoxRadar>
		<rightBoxLine class="line" :chartData = panelData></rightBoxLine>
		<rightBoxBar class="bar" :chartData = panelData></rightBoxBar>
	</div>
</template>

<script>
import rightBoxBar from './rightBoxBar.vue'
import rightBoxLine from './rightBoxLine.vue'
import rightBoxMap from './rightBoxMap.vue'
import rightBoxPie from './rightBoxPie.vue'
import rightBoxRadar from './rightBoxRadar.vue'
import rightBoxTop from './rightBoxTop.vue'
import rightBoxTower from './rightBoxTower.vue'
export default {
	props:{
		
	},
	data() {
		return {
			panelData:{}
		}
	},
	components: {
		rightBoxBar,
		rightBoxLine,
		rightBoxMap,
		rightBoxPie,
		rightBoxRadar,
		rightBoxTop,
		rightBoxTower,
	},
	methods: {
		showCharts:function(data){
			this.panelData = data;
		}
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
	.rightBox{
		float: left;
		margin-left: 0.3rem;
		margin-top: 0.15rem;
		width: 10.89rem;
		background-color:transparent;
		-moz-box-shadow: 0 0 0.1rem 0.05rem rgba(63,169,245,0.4) inset;
		box-shadow:0 0 0.1rem 0.05rem rgba(63,169,245,0.4) inset;
		padding: 0.15rem 0rem 0.2rem 0rem;
		position: relative;
		.top{
			position: absolute;
			top:0;
			z-index: 1;
		}
		.pie{
			position: absolute;
			left:0.1rem;
			top:50%;
			margin-top: -1.1rem;
			z-index: 1;
		}
		.tower{
			position: absolute;
			right:0.2rem;
			top:50%;
			margin-top: -1.1rem;
			z-index: 1;
		}
		.radar{
			position: absolute;
			bottom:0.2rem;
			left:0.2rem;
			z-index: 1;
		}
		.line{
			position: absolute;
			bottom:0.2rem;
			left:50%;
			margin-left: -2.2rem;
			z-index: 1;
		}
		.bar{
			position: absolute;
			bottom:0.2rem;
			right:0.2rem;
			z-index: 1;
		}
	}
</style>