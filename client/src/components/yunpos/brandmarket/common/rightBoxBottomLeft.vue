<template>
	<div class="bottomLeft">
		<div class="hiddenPart" v-bind:class="{'hide':hide}">
			<div class="title">{{title}}</div>
			<div class="content" v-for="(item,index) in data" v-bind:class="{'first':index==0}">
				<div class="value" v-bind:class="{'blue':index == 0,'green':index == 1}">
					<span class="mark">￥</span>
					<figureFormat format="small-decimal" :strValue=item[0]></figureFormat> 
				</div>
				<div class="name">
					{{item[1]}}
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
		index:Number
	},
	data() {
		return {
			title:'零售价格对比',
			data:[
				['221.00','玉溪（软）'],
				['158.00','南京（炫赫门）']
			],
			hide:false,
		}
	},
	components: {
		figureFormat
	},
	methods: {
		getData:function(id){
			var self = this;
			var params = {id:id};
			axios.get('/brandmarket/getPriceContrast',{params:params}).then(function(res){
				self.data = res.data;
			})
		}
	},
	created(){

	},
	mounted() {

	},
	beforeDestroy(){
		
	},
	watch:{
		index:function(newVal,oldVal){
			this.getData(newVal);
			this.hide = true;
			var self = this;
			setTimeout(function(){
				self.hide = false;
			},200);
		}
	}
}
</script>

<style lang="scss" scoped>
	.bottomLeft{
		color:#fff;
		margin-top: 0.15rem;
		overflow: hidden;
		.hiddenPart{
			-webkit-transform: translateY(0);
			-moz-transform: translateY(0);
			transform: translateY(0);
			-webkit-transition:0.3s all ease;
			-moz-animation:0.3s all ease;
			transition:0.3s all ease;
			margin-top: 0;
		}
		.hiddenPart.hide{
			margin-top: -1.5rem;
		}
		.title{
			font-size: 0.18rem;
			color: #fff;
			font-weight: bolder;
			padding-bottom:0.1rem;
		}
		.content{
			float: left;
			width: 1.75rem;
			margin-left: 0.1rem;
			.value{
				font-size: 0.4rem;
				font-family: 'digifaw';
				text-align:right;
				padding:0.02rem 0.1rem 0.02rem 0;
				.mark{
					float: left;
					margin-left: 0.4rem;
					margin-top: 0.15rem;
					font-size: 0.2rem;
					font-weight: bolder;
					font-family: "微软雅黑";
				}
			}
			.blue{
				background:rgba(63,169,245,0.6);
			}
			.green{
				background:rgba(13,255,164,0.6);
			}
			.name{
				color:rgba(255,255,255,0.7);
				font-size: 0.1rem;
				margin-top: 0.08rem;
			}
		}
		.content.first{
			margin-left: 0;
		}
	}
</style>