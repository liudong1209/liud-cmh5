<template>
	<div class="selfRecord">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">自诊记录</span>
		</header>
		<div class="list">
			<ul class="ul">
				<li @click="goSelfRecordDetail(item.psId)" v-for="(item) in recordList" :key="item.psId">
					<div class="title">
						<div class="left">
							<img v-if="item.pSex=='男'" src="static/images/default_header_boy.png" />
							<img v-else src="static/images/default_header_girl.png" />
							<span>{{ item.pAppellation}}</span>
						</div>
						<div class="right">
							<img src="static/images/time.png" />
							<span class="time">{{(item.diagnosisTime).length>19?item.diagnosisTime.substring(0,19):item.diagnosisTime }}</span>
							<span class="mui-icon mui-icon-arrowright"></span>
						</div>
					</div>
					<div class="cont">
						<div class="first item">
							<span class="name">{{ item.pName}}</span>
							<span class="dex">{{ item.pSex}}</span>
							<span class="birth">{{ item.pBirth}}</span>
						</div>
						<div class="second item" v-if="item.typename">
							<span class="bt">诊断证型:</span>
							<span class="bt-right">{{ item.typename}}</span>
						</div>
						<div class="ill chineseill item" v-if="item.chineseill.length!=0">
							<span class="bt">中医病症:</span>
							<span class="bt-right">
								<span v-for="(item,ind) in item.chineseill" :key="ind">
									{{item}}
								</span>
							</span>
						</div>
						<div class="ill westernill item" v-if="item.westernill.length!=0">
							<span class="bt">西医疾病:</span>
							<span class="bt-right">
								<span v-for="(item,inde) in item.westernill" :key="inde">
									{{item}}
								</span>
							</span>
						</div>
						<div class="third item" v-if="item.teaname">
							<span class="bt">建议治法:</span>
							<span class="bt-right">{{ item.teaname }}</span>
						</div>
					</div>
				</li>

			</ul>
		</div>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mand-mobile'
	import Bscroll from 'better-scroll'
	export default {
		data() {
			return {
				uId: this.$store.getters.uIdString,
				recordList: [],
				options: {
				  mouseWheel: true,
				  click: true,
				  tap: true,
				},
			}
		},
		methods: {
			//初始化
			initScroll () {				
				if(!this.myScroll){
					this.myScroll = new Bscroll('.list', this.options)
				}else{
					this.myScroll.refresh()
				}				
			},	
			goSelfRecordDetail(psid) {
				this.$router.push({
					path: '/selfRecordDetail/selfRecordDetail/' + psid
				});
			},
			//获取自诊列表
			getSelfDiagnosisRecord(){
				this.$post('patient/selfDiagnosisRecord', {
						"uId": this.uId
					})
					.then(
						(res) => {					
							this.recordList = res.data.body;			
							if (this.recordList.length == 0) {
								Toast({
									content: "大经中医：还没有自诊记录，去自诊吧",
									position: 'bottom',
									duration: 1000
								});
							}
						}
					).catch()					
			}
			
		},
		mounted() {
			
		},
		//在vue对象存活的情况下，进入当前存在activated()函数的页面时，
		//一进入页面就触发；可用于初始化页面数据等
		activated() {
		  // isUseCache为false时才重新刷新获取数据
		  // 因为对list使用keep-alive来缓存组件，所以默认是会使用缓存数据的         
		  if(!this.$route.meta.isUseCache){            
			this.recordList = []; // 清空原有数据
			this.getSelfDiagnosisRecord(); // 这是我们获取数据的函数
		  }else {
			this.$route.meta.isUseCache = false; 
		  }
		   this.$nextTick(() => {
		   	this.initScroll()
		   })
		},
	}
</script>

<style lang="less" scoped="scoped">
	.selfRecord {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
		background: #f5f5f5;
		z-index: 11;
		overflow: hidden;

		.list {
			position: absolute;
			top: 1rem; // 与bottom同理
			left: 0;
			right: 0;
			bottom: 0rem; // 底部有footer，没有的话设置为0
			overflow: hidden;
			height: calc(100% - 1rem);				
			ul {
				width: 100%;
				overflow-y: auto;
				overflow-x: hidden;
				li {
					padding: 0 0 0.2rem 0.15rem;
					font-size: 0.28rem;
					margin-bottom: 0.2rem;
					background: #fff;
					float: left;
					width: 100%;

					.title {
						width: 100%;
						overflow: hidden;
						position: relative;
						height: 0.8rem;
						line-height: 0.8rem;

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

						.left {
							float: left;

							img {
								width: 0.5rem;
								float: left;
								margin: 0.15rem 0.1rem 0 0;
							}

							span {
								float: left;
							}
						}

						.right {
							float: right;

							img {
								width: 0.4rem;
								float: left;
								margin: 0.2rem 0.1rem 0 0;
							}

							span {
								float: left;
								display: inline-block;
							}

							span.mui-icon-arrowright {
								font-size: 0.4rem;
								margin: 0.2rem 0.1rem 0 0;
							}
						}
					}

					.cont {
						width: 100%;

						/* .first,
						.second,
						.third {
							height: 0.6rem;
							line-height: 0.6rem;
							width: 100%;
							float: left;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;
						} */
						.item {
							margin: 0.15rem;
							font-size: 0.28rem;
							display: flex;
							span {
								display: inline-block;					
							}
							.bt {
								display: flex;
								flex: 0 0 1.6rem;
							}
							.bt-right{
								flex: 1;
								span{
									margin-right: 0.15rem;
								}
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
							}
						}
						.first {
							margin-top: 0.15rem;
							span {
								margin-right: 0.15rem;
							}
						}
						
					}
				}
			}
		}
	}
</style>
