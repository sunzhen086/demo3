<template>
	<div class="box">
		<div class="chart" ref="barChart"></div>
		<div class="textContent" v-for="(item,index) in chartData.ydata"
			v-bind:class="{'textContent0':index==0,'textContent1':index==1,'textContent2':index==2,'textContent3':index==3,'textContent4':index==4}">
			<span class="icon" v-if="index<3"
				v-bind:class="{'icon1':index==0,'icon2':index==1,'icon3':index==2}"></span>
			{{(index + 1)}}.{{item}}
		</div>
	</div>
</template>

<script>
	import echarts from 'echarts';
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
			initBar: function() {
			    var myChart = this.myChart = echarts.getInstanceByDom(this.$refs.barChart) || echarts.init(this.$refs.barChart);
	    		var option = {
				    tooltip: {
				        trigger: 'axis',
				        axisPointer:{
				        	type:'line'
				        },
				        formatter:function(param){
				        	var str = '';
				        	if(param[0].data != '-'){
				        		str +=  param[0].name + ": " + param[0].data + "";
				        	}
				        	return str;
				        }
				    },
				    grid: {
				    	top:'8%',
				        left: '14%',
				        bottom:'2%'
				    },
				    xAxis: {
				    	show:false,
				        type: 'value',
				        boundaryGap: [0, 0]
				    },
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
				        inverse:true,
				        data: this.chartData.ydata
				    },
				    series: [
				        {
				            name: '',
				            type: 'bar',
				            itemStyle:{
	                        	normal:{
	                        		color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
			                            offset: 0,
			                            color: '#3fa9f5'
			                        }, {
			                            offset: 1,
			                            color: '#0dffa4'
			                        }])
	                        	}
	                        },
	                        barWidth:'35%',
	                        barCategoryGap:'100%',
	                        barGap:'-100%',
				            data: this.chartData.value1
				        },
				        {
				            name: '',
				            type: 'bar',
				            itemStyle:{
	                        	normal:{
	                        		color:'rgba(255,255,255,0.2)'
	                        	}
	                        },
	                        barWidth:'35%',
	                        barCategoryGap:'100%',
	                        barGap:'-100%',
				            data: this.chartData.value2
				        }
				    ]
				};
	    		myChart.setOption(option);
			}
		},
		mounted() {
			this.initBar();
		},
		beforeDestroy() {
			if(this.myChart){
				this.myChart.dispose();
			}
		},
		watch:{
			chartData:function(newVal,oldVal){
				if(this.myChart){
					this.myChart.clear();
				}
				this.initBar();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		position: relative;
		.chart{
			width: 2.65rem;
			height: 2.77rem;
			margin-top: 0.1rem;
		}
		.textContent{
			position: absolute;
			left: 0.38rem;
			color:#fff;
			font-size: 0.14rem;
			.icon{
				width: 0.16rem;
				height: 0.16rem;
				float: left;
				margin-left: -0.22rem;
				margin-right: 0.02rem;	
			}
			.icon1{
				background: url(../../../../assets/images/yunpos/behavioranalysis/first.png) no-repeat;
				background-size: 0.16rem 0.16rem;
			}
			.icon2{
				background: url(../../../../assets/images/yunpos/behavioranalysis/second.png) no-repeat;
				background-size: 0.16rem 0.16rem;
			}
			.icon3{
				background: url(../../../../assets/images/yunpos/behavioranalysis/third.png) no-repeat;
				background-size: 0.16rem 0.16rem;
			}
		}
		.textContent0{
			top: 0.29rem;
		}
		.textContent1{
			top: 0.81rem;
		}
		.textContent2{
			top: 1.30rem;
		}
		.textContent3{
			top: 1.8rem;
		}
		.textContent4{
			top: 2.3rem;
		}
	}
		
</style>