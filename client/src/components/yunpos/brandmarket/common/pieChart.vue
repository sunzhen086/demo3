<template>
	<div class="pieChart" ref="pieChart"></div>
</template>

<script>
	import echarts from 'echarts';
	export default {
		props:{
			chartData:Object,
			index:Number
		},
		data() {
			return {

			}
		},
		methods: {
			initPie: function() {
				var myChart = this.myChart = echarts.getInstanceByDom(this.$refs.pieChart) || echarts.init(this.$refs.pieChart);
				var that = this;
				var option = {
					title:{
						text:that.chartData.text,
						textStyle:{
							color:'#fff',
							align:'center',
							fontSize:12,
						},
						bottom:'0%',
						left:'30%'
					},
					tooltip:{
						trigger:'item',
					},
				    series: [
				        {
				            type:'pie',
				            center: ['50%', '50%'],
				            radius: ['40%', '60%'],
				            avoidLabelOverlap: false,
				            selectedMode: 'single',
				            startAngle:90,
				            clockwise:false,
				            //hoverAnimation:false,
				            label: {
				            	normal:{
				            		show:false,
				            	},
				            },
				            itemStyle: {
				                emphasis: {
				                	borderWidth:0,
				                    shadowBlur: 100,
				                    shadowOffsetX: 0,
				                    shadowOffsetY: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            },
				            color:['#3fa9f4','#0dffa4'],
				            data:[
				            	{
				            		name:that.chartData.data[0].name,
				            		value : that.chartData.data[0].value,
				            		itemStyle:{
										normal:{
											borderColor:'#3fa9f5',
											borderWidth:8,
										}
									}
				            	},
				            	{
				            		name:that.chartData.data[1].name,
				            		value : that.chartData.data[1].value,
				            	}
				            ]
				        },
				        {
				            type:'pie',
				            center: ['50%', '50%'],
				            radius: ['70%', '72%'],
				            avoidLabelOverlap: false,
				            selectedMode: 'single',
				            startAngle:90,
				            clockwise:false,
				            hoverAnimation:false,
				            label: {
				            	normal:{
				            		show:false,
				            	},
				            },
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 100,
				                    shadowOffsetX: 0,
				                    shadowOffsetY: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            },
				            color:['rgba(255,255,255,0.4)'],
				            data:[{name:'',value:'100'}]
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
			
		},
		watch:{			
			chartData:function(newVal,oldVal){
				if(this.myChart){
					this.myChart.clear();
				}
				this.initPie();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pieChart{
		width: 2rem;
		height: 1.7rem;
		float: left;
	}
</style>