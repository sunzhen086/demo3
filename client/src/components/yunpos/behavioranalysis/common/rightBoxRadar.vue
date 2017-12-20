<template>
	<div class="radar" ref="radarChart"></div>
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
			axios.get('/behavioranalysis/getBrandBuyRatio',{params:params}).then(function(res){
				self.initRadar(res.data);
			});
			
//			var dataList = [
//				{
//					'text':'喜欢买中华',
//					'indicator':[
//			        	{ name: '中华', max: 600},
//			        	{ name: '利群', max: 600},
//			        	{ name: '玉溪', max: 600},
//			        	{ name: '南京', max: 600},
//			        	{ name: '黄鹤楼', max: 600},
//			        	{ name: '长白山', max: 600},
//			        ],
//			        'data':[
//			        	{
//			                value : [562, 139, 102, 95, 91, 31],//[55.10, 13.63, 10, 9.31, 8.92, 3.04],
//			                name : '品牌喜好'
//			            }
//			        ]
//				},
//				{
//					'text':'喜欢买玉溪',
//					'indicator':[
//			        	{ name: '玉溪', max: 100},
//			        	{ name: '苏烟', max: 100},
//			        	{ name: '云烟', max: 100},
//			        	{ name: '中南海', max: 100},
//			        	{ name: '泰山', max: 100},
//			        	{ name: '长白山', max: 100},
//			        ],
//			        'data':[
//			        	{
//			                value : [50, 34, 26, 10, 10, 10],//[35.71, 24.29, 18.57, 7.14, 7.14, 7.14],
//			                name : '品牌喜好'
//			            }
//			        ]
//				},
//				{
//					'text':'喜欢买南京',
//					'indicator':[
//			        	{ name: '南京', max: 200},
//			        	{ name: '红塔山', max: 200},
//			        	{ name: '泰山', max: 200},
//			        	{ name: '黄鹤楼', max: 200},
//			        	{ name: '利群', max: 200},
//			        	{ name: '长白山', max: 200},
//			        ],
//			        'data':[
//			        	{
//			                value : [168, 161, 132, 128, 79, 68],//[22.83, 21.88, 17.93, 17.39, 10.73, 9.24],
//			                name : '品牌喜好'
//			            }
//			        ]
//				},
//				{
//					'text':'喜欢买红塔山',
//					'indicator':[
//			        	{ name: '红塔山', max: 150},
//			        	{ name: '黄山', max: 150},
//			        	{ name: '红河', max: 150},
//			        	{ name: '长白山', max: 150},
//			        	{ name: '南京', max: 150},
//			        	{ name: '黄金叶', max: 150},
//			        ],
//			        'data':[
//			        	{
//			                value : [108, 59, 37, 11, 6, 4],//[48.00, 26.22, 16.44, 4.89, 2.67, 1.78],
//			                name : '品牌喜好'
//			            }
//			        ]
//				}
//			];
//			var data = dataList[2];
//			this.initRadar(data);
		},
		initRadar:function(data){
			var self = this;
			var myChart = this.myChart = echarts.getInstanceByDom(self.$refs.radarChart) || echarts.init(self.$refs.radarChart);
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
			    	trigger:'item',
			    	formatter:function(param){
			    		var str = '';
			    		for(var i=0;i<data.indicator.length;i++){
			    			str += data.indicator[i].name + ': ' + param.value[i] + "盒<br />";
			    		}
			    		return str;
			    	}
			    },
			    radar: {
			        startAngle:'180',
			        radius:'72%',
			        center:['50%','57%'],
			        name: {
			            textStyle: {
			                color: '#fff',
			                fontSize:12,
			           }
			        },
			        splitArea:{
			        	areaStyle:{
			        		color:['transparent'],
			        	}
			        },
			        splitLine:{
			        	lineStyle:{
			        		width:2,
			        		color:['rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,1)'],
			        	},
			        },
			        axisLine:{
			        	lineStyle:{
			        		width:2,
			        		color:['rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)'],
			        	},
			        },
			        indicator: data.indicator
			    },
			    series: [{
			        name: '',
			        type: 'radar',
			        symbol:'circle',
			        symbolSize:6,
			        lineStyle:{
			        	normal:{
			        		color:'#3fa9f5'
			        	}
			        },
			        itemStyle:{
			        	normal:{
			        		color:'#3fa9f5',
			        		borderColor:'#3fa9f5',
			        	}
			        },
			        areaStyle:{
			        	normal:{
			        		color:new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [{
	                            offset: 0,
	                            color: 'rgba(13,255,164,0.5)'
	                        }, {
	                            offset: 1,
	                            color: 'rgba(63,169,245,1)'
	                        }])
			        	}
			        },
			        data : data.data
			    }]
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
			if(newVal.custsortid) {
				this.getData(newVal.custsortid);
			}else {
				console.log(newVal);
			}

		}
	}
}
</script>

<style lang="scss" scoped>
	.radar{
		width: 2.8rem;
		height: 2.1rem;
	}
</style>