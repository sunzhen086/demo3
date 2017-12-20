<template>
	<div class="chartBox">
		<div class="chart" ref="pieChart"></div>
		<div class="label label1" v-if="boxData.max != 0">
			<div class="value">
				<figureFormat format="small-decimal" :numValue=boxData.max></figureFormat>
			</div>
			<div class="percent">%</div>
		</div>
		<div class="label label2" v-if="boxData.avg != 0">
			<div class="name">平均值：</div>
			<div class="value">
				<figureFormat format="small-decimal" :numValue=boxData.avg></figureFormat> 
			</div>
			<div class="percent">%</div>
		</div>
	</div>
	
</template>

<script>
import echarts from 'echarts';
import figureFormat from '../../../tools/figureformat/figure-format.vue';
export default {
	props:{
		chartData:Object
	},
	data() {
		return {
			boxData:{
				text:'活动参与率',
				pieData1:[35, 15 , 50],
				pieData2:[9, 41 , 50],
				max:0.00,
				avg:0.00
			}
		}
	},
	components: {
		figureFormat,
	},
	methods: {
		getData:function(panelData){
			var data = {
				text:'活动参与率',
				pieData1:[35, 15 , 50],
				pieData2:[9, 41 , 50],
				max:panelData.maxactivityjoinratio,
				avg:panelData.avgactivityjoinratio
			}
			this.boxData = data;
			this.initPie(data);
		},
		initPie:function(data){
			var self = this;
			var percent = document.getElementsByClassName('top')[0].clientWidth/1600;
			var myChart = this.myChart = echarts.getInstanceByDom(self.$refs.pieChart) || echarts.init(self.$refs.pieChart);
			var option = {
				title:{
					text:data.text,
					left:'4%',
			        top:'0',
			        textStyle:{
			        	color:'#fff',
			        	fontSize:18,
			        }
				},
				series: [ 
			        {
			            name: ' ',
			            type: 'pie',
			            radius: ['57%', '67%'],
			            center:['50%','70%'],
			            avoidLabelOverlap: false,
			            startAngle: 180,
			            color: ["#0DFFA4","rgba(255,255,255,0.2)", "transparent"],
			            hoverAnimation: false,
			            legendHoverLink: false,
			            zlevel:10,
			            z:10,
			            label: {
			                normal: {
			                    show: false,
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data: [{
			                value: data.pieData1[0],
			                name: '',
			                itemStyle:{
			                	emphasis:{
			                		borderWidth:5,
			                		borderColor:"#0DFFA4",
			                		color:'#0DFFA4'
			                	}
			                }
			            }, {
			                value: data.pieData1[1],
			                name: ''
			            }, {
			                value: data.pieData1[2],
			                name: ''
			            }]
			        }, 
			        {
			            name: '',
			            type: 'pie',
			            radius: ['75%', '85%'],
			            center:['50%','70%'],
			            avoidLabelOverlap: false,
			            startAngle: 0,
			            color: ["rgba(255,255,255,0.2)","#3FA9F5", "transparent"],
			            hoverAnimation: false,
			            legendHoverLink: false,
			            clockwise: false,
			            zlevel:10,
			            z:10,
			            itemStyle:{
			                normal:{
			                    borderColor:"transparent",
			                }
			            },
			            label: {
			                normal: {
			                    show: false,
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data: [ {
			                value: data.pieData2[0],
			                name: '',
			            },{
			                value: data.pieData2[1],
			                name: '',
			                itemStyle:{
			                	emphasis:{
			                		borderWidth:5,
			                		borderColor:"#3FA9F5",
			                		color:'#3FA9F5'
			                	}
			                }
			            }, {
			                value: data.pieData2[2],
			                name: '',
			            }],
			            markLine:{
			            	symbol:'none',
			            	silent:'true',
			            	lineStyle:{
			            		normal:{
			            			color:'rgba(255,255,255,1)',
			            			type:'solid',
			            			width:2,
			            		}
			            	},
			            	data:[
			            		//左半圆加粗标线
			            		{
									0:{x:31*percent,y:154*percent},
									1:{x:52*percent,y:154*percent}
								},
								{
									0:{x:36*percent,y:123*percent},
									1:{x:55*percent,y:128*percent}
								},
								{
									0:{x:54*percent,y:87*percent},
									1:{x:71*percent,y:99*percent}
								},
								{
									0:{x:85*percent,y:58*percent},
									1:{x:97*percent,y:76*percent}
								},
								{
									0:{x:120*percent,y:45*percent},
									1:{x:125*percent,y:65*percent}
								},
								{
									0:{x:150*percent,y:40*percent},
									1:{x:150*percent,y:61*percent}
								},
								//右半圆加粗标线
			            		{
									0:{x:259*percent,y:154*percent},
									1:{x:238*percent,y:154*percent}
								},
								{
									0:{x:252*percent,y:123*percent},
									1:{x:235*percent,y:129*percent}
								},
								{
									0:{x:237*percent,y:87*percent},
									1:{x:221*percent,y:100*percent}
								},
								{
									0:{x:211*percent,y:60*percent},
									1:{x:199*percent,y:78*percent}
								},
								{
									0:{x:180*percent,y:45*percent},
									1:{x:175*percent,y:65*percent}
								},
			            	]
			            }
			        },
			        {
			            name: '',
			            type: 'pie',
			            radius: ['94%', '96%'],
			            center:['50%','70%'],
			            avoidLabelOverlap: false,
			            startAngle: 0,
			            color: ["rgba(255,255,255,1)","transparent"],
			            hoverAnimation: false,
			            legendHoverLink: false,
			            clockwise: false,
			            itemStyle:{
			                normal:{
			                    borderColor:"transparent",
			                }
			            },
			            label: {
			                normal: {
			                    show: false,
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false,
			                }
			            },
			            data: [ {
			                value: 50,
			                name: '',
			            },{
			                value: 50,
			                name: '',
			            }],
			            markLine:{
			            	symbol:'none',
			            	silent:'true',
			            	lineStyle:{
			            		normal:{
			            			color:'rgba(255,255,255,0.2)',
			            			type:'solid',
			            			width:1,
			            		}
			            	},
			            	data:[
			            		//左半圆标线
			            		{
									0:{x:31*percent,y:154*percent},
									1:{x:150*percent,y:155*percent}
								},
								{
									0:{x:36*percent,y:123*percent},
									1:{x:150*percent,y:155*percent}
								},
								{
									0:{x:54*percent,y:87*percent},
									1:{x:150*percent,y:155*percent}
								},
								{
									0:{x:85*percent,y:58*percent},
									1:{x:150*percent,y:155*percent}
								},
								{
									0:{x:120*percent,y:45*percent},
									1:{x:150*percent,y:155*percent}
								},
								{
									0:{x:150*percent,y:40*percent},
									1:{x:150*percent,y:155*percent}
								},
								//右半圆标线
			            		{
									0:{x:259*percent,y:154*percent},
									1:{x:150*percent,y:155*percent}
								},
								{
									0:{x:252*percent,y:123*percent},
									1:{x:150*percent,y:155*percent}
								},
								{
									0:{x:237*percent,y:87*percent},
									1:{x:150*percent,y:155*percent}
								},
								{
									0:{x:211*percent,y:60*percent},
									1:{x:150*percent,y:155*percent}
								},
								{
									0:{x:180*percent,y:45*percent},
									1:{x:150*percent,y:155*percent}
								},
			            	]
			            }
			        }
			    ]
			}
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
			this.getData(newVal);
		}
	}
}
</script>

<style lang="scss" scoped>
	.chartBox{
		position: relative;
		.chart {
			width: 2.9rem;
			height: 2.2rem;
		}
		.label{
			position: absolute;
		}
		.label1{
			top: 1rem;
			left: 1.1rem;
			color: #0DFFA4;
			font-family: 'digifaw';
			text-align: center;
			font-weight: bolder;
			.value{
				float: left;
				font-size: 0.36rem;
			}
			.percent{
				float: left;
				font-size: 0.24rem;
				margin-left: 0.01rem;
				margin-top: 0.09rem;
			}
		}
		.label2{
			top:1.4rem;
			left:1rem;
			color: rgba(255,255,255,0.5);
			font-family: 'digifaw';
			.name{
				float: left;
				font-size: 0.1rem;
				margin-top: 0.01rem;
			}
			.value{
				float: left;
				font-size: 0.24rem;
				margin-top: -0.05rem;
				margin-left: -0.04rem;
			}
			.percent{
				float: left;
				font-size: 0.16rem;
				margin-left: 0.02rem;
				margin-top: 0.01rem;
			}
		}
	}
</style>