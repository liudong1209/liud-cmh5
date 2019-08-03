<template>
	<div class="chineseMedicine">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">中药</span>
			<span class="more" @click="screen()">筛选</span>
		</header>
		<div class="chineseMedicine-content">
			<form action="javascript:return true;">
				<div class="search">
					<input @keyup.13="filterByInput()" ref="searchInput" type="search" class="search-input" v-model="searchData" />
					<img src="static/images/search.png" />
				</div>
			</form>
			<div class="list">
				<ul class="mui-table-view mui-table-view-chevron scroll-view-list">
					<li @click="goMedicineDetail(item.id,item.name)" class="mui-table-view-cell mui-media scroll-view-item" v-for="(item,idex) in filteredList"
					 :key="idex">
						<a class="mui-navigate-right">
							<img v-if="item.imgeSrc" class="mui-media-object mui-pull-left" :src="GLOBAL.imgPath + item.imgeSrc" :onerror="errorImg01">
							<img v-else class="mui-media-object mui-pull-left" src="static/images/no_photo.png">
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
		<div class="screenContentDialog" v-if="screenContentflag"></div>
		<div class="screen-modal" v-if="screenContentflag">
			<div class="box">
				<div class="title">筛选</div>
				<div class="screenList" v-for="(item,index) in ScreenContent" :key="index">
					<div class="name-title">{{item.title}}:</div>
					<div class="con">
						<div :class="[item.class_true==true?'active':'']" ref="txt" @click="addActive(item.content,$event,item)" class="txt"
						 v-for="(item,ind) in item.list">{{item.content}}</div>
					</div>
				</div>
				<div class="foot">
					<span class="cancel" @click="close()">取消</span>
					<span class="sure" @click="filterBySelect()">确定</span>
				</div>
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
				selectedTxt: [], //筛选选择列表
				interParamSelectedTxt: [], //筛选选择列表中间参数
				screenContentflag: false, //遮盖层
				serch_result: [],
				intermediateParameters: [],
				searchData: '', //输入框中的内容
				ScreenContent: [ //筛选内容
					{
						"title": "四气",
						"list": [{
								"class_true": false,
								'content': '寒'
							},
							{
								"class_true": false,
								'content': '凉'
							},
							{
								"class_true": false,
								'content': '温'
							},
							{
								"class_true": false,
								'content': '热'
							},
							{
								"class_true": false,
								'content': '(平)'
							},
						]

					},
					{
						"title": "五味",
						"list": [{
								"class_true": false,
								'content': '酸'
							},
							{
								"class_true": false,
								'content': '甘'
							},
							{
								"class_true": false,
								'content': '苦'
							},
							{
								"class_true": false,
								'content': '辛'
							},
							{
								"class_true": false,
								'content': '咸'
							},
							{
								"class_true": false,
								'content': '(淡)'
							},
							{
								"class_true": false,
								'content': '(涩)'
							}
						]

					},
					{
						"title": "归经",
						"list": [{
								"class_true": false,
								'content': '心'
							},
							{
								"class_true": false,
								'content': '肝'
							},
							{
								"class_true": false,
								'content': '脾'
							},
							{
								"class_true": false,
								'content': '肺'
							},
							{
								"class_true": false,
								'content': '肾'
							},
							{
								"class_true": false,
								'content': '胃'
							},
							{
								"class_true": false,
								'content': '大肠'
							},
							{
								"class_true": false,
								'content': '小肠'
							},
							{
								"class_true": false,
								'content': '膀胱'
							},
							{
								"class_true": false,
								'content': '胆'
							},
							{
								"class_true": false,
								'content': '心包'
							},
							{
								"class_true": false,
								'content': '三焦经'
							}
						]
					},
					{
						"title": "毒性",
						"list": [{
								"class_true": false,
								'content': '毒'
							},

						]

					},
					{
						"title": "药食",
						"list": [{
								"class_true": false,
								'content': '药食同源'
							},

						]

					}
				],
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
				errorImg01: 'this.src="' + require('../../../static/images/default_big.png') + '"',
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
					this.myScroll = new Bscroll('.list', this.options);
					this.pullUpLoadEvent();
				}
				this.myScroll.refresh();
			},
			//搜索功能
			filterByInput() {
				let typ = "typ:20"
				for (let i = 0; i < this.selectedTxt.length; i++) {
					typ = typ + ";pros:*" + this.selectedTxt[i] + "*"
				}
				this.$post('konwledgebase/selkowledge', {
					"act": 'drugs',
					"index": 0,
					"qname": this.searchData,
					'typ': typ
				}).then(
					res => {
						if (res.data.code == 200) {
							this.totalPage = Math.ceil(res.data.body.numFound / 10);
							this.serch_result = [];
							this.serch_result = res.data.body.docs;
							this.pageNo = 0;
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
			//上拉加载
			pullUpLoadEvent() {
				this.myScroll.on('pullingUp', () => {
					
					if (this.pageNo < this.totalPage) {
						this.loadingFlag = true;
						this.pageNo++;	
						if(this.pageNo > this.totalPage){
							return false;
						}else{
							if (this.searchData == '' && this.selectedTxt.length == 0) {
								this.getChineseMedicineList(this.pageNo);
							} else {								
								this.searchChineseMedicineList(this.pageNo);
							}
						}						
						
					} 
					else {
						
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
			//筛选
			screen() {
				//this.selectedTxt = [];
				this.screenContentflag = !this.screenContentflag;
			},
			//删除数组元素
			del(txt) {
				var index = this.selectedTxt.findIndex(item => {
					if (item == txt) {
						return true
					}
				})
				this.selectedTxt.splice(index, 1)
			},
			//筛选内容增加class
			addActive(item, e, list) {
				list.class_true = !list.class_true;
				if (e.target.classList.value == 'txt active') {
					this.del(item);
				} else {
					if (item == '药食同源') {
						item = '↘';
					}
					this.selectedTxt.push(item);
					this.interParamSelectedTxt = this.selectedTxt;

				}

			},
			//筛选
			filterBySelect() {
				this.screenContentflag = false;
				if (true) {
					let typ = "typ:20"
					for (let i = 0; i < this.selectedTxt.length; i++) {
						typ = typ + ";pros:*" + this.selectedTxt[i] + "*"
					}
					this.$post('konwledgebase/selkowledge', {
						"act": 'drugs',
						"index": 0,
						"qname": this.searchData,
						'typ': typ
					}).then(
						res => {
							if (res.data.code == 200) {
								this.serch_result = [];
								
								this.totalPage = Math.ceil(res.data.body.numFound / 10);
								this.serch_result = res.data.body.docs;
								this.pageNo = 0;
								this.myScroll.refresh();
								this.myScroll.openPullUp();
								if (this.serch_result.length == 0) {
									Toast({
										content: '大经中医：暂未搜索到相关数据',
										position: 'bottom',
										duration: 1000
									});
								}

							} else {
								Toast({
									content: '大经中医：' + res.data.msg,
									position: 'bottom',
									duration: 1000
								});
								this.serch_result = [];												
							}
						}
					).catch()
				}
			},
			//进入中药详情页面
			goMedicineDetail(id, name) {
				this.$router.push({
					path: '/chineseMedicineDetail/chineseMedicineDetail/' + id + '/' + name
				});
			},
			close() {
				this.screenContentflag = false;
			},
			//获取中药
			getChineseMedicineList(page) {				
				//act知识库名drugs 中药, points 穴位 , books 古籍, recipes 方剂, jobs 医案
				//index 起始页 0
				//typ 类型 20类型 30中成药
				this.$post('konwledgebase/getkowledge', {
					"act": 'drugs',
					"index": page,
					'typ': 'typ:20'
				}).then(res => {
					
					if (res.data.code == 200) {						
						this.totalPage = Math.ceil(res.data.body.numFound / 10);
						for (var i = 0; i < res.data.body.docs.length; i++) {
							if (res.data.body.docs[i]) {
								this.serch_result.push(res.data.body.docs[i]);
								this.myScroll.refresh();
							}
						}
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
			//搜索中药列表+分页
			searchChineseMedicineList(page) {				
				let typ = "typ:20"
				for (let i = 0; i < this.selectedTxt.length; i++) {
					typ = typ + ";pros:*" + this.selectedTxt[i] + "*"
				}
				this.$post('konwledgebase/selkowledge', {
					"act": 'drugs',
					"index": page,
					"qname": this.searchData,
					'typ': typ
				}).then(res => {
					if (res.data.code == 200) {						
						this.totalPage = Math.ceil(res.data.body.numFound / 10);
						for (var i = 0; i < res.data.body.docs.length; i++) {
							if (res.data.body.docs[i]) {
								this.serch_result.push(res.data.body.docs[i]);
								this.myScroll.refresh();
							}
						}
						this.myScroll.finishPullUp();						
					} 
					/* else {
						const msg = res.data.msg;
						Toast({
							content: msg,
							position: 'bottom',
							duration: 1000
						}); 
					} */
				}).catch((err) => {

				})
			},
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
				this.pageNo = 0;
				this.totalPage = 0;//总页码
				this.searchData = '';
				this.selectedTxt = [];//清空
				this.serch_result = []; // 清空原有数据
				this.interParamSelectedTxt=[];
				this.ScreenContent = [ //筛选内容
					{
						"title": "四气",
						"list": [{
								"class_true": false,
								'content': '寒'
							},
							{
								"class_true": false,
								'content': '凉'
							},
							{
								"class_true": false,
								'content': '温'
							},
							{
								"class_true": false,
								'content': '热'
							},
							{
								"class_true": false,
								'content': '(平)'
							},
						]

					},
					{
						"title": "五味",
						"list": [{
								"class_true": false,
								'content': '酸'
							},
							{
								"class_true": false,
								'content': '甘'
							},
							{
								"class_true": false,
								'content': '苦'
							},
							{
								"class_true": false,
								'content': '辛'
							},
							{
								"class_true": false,
								'content': '咸'
							},
							{
								"class_true": false,
								'content': '(淡)'
							},
							{
								"class_true": false,
								'content': '(涩)'
							}
						]

					},
					{
						"title": "归经",
						"list": [{
								"class_true": false,
								'content': '心'
							},
							{
								"class_true": false,
								'content': '肝'
							},
							{
								"class_true": false,
								'content': '脾'
							},
							{
								"class_true": false,
								'content': '肺'
							},
							{
								"class_true": false,
								'content': '肾'
							},
							{
								"class_true": false,
								'content': '胃'
							},
							{
								"class_true": false,
								'content': '大肠'
							},
							{
								"class_true": false,
								'content': '小肠'
							},
							{
								"class_true": false,
								'content': '膀胱'
							},
							{
								"class_true": false,
								'content': '胆'
							},
							{
								"class_true": false,
								'content': '心包'
							},
							{
								"class_true": false,
								'content': '三焦经'
							}
						]
					},
					{
						"title": "毒性",
						"list": [{
								"class_true": false,
								'content': '毒'
							},

						]

					},
					{
						"title": "药食",
						"list": [{
								"class_true": false,
								'content': '药食同源'
							},

						]

					}
				];			
				this.getChineseMedicineList(0); // 这是我们获取数据的函数
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
	.chineseMedicine {
		.chineseMedicine-content {
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
					padding: 0 5px;

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
