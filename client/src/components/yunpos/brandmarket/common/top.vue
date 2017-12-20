<template>
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
</template>

<script>
export default {
	props:{
		
	},
	data() {
		return {
			topName:'新商通',
			topTitle:'数据服务平台',
			leftTitle:'品牌市场分析规划',
			day:'',
			week:'',
			weeks:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
			time:'',
		}
	},
	components: {

	},
	methods: {
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
	created(){

	},
	mounted() {
		this.initTime();
	},
	beforeDestroy(){
		clearInterval(this.setValueInterval);
	},
}
</script>

<style lang="scss" scoped>
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
</style>