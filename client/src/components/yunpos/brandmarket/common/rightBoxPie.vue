<template>
	<div class="pieBox">
		<div class="title">{{title}}</div>
		<div class="legend">
			<div class="one">
				<div class="icon blue"></div>
				<div class="name">{{legend[0]}}</div>
			</div>
			<div class="two">
				<div class="icon green"></div>
				<div class="name">{{legend[1]}}</div>
			</div>
		</div>
		<div class="clear"></div>
		<pieChart :chartData=boxData[0] :index=index></pieChart>
		<pieChart :chartData=boxData[1] :index=index></pieChart>
	</div>
</template>

<script>
import pieChart from './pieChart.vue'
import axios from '@/utils/axios';
export default {
	props:{
		index:Number
	},
	data() {
		return {
			title:'性别对比',
			legend:['男性','女性'],
			boxData:[]
		}
	},
	components: {
		pieChart
	},
	methods: {
		getData:function(id){
			var self = this;
			var params = {id:id};
			axios.get('/brandmarket/getGenderContrast',{params:params}).then(function(res){
				self.boxData = res.data;
			})
		}
	},
	created(){

	},
	mounted() {
		
	},
	beforeDestroy(){
		
	},
	watch:{
		index:function(newVal,oldVal){
			this.getData(newVal);
		}
	}
}
</script>

<style lang="scss" scoped>
	.pieBox{
		margin-top: 0.22rem;
		overflow: hidden;
		.title{
			float: left;
			font-size: 0.18rem;
			color: #fff;
			font-weight: bolder;
		}
		.legend{
			float: left;
			font-size: 0.14rem;
			font-weight: bolder;
			margin-left: 0.2rem;
			margin-top: 0.03rem;
			overflow: hidden;
			.one{
				float: left;
				overflow:hidden;
				.name{
					color: #3FA9F5;
					margin-left: 0.06rem;
					float: left;
				}
			}
			.two{
				float: left;
				overflow:hidden;
				margin-left: 0.1rem;
				.name{
					color: #0DFFA4;
					margin-left: 0.06rem;
					float: left;
				}
			}
			.icon{
				width: 0.14rem;
				height: 0.14rem;
				float: left;
			}
			.blue{
				background: #3FA9F5;
			}
			.green{
				background: #0DFFA4;
			}
		}
		.clear{
			clear: both;
		}
	}
</style>