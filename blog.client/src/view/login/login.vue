<template>
	<div>
		<div class="signup-container">
			<div class="box">
				<div class="" style="text-align: center;">
					<div class="title" style="margin: 10px 0;font-size: 15px;">登录</div>
					<div class="tab-content">
						<!--邮箱注册-->
						<template>
							<form ref="email_form" :model="email_form" label-width="80px" class="my_form">
								<p class="p_item">
									<label for="">邮箱: </label>
									<input v-model="email_form.email" placeholder="邮箱"></input>
								</p>
								<p class="p_item">
									<label for="">用户名: </label>
									<input v-model="email_form.name" placeholder="请输入用户名"></input>
								</p>
								<p class="p_item">
									<label for="">密码: </label>
									<input v-model="email_form.password" placeholder="请输入密码"></input>
								</p>
								<p class="p_item">
									<label for="">密码: </label>
									<input v-model="email_form.password2" placeholder="请输入密码"></input>
								</p>
								
								<div type="primary" @click="loginFun()" class="w260">登录</div>
							</form>
						</template>
						<div>没有账号？
							<a href="/signup" type="primary">注册</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from '../../common/httpUtils'
	import api from '../../api/index'
	import CONSTS from '../../common/consts'
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
					captcha_id: '',
					email: '',
					password: '',
					name: '',
					captcha_code: '',
				},
				phone_form: {
					code: '',
					password: '',
					password2: '',
					phone: '',
					username: '',
					checked: false,
				},
				oldLayout: '',
				banners: [],
				is_email_reg: false,
				checked: false,
				captcha_image: '',

				verifyCodeCount: 60,
				verifyBtnDisabled: false,
				clearId: null,
				rules_email_form: {
					email: [{
						required: true,
						message: '请输入邮箱',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
				},
				rules_phone_form: {
					phone: [{
						required: true,
						message: '请输入手机号',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					password2: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					checked: [{
						required: true,
						message: 'q',
						trigger: 'change'
					}]
				},
			}
		},
		created() {},
		methods: {
			loginFun() {
				console.log('alllll')
				axios({
					method: 'post',
					url: api.ARTICLE_API.login,
					data: this.email_form
				}).then(res => {
					if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
						let access_token = res.result_data.access_token;
						console.log('access_token', access_token)
						localStorage.setItem('access_token', access_token)
						//						this.articleList = res.result_data;
						//						this.articleList.map(item => {
						//							if(item.classify) {
						//								item.classify = item.classify.split(',')[0];
						//							}
						//							item.create_time = dateFormat.diffTime(item.create_time * 1000)
						//						})
					} else {
						console.log("服务器异常")
					}
				}).catch(err => {
					console.log("失误：" + err);
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.p_item {
		margin: 10px 0;
	}
</style>