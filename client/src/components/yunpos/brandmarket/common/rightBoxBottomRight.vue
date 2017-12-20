<template>
	<div class="barChart" ref="barChart"></div>
</template>

<script>
import echarts from 'echarts';
import axios from '@/utils/axios';
export default {
	props:{
		index:Number
	},
	data() {
		return {
			boxData:{
				
			}
		}
	},
	components: {
		
	},
	methods: {
		getData:function(id){
			var self = this;
			var params = {id:id};
			axios.get('/brandmarket/getStockSaleContrast',{params:params}).then(function(res){
				var data = {
					text:'存销比对比',
					yData:res.data.barData5,
					barData1:res.data.barData1,
					barData2:res.data.barData2,
					barData3:res.data.barData3,	
					barData4:res.data.barData4
				}
				self.initBar(data);
			})
			

		},
		initBar:function(data){
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
			    tooltip : {
			        trigger: 'axis',
			        formatter:function(param){
			        	return param[0].name + "<br/>" + param[0].seriesName + ": " + (-param[0].value) + ""
								+ "<br/>" + param[2].seriesName + ": " + param[2].value + "";
					}
			    },
			    legend: {
			        data:[
				        {
							name:'库存',
							icon:'rect',
							textStyle: {
								color: '#3fa9f5'
							}
						}, 
						{
							name:'销售',
							icon:'rect',
							textStyle: {
								color: '#0dffa4'
							}
						},
			        ],
			        textStyle:{
			        	color:'#0dffa4'
			        },
			        left:'30%',
			        top:'2%',
			        itemWidth:14
			    },
			    grid: {
			        left: '1%',
			        right: '4%',
			        bottom: '7%',
			        top:'30%',
			    },
			    xAxis : [
			        {
			            type : 'value',
			            show: false,
			        }
			    ],
			    yAxis : [
			        {
			            type : 'category',
			            show: false,
			            inverse:true,
			            data : data.yData
			        }
			    ],
			    series : [
			        {
			            name:'库存',
			            type:'bar',
			            stack: '总量',
			            barWidth:'40%',
			            barGap:'30%',
			            label: {
			                normal: {
			                    show: false,
			                }
			            },
			            itemStyle:{
			            	normal:{
			            		color:'#3fa9f5',
			            		barBorderRadius:[10, 0, 0, 10] 
			            	}
			            },
			            zlevel:10,
			            z:10,
			            data:data.barData1
			        },
			        {
			            name:'',
			            type:'bar',
			            stack: '',
			            barWidth:'40%',
			            barGap:'-100%',
			            label: {
			                normal: {
			                    show: true,
			                    position:['0%','-102%'],
			                    formatter:function(param){
			                    	var dataIndex = param.dataIndex;
			                    	return data.yData[dataIndex];
			                    }
			                }
			            },
			            itemStyle:{
			            	normal:{
			            		color:'rgba(255,255,255,0.5)',
			            		barBorderRadius:[10, 0, 0, 10] 
			            	}
			            },
			            data:data.barData2
			        },
			        {
			            name:'销售',
			            type:'bar',
			            stack: '总量',
			            barWidth:'40%',
			            barGap:'30%',
			            label: {
			                normal: {
			                    show: false,
			                }
			            },
			            itemStyle:{
			            	normal:{
			            		color:'#0dffa4',
			            		barBorderRadius:[0, 10, 10, 0] 
			            	}
			            },
			            zlevel:10,
			            z:10,
			            data:data.barData3
			        },
			        {
			            name:'',
			            type:'bar',
			            stack: '',
			            barWidth:'40%',
			            barGap:'-100%',
			            label: {
			                normal: {
			                    show: false,
			                }
			            },
			            itemStyle:{
			            	normal:{
			            		color:'rgba(255,255,255,0.5)',
			            		barBorderRadius:[0, 10, 10, 0] 
			            	}
			            },
			            data:data.barData4
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
	.barChart{
		width: 3.85rem;
		height: 1.2rem;
		margin-top: 0.15rem;
	}
</style>