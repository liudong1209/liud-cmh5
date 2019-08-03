<template>
	<div class="solarTerms">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">冬至</span>
		</header>
		<div class="solarTerms-con">
			<div class="search">
				<mt-search></mt-search>
			</div>
			<div class="list">
				<ul class="mui-table-view">
					<li class="mui-table-view-cell">
						<a class="mui-navigate-right">
							<p>大寒</p>
						</a>
					</li>
					<li class="mui-table-view-cell">
						<a class="mui-navigate-right">
							<p>立春</p>
						</a>
					</li>
					<li class="mui-table-view-cell">
						<a class="mui-navigate-right">
							<p>雨水</p>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {Toast} from 'mand-mobile'
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		mounted() {

		}
	}
</script>

<style lang="less" scoped="scoped">
	.solarTerms {
		width: 100%;
		.solarTerms-con {
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
			.search {
				width: 100%;
				margin-top: 0.05rem;
				height: 0.8rem;
			}
			ul {
				margin-top: 0.3rem;
				li {
					font-size: 0.28rem;
					position: relative;
					p {
						font-size: 0.28rem;
					}
				}
			}
		}
	}
</style>
