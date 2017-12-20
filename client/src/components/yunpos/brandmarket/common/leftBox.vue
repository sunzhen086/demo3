<template>
	<div class="leftBox">
		<div class="leftBoxTop">
			<div class="topTitle">{{topTitle}}</div>
			<!--<div class="square"></div>
			<div class="triangle"></div>-->
			<leftBoxTop></leftBoxTop>
		</div>
		<div class="leftBoxBottom">
			<leftBoxBottomLeft></leftBoxBottomLeft>
			<leftBoxBottomRight></leftBoxBottomRight>
		</div>
	</div>
</template>

<script>
import leftBoxTop from './leftBoxTop.vue';
import leftBoxBottomLeft from './leftBoxBottomLeft.vue';
import leftBoxBottomRight from './leftBoxBottomRight.vue';
export default {
	props:{
		
	},
	data() {
		return {
			topTitle:'价位段 : [100-145元)',
			boxData:{}
		}
	},
	components: {
		leftBoxTop,
		leftBoxBottomLeft,
		leftBoxBottomRight,
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
		width: 6.5rem;
		background-color:transparent;
		position:relative;
		/*-moz-box-shadow: 0 0 0.1rem 0.05rem rgba(63,169,245,0.7) inset;
		box-shadow:0 0 0.1rem 0.05rem rgba(63,169,245,0.7) inset;
		padding: 0.16rem 0.15rem 0.23rem 0.15rem;*/
		.leftBoxTop{
			.topTitle{
				background-color:transparent;
				-moz-box-shadow: 0 0 0.1rem 0.05rem rgba(63,169,245,0.7) inset;
				box-shadow:0 0 0.1rem 0.05rem rgba(63,169,245,0.7) inset;
				font-size: 0.16rem;
				line-height: 0.16rem;
				font-weight: bolder;
				padding: 0.1rem 0.4rem;
				width: 2rem;
				position:absolute;
				border-right: 0;
				left:1.2rem;
				top:0.15rem;
			}
			.box{
				width: 2.6rem;
				border:0.35rem solid transparent;  
     			border-top: 0.35rem solid rgba(63,169,245,0.7);
     			border-left: 0;
     			-moz-box-shadow: 0 0 0.1rem 0.05rem rgba(63,169,245,0.7) inset;
				box-shadow:0 0 0.1rem 0.05rem rgba(63,169,245,0.7) inset;
			}
			.triangle{
				width:0; 
		        height:0;
		        border-width:0.14rem;
		        border-style:solid;
		        opacity: 0.569;
		        border-color:transparent rgba(109,140,163,1) rgba(109,140,163,1) transparent;
		        float: left;
		        margin-left: -0.27rem;
		        margin-top: 0.08rem;
			}
		}
		.leftBoxBottom{
			overflow: hidden;
			margin-top: 0.05rem;
		}
	}
</style>