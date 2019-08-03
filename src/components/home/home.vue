<template>
	<div class="home-wrapper">
		<header class="header">
			<span class="title">首页</span>
		</header>
		<div class="swipe">
			<md-swiper			 
			  :autoplay="0"
			  transition="fade"
			  ref="swiper"
			>
			  <md-swiper-item :key="index" v-for="(item,index) in swiper">
				<img :src="GLOBAL.imgPath + item" />
			  </md-swiper-item>
			</md-swiper>
	
		</div>
		<div class="center">
			<div class="left" @click="goPatientSelection()">
				<div class="top">
					<span class="img"><img src="static/images/zizhen_logo.png" /></span>
					<span class="text">自诊自查</span>
				</div>
				<div class="bottom">
					<span>身体不舒服?进来检查一下</span>
				</div>
			</div>
			<div class="right">
				<div class="top firstTop" @click="goSelfRecord()">
					<span class="img"><img src="static/images/zizhenjilu_logo.png" /></span>
					<span class="text">自诊记录</span>
				</div>
				<div class="top" @click="goMyCollection()">
					<span class="img"><img src="static/images/collection_logo.png" /></span>
					<span class="text">我的收藏</span>
				</div>
			</div>
		</div>
		<div class="gird-6">
			<ul class="mui-table-view mui-grid-view mui-grid-9">
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" @click="goChineseMedicine()">
					<a>
						<span class="img">
							<img src="static/images/zhongyao_logo.png">
						</span>
						<div class="mui-media-body">中药</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" @click="goAcupuncturePoints()">
					<a>
						<span class="img">
							<img src="static/images/xuewei_logo.png">
						</span>
						<div class="mui-media-body">穴位</div>
					</a>
				</li>
				
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" @click="goTea()">
					<a>
						<span class="img">
							<img src="static/images/chayin_logo.png">
						</span>
						<div class="mui-media-body">茶饮</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" @click="goMedicinalFood()">
					<a>
						<span class="img">
							<img src="static/images/yaoshan_logo.png">
						</span>
						<div class="mui-media-body">药膳</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" @click="goSolarTerms(solarId)">
					<a>
						<span class="img" v-if="solarName" >
							<img :src="'static/images/'+solarName+'.png'">
						</span>
						<div class="mui-media-body">节气</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4" @click="goHosList()">
					<a>
						<span class="img">
							<img src="static/images/zhengxing_logo.png">
						</span>
						<div class="mui-media-body">预约挂号</div>
					</a>
				</li>
		    </ul>
		</div>
	</div>
</template>

<script>
	import {Toast} from 'mand-mobile'
	export default {
	  data(){
	    return {
			swiper:[
				"static/images/banner_1.png",
				//"static/images/banner_2.png",
				/* "static/images/banner_3.png", */
			],
			solarName:''    ,//节气名称
			solarId:''    ,//节气id
	    }
	  },
	  methods:{
		  //进入患者选取页面
		  goPatientSelection(){
			  this.$router.push({
			  	path: '/patientSelection/patientSelection'
			  });
		  },
		  //进入自诊记录页面selfRecord
		   goSelfRecord(){
			  this.$router.push({
				path: '/selfRecord/selfRecord'
			  });
		  },
		  //进入我的收藏页面
		  goMyCollection(){
			  this.$router.push({
			  	path: '/myCollection/myCollection'
			  });
		  },
		  //进入中药页面
		  goChineseMedicine(){
			  this.$router.push({
			  	path: '/chineseMedicine/chineseMedicine'
			  });
		  },
		  //进入穴位页面
		  goAcupuncturePoints(){
			  this.$router.push({
				path: '/acupuncturePoints/acupuncturePoints'
			  });
		  },
		  //进入茶饮页面
		  goTea(){
			  this.$router.push({
				path: '/tea/tea'
			  });
		  },
		  //进入药膳页面
		  goMedicinalFood(){
			  this.$router.push({
				path: '/medicinalFood/medicinalFood'
			  });
		  },
		  //获取当前节气
		  getSolarTermsType() {
		  	this.$post('solThrottleType/getthrnambytim', {							
		  	}).then(res => {
		  		if(res.data.code == 200){
		  			this.solarName = res.data.body.name;	
					this.solarId = res.data.body.id;
		  		}else{
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
		  //进入节气页面
		  goSolarTerms(id){
			  this.$router.push({
				path: '/solarTermsType/solarTermsType/'+ id
			  });
		  },
		  //进入医院列表
		  goHosList(){
			  this.$router.push({
					path: '/hospitalList/hospitalList'
			 }); 
		  },
	  },
	  
	  created () {
	  	this.getSolarTermsType();
	  },
	}
</script>

<style scoped="" lang="less">
	.home-wrapper{
		width: 100%;
		height: 100%;
		
		.swipe{
			width: 100%;
			height: 2.6rem;
			margin-top: 0.8rem;
			img{
				display: block;
				width: 100%;
			}
		}
		.center{
			position: relative;
			width: 100%;
			height: 2rem;
			display: flex;
			background: #fff;
			&:after, &:before{
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
			&:before{
				top: 0;
			}
			.left{
				float: left;
				width: 50%;
				 
				border-right: 1px solid #eee;
				.top{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					vertical-align: middle;
					height: 1.2rem;
					span{
						display: inline-block;
						color: #000;
						font-size: 0.3rem;
					}
					.img{
						width: 0.9rem;
						margin-right: 0.2rem;
						img{
							width: 100%;
						}
					}
				}
				.bottom{
					 display: flex;
					align-items: center;
					justify-content: center;
					vertical-align: middle;
					span{
						color: #999;
						font-size: 0.24rem;
					}
				}
			}
			.right{
				float: left;
				width: 50%;
				.top{
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					vertical-align: middle;
					height: 1rem;
					span{
						display: inline-block;
						color: #000;
						font-size: 0.26rem;
					}
					.img{
						width: 0.6rem;
						margin-right: 0.2rem;
						img{
							width: 100%;
						}
					}
				}
				.firstTop{
					position: relative;
					&:after{
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
		}
		.gird-6{
			width: 100%;
			
			ul{
				background: #fff;
				width: 100%;
				
				position: relative;
				margin-top: 10px;
				&:after, &:before{
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
				&:before{
					top: 0;
					height: 0px;
				}
				li{
					.img{
						width: 0.9rem;
						height: 1.2rem;
						display: inline-block;
						img{
							width: 100%;
							height: 100%;
							
						}
					}
				}
			}
		}
	}
</style>
