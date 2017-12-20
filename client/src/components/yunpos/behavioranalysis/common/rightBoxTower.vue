<template>
	<div class="chartBox">
		<div class="chart" ref="towerChart"></div>
		<div class="label label1" v-if="boxData.max != 0">
			<div class="mark">￥</div>
			<figureFormat format="small-decimal" :numValue=boxData.max></figureFormat> 
		</div>
		<div class="label label2" v-if="boxData.avg != 0">
			<div class="name">平均值：</div>
			<div class="mark">￥</div>
			<div class="value">
				<figureFormat format="small-decimal" :numValue=boxData.avg></figureFormat> 
			</div>
			<!--<div class="percent">%</div>-->
		</div>
	</div>
</template>

<script>
import echarts from 'echarts';
import figureFormat from '../../../tools/figureformat/figure-format.vue';
import pyramid0 from '@/assets/images/yunpos/behavioranalysis/pyramid0.png';
import pyramid1 from '@/assets/images/yunpos/behavioranalysis/pyramid1.png';
import pyramid2 from '@/assets/images/yunpos/behavioranalysis/pyramid2.png';
export default {
	props:{
		chartData:Object
	},
	data() {
		return {
			boxData:{
				max:0,
				avg:0,
				bigger:'avg'
			}
		}
	},
	components: {
		figureFormat,
	},
	methods: {
		getData:function(){
			var dataList = [
				{
					max:'41.80',
					avg:'25.63',
					bigger:'max',
				},
				{
					max:'22.97',
					avg:'25.63',
					bigger:'avg',
				},
				{
					max:'13.72',
					avg:'25.63',
					bigger:'avg',
				},
				{
					max:'8.19',
					avg:'25.63',
					bigger:'avg',
				},
			];
			var data = dataList[2];
			this.boxData = data;
			this.initTower(data);
		},
		initTower:function(data){
			var self = this;
			var myChart = this.myChart = echarts.getInstanceByDom(self.$refs.towerChart) || echarts.init(self.$refs.towerChart);	
			var option = {
				title:{
					text:'单包消费金额',
					left:'0',
			        top:'0',
			        textStyle:{
			        	color:'#fff',
			        	fontSize:18,
			        }
				},
			    xAxis: [{
			        data: ['最高','平均'],
			        show:false,
			    }],
			    yAxis: {
			        show:false,
			    },
			    animationEasing: 'elasticOut',
			    grid:{
			    	top:'45%',
			    	bottom:'5%',
			    	left:'14%',
			    	right:'14%',
			    },
			    series: [{
			        type: 'pictorialBar',
			        name: '',
			        hoverAnimation: true,
			        label: {
			            show:false,
			        },
			        data: [{
			            value: data.max,
			            symbol: 'image://' + pyramid0,
			            symbolSize: ['200%', '105%'],
			            symbolPosition: 'end',
			            z: 9
			        }, {
			            value:  data.avg,
			            symbol: 'image://' + pyramid1,
			            symbolSize: ['200%', '105%'],
			            symbolPosition: 'end',
			            z: 10
			        }],
			    },{
			        type: 'pictorialBar',
			        name: '',
			        hoverAnimation: false,
			        label: {
			            show:false,
			        },
			        data: [{
			            value:  data[data.bigger],
			            symbol: 'image://' + pyramid2,
			            symbolSize: ['200%', '104%'],
			            symbolPosition: 'end',
			            z: 0
			        }, {
			            value:  data[data.bigger],
			            symbol: 'image://' + pyramid2,
			            symbolSize: ['200%', '104%'],
			            symbolPosition: 'end',
			            z: 0
			        }],
			    }]
			};
			myChart.setOption(option);
		}
	},
	created(){

	},
	mounted() {
		//this.getData();
	},
	beforeDestroy(){
		if(this.myChart){
			this.myChart.dispose();
		}
	},
	watch:{
		chartData:function(newVal,oldVal){
			if(this.myChart){
				this.myChart.clear();
			}
			
			this.boxData = {
				max:newVal.maxexpense,
				avg:newVal.avgexpense,
				bigger:'avg'
			};
			this.initTower(this.boxData);
		}
	}
}
</script>

<style lang="scss" scoped>
	.chartBox{
		position: relative;
		.chart {
			width: 3.2rem;
			height: 2.2rem;
		}
		.label{
			position: absolute;
			top: 0.4rem;
		}
		.label1{
			left: 0.1rem;
			color: #0DFFA4;
			font-family: 'digifaw';
			font-size: 0.4rem;
			text-align: center;
			font-weight: bolder;
			.mark{
				font-size: 0.22rem;
				float: left;
				margin-top: 0.14rem;
				font-weight: 900;
				font-family: "微软雅黑";
			}
		}
		.label2{
			left:1.5rem;
			top:0.6rem;
			color: rgba(255,255,255,0.4);
			font-family: 'digifaw';
			font-size: 0.12rem;
			.name{
				float: left;
				margin-top: 0.02rem;
			}
			.mark{
				float: left;
				font-size: 0.13rem;
				margin-top: 0.03rem;
				margin-left: -0.05rem;
				font-family: "微软雅黑";
			}
			.value{
				float: left;
				font-size: 0.26rem;
				margin-top: -0.06rem;
			}
			.percent{
				float: left;
				font-size: 0.16rem;
				margin-left: 0.01rem;
				margin-top: 0.02rem;
			}
		}
	}
	
</style>