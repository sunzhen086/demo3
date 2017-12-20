<template>
	<div class="chart" ref="scatterChart">

	</div>
</template>

<script>
	import echarts from 'echarts';
	import axios from '@/utils/axios';
	export default {
		props: {

		},
		data() {
			return {
				boxData: {
					text: "[100-145元)"
				},
			}
		},
		components: {

		},
		methods: {
			getData: function() {
				var self = this;
				axios.get('/brandmarket/BubbleChartData').then(function(res){
				 	var countries = res.data.countries;
				 	var years = res.data.years;
				 	var data = res.data.data;
				 	
				 	self.initScatter({
				 		countries,years,data
				 	});
				 	
				})
				
			},
			initScatter: function(dataObj) {
				var self = this;
				var chart = this.chart = echarts.getInstanceByDom(self.$refs.scatterChart) || echarts.init(self.$refs.scatterChart);
				var countries = dataObj.countries;
				var years = dataObj.years;
				var data = dataObj.data;

				function getMax(dim) {
					var max = 0;
					data.forEach(function(dataByYear) {
						dataByYear.forEach(function(item) {
							if(item[dim] > max) {
								max = item[dim];
							}
						});
					});
					var exp = Math.round(Math.log(max) / Math.log(10));
					var exp10 = Math.pow(10, exp);
					max = Math.ceil(max / exp10 * 10) / 10 * exp10;

					return max;
				}

				var itemStyle = {
				};

				var option = {
					baseOption: {
						timeline: {
							show: false,
							axisType: 'category',
							orient: 'vertical',
							autoPlay: true,
							inverse: true,
							playInterval: 500,
							loop:false,
							left: null,
							right: 30,
							top: 20,
							bottom: 50,
							width: 55,
							height: null,
							label: {
								normal: {
									textStyle: {
										color: '#ddd'
									}
								},
								emphasis: {
									textStyle: {
										color: '#fff'
									}
								}
							},
							symbol: 'none',
							lineStyle: {
								color: '#555'
							},
							checkpointStyle: {
								color: '#bbb',
								borderColor: '#777',
								borderWidth: 2
							},
							controlStyle: {
								showNextBtn: false,
								showPrevBtn: false,
								normal: {
									color: '#666',
									borderColor: '#666'
								},
								emphasis: {
									color: '#aaa',
									borderColor: '#aaa'
								}
							},
							data: years
						},
						title: {
							text: '',
							right: '3',
							bottom: 50,
							textStyle: {
								fontSize: 70,
								color: 'rgba(255, 255, 255, 0.3)'
							}
						},
						tooltip: {
							padding: 5,
							backgroundColor: '#222',
							borderColor: '#777',
							borderWidth: 1
						},
						grid:{
							bottom:'8%',
							left:'5%',
							right:'5%',
							containLabel:true,
						},
						xAxis: {
							type: 'value',
							name: '销量占比',
							nameGap: 25,
							min: 8,
							max: 13.5,
							nameLocation: 'middle',
							nameTextStyle: {
								fontSize: 18
							},
							splitLine: {
								show: false
							},
							axisTick: {
								lineStyle: {
									color: '#ddd'
								}
							},
							axisLine: {
								lineStyle: {
									color: '#ddd'
								}
							},
							axisLabel: {
								textStyle: {
									color: '#ddd'
								}
							}
						},
						yAxis: {
							type: 'value',
							name: '投放面',
							nameGap: 25,
							min: 0,
							max: 4.5,
							nameTextStyle: {
								color: '#ccc',
								fontSize: 18
							},
							axisLine: {
								lineStyle: {
									color: '#ddd'
								}
							},
							axisTick: {
								lineStyle: {
									color: '#ddd'
								}
							},
							splitLine: {
								show: false
							},
							axisLabel: {
								formatter: '{value} ',
								textStyle: {
									color: '#ddd'
								}
							}
						},

						visualMap: [{
							show: false,
							type: 'piecewise',
							dimension: 3,
							categories: countries.map(function(item, index) {
								return item[0]
							}),
							left: 10,
							bottom: 35,
							calculable: true,
							precision: 0.1,
							textGap: 10,
							itemGap: 3,
							textStyle: {
								color: '#ccc'
							},
							inRange: {
								//color: ['#bcd3bb', '#e88f70', '#9dc5c8', '#e1e8c8', '#7b7c68', '#e5b5b5', '#f0b489', '#928ea8', '#bda29a', '#376956', '#c3bed4', '#495a80', '#9966cc', '#bdb76a', '#eee8ab', '#a35015', '#04dd98', '#d9b3e6', '#b6c3fc', '#315dbc', '#c5c975', '#476a54', '#66e638', '#a59619', '#822ee2', '#49450d', '#eeebd4', '#2b98dc', '#b95c25', '#8f1ec2', '#d50390', '#36a15d', '#edc1a5']
							},
							outOfRange: {
								color: '#555'
							}
						}, {
							show: false,
							type: 'continuous',
							dimension: 2,
							min: 10,
							max: 18,
							inRange: {
								symbolSize: [0, 50]
							}
						}],
						series: [{
								type: 'scatter',
								id: '潜力规格',
								itemStyle: itemStyle,
								data: [],
							},
							{
								type: 'scatter',
								id: '护卫规格',
								itemStyle: itemStyle,
								data: [],
							},
							{
								type: 'effectScatter',
								id: '主导规格',
								itemStyle: itemStyle,
								rippleEffect:{
									period:2,
									scale:2,
									brushType:"fill"
								},
								data: [],
								animationDuration:0,
								tooltip: {
								}
							}
						],
						animationDurationUpdate: 1000,
						animationEasingUpdate: 'linear'
					},
					options: []
				};

				for(var n = 0; n < years.length; n++) {
					option.options.push({
						title: {
							text: years[n].substring(0,4) + "年" + years[n].substring(4,6) + "月",
							bottom:'18%',
							right:'3%'
						},
						series: [{
								id: '潜力规格',
								type: 'scatter',
								itemStyle: itemStyle,
								data: data[n].map(function(item, index) {									
									return {
										value:item.concat(countries[index]),
										itemStyle:{
											normal:{
												color:'rgba(63,169,245,0.5)'
											}
										}
									};
								}).filter(function(item) {
									return item.value[4] == '潜力规格';
								}),
								label: {
									normal: {
										show: false,
										position: "right",
										formatter: function(obj) {
											return obj.value[3];
										}
									}
								},
								symbolSize: 10
							},
							{
								id: '护卫规格',
								type: 'scatter',
								itemStyle: itemStyle,
								data: data[n].map(function(item, index) {
									return {
										value:item.concat(countries[index]),
										itemStyle:{
											normal:{
												color:"rgba(66,248,66,0.5)"
											}
										}
									};
								}).filter(function(item) {
									return item.value[4] == '护卫规格';
								}),
								label: {
									normal: {
										show: true,
										position: "right",
										formatter: function(obj) {
											return obj.value[3];
										}
									}
								},
								symbolSize: 10
							},
							{
								id: '主导规格',
								type: 'effectScatter',
								itemStyle: itemStyle,
								data: data[n].map(function(item, index) {
									return {
										value:item.concat(countries[index]),
										itemStyle:{
											normal:{
												color:"rgba(247,147,30,0.5)"
											}
										}
									};
								}).filter(function(item) {
									return item.value[4] == '主导规格';
								}),
								label: {
									normal: {
										show: true,
										position: "right",
										formatter: function(obj) {
											return obj.value[3];
										}
									}
								},
								symbolSize: 10
							}
						]
					});
				}
				chart.setOption(option);
			}
		},
		created() {

		},
		mounted() {
			this.getData();
		},
		beforeDestroy() {
			if(this.chart) {
				this.chart.clear();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.chart {
		width: 6.5rem;
		height: 4.15rem;
	}
</style>