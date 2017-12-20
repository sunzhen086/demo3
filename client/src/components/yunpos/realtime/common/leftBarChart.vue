<template>
	<div class="chart" ref="chart"></div>
</template>

<script>
	import echarts from 'echarts';
	import blueImage from '@/assets/images/yunpos/realtime/blue.png';
	import axios from '@/utils/axios';
	export default {
		props:{
			
		},
		data() {
			return {
				xData:['0000.00','0000.00','0000.00','0000.00','0000.00','0000.00'],
				yData:[
					{max:500,min:200},
					{max:80,min:0},
				],
				barData:[0, 0, 0, 0, 0, 0],
				lineData:[0, 0, 0, 0, 0, 0],
				tickData:[0,0,0,0,0,0],
				chartName:[' 交易金额',' 交易笔数']				
			};
		},
		methods: {
			getData:function(){
				var self = this;
				axios.get('/realtime/getMonthlyTransaction').then(function(res){
					self.xData = res.data.xData;
					self.barData = res.data.barData;
					self.lineData = res.data.lineData;
					self.drawChart();
				})
			},
			drawChart: function() {
				var option = {
					title:{
						text:"月度交易情况",
						textStyle:{
							color:'#fff',
							fontSize:20
						},
						left:'2%',
					},
					tooltip: {
						trigger: 'axis',
						formatter:function(param){
							return param[0].name + "<br/>" + param[0].seriesName + ": " + param[0].value + "万元"
								+ "<br/>" + param[1].seriesName + ": " + param[1].value + "万笔";
						}
					},
					color:['#3fa9f5','#0dffa4'],
					legend: {
						data: [{
							name:this.chartName[0],
							icon:'image://' + blueImage,
							textStyle: {
								color: '#3fa9f5'
							}
						}, {
							name:this.chartName[1],
							icon:"rect",
							textStyle: {
								color: '#0dffa4'
							}
						}],
						left:'2%',
						top:'13%',
						itemWidth:14,
					},
					grid: {
						left: '2%',
						right: '2%',
						bottom:'10%',
					},
					xAxis: {
						type: 'category',
						data: this.xData,
						position:'bottom',
						axisLine: {
							onZeroAxisIndex:'0',
							lineStyle: {
								color: '#fff',
								opacity: 0.8
							}
						},
						axisTick: {
							show: false
						}
					},
					yAxis: [{
						show:false,
						type: 'value',
					}, {
						show:false,
						type: 'value',
					}],
					series: [{
						type: 'bar',
						barWidth: '50%',
						name: this.chartName[0],
                        itemStyle:{
                        	normal:{
                        		color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: 'rgba(63,169,245,1)'
		                        }, {
		                            offset: 1,
		                            color: 'rgba(63,169,245,0.2)'
		                        }])
                        	}
                        },
						data: this.barData
					}, {
						name: this.chartName[1],
						type: 'line',
						yAxisIndex: 1,
						symbol: 'circle',
						color: ['#0dffa4'],
						data: this.lineData
					}, {
						name: '',
						type: 'line',
						yAxisIndex: 1,
						symbol: 'circle',
						symbolSize:8,
						color: ['#fff'],
						lineStyle:{
							normal:{
								opacity:0
							}
						},
						data: this.tickData
					}]
				};
				let chart = this.chart = echarts.getInstanceByDom(this.$refs.chart) || echarts.init(this.$refs.chart);
				chart.setOption(option);
			}
		},
		mounted() {

		},
		beforeDestroy(){
			if(this.chart){
				this.chart.dispose();
			}
		},
		created() {
			this.getData();
		}
	}
</script>

<style lang="scss" scoped>
	.chart {
		width: 4rem;
		height: 2.6rem;
		position: absolute;
		z-index: 2;
		bottom: 0.2rem;
		left: 0.6rem;
	}
</style>