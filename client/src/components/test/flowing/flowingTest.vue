<template>
	<div class="page">
		<el-row>
		  <el-col :span="12">
		  	<div class="grid-content new" ref="newBox">
		  		<el-card :body-style="{ padding: '0px' }">
			      <img :src="newPersonUrl" class="image">
			      <div style="padding: 14px;">
			        <span>一个新的面部照片</span>
			      </div>
			    </el-card>
		  	</div>
		  </el-col>
		  <el-col :span="12">
		  	<el-row>
		  		<template v-if="status == 1">
		  			正在识别一张新照片
		  		</template>
		  		<template v-else-if="status == 2">
		  			<div class="grid-content target">
				  		<el-card :body-style="{ padding: '0px' }">
					      <img :src="targetPersonUrl" class="image">
					      <div style="padding: 14px;">
					        <span>识别出的个体照片</span>
					      </div>
					    </el-card>
			  		</div>
		  		</template>
		  		<template v-else="status == 3">
		  			未识别出近似的个体
		  		</template>
			  	
		  	</el-row>
		  	<el-row>
			  	<div class="sub-face-container" v-for="face in subFaceList">
			  		<div class="sub-face">
			  			<el-card :body-style="{ padding: '0px' }">
					      <img :src="face.url" class="image">
					    </el-card>
			  		</div>
			  	</div>
		  	</el-row>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
	import axios from '@/utils/axios';
	import { Loading } from 'element-ui';
	export default {
		data() {
			return {
				newPersonUrl:"",
				targetPersonUrl:"",
				subFaceList:[],
				index:0,
				status:"1"
			}
		},
		methods: {
			getUrlList: function() {
				var self = this;
				let loading = Loading.service({ fullscreen: true });
				axios.get('/pic/getPicUrlList')
				.then(function(resp) {
					self.urlList = resp.data;
					loading.close();
					self.faceReco();
				})
				.catch(function(err) {
					loading.close();
					console.log(err);
				})
			},
			faceReco: function(){
				var self = this;
				var url = "http://127.0.0.1:3000/images"+self.urlList[self.index];
				self.newPersonUrl = url;
				self.status = 1;
				self.subFaceList = [];
				let param = new URLSearchParams();
				param.append("url", url);
				axios.post('/frs/image/flowing',param).then(function(resp){
					var result = resp.data;
					if(result.success){
						self.status = 2;
						self.targetPersonUrl = result.data.typicalFace.url;
						var personId = result.data.personId;
						self.findSubFace(personId);
					}else{
						self.status = 3;
						setTimeout(function(){
							self.next();
						},2000)
					}
					
				}).catch(function(err){
					console.log(err);
					setTimeout(function(){
						self.next();
					},5000)
				})
			},
			findSubFace:function(personId){
				var self = this;
				let param = new URLSearchParams();
				param.append("personId", personId);
				axios.get('/frs/person/faces?personId='+personId).then(function(resp){
					var result = resp.data;
					self.subFaceList = result.data;
					self.next();
				})
			},
			next:function(){
				var self = this;
				setTimeout(function(){
					self.index ++;
					if(self.index < self.urlList.length){
						self.faceReco();
					}
				},2000)
			}
		},
		created(){
			//
		},
		mounted() {
			this.getUrlList();
		}
	}
</script>

<style lang="scss" scoped>
	.grid-content{
		float:left;
		margin-left:30px;
		&.new{
			width:600px;
			.image{
				width:600px;
			}
		}
		&.target{
			width:400px;
			.image{
				width:400px;
			}
		}
	}
	.sub-face-container{
		.sub-face{
			float:left;
			margin-top:30px;
			margin-left:30px;
			width:200px;
			.image{
				width:200px;
			}
		}
	}
	
</style>