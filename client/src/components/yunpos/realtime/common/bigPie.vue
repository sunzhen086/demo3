<template>
	<div class="pieBox">
		<div class="chart" ref="barChart"></div>
		<!--<div class="viewPercent1">
			<figureFormat format="small-decimal" :strValue=chartData.typeValue[0].value></figureFormat>
			<span class="per">%</span>
		</div>
		<div class="viewPercent2">
			<figureFormat format="small-decimal" :strValue=chartData.typeValue[1].value></figureFormat>
			<span class="per">%</span>
		</div>-->
	</div>
</template>

<script>
	import echarts from 'echarts';
	import figureFormat from '../../../tools/figureformat/figure-format.vue';
	export default {
		props:{
			isShow:Boolean
		},
		data() {
			return {
				chartData:{
					'typeName':'卷烟非烟\n销售占比',
					'color':['#0dffa4','#3fa9f5'],
					'typeValue':[{name:'非烟销售',value:'21.23'},{name:'卷烟销售',value:'78.77'}]
				}
			}
		},
		methods: {
			initPie: function() {
				var myChart = this.myChart = echarts.getInstanceByDom(this.$refs.barChart) || echarts.init(this.$refs.barChart);
				var that = this;
				var option = {
					title:{
						text:this.chartData.typeName,
						textStyle:{
							color:'#fff',
							align:'center',
							fontSize:13,
						},
						left:'40%',
						top:'40%'
					},
				    series: [
				        {
				            type:'pie',
				            center: ['50%', '50%'],
				            radius: ['50%', '65%'],
				            avoidLabelOverlap: false,
				            selectedMode: 'single',
				            //hoverAnimation:false,
				            label: {
				            	normal:{
				            		formatter:'{title|{d}%}\n{content|{b}}',
				            		/*function(param){
				            			var name = param.name;
				            			var value = param.value;
				            			var integerValue = value.split(".")[0];
				            			var decimalValue = value.split(".")[1];
										return "<span class='integer'>"+integerValue+"</span>";
				            			+ "<span class='decimal'>"+decimalValue+"%</span>";
				            			+ "\n"+name;
									},*/
				            		rich: {
		                                title: {
		                                    fontSize: 16,
		                                    fontFamily:"digifaw",
		                                    align: 'center',
		                                },
		                                content:{
		                                	fontSize: 16,
		                                    align: 'left',
		                                },
		                            }
				            	},
				                emphasis: {
				                    rich: {
		                                title: {
		                                    fontSize: 18,
		                                    align: 'center',
		                                    fontFamily:"digifaw",
		                                    fontWeight:'bolder',
		                                },
		                                content:{
		                                	fontSize: 18,
		                                    align: 'left',
		                                    fontWeight:'bolder',
		                                },
		                            }
				                }
				            },
				            labelLine: {
				            	normal:{
				            		lineStyle:{
				                    	width:2
				                    }
				            	},
				                emphasis: {
				                	show:true,
				                    lineStyle:{
				                    	width:4
				                    }
				                }
				            },
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 100,
				                    shadowOffsetX: 0,
				                    shadowOffsetY: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            },
				            color:this.chartData.color,
				            data:this.chartData.typeValue
				        }
				    ]
				};
				myChart.setOption(option);
			}
		},
		mounted() {
			//this.initPie();
		},
		beforeDestroy() {
			if(this.myChart){
				this.myChart.dispose();
			}
		},
		components: {
			figureFormat
		},
		watch:{
			isShow:function(newVal,oldVal){
				if(newVal){
					this.initPie();
				}else{
					if(this.myChart){
						this.myChart.clear();
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pieBox{
		.chart{
			width: 3rem;
			height: 1.8rem;
			margin-left: 0.15rem;
			margin-top: 0.5rem;
			margin-bottom: 0.1rem;
		}
		.integer{
			font-weight: inherit;
		}
		.decimal {
			font-size:70%;		
		}
		.viewPercent1{
			position: absolute;
			left: 2.42rem;
			bottom: 1.5rem;
			color: #0dffa4;
			.per{
				font-size: 70%;
			}
		}
		.viewPercent1:hover{
			font-weight: bolder;
		}
		.viewPercent2{
			position: absolute;
			left: 0.42rem;
			bottom: 0.34rem;
			color: #3fa9f5;
			.per{
				font-size: 70%;
			}
		}
		.viewPercent2:hover{
			font-weight: bolder;
		}
	}
</style>