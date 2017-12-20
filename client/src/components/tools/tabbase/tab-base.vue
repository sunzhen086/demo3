<template>
	<div class="tabBase">
	  	<div class="tabLeft">
	  		<ul>
	  			<li v-for="(tab,i) in tabData.data" 
	  				v-bind:class="{'selectTab':(index === i)}"
	  				v-on:click="changeAction(i)">
	  				{{tab}}
	  			</li>
	  		</ul>
	  	</div>
	  	<div class="tabRight">
	    	<slot></slot>
	  	</div>
	</div>
</template>

<script>
	export default {
		props:{
			tabData:Object
		},
		data() {
			return {
				index:'',
			}
		},
		methods:{
			changeAction:function(i){
				this.index = i;
				this.$emit("change-action",i);
			}
		},
		mounted() {
			this.index = this.tabData.index;
		},
		watch:{
			tabData:function(newVal,oldVal){
				this.index = newVal.index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabBase{
		background: transparent;
		.tabLeft{
			float: left;
			width: 30%;
			background: rgba(1,1,8,0.2);
			ul{
				li{
					padding: 0.16rem;
					text-align: center;
					border:0.01rem solid rgba(9,36,51,0.8);
					border-right:0;
					cursor: pointer;
				}
				li.selectTab{
					border-top: 0.02rem solid #3FA9F5;
					background: rgba(9,36,51,0.8);
				}
			}
		}
		.tabRight{
			float: left;
			background: rgba(9,36,51,0.8);
			width: 70%;
			border-top:0.02rem solid #3FA9F5;
		}
	}
</style>