<template>
	<div class="solarTermsType">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">{{solarTermsDetail.name}}</span>
			<span class="collection more" :class='{"active":isSelected}' @click="toggleCollect(isSelected)">
			
			</span>
		</header>
		<div class="content">
			<div class="diseasePrevention con">
				<div class="top">
					<img src="static/images/jibingyufang.png" />
					<span>疾病预防</span>
				</div>
				<div class="diseaseCon">
					<div class="first">
						{{solarTermsDetail.explain}}
					</div>
				</div>
			</div>
			<div class="medicine con">
				<div class="top">
					<img src="static/images/zhongyiyangsheng.png" />
					<span>中医养生</span>
				</div>
				<div class="diseaseCon medicineCon">
					<div class="text" v-html="solarTermsDetailHealth"></div>
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
				solarTermsDetail: {},
				solarTermsDetailHealth:""
			}
		},
		methods: {
			//进入更多节气页面
			goMoreSolarTerms() {
				this.$router.push({
					path: '/moreSolarTerms/moreSolarTerms'
				});
			},
			//获取节气详情
			getSolarTerms() {
				this.$post('solThrottleType/getthrnambyid', {
					'thrId': this.$route.params.id
				}).then(res => {
					//console.log(res)
					if (res.data.code == 200) {
						this.solarTermsDetail = res.data.body;
						this.solarTermsDetailHealth = res.data.body.health.replace(/\r\n\r\n/gm,"<br/>");
						let req = {
							'userId': this.$store.getters.uIdString,
							'aId': this.solarTermsDetail.id,
							'aName': this.solarTermsDetail.name,
							'typ': 'throttle'
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
							duration: 1000
						});
					}
				}).catch((err) => {

				})
			},
			toggleCollect() {
				let req = {
					'userId': this.$store.getters.uIdString,
					'aId': this.solarTermsDetail.id,
					'aName': this.solarTermsDetail.name,
					'typ': 'throttle'
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
		mounted() {
			this.getSolarTerms();
		},
		// 详情页面的beforeRouteLeave钩子函数
		beforeRouteLeave (to, from, next) {        
			if (to.name == 'moreSolarTerms') {
				to.meta.isUseCache = true;    
			}       
		  next();
		},
	}
</script>

<style lang="less" scoped="scoped">
	.solarTermsType {
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

			.con {
				width: 100%;

				.top {
					width: 100%;
					height: 0.8rem;

					img {
						width: 0.6rem;
						float: left;
						margin: 0.1rem;
					}

					span {
						color: red;
						height: 0.8rem;
						line-height: 0.8rem;

					}
				}

				.diseaseCon {
					padding: 0 0.15rem;
					width: 100%;
					font-size: 0.26rem;

					.first {
						margin-bottom: 0.2rem;
					}
				}

				.medicineCon {
					.text {
						margin-bottom: 0.2rem;
						width: 100%;
						overflow: hidden;

						.title,
						.txt {
							display: inline-block;
							float: left;
						}


					}
				}
			}
		}

	}
</style>
