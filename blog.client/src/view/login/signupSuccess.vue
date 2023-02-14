<template>
	<div style="height: 100%;">
		<div class="wrapperc" id="feedbacks">
			<div class="content pc">
				<div class="title" id="main_title">
					用户注册
				</div>
				<div class="dividing"></div>
				<img src="../../assets/images/icon-big-success.png" alt="" class="icon" id="icon" style="width: 96px">
				<div class="success" id="success">注册成功</div>
				<div v-if="type=='email_signup'" class="success2" id="success2">
					<span>请在邮箱激活</span>
				</div>
				<div class="btn-group">
					<a href="javascript:void(0)" @click="againSendEmail()" class="leftbtn">重新发送</a>
					<a href="/" class="leftbtn">返回主页</a>
					<!--<a href="{% url 'newsampleowner' %}" id="rightbtn">{% trans '新建检测人'%}</a>-->
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		sendCode,
		loginPwd,
		loginCode,
		emailResend
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
				},
				oldLayout: '',
				banners: [],
				phoneLogin: false,
				checked: false,
				type: '',
				email: '',
			}
		},
		created() {
			this.type = this.$route.query.type
			this.email = this.$route.query.email
			console.log('this.$route.query', this.$route.query)
		},
		methods: {
			//登录
			async loginPwdFun() {
				const {
					data,
					code
				} = await loginPwd(this.email_form)
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
					type: 2
				})
			},
			//重新发送接口
			async againSendEmail() {
				console.log('ssss')
				const {
					data,
					code
				} = await emailResend({
					email: this.email,
				})
				if(code == 200) {
					this.$message({
						message: '邮件发送成功！',
						type: 'success'
					});
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.wrapperc {
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
		display: flex;
		justify-content: center;
		.content.pc {
			width: 1020px;
			height: 590px;
			padding: 40px 0 40px;
			margin: 8px 0 8px;
			display: flex;
			flex-direction: column;
			align-items: center;
			background: white;
			.dividing {
				height: 2px;
				background-color: #f7f7f7;
				width: 100%;
			}
			.title {
				font-size: 20px;
				margin-bottom: 24px;
			}
			.icon {
				margin: 48px 0 32px;
			}
			.success {
				margin-bottom: 64px;
				font-size: 20px;
			}
			.success2 {
				margin-bottom: 64px;
				font-size: 16px;
			}
			.btn-group {
				width: 100%;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				a {
					display: flex;
					align-items: center;
					justify-content: center;
					text-decoration: none;
				}
				#rightbtn {
					margin: 15px 15px;
					width: 220px;
					height: 36px;
					color: white;
					background: #4790DF;
					border: #4790DF 1px solid;
				}
				.leftbtn {
					margin: 15px 15px;
					width: 220px;
					height: 36px;
					color: #4790DF;
					background: white;
					border: #4790DF 1px solid;
				}
			}
		}
	}
	
	.content.mobile {
		width: 100%;
		height: 400px;
		padding: 15px 15px 40px;
		margin: 8px 0 8px;
		display: flex;
		gap: 24px;
		flex-direction: column;
		align-items: center;
		background: white;
		height: calc(100vh - 46px - 15px);
		.dividing {
			min-height: 2px;
			background-color: #f7f7f7;
			width: 100%;
		}
		.title {
			font-size: 20px;
			margin-bottom: 24px;
		}
		.icon {
			margin: 48px 0 32px;
		}
		.success {
			margin-bottom: 64px;
			font-size: 20px;
		}
		.btn-group {
			width: 100%;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			gap: 15px;
			a {
				display: flex;
				align-items: center;
				justify-content: center;
				text-decoration: none;
			}
			#rightbtn {
				width: 165px;
				height: 36px;
				color: white;
				background: #4790DF;
				border: #4790DF 1px solid;
			}
			.leftbtn {
				width: 165px;
				height: 36px;
				color: #4790DF;
				background: white;
				border: #4790DF 1px solid;
			}
		}
	}
</style>