<template>
	<div class="bottomRight">
		<div class="oneLine" v-for="(item,index) in boxData" v-bind:class="{'second':index==1}">
			<div class="lineTitle">{{title[index]}}</div>
			<div class="brand">{{brand[index]}}</div>
			<div class="clear"></div>
			<div class="content" v-for="(value,i) in boxData[index]" v-bind:class="{'first':i==0}">
				<div class="value" 
					v-bind:class="{'text':i == 2,'blue':i==0,'green':i==1,'red':i==2,'orange':i==3}">
					<figureFormat format="small-decimal" :strValue=value[0]></figureFormat> 
					<span class="percent" v-if="i==3">%</span>
				</div>
				<div class="name">{{value[1]}}</div>
			</div>
			<div class="clear"></div>
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
			title:[
				'主销规格市场指标',
				'护卫规格市场指标',
			],
			brand:[],
			boxData:[]
		}
	},
	components: {
		figureFormat,
	},
	methods: {
		getData:function(){
			var self = this;
			axios.get('/brandmarket/getSalesIndicator').then(function(res){
				self.brand = res.data.brand;
				self.boxData = res.data.boxData;
			})
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
	.bottomRight{
		float: right;
		-moz-box-shadow: 0 0 0.1rem 0.05rem rgba(63,169,245,0.4) inset;
		box-shadow:0 0 0.1rem 0.05rem rgba(63,169,245,0.4) inset;
		padding: 0.15rem 0rem 0.18rem 0.15rem;
		width: 3.75rem;
		margin-top: 0.18rem;
		.oneLine{
			margin-top: 0.08rem;
			.lineTitle{
				float: left;
				font-size: 0.18rem;
				color: #fff;
				font-weight: bolder;
			}
			.brand{
				float: left;
				font-size: 0.17rem;
				color: #3FA9F5;
				font-weight: bolder;
				margin-left: 0.1rem;
			}
			.clear{
				clear: both;
			}
			.content{
				float: left;
				margin-left: 0.1rem;
				margin-top: 0.17rem;
				width: 0.83rem;
				text-align:center;
				.value{
					padding: 0.15rem 0.05rem;
					font-size: 0.22rem;
					font-weight: bolder;
					.percent{
						font-size: 0.15rem;
						float: right;
						margin-top: 0.07rem;
					}
				}
				.value.text{
					font-size: 0.19rem;
					font-weight: bolder;
					padding: 0.17rem 0.1rem;
				}
				.blue{
					background: rgba(63,169,245,0.5);
				}
				.green{
					background: rgba(66,248,66,0.5);
				}
				.red{
					background: rgba(251,66,66,0.5);
				}
				.orange{
					background: rgba(247,147,30,0.5);
				}
				.name{
					text-align: center;
					font-size: 0.12rem;
					margin-top: 0.12rem
				}
			}
			.content.first{
				margin-left: 0rem;
			}
		}
		.oneLine.second{
			margin-top: 0.37rem;
		}
	}
</style>