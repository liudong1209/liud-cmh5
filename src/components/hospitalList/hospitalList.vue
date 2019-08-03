<template>
	<div class="hos-wrapper">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">医院列表</span>
		</header>
		<div class="hos-wrapper-content">
			<div class="search">
			  <input placeholder="请输入医院" ref="searchInput" type="search" class="search-input" v-model="searchData" />
			  <img src="static/images/search.png" />
			</div>
			<div class="list">
				<ul class="mui-table-view mui-table-view-chevron scroll-view-list">
					<li class="mui-table-view-cell mui-media scroll-view-item" v-for="(item,idex) in filteredList" :key="idex"
						@click="goDocList(item.hospitalCode,item.hospitalName)"
					>
						<a class="mui-navigate-right">
							<div class="mui-media-body">
								<p>{{item.hospitalName}}</p>							
							</div>
						</a>
					</li>
				</ul>				
			</div>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mand-mobile'
	import {ScrollView, ScrollViewMore} from 'mand-mobile'
	import Bscroll from 'better-scroll'
	export default {
		data() {
			return {	
				searchData:'',
				serch_result: [],
				options: {
				  mouseWheel: true,
				  click: true,
				  tap: true,
				},
			}
		},
		computed: { //即使搜索
			filteredList: function() {
				var serch_result_array = this.serch_result;
				var searchData = this.searchData;
				if (!searchData) {
					return serch_result_array;
				}
				serch_result_array = serch_result_array.filter(function(item) {					
					if (item.hospitalName.indexOf(searchData) !== -1) {
						return item;
					}
				})
				if (serch_result_array.length == 0) {
					Toast({
						content: '大经中医：暂未搜索到相关数据',
						position: 'bottom',
						duration: 1000
					});
				}
				return serch_result_array;
		
			}
		},
		methods: {
			//初始化
			initScroll () {
				this.searchData = '';
				if(!this.myScroll){
					this.myScroll = new Bscroll('.list', this.options)
				}else{
					this.myScroll.refresh()
				}				
			},	
			
				
			//进入医生列表
			goDocList(hospitalCode,hospitalName) {
				this.$router.push({
					path: '/docList/docList/'+ hospitalCode + '/' + hospitalName
				});
				this.searchData = '';  //清空搜索框里面的值
			},
			
			//获取医院列表
			getHosList() {
				this.$post(this.GLOBAL.platformURL+'/doctor/getHospitalList', {	
					
				}).then(res => {
					if(res.data.head.code == 0){
						this.serch_result = res.data.body.hospitals;			
					}else{
						const msg = res.data.head.msg;
						Toast({
							content: msg,
							position: 'bottom',	
							duration: 1000							
						});
					}
				}).catch((err) => {
					
				}) 
			},
     
		},
		mounted() {
			this.getHosList(); // 这是我们获取数据的函数
		},
		created () {
			this.$nextTick(() => {
				this.initScroll()
			})
		},
		
	}
</script>

<style lang="less" scoped="scoped">
	.hos-wrapper {
		.hos-wrapper-content {
			position: absolute;
			left: 0;
			top: 0.8rem;
			right: 0;
			bottom: 0;
			height: calc(100% - 0.8rem);
			width: 100%;
			background: #f5f5f5;
			overflow: auto;

			.search {
				width: 100%;
				margin-top: 0.05rem;
				height: 0.8rem;
				position: relative;

				.search-input {
					background: #fff;
					border: 1px solid #eee;
					width: 96%;
					margin-left: 2%;
					text-indent: 3%;
					margin-top: 0.1rem;
				}
				img {
					position: absolute;
					width: 0.4rem;
					left: 3%;
					top: 0.25rem;
				}
			}

			.list {
				position: absolute;
				top: 1rem; // 与bottom同理
				left: 0;
				right: 0;
				bottom: 0rem; // 底部有footer，没有的话设置为0
				overflow: hidden;
				padding-bottom: 0.8rem;
				ul{
					width: 100%;
					background: #fff;
				}
				.loading{
					width: 100%;
					height: 0.8rem;
					line-height: 0.8rem;
					text-align: center;
					font-size: 0.28rem;
					
				}
				li {
					font-size: 0.28rem;
					position: relative;
					height: 1rem;
					padding: 0 15px;
					a{
						margin: 0;
						margin-right: -0.2rem;
						height: 100%;
						.mui-media-body{
							height: 100%;
						}
					}
					p {
						font-size: 0.28rem;
						line-height: 1rem;
						
					}
					
					.img {
						position: absolute;
						right: 0.8rem;
						top: 0.3rem;
						width: 0.6rem;
						img {
							width: 100%;
						}
					}
				}
			}
		}

		.screenContentDialog {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			opacity: .5;
			background: #000;
			z-index: 9;
		}

		.screen-modal {
			background: #fff;
			position: absolute;
			width: 80%;
			margin-left: 10%;
			z-index: 10;
			height: 7.4rem;
			top: 50%;
			margin-top: -3.8rem;

			.box {
				width: 100%;
				height: 7.4rem;

				.title {
					height: 0.8rem;
					line-height: 0.8rem;
					text-align: center;
					width: 100%;
					font-size: 0.4rem;
				}

				.screenList {
					width: 100%;
					padding: 0.15rem 0;
					float: left;

					.name-title {
						display: inline-block;
						width: 1.2rem;
						float: left;
						color: #000;
						font-size: 0.3rem;
						padding: 0 0.15rem;
					}

					.con {
						float: left;
						width: calc(100% - 1.2rem);
						text-align: left;

						.txt {
							display: inline-block;
							padding: 0rem 0.25rem 0.1rem 0.25rem;
							font-size: 0.28rem;
							color: #333;

							&.active {
								color: red;
							}
						}
					}
				}

				.foot {
					width: 100%;
					position: absolute;
					left: 0;
					bottom: 0;
					height: 0.8rem;
					line-height: 0.8rem;

					&:after {
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

					span {
						float: left;
						width: 50%;
						text-align: center;
						display: inline-block;
						font-size: 0.3rem;
					}

					.cancel {
						border-right: 1px solid #eee;
					}

					.sure {
						color: red;
					}
				}
			}


		}
	}
</style>
