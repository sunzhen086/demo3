<template>
	<div class="box">
		<div class="chart" ref="barChart"></div>
		<div class="textContent textContent1">{{bardata.ydata1}}</div>
		<div class="textContent textContent2">{{bardata.ydata2}}</div>
		<div class="textContent textContent3">{{bardata.ydata3}}</div>
	</div>
</template>

<script>
	import echarts from 'echarts';
	import blueImage from '@/assets/images/yunpos/realtime/blue.png';
	import greenImage from '@/assets/images/yunpos/realtime/green.png';
	export default {
		props:{
			isShow:Boolean,
			bardata:Object
		},
		data() {
			return {

			}
		},
		components: {
	
		},
		methods: {
			initBar: function(data) {
			    var myChart = this.myChart = echarts.getInstanceByDom(this.$refs.barChart) || echarts.init(this.$refs.barChart);
	    		var option = {
				    title: {
				        text: '历史销售',
				        textStyle:{
				        	color:'#fff'
				        },
				        left:'4%'
				    },
				    tooltip: {
				        trigger: 'axis',
				        axisPointer:{
				        	type:'shadow'
				        },
				        formatter:function(param){
				        	var str = '';
				        	if(param[0].data != '-'){
				        		str += "历史销售<br/>"
				        		str +=  param[0].seriesName + ": " + param[0].data + "元";
				        		str += "<br/>";
				        		str +=  param[1].seriesName + ": " + param[1].data + "笔";
				        	}
				        	return str;
				        }
				    },
				    legend: {
				        data: [{
							name:'交易金额',
							icon:'image://' + blueImage,
							textStyle: {
								color: '#3fa9f5'
							},
						}, {
							name:'交易笔数',
							icon:"rect",
							icon:'image://' + greenImage,
							textStyle: {
								color: '#0dffa4'
							}
						}],
						itemWidth:14,
						top:'2%',
						right:'4%'
				    },
				    grid: {
				    	top:'12%',
				        left: '-10%',
				        right: '0',
				        bottom: '0',
				        containLabel: true
				    },
				    xAxis: [{
				    	show:false,
				        type: 'value',
				        boundaryGap: [0, 0.01]
				    },{
				    	show:false,
				        type: 'value',
				        boundaryGap: [0, 0.01]
				    }],
				    yAxis: {
				    	show:false,
				        type: 'category',
				        position:'left',
				        axisLine:{
				        	show:false
				        },
				        axisTick:{
				        	show:false
				        },
				        axisLabel:{
				        	color:'#fff'
				        },
				        data: data.ydata
				    },
				    series: [
				        {
				            name: '交易金额',
				            type: 'bar',
				            itemStyle:{
	                        	normal:{
	                        		color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
			                            offset: 0,
			                            color: 'rgba(63,169,245,1)'
			                        }, {
			                            offset: 1,
			                            color: 'rgba(63,169,245,0.2)'
			                        }])
	                        	}
	                        },
	                        barWidth:'40%',
	                        barGap:'20%',
				            data: data.value1
				        },
				        {
				            name: '交易笔数',
				            type: 'bar',
				            xAxisIndex:1,
				            itemStyle:{
	                        	normal:{
	                        		color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
			                            offset: 0,
			                            color: 'rgba(13,255,164,1)'
			                        }, {
			                            offset: 1,
			                            color: 'rgba(13,255,164,0.2)'
			                        }])
	                        	}
	                        },
	                        barWidth:'40%',
	                        barGap:'20%',
				            data: data.value2
				        }
				    ]
				};
	    		myChart.setOption(option);
			}
		},
		mounted() {
			//this.initBar();
		},
		beforeDestroy() {
			if(this.myChart){
				this.myChart.dispose();
			}
		},
		watch:{
			isShow:function(newVal,oldVal){
				
				if(newVal){
					this.initBar(this.bardata);
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
	.box{
		/*position: absolute;
		z-index: 4;
		left:9.20rem;
		top:4.95rem;
		border-left: 0.01rem dashed;
		border-right: 0.02rem dashed;
		border-image: -webkit-linear-gradient( bottom,rgba(63,169,245,1), rgba(63,169,245,0)) 30 30;
		border-image: -o-linear-gradient( bottom,rgba(63,169,245,1), rgba(63,169,245,0)) 30 30;
		border-image: -moz-linear-gradient( bottom,rgba(63,169,245,1), rgba(63,169,245,0)) 30 30;
		border-image: linear-gradient( to bottom,rgba(63,169,245,1), rgba(63,169,245,0)) 30 30;*/
		.chart{
			width: 3.13rem;
			height: 2.2rem;
			margin-top: 0.1rem;
		}
		.textContent{
			position: absolute;
			left: 0.18rem;
			color:#7E8C8D;
			font-size: 0.12rem;
		}
		.textContent1{
			top: 2.52rem;
		}
		.textContent2{
			top: 3.12rem;
		}
		.textContent3{
			top: 3.72rem;
		}
	}
		
</style>