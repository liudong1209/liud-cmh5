<template>
	<div class="healthRegimen">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">{{name}}</span>
			<span class="collection more" :class='{"active":isSelected}' @click="toggleCollect(isSelected)">

			</span>
		</header>
		<div class="content">
			<div class="tab-content">
				<div class="ositive" v-if="teaList">
					<div class="img">
						<div class="item" v-for="(item,index) in imgNames ">
							<img :src="GLOBAL.imgPath +imgPaths[index]" :onerror="errorImg01"/>
							<p>{{item}}</p>
						</div>
					</div>
					<div class="healthcontent">
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">{{teaList[0].name}}</span>
							</div>
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">配料</span>
							</div>
							<div class="con">
								{{ teaList[0].materials }}
							</div>
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">用法</span>
							</div>
							<div class="con">
								{{ teaList[0].useinstruction }}
							</div>
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">制法</span>
							</div>
							<div class="con">
								{{ teaList[0].opinstruction }}
							</div>
						</div>
					</div>
				</div>
			</div>
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
				isSelected: false,
				userId: this.$store.getters.uIdString,
				name: this.$route.params.name,
				teaList: null,
				errorImg01: 'this.src="' + require('../../../static/images/default_big.png') + '"',
			}
		},
		computed: {
			//茶养生
			imgNames() {
				let imageNames = this.teaList[0].imges.imageName;
				if (imageNames.length > 0) {
					return imageNames.split(",")
				}
			},
			imgPaths() {
				let imagePaths = this.teaList[0].imges.imageSrc;
				if (imagePaths.length > 0) {
					return imagePaths.split(",")
				}
			},
		},
		methods: {
			toggleCollect() {
				let req = {
					'userId': this.userId,
					'aId': this.teaList[0].id,
					'aName': this.teaList[0].name,
					'typ': 'drink'
				}
				
				this.$post('userFavorites/addfavorites', req)
					.then(res => {
						if (res.data.code == '200') {
							this.isSelected = !this.isSelected
							if (this.isSelected) {
								Toast({
									content: '大经中医：收藏成功',
									position: 'bottom',
									duration: 1000
								});

							} else {
								Toast({
									content: '大经中医：取消收藏',
									position: 'bottom',
									duration: 1000
								});
							}
						}
					})
					.catch();


			}

		},
		mounted: function() {
			this.$post('cmDrink/getdrinkname', {
				"name": this.name,
			}).then(res => {
				if (res.data.code == 200) {
					this.teaList = res.data.body;
					let req = {
						'userId': this.userId,
						'aId': this.teaList[0].id,
						'aName': this.teaList[0].name,
						'typ': 'drink'
					}
					this.$post('userFavorites/getisfavorites', req).then(res => {
						if (res.data.body) {
							this.isSelected = res.data.body.isCollection
						} else {
							this.isSelected = false;
						}
					}).catch();
				} else {
					const msg = res.data.msg;
					Toast({
						content: msg,
						position: 'bottom',
					});
				}
			}).catch((err) => {
				console.log(err)
			})
		},
		// 详情页面的beforeRouteLeave钩子函数
		beforeRouteLeave (to, from, next) {        
			if (to.name == 'tea') {
				to.meta.isUseCache = true;    
			}        
		  next();
		},
	}
</script>

<style scoped="" lang="less">
	.healthRegimen {
		width: 100%;

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

			.tab-content {
				height: 100%;
				width: 100%;

				.ositive {
					width: 100%;
					padding-bottom: 0.1rem;
					background: #fff;

					.img {
						width: 94%;
						height: 1.8rem;
						border: 1px solid #eee;
						margin: 0.15rem 3%;
						overflow-x: auto;
						display: flex;
						.item {
							display: inline-block;
							padding: 10px;
							p{
								word-break: keep-all;
							}
							img {
								width: 0.7rem;

							}
						}
					}

					.healthcontent {
						width: 94%;
						margin-left: 3%;

						.first {
							width: 100%;
							font-size: 0.28rem;

							.title {
								width: 100%;
								height: 0.7rem;
								line-height: 0.7rem;
								font-size: 0.3rem;
								color: #000;

								.point {
									display: inline-block;
									width: 0.16rem;
									height: 0.16rem;
									background: red;
									float: left;
									margin: 0.27rem 0.2rem;
								}

								.text {
									float: left;
								}
							}

							.con {
								margin: 0rem 0.2rem;
								color: #333;
							}
						}
					}
				}
			}
		}
	}
</style>
