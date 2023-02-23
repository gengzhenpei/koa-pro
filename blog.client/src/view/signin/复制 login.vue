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
	import {
		login,
	} from '@/api/auth.js'
	export default {
		name: 'Layouts',
		data() {
			return {
				email_form: {
					email: '',
					password: '',
					username: '',
				},
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
			}
		},
		created() {},
		methods: {
			//登录
			async loginFun() {
				const {
					code,
					error_code,
					data,
					msg
				} = await login(this.email_form)
				if(code == 200) {
					let token = data.token;
					console.log('token', token)
					localStorage.setItem('token', token)
					this.$router.push({
						path: '/'
					})
				} else {
					console.log("服务器异常");
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.p_item {
		margin: 10px 0;
	}
</style>