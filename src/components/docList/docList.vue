<template>
	<div class="hos-wrapper">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">{{hospitalName}}</span>
		</header>
		<div class="hos-wrapper-content">
			<div class="search">
				<input placeholder="请输入科室" ref="searchInput" type="search" class="search-input" v-model="searchData" />
				<img src="static/images/search.png" />
			</div>
			<div class="list">
				<div class="scroll-view-list">
					<div v-if="serch_result.length!=0" class="list-con" v-for="(item,idex) in filteredList" :key="idex">
						<div class="bt">{{item.department}}</div>
						<li class="mui-table-view-cell mui-media scroll-view-item" v-for="(item,index) in item.docList" :key="index"
						 @click.stop="currentShow(item,index)">
							<a class="mui-navigate-right">
								<div class="mui-media-body">
									<p>{{item.doctorName}}</p>
									<span class="booking" @click.stop='bookingDoc(hospitalCode,item.doctorCode,userId)'>预约</span>
								</div>
							</a>
							<div class="docDetail" v-show="item.isShow">
								<div class="item">
									<div class="left">姓名:</div>
									<div class="right">{{item.doctorName}}</div>
								</div>
								<div class="item">
									<div class="left">科室:</div>
									<div class="right">{{item.department}}</div>
								</div>
								<div class="item">
									<div class="left">医生简介:</div>
									<div class="right">{{item.docIntroduction}}</div>
								</div>
							</div>
						</li>

					</div>
					<!-- <div v-if="serch_result.length==0" class="list-con noDataList">
						<div class="noData">暂无数据</div>
					</div> -->
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
				searchData: '',
				serch_result: [],
				hospitalCode: this.$route.params.hospitalCode, //医院编码
				hospitalName: this.$route.params.hospitalName, //医院编码
				userId: this.$store.getters.uIdString,
				personCode: '', //病人Id
				current: '-1',
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
					if (item.department.indexOf(searchData) !== -1) {
						return item;
					}
					for (let i = 0; i < item.docList.length; i++) {
						if (item.docList[i].doctorName.indexOf(searchData) !== -1) {
							return item.docList[i]
						}
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
			},
		},
		methods: {
			//初始化
			initScroll() {
				this.searchData = '';
				if (!this.myScroll) {
					this.myScroll = new Bscroll('.list', this.options)
				} else {
					this.myScroll.refresh()
				}
			},
			currentShow(list, index) {
				list.isShow = !list.isShow;
			},
			//获取医生列表
			getDocList() {
				this.$post(this.GLOBAL.platformURL + 'doctor/getDoctorList', {
					hospitalCode: this.hospitalCode
				}).then(res => {

					if (res.data.head.code == 0) {
						let doctorArr = res.data.body.doctors;

						if (doctorArr.length == 0) {
							Toast({
								content: "大经中医：医生列表为空",
								position: 'bottom',
								duration: 1000
							});
						}
						var map = {};
						var docList = [];
						this.serch_result = docList;
						for (var i = 0; i < doctorArr.length; i++) {
							var doctorI = doctorArr[i];
							doctorArr[i].isShow = false;
							//debugger
							if (!map[doctorI.department]) {
								let obj = {
									department: doctorI.department,
									docList: [doctorI]
								}
								docList.push(obj);
								map[doctorI.department] = obj.docList;
							} else {
								map[doctorI.department].push(doctorI)

							}
						}

					} else {
						const msg = res.data.head.msg;
						Toast({
							content: msg,
							position: 'bottom',
							duration: 1000
						});
					}
				}).catch((err) => {
					console.log(err)
				})
			},
			//预约
			bookingDoc(hospitalCode, doctorCode, userId) {
				this.$post(this.GLOBAL.platformURL + '/doctor/getUrlParams', {
					hospitalCode: hospitalCode,
					doctorCode: doctorCode,
					personCode: this.personCode
				}).then(res => {
					if (res.data.head.code == 0) {
						let params = res.data.body.params;
						window.open('http://www.jsehealth.com:8081/ehospitalappointment/doctorIndex4Third?params=' + params);
						this.searchData = ''; //清空搜索框里面的值
					} else {
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
			//获取患者Id
			getPatientId() {
				this.$getNoProgress('/getOutUidByUserId', {
					userId: this.userId
				}).then(res => {
					if (res.code == 200) {
						this.personCode = res.data;
					} else {
						const msg = res.msg;
						Toast({
							content: msg,
							position: 'bottom',
						});
					}
				}).catch((err) => {
					console.log(err)
				})
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.getPatientId(); //获取患者id

			})
		},

		created() {
			this.getDocList(); // 这是我们获取数据的函数
			this.$nextTick(() => {
				this.initScroll();
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

				.scroll-view-list {
					width: 100%;
					background: #fff;

					.bt {
						height: 0.6rem;
						line-height: 0.6rem;
						background: #f5f5f5;
						font-size: 0.28rem;
						padding: 0 15px;
						position: relative;

					}

					.doc {
						font-size: 0.28rem;
						position: relative;
						height: 1rem;
						line-height: 1rem;
						padding: 0 15px;
						position: relative;

						&:after {
							content: "";
							position: absolute;
							bottom: 0;
							left: 0;
							width: 100%;
							height: 1px;
							background: #eee;
							-webkit-transform: scaleY(0.5);
							transform: scaleY(0.5);
							-webkit-transform-origin: 0 0;
							transform-origin: 0 0;
						}
					}
				}

				.noData {
					background: #f5f5f5;
					text-align: center;
					font-size: 0.3rem;
					position: absolute;
					bottom: 50%;
					left: 45%;
				}

				li {
					font-size: 0.28rem;
					position: relative;
					height: auto;
					padding: 0px 0.2rem;
					overflow: hidden;

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
						float: left;
						width: 80%;
					}

					.booking {
						font-size: 0.28rem;
						line-height: 1rem;
						float: left;
						color: green;
						padding: 0 0.2rem;
					}

				}

				.docDetail {
					width: 100%;
					padding-bottom: 0.2rem;
					float: left;

					.item {
						width: 100%;
						font-size: 0.28rem;

						.left,
						.right {
							display: inline-block;
							float: left;
						}

						.left {
							width: 1.6rem;
							padding: 0 0.2rem;
						}

						.right {
							width: calc(100% - 2rem);
						}
					}
				}
			}
		}

	}
</style>
