<template>
	<div class="chart" ref="chart">

	</div>
</template>

<script>
	
	import echarts from 'echarts';
	import bus from './tools/bus.js';
	export default {
		props: {

		},
		data() {
			return {
				status:'ok',
			}
		},
		methods: {
			drawLine: function() {
				var that = this;
				var xLineData = [];
				var yLineData = [];
				var tickData = [];
				var oneDay = 3000;//1秒
				var dataNum = 2400;
				var nowDate = new Date();
				var halfHourBeforeDate = new Date(nowDate-oneDay*(dataNum-10));
				var base = +new Date(halfHourBeforeDate);
				//var tick = dataNum/10;
				//var count = 0;
				for (var i = 0; i < dataNum; i++) {
					var now = new Date(base += oneDay);
					var str = [
			    		now.getHours(), 
			    		now.getMinutes() <10 ?("0" + now.getMinutes()):now.getMinutes(),
			    		now.getSeconds() <10 ?("0" + now.getSeconds()):now.getSeconds(),
			    	].join(':')
				    xLineData.push(
				    	str
				    );
					var key = Math.floor(Math.random() * 10 );
					yLineData.push(Math.floor(Math.random() * key ));
					/*if(count == 0 || i == dataNum-1){
				    	tickData.push([str,0]);
				    }
				    count++;
				    if(count == tick){
				    	count = 0;
				    }*/
				}
				
				var option = {
					title:{
						text:"实时交易波动",
						textStyle:{
							color:'#fff',
							fontSize:20
						},
						left:'1%',
						top:'0'
					},
					tooltip: {
						trigger: 'axis',
						/*axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#6a7985'
							}
						},*/
						formatter: function(params) {//展示浮动框的内容
							var str = params[0].name+"<br/>";	
							
				            str += "订单数（笔）："+params[0].value+"</br>";
							
							return str;
						}
						
					},
					grid: {//画出的图的大小
						left: '8%',
						right: '5%',
						top: '20%',
						bottom: '14%'
					},
					xAxis: [{
						type: 'category',
						boundaryGap: true,
						data: xLineData,
						axisLine: {
							lineStyle: {
								color: '#fff', //x轴颜色
								opacity: 1,
							}
						},
						axisLabel: {
							interval:dataNum/10-2,
							textStyle: {
								color: '#fff' //x轴信息颜色
							}
						},
						splitLine: {
							show: false
						},
						axisTick: {
							show: false //显示分割点
						}
					}],
					yAxis: [{
						type: 'value',
						position: 'left',
						show:false,
						min:0,
					}],
					series: [{
						name: '',
						type: 'line',
						smooth: false,
						itemStyle:{
							normal:{
								opacity:0
							}
						},
						lineStyle:{
							normal:{
								color:'rgba(63,169,245,0.2)',
								//width:2
							}
						},
						areaStyle:{
							normal:{
								color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
		                            offset: 0,
		                            color: 'rgba(63,169,245,1)'
		                        }, {
		                            offset: 1,
		                            color: 'rgba(63,169,245,0.2)'
		                        }])
							}
						},
						data: yLineData
					}/*, {
						name: '',
						type: 'scatter',
						symbol: 'circle',
						symbolSize:8,
						color: ['#fff'],
						itemStyle:{
							normal:{
								opacity:1
							}
						},
						lineStyle:{
							normal:{
								opacity:0
							}
						},
						data: tickData
					}*/]
				};
				let chart = this.chart = echarts.getInstanceByDom(this.$refs.chart) || echarts.init(this.$refs.chart);//初始化
				chart.setOption(option);
				var timer = this.timer = setInterval(function () {
					xLineData.splice(0,1);
					var now = new Date(base += oneDay);
				    xLineData.push(
				    	[
				    		now.getHours(), 
				    		now.getMinutes() <10 ?("0" + now.getMinutes()):now.getMinutes(),
				    		now.getSeconds() <10 ?("0" + now.getSeconds()):now.getSeconds(),
				    	].join(':')
				    );
					yLineData.splice(0,1);
					var key = Math.floor(Math.random() * 10 );
					yLineData.push(Math.floor(Math.random() * key ));
				    /*count++;
				    if(count == tick){
				    	tickData.splice(0,1);
				    	tickData.push([str,0]);
				    	count = 0;
				    }*/
					chart.setOption({
				    	xAxis:{
				    		data:xLineData
				    	},
				    	series: [{
							data: yLineData
						}/*,{
							data:tickData
						}*/]
				    });
				}, oneDay);//开发需要改成和oneDay一致的时间
				
			}
		},
		mounted() {//页面初始化进来调用
			this.drawLine();
		},
		watch:{//数据变化监控
			status:function(){
				this.drawLine();
			}
		},
		beforeDestroy(){//销毁
			if(this.chart){
				this.chart.dispose();
			}
			clearInterval(this.timer);
		},
		created(){
			var that =this;
			bus.$on('stopTimmer',function(obj){
				if(obj){
					clearInterval(that.timer);
					//that.chart.dispose();
				}else{
					try{
						that.drawLine();
					}catch(e){
						that.status='error';
					}
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.chart {
		width: 6rem;
		height: 2rem;
		position: absolute;
		z-index: 2;
		bottom: 0.2rem;
		right: 4.8rem;
	}
</style>