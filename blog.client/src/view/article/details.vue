<template>
	<div>
		<div class="skd-body">
			<template v-if="article.id">
				<div class="skd-content">
					<h2 class="skd-ellipsis">{{article.title}}</h2>
					<div class="tag">
						<template v-for="item in article.classify">
							<Tag checked color="green" v-if="article.classify">{{item}}</Tag>
						</template>
					</div>
					<div class="message">
						<small class="gray">
							<a href="/member/tianlan">{{article.user_info.username}}</a> · <span :title="article.created_at">{{article.created_at}}</span> · {{article.browse}} 次点击 &nbsp; 
						</small>
						<!--<span>{{article.created_at || '--'}}</span>
						<span>
							<Icon type="ios-book-outline" size="20" class="book"></Icon>
							{{article.browse}}
						</span>-->
					</div>
					<div class="quill-editor ql-container ql-snow no-b">
						<div class="ql-editor" v-html="article.content"></div>
					</div>
				</div>
			</template>
			<template v-else>
				<div class="noDetails">
					哦！<span class="un404"> 404 </span> (ー`´ー)
				</div>
			</template>
			<div class="sep20"></div>
			<!--评论-->
			<div class="box">
				<div class="cell">
					<span class="gray">29 条回复 &nbsp;<strong class="snow">•</strong> &nbsp;2023-02-21 23:52:13 +08:00</span>
					<div class="fr" style="margin: -3px -5px 0px 0px;">
						<a href="/tag/Java" class="tag">
							<li class="fa fa-tag"></li> Java</a>
						<a href="/tag/架构" class="tag">
							<li class="fa fa-tag"></li> 架构</a>
						<a href="/tag/技术" class="tag">
							<li class="fa fa-tag"></li> 技术</a>
						<a href="/tag/大数据" class="tag">
							<li class="fa fa-tag"></li> 大数据</a>
					</div>
				</div>
				<div v-for="(item, index) in comment_list" class="cell">
					<table cellpadding="0" cellspacing="0" border="0" width="100%">
						<tbody>
							<tr>
								<td width="48" valign="top" align="center"><img src="https://cdn.v2ex.com/avatar/bf97/05f1/44412_normal.png?m=1557909764" class="avatar" border="0" align="default" alt="tommyzhang"></td>
								<td width="10" valign="top"></td>
								<td width="auto" valign="top" align="left">
									<div class="fr">
										<div id="thank_area_12722527" class="thank_area">
											<a href="#;" onclick="if (confirm('确认要不再显示来自 @tommyzhang 的这条回复？')) { ignoreReply(12722527, '39705'); }" class="thank" style="color: #ccc;">隐藏</a> &nbsp; &nbsp;
											<a href="#;" onclick="if (confirm('确认花费 10 个铜币向 @tommyzhang 的这条回复发送感谢？')) { thankReply(12722527); }" class="thank">感谢回复者</a>
										</div> &nbsp;
										<a href="#;" onclick="replyOne('tommyzhang');"><img src="/static/img/reply_neue.png" align="absmiddle" border="0" alt="Reply" width="20"></a> &nbsp;&nbsp; <span class="no">1</span></div>
									<div class="sep3"></div>
									<strong><a href="/member/tommyzhang" class="dark">{{item.user_info.username}}</a></strong> &nbsp;
									<div class="badges"></div>&nbsp; &nbsp;<span class="ago" :title="item.created_at">{{item.created_at}}</span>
									<div class="sep5"></div>
									<div class="reply_content">{{item.content}}</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<!--添加评论-->
			<div class="sep20"></div>
			<div class="box" id="reply-box">
				<div class="cell flex-one-row">
					<div>添加一条新回复</div>
					<div>
						<a href="javascript:undockReplyBox();" id="undock-button" style="display: none;">取消回复框停靠</a> &nbsp; &nbsp;
						<a href="#" onclick="goTop()">回到顶部</a>
					</div>
				</div>
				<div class="cell">
					<form>
						<textarea v-model="form.content" name="content" maxlength="10000" class="mll" id="reply_content" onfocus="setReplyBoxSticky();" style="overflow: hidden; overflow-wrap: break-word; resize: none; height: 112px;"></textarea>
						<div class="flex-one-row" style="margin-top: 10px;">
							<input @click="submitReply" value="回复" class="super normal button">
							<input type="hidden" value="39705" id="once" name="once">
							<span class="gray">请尽量让自己的回复能够对别人有帮助</span>
						</div>
					</form>
				</div>
				<div class="cell flex-row-end">
					<a href="/">← V2EX</a>
				</div>
			</div>
		</div>
		<keep-alive>
			<vmenu class="skd-recommend-lsit"></vmenu>
		</keep-alive>
	</div>
</template>

<script>
	import axios from '../../common/httpUtils'
	import api from '../../api/index'
	import CONSTS from '../../common/consts'
	import dateFormat from '../../common/dateFormat'
	import path from "../../common/navData.js"
	import reA from "../../components/recommendArticle.vue"
	import Vmenu from '../../components/menu.vue'
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'
	import {
		detail,
	} from '@/api/article.js'
	import {
		getCommentTargetList,
		postComment,
	} from '@/api/comment.js'

	export default {
		components: {
			reA,
			Vmenu
		},
		data() {
			return {
				article: '',
				nav: path.currentPath,
				query: {
					is_user: 1,
				},
				form: {
					article_id: '',
					content: '',
					
				},
				comment_list: [],
			}
		},
		created() {
			if(this.$route.params.id) {
				this.form.article_id = this.$route.params.id
			}
			this.Detail()
			var index = {
				path: "",
				name: "index",
				title: "文章详情"
			}
			this.nav.push(index)
			this.getCommentTargetListFun();
		},
		mounted() {},
		methods: {
			//提交评论
			async submitReply() {
				var self = this;
				const {
					data,
					code,
					msg
				} = await postComment(this.form)
				if(code == 200) {
					
				} else {
					console.log("服务器异常");
				}
			},
			//详情
			async Detail() {
				var self = this;
				const {
					data,
					code,
					msg
				} = await detail(this.$route.params.id)
				if(code == 200) {
					self.article = data;
					document.title = data.title || '404从你的全世界路过！';
					if(self.article.classify) {
						self.article.classify = data.classify.split(',')
					}
					self.article.create_time = dateFormat.dateFormat(data.create_time * 1000, 'yyyy-MM-dd hh:mm:ss')
				} else {
					console.log("服务器异常");
				}
			},
			// 获取关联目标下的评论列表
			async getCommentTargetListFun() {
				var self = this;
				const {
					data,
					code,
					msg
				} = await getCommentTargetList(this.query)
				if(code == 200) {
					self.comment_list = data.data
				} else {
					console.log("服务器异常");
				}
			},
		},

	}
</script>

<style type="text/css">
	.message {
		height: 44px;
		line-height: 44px;
		color: #bbb;
		border-bottom: 1px solid #dbdbdb;
	}
	/*.message span:nth-child(2) {
		float: right;
		font-size: 20px;
	}*/
	
	.book {
		font-size: 16px;
		margin-right: 5px;
	}
	
	.tag {
		display: flex;
		float: right;
		margin-top: -42px;
		margin-right: 5px;
	}
	
	.tag>li {
		opacity: .15;
	}
	/*编译器的样式修改*/
	
	.no-b {
		border: 0 !important;
	}
	
	.ql-container {
		font-size: 14px;
	}
	
	.ql-snow .ql-editor pre.ql-syntax {
		background-color: #EFEFEF;
		color: #4F4F4F;
	}
	
	.noDetails {
		height: 404px;
		line-height: 404px;
		font-size: 40px;
		margin-bottom: 20px;
		text-align: center;
		background: #fff;
	}
	
	.un404 {
		font-size: 80px;
		color: #ed3f14;
	}
	
	.box {
		background-color: var(--box-background-color);
		border-radius: var(--box-border-radius);
		box-shadow: 0 2px 3px rgb(0 0 0 / 10%);
		border-bottom: 1px solid var(--box-border-color);
	}
	
	.fa {
		display: inline-block;
		font: normal normal normal 14px/1 FontAwesome;
		font-size: inherit;
		text-rendering: auto;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	.fa-tag:before {
		content: "\f02b";
	}
	
	a:active,
	a:link,
	a:visited {
		color: var(--link-color);
		text-decoration: none;
		word-break: break-word;
	}
	
	.cell>table,
	.inner>table {
		table-layout: fixed;
	}
	
	.ago {
		font-size: 11px;
		color: var(--color-fade);
		cursor: pointer;
	}
	
	.reply_content {
		font-size: 14px;
		line-height: 1.6;
		color: var(--box-foreground-color);
		word-break: break-word;
	}
	
	.fr {
		float: right;
		text-align: right;
	}
	
	.badges {
		display: inline-flex;
		cursor: default;
	}
	
	
	
	.mll {
		border-radius: 3px;
		padding: 5px;
		font-size: 14px;
		border: 1px solid #ccc;
		display: block;
		width: 100%;
		height: 8em;
		overflow-y: auto;
		font-family: helvetica neue, luxi sans, Tahoma, hiragino sans gb, microsoft yahei, sans-serif, apple logo;
		resize: vertical;
		box-sizing: border-box;
	}
</style>