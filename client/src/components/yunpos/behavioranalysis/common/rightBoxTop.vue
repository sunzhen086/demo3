<template>
	<div class="boxTop">
		<div class="hiddenPart" 
			v-for="(item,index) in boxData"
			v-bind:class="{'select':selectIndex==index}">
			<div class="tab" 
				v-on:click="changeAction(index)">
				<div class="icon"></div>
				<div class="content">
					<div class="name">{{item.name}}</div>
					<div class="value">
						<figureFormat format="small-decimal" :numValue=item.value></figureFormat><span class="percent">%</span>
					</div>
				</div>
			</div>
			<div class="tab selectTab"
				v-on:click="changeAction(index)">
				<div class="icon"></div>
				<div class="content">
					<div class="name">{{item.name}}</div>
					<div class="value">
						<figureFormat format="small-decimal" :numValue=item.value></figureFormat><span class="percent">%</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import figureFormat from '../../../tools/figureformat/figure-format.vue';
import axios from '@/utils/axios';
export default {
	props:{
		
	},
	data() {
		return {
			selectIndex:2,
			boxData:[],
			panelData:[],
			panelDataIndex:{}
		}
	},
	components: {
		figureFormat,
	},
	methods: {
		changeAction:function(index){
			this.selectIndex = index;
			this.$emit('show-charts',this.panelData[this.selectIndex]);
		},
		getData:function(){
			var self = this;
			axios.get('/behavioranalysis/getAnalyzeData').then(function(res){
				self.boxData = res.data.rightBoxTop;
				self.panelData = res.data.panelData;
				self.panelDataIndex = self.panelData[self.selectIndex];
				self.$emit('show-charts',self.panelDataIndex);
			})
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
	.boxTop{
		padding-left: 0.02rem;
		.hiddenPart{
			float:left;
			overflow: hidden;
			height: 1.55rem;
			.tab{
				margin-top: 0rem;
			}
			.tab.selectTab{
				margin-top: 0.3rem;
			}
		}
		.hiddenPart.select{
			.tab{
				margin-top: -1.75rem;
			}
			.tab.selectTab{
				margin-top: 0.3rem;
			}
		}
		.tab{
			color:#3FA9F5;
			background-color:transparent;
			-moz-box-shadow: 0 0 0.1rem 0.05rem rgba(63,169,245,0.7) inset;
			box-shadow:0rem 0rem 0.1rem 0.05rem rgba(63,169,245,0.7) inset;
			padding:0.15rem 0.2rem;
			cursor: pointer;
			border-bottom:0.04rem solid #42edf8;
			-webkit-transform: translateY(0);
			-moz-transform: translateY(0);
			transform: translateY(0);
			-webkit-transition:0.3s all ease;
			-moz-animation:0.3s all ease;
			transition:0.3s all ease;
			overflow: hidden;
			.icon{
				float: left;
				width: 1.11rem;
				height: 0.82rem;
				margin-top: 0.12rem;
				background: url(../../../../assets/images/yunpos/behavioranalysis/topIcon.png) no-repeat;
				background-size: 1.11rem 0.82rem;
			}
			.content{
				float: left;
				overflow: hidden;
				width:1.2rem;
				.name{
					font-size: 0.24rem;
					line-height: 0.24rem;
					text-align: center;
					padding: 0.1rem 0;
				}
				.value{
					font-family: 'digifaw';
					font-size: 0.6rem;
					line-height: 0.6rem;
					text-align: center;
					margin-left: -0.1rem;
					.percent{
						font-size: 70%;
					}
				}
			}
		}
		.tab.selectTab{
			border-bottom: 0;
			border-top:0.08rem solid #0dffa4;
			margin-top: 1rem;
			box-shadow:none;
			-moz-box-shadow:none;
			.icon{
				background: url(../../../../assets/images/yunpos/behavioranalysis/topIconActive.png) no-repeat;
				background-size: 1.11rem 0.82rem;
			}
			.content{
				.name{
					color: #0DFFA4;
				}
				.value{
					background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(13, 255, 164, 1)), to(rgba(63, 169, 245, 0.8)));
				    -webkit-background-clip: text;
				    -webkit-text-fill-color: transparent;
				}
			}
		}
	}
</style>