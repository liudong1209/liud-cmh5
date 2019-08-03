<template>
	<div class="aboutDj-wrapper">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">关于大经</span>
		</header>
		<div class="content">
			<div class="logo">
				<img src="static/images/jpush_notification_icon.png" />
			</div>
			<div class="bt">南京大经</div>
			<div class="con">
				大经中医药是一个智慧中医辅助诊疗平台，
				通过人工智能技术和医疗相结合，
				开发了海派名老中医诊疗经验智能化传承和临床辅助决策系统，
				包含了名老中医、教材、指南、文献等内容，涉及骨伤、皮肤、五官、针灸等学科。
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped="" lang="less">
	.aboutDj-wrapper{
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
		background: #f5f5f5;
		overflow: hidden;
		.content {
			position: absolute;
			left: 0;
			top: 0.8rem;
			right: 0;
			bottom: 0;
			height: auto;
			width: 100%;
			background: #fff;
			overflow-x: hidden;
			overflow-y: auto;
			.logo{
				margin: 0.4rem auto 0.2rem;
				img{
					margin: 0 auto;
				}
			}
			.bt{
				font-size: 0.4rem;
				color: #000;
				width: 100%;
				text-align: center;
			}
			.con{
				padding: 0 0.15rem;
				width: 100%;
				color: #333;
				font-size: 0.28rem;
				line-height: 0.5rem;
				margin-top: 0.2rem;
			}
		}
	}
</style>
