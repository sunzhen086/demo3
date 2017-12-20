<template>
	<div class="main">
		<top></top>
		<ul>
			<router-link to="/yunpos/realtime">
				<li class="module1"></li>
			</router-link>
			<router-link to="/yunpos/behavioranalysis">
				<li class="module2"></li>
			</router-link>
			<router-link to="/yunpos/brandmarket">
				<li class="module3"></li>
			</router-link>
		</ul>
	</div>
</template>

<script>
import top from './common/top.vue';

export default {
	data() {
		return {
			boxData:{}
		}
	},
	components: {
		top,
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
		width: 16rem;
		height: 9rem;
		
		ul{
			margin-top: 1.27rem;
			overflow: hidden;
			position: absolute;
			left: 50%;
			margin-left: -3.75rem;
			
			
			li{
				width: 2.5rem;
				height: 2.5rem;
				text-align: center;
				float: left;
				cursor: pointer;
			}
			
			.module1{
				background-image: url(../../../assets/images/yunpos/main/module1.png);
				background-size: 2.5rem 2.5rem;
			}
			.module1:hover{
				background-image: url(../../../assets/images/yunpos/main/module1_hover.png);
				background-size: 2.5rem 2.5rem;
			}
			.module2{
				background-image: url(../../../assets/images/yunpos/main/module2.png);
				background-size: 2.5rem 2.5rem;
			}
			.module2:hover{
				background-image: url(../../../assets/images/yunpos/main/module2_hover.png);
				background-size: 2.5rem 2.5rem;
			}
			.module3{
				background-image: url(../../../assets/images/yunpos/main/module3.png);
				background-size: 2.5rem 2.5rem;
			}
			.module3:hover{
				background-image: url(../../../assets/images/yunpos/main/module3_hover.png);
				background-size: 2.5rem 2.5rem;
			}
		}
	}
</style>