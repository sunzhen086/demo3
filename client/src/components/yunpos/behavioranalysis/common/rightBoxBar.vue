<template>
	<div class="chart" ref="barChart"></div>
</template>

<script>
	import echarts from 'echarts';
	import blueImage from '@/assets/images/yunpos/realtime/blue.png';
	import greenImage from '@/assets/images/yunpos/realtime/green.png';
	import axios from '@/utils/axios';
	export default {
		props:{
			chartData:Object
		},
		data() {
			return {
				
			};
		},
		methods: {
			getData:function(custsortid){
				var self = this;
				var params = {custsortid:custsortid};
				axios.get('/behavioranalysis/getGenderAgeRatio',{params:params}).then(function(res){
					var yData3 = [0,0,0,0,0];
					var data = res.data;
					data.yData3 = yData3;
					self.initChart(data);
				});
			},
			initChart: function(data) {
				var self = this;
				let myChart = this.myChart = echarts.getInstanceByDom(this.$refs.barChart) || echarts.init(this.$refs.barChart);
				var option = {
					title:{
						text:data.text,
						left:'0',
				        top:'0',
				        textStyle:{
				        	color:'#fff',
				        	fontSize:18,
				        }
					},
					tooltip: {
						trigger: 'axis',
						formatter:function(param){
							return param[0].name + "<br/>" + param[0].seriesName + ": " + param[0].value + "%"
								+ "<br/>" + param[1].seriesName + ": " + param[1].value + "%";
						}
					},
					legend: {
						data: [{
							name:'男性',
							icon:'image://' + blueImage,
							textStyle: {
								color: '#3fa9f5'
							}
						}, {
							name:'女性',
							icon:'image://' + greenImage,
							textStyle: {
								color: '#0dffa4'
							}
						}],
						left:'0',
				        top:'13%',
				        textStyle:{
				        	fontSize:14,
				        },
				        itemWidth:14,
					},
					grid: {
						left: '-11%',
				        right: '-2%',
				        bottom: '0%',
				        containLabel: true
					},
					xAxis: {
						type: 'category',
						data: ['20岁以下','20-30岁','30-40岁','40-50岁','50岁以上'],
						position:'bottom',
						axisLine: {
							onZeroAxisIndex:'0',
							lineStyle: {
								color: 'rgba(255,255,255,0.5)',
								opacity: 1,
								width:2
							}
						},
						axisLabel:{
				        	color:'rgba(255,255,255,1)'
				        },
						axisTick: {
							show: false
						}
					},
					yAxis: [{
						show:false,
						type:'value'
					}],
					series: [{
						name: '男性',
						type: 'bar',
						barWidth: '20%',
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
						data: data.yData1
					}, {
						name: '女性',
						type: 'bar',
						barWidth: '20%',
						itemStyle:{
                        	normal:{
                        		color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: 'rgba(13,255,164,1)'
		                        }, {
		                            offset: 1,
		                            color: 'rgba(13,255,164,0.2)'
		                        }])
                        	}
                        },
						data: data.yData2
					}, {
						name: '',
						type: 'line',
						symbol: 'circle',
						symbolSize:6,
						color: ['#fff'],
						lineStyle:{
							normal:{
								opacity:0
							}
						},
						data: data.yData3
					}]
				};
				myChart.setOption(option);
			}
		},
		mounted() {

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
				this.getData(newVal.custsortid);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chart {
		width: 3.3rem;
		height: 2.1rem;
	}
</style>