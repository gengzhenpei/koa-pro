<template>
	<div>
		<div class="about-container" id="about-container">
			<table width="100%">
				<tr>
					<td id="service-title">
			{{ service_policy }}
						
					</td>
				</tr>
				<tr>
					<td id="service-content">
			{{ service_policy }}
					</td>
				</tr>
			</table>

		</div>
	</div>
</template>

<script>
	import {
		sendCode,
		registerPhone
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

				},
				phone_form: {
					code: '',
					password: '',
					phone: '',
					username: '',
				},
				oldLayout: '',
				banners: [],
				is_email_reg: false,
				checked: false,
			}
		},
		created() {},
		methods: {
			async sendCodeFun() {
				const {
					data,
					code
				} = await sendCode({
					phone: this.phone_form.phone,
					type: 2
				})
			},
		},
	}
</script>

<style lang="scss" scoped>

</style>