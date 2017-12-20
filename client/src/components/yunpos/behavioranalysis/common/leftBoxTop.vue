<template>
	<div class="box">
		<div class="boxTitle">
			<div class="leftIcon"></div>
			<div class="title">卷烟类热销商品</div>
			<div class="rightIcon"></div>
		</div>
		<tabbase class="boxTab" :tabData=tabData @change-action=changeAction>
			<leftBoxBarChart :chartData = chartData></leftBoxBarChart>
		</tabbase>
	</div>
</template>

<script>
import tabbase from '../../../tools/tabbase/tab-base.vue';
import leftBoxBarChart from './leftBoxBarChart.vue';
import axios from '@/utils/axios';
export default {
	props:{
		
	},
	data() {
		return {
			tabData:{
				index:0,
				data:['70元以下','70-80元','80-100元','100-145元','145-235元','235元以上']
			},
			chartData: {
				
			},
			chartDataList:[
			
			]
		}
	},
	components: {
		tabbase,
		leftBoxBarChart,
	},
	methods: {
		getData:function(){
			var self = this;
			axios.get('/behavioranalysis/popularTobacco').then(function(res){
				self.chartDataList =  res.data;
				self.chartData = self.chartDataList[self.tabData.index];
			})
		},
		changeAction:function(index){
			this.chartData = this.chartDataList[index];
		}
	},
	created(){
		
	},
	mounted() {
		this.getData();
	},
	beforeDestroy(){

	},
}
</script>

<style lang="scss" scoped>
	.box{
		overflow: hidden;
		.boxTitle{
			padding: 0.03rem 0rem;
			overflow:hidden;
			font-size: 0.16rem;
			line-height: 0.16rem;
			color: #3FA9F5;
			text-align: center;
			.title{
				float: left;
				padding: 0rem 0.1rem;
			}
			.leftIcon{
				width: 1.2rem;
				height: 0.16rem;
				float: left;
				background: url(../../../../assets/images/yunpos/behavioranalysis/boxleftline.png) no-repeat;
				background-size: 1.23rem 0.16rem;
			}
			.rightIcon{
				width: 1.2rem;
				height: 0.16rem;
				float: left;
				background: url(../../../../assets/images/yunpos/behavioranalysis/boxrightline.png) no-repeat;
				background-size: 1.23rem 0.16rem;
			}
		}
		.boxTab{
			margin-top: 0.05rem;
		}
	}
</style>