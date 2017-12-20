<template>
	<div class="line" ref="lineChart">
	</div>
</template>

<script>
import echarts from 'echarts';
import axios from '@/utils/axios';
export default {
	props:{
		chartData:Object
	},
	data() {
		return {

		}
	},
	components: {

	},
	methods: {
		getData:function(custsortid){
			var self = this;
			var params = {custsortid:custsortid};
			axios.get('/behavioranalysis/getCigaretteCompareData',{params:params}).then(function(res){
				console.log(res.data);
				var data = {
					text:'越来越喜欢细支烟',
					name:['普通烟','细支烟'],
					yData1:res.data.yData1,
					yData2:res.data.yData2
				}
				self.initLine(data);
			});
		},
		initLine:function(data){
			var self = this;
			var myChart = this.myChart = echarts.getInstanceByDom(self.$refs.lineChart) || echarts.init(self.$refs.lineChart);	
			var option = {
			    title: {
			        text: data.text,
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
							+ "<br/>" + param[1].seriesName + ": " + param[1].value + "";
					}
			    },
			    legend: {
			        data:[
						{
							name:data.name[0],
							icon:'rect',
							textStyle:{
								color:'#3FA9F5'
							}
						},
						{
							name:data.name[1],
							icon:'rect',
							textStyle:{
								color:'#0dffa4'
							}
						},
					],
			        left:'0',
			        top:'10%',
			        textStyle:{
			        	fontSize:14,
			        },
			        itemWidth:14,
			    },
			    grid: {
			        left: '1%',
			        right: '2%',
			        bottom: '0%',
			        containLabel: true
			    },
			    xAxis: [
			    	{
				        type: 'category',
				        boundaryGap: false,
				        position:'bottom',
				        splitLine:{
				        	show:true,
				        	lineStyle:{
				        		color:['rgba(255,255,255,0.5)'],
				        	}
				        },
				        axisTick:{
				        	show:false,
				        },
				        axisLabel:{
				        	color:'rgba(255,255,255,0.8)'
				        },
				        axisLine:{
				        	show:true,
				        	lineStyle:{
				        		color:'rgba(255,255,255,0.5)',
				        		width:2
				        	}
				        },
				        data: ['2017.08','2017.09','2017.10']
			    	},
			    	{
				        type: 'category',
				        boundaryGap: false,
				        position:'top',
				        splitLine:{
				        	show:false,
				        },
				        axisTick:{
				        	show:true,
				        	length:15,
				        	lineStyle:{
				        		color:'rgba(255,255,255,0.5)'
				        	}
				        },
				        axisLabel:{
				        	show:false,
				        },
				        axisLine:{
				        	show:false,
				        	onZero:false,
				        },
				        data: ['2017.08','2017.09','2017.10']
			    	}
			    ],
			    yAxis: [
			    	{
				        type: 'value',
				        position:'left',
				        splitLine:{
				        	show:true,
				        	lineStyle:{
				        		color:['rgba(255,255,255,0.5)'],
				        	}
				        },
				        axisLine:{
				        	show:false,
				        },
				        axisLabel:{
				        	show:false,
				        },
				        max:100,
				        axisTick:{
				        	show:true,
				        	length:15,
				        	lineStyle:{
				        		color:'rgba(255,255,255,0.5)'
				        	}
				        }
				    },{
				        type: 'value',
				        position:'right',
				        splitLine:{
				        	show:false,
				        },
				        axisLine:{
				        	show:false,
				        },
				        axisLabel:{
				        	show:false,
				        },
				        max:100,
				        axisTick:{
				        	show:true,
				        	length:15,
				        	lineStyle:{
				        		color:'rgba(255,255,255,0.5)'
				        	}
				        }
				    }
			    ],
			    series: [
			        {
			            name:data.name[0],
			            type:'line',
			            symbol:'circle',
			            symbolSize:'6',
			            lineStyle:{
			            	normal:{
			            		color:'#3FA9F5',
			            		width:2,
			            		shadowColor: '#3FA9F5',
    							shadowBlur: 5,
    							shadowOffsetX:2,
    							shadowOffsetY:2
			            	}
			            },
			            itemStyle:{
			            	normal:{
			            		color:'#3FA9F5'
			            	}
			            },
			            data:data.yData1,
			        },
			        {
			            name:data.name[1],
			            type:'line',
			            symbol:'circle',
			            symbolSize:'6',
			            yAxisIndex:1,
			            lineStyle:{
			            	normal:{
			            		color:'#0dffa4',
			            		width:2,
			            		shadowColor: '#0dffa4',
    							shadowBlur: 5,
    							shadowOffsetX:2,
    							shadowOffsetY:2
			            	}
			            },
			            itemStyle:{
			            	normal:{
			            		color:'#0dffa4'
			            	}
			            },
			            data:data.yData2
			        },
			        {
			            name:'',
			            type:'line',
			            symbol:'circle',
			            symbolSize:'6',
			            lineStyle:{
			            	normal:{
			            		opacity:0
			            	}
			            },
			            itemStyle:{
			            	normal:{
			            		color:'#fff'
			            	}
			            },
			            data:data.yData3,
			            markLine:{
			            	symbol:'none',
			            	silent:'true',
			            	lineStyle:{
			            		normal:{
			            			color:'rgba(255,255,255,0.5)',
			            			type:'solid',
			            			width:2,
			            		}
			            	},
			            	data:[
			            		//左侧标线
								{
									0:{x:8,y:160},
									1:{x:23,y:160}
								},
								//右侧标线
								{
									0:{x:300,y:160},
									1:{x:315,y:160}
								},
			            	]
			            }
			        }
			    ]
			};
			myChart.setOption(option);
		}
	},
	created(){

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
	.line{
		width: 3.8rem;
		height: 2.1rem;
	}
</style>