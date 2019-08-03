<template>
	<div class="healthRegimen">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">我的收藏</span>
		</header>
		<div class="content">
			<ul class="tab-tilte">
				<li v-for="(item,index) in tabs" :key="index" :class="{active:index == num}" @click="tab(index)">
					{{item}}
				</li>
			</ul>
			<div class="tab-content">
				<div class="ositive" v-show="num == 0">
						<ul v-if="myCollections" class="mui-table-view mui-table-view-chevron scroll-view-list">
							<li class="mui-table-view-cell mui-media" v-for="(item,index) in myCollections.drugs" :key="'drugs'+ index"
							 @click="goMedicineDetail(item.faAid,item.faTypname)">
								<a class="mui-navigate-right">
									<div class="mui-media-body">
										<p>{{item.faTypname}}</p>
										<p>{{(item.faCreate).length>19?item.faCreate.substring(0,19):item.faCreate}}</p>
									</div>
								</a>
							</li>
						</ul>
				</div>
				<div class="ositive" v-show="num == 1">
						<ul v-if="myCollections" class="mui-table-view mui-table-view-chevron scroll-view-list">
							<li class="mui-table-view-cell mui-media" v-for="(item,index) in myCollections.points" :key="'points'+index"
							 @click="goAcupuncturePointsDetail(item.faAid,item.faTypname)">
								<a class="mui-navigate-right">
									<div class="mui-media-body">
										<p>{{item.faTypname}}</p>
										<p>{{(item.faCreate).length>19?item.faCreate.substring(0,19):item.faCreate}}</p>
									</div>
								</a>
							</li>
						</ul>
				</div>
				<div class="ositive" v-show="num == 2">
						<ul v-if="myCollections" class="mui-table-view mui-table-view-chevron scroll-view-list">

							<li class="mui-table-view-cell mui-media" v-for="(item,index) in myCollections.drinks" :key="index" @click="goTeaDetail(item.faTypname)">
								<a class="mui-navigate-right">
									<div class="mui-media-body">
										<p>{{item.faTypname}}</p>
										<p>{{(item.faCreate).length>19?item.faCreate.substring(0,19):item.faCreate}}</p>
									</div>
								</a>
							</li>
						</ul>
				</div>
				<div class="ositive" v-show="num == 3">
						<ul v-if="myCollections" class="mui-table-view mui-table-view-chevron scroll-view-list">
							<li class="mui-table-view-cell mui-media" v-for="(item,index) in myCollections.cooks" :key="'cooks'+index"
							 @click="gomedicalFoodDetail(item.faTypname)">
								<a class="mui-navigate-right">
									<div class="mui-media-body">
										<p>{{item.faTypname}}</p>
										<p>{{(item.faCreate).length>19?item.faCreate.substring(0,19):item.faCreate}}</p>
									</div>
								</a>
							</li>
						</ul>
				</div>
				<div class="ositive" v-show="num == 4">
						<ul v-if="myCollections" class="mui-table-view mui-table-view-chevron scroll-view-list">
							<li class="mui-table-view-cell mui-media" v-for="(item,index) in myCollections.throttles" :key="index" @click="goSolarTermsDetail(item.faAid)">
								<a class="mui-navigate-right">
									<div class="mui-media-body">
										<p>{{item.faTypname}}</p>
										<p>{{(item.faCreate).length>19?item.faCreate.substring(0,19):item.faCreate}}</p>
									</div>
								</a>
							</li>
						</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {Toast} from 'mand-mobile'
	import Bscroll from 'better-scroll'
	export default {
		created() {
			this.initData();
			//从store里面取值上一次点击的tab页码
			this.num = this.$store.getters["MyCollection/tabNum"];  
		},
		data() {
			return {
				tabs: ["中药", "穴位", "茶饮", '药膳', '节气'],
				num: 0,   //tab页码
				userId: this.$store.getters.uIdString,
				myCollections: null,
			}
		},
		methods: {
			tab(index) {
				this.num = index;
				this.$store.commit("MyCollection/updateTabNum",index);
				
			},
			//进入中药详情页面
			goMedicineDetail(id, name) {
				this.$router.push({
					path: '/chineseMedicineDetail/chineseMedicineDetail/' + id + '/' + name
				});
			},
			//进入穴位详情页面
			goAcupuncturePointsDetail(id, name) {
				this.$router.push({
					path: '/acupuncturePointsDetail/acupuncturePointsDetail/' + id + '/' + name
				});
			},
			//进入茶饮详情页面
			goTeaDetail(name) {
				this.$router.push({
					path: '/teaDetail/teaDetail/'+ name
				});
			},
			//进入药膳详情页面
			gomedicalFoodDetail(name) {
				this.$router.push({
					path: '/medicinalFoodDetail/medicinalFoodDetail/' + name
				});
			},
			//进入节气页面
			goSolarTermsDetail(id){
				 this.$router.push({
					path: '/solarTermsDetail/solarTermsDetail/'+ id
				});
			},	
			//初始化数据
			initData() {
				this.$post('userFavorites/getfavoritesall', {
					'userId': this.userId
				}).then(res => {
					if (res.data.code == 200) {
						this.myCollections = res.data.body
					} else {
						const msg = res.data.msg;
						Toast({
							content: "大经中医：您还没有收藏",
							position: 'bottom',
							duration: 1000
						});
					}
				}).catch((err) => {
				})
			}
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
			width: 100%;
			background: #f5f5f5;
			

			.tab-tilte {
				position: absolute;
				left: 0;
				top: 0rem;
				right: 0;
				bottom: 0;
				width: 100%;
				height: 0.8rem;
				display: flex;
				background: #fff;

				li {
					display: inline-block;
					display: flex;
					flex: 1;
					justify-content: center;
					align-items: center;

					&.active {
						border-bottom: 1px solid red;
						color: red;
					}
				}
			}

			.tab-content {
				position: absolute;
				left: 0;
				top: 1rem;
				right: 0;
				bottom: 0;
				width: 100%;
				overflow: auto;
				.ositive {
					width: 100%;
					padding-bottom: 0.1rem;zz
					ul {
						margin-top: 0rem;
						li {
							font-size: 0.28rem;
							position: relative;
							height: 1rem;
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
								line-height: 1rem;

								&:nth-child(1) {
									float: left;
								}

								&:nth-child(2) {
									float: right;
									margin-right: 0.4rem;
								}
							}
						}
					}

				}
			}
		}
	}
</style>
