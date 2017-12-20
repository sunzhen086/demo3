<template>
	<div class="boxTwo" v-bind:class="{'dynamic':isDynamic,'showBox':isShowBox,'static':isStatic}">
		<div class="topIcon"></div>
		<div class="custBox">
			<div class="hiddenPart">
				<div class="boxTopBorder"></div>
				<div class="boxInfo">{{info}}</div>
				<div class="custInfo">
					<div class="age">{{age}}</div>
					<div class="member" v-bind:class="{'vip':member == 1}"></div>
					<div class="sex" v-bind:class="{'woman':sex == 0}"></div>
				</div>
				<div class="headerPic" v-bind:class="{'woman':sex == 0}"></div>
				<div class="tag">
					<tag :is-loading = isShowBox :tagdata = custTagData></tag>
				</div>
				<div class="pieTitle">{{picTitle}}</div>
				<div class="pie" v-show=isPieShow>
					<littlePie :chartData=pie1 :is-show=isShowBox></littlePie>
					<littlePie :chartData=pie2 :is-show=isShowBox></littlePie>
					<littlePie :chartData=pie3 :is-show=isShowBox></littlePie>
				</div>
				<div class="orderInfo">
					<div class="orderTitle">{{orderTitle}}</div>
					<div class="oneLine">
						<div class="name">交易时间：</div>
						<div class="value time">{{orderInfo.orderTime}}</div>
					</div>
					<div class="oneLine">
						<div class="name">交易金额：</div>
						<span class="mark">￥</span>
						<div class="value sum">
							<figureFormat format="small-decimal" :numValue=orderInfo.orderSum></figureFormat> 
						</div>
					</div>
					<div class="oneLine">
						<div class="name">交易详情：</div>
						<div class="value" >
							<div class="line" v-for="(item,index) in orderInfo.orderDetail"
								v-bind:class="{'first':index == 0}" :title="item[0]">
								{{item[0]}}&nbsp;*{{item[1]}}
							</div>
						</div>
					</div>
				</div>
				<div class="boxBottomBorder"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import tag from './tag.vue';
	import littlePie from './littlePie.vue';
	import bigPie from './bigPie.vue';
	import figureFormat from '../../../tools/figureformat/figure-format.vue';
	export default {
		props:{
			boxData:Object
		},
		data() {
			return {
				isDynamic:false,
				isShowBox:false,
				isPieShow:false,
				isStatic:false,
				custTagData:[],
				info:'消费者信息',
				age:23,
				member:1,//1：是，0：否
				sex:0,//1:男，0：女
				picTitle:'常购买卷烟品牌',
				pie1:{
					'typeName':'中华系列',
					'color':['#3fa9f5','rgba(126,140,141,0.6)'],
					'typeValue':[{name:'中华系列',value:82},{name:'其他',value:18}]
				},
				pie2:{
					'typeName':'玉溪系列',
					'color':['#0dffa4','rgba(126,140,141,0.6)'],
					'typeValue':[{name:'玉溪系列',value:54},{name:'其他',value:46}]
				},
				pie3:{
					'typeName':'红塔山系列',
					'color':['#f84242','rgba(126,140,141,0.6)'],
					'typeValue':[{name:'红塔山系列',value:33},{name:'其他',value:67}]
				},
				orderTitle:'最近交易订单',
				orderInfo:{
					orderTime:'2017-09-21 16:00:02',
					orderSum:252.50,
					orderDetail:[
						['玉溪（软经典1969）',2],
						['稻香村月饼礼盒810g',1],
					]
				}
			}
		},
		components: {
			tag,
			littlePie,
			bigPie,
			figureFormat,
		},
		mounted() {
			
		},
		watch:{
			boxData:function(newVal,oldVal){
				var that = this;
				var isShowBox = newVal.showBox;
				if(isShowBox){
					setTimeout(function(){
						that.isDynamic = isShowBox;
					},0);
					setTimeout(function(){
						that.isShowBox = isShowBox;
						var showdata = newVal.showdata;
				
						//整理需要显示的数据
						that.age = showdata.custage;
						that.member = showdata.isvip;
						that.sex = showdata.custgender;
						
						//如果常购品牌一没有数据，那三个常购品牌都不会有数据，全部隐藏掉
						if(showdata.brandname1 == null) {
							that.picTitle = '暂无购买卷烟品牌'
							that.isPieShow = false;
						}else {
							that.picTitle = '常购买卷烟品牌'
							that.isPieShow = true;
							//常购系列一
							var tvarr1 = new Array();
							var tvobj11 = {
								name:showdata.brandname1,
								value:showdata.brandscale1
							}
							tvarr1.push(tvobj11);
							var tvobj12 = {
								name:'其他',
								value:100-showdata.brandscale1
							}
							tvarr1.push(tvobj12);
							var obj1 = {
								typeName : showdata.brandname1,
								color:['#3fa9f5','rgba(126,140,141,0.6)'],
								typeValue : tvarr1
							}
							that.pie1 = obj1;
							//常购系列二
							var tvarr2 = new Array();
							var tvobj21 = {
								name:showdata.brandname2,
								value:showdata.brandscale2
							}
							tvarr2.push(tvobj21);
							var tvobj22 = {
								name:'其他',
								value:100-showdata.brandscale2
							}
							tvarr2.push(tvobj22);
							var obj2 = {
								typeName : showdata.brandname2,
								color : ['#0dffa4','rgba(126,140,141,0.6)'],
								typeValue : tvarr2
							}
							that.pie2 = obj2;
							//常购系列3
							var tvarr3 = new Array();
							var tvobj31 = {
								name:showdata.brandname3,
								value:showdata.brandscale3
							}
							tvarr3.push(tvobj31);
							var tvobj32 = {
								name:'其他',
								value:100-showdata.brandscale3
							}
							tvarr3.push(tvobj32);
							var obj3 = {
								typeName : showdata.brandname3,
								color : ['#f84242','rgba(126,140,141,0.6)'],
								typeValue : tvarr3
							}
							that.pie3 = obj3;
						}
						var orderInfodata = {
							orderTime : showdata.tradetime,
							orderSum : showdata.tradeamount,
							orderDetail : showdata.orderDetail
						}
						
						that.orderInfo = orderInfodata;
						var tagstr = showdata.tags;
						if(tagstr != null) {
							var tagarr = tagstr.split(',');
							that.custTagData = tagarr;
						}
					},1200);
					setTimeout(function(){
						that.isStatic = isShowBox;
					},1500);
				}else{
					that.isDynamic = isShowBox
					that.isShowBox = isShowBox;
					that.isStatic = isShowBox;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.boxTwo.dynamic.showBox.static{
		.topIcon{
			-webkit-transform:none;
		    -moz-transform:none;
		    transform:none;
		    -webkit-animation:none;
		    -moz-animation:none;
		    animation:none;
		    opacity: 1;
		}
	}
	.boxTwo.dynamic.showBox{
		.hiddenPart{
			margin-top: 0rem;
		}
	}
	.boxTwo.dynamic{
		.topIcon{
			background-size:cover;
			-webkit-transform:translate3d(0,0,0);
		    -moz-transform:translate3d(0,0,0);
		    transform:translate3d(0,0,0);
		    -webkit-animation:play 0.6s linear infinite;
		    -moz-animation:play 0.6s linear infinite;
		    animation:play 0.6s linear infinite;
		    opacity: 1;
		}
	}
	.boxTwo{
		.topIcon{
			background: url(../../../../assets/images/yunpos/realtime/topIcon.png) no-repeat;
			background-size: 0.67rem 0.67rem;
			width: 0.67rem;
			height: 0.67rem;
			position: absolute;
			top:1.78rem;
			left: 12.32rem;
			z-index: 3;
			opacity: 0;
		}
		@-webkit-keyframes play{
		    0% {
		    	-webkit-transform:rotate(0deg);
		    }
		    100% {
		    	-webkit-transform:rotate(360deg);
		    }
		}
		@-moz-keyframes play{
		    0% {
		    	-moz-transform:rotate(0deg);
		    }
		    100% {
		        -moz-transform:rotate(360deg);
		    }
		}
		@keyframes play{
		    0% {
		        transform:rotate(0deg);
		    }
		    100% {
		        transform:rotate(360deg);
		    }
		}
		.custBox{
			position: absolute;
			z-index: 2;
			top:2.1rem;
			left: 12.64rem;
			width: 3.16rem;
			overflow: hidden;
			.hiddenPart{
				border-left: 0.01rem dashed;
				border-right: 0.02rem dashed;
				border-image: -webkit-linear-gradient( bottom,rgba(63,169,245,1), rgba(63,169,245,0)) 30 30;
				border-image: -o-linear-gradient( bottom,rgba(63,169,245,1), rgba(63,169,245,0)) 30 30;
				border-image: -moz-linear-gradient( bottom,rgba(63,169,245,1), rgba(63,169,245,0)) 30 30;
				border-image: linear-gradient( to bottom,rgba(63,169,245,1), rgba(63,169,245,0)) 30 30;
				-webkit-transform: translateY(0);
				-moz-transform: translateY(0);
				transform: translateY(0);
				-webkit-transition:0.3s all ease;
				-moz-animation:0.3s all ease;
				transition:0.3s all ease;
				margin-top: -8rem;
			}
			.boxTopBorder{
				background: url(../../../../assets/images/yunpos/realtime/topBorder.png);
				background-size: 3.2rem 0.2rem;
				width: 3.20rem;
				height: 0.2rem;
				margin-left: -0.01rem;
				margin-top: -0.02rem;
			}
			.boxBottomBorder{
				background: url(../../../../assets/images/yunpos/realtime/bottomBorder.png);
				background-size: 3.2rem 0.2rem;
				width: 3.20rem;
				height: 0.2rem;
				margin-left: -0.04rem;
				/*position: absolute;
				bottom: 0rem;
				left: -0.02rem;*/
			}
			.boxInfo{
				line-height: 0.16rem;
				font-size: 0.18rem;
				padding-left: 1.05rem;
			}
			.custInfo{
				overflow: hidden;
				margin-top: 0.15rem;
				.age{
					float: left;
					margin-left: 0.5rem;
					width: 0.51rem;
					height: 0.51rem;
					background: url(../../../../assets/images/yunpos/realtime/age.png) no-repeat;
					background-size: 0.51rem 0.51rem;
					font-size: 0.24rem;
					line-height: 0.5rem;
					color: #0dffa4;
					padding: 0 0.12rem;
				}
				.member{
					float: left;
					margin-left: 0.03rem;
					width: 0.51rem;
					height: 0.51rem;
					background: url(../../../../assets/images/yunpos/realtime/novip.png) no-repeat;
					background-size: 0.51rem 0.51rem;
				}
				.member.vip{
					background: url(../../../../assets/images/yunpos/realtime/vip.png) no-repeat;
					background-size: 0.51rem 0.51rem;
				}
				.sex{
					float: left;
					margin-left: 0.25rem;
					width: 0.51rem;
					height: 0.51rem;
					background: url(../../../../assets/images/yunpos/realtime/manicon.png) no-repeat;
					background-size: 0.51rem 0.51rem;
				}
				.sex.woman{
					background: url(../../../../assets/images/yunpos/realtime/womanicon.png) no-repeat;
					background-size: 0.51rem 0.51rem;
				}
			}
			.headerPic{
				width: 1.85rem;
				height: 2.60rem;
				background: url(../../../../assets/images/yunpos/realtime/man.png) no-repeat;
				background-size: 1.85rem 2.6rem;
				margin: auto;
				margin-top: 0rem;
			}
			.headerPic.woman{
				background:url(../../../../assets/images/yunpos/realtime/woman.png) no-repeat;
				background-size: 1.85rem 2.6rem;
			}
			.pieTitle{
				text-align: center;
				font-size: 0.14rem;
				margin-bottom: 0.1rem;
			}
			.pie{
				padding: 0.05rem 0.2rem;
				overflow: hidden;
			}
			.orderInfo{
				overflow: hidden;
				width: 3.1rem;
				margin-top: 0.25rem;
				.orderTitle{
					text-align: center;
					font-size: 0.14rem;
					
				}
				.oneLine{
					width: 3.1rem;
					overflow: hidden;
					margin-top: 0.08rem;
					padding-left: 0.45rem;
					line-height: 0.20rem;
					.name{
						font-size: 0.12rem;
						color: rgba(255,255,255,0.5);
						float: left;
						margin-top: 0.02rem;
					}
					.mark{
						font-family: "微软雅黑";
						font-size: 0.12rem;
						float: left;
						font-weight: bolder;
						color: #0DFFA4;
						margin-top: 0.02rem;
					}
					.value{
						font-size: 0.14rem;
						float: left;
						font-weight: bolder;
						.line{
							margin-top: 0.05rem;
							font-weight: bolder;
							width: 2rem;
							white-space:nowrap;
							overflow:hidden;
							text-overflow: ellipsis;
						}
						.line.first{
							margin-top: 0;
						}
					}
					.value.time{
						color: rgba(255,255,255,0.8);
						font-family: 'digifaw';
						font-size: 0.2rem;
						margin-top: -0.02rem;
					}
					.value.sum{
						color: #0dffa4;
						font-family: 'digifaw';
						font-size: 0.22rem;
						margin-top: -0.02rem;
					}
				}
			}
		}
	}
</style>