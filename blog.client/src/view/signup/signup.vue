<template>
	<div id="Main" class="">
		<div class="sep20"></div>
		<div class="box">
			<div class="header">
				<a href="/">V2EX</a> <span class="chevron">&nbsp;›&nbsp;</span> 注册新用户</div>
			<div class="cell">
				<div class="topic_content markdown_body">
					<p>欢迎来到 V2EX，这里是创意工作者的数字化公共空间。</p>
					<p>你可以通过以下方式注册成为新用户。</p>
					<p>如果你之前已经使用电子邮件注册，那么请从
						<a href="/signin">这里</a> 登入。</p>
				</div>
			</div>
			<div class="dock_area">
				<div class="signup_methods">
					<div class="signup_method" onclick="location.href = '/auth/google?once=11539'">
						<div class="signup_method_icon signup_method_google"></div>
						<div class="signup_method_label">Continue with Google</div>
					</div>

				</div>
			</div>
		</div>
		<div class="sep20"></div>
	</div>
</template>
<script>
	import dateFormat from "../../common/dateFormat";
	import utils from "../../common/utils";
	import {
		getArticle,
	} from '@/api/article.js'
	import {
		getCategory,
	} from '@/api/category.js'
	export default {
		data() {
			return {
				articleList: [],
				category_list: [],
				query: {
					page: 1,
					page_size: 10,
					category_id: '',
					status: 1,
					keyword: '',
				},
				queryCategery: {
					page: 1,
					page_size: 10,
					id: '',
					status: 1,
					name: '',
				},
				cur_category_id: '',
			};
		},
		created() {
			this.getData();
			this.cur_category_id = this.$route.query.tab;
			if(this.cur_category_id) {
				this.query.category_id = this.cur_category_id;
			}
		},
		mounted() {
			document.title = "时刻点官网";

			this.nav = [];
			var index = {
				path: "/index",
				name: "index",
				title: "修改邮箱",
			};
			this.nav.push(index);
			//获取真实ip
			console.log(window.returnCitySN)
		},
		methods: {
			async getData() {
				await this.getCategoryFun()
				await this.getArticleFun()
			},
			async getCategoryFun() {
				const {
					code,
					error_code,
					data,
					msg
				} = await getCategory(this.queryCategery)
				if(code == 200) {
					this.category_list = data.data;
					if(!this.query.category_id) {
						this.cur_category_id = data.data[0].id;
						this.query.category_id = this.cur_category_id;
					}
				}
			},
			async getArticleFun() {
				const {
					code,
					error_code,
					data,
					msg
				} = await getArticle(this.query)
				if(code == 200) {
					this.articleList = data.data;
				}
			},
		},

	};
</script>

<style scoped>
	.signup_methods {
		display: flex;
		flex-direction: column;
		align-content: space-around;
		padding: 15px;
	}
	
	.signup_method {
		transition: box-shadow .4s ease, background-color .4s ease, color .4s ease;
		text-decoration: none;
		display: block;
		margin: 15px auto;
		padding: 10px;
		background-color: #fff;
		border-radius: 52px;
		min-width: 210px;
		line-height: 100%;
		display: flex;
		box-shadow: 0 1px 2px rgb(0 0 0 / 5%);
	}
	
	.signup_method_google {
		background-image: url(~@/static/img/social_google.png);
		background-size: 32px 32px;
		background-repeat: no-repeat;
	}
	
	.signup_method_icon {
		background-color: transparent;
		display: inline-block;
		width: 32px;
		height: 32px;
	}
	
	.signup_method_label {
		font-size: 16px;
		height: 32px;
		line-height: 32px;
		padding-left: 0.8em;
		color: #000;
	}
</style>