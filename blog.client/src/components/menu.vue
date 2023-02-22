/* * 左侧菜单 */

<template>
	<div class="">
		<div class="sep20"></div>
		<div class="box">
			<div class="cell">
				<table cellpadding="0" cellspacing="0" border="0" width="100%">
					<tbody>
						<tr>
							<td width="48" valign="top">
								<a href="/member/gengzhenpei"><img src="https://cdn.v2ex.com/avatar/54c4/4164/526939_large.png?m=1676467824" class="avatar" border="0" align="default" width="48" style="width: 48px; max-height: 48px;" alt="gengzhenpei"></a>
							</td>
							<td width="10" valign="top"></td>
							<td width="auto" align="left">
								<div class="fr">
									<a href="/settings/night/toggle?once=74696" class="light-toggle"><img src="~@/static/img/toggle-light.png" align="absmiddle" height="10" alt="Light"></a>
								</div><span class="bigger"><a href="/member/gengzhenpei">gengzhenpei</a></span>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="sep10"></div>
				<table cellpadding="0" cellspacing="0" border="0" width="100%">
					<tbody>
						<tr>
							<td width="33%" align="center">
								<a href="/my/nodes" class="dark" style="display: block;"><span class="bigger">1</span>
									<div class="sep3"></div><span class="fade">节点收藏</span></a>
							</td>
							<td width="34%" style="border-left: 1px solid rgba(100, 100, 100, 0.4); border-right: 1px solid rgba(100, 100, 100, 0.4);" align="center">
								<a href="/my/topics" class="dark" style="display: block;"><span class="bigger">0</span>
									<div class="sep3"></div><span class="fade">主题收藏</span></a>
							</td>
							<td width="33%" align="center">
								<a href="/my/following" class="dark" style="display: block;"><span class="bigger">0</span>
									<div class="sep3"></div><span class="fade">特别关注</span></a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="cell" id="member-activity">
				<div class="member-activity-bar">
					<div class="member-activity-start" style="width: 14%;"></div>
				</div>
			</div>
			<div class="cell" style="padding: 8px; line-height: 100%;">
				<table cellpadding="0" cellspacing="0" border="0" width="100%">
					<tbody>
						<tr>
							<td width="28">
								<a href="/write"><img src="~@/static/img/essentials/compose.png?v=b9e1f045f4ad639733bf9f6dbc62ed4c" width="28" border="0" style="vertical-align: bottom;"></a>
							</td>
							<td width="10"></td>
							<td width="auto" valign="middle" align="left">
								<a href="/write">创作新主题</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="cell flex-one-row" style="padding: 7px 10px;">
				<a href="/notifications" class="fade">0 条未读提醒</a>
				<div id="money">
					<a href="/balance" class="balance_area" style="">18
						<img src="~@/static/img/silver@2x.png" height="16" alt="S" border="0"> 70
						<img src="~@/static/img/bronze@2x.png" height="16" alt="B" border="0">
					</a>
				</div>
			</div>
		</div>
		<div class="sep20"></div>
		<div class="box">
			<div class="inner">
				<li class="fa fa-gift" style="color: #f90;"></li> &nbsp;
				<a href="/mission/daily">领取今日的登录奖励</a>
			</div>
		</div>
		<div class="sep20"></div>

		<div class="box">
			<div class="inner">
				<span class="f12 gray">我收藏的节点</span>
			</div>
			<div class="inner ui-sortable" id="nodes-sidebar">
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "../common/httpUtils";
	import api from "../api/index";
	import CONSTS from "../common/consts";
	import dateFormat from "../common/dateFormat";
	import utils from "../common/utils";
	import coldTag from "../common/coldTag";
	export default {
		data() {
			return {
				articleList: [],
				tagList: [{
						title: "ES6-ES12",
						id: 10,
					},
					{
						title: "vue",
						id: 10,
					},
					{
						title: "nodejs",
						id: 10,
					},
					{
						title: "java",
						id: 10,
					},
					{
						title: "webpack",
						id: 10,
					},
					{
						title: "mysql",
						id: 10,
					},
					{
						title: "linux",
						id: 10,
					},
					{
						title: "jenkins",
						id: 10,
					},
					{
						title: "nginx",
						id: 10,
					},
					{
						title: "css",
						id: 10,
					},
					{
						title: "微博今天又宕机了",
						id: 10,
					},
				],
				colorList: [
					"494ca2",
					"0075f6",
					"1d1919",
					"421b9b",
					"8293ff",
					"302387",
					"e88a1a",
					"6d70c6",
					"78b0a0",
					"f8d0b0",
					"ebebe3",
					"74b49b",
					"509aaf",
					"12e6c8",
					"573697",
					"ca431d",
					"f7aa00",
					"4ab8b8",
					"1a2c5b",
					"5628b4",
				],
			};
		},
		methods: {
			getArticle(type) {
				axios({
						method: "post",
						url: api.ARTICLE_API.article_list,
						data: {
							status: 0,
							row_start: 0,
							row_count: 10,
							order_key: [
								["number", "DESC"]
							],
						},
					})
					.then((res) => {
						if(res.error_code == CONSTS.ERROR_CODE.SUCCESS) {
							this.articleList = res.result_data;
						} else {
							console.log("服务器异常");
						}
					})
					.catch((err) => {
						console.log("失误：" + err);
					});
			},
			goArticle(type) {
				var url = "/article/" + type.id;
				this.$router.push(url);
			},
			/**
			 * 产生随机整数，包含下限值，包括上限值
			 * @param {Number} lower 下限
			 * @param {Number} upper 上限
			 * @return {Number} 返回在下限到上限之间的一个随机整数
			 */
			random(lower, upper) {
				return Math.floor(Math.random() * (upper - lower + 1)) + lower;
			},
			randomColor() {
				// 随机生成 rgb 值，每个颜色值在 0 - 255 之间
				/*				var r = this.random(0, 256),
									g = this.random(0, 256),
									b = this.random(0, 256);
								var result = "rgb(" + r + "," + g + "," + b + ")";*/
				let max = this.colorList.length;
				this.colorList[this.random(0, max)];
				return "#" + this.colorList[this.random(0, max)];
			},
			getSearch(item) {
				this.$router.push({
					path: "/search",
					query: {
						q: item.title,
					},
				});
			},
		},
		mounted() {
			//  this.getArticle();
			this.$nextTick(() => {
				coldTag.winOnload();
			});
		},
	};
</script>

<style scoped>
	.member-activity-bar {
		width: 250px;
		background-color: #f0f0f0;
		height: 3px;
	}
	
	.member-activity-start {
		height: 3px;
		background-color: #ccc;
	}
	
	.balance_area img {
		vertical-align: middle;
	}
	
	.balance_area,
	a.balance_area:link,
	a.balance_area:visited {
		font-size: 11px;
		line-height: 16px;
		padding: 5px 10px;
		border-radius: 20px;
		text-decoration: none;
		color: #666;
		text-shadow: 0 1px 0 #fff;
		display: inline-block;
		background: #f5f5f5;
		background: linear-gradient(top, #f5f5f5 0, #e2e2e2 100%);
	}
	
	.inner {
		padding: 10px;
		font-size: 14px;
		line-height: 150%;
		text-align: left;
	}
	
	.fa-gift:before {
		content: "\f06b";
	}
	#nodes-sidebar {
    text-align: left;
    padding: 0 10px;
}
div.node {
    background-color: transparent;
    border-radius: var(--box-border-radius);
    box-shadow: none;
    font-size: 14px;
    margin: 0px -10px 0px -10px;
    padding: 5px 10px 5px 10px;
}
div.node .node_compose {
    float: right;
    visibility: hidden;
    margin: 3px 0px 0px 0px;
}
</style>