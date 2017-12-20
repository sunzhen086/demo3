<template>
	<div class="line" ref="lineChart">
	</div>
</template>

<script>
	import echarts from 'echarts';
	import axios from '@/utils/axios';
	export default {
		props: {
			index: Number
		},
		data() {
			return {
				boxData: {

				}
			}
		},
		components: {

		},
		methods: {
			getData: function(id) {
				var self = this;
				var params = {id:id};
				axios.get('/brandmarket/getBehaviourContrast',{params:params}).then(function(res){
					var data = {
						text: '走势对比',
						name: res.data.name,
						xData: res.data.xData,
						yData1: res.data.yData1,
						yData2: res.data.yData2
					}
					self.initLine(data);
				})
			},
			initLine: function(data) {
				var self = this;
				var myChart = this.myChart = echarts.getInstanceByDom(self.$refs.lineChart) || echarts.init(self.$refs.lineChart);
				var option = {
					title: {
						text: data.text,
						left: '0',
						top: '0',
						textStyle: {
							color: '#fff',
							fontSize: 18,
						}
					},
					tooltip: {
						trigger: 'axis',
						formatter: function(param) {
							return param[0].name + "<br/>" + param[0].seriesName + ": " + param[0].value.toFixed(2) + "" +
								"<br/>" + param[1].seriesName + ": " + param[1].value.toFixed(2) + "";
						}
					},
					legend: {
						data: [{
								name: data.name[0],
								icon: 'rect',
								textStyle: {
									color: '#3FA9F5'
								}
							},
							{
								name: data.name[1],
								icon: 'rect',
								textStyle: {
									color: '#0dffa4'
								}
							},
						],
						left: '13%',
						top: '2%',
						textStyle: {
							fontSize: 14,
						},
						itemWidth: 14,
					},
					grid: {
						left: '-50',
						top: '60',
						right: '25',
						bottom: '0%',
						containLabel: true
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,

						splitLine: {
							show: false,
						},
						axisTick: {
							show: false,
						},
						axisLabel: {
							color: 'rgba(255,255,255,0.5)'
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: 'rgba(255,255,255,0.5)',
								width: 2
							}
						},
						data: data.xData
					}],
					yAxis: [{
						type: 'value',
						show: false,
						min: 6.5
					}],
					series: [{
							name: data.name[0],
							type: 'line',
							symbol: 'circle',
							symbolSize: '6',
							lineStyle: {
								normal: {
									color: '#3FA9F5',
									width: 2,
									shadowColor: '#3FA9F5',
									shadowBlur: 5,
									shadowOffsetX: 2,
									shadowOffsetY: 2
								}
							},
							itemStyle: {
								normal: {
									opacity: 0,
									color: '#3FA9F5'
								}
							},
							areaStyle: {
								normal: {
									color: 'rgba(63,169,245,0.2)'
								}
							},
							data: data.yData1,
						},
						{
							name: data.name[1],
							type: 'line',
							symbol: 'circle',
							symbolSize: '6',
							lineStyle: {
								normal: {
									color: '#0dffa4',
									width: 2,
									shadowColor: '#0dffa4',
									shadowBlur: 5,
									shadowOffsetX: 2,
									shadowOffsetY: 2
								}
							},
							itemStyle: {
								normal: {
									opacity: 0,
									color: '#0dffa4'
								}
							},
							areaStyle: {
								normal: {
									color: 'rgba(13,255,164,0.2)'
								}
							},
							data: data.yData2
						}
					]
				};
				myChart.setOption(option);
			}
		},
		created() {

		},
		mounted() {

		},
		beforeDestroy() {
			if(this.myChart) {
				this.myChart.dispose();
			}
		},
		watch: {
			index: function(newVal, oldVal) {
				if(this.myChart) {
					this.myChart.clear();
				}
				this.getData(newVal);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.line {
		width: 7.8rem;
		height: 1.8rem;
		margin-top: 0.05rem;
		margin-left: 0.5rem;
	}
</style>