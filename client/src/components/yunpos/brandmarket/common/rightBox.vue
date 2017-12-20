<template>
	<div class="rightBox">
		<rightBoxTop @change-action="changeAction"></rightBoxTop>
		<rightBoxLine :index = selectIndex></rightBoxLine>
		<div class="rightBoxBottom">
			<div class="rightBoxBottomLeft">
				<rightBoxBar :index = selectIndex></rightBoxBar>
				<rightBoxBottomLeft :index = selectIndex></rightBoxBottomLeft>
			</div>
			<div class="rightBoxBottomRight">
				<rightBoxPie :index = selectIndex></rightBoxPie>
				<rightBoxBottomRight :index = selectIndex></rightBoxBottomRight>
			</div>
		</div>
	</div>
</template>

<script>
import rightBoxBar from './rightBoxBar.vue'
import rightBoxBottomLeft from './rightBoxBottomLeft.vue'
import rightBoxBottomRight from './rightBoxBottomRight.vue'
import rightBoxLine from './rightBoxLine.vue'
import rightBoxPie from './rightBoxPie.vue'
import rightBoxTop from './rightBoxTop.vue'
export default {
	props:{
		
	},
	data() {
		return {
			selectIndex : 0,
		}
	},
	components: {
		rightBoxBar,
		rightBoxBottomLeft,
		rightBoxBottomRight,
		rightBoxLine,
		rightBoxPie,
		rightBoxTop,
	},
	methods: {
		changeAction:function(index){
			this.selectIndex = index;
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
		margin-left: 0.28rem;
		margin-top: 0.15rem;
		width: 8.51rem;
		height: 7.27rem;
		background: url(../../../../assets/images/yunpos/brandmarket/rightbg.png) no-repeat;
		background-size: 8.51rem 7.27rem;
		.rightBoxBottom{
			.rightBoxBottomLeft{
				float: left;
				margin-left: 0.5rem;
			}
			.rightBoxBottomRight{
				float: left;
				margin-left: 0.4rem;
			}
		}
	}
</style>