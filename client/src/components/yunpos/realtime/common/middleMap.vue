<template>
	<div class="mapBox">
		<div class="mapChart" ref="mapChart"></div>
		<div class="allMovePart">

		</div>
	</div>
</template>

<script>
import echarts from 'echarts';
import dalianJson from '@/assets/map/dalian.json';
import custGeoData from '@/assets/map/custGeoData.json';
import $ from '@/assets/js/jquery-vendor';
import money from '@/assets/images/yunpos/realtime/money.png';
import axios from '@/utils/axios';

export default {
	data() {
		return {
			showBox:false,
			clickName : '',
		}
	},
	methods: {
		getTime:function(){
			var onedaytime = 24*60*60*1000;//一天时间间隔秒数
			var nowDate = new Date() - onedaytime*0;//因为使用的是前几天的数据，这里需要改一下系数
			//获取9秒前的时间点
			var fourSecondsBeforeDate = new Date(nowDate-1000*9);
			var fourSecondsBeforeBase = +new Date(fourSecondsBeforeDate);
		    var fourSecondsTime = new Date(fourSecondsBeforeBase);//第一个数据点，x时间轴位置
		   	var starttime = fourSecondsTime.getFullYear() +""
		 		+ ((fourSecondsTime.getMonth()+1)<10 ?("0" + (fourSecondsTime.getMonth()+1)):(fourSecondsTime.getMonth()+1))
		 		+ (fourSecondsTime.getDate() <10 ?("0" + fourSecondsTime.getDate()):fourSecondsTime.getDate())
		 		+ (fourSecondsTime.getHours() <10 ?("0" + fourSecondsTime.getHours()):fourSecondsTime.getHours())
		 		+ (fourSecondsTime.getMinutes() <10 ?("0" + fourSecondsTime.getMinutes()):fourSecondsTime.getMinutes())
		 		+ (fourSecondsTime.getSeconds() <10 ?("0" + fourSecondsTime.getSeconds()):fourSecondsTime.getSeconds());
		 		
		 	//获取当前时间点
			var nowTimeDate = new Date(nowDate);
			var nowTimeBase = +new Date(nowTimeDate);
		    var nowTime = new Date(nowTimeBase);//第一个数据点，x时间轴位置
		   	var endtime = nowTime.getFullYear() +""
		 		+ ((nowTime.getMonth()+1)<10 ?("0" + (nowTime.getMonth()+1)):(nowTime.getMonth()+1))
		 		+ (nowTime.getDate() <10 ?("0" + nowTime.getDate()):nowTime.getDate())
		 		+ (nowTime.getHours() <10 ?("0" + nowTime.getHours()):nowTime.getHours())
		 		+ (nowTime.getMinutes() <10 ?("0" + nowTime.getMinutes()):nowTime.getMinutes())
		 		+ (nowTime.getSeconds() <10 ?("0" + nowTime.getSeconds()):nowTime.getSeconds());
		 		
		 	var time={
		 		starttime:starttime,
		 		endtime:endtime
		 	}
		    return time;
		},
		getData:function(params, callback){
			axios.get('/realtime/getIntervalRealtimeTradeData',{params:params}).then(function(res){
				callback(res.data);
			})
		},
		initMap:function(){
			function RandomNum(Min, Max) {
		      var Range = Max - Min;
		      var Rand = Math.random();
		      var num = Min + Math.floor(Rand * Range); 
		      return num;
			}
			let self = this;
			echarts.registerMap('dalian', dalianJson);
		    var chart = this.chart = echarts.getInstanceByDom(self.$refs.mapChart) || echarts.init(self.$refs.mapChart);
		    var option = this.option = {
		    	geo: {
		            map: 'dalian',
		            label: {
		                emphasis: {
		                    show: false
		                }
		            },
		            itemStyle: {
		                normal: {
		                    areaColor: 'rgba(25,68,100,0.8)',
		                    borderWidth:'0',
		                },
		                emphasis: {
		                    areaColor: 'rgba(178,221,251,0.8)',
		                }
		            },
		            aspectScale:'0.9',
		            zoom:'1.2',
		            center:[122.1, 39.45],
		            silent:true
		        },
		        series: [{
		            type: 'scatter',
		            coordinateSystem: 'geo',
		            symbolSize: 3,
		            itemStyle: {
		                normal: {
		                    shadowBlur: 20,
		                    shadowOffsetX:0,
		                    shadowOffsetY:0,
		                    shadowColor: 'rgba(66, 237, 248, 0.6)',
		                    borderColor: 'rgba(66, 237, 248, 0.6)',
		                    borderWidth:1,
                    		color: 'rgba(255, 255, 255, 0.6)'
		                }
		            },
		            data: custGeoData,
		            markLine:{
						silent:true,
						symbol:'none',
						animation:false,
						lineStyle:{
							normal:{
								type:'solid',
								width:2,
								color:new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
		                            offset: 0,
		                            color: 'rgba(63,169,245,1)'
		                        }, {
		                            offset: 1,
		                            color: 'rgba(63,169,245,0.2)'
		                        }])
							}
						}
		    		}
		       	},
		        {
			        type: 'scatter',
			        coordinateSystem: 'geo',
			        data: [],
			        symbolSize:20,
			        label: {
			            normal: {
			                formatter: '{b}',
			                position: 'right',
			                show: false
			            }
			        },
			        itemStyle: {
			            normal: {
			                color: '#0dffa4',
			                shadowBlur: 20,
			                shadowColor: '#ffffff'
			            }
			        },
			        zlevel: 1,
			        markPoint:{
			        	/*symbol:'image://' + money,
			        	symbolSize:20,*/
			        	itemStyle:{
			        		normal:{
			        			color:'rgba(255,255,255,0.5)'
			        		}
			        	},
			        	label:{
			        		normal:{
			        			color:'#fff',
			        			formatter:'{c}',
			        			fontSize:14,
			        			/*position:['70%','10%']*/
			        		}
			        	},
//			        	animationDelay: function (idx) {
//          				return idx * 400;
//      				}
						animation:true
			        }
			    }]
		    }
		    chart.setOption(option);
		    
		    self.getPerSecData();
//		    var getDataInterval = setInterval(function(){
//
//			    //获取数据
//			    var time = self.getTime();
//			    
////		 		//暂时获取固定时间的数据
////		 		var tt = [20170924100000,20170924100002,20170924100003,20170924100004,20170924100006,20170924100008,20170924100010,20170924100013];
////		 		var ii = self.count;
////		 		var time={
////		 			starttime:tt[ii],
////		 			endtime:tt[ii]
////		 		};
////		 		
////		 		//只能获取获取8个时间点的数据
////		 		if(self.count < 7) {
////		 			self.count++;
////		 		}else {
////		 			self.count = 0;
////		 		}
//		 		
//		 		var starttime = time.starttime;
//		 		var endtime = time.endtime;
//				var params = {starttime:starttime,endtime:endtime};
//				//console.log(params);
//			   	self.getData(params, function(data){
//			   		if(data != 'null' && data != null) {
//				   		//这时候返回的数据是个数组
//				   		var pointCustArr = [];
//				   		for(var i=0; i<data.length; i++) {
//				   			var tmpdata = data[i];
//				   			var obj = {
//				   				coord : [tmpdata.longitude,tmpdata.latitude],
//					  			value : tmpdata.tradeamount
//				   			}
//				   			pointCustArr.push(obj);
//				   		}
//				   		
//				   		var lastdataarr = [];
//				   		lastdataarr.push(data[data.length-1].longitude);
//				   		lastdataarr.push(data[data.length-1].latitude);
//				   		lastdataarr.push(1);
//				   		
//				   		var tmp = chart.convertToPixel('geo',lastdataarr);
//						self.openBox(data[data.length-1],tmp[0],tmp[1],pointCustArr);
//			   		}
//			   	});
//		    }, 10000);
		},
		getPerSecData:function(){
			var self = this;
			this.getPerSecDataSetTimeout = setTimeout(function(){
				var time = self.getTime();
				//获取某一秒的数据，这里只开始和结束时间都设置为获取时间段的第一秒
				var starttime = time.starttime;
		 		var endtime = time.starttime;
				var params = {starttime:starttime,endtime:endtime};
				self.getData(params, function(data){
			   		if(data != 'null' && data != null) {
				   		//这时候返回的数组只有一个数据
				   		for(var i=0; i<data.length; i++) {
				   			var tmpdata = data[i];
				   			var obj = {
				   				coord : [tmpdata.longitude,tmpdata.latitude],
					  			value : tmpdata.tradeamount
				   			}
				   			
				   			if(!self.pointCustArr){
				   				self.pointCustArr = [];
				   			}
				   			self.pointCustArr.push(obj);

			   				/*if(self.pointCustArr.length < 5){
			   					self.pointCustArr.push(obj);
			   				}else {
			   					self.pointCustArr.shift();
			   					self.pointCustArr.push(obj);
			   				}*/
				   		}
				   		
				   		if(self.pointCustArr && self.pointCustArr.length > 0){
				   			//self.clearPointOnly();
				   			self.markPointOnly(self.pointCustArr);
				   		}
					   	self.count++;
				   		if(self.count % 5 == 0 && self.pointCustArr.length > 0){
				   			self.count = 0;
				   			var lastdataarr = [];
					   		lastdataarr.push(data[data.length-1].longitude);
					   		lastdataarr.push(data[data.length-1].latitude);
					   		lastdataarr.push(1);
					   		var tmp = self.chart.convertToPixel('geo',lastdataarr);
					   		//console.log(tmp);
							self.openBoxOnly(data[data.length-1],tmp[0],tmp[1]);
				   		}
			   		}
			   		self.getPerSecData();
			   	});
			},1000);
		},
		openBox:function(showdata,startX,startY,pointCustArr){
			var self = this;
			//先关闭上次显示的Box
        	var data = {
        		//showdata:showdata
        	}
        	self.showBox = false;
			self.clickName = name;
			data.showBox = self.showBox;
			self.$emit('show-box',data);
			self.clearLine();
			//显示新的Box
			setTimeout(function(){
				self.showBox = true;
				self.clickName = name;
	        	var endXY = self.getLocation();
	        	
	        	self.markLine(startX,startY,endXY[0],endXY[1],endXY[2],endXY[3],pointCustArr);
	        	
	        	//展示店铺信息和消费者信息
	        	var tmp = {
	        		showdata:showdata,
	        		showBox:true
	        	}
	        	self.$emit('show-box',tmp);
			},1000);
		},
		openBoxOnly:function(showdata,startX,startY){
			var self = this;
			//先关闭上次显示的Box
        	var data = {};
        	self.showBox = false;
			self.clickName = name;
			data.showBox = self.showBox;
			self.$emit('show-box',data);
			//self.clearLine();
			self.clearLineOnly();
			//显示新的Box
			setTimeout(function(){
				self.showBox = true;
				self.clickName = name;
	        	var endXY = self.getLocation();
	        	self.markLineOnly(startX,startY,endXY[0],endXY[1],endXY[2],endXY[3]);
	        	//展示店铺信息和消费者信息
	        	var tmp = {
	        		showdata:showdata,
	        		showBox:true
	        	}
	        	self.$emit('show-box',tmp);
			},1000);
		},
		getLocation:function(){
			var endX1 = 730;
			var endY1 = 281;
			var endX2 = 1075;
			var endY2 = 152;
			var percent = document.getElementsByClassName('top')[0].clientWidth/1600;
			endX1 = endX1 * percent;
			endX2 = endX2 * percent;
			endY1 = endY1 * percent;
			endY2 = endY2 * percent;
			return [
				endX1,endY1,endX2,endY2
			];
		},
		highLight:function(cur,last){
			this.chart.setOption({
    			series:[
    				{
    					data: this.convertData(this.dataMap,cur),
    				}
    			]
    		});
		},
		clearLine:function(){
			var self = this;
			self.chart.setOption({
				series:[
					{
						markLine:{
			            	data:[]
			            }
					},
					{
						markPoint:{
					    	data:[]
					    }
					}
				]
			});
		},
		clearLineOnly:function(){
			var self = this;
			self.chart.setOption({
				series:[
					{
						markLine:{
			            	data:[]
			            }
					},
					{}
				]
			});
		},
		clearPointOnly:function(){
			var self = this;
			self.chart.setOption({
				series:[
					{},
					{
						markPoint:{
					    	data:[]
					    }
					}
				]
			});
		},
		markLine:function(startX,startY,endX1,endY1,endX2,endY2,pointCustArr){
			this.chart.setOption({
    			series:[
    				{
    					markLine:{
			            	data:[
			            		{
			            			0:{x:startX,y:startY},
			            			1:{x:endX1,y:endY1},
			            		},
			            		{
			            			0:{x:startX,y:startY},
			            			1:{x:endX2,y:endY2},
			            		}
			            	]
			            }
    				},
    				{
						markPoint:{
					    	data:pointCustArr
					    }
					}
    			]
    		});
		},
		markLineOnly:function(startX,startY,endX1,endY1,endX2,endY2){
			this.chart.setOption({
    			series:[
    				{
    					markLine:{
			            	data:[
			            		{
			            			0:{x:startX,y:startY},
			            			1:{x:endX1,y:endY1},
			            		},
			            		{
			            			0:{x:startX,y:startY},
			            			1:{x:endX2,y:endY2},
			            		}
			            	]
			            }
    				},
    				{}
    			]
    		});
		},
		markPointOnly:function(pointCustArr){
			var self = this;
			setInterval(function(){
				var tmp = pointCustArr.shift();
				if(tmp && tmp.coord){
					self.createDiv(tmp);
				}
			},500);
			/*this.chart.setOption({
    			series:[
    				{},
    				{
						markPoint:{
					    	data:pointCustArr
					    }
					}
    			]
    		});*/
		},
		createDiv:function(pointCust){
			var percent = document.getElementsByClassName('top')[0].clientWidth/1600;
			var tmp = this.chart.convertToPixel('geo',pointCust.coord);
			var top = tmp[1];//+ 60*percent;
			var left = tmp[0];//+ 190*percent;
			var str = '';
			str += '<div class="moveImg" style="top:'+top+'px;left:'+left+'px;">';
			str += '	<div class="hiddenPart">';
			//str += '		<img class="money" src="'+money+'" />';
			str += '		<span class="money" >';
			str += '			<span class="mark">￥</span>';
			str += pointCust.value;
			str += '		</span>';
			str += '	</div>';
			str += '</div>';
			var aDom = $(str);
			$(".allMovePart").append(aDom);
			aDom.addClass('show');
			setTimeout(function(){
				aDom.removeClass('show');
			},1000);
			setTimeout(function(){
				aDom.remove();
			},1500);
		}
	},
	created(){
		
	},
	mounted() {
		this.initMap();
		this.count = 0;
	},
	beforeDestroy(){
		this.chart.dispose();
		if(this.getDataInterval) {
			clearInterval(this.getDataInterval);
		}
		if(this.getPerSecDataSetTimeout) {
			clearTimeout(this.getPerSecDataSetTimeout);
		}
	},
}
</script>

<style lang="scss" scoped>
	.mapBox{
		.mapChart{
			width:12rem;
			height:6.6rem;
			margin: auto;
			position: absolute;
			z-index: 1;
			left: 1.9rem;
			top:0.6rem;
		}
	}
	
</style>
<style lang="scss">
	.allMovePart{
		width:12rem;
		height:6.6rem;
		position: absolute;
		z-index: 1;
		left: 1.9rem;
		top:0.6rem;
	}
	.moveImg{
		position: absolute;
		margin: auto;
		z-index: 2;
		width: 1rem;
		height: 0.4rem;
		margin-left: -0.5rem;
		margin-top: -0.8rem;
		-webkit-transform: translateY(0);
		-moz-transform: translateY(0);
		transform: translateY(0);
		-webkit-transition:1s all ease;
		-moz-animation:1s all ease;
		transition:1s all ease;
		opacity: 0;
		white-space:nowrap;
		overflow:hidden;
		text-overflow: ellipsis;
		.hiddenPart{
			.money{
				background: rgba(2,3,30,0.6);
				padding: 0 0.05rem;
				border-radius: 0.05rem;
				display: inline-block;
				color:#fcee21;
				font-family: "digifaw";
				font-size: 0.3rem;
				font-weight: bolder;
				text-align: center;
				.mark{
					font-family: "微软雅黑";
					font-size: 0.2rem;
					font-weight: bolder;
					text-align: center;
				}
			}
		}
	}
	.moveImg.show{
		opacity: 1;
		margin-top: -0.4rem;
	}
</style>