<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>
<style type="text/css">
	/*全局变量*/
	
	:root {
		--code-font: "Consolas", "Panic Sans", "Bitstream Vera Sans Mono", "Menlo", "Microsoft Yahei", monospace;
		--box-background-color: #fff;
		--box-background-alt-color: #f9f9f9;
		--box-background-hover-color: #fafafa;
		--box-foreground-color: #000;
		--box-border-color: #e2e2e2;
		--box-border-hover-color: #c0c0c0;
		--box-border-focus-color: #a6a6b0;
		--box-border-radius: 3px;
		--box-padding: 10px;
		--box-font-size: 14px;
		--box-line-height: 120%;
		--button-background-color: #f0f0f0;
		--button-background-hover-color: #e0e0e0;
		--button-foreground-color: #666;
		--button-foreground-hover-color: #333;
		--button-border-color: #ddd;
		--button-border-hover-color: #c0c0c0;
		--menu-shadow-color: rgba(0, 0, 0, 0.2);
		--ads-list-foreground-color: #445;
		--component-margin: 20px;
		--link-color: #778087;
		--link-visited-color: #afb9c1;
		--link-hover-color: #4d5256;
		--color-foreground: #000;
		--color-gray: #999;
		--color-fade: #ccc;
	}
	
	body {
		min-width: 820px;
		font-family: "Helvetica Neue", "Luxi Sans", "Segoe UI", "Hiragino Sans GB", "Microsoft Yahei", sans-serif, "Apple Logo";
	}
	/*公共样式*/
	
	.cell-translucent:first-child,
	.cell:first-child,
	.cell_ops:first-child {
		border-top: none;
		border-top-left-radius: var(--box-border-radius);
		border-top-right-radius: var(--box-border-radius);
	}
	
	.sep20 {
		height: 20px;
	}
	
	.cell {
		padding: 10px;
		font-size: 14px;
		line-height: 150%;
		text-align: left;
		border-bottom: 1px solid var(--box-border-color);
		display: flex;
		justify-content: space-between;
	}
	
	.tag:link,
	.tag:visited {
		padding: 5px 10px;
		line-height: 100%;
		background-color: #f0f0f0;
		border-radius: 10px;
		margin: 0 5px;
		display: inline-block;
	}
	
	a:active,
	a:link,
	a:visited {
		color: var(--link-color);
		text-decoration: none;
		word-break: break-word;
	}
	
	.gray {
		color: var(--color-gray);
	}
	
	.snow {
		color: #e2e2e2;
	}
	
	img.avatar {
		-moz-border-radius: 4px;
		border-radius: 4px;
		vertical-align: bottom;
	}
	
	.sep5 {
		height: 5px;
	}
	
	.sep3 {
		height: 3px;
	}
	
	.flex-one-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.flex-row-end {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	
	form {
		display: block;
		margin-top: 0em;
		width: 100%;
	}
	
	.super {
		padding: 4px 15px;
	}
</style>