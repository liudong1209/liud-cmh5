<template>
	<div class="bottom-tab">
		<div class="tab-item" @click="switchTo('/home/home')">
			<img :src="'/home/home' === $route.path ? tabBarImgArr[0].selected : tabBarImgArr[0].normal">
			<span :class="{on: '/home/home' === $route.path}">首页</span>
		</div>
		<!-- <div class="tab-item" @click="switchTo('/news/news')">
			<img :src="'/news/news' === $route.path ? tabBarImgArr[1].selected : tabBarImgArr[1].normal">
			<span :class="{on: '/news/news' === $route.path}">新闻</span>
		</div> -->
		<div class="tab-item" @click="switchTo('/word/word')">
			<img :src="'/word/word' === $route.path ? tabBarImgArr[2].selected : tabBarImgArr[2].normal">
			<span :class="{on: '/word/word' === $route.path}">我的</span>
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				tabBarImgArr: [ //图片切换
					{
						normal: 'static/images/home.png',
						selected: 'static/images/home_selected.png'
					},
					{
						normal: 'static/images/news.png',
						selected: 'static/images/news_selected.png'
					},
					{
						normal: 'static/images/my.png',
						selected: 'static/images/my_selected.png'
					}
				],

			}
		},
		methods: {
			switchTo(path) {
				this.$router.replace(path)
			}
		}

	}
</script>

<style scoped="" lang="less">
	.bottom-tab {
		width: 100%;
		height: 1.2rem;
		background-color: #fff;
		position: fixed;
		left: 0px;
		bottom: 0px;
		display: flex;
		z-index: 999;

		&:before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 1px;
			background: #eee;
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			-webkit-transform-origin: 0 0;
			transform-origin: 0 0;
		}

		.tab-item {
			display: flex;
			flex: 1;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 0.28rem;
			color: #666;

			img {
				width: 0.5rem;
				margin: 0.05rem 0;
			}

			.on {
				color: red;
			}

		}
	}
</style>
