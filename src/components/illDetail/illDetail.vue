<template>
	<div class="illDetail">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">疾病详情</span>
		</header>
		<div class="content" v-if="illDetail">
			<div class="detail">
				<div class="item" v-if="illDetail.name">
					<div class="title">
						<span class="point"></span>
						<span class="text">疾病名称</span>
					</div>
					<div class="right">
						{{illDetail.name}}
					</div>
				</div>
				<div class="item" v-if="illDetail.code">
					<div class="title">
						<span class="point"></span>
						<span class="text">疾病编号</span>
					</div>
					<div class="right">
						{{illDetail.code}}
					</div>
				</div>
				<div class="item" v-if="illDetail.exp">
					<div class="title">
						<span class="point"></span>
						<span class="text">疾病描述</span>
					</div>
					<div class="right">
						{{illDetail.exp}}
					</div>
				</div>

			</div>
		</div>
		<div class="footer">
			<span @click="goHosList()">预约挂号</span>
		</div>
	</div>
</template>

<script>
	import star from '@/components/star/star'
	import {
		Toast
	} from 'mand-mobile'
	export default {
		data() {
			return {
				illDetail: null,
				exp: null,
			}
		},
		created() {
			this.$nextTick(() => {
				this.illDetail = this.$store.getters["SelfDiagnosis/illDetail"];
				this.exp = this.illDetail.exp.split("；");
			})
		},
		methods: {
			//进入医院列表
			goHosList() {
				this.$router.push({
					path: '/hospitalList/hospitalList'
				});
			}
		},
		mounted() {

		},

	}
</script>

<style scoped="" lang="less">
	.illDetail {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background: #f5f5f5;

		.content {
			width: 100%;
			height: calc(100% - 1.6rem);
			position: absolute;
			left: 0;
			top: 0.8rem;
			overflow: auto;

			.detail {
				width: 94%;
				margin-left: 3%;

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

						.text {}

						.acupoint {
							border-bottom: 1px solid blue;
							color: blue;
						}
					}

					.right {
						margin: 0rem 0.2rem;
						color: #333;
					}
				}
			}
		}

		.footer {
			position: absolute;
			left: 0;
			height: 0.8rem;
			line-height: 0.8rem;
			width: 100%;
			bottom: 0;
			background: #fff;

			span {
				display: inline-block;
				height: 0.8rem;
				line-height: 0.8rem;
				font-size: 0.4rem;
				color: red;
				text-align: center;
				width: 100%;
			}
		}
	}
</style>
