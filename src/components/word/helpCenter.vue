<template>
	<div class="helpCenter-wrapper">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">帮助中心</span>
		</header>
		<div class="content">
			<div class="item" >
				<div class="title">
					<span class="point"></span>
					<span class="text">自诊流程是怎样的？</span>
				</div>
				<div class="right">
					<div class="right-txt">
						<span class="num">1.</span>
						<span class="con">首页点击【自诊自查】</span>
					</div>
					<div class="right-txt">
						<span class="num">2.</span>
						<span class="con">患者选取（可选择本人，也可新增朋友家人）</span>
						</div>
					<div class="right-txt">
						<span class="num">3.</span>
						<span class="con">症状选取（可点击人体图相关部位选取症状，也可左右滑动页面选取部位无关症状）</span>
					</div>
					<div class="right-txt">
						<span class="num">4.</span>
						<span class="con">智能诊断结果（包括证型和疾病）</span>					
					</div>					
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
</script>

<style scoped="" lang="less">
	.helpCenter-wrapper {
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
			.item {
				width: 100%;
				font-size: 0.28rem;
				overflow: hidden;
				margin-bottom: 0.2rem;
			
				.title {
					width: 100%;
					height: 0.7rem;
					line-height: 0.7rem;
					font-size: 0.3rem;
					color: #000;
					position: relative;
					.point {
						display: inline-block;
						width: 0.16rem;
						height: 0.16rem;
						background: red;
						float: left;
						margin: 0.27rem 0.2rem;
					}
					.acupoint {
						border-bottom: 1px solid blue;
						color: blue;
					}
				}
			
				.right {
					margin-left: 0.56rem;
					color: #333;
					.right-txt{
						margin-bottom: 0.15rem;
						display: flex;
						span{
							display: inline-block;
						}
						.num{
							flex: 0 0 0.2rem;
						}
						.con{
							flex: 1;
						}
					}
				}
			}
			
		}
	}
</style>
