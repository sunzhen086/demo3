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
			index:Number
		},
		data() {
			return {
				boxData:{
					
				}
			};
		},
		methods: {
			getData:function(id){
				var self = this;
				var params = {id:id};
				axios.get('/brandmarket/getAgeContrast',{params:params}).then(function(res){
					var data = {
						text:'年龄对比',
						name:res.data.name,
						xData:['20岁以下','20-30岁','30-40岁','40-50岁','50岁以上'],
						yData1:res.data.yData1,
						yData2:res.data.yData2,
						yData3:[0,0,0,0,0],	
						yData4:[5,5,5,5,5]
					}
					self.initChart(data);
				})

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
							return param[0].name + "<br/>" + param[0].seriesName + ": " + param[0].value + ""
								+ "<br/>" + param[2].seriesName + ": " + param[2].value + "";
						}
					},
					legend: {
						data: [{
							name:data.name[0],
							icon:'image://' + blueImage,
							textStyle: {
								color: '#3fa9f5'
							}
						}, {
							name:data.name[1],
							icon:'image://' + greenImage,
							textStyle: {
								color: '#0dffa4'
							}
						}],
						left:'26%',
				        top:'2%',
				        textStyle:{
				        	fontSize:14,
				        },
				        itemWidth:14,
					},
					grid: {
						left: '-11%',
				        right: '-2%',
				        bottom: '5%',
				        top:'13%',
				        containLabel: true
					},
					xAxis: {
						type: 'category',
						data: data.xData,
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
				        	color:'rgba(255,255,255,0.6)'
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
						name: data.name[0],
						type: 'bar',
						barWidth: '20%',
						stack:data.name[0],
                        itemStyle:{
                        	normal:{
                        		color:'rgba(63,169,245,0.6)'/*new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: 'rgba(63,169,245,1)'
		                        }, {
		                            offset: 1,
		                            color: 'rgba(63,169,245,0.2)'
		                        }])*/
                        	}
                        },
						data: data.yData1
					}, {
						name: data.name[0],
						type: 'bar',
						barWidth: '20%',
						stack:data.name[0],
                        itemStyle:{
                        	normal:{
                        		color:'rgba(63,169,245,1)'/*new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: 'rgba(63,169,245,1)'
		                        }, {
		                            offset: 1,
		                            color: 'rgba(63,169,245,0.2)'
		                        }])*/
                        	}
                        },
						data: data.yData4
					},{
						name: data.name[1],
						type: 'bar',
						barWidth: '20%',
						stack:data.name[1],
						itemStyle:{
                        	normal:{
                        		color:'rgba(13,255,164,0.6)'/*new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: 'rgba(13,255,164,1)'
		                        }, {
		                            offset: 1,
		                            color: 'rgba(13,255,164,0.2)'
		                        }])*/
                        	}
                        },
						data: data.yData2
					},{
						name: data.name[1],
						type: 'bar',
						barWidth: '20%',
						stack:data.name[1],
						itemStyle:{
                        	normal:{
                        		color:'rgba(13,255,164,0.6)'/*new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: 'rgba(13,255,164,1)'
		                        }, {
		                            offset: 1,
		                            color: 'rgba(13,255,164,0.2)'
		                        }])*/
                        	}
                        },
						data: data.yData4
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
			index:function(newVal,oldVal){
				if(this.myChart){
					this.myChart.clear();
				}
				this.getData(newVal);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chart {
		width: 3.6rem;
		height: 2rem;
		margin-top: 0.15rem;
	}
</style>