<template>
	<div class="chart" ref="chart">

	</div>
</template>

<script>
	import echarts from 'echarts';
	import bus from './tools/bus.js';
	import blueImage from '@/assets/images/yunpos/realtime/blue.png';
	import axios from '@/utils/axios';
	export default {
		props: {

		},
		data() {
			return {
				status:'ok',
			}
		},
		methods: {
			getData:function(params,timeout,callBack,errCallBack){
				if(timeout != ''){
					axios.get('/realtime/getFluctuations',{params:params,timeout:timeout}).then(function(res){
						callBack(res.data);
					}).catch(function(err){
						errCallBack(err);
					})
				}else {
					axios.get('/realtime/getFluctuations',{params:params}).then(function(res){
						callBack(res.data);
					}).catch(function(err){
						errCallBack(err);
					})
				}

			},
			getTime:function(){
				var onedaytime = 24*60*60*1000;//一天时间间隔秒数
				var nowDate = new Date() - onedaytime*0;//因为使用的是前几天的数据，这里需要改一下系数
				var tenMinuteBeforeDate = new Date(nowDate);//获取当前时间点
				var base = +new Date(tenMinuteBeforeDate);
			    var now = new Date(base);//第一个数据点，x时间轴位置
			   	var time = now.getFullYear() +""
    		 		+ ((now.getMonth()+1)<10 ?("0" + (now.getMonth()+1)):(now.getMonth()+1))
    		 		+ (now.getDate() <10 ?("0" + now.getDate()):now.getDate())
    		 		+ (now.getHours() <10 ?("0" + now.getHours()):now.getHours())
    		 		+ (now.getMinutes() <10 ?("0" + now.getMinutes()):now.getMinutes())
    		 		+ (now.getSeconds() <10 ?("0" + now.getSeconds()):now.getSeconds());
			    return time;
			},
			initLine:function(){
				var self = this;
				var time = this.getTime();
				var count = 120;
				var params = {time:time,count:count};
				this.getData(params,'',function(data){
					self.drawLine(data);
					self.lineData = data;
					//初始数据获取后，递归获取数据
					self.animateData();
				},function(err){
					console.log(err);
				})
			},
			animateData:function(){
				var self = this;
				var start = new Date();
				this.animateDataTimeout = setTimeout(function(){
					//console.log("settimeout---"+(new Date() - start));
					var chart = self.chart;
					var option = chart.getOption();
					var time = self.getTime();
					var count = 1;
					var params = {time:time,count:count};
					//console.log("time="+time);
					self.getData(params,'400',function(tradeData){
						//console.log("getdatatime---"+(new Date() - start));
						//console.log(tradeData);
						if(!self.dataBuffer){
							self.dataBuffer = [];
						}
						self.dataBuffer.push(tradeData);
						self.animateData();
					},function(err){
						console.log(err);
						var rettime = time.substring(0,4) + '-' + time.substring(4,6) + "-" + time.substring(6,8) + " " + time.substring(8,10) + ":" + time.substring(10,12) + ":" + time.substring(12,14);
						var virtualdata = [rettime,0];
						console.log(virtualdata);
						if(!self.dataBuffer){
							self.dataBuffer = [];
						}
						self.dataBuffer.push(virtualdata);
						self.animateData();
					});
					//self.animateData();
				},800);
			},
			animateChart:function(){
				var self = this;
				if(self.dataBuffer && self.dataBuffer.length > 0){
					self.lineData.shift();
				    self.lineData.push(self.dataBuffer[0]);
				    self.dataBuffer.shift();
				    self.chart.setOption({
				        series: [{
				            data: self.lineData
				        }]
				    });
				}
			},
			animateLine:function(){
				var self = this;
				var chart = this.chart;
				var option = chart.getOption();
				var time = self.getTime();
				var count = 1;
				var params = {time:time,count:count};
				this.getData(params,'800',function(tradeData){
					self.lineData.shift();
				    self.lineData.push(tradeData);
				    self.chart.setOption({
				        series: [{
				            data: self.lineData
				        }]
				    });
				},function(err){
					console.log(err);
					var rettime = time.substring(0,4) + '-' + time.substring(4,6) + "-" + time.substring(6,8) + " " + time.substring(8,10) + ":" + time.substring(10,12) + ":" + time.substring(12,14);
					var virtualdata = [rettime,0];
					console.log(virtualdata);
					self.lineData.shift();
				    self.lineData.push(virtualdata);
				    self.chart.setOption({
				        series: [{
				            data: self.lineData
				        }]
				    });
				});
			},
			recurveAnimateLine:function(){
				var self = this;
				setTimeout(function(){
					var chart = self.chart;
					var option = chart.getOption();
					var time = self.getTime();
					var count = 1;
					var params = {time:time,count:count};
					self.getData(params,'800',function(tradeData){
						console.log(tradeData);
						self.lineData.shift();
					    self.lineData.push(tradeData);
					    if(self.chart) {
							self.chart.setOption({
						        series: [{
						            data: self.lineData
						        }]
						    });
						}
					},function(err){
						console.log(err);
						var rettime = time.substring(0,4) + '-' + time.substring(4,6) + "-" + time.substring(6,8) + " " + time.substring(8,10) + ":" + time.substring(10,12) + ":" + time.substring(12,14);
						var virtualdata = [rettime,0];
						console.log(virtualdata);
						self.lineData.shift();
					    self.lineData.push(virtualdata);
					    if(self.chart) {
						    self.chart.setOption({
						        series: [{
						            data: self.lineData
						        }]
						    });
					    }
					});
					self.recurveAnimateLine();
				},1000);
			},
			drawLine:function(data){
				var option = {
				    title: {
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
						formatter: function(params) {
							var str = params[0].value[0]+"<br/>";
				            str += "订单数："+params[0].value[1]+"（笔）";
							return str;
						}
				    },
				    grid: {//画出的图的大小
						left: '6%',
						right: '5%',
						top: '20%',
						bottom: '16%'
					},
				    xAxis: {
				        type: 'time',
				        splitNumber:10,
				        //interval:oneDay*12,
				        axisLine: {
							lineStyle: {
								color: '#fff', //x轴颜色
								opacity: 1,
							}
						},
				        splitLine: {
				            show: false
				        },
						axisTick: {
							show: false //显示分割点
						},
						axisLabel:{
				        	formatter:function(param){
			        			var nowTime = new Date( param );
								var label = [
						    		nowTime.getHours(), 
						    		nowTime.getMinutes() <10 ?("0" + nowTime.getMinutes()):nowTime.getMinutes(),
						    		nowTime.getSeconds() <10 ?("0" + nowTime.getSeconds()):nowTime.getSeconds(),
						    	].join(':');
								return label;
			        		}
				        },
				    },
				    yAxis: {
				        type: 'value',
				        show:false,
						min:0,
						//max:15,
				    },
				    series: [{
				        time: '',
				        type: 'line',
				        showSymbol: false,
				        hoverAnimation: false,
				        itemStyle:{
							normal:{
								opacity:0
							}
						},
				        lineStyle:{
							normal:{
								color:'rgba(63,169,245,1)',
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
		                            color: 'rgba(63,169,245,0.4)'
		                        }])
							}
						},
				        data: data
				    }]
				};
				let chart = this.chart = echarts.getInstanceByDom(this.$refs.chart) || echarts.init(this.$refs.chart);//初始化
				chart.setOption(option);
			}
		},
		mounted() {
			var self = this;
			this.initLine();
			if(self.chart) {
				self.animateData();
			}
			
			this.animateChartInerval = setInterval(function(){
				if(self.chart) {
					self.animateChart();
				}
			},1000);
			
			//this.recurveAnimateLine();

//			this.animateInerval = setInterval(function(){
//				if(self.chart) {
//					self.animateLine();
//				}
//			},1000);
		},
		watch:{
			
		},
		beforeDestroy(){
			if(this.chart){
				this.chart.dispose();
			}
			
			if(this.animateInerval){
				clearInterval(this.animateInerval);
			}
			
			if(this.animateDataTimeout){
				clearTimeout(this.animateDataTimeout);
			}
		},
		created(){
			
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