<template>
	<div class="boxOne" v-bind:class="{'dynamic':isDynamic,'showBox':isShowBox,'static':isStatic}">
		<div class="topIcon"></div>
		<div class="shopBox" >
			<div class="hiddenPart">
				<div class="boxTopBorder"></div>
				<div class="boxInfo">{{info}}</div>
				<div class="boxTitle">{{pageData.title}}</div>
				<div class="boxHeight">
					<div class="boxNum num1">
						<div class="num">
							<figureFormat format="small-decimal" :numValue=pageData.num[0].count></figureFormat> 
						</div>
						<div class="info">{{pageData.num[0].note}}</div>
					</div>
					<div class="boxNum num2">
						<div class="num">
							<figureFormat format="small-decimal" :numValue=pageData.num[1].count></figureFormat> 
						</div>
						<div class="info">{{pageData.num[1].note}}</div>
					</div>
					<div class="boxNum num3">
						<div class="num">
							<figureFormat format="small-decimal" :numValue=pageData.num[2].count></figureFormat> 
						</div>
						<div class="info">{{pageData.num[2].note}}</div>
					</div>
					<div class="boxNum num4">
						<div class="num">
							<figureFormat format="small-decimal" :numValue=pageData.num[3].count></figureFormat> 
						</div>
						<div class="info">{{pageData.num[3].note}}</div>
					</div>
					<div class="boxNum num5">
						<div class="num">
							<figureFormat format="small-decimal" :numValue=pageData.num[4].count></figureFormat> 
						</div>
						<div class="info">{{pageData.num[4].note}}</div>
					</div>
				</div>
				<boxBarChart :isShow=isShowBox :bardata=barChatData></boxBarChart>
				<div class="boxBottomBorder"></div>
			</div>
		</div>
	</div>
	
</template>

<script>
	import boxBarChart from './boxBarChart.vue';
	import figureFormat from '../../../tools/figureformat/figure-format.vue';
	export default {
		props:{
			boxData:Object
		},
		data() {
			return {
				isDynamic:false,
				isShowBox:false,
				isStatic:false,
				barChatData:{},
				info:'店铺信息',
				pageData:{
					'title':'罗森连锁便利店',
					'num':[
						{'count':6384.22,'note':'总额(万元)'},
						{'count':23.2,'note':'总笔数(万)'},
						{'count':25555,'note':'经营品牌(个)'},
						{'count':2598,'note':'店铺会员(店)'},
						{'count':84.22,'note':'单价(元)'},
					]
				}
			}
		},
		components: {
			boxBarChart,
			figureFormat,
		},
		mounted() {
			
		},
		watch:{
			boxData:function(newVal,oldVal){
				var that = this;
				//获取到数据整理
				var isShowBox = newVal.showBox;
				if(isShowBox){
					setTimeout(function(){
						that.isDynamic = isShowBox;
					},0);
					setTimeout(function(){
						that.isShowBox = isShowBox;
						var showdata = newVal.showdata;
						//页面展示传入数据
						that.pageData.title = showdata.shopname;
						var arr = new Array();
						var obj1 = new Object();
						obj1.count = showdata.totalamount;
						obj1.note = '总额(万元)';
						arr.push(obj1);
						var obj2 = new Object();
						obj2.count = showdata.totalcount;
						obj2.note = '总笔数(万)';
						arr.push(obj2);
						var obj3 = new Object();
						obj3.count = showdata.brandcount;
						obj3.note = '经营品牌(个)';
						arr.push(obj3);
						var obj4 = new Object();
						obj4.count = showdata.custamount;
						obj4.note = '店铺会员(店)';
						arr.push(obj4);
						var obj5 = new Object();
						obj5.count = showdata.averageprice;
						obj5.note = '单价(元)';
						arr.push(obj5);
						that.pageData.num = arr;
						
						var value1  = new Array();
						value1.push(showdata.totalamount3);
						value1.push('-');
						value1.push(showdata.totalamount2);
						value1.push('-');
						value1.push(showdata.totalamount1);
						
						var value2  = new Array();
						value2.push(showdata.totalcount3);
						value2.push('-');
						value2.push(showdata.totalcount2);
						value2.push('-');
						value2.push(showdata.totalcount1);
						
						var chartData = {
							'ydata': ['2017.08','-','2017.07','-','2017.06'],
							'value1': value1,
							'value2': value2,
							'ydata1':'2017.10',
							'ydata2':'2017.09',
							'ydata3':'2017.08'
						}
						that.barChatData = chartData;
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
	.boxOne.dynamic.showBox.static{
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
	.boxOne.dynamic.showBox{
		.hiddenPart{
			margin-top: 0rem;
		}
	}
	.boxOne.dynamic{
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
	.boxOne{
		.db{
			display: block;
		}
		.dn{
			display: none;
		}
		.shopPart{
			opacity:0;
		}
		.topIcon{
			background: url(../../../../assets/images/yunpos/realtime/topIcon.png);
			background-size: 0.67rem 0.67rem;
			width: 0.67rem;
			height:  0.67rem;
			position: absolute;
			top:3.08rem;
			left: 8.88rem;
			z-index: 3;
		    opacity: 0;
		}
		@-webkit-keyframes play{
		    0% {
		    	-webkit-transform:rotate(0deg);
		        /*水平翻转
		        -webkit-transform:rotateY(0deg);
				垂直翻转
		        -webkit-transform:rotateX(0deg);
				顺时针旋转
		        -webkit-transform:rotate(0deg);
				逆时针旋转
		        -webkit-transform:rotate(0deg);
		        */
		    }
		    100% {
		    	-webkit-transform:rotate(360deg);
		        /* 水平翻转 
		        -webkit-transform:rotateY(360deg);
				垂直翻转
		        -webkit-transform:rotateX(360deg);
		 		顺时针旋转
		        -webkit-transform:rotate(360deg);
				逆时针旋转
		        -webkit-transform:rotate(-360deg);
		        */
		    }
		}
		@-moz-keyframes play{
		    0% {
		    	-moz-transform:rotate(0deg); 
		        /*
		        -moz-transform:rotateY(0deg);
		        -moz-transform:rotateX(0deg);
		        -moz-transform:rotate(0deg);
		        -moz-transform:rotate(0deg);
		        */
		    }
		    100% {
		        -moz-transform:rotate(360deg);
		        /*
		        -moz-transform:rotateY(360deg);
		        -moz-transform:rotateX(360deg);
		        -moz-transform:rotate(360deg);
		        -moz-transform:rotate(-360deg);
		        */
		    }
		}
		@keyframes play{
		    0% {
		        transform:rotate(0deg);
		        /*
		        transform:rotateY(0deg);
		        transform:rotateX(0deg);
		        transform:rotate(0deg);
		        transform:rotate(0deg);
		        */
		    }
		    100% {
		        transform:rotate(360deg);
		        /*
		        transform:rotateY(360deg);
		        transform:rotateX(360deg);
		        transform:rotate(360deg);
		        transform:rotate(-360deg);
		        */
		    }
		}
		.shopBox{
			position: absolute;
			z-index: 2;
			top:3.4rem;
			left: 9.2rem;
			width: 3.16rem;
			overflow:hidden;
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
				margin-top: -5rem;
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
				position: absolute;
				bottom: 0;
				left: -0.02rem;
				top: 4.2rem;
			}
			.boxInfo{
				line-height: 0.18rem;
				font-size: 0.18rem;
				padding-left: 1.20rem;
			}
			.boxTitle{
				text-align: center;
				font-size: 0.2rem;
				line-height: 0.2rem;
				padding-top: 0.1rem;
				width:3.1rem;
				white-space:nowrap;
				overflow:hidden;
				text-overflow: ellipsis;
			}
			.boxHeight{
				overflow: hidden;
				.boxNum{
					margin-top: 0.15rem;
					float: left;
					text-align: center;
					overflow: hidden;
					.num{
						font-size: 0.24rem;
						padding: 0.05rem;
						font-family: "digifaw";
					}
					.info{
						color: #7E8C8D;
						font-size: 0.12rem;
						padding: 0.05rem;
					}
				}
				.num1{
					width: 1.8rem;
					.num{
						color:#0dffa4;
					}
				}
				.num2{
					width: 1.3rem;
					.num{
						color:#42edf8;
					}
				}
				.num3{
					width: 0.95rem;
					margin-left: 0.08rem;
					.num{
						color:#fcee21;
					}
					.info{
						font-size: 0.1rem;
					}
				}
				.num4{
					width: 1.05rem;
					margin-left: 0.05rem;
					.num{
						color:#42f842;
					}
					.info{
						font-size: 0.1rem;
					}
				}
				.num5{
					width: 0.85rem;
					margin-left: 0.05rem;
					.num{
						color:#f84242;
					}
					.info{
						font-size: 0.1rem;
					}
				}
			}
		}
	}
</style>