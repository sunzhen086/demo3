<template>
	<div class="rightTopBox">
		<div class="leftPart">
			<div class="title">{{title[0]}}</div>
			<div class="content">
				<div class="topLeftCorner corner"></div>
				<div class="topRightCorner corner"></div>
				<img class="tobacco" src="../../../../assets/images/yunpos/brandmarket/tobacco/yuxi.jpg"/>
				<div class="tottomLeftCorner corner"></div>
				<div class="tottomRightCorner corner"></div>
			</div>
			<div class="nameBox">
				<div class="brand">{{target[0]}}</div>
				<div class="type">{{target[1]}}</div>
			</div>
		</div>
		<div class="middlePart"></div>
		<div class="rightPart">
			<div class="title">{{title[1]}}</div>
			<div class="allPart">
				<div class="hiddenPart" v-for="(item,index) in tobacco"
					v-bind:class="{'hiddenPart1':index == 0,'hiddenPart2':index == 1, 'hiddenPart3':index == 2,'show1':selectIndex == 0,'show2':selectIndex == 1,'show3':selectIndex == 2}"
					v-on:click="changeAction(index)">
					<div class="content">
						<div class="topLeftCorner corner"></div>
						<div class="topRightCorner corner"></div>
						<img class="tobacco" v-if="index == 0" src="../../../../assets/images/yunpos/brandmarket/tobacco/yunyanruanzhen.png"/>
						<img class="tobacco" v-if="index == 1" src="../../../../assets/images/yunpos/brandmarket/tobacco/yuxiying.png"/>
						<img class="tobacco" v-if="index == 2" src="../../../../assets/images/yunpos/brandmarket/tobacco/yuxiqingxiang.png"/>
						<div class="tottomLeftCorner corner"></div>
						<div class="tottomRightCorner corner"></div>
					</div>
					<div class="nameBox">
						<div class="brand">{{item[0]}}</div>
						<div class="type">{{item[1]}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from '@/utils/axios';
export default {
	props:{
		
	},
	data() {
		return {
			title:['目标卷烟','共同购买最多'],
			target:[],
			tobacco:[],
			selectIndex:0,
			ids:[],
		}
	},
	components: {
		
	},
	methods: {
		getData:function(){
			var self = this;
			axios.get('/brandmarket/getTotalContrast').then(function(res){
				self.target = res.data.target;
				self.tobacco = res.data.tobacco;
				self.ids = res.data.ids;
				self.$emit("change-action", self.ids[self.selectIndex]);
			})
		},
		changeAction:function(index){
			var self = this;
			this.selectIndex = index;
			this.$emit("change-action", this.ids[this.selectIndex]);
		}
	},
	created(){

	},
	mounted() {
		this.getData();
	},
	beforeDestroy(){
		
	}
}
</script>

<style lang="scss" scoped>
	.rightTopBox{
		margin-top: 0.35rem;
		margin-left: 0.5rem;
		overflow: hidden;
		.leftPart{
			float: left;
			.title{
				font-size: 0.18rem;
				color: #fff;
				font-weight: bolder;
				padding-bottom:0.1rem;
			}
			.content{
				position: relative;
				width:0.7rem;
				height: 1rem;
				margin-left: 0.05rem;
				float: left;
				.tobacco{
					width: 0.6rem;
					height: 0.9rem;
					margin-left: 0.05rem;
					margin-top: 0.05rem;
				}
				.corner{
					position: absolute;
					width: 0.1rem;
					height: 0.1rem;
				}
				.topLeftCorner{
					top:0;
					left: 0;
					border-top:0.01rem solid #FFFFFF;
					border-left:0.01rem solid #FFFFFF;
				}
				.topRightCorner{
					top:0;
					right: 0;
					border-top:0.01rem solid #FFFFFF;
					border-right:0.01rem solid #FFFFFF;
				}
				.tottomLeftCorner{
					bottom:0;
					left: 0;
					border-bottom:0.01rem solid #FFFFFF;
					border-left:0.01rem solid #FFFFFF;
				}
				.tottomRightCorner{
					bottom:0;
					right: 0;
					border-bottom:0.01rem solid #FFFFFF;
					border-right:0.01rem solid #FFFFFF;
				}
			}
			.nameBox{
				float: left;
				margin: 0.3rem 0.15rem;
				.brand{
					color: rgba(255,255,255,0.7);
					font-size: 0.18rem;
				}
				.type{
					color: #3FA9F5;
					font-size: 0.24rem;
					font-weight: bolder;
					margin-top: 0.08rem;
				}
			}
		}
		.middlePart{
			width: 0.7rem;
			height: 0.95rem;
			background: url(../../../../assets/images/yunpos/brandmarket/vs.png) no-repeat;
			background-size: 0.7rem 0.95rem;
			float: left;
			margin-top: 0.3rem;
			margin-left: 0.2rem;
		}
		.rightPart{
			float: left;
			margin-left: 0.4rem;
			width: 5rem;
			overflow: hidden;
			.allPart{
				width: 9rem;
			}
			.title{
				font-size: 0.18rem;
				color: #fff;
				font-weight: bolder;
				padding-bottom:0.1rem;
			}
			.hiddenPart{
				float: left;
				margin-left: 0.1rem;
				-webkit-transform: translateX(0);
				-moz-transform: translateX(0);
				transform: translateX(0);
				-webkit-transition:0.1s all ease;
				-moz-animation:0.1s all ease;
				transition:0.1s all ease;
				cursor: pointer;
			}
			.hiddenPart1{
				margin-left: 0.2rem;
			}
			.hiddenPart1.show1{
				.nameBox{
					opacity: 1;
				}
			}
			.hiddenPart2{
				margin-left: 0.2rem;
			}
			.hiddenPart2.show2{
				margin-left: -0.8rem;
				.nameBox{
					opacity: 1;
				}
			}
			.hiddenPart2.show3{
				margin-left: -0.8rem;
			}
			.hiddenPart3{
				margin-left: -0.6rem;
			}
			.hiddenPart3.show2{
				margin-left: 0.2rem;
			}
			.hiddenPart3.show3{
				margin-left: -0.6rem;
				.nameBox{
					opacity: 1;
				}
			}
			.content{
				position: relative;
				width:0.7rem;
				height: 1rem;
				margin-left: 0.05rem;
				float: left;
				.tobacco{
					width: 0.6rem;
					height: 0.9rem;
					margin-left: 0.05rem;
					margin-top: 0.05rem;
				}
				.corner{
					position: absolute;
					width: 0.1rem;
					height: 0.1rem;
				}
				.topLeftCorner{
					top:0;
					left: 0;
					border-top:0.01rem solid #FFFFFF;
					border-left:0.01rem solid #FFFFFF;
				}
				.topRightCorner{
					top:0;
					right: 0;
					border-top:0.01rem solid #FFFFFF;
					border-right:0.01rem solid #FFFFFF;
				}
				.tottomLeftCorner{
					bottom:0;
					left: 0;
					border-bottom:0.01rem solid #FFFFFF;
					border-left:0.01rem solid #FFFFFF;
				}
				.tottomRightCorner{
					bottom:0;
					right: 0;
					border-bottom:0.01rem solid #FFFFFF;
					border-right:0.01rem solid #FFFFFF;
				}
			}
			.nameBox{
				float: left;
				margin: 0.3rem 0.15rem 0rem 0.25rem;
				opacity:0;
				.brand{
					color: rgba(255,255,255,0.7);
					font-size: 0.18rem;
				}
				.type{
					color: #0dffa4;
					font-size: 0.24rem;
					font-weight: bolder;
					margin-top: 0.08rem;
				}
			}
		}
	}
</style>