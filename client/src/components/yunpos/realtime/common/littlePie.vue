<template>
	<div class="box">
		<div class="chart" ref="barChart"></div>
		<div class="name" :title="chartData.typeName">{{chartData.typeName}}</div>
	</div>
</template>

<script>
	import echarts from 'echarts';
	export default {
		props:{
			chartData:Object,
			isShow:Boolean
		},
		data() {
			return {
				
			}
		},
		methods: {
			initPie: function() {
				var myChart = this.myChart = echarts.getInstanceByDom(this.$refs.barChart) || echarts.init(this.$refs.barChart);
				var that = this;
				var option = {
					title:{
						show:false,
						text:this.chartData.typeName,
						textStyle:{
							color:'#7E8C8D',
							fontSize:12,
							align:'center'
						},
						bottom:'-8%'
					},
				    series: [
				        {
				            type:'pie',
				            center: ['50%', '40%'],
				            radius: ['60%', '70%'],
				            avoidLabelOverlap: false,
				            silent:true,
				            label: {
				                normal: {
				                    show: true,
				                    position: 'center',
				                    formatter:function(data){
				                    	if(data.name == that.chartData.typeName){
				                    		return data.percent + "%";
				                    	}else{
				                    		return '';
				                    	}
				                    },
				                    fontSize:16,
				                    fontFamily:"digifaw",
				                }
				            },
				            labelLine: {
				                normal: {
				                    show: false
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
		watch:{
			isShow: function(newVal,oldVal){
				if(newVal){
					this.initPie();
				}else if(this.myChart){
					this.myChart.clear();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		float: left;
		overflow: hidden;
		.chart{
			overflow: hidden;
			width: 0.65rem;
			height: 0.65rem;
			margin-left: 0.2rem;
		}
		.name{
			color:#7E8C8D;
			font-size:0.1rem;
			line-height: 0.16rem;
			text-align: center;
			width: 0.65rem;
			padding-left: 0.15rem;
			white-space:nowrap;
			overflow:hidden;
			text-overflow: ellipsis;
		}
	}
	
</style>