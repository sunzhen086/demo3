<template>
	<div class="box">
		<div class="boxTitle">
			<div class="leftIcon"></div>
			<div class="title">非卷烟类热销商品</div>
			<div class="rightIcon"></div>
		</div>
		<tabbase class="boxTab" :tabData=tabData @change-action=changeAction>
			<div class="boxContent">
				<div class="boxLine" v-for="(item,index) in lineData" :title="item">
					<span class="icon" v-bind:class="{'icon1':index==0,'icon2':index==1,'icon3':index==2}" v-if='index<3'></span>
					<span class="space" v-if="index>2"></span>{{(index+1)}}. {{item}}
				</div>
			</div>
		</tabbase>
	</div>
</template>

<script>
import tabbase from '../../../tools/tabbase/tab-base.vue';
import leftBoxBarChart from './leftBoxBarChart.vue';
import axios from '@/utils/axios';
export default {
	props:{
		
	},
	data() {
		return {
			tabData:{
				index:0,
				data:['食品饮料','酒类','家居用品','生鲜冷品','文具用品','母婴玩具']
			},
			lineData:[],
			lineDataList:[]
		}
	},
	components: {
		tabbase,
		leftBoxBarChart,
	},
	methods: {
		getData:function(){
			var self = this;
			axios.get('/behavioranalysis/popularNoTobacco').then(function(res){
				self.lineDataList = res.data;
				self.lineData = self.lineDataList[self.tabData.index];
			})
		},
		changeAction:function(index){
			this.lineData = this.lineDataList[index];
		}
	},
	created(){

	},
	mounted() {
		this.getData();
	},
	beforeDestroy(){

	},
}
</script>

<style lang="scss" scoped>
	.box{
		margin-top: 0.15rem;
		overflow: hidden;
		.boxTitle{
			padding: 0.05rem 0rem;
			overflow:hidden;
			font-size: 0.16rem;
			line-height: 0.16rem;
			color: #3FA9F5;
			text-align: center;
			.title{
				float: left;
				padding: 0rem 0.02rem;
			}
			.leftIcon{
				width: 1.2rem;
				height: 0.16rem;
				float: left;
				background: url(../../../../assets/images/yunpos/behavioranalysis/boxleftline.png) no-repeat;
				background-size: 1.23rem 0.16rem;
			}
			.rightIcon{
				width: 1.2rem;
				height: 0.16rem;
				float: left;
				background: url(../../../../assets/images/yunpos/behavioranalysis/boxrightline.png) no-repeat;
				background-size: 1.23rem 0.16rem;
			}
		}
		.boxTab{
			margin-top: 0.05rem;
			font-size: 0.16rem;
			line-height: 0.2rem;
			.boxContent{
				padding: 0.13rem 0.2rem 0.1rem 0.15rem;
				.boxLine{
					padding: 0.05rem;
					width: 2.2rem;
					white-space:nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					.space{
						width: 0.16rem;
						height: 0.16rem;
						float: left;
						/*margin-left: -0.22rem;*/
						margin-right: 0.05rem;
					}
					.icon{
						width: 0.16rem;
						height: 0.16rem;
						float: left;
						/*margin-left: -0.22rem;*/
						margin-right: 0.05rem;
						margin-top: 0.03rem;
					}
					.icon1{
						background: url(../../../../assets/images/yunpos/behavioranalysis/first.png) no-repeat;
						background-size: 0.16rem 0.16rem;
					}
					.icon2{
						background: url(../../../../assets/images/yunpos/behavioranalysis/second.png) no-repeat;
						background-size: 0.16rem 0.16rem;
					}
					.icon3{
						background: url(../../../../assets/images/yunpos/behavioranalysis/third.png) no-repeat;
						background-size: 0.16rem 0.16rem;
					}
				}
			}
		}
	}
</style>