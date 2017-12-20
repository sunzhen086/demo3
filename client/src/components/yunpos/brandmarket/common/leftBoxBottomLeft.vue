<template>
	<div class="bottomLeft">
		<div class="title">{{title}}</div>
		<div class="content">
			<div class="oneLine" v-for="(item,index) in upData" v-bind:class="{'first':index==0}">
				<span class="up"></span>&nbsp;&nbsp;
				{{item}}
			</div>
			<div class="oneLine" v-for="(item,index) in balanceData" v-bind:class="{'first':index==0}">
				<span class="balance"></span>&nbsp;&nbsp;
				{{item}}
			</div>
			<div class="oneLine" v-for="(item,index) in downData" v-bind:class="{'first':index==0}">
				<span class="down"></span>&nbsp;&nbsp;
				{{item}}
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
			title:'上升下降趋势',
			upData:[],
			balanceData:[],
			downData:[],
		}
	},
	components: {
		
	},
	methods: {
		getData:function(){
			var self = this;
			axios.get('/brandmarket/getSalesVolumeTrade').then(function(res){
				self.upData = res.data.upData;
				self.downData = res.data.downData;
				self.balanceData = res.data.balanceData;
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
	.bottomLeft{
		float: left;
		-moz-box-shadow: 0 0 0.1rem 0.05rem rgba(63,169,245,0.4) inset;
		box-shadow:0 0 0.1rem 0.05rem rgba(63,169,245,0.4) inset;
		padding: 0.15rem;
		width: 2.1rem;
		margin-top: 0.18rem;
		.title{
			font-size: 0.16rem;
			color: #fff;
			font-weight: bolder;
			padding-left: 0.07rem;
		}
		.content{
			.first{
				margin-top: 0.08rem;
			}
			.oneLine{
				padding: 0.05rem;
				line-height: 0.2rem;
				.up{
					float: left;
					width: 0.21rem;
					height: 0.2rem;
					background: url(../../../../assets/images/yunpos/brandmarket/up.png) no-repeat;
					background-size: 0.21rem 0.2rem;
				}
				.down{
					float: left;
					width: 0.21rem;
					height: 0.2rem;
					background: url(../../../../assets/images/yunpos/brandmarket/down.png) no-repeat;
					background-size: 0.21rem 0.2rem;
				}
				.balance{
					float: left;
					width: 0.21rem;
					height: 0.2rem;
					background: url(../../../../assets/images/yunpos/brandmarket/balance.png) no-repeat;
					background-size: 0.21rem 0.2rem;
				}
			}
		}
	}
</style>