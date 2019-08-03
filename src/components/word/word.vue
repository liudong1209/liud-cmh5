<template>
	<div class="my-wrapper">
		<header class="header">
			<span class="title">我的</span>
		</header>
		<div class="my-con">
			<div class="banner" @click="goPersonalCenter()">
				<div class="banner-con">
					<div class="avatar-img">
						<img :src="GLOBAL.imgPath + avatar" v-if="avatar" />
						<img :src="defaultAvatar" v-else />
					</div>
					<div class="name">{{name}}</div>
					<div class="phone">{{phone}}</div>
				</div>
				<div class="editor">
					<img src="static/images/edit_logo.png" />
				</div>
			</div>
			<ul class="mui-table-view my-list">
				<li class="mui-table-view-cell mui-media" @click="goHelpCenter()">
					<a class="mui-navigate-right">
						<img src="static/images/help.png">
						<div class="mui-media-body">
							<p>帮助中心</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media" @click="goFeedback()">
					<a class="mui-navigate-right">
						<img src="static/images/advice.png">
						<div class="mui-media-body">
							<p>意见反馈</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media" @click="goPatientManagement">
					<a class="mui-navigate-right">
						<img src="static/images/patient_manager_logo.png">
						<div class="mui-media-body">
							<p>患者管理</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media" @click="goSet">
					<a class="mui-navigate-right">
						<img src="static/images/setting.png">
						<div class="mui-media-body">
							<p>设置</p>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mand-mobile'
	export default {
		data() {
			return {
				avatar: "",
				defaultAvatar: "static/images/default_header_boy.png",
				name: "",
				sex: "",
				phone: "",
			}
		},
		methods: {
			//初始化数据
			initData() {
				let uId = this.$store.getters.uIdString
				this.$post('users/getuserid', {
					"userId": uId,
					"uId": uId
				}).then(res => {
					// console.log(res)
					if (res.data.code == 200) {
						let result = res.data.body.user;
						this.avatar = result.uImgesrc;
						this.name = result.uName;
						this.phone = result.uPhone;
					} else {
						Toast({
							content: res.data.msg,
							position: 'bottom',
							duration: 1000
						});
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			//进入帮助中心页面
			goHelpCenter() {
				this.$router.push({
					path: '/word/helpCenter'
				});
			},
			//进入个人中心页面
			goPersonalCenter() {
				this.$router.push({
					path: '/word/personalCenter'
				});
			},
			//进入意见反馈页面
			goFeedback() {
				this.$router.push({
					path: '/word/feedback'
				});
			},
			//进入患者管理
			goPatientManagement() {
				this.$router.push({
					path: '/word/patientManagement'
				});
			},
			//进入设置页面
			goSet() {
				this.$router.push({
					path: '/word/set'
				});
			},

		},
		mounted: function() {
			this.initData();
		},

	}
</script>

<style scoped="scoped" lang="less">
	.my-wrapper {
		width: 100%;

		.my-con {
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

			.banner {
				width: 100%;
				height: 3rem;
				background: #CB231F;
				position: relative;

				.banner-con {
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					right: 0;
					margin: 0 auto;
					width: 4rem;
					text-align: center;
					color: #fff;
					font-size: 0.28rem;

					.avatar-img {
						height: 1.5rem;
						overflow: hidden;
						margin-bottom: 0.25rem;

						img {
							width: 1rem;
							margin: 0.25rem 1.5rem;
						}
					}


					.phone {
						margin: 0.1rem 0;
					}
				}

				.editor {
					position: absolute;
					right: 0.4rem;
					top: 0.4rem;

					img {
						width: 0.4rem;
					}
				}
			}

			.my-list {
				li {
					height: 1rem;
					line-height: 1rem;
					padding: 0;
					font-size: 0.28rem;

					a {
						margin: 0;

						img {
							width: 0.45rem;
							margin: 0.3rem;
							float: left;
						}

						p {
							color: #000;
						}
					}
				}
			}
		}
	}
</style>
