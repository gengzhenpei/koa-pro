<template>
	<div id="Main">
		<div class="sep20"></div>
		<div class="box">
			<div class="header">
				<a href="/">V2EX</a> <span class="chevron">&nbsp;›&nbsp;</span> 登录 &nbsp;
				<li class="fa fa-lock"></li>
			</div>
			<div class="message" onclick="$(this).slideUp('fast');">
				<li class="fa fa-exclamation-triangle"></li>&nbsp; 你要查看的页面需要先登录</div>
			<div class="cell">
				<form>
					<table cellpadding="5" cellspacing="0" border="0" width="100%">
						<tbody>
							<tr>
								<td width="120" align="right">用户名</td>
								<td width="auto" align="left">
									<input v-model="form.email" type="text" class="sl" autofocus="autofocus" autocorrect="off" spellcheck="false" autocapitalize="off" placeholder="用户名或电子邮件地址">
								</td>
							</tr>
							<tr>
								<td width="120" align="right">密码</td>
								<td width="auto" align="left">
									<input v-model="form.password" type="password" class="sl" autocorrect="off" spellcheck="false" autocapitalize="off"></td>
							</tr>
							<!--<tr>
								<td width="120" align="right">你是机器人吗？</td>
								<td width="auto" align="left">
									<img id="captcha-image" width="320" height="80" src="/_captcha" alt="CAPTCHA" onclick="refreshCaptcha()">
									<div class="sep10"></div>
									<input type="text" class="sl" name="b07df2df80564ea4aea0c3623d50026f94f4ec896a5218e84a1efdf7575cad88" value="" autocorrect="off" spellcheck="false" autocapitalize="off" placeholder="请输入上图中的验证码，点击可以更换图片">
								</td>
							</tr>-->
							<tr>
								<td width="120" align="right"></td>
								<td width="auto" align="left">
									<input type="hidden" value="25087" name="once">
									<input @click="loginFun()" class="super normal button" value="登录">
								</td>
							</tr>
							<tr>
								<td width="120" align="right"></td>
								<td width="auto" align="left">
									<a href="/forgot">我忘记密码了</a>
								</td>
							</tr>
						</tbody>
					</table>
					<input type="hidden" value="https://www.v2ex.com/t/918655" name="next">
				</form>
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
				form: {
					email: '',
					password: '',
					username: '',
				},
				rules_form: {
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
				} = await login(this.form)
				if(code == 200) {
					let token = data.token;
					console.log('token', token)
					localStorage.setItem('token', token)
					let user_info = data;
					localStorage.setItem('user_info', JSON.stringify(user_info))
					window.location.href = '/'
				} else {
					console.log("服务器异常");
				}
			},
			google_login() {
				var googleuser = {};
				gapi.load('auth2', function() {
					// retrieve the singleton for the googleauth library and set up the client.
					auth2 = gapi.auth2.init({
						client_id: '申请得到的客户端id', //客户端id
						cookiepolicy: 'single_host_origin',
						scope: 'profile' //可以请求除了默认的'profile' and 'email'之外的数据
					});
					this.attachsignin(document.getelementbyid('google_button')); //点击google登录的按钮
				});

			},
			attachsignin(element) {
				auth2.attachclickhandler(element, {},
					function(googleuser) {
						var profile = auth2.currentuser.get().getbasicprofile();
						console.log('id: ' + profile.getid());
						console.log('full name: ' + profile.getname());
						console.log('given name: ' + profile.getgivenname());
						console.log('family name: ' + profile.getfamilyname());
						console.log('image url: ' + profile.getimageurl());
						console.log('email: ' + profile.getemail());
					},
					function(error) {
						console.log(json.stringify(error, undefined, 2));
					});
			}
		},
	}
</script>
<style lang="scss" scoped>
	.message {
		padding: 10px;
		font-size: 14px;
		line-height: 120%;
		text-align: left;
		background-color: #f3faff;
		border-left: 5px solid #c7e8ff;
		border-bottom: 1px solid var(--box-border-color);
		color: #333;
		cursor: pointer;
	}
	
	.fa-exclamation-triangle:before,
	.fa-warning:before {
		content: "\f071";
	}
	
	td {
		padding: 5px;
	}
</style>