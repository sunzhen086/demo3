<template>
	<div class="leftBox">
		<div class="row">
			<div class="rowicon icon1"></div>
			<div class="rowcontent">
				<div class="rowtitle">{{rowData[0].name}}</div>
				<div class="rownum">
					<figureFormat format="small-decimal" :strValue=rowData[0].value></figureFormat> 
				</div>
			</div>
		</div>
		<div class="row">
			<div class="rowicon icon2"></div>
			<div class="rowcontent">
				<div class="rowtitle">{{rowData[1].name}}</div>
				<div class="rownum">
					<figureFormat format="small-decimal" :strValue=rowData[1].value></figureFormat> 
				</div>
			</div>
		</div>
		<div class="row">
			<div class="rowicon icon3"></div>
			<div class="rowcontent">
				<div class="rowtitle">{{rowData[2].name}}</div>
				<div class="rownum">
					<figureFormat format="small-decimal" :strValue=rowData[2].value></figureFormat> 
				</div>
			</div>
		</div>
		<div class="row">
			<div class="rowicon icon4"></div>
			<div class="rowcontent">
				<div class="rowtitle">{{rowData[3].name}}</div>
				<div class="rownum">
					<figureFormat format="small-decimal" :strValue=rowData[3].value></figureFormat> 
				</div>
			</div>
		</div>
		<div class="row">
			<div class="rowicon icon5"></div>
			<div class="rowcontent">
				<div class="rowtitle">{{rowData[4].name}}</div>
				<div class="rownum">
					<figureFormat format="small-decimal" :strValue=rowData[4].value></figureFormat> 
				</div>
			</div>
		</div>
		<!--<div class="bottomIcon"></div>-->
	</div>
</template>

<script>
	import figureFormat from '../../../tools/figureformat/figure-format.vue';
	import axios from '@/utils/axios';
	export default {
		data() {
			return {
				rowData:[
					{name:'累计交易额',value:"0.00"},
					{name:'累计交易笔数',value:"0.00"},
					{name:'经营品牌个数',value:"0.00"},
					{name:'注册会员',value:"0.00"},
					{name:'入住商户',value:"0.00"}
				]
			}
		},
		methods:{
			getData:function(){
				var self = this;
				axios.get('/realtime/getTotalNumber').then(function(res){
					self.rowData = res.data;
				})
			}
		},
		components: {
			figureFormat
		},
		created:function(){
			this.getData();
		}
	}
</script>

<style lang="scss" scoped>
	.leftBox{
		background: url(../../../../assets/images/yunpos/realtime/leftbox.png) no-repeat;
		background-size: 4.33rem 4.55rem;
		width: 4.33rem;
		height: 4.55rem;
		padding: 0.4rem 0 0 0.6rem;
		margin-top: 1.5rem;
		margin-left: 0.8rem;
		position: absolute;
		z-index: 2;
		.bottomIcon{
			width: 0.8rem;
			height: 0.7rem;
			background: url(../../../../assets/images/yunpos/realtime/leftbox.png) no-repeat;
			background-position-x: -3.50rem;
			background-position-y: -3.24rem;
			position: absolute;
			left: 3.5rem;
			top:3.24rem;
		}
		.row{
			margin-top:0.1rem;
			width: 4rem;
			overflow:hidden;
			.rowicon{
				width: 0.61rem;
				height: 0.61rem;
				float: left;
			}
			.icon1{
				background: url(../../../../assets/images/yunpos/realtime/rowicon1.png) no-repeat;
				background-size: 0.61rem 0.61rem;
			}
			.icon2{
				background: url(../../../../assets/images/yunpos/realtime/rowicon2.png) no-repeat;
				background-size: 0.61rem 0.61rem;
			}
			.icon3{
				background: url(../../../../assets/images/yunpos/realtime/rowicon3.png) no-repeat;
				background-size: 0.61rem 0.61rem;
			}
			.icon4{
				background: url(../../../../assets/images/yunpos/realtime/rowicon4.png) no-repeat;
				background-size: 0.61rem 0.61rem;
			}
			.icon5{
				background: url(../../../../assets/images/yunpos/realtime/rowicon5.png) no-repeat;
				background-size: 0.61rem 0.61rem;
			}
			.rowcontent{
				padding-top:0.12rem;
				float: left;
				margin-left: 0.1rem;
				.rowtitle{
					
				}
				.rownum{
					font-size: 0.24rem;
					color: #3fa9f5;
					padding: 0.08rem 0 0 0;
					font-family: "digifaw";
				}
			}
		}
	}
</style>