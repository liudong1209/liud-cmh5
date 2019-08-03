<template>
	<div class="set-wrapper">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">设置</span>
		</header>
		<div class="content">
			<ul class="mui-table-view my-list">
				<li class="mui-table-view-cell mui-media notModified">
					<a class="mui-navigate-right">
						<div class="mui-media-body">
							<p>
								<span>版本信息</span>
								<span class="right" >
									v1.0
								</span>
							</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media" @click="goAboutDj()">
					<a class="mui-navigate-right">
						<div class="mui-media-body">
							<p>
								<span>关于大经</span>								
							</p>
						</div>
					</a>
				</li>

			</ul>
<!--			<div class="exit">-->
<!--				<p>退出登录</p>-->
<!--			</div>-->
		</div>
	</div>
</template>

<script>
	import {Switch} from 'mand-mobile'
	export default {
	  data() {
		return {
		  tongueIsActive: false,
		  noticeIsActive: false,
		}
	  },
	  methods: {
		//面诊面舌
		tongueHandler(name, active) {		  
		},
		//推送通知
		noticeHandler(name, active) {
		  
		},
		//跳转到关于大经页面
		goAboutDj(){
			this.$router.push({
				path: '/word/aboutDj'
			}); 
		}
	  },
	}
</script>

<style lang="less" scoped>
	.set-wrapper {
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
			background: #f5f5f5;
			overflow-x: hidden;
			overflow-y: auto;
	
			.my-list {
				overflow: auto;
				/* height:calc(100% - 2rem); */
				width: 100%;
				position: relative;
				li {
					height: 1rem;
					line-height: 1rem;
					padding: 0;
					font-size: 0.28rem;
					a {
						margin: 0;
						p {
							color: #000;
							padding-left: 0.25rem;
							.right {
								float: right;
								margin-right: 0.6rem;
								img {
									width: 0.6rem;
									margin-top: 0.2rem;
								}
							}
						}
					}
	
					&:last-child {
						&:after {
							height: 1px;
							left: 0;
						}
					}
				}	
				.notModified{
					a{
						&:after {
							content: '';
						}
					}
					
				}
				&:after {
					height: 0;
				}
			}	
			.exit {
				width: 100%;
				text-align: center;
				line-height: 1rem;
				height: 1rem;
				background: #fff;
				margin-top: 0.15rem;
	
				p {
					color: #CB231F;
					font-size: 0.3rem;
				}
			}
		}
	}
</style>
