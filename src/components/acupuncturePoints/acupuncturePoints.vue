<template>
	<div class="acupuncturePoints">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">穴位</span>
		</header>
		<div class="acupuncturePoints-content">
			<form action="javascript:return true;">
				<div class="search">
					<input @keyup.13="filterByInput()" type="search" ref="searchInput" class="search-input" v-model="searchData" />
					<img src="static/images/search.png" />
				</div>
			</form>
			<div class="list">
				<ul class="mui-table-view mui-table-view-chevron scroll-view-list">
					<li class="mui-table-view-cell mui-media scroll-view-item" v-for="(item,idex) in filteredList" :key="idex" @click="goAcupuncturePointsDetail(item.id,item.name)">
						<a class="mui-navigate-right">
							<div class="mui-media-body">
								<p>{{item.name}}</p>
								<p class="mui-ellipsis">{{item.pinyinUtils}}</p>
								<p class="img" v-if="item.food">
									<img src="static/images/yaoshi_mark.png" />
								</p>
							</div>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mand-mobile'
	import {
		ScrollView,
		ScrollViewMore
	} from 'mand-mobile'
	import Bscroll from 'better-scroll'
	export default {
		data() {
			return {
				serch_result: [],
				searchData: "", //输入框中的内容				
				pageNo: 0, //当前页码
				totalPage: 0, //总页码
				isPullDown: false,
				options: {
					mouseWheel: true,
					click: true,
					tap: true,
					probeType: 3,
					pullUpLoad: {
						threshold: -30,
						txt: {
							more: '加载更多',
							noMore: '没有更多数据了'
						}
					},
					startY: 0
				},
			}
		},

		computed: { //即使搜索
			filteredList: function() {
				return this.serch_result;
			},
		},
		methods: {
			//初始化
			initScroll() {
				
				if (!this.myScroll) {
					this.myScroll = new Bscroll('.list', this.options)
					this.pullUpLoadEvent()
				}
				this.myScroll.refresh()

			},
			//上拉加载
			pullUpLoadEvent() {
				this.myScroll.on('pullingUp', () => {
					if (this.pageNo < this.totalPage) {
						this.loadingFlag = true;
						this.pageNo++;
						if(this.pageNo > this.totalPage){
							return false;
						}else{
							if (this.searchData == '') {
								this.getAcupuncturePointsList(this.pageNo);
							} else {								
								this.searchAcupuncturePointsList(this.pageNo);
							}
							
						}
						
						
					} else {
						if(this.totalPage > 1){
							if (!this.$route.meta.isUseCache){
								Toast({
									content: '暂无更多数据',
									position: 'bottom',
									duration: 1000
								});	
							}
						}						
						return false;		
					}
				})
			},
			//搜索功能
			filterByInput() {
				this.$post('konwledgebase/selkowledge', {
					"act": 'points',
					"index": 0,
					"qname": this.searchData,
					'typ': 'null'
				}).then(
					res => {

						if (res.data.code == 200) {
							this.serch_result = [];
							this.serch_result = res.data.body.docs;
							this.pageNo = 0;
							this.totalPage = Math.ceil(res.data.body.numFound / 10);
							this.$refs.searchInput.blur();
							this.myScroll.refresh();
							this.myScroll.openPullUp();							
						} else {
							Toast({
								content: '大经中医：' + res.data.msg,
								position: 'bottom',
								duration: 1000
							});
							this.$refs.searchInput.blur();
							this.serch_result = [];
						}
					}
				).catch()

			},

			//进入穴位详情页面
			goAcupuncturePointsDetail(id, name) {
				this.$router.push({
					path: '/acupuncturePointsDetail/acupuncturePointsDetail/' + id + '/' + name
				});

			},
			close() {
				this.screenContentflag = false;
			},
			//获取穴位
			getAcupuncturePointsList(page) {
				//act知识库名drugs 中药, points 穴位 , books 古籍, recipes 方剂, jobs 医案
				//index 起始页 1
				//typ 类型 20类型 30中成药
					this.$post('konwledgebase/getkowledge', {
						"act": 'points',
						"index": page,
						'typ': 'null'
					}).then(res => {
						if (res.data.code == 200) {
							for (var i = 0; i < res.data.body.docs.length; i++) {
								if (res.data.body.docs[i]) {
									this.serch_result.push(res.data.body.docs[i]);
									this.myScroll.refresh();
								}
							}
							this.totalPage = Math.ceil(res.data.body.numFound / 10) - 1;
							this.myScroll.finishPullUp();
						} 
						else {
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
			//获取穴位+搜索
			searchAcupuncturePointsList(page){
					this.$post('konwledgebase/selkowledge', {
						"act": 'points',
						"index": page,
						"qname": this.searchData,
						'typ': 'null'
					}).then(res => {
						if (res.data.code == 200) {
							for (var i = 0; i < res.data.body.docs.length; i++) {
								if (res.data.body.docs[i]) {
									this.serch_result.push(res.data.body.docs[i]);
									this.myScroll.refresh();
								}
							}
							this.totalPage = Math.ceil(res.data.body.numFound / 10) - 1;
							this.myScroll.finishPullUp();
						} else {
							/* const msg = res.data.msg;
							Toast({
								content: msg,
								position: 'bottom',
								duration: 1000
							}); */
						}
					}).catch((err) => {
				
					})				
			}
		},
		mounted() {

		},
		created() {

		},
		//在vue对象存活的情况下，进入当前存在activated()函数的页面时，
		//一进入页面就触发；可用于初始化页面数据等
		activated() {
			// isUseCache为false时才重新刷新获取数据
			// 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的         
			if (!this.$route.meta.isUseCache) {
				this.searchData = '';
				this.pageNo = 0;
				this.totalPage = 0;
				this.serch_result = []; // 清空原有数据
				this.getAcupuncturePointsList(0); // 这是我们获取数据的函数
			} else {
				this.$route.meta.isUseCache = false;
			}
			this.$nextTick(() => {
				this.initScroll()
			})
		},


	}
</script>

<style lang="less" scoped="scoped">
	.acupuncturePoints {
		.acupuncturePoints-content {
			position: absolute;
			left: 0;
			top: 0.8rem;
			right: 0;
			bottom: 0;
			height: calc(100% - 0.8rem);
			width: 100%;
			background: #fff;
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
				height: calc(100% - 1.2rem);

				ul {
					width: 100%;
					overflow-y: auto;
				}

				.loading {
					width: 100%;
					height: 0.8rem;
					line-height: 0.8rem;
					text-align: center;
					font-size: 0.28rem;

				}

				li {
					font-size: 0.28rem;
					position: relative;
					height: 1.2rem;
					padding: 0 15px;

					a {
						margin: 0;
						margin-right: -0.2rem;
						height: 100%;

						.mui-media-body {
							height: 100%;
						}
					}

					p {
						font-size: 0.28rem;
						line-height: 0.4rem;

						&:nth-child(1) {
							margin-top: 0.2rem;
						}
					}

					.mui-media-object {
						margin-top: 0.2rem;
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
