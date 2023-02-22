<template>
	<div id="Main">
		<div class="sep20"></div>
		<div class="box" id="box">
			<div class="cell flex-one-row">
				<div class="breadcrumb">
					<a href="/">V2EX</a><span class="chevron">›</span><span>创作新主题</span>
				</div>
				<div>
					<div class="fade" id="content_remaining">19995</div>
				</div>
			</div>
			<form id="compose">
				<div class="cell" style="padding: 0;">
					<textarea v-model="form.title" class="new-title-input" tabindex="1" rows="1" maxlength="120" id="topic_title" name="title" autofocus="autofocus" placeholder="请输入主题标题，如果标题能够表达完整内容，则正文可以为空" style="font-size: 16px; line-height: 100%; overflow: hidden; overflow-wrap: break-word; height: 36px;"></textarea>
				</div>
				<div class="cell flex-one-row" style="padding-bottom: 0; padding-top: 0;">
					<div class="tab-alt-container flex-one-row">
						<a class="tab-alt active" href="javascript:continueToWrite()" id="tab-write">正文</a>
						<a class="tab-alt" href="javascript:previewInPage()" id="tab-preview">预览</a>
					</div>
					<div id="syntax-selector">
						<div id="syntax-label">Syntax</div>
						<div class="radio-group">
							<input type="radio" id="syntax-default" name="syntax" value="default"><label for="syntax-default">V2EX 原生格式</label>
							<input type="radio" id="syntax-markdown" name="syntax" value="markdown" checked=""><label for="syntax-markdown">Markdown</label>
						</div>
						<div id="syntax-help">
							&nbsp;
							<a href="/help/markdown" target="_blank"><i class="fa fa-info-circle"></i></a>
						</div>
					</div>
				</div>
				<div class="cell" id="preview" style="display: none;">
					<div class="topic_content markdown_body">
						<p>发的啥地方</p>
					</div>
				</div>
				<div id="workspace" style="">
					<textarea v-model="content" style="" maxlength="20000" id="editor" name="content"></textarea>
					<!--<div class="CodeMirror cm-s-default CodeMirror-wrap">
						<div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 4px; left: 105.062px;">
							<textarea autocorrect="off" autocapitalize="off" spellcheck="false" style="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; outline: none;" tabindex="2"></textarea>
						</div>
						<div class="CodeMirror-vscrollbar" cm-not-content="true">
							<div style="min-width: 1px; height: 0px;"></div>
						</div>
						<div class="CodeMirror-hscrollbar" cm-not-content="true">
							<div style="height: 100%; min-height: 1px; width: 0px;"></div>
						</div>
						<div class="CodeMirror-scrollbar-filler" cm-not-content="true"></div>
						<div class="CodeMirror-gutter-filler" cm-not-content="true"></div>
						<div class="CodeMirror-scroll" tabindex="-1">
							<div class="CodeMirror-sizer" style="margin-left: 30px; margin-bottom: -17px; border-right-width: 13px; min-height: 24px; padding-right: 0px; padding-bottom: 0px;">
								<div style="position: relative; top: 0px;">
									<div class="CodeMirror-lines">
										<div style="position: relative; outline: none;">
											<div class="CodeMirror-measure"><span><span>&#8203;</span>x</span>
											</div>
											<div class="CodeMirror-measure"></div>
											<div style="position: relative; z-index: 1;"></div>
											<div class="CodeMirror-cursors" style="">
												<div class="CodeMirror-cursor" style="left: 75.0625px; top: 0px; height: 16px;">&nbsp;</div>
											</div>
											<div class="CodeMirror-code">
												<div style="position: relative;">
													<div class="CodeMirror-gutter-wrapper" style="left: -30px;">
														<div class="CodeMirror-linenumber CodeMirror-gutter-elt" style="left: 0px; width: 21px;">1</div>
													</div>
													<pre class=" CodeMirror-line "><span style="padding-right: 0.1px;">发的啥地方</span></pre>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div style="position: absolute; height: 13px; width: 1px; border-bottom: 0px solid transparent; top: 24px;"></div>
							<div class="CodeMirror-gutters" style="height: 37px;">
								<div class="CodeMirror-gutter CodeMirror-linenumbers" style="width: 29px;"></div>
							</div>
						</div>
					</div>-->
				</div>
				<div class="cell" style="display: flex; align-items: center;">
					<div style="margin-right: 5px;">主题节点</div>
					<select v-model="form.category_id" name="node_name" id="nodes" data-select2-id="select2-data-nodes" tabindex="-1" class="select2-hidden-accessible" aria-hidden="true">
						<option data-select2-id="select2-data-2-nm39"></option>
						<option value="qna" title="问与答" data-select2-id="select2-data-3-mw5g">问与答 / qna</option>
					</select>
					<span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="select2-data-1-j2g8" style="width: 320px;">
						<span class="selection">
							<span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-nodes-container" aria-controls="select2-nodes-container">
								<span class="select2-selection__rendered" id="select2-nodes-container" role="textbox" aria-readonly="true" title="请选择一个节点">
							<span class="select2-selection__placeholder">请选择一个节点</span>
					</span>
					<span class="select2-selection__arrow" role="presentation">
						<b role="presentation"></b>
					</span>
					</span>
					</span>
					<span class="dropdown-wrapper" aria-hidden="true"></span>
					</span>
					<div style="margin-left: auto;">
						<a href="/help/node" target="_blank">V2EX 节点使用说明</a> <i class="fa fa-external-link gray"></i>
					</div>
				</div>
				<input type="hidden" name="content" value="" id="topic_content">
				<input type="hidden" name="once" id="once" value="75751">
			</form>
			<div class="cell flex-one-row">
				<button @click="publishTopic()" type="button" class="super normal button">
			<li class="fa fa-paper-plane"></li> &nbsp;发布主题
		</button>
				<span id="error_message"></span>
			</div>
		</div>
		<div class="sep20"></div>
	</div>

</template>

<script>
	import { quillEditor } from "vue-quill-editor";
	import "quill/dist/quill.core.css";
	import "quill/dist/quill.snow.css";
	import "quill/dist/quill.bubble.css";
	import axios from "../../common/httpUtils";
	import api from "../../api/index";
	import CONSTS from "../../common/consts";
	import {
		postArticle,
	} from '@/api/article.js'
	import {
		getCategory,
	} from '@/api/category.js'
	export default {
		data() {
			return {
				content: "",
				editorOption: {
					modules: {
						toolbar: "#toolbar",
					},
					placeholder: "请输入内容...",
				},
				classify: "",
				imgUrl: "",
				url: api.UPLOAD_API.UPLOAD_AJXA,
				showContent: false,
				data2: [],
				summary: "", //摘要
				form: {
					title: "",
					email: "",
					classify: [],
					category_id: '',
				},
				ruleValidate: {
					title: [{
						required: true,
						message: "请填写标题！",
						trigger: "blur",
					}, ],
					category_id: [{
						required: true,
						message: "请选择类型！",
						trigger: "change",
					}, ],
				},
				category_list: [],
			};
		},
		mounted() {
			var self = this;
		},
		created() {
			this.getCategory();
		},
		methods: {
			async postArticleFun() {
				console.log('this.form.category_id', this.form.category_id)
				const {
					data,
					code,
					msg
				} = await postArticle({
					title: this.form.title,
					type: 0,
					status: 1,
					content: this.content,
					eemail: this.form.email,
					cover: this.imgUrl,
					summary: this.summary,
					classify: this.form.classify.join(","),
					category_id: this.form.category_id||1,
				})
				if(code == 200) {
					var url = "/article/" + data.id;
					this.$router.push(url);
					this.$Notice.success({
						title: "添加文章成功",
						desc: "感谢你的支持",
					});
				} else {
					console.log("服务器异常");
				}
			},
			//类别列表
			async getCategory() {
				const {
					data,
					code,
					msg
				} = await getCategory()
				if(code == 200) {
					this.category_list = data.data
				} else {
					console.log("服务器异常");
				}
			},
			handleSuccess(res, file) {
				this.$Message.success("file");
				this.imgUrl = res.realName;
				var url = api.IMGURL + res.realName;
				this.editor.focus();
				this.editor.insertEmbed(this.editor.getSelection().index, "image", url);
			},
			handleFormatError(file) {
				this.$Notice.warning({
					title: "文件格式错误",
					desc: "你的" + file.name + "请你选择 jpg ， png，jpeg",
				});
			},
			handleMaxSize(file) {
				this.$Notice.warning({
					title: "文件过大",
					desc: "文件  " + file.name + " 上传文件小于 2M.",
				});
			},
			getContent() {
				this.showContent = true;
			},
			publishTopic(name) {
				this.postArticleFun()
//				this.$refs[name].validate((valid) => {
//					if(valid) {
//						//						this.submitAreicle();
//						this.postArticleFun()
//					} else {}
//				});
			},
			handleSearch2(value) {
				this.data2 = !value || value.indexOf("@") >= 0 ? [] : [
					value + "@qq.com",
					value + "@163.com",
					value + "@126.com",
					value + "@sina.com",
					value + "@gemail.com",
				];
			},
			handleClose(event, name) {
				let index = this.form.classify.indexOf(name);
				this.form.classify.splice(index, 1);
			},
			//			selectChange(value) {
			//				this.form.category_id = value;
			//				this.classify = "";
			//			},
			inputChange() {
				if(!this.classify) return;
				this.form.classify.push(this.classify);
				this.classify = "";
			},
			submitAreicle() {
				console.log('this.form.category_id', this.form.category_id)
				axios({
						method: "post",
						url: api.ARTICLE_API.article_add,
						data: {
							title: this.form.title,
							type: 0,
							status: 0,
							content: this.content,
							eemail: this.form.email,
							cover: this.imgUrl,
							summary: this.summary,
							classify: this.form.classify.join(","),
							category_id: this.form.category_id,
						},
					})
					.then((res) => {
						if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
							var url = "article/" + res.result_data.id;
							this.$router.push(url);
							this.$Notice.success({
								title: "添加文章成功",
								desc: "感谢你的支持",
							});
						} else {
							console.log("服务器异常");
						}
					})
					.catch((err) => {
						console.log("失误：" + err);
					});
			},
		},

	};
</script>

<style scoped>
	@import '../../static/css/codemirror.css';
	.new-title-input {
		width: 100%;
		border: none;
		resize: none;
		background-color: var(--box-background-alt-color);
		outline: 0;
		font-size: 14px;
		line-height: 20px;
		padding: 10px;
		font-family: helvetica neue, hiragino sans gb, microsoft yahei, sans-serif, apple logo;
		margin: 0;
		box-sizing: border-box;
		display: block;
	}
	
	.tab-alt {
		display: block;
		line-height: 100%;
		color: var(--link-color);
		padding: 10px;
		border-bottom: 3px solid transparent;
		text-decoration: none;
		transition: border-color .3s;
	}
	
	.tab-alt.active {
		border-color: var(--box-foreground-color);
	}
	
	#syntax-selector {
		display: inline-flex;
		align-items: center;
	}
	
	#syntax-label {
		font-size: 14px;
		line-height: 100%;
		vertical-align: bottom;
		margin-right: 10px;
	}
	
	.radio-group {
		background-color: #e2e2e2;
		border-radius: 4px;
		padding: 2px;
		font-size: 14px;
		line-height: 100%;
		box-shadow: 0 1px 2px rgba(0, 0, 0, .1) inset;
		display: inline-flex;
	}
	
	.radio-group>input[type=radio] {
		visibility: hidden;
		position: fixed;
		opacity: 0;
		pointer-events: none;
	}
	
	.radio-group>input[type=radio]+label {
		padding: 5px 14px;
		border-radius: 3px;
		box-sizing: border-box;
		line-height: 100%;
		font-size: 14px;
		transition: .25s ease;
	}
	
	.radio-group>input[type=radio]:checked+label {
		background-color: #fff;
		box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
	}
	
	#preview {
		box-sizing: border-box;
		min-height: 301px;
	}
	
	.topic_content {
		font-size: 14px;
		line-height: 1.6;
		color: var(--box-foreground-color);
		word-break: break-word;
	}
	
	.markdown_body>:last-child,
	.note>:last-child,
	.page>:last-child,
	.problem>:last-child {
		margin-bottom: 0!important;
	}
	
	#workspace {
		text-align: left;
		border-bottom: 1px solid #e2e2e2;
		font-size: 14px;
		line-height: 120%;
		min-height: 300px;
	}
	
	#editor {
		position: relative;
		width: 100%;
		height: 300px;
		font-size: 16px;
		line-height: 130%;
	}
	
	#nodes {
		width: 320px;
		font-size: 14px;
	}
	
	.select2-hidden-accessible {
		border: 0!important;
		clip: rect(0 0 0 0)!important;
		-webkit-clip-path: inset(50%)!important;
		clip-path: inset(50%)!important;
		height: 1px!important;
		overflow: hidden!important;
		padding: 0!important;
		position: absolute!important;
		width: 1px!important;
		white-space: nowrap!important;
	}
	
	.select2-container {
		box-sizing: border-box;
		display: inline-block;
		margin: 0;
		position: relative;
		vertical-align: middle;
	}
	
	.select2-container--default.select2-container--open.select2-container--below .select2-selection--multiple,
	.select2-container--default.select2-container--open.select2-container--below .select2-selection--single {
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}
	
	.select2-container--default .select2-selection--single {
		background-color: #fff;
		border: 1px solid #aaa;
		border-radius: 4px;
	}
	
	.select2-container .select2-selection--single {
		box-sizing: border-box;
		cursor: pointer;
		display: block;
		height: 28px;
		user-select: none;
		-webkit-user-select: none;
	}
	
	.select2-container--default .select2-selection--single .select2-selection__rendered {
		color: #444;
		line-height: 28px;
	}
	
	.select2-container .select2-selection--single .select2-selection__rendered {
		display: block;
		padding-left: 8px;
		padding-right: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.select2-container--default .select2-selection--single .select2-selection__placeholder {
		color: #999;
	}
	
	.select2-container--default .select2-selection--single .select2-selection__arrow {
		height: 26px;
		position: absolute;
		top: 1px;
		right: 1px;
		width: 20px;
	}
	
	.select2-container--default.select2-container--open .select2-selection--single .select2-selection__arrow b {
		border-color: transparent transparent #888 transparent;
		border-width: 0 4px 5px;
	}
	
	.select2-container--default .select2-selection--single .select2-selection__arrow b {
		border-color: #888 transparent transparent transparent;
		border-style: solid;
		border-width: 5px 4px 0;
		height: 0;
		left: 50%;
		margin-left: -4px;
		margin-top: -2px;
		position: absolute;
		top: 50%;
		width: 0;
	}
	
	.fa-paper-plane:before,
	.fa-send:before {
		content: "\f1d8";
	}
</style>