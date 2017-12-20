<template>
	<div class="tagBall" id="tagsList">
		<a href='#' v-for="item in tagdata">{{item}}</a>
	</div>
</template>

<script>
	import tag from './tools/tags.js';
	export default {
		props:{
			isLoading : Boolean,
			tagdata : Array
		},
		data() {
			return {
				tags:[]
			}
		},
		methods: {

		},
		mounted() {
			
		},
		beforeDestroy() {
			
		},
		watch:{
			isLoading:function(newVal,oldVal){
				this.tags = this.tagdata;
				if(newVal){
					setTimeout(function(){
						tag.initGraph();
					},100);
				}else{
					tag.doStop();
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tagBall{
		position:relative; 
		width:3rem; 
		height:1.2rem; 
		margin: auto;
		margin-top: -1.4rem;
		margin-bottom: 0.5rem;
		/*margin-left: -0.3rem;*/
		a {
			position:absolute; 
			color:#3fa9f5; 
			top:0; 
			left:0; 
			font-family: Microsoft YaHei; 
			font-weight:bold; 
			text-decoration:none; 
			padding: 0.03rem 0.06rem; 
		}
		a:hover { 
			color:#3fa9f5; 
			letter-spacing:0.02rem;
		}
	}
</style>