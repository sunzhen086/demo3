<template>
	<div class="bg">
		<div class="loginBox">
			<div class="title">登陆</div>
			<div class="content">
				<div class="nameBox">
					<span class="name">用户名：</span>
					<div class="value">
						<el-input v-model="user"></el-input>
					</div>
				</div>
				<div class="pwdBox">
					<span class="name">密码：</span>
					<div class="value">
						<el-input type="password" v-model="password"></el-input>
					</div>
				</div>
			</div>
			<div class="footer">
				<el-button type="primary" v-on:click="login">登录</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from '@/utils/axios';
	export default {
		data() {
			return {
				user: '',
				password: ''
			}
		},
		methods: {
			login: function() {
				var self = this;
				var user = this.user;
				var password = this.password;
				if(user == '' || password == ''){
					self.$alert('用户名或密码不能为空', '提示', {
			        	confirmButtonText: '确定',
			        	callback: action => {}
			        });
			        return;
				}
				axios.get('/auth', {
					params: {
						userName: user,
						password: password
					}
				}).then(function(response) {
					var res = response.data;
					if(res.authResult == "success") {
						sessionStorage.authStatus = 1;
						sessionStorage.userName = res.data.userName;
						self.$router.push('/');
					} else {
						self.$alert('用户名或密码错误', '提示', {
				        	confirmButtonText: '确定',
				        	callback: action => {}
				        });
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg{
		color: #FFFFFF;
		font-size: 0.14rem;
		font-family: "微软雅黑";
		overflow: hidden;
		background:url(../../../assets/images/yunpos/realtime/mainbg.png) no-repeat;
		background-size: 16rem 9rem;
		position: relative;
		width: 16rem;
		height: 9rem;
		.loginBox{
			position:absolute;
			left:50%;
			top:50%;
			margin-top:-1rem;
			margin-left:-1.5rem;
			border:0.02rem solid #FFFFFF;
			border-radius:0.1rem;
			padding:0.15rem;
			.title{
				font-size: 0.18rem;
				font-weight: bolder;
				/*background: #4db3ff;*/
				padding:0.1rem;
			}
			.content{
				margin-top: 0.15rem;
				overflow: hidden;
				.nameBox{
					margin-top: 0rem;
					overflow: hidden;
				}
				.pwdBox{
					margin-top: 0.1rem;
					overflow: hidden;
				}
				.name{
					float: left;
					width: 0.8rem;
					text-align: right;
					font-size: 0.16rem;
					line-height: 0.36rem;
				}
				.value{
					float: left;
					margin-left: 0.1rem;
				}
			}
			.footer{
				margin-top: 0.15rem;
				float: right;
			}
		}
	}
</style>