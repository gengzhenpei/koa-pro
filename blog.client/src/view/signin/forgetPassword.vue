<template>
	<div style="height: 100%;">
		<div class="signin-container" id="signin-vue">
			<div class="box">
				<div class="d-flex flex-column align-items-center">
					<div class="title">{{'重置密码'}}</div>
					<hr>
					<template>
						<el-form ref="phone_form" :model="phone_form" label-width="80px" class="my_form">
							<el-form-item label="手机号" style="margin-bottom: 0px;">
								<el-input v-model="phone_form.phone" placeholder="请输入手机号"></el-input>
								<div class="" style="display: flex;justify-content: space-between;">
									<div class="">
									</div>
									<div class="">
										<el-button @click="toggleMetthods" type="text" style="padding: 0px;">切换为邮箱验证</el-button>
									</div>
								</div>
							</el-form-item>
							<el-form-item label="验证码">
								<div class="" style="display: flex;">
									<el-input v-model="phone_form.code" placeholder="请输入密码" style="margin-right: 20px;"></el-input>
									<!--<el-button type="primary" @click="sendCodeFun">获取验证码</el-button>-->
									<el-button @click="verifyBtnClick()" :disabled="verifyBtnDisabled">
										<span>获取验证码</span>
										<span v-if="verifyBtnDisabled">{{verifyCodeCount}}s</span>
									</el-button>
								</div>
							</el-form-item>
							<el-form-item label="密码">
								<el-input v-model="phone_form.new_password" placeholder="请输入密码"></el-input>
							</el-form-item>
							<el-form-item label="密码">
								<el-input v-model="phone_form.new_password2" placeholder="请输入密码"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="resetpwdPhoneFun" style="width: 100%;">确定</el-button>
							</el-form-item>
						</el-form>
					</template>
					<!--<template v-else>
						<el-form ref="email_form" :model="email_form" label-width="80px" class="my_form">
							<el-form-item label="账号">
								<el-input v-model="email_form.username" placeholder="请输入手机号/邮箱/用户名"  class="w260"></el-input>
							</el-form-item>
							<el-form-item label="密码">
								<el-input v-model="email_form.password" placeholder="请输入密码" class="w260"></el-input>
							</el-form-item>
							<div class="form-check" style="padding-left: 0;">
								<el-checkbox v-model="checked">记住我</el-checkbox>
								<span class="login-type" @click="phoneLogin = !phoneLogin">
								{{phoneLogin ? '密码登录' : '短信验证登录'}}
							</span>
							</div>
							<el-form-item>
								<el-button type="primary" @click="loginPwdFun" style="width: 100%;">立即登录</el-button>
							</el-form-item>
						</el-form>
					</template>-->

					<!--<hr class="signin-hr">-->
					<!--<div class="bottom-row d-flex justify-content-between" style="width: 100%;margin: 20px 20px;">
						<div class="text-left">{{ '没有账号' }}
							<a href="/signup">{{'点击注册' }}</a>
						</div>
						<div class="text-right">{{ '已有账号' }}
							<a href="#">{{ '忘记密码？' }}</a>
						</div>
					</div>-->
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import {
		sendCode,
		resetpwdPhone,
	} from '@/api/login.js'

	export default {
		name: 'Layouts',
		data() {
			return {
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				email_form: {
					username: '',
					password: '',
				},
				phone_form: {
					phone: '',
					code: '',
					new_password: '', 
					new_password2: '',
				},
				oldLayout: '',
				banners: [],
				phoneLogin: false,
				checked: false,
				
				verifyCodeCount: 60,
				verifyBtnDisabled: false,
				clearId: null,

			}
		},
		created() {},
		methods: {
			toggleMetthods() {
				
			},
			//修改密码
			async resetpwdPhoneFun() {
				const {
					data,
					code
				} = await resetpwdPhone(this.phone_form)
				if(code==200) {
					this.$message({
						message: '密码重置成功',
						type: 'success'
					});
					this.$router.push({
						path: '/login',
					})
				}
			},
			async loginCodeFun() {
				const {
					data,
					code
				} = await loginCode(this.phone_form)
			},
			//发送验证码
			async sendCodeFun() {
				const {
					data,
					code
				} = await sendCode({
					phone: this.phone_form.phone,
					type: 1, //1：登录重置密码模版 2：通用模版
				})
				if(code==200) {
					this.$message({
						message: '发送成功',
						type: 'success'
					});
				}
			},
			//点击获取手机验证码
			verifyBtnClick() {
				let _this = this;
				if(!this.phone_form.phone) {
					this.$message({
						message: '请填写手机号！',
						type: 'error'
					});
					return false;
				}
				this.sendCodeFun()
				this.verifyBtnDisabled = true;
				this.clearId = setInterval(function() {
					if(_this.clearId && _this.verifyCodeCount == 0) {
						_this.verifyBtnDisabled = false;
						clearInterval(_this.clearId)
						return false;
					}
					_this.verifyCodeCount--;
				}, 1000)
			},
		},
	}
</script>

<style scoped>
	.signin-container {
		height: 100%!important;
	}
	
	.form-check {
		justify-content: space-between;
		margin-bottom: 10px;
	}
	
	hr {
		color: #9d9ea35c!important;
	}
	
	.my_form {
		padding: 20px 0;
	}
	
	.w260 {
		width: 260px;
	}
</style>