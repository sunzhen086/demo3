<template>
	<div class="topBox">
		<!--<div class="topTitle">{{topTitle}}</div>-->
		<div class="top">
			<div class="topTitle">
				<span class="logo"></span>
				&nbsp;
				<span class="topName">{{topName}}</span>
				{{topTitle}}
			</div>
			<div class="leftTitle">{{leftTitle}}</div>
			<div class="rightDay">{{day}}</div>
			<div class="rightWeek">{{week}}</div>
			<div class="rightTime">{{time}}</div>
		</div>
		<div class="topNum">
			<span class="mark">￥</span>
			<animatedInteger :value=value @end-value='setValueCallback'></animatedInteger> 
		</div>
	</div>
</template>

<script>
	import animatedInteger from '../../../tools/animatedinteger/animated-integer.vue';
	import axios from '@/utils/axios';
	export default {
		data() {
			return {
				topName:'新商通',
				topTitle:'数据服务平台',
				leftTitle:'实时销售',
				day:'',
				week:'',
				weeks:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
				time:'',
				desc:'实时销售额',
				descTime:'2017-09-01 11:00:00',
				value:0
			}
		},
		components: {
			animatedInteger,
		},
		methods: {
			setValueCallback:function(data){				
				//console.log(data);
			},
			asyncgetData:function(params, callback) {
				axios.get('/realtime/getRealtimeSaleamount',{params:params}).then(function(res){
					callback(res.data);
				})
			},
			getTime:function(){
				var onedaytime = 24*60*60*1000;//一天时间间隔秒数
				var nowDate = new Date() - onedaytime*4;//因为使用的是前几天的数据，这里需要改一下系数
				var tenMinuteBeforeDate = new Date(nowDate);//获取当前时间
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
			changeNum: function() {
				var _this = this;
				this.setValueTimeout = setTimeout(function(){
					var time = _this.getTime();
					var count = 1;//获取数据个数
					var params = {time:time,count:count};
					_this.asyncgetData(params, function(data){
						if(data != 'null') {
							var tmpdata = data[0];
							_this.value = tmpdata.amount;
						}
					});	
					_this.changeNum();
				},5000);
			},
			initTime:function(){
				var now = new Date();
				var day = [
		    		now.getFullYear(), 
		    		(now.getMonth()+1) <10 ?("0" + (now.getMonth()+1)):(now.getMonth()+1),
		    		now.getDate() <10 ?("0" + now.getDate()):now.getDate(),
		    	].join('-')
				this.day = day;
				var week = now.getDay();
				this.week = this.weeks[week-1];
				var that = this;
				this.initTimeInterval = setInterval(function(){
					now = new Date();
					var time = [
			    		now.getHours() <10 ?("0" + now.getHours()):now.getHours(), 
			    		now.getMinutes() <10 ?("0" + now.getMinutes()):now.getMinutes(),
			    		now.getSeconds() <10 ?("0" + now.getSeconds()):now.getSeconds(),
			    	].join(':')
					that.time = time;
				},1000);
				
			}
		},
		mounted() {
			this.initTime();
			this.changeNum();
		},		
		beforeDestroy(){
			if(this.setValueTimeout){
				clearTimeout(this.setValueTimeout);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.topBox{
		padding-top: 0.2rem;
		position: absolute;
		z-index: 4;
		top:0;
		/*left:45%;
		margin-left:-2.5rem;*/
		.top{
			width: 16rem;
			height: 1.26rem;
			background: url(../../../../assets/images/yunpos/behavioranalysis/tback.png) no-repeat;
			background-size: 16rem 1.26rem;
			position: relative;
			.topTitle{
				font-size: 0.36rem;
				line-height: 0.36rem;
				font-family: "FZZhengHeiS-M-GB";
				font-weight: bolder;
				color: #fff;
				text-align: center;
				padding:0.2rem;
				.logo{
					width: 0.5rem;
					height: 0.5rem;
					background: url(../../../../assets/images/yunpos/behavioranalysis/logo.png);
					background-size: 0.5rem 0.5rem;
					position: absolute;
					left: 35%;
				}
				.topName{
					font-size: 0.48rem;
					line-height: 0.48rem;
					font-weight: bolder;
					/*margin-right: -0.1rem;*/
				}
			}
			.leftTitle{
				position: absolute;
				left: 0.55rem;
				top:0.77rem;
				font-size: 0.2rem;
				line-height: 0.2rem;
				font-weight: bolder;
				font-family: "微软雅黑";
			}
			.rightDay{
				position: absolute;
				right: 1.85rem;
				top:0.72rem;
				font-size: 0.1rem;
				color: rgba(255,255,255,0.6);
				font-weight: bolder;
			}
			.rightWeek{
				position: absolute;
				right: 1.85rem;
				top:0.9rem;
				font-size: 0.1rem;
				color: rgba(255,255,255,0.6);
				font-weight: bolder;
			}
			.rightTime{
				position: absolute;
				right: 0.5rem;
				top:0.68rem;
				font-family: 'digifaw';
				font-size: 0.4rem;
			}
		}
		/*.topTitle{
			font-size: 0.3rem;
			line-height: 0.3rem;
			padding: 0.1rem;
			padding-left: 0;
			font-weight: bolder;
		}*/
		.topDesc{
			font-size: 0.22rem;
			line-height: 0.22rem;
			width: 5.2rem;
			position: absolute;
			left: 50%;
			margin-left: -3rem;
			margin-top: -0.06rem;
			overflow: hidden;
			border-bottom:0.02rem solid;
			border-image: -webkit-linear-gradient( left,rgba(63,169,245,1), rgba(63,169,245,0)) 30 30;
			border-image: -o-linear-gradient( right,rgba(63,169,245,1), rgba(63,169,245,0)) 30 30;
			border-image: -moz-linear-gradient( right,rgba(63,169,245,1), rgba(63,169,245,0)) 30 30;
			border-image: linear-gradient( to right,rgba(63,169,245,1), rgba(63,169,245,0)) 30 30;
			.descInfo{
				background-color: #3fa9f5;
				float: left;
				padding: 0.05rem 0.1rem;
			}
			.descTime{
				float: left;
				padding: 0.05rem 0.1rem;
				font-size: 0.14rem;
				width: 4rem;
				color:rgba(255,255,255,0.5);
			}
		}
		.topNum{
			font-size: 0.6rem;
			line-height: 0.3rem;
			padding: 0.15rem 0;
			font-family: "digifaw";
			color: rgba(63, 169, 245, 0.8);
			background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(63, 169, 245, 1)), to(rgba(13, 255, 164, 1)));
		    -webkit-background-clip: text;
		    -webkit-text-fill-color: transparent;
		    position: absolute;
		    left: 50%;
		    margin-left: -1.55rem;
		    top:1.1rem;
		    .mark{
		    	font-family: "微软雅黑";
		    	font-weight: bolder;
		    	font-size: 0.36rem;
		    	margin-right: -0.15rem;
		    }
		}
	}
</style>