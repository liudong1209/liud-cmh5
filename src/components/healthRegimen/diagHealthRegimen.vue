<template>
	<div class="healthRegimen">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">养生方案</span>
		</header>
		<div class="content">
			<div class="tips">
				<p>根据您当前的健康状态定制了个性化养生方案</p>
				<p>(此方案只做参考,如有不适请就医)</p>
			</div>
			<ul class="tab-tilte">
				<li :key="0" :class="{active:index == 0}" @click="tab(0)">
					食疗养生
				</li>
				<li :key="1" :class="{active:index == 1}" @click="tab(1)">
					茶饮养生
				</li>
				<li :key="2" :class="{active:index == 2}" @click="tab(2)">
					穴位按摩
				</li>
			</ul>
			<div class="tab-content">
				<div class="ositive" v-show="index == 0">
					<div class="img" v-if='treatment.cookbook.imges'>						
						<div  class="item" v-for="(item,index) in dietTherapyImg">
							<img :src="GLOBAL.imgPath+dietTherapyImgPath[index]" :onerror="errorImg01"/>
							<p>{{item}}</p>
						</div>
					</div>
					<div class="healthcontent">
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">{{treatment.cookbook.name}}</span>
							</div>
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">配料</span>
							</div>
							<div class="con">
								{{treatment.cookbook.materials}}
							</div>
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">用法</span>
							</div>
							<div class="con">
								{{treatment.cookbook.useinstruction}}
							</div>
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">制法</span>
							</div>
							<div class="con">
								{{treatment.cookbook.opinstruction}}
							</div>
						</div>
					</div>
				</div>
				<div class="ositive" v-show="index == 1">
					<div class="img" v-if='treatment.drink.imges'>
						<div class="item" v-for="(item,index) in drinkTherapyImg">
							<img :src="GLOBAL.imgPath + drinkTherapyImgPath[index]" :onerror="errorImg01"/>
							<p>{{ item }}</p>
						</div>
					</div>
					<div class="healthcontent">
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">{{treatment.drink.name}}</span>
							</div>
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">配料</span>
							</div>
							<div class="con">
								{{treatment.drink.materials}}
							</div>
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">用法</span>
							</div>
							<div class="con">
								{{treatment.drink.useinstruction}}
							</div>
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">制法</span>
							</div>
							<div class="con">
								{{treatment.drink.opinstruction}}
							</div>
						</div>
					</div>
				</div>
				<div class="ositive" v-show="index == 2">
					<div class="healthcontent">
						<div class="first" v-for="(item,index) in acupointTherapy">
							<div class="title">
								<span class="point"></span>
								<span class="text acupoint" @click="showMask(index)">
									{{item.name}}
								</span>
								<div class="dialog" v-show="current == index">
									<div class="dialog-box">
										<div class="title">
											<span class="mui-icon mui-icon-closeempty" @click="close(index)"></span>
										</div>
										<div>
											<img :src="GLOBAL.imgPath+ item.image" :onerror="errorImg01"/>
										</div>
									</div>
								</div>
								
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
								{{treatment.message.effect}}
							</div>
						</div>
						<div class="first">
							<div class="title">
								<span class="point"></span>
								<span class="text">按摩方法</span>
							</div>
							<div class="con">
								{{treatment.message.opinstruction}}
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>

<script>
	import {Tip,Landscape,Toast} from 'mand-mobile'
	export default {
		/* props:{
		  "treatment":Object
		}, */
		data() {
			return {
				num: 0,
				index: 0,
				acupointList: null, //穴位
				current:'-1',
				treatment: null,
				errorImg01: 'this.src="' + require('../../../static/images/default_big.png') + '"',
			}
		},
		created() {
			let patient = this.$store.getters["SelfDiagnosis/healthRegimenContent"];
			this.treatment = patient;
			
		},
		computed: {
			//食疗养生
			dietTherapyImg() {
				let imges = this.treatment.cookbook.imges;
				if(imges){
					if ((imges.imageName).length > 0) {
						return imges.imageName.split(",")
					}
				}				
			},
			dietTherapyImgPath() {
				let imges = this.treatment.cookbook.imges;
				if(imges){
					if ((imges.imageSrc).length > 0) {
						return imges.imageSrc.split(",")
					}
				}				
			},
			//茶饮养生
			drinkTherapyImg() {
				let imges = this.treatment.drink.imges;
				if(imges){
					if ((imges.imageName).length > 0) {
						return imges.imageName.split(",")
					}
				}					
			},
			drinkTherapyImgPath() {
				let imges = this.treatment.drink.imges;
				if(imges){
					if ((imges.imageSrc).length > 0) {
						return imges.imageSrc.split(",")
					}
				}					
			},
			//穴位按摩
			acupointTherapy() {
				return this.acupointList = this.treatment.message.acupoints;
			},
		},
		methods: {
			tab(num) {
				this.index = num;
			},
			showMask(index){
				this.current = index;
			},
			close(index) {
				this.current = '-1';
			}
		},
		mounted() {
			
		}
	}
</script>

<style scoped="" lang="less">
	.healthRegimen {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0rem;
		right: 0;
		bottom: 0;

		.content {
			position: absolute;
			left: 0;
			top: 0.8rem;
			right: 0;
			bottom: 0;
			width: 100%;
			background: #fff;
			overflow: auto;
			height: calc(100% - 0.8rem);
			.tips{
				width:100%;
				text-align: center;
				background: #f5f5f5;
				padding: 0.15rem 0;
				p{
					font-size: 0.28rem;
					line-height: 0.5rem;
					color: #000;
					
				}
			}
			.tab-tilte {
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
				width: 100%;

				.ositive {
					width: 100%;
					padding-bottom: 0.1rem;
					background: #fff;

					.img {
						width: 94%;
						height: 1.6rem;
						border: 1px solid #eee;
						margin: 0.15rem 3%;

						.item {
							display: inline-block;
							padding: 10px;

							img {
								width: 0.7rem;
								overflow: hidden;
								margin-top: 0.2rem;
							}
						}
					}

					.healthcontent {
						width: 94%;
						margin-left: 3%;

						.first {
							width: 100%;
							font-size: 0.28rem;
							overflow: hidden;

							.title {
								width: 100%;
								height: 0.7rem;
								line-height: 0.7rem;
								font-size: 0.3rem;
								color: #000;
								position: relative;

								.point {
									display: inline-block;
									width: 0.16rem;
									height: 0.16rem;
									background: red;
									float: left;
									margin: 0.27rem 0.2rem;
								}

								.text {}

								.acupoint {
									border-bottom: 1px solid blue;
									color: blue;
								}
							}

							.con {
								margin: 0rem 0.2rem;
								color: #333;
							}
						}
					}
				}

			}
		}

		.dialog{
				position: fixed;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				opacity: 0.8;				
				z-index: 9;
				.dialog-box{
					background: #fff;
					position: absolute;
					width: 70%;
					z-index: 10;
					margin: 50% 15%;
					border:1px solid #eee;
					padding: 0.2rem 0;
					.title{
						height: 0.8rem;
						line-height: 0.8rem;
						text-align: center;
						width: 100%;
						font-size: 0.4rem;
						.mui-icon-closeempty{
							position: absolute;
							right: 0;						
							margin-right: 0.15rem;
							font-size: 0.8rem;
							display: inline-block;
							height: 0.8rem;
							line-height: 0.8rem;
						}
						.tex{
							float: left;
							width: 100%;
							color: red;
						}
					}
					img{
						width: 3rem;
						margin: 0 auto;
					}
					
				}
			}
	}
</style>
