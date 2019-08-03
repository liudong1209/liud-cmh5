<template>
	<div class="healthRegimen">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">养生方案</span>
		</header>

		<div class="content">
			<ul class="tab-tilte">
				<li  :key="0" :class="{active:index == 0}" @click="tab(0)">
					食疗养生
				</li>
				<li  :key="1" :class="{active:index == 1}" @click="tab(1)">
				  茶饮养生
				</li>
				<li  :key="2" :class="{active:index == 2}" @click="tab(2)">
				  穴位按摩
				</li>
			</ul>
			<div class="tab-content">
				<div class="ositive" v-show="index == 0">
					<div class="img" v-if='treatment.content.cookbook.imges'>
						<div class="item" v-for="(item,index) in dietTherapyImg" >
							<img :src="GLOBAL.imgPath+dietTherapyImgPath[index]" :onerror="errorImg01"/>
							<p>{{item}}</p>
						</div>

					</div>
					<div class="healthcontent">
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">{{treatment.content.cookbook.name}}</span>
							</div>							
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">配料</span>
							</div>	
							<div class="con">
								{{treatment.content.cookbook.materials}}
							</div>
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">用法</span>
							</div>	
							<div class="con">
								{{treatment.content.cookbook.useinstruction}}
							</div>
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">制法</span>
							</div>	
							<div class="con">
								{{treatment.content.cookbook.opinstruction}}
							</div>
						</div>
					</div>
				</div>
				<div class="ositive" v-show="index == 1">
					<div class="img" v-if='treatment.content.drink.imges'>
						<div class="item" v-for="(item,index) in drinkTherapyImg">
							<img :src="GLOBAL.imgPath+ drinkTherapyImgPath[index]" :onerror="errorImg01"/>
							<p>{{ item }}</p>
						</div>
					</div>
					<div class="healthcontent">
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">{{treatment.content.drink.name}}</span>
							</div>							
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">配料</span>
							</div>	
							<div class="con">
								{{treatment.content.drink.materials}}
							</div>
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">用法</span>
							</div>	
							<div class="con">
								{{treatment.content.drink.useinstruction}}
							</div>
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">制法</span>
							</div>	
							<div class="con">
								{{treatment.content.drink.opinstruction}}
							</div>
						</div>
					</div>
				</div>
				<div class="ositive" v-show="index == 2">
					<div class="healthcontent">
						<div class="first" v-for="(item,index) in acupointTherapy">
							<div class="title" > 
								<span class="point"></span>
								<span class="text acupoint" @click="setShowMaskClosable('landscape'+index)">
									{{item.name}}
								</span>					
								<md-landscape :ref="'landscape'+index" v-model="showMaskClosable" :value="index" :has-mask="false">
								  <img :src="GLOBAL.imgPath+ item.image" :onerror="errorImg01"/>
								</md-landscape>
							</div>
							<div class="con">
								{{item.acupoint}}
							</div>							
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">功效</span>
							</div>	
							<div class="con">
								{{treatment.content.message.effect}}
							</div>
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">按摩方法</span>
							</div>	
							<div class="con">
								{{treatment.content.message.opinstruction}}
							</div>
						</div>
						
					</div>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
	import {Tip,Landscape } from 'mand-mobile'
	export default {
		props:{
		  "treatment":Object
		},
		data() {
			return {
				num: 0,
				index:0,
				acupointList:null,//穴位
				showMaskClosable: false,
        errorImg01: 'this.src="' + require('../../../static/images/default_big.png') + '"',
			}
		},
		computed:{
			//食疗养生
		  dietTherapyImg(){			  
			let imges=this.treatment.content.cookbook.imges;
			if(imges){
				if((imges.imageName).length>0){
				 return imges.imageName.split(",")
				}
			}			
		  },
		  dietTherapyImgPath(){
			let imges=this.treatment.content.cookbook.imges;
			if(imges){
				if((imges.imageSrc).length>0){
				  return imges.imageSrc.split(",")
				}
			}				
		  },
		  //茶饮养生
		  drinkTherapyImg(){
			let imges=this.treatment.content.drink.imges
			if(imges){
				if((imges.imageName).length>0){
				  return imges.imageName.split(",")
				}
			}
		  },
		  drinkTherapyImgPath(){
			let imges=this.treatment.content.drink.imges;
			if(imges){
				if((imges.imageSrc).length>0){
				  return imges.imageSrc.split(",")
				}
			}
		  },
		  //穴位按摩
		 acupointTherapy(){
			return this.acupointList = this.treatment.content.message.acupoints;			
		  },
		},
		methods: {
		  setShowMaskClosable( name ){
			(this.$refs[name][0]).isLandscapeShow=true;
		  },
			tab(num) {
			  this.index = num;
			},
		},
		mounted() {
			
		}

	}
</script>

<style scoped="" lang="less">
	.healthRegimen {
		position: absolute;
		left: 0;
		top: 1rem;
		right: 0;
		bottom: 0;
		width: 100%;
		.content {
			position: absolute;
			left: 0;
			top: 0.8rem;
			right: 0;
			bottom: 0;
			width: 100%;
			background: #f5f5f5;
			overflow: auto;
			.tab-tilte {
				width:100%;
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
				width: 100%;
				.ositive{
					width: 100%;
					padding-bottom: 0.1rem;
					background: #fff;
					.img{
						width: 96%;
						
						border: 1px solid #eee;
						margin: 0.15rem 2%;
						overflow: auto;
						.item{
							float: left;
							justify-content: center;
							align-items:center;
							padding: 10px;
							height: 1.6rem;
							img{
								width: 0.7rem;
								overflow: hidden;
								margin-top: 0.2rem;
								
							}
						}
					}
					.healthcontent{
						width: 94%;
						margin-left: 3%;
						.first{
							width: 100%;
							font-size:0.28rem;
							overflow: hidden;
							.title{
								width: 100%;
								height: 0.7rem;
								line-height: 0.7rem;
								font-size: 0.3rem;
								color: #000;
								position: relative;
								.point{
									display: inline-block;
									width: 0.16rem;
									height: 0.16rem;
									background: red;
									float: left;
									margin: 0.27rem 0.2rem;
								}
								.text{
									
								}
								.acupoint{
									border-bottom:1px solid blue;
									color: blue;
								}
							}
							.con{
								margin: 0rem 0.2rem;
								color: #333;
							}
						}
					}
				}
				
			}
		}



	}
</style>
