<template>
	<div class="chineseMedicineDetail">
		<header class="header">
			<span class="mui-icon mui-icon-back back"  @click="$router.back(-1)"></span>
			<span class="title">{{name}}</span>
			<span class="collection more" :class='{"active":isSelected}'  @click="toggleCollect()">
						
			</span>
		</header>
		<div class="detail-content">
			<div class="swipe">
				<md-swiper			 
				  :autoplay="3000"
				  transition="fade"
				  ref="swiper">
				  <md-swiper-item :key="index" v-for="(item,index) in swiper">
					<img :src="GLOBAL.imgPath + item" :onerror="errorImg01"/>
				  </md-swiper-item>
				</md-swiper>
			</div>
			<div class="medicineName">
				<div class="item name">
					{{chineseMedicineDetail.drugNam}}
				</div>
				<div class="item">
					<span>出 处:</span>
					<span v-html="chineseMedicineDetail.drugFrom"></span>
				</div>
				<div class="item">
					<span>功 效:</span>
					<span>{{chineseMedicineDetail.drugEff}}</span>
				</div>
				<div class="item">
					<span>性 味:</span>
					<span>{{chineseMedicineDetail.drugPro}}</span>
				</div>
				<div class="item">
					<span>归 经:</span>
					<span>{{chineseMedicineDetail.drugColl}}</span>
				</div>
			</div>
			<div class="medicineList">
				<div class="item">
					<div class="title">
						<img src="static/images/zhuzhi.png" />
						<span>主治</span>
					</div>
					<div class="con">
						<div class="item-list" v-html="chineseMedicineDetail.drugCase">
						</div>
						
					</div>
				</div>
				<div class="item">
					<div class="title">
						<img src="static/images/yongfayongliang.png" />
						<span>用量</span>
					</div>
					<div class="con">
						<div class="item-list">
					
							<span>{{chineseMedicineDetail.drugUse}}</span>			
						</div>
						
					</div>
				</div>
				<div class="item">
					<div class="title">
						<img src="static/images/jinji.png" />
						<span>禁忌</span>
					</div>
					<div class="con">
						<div class="item-list">
							<span>{{chineseMedicineDetail.drugTaboo}}</span>			
						</div>
						
					</div>
				</div>
				<div class="item">
					<div class="title">
						<img src="static/images/xiangguanguji.png" />
						<span>相关古籍</span>
					</div>
					<div class="con">
						<div class="item-list" v-html="chineseMedicineDetail.drugBook">							
						</div>						
					</div>
				</div>				
			</div>
		</div>
	</div>
</template>
	
<script>
	import { Toast } from 'mand-mobile'
     export default {
        data(){
            return{
				isSelected:false,
				collectionImg:"static/images/uncollection.png",
				swiper:null,
				userId:this.$store.getters.uIdString,
				name:this.$route.params.name,
				chineseMedicineDetail:{},
              errorImg01: 'this.src="' + require('../../../static/images/default_big.png') + '"',
            }
        },		
        methods:{
			//获取中药详情
			//pojoName    FDrugknow：中药, CPointknow：穴位
			//id 
			//userId
			getChineseMedicineDetail(){	
				this.$post('konwledgebase/knowledgebyid', {
						"pojoName": 'FDrugknow',	
						"id":this.$route.params.id,
						'userId':this.userId		
				}).then(res => {
					if(res.data.code == 200){						
						this.chineseMedicineDetail = res.data.body;
						this.swiper = res.data.body.drugImgArr;						
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
			 toggleCollect() {
				let req={
					'userId':this.userId,
					'aId':this.$route.params.id,
					'aName':this.$route.params.name,
					'typ':'drug',
				}
				this.$post('userFavorites/addfavorites', req).then(res => {
				if(res.data.code=='200'){
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
			},
			//判断是否收藏
			isCollection(){
				let req={
					'userId':this.userId,
					'aId':this.$route.params.id,
					'aName':this.$route.params.name,
					'typ':'drug',
				}
				this.$post('userFavorites/getisfavorites', req).then(res => {
					if(res.data.body){
						this.isSelected=res.data.body.isCollection						
					}else{
						this.isSelected = false;	
					}													
				}) .catch();
			}			
        },
        mounted(){
			this.getChineseMedicineDetail();
			this.isCollection();
        },
		// 详情页面的beforeRouteLeave钩子函数
		beforeRouteLeave (to, from, next) {        
			if (to.name == 'chineseMedicine') {
				to.meta.isUseCache = true;    
			} 
			
		  next();
		},
    }
</script>

<style scoped="scoped" lang="less">
	.chineseMedicineDetail{
		height: 100%;
		width: 100%;
		.detail-content{
			position: absolute;
			left: 0;
			top: 0.8rem;
			right: 0;
			bottom: 0;
			height: auto;
			width: 100%;
			background: #f5f5f5;
			overflow-y: auto;
			overflow-x: hidden;
			.swipe{
				width: 100%;
				height: 3.8rem;
				margin: 0.2rem 0;
				background: #fff;
				img{
					display: block;
					width: 100%;
					width: 3.6rem;
					height: 3.6rem;
					margin: 0 auto;
				}
			}
			.medicineName{
				width: 100%;
				background: #fff;
				.item{
					padding: 0.1rem 0.15rem;
					span{
						font-size: 0.28rem;
						display: inline-block;
						color: #333;
						&:nth-child(1){
							color: #000;
						}
					}
				}
				.name{
					font-size: 0.32rem;
					color: #000;
				}
				
			}
			.medicineList{
				width: 100%;
				background: #fff;
				margin-top: 0.2rem;
				.item{
					width: 100%;
					padding: 0.1rem 0.2rem;
					font-size: 0.28rem;
					.title{
						width: 100%;
						height: 0.6rem;
						line-height: 0.6rem;
						img{
							display: inline-block;
							width: 0.4rem;
							margin: 0.1rem 0.1rem 0 0;
							float: left;
						}
						span{
							color: red;
						}
					}
					.item-list{
						.bt{
							color: #000;
							font-weight: bold;
						}
					}
				}
			}
		}
		
	}
</style>
