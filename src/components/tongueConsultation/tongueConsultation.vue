<template>
	<div class="tongueConsultation">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">舌诊</span>
		</header>
		<div class="content">
			<div class="cont">
				<div class="face">
					舌诊是观察舌头的色泽、形态的变化来辅助诊断及鉴别的一个简单有效的方法。
					舌诊,诊断学名词。为望诊重点内容之一，我们的的舌头对应着不同的脏腑,从舌头的形状、
					及颜色能简单分辨出身体状况。(下图为舌与人体部位和疾病对照图)
				</div>
				<div class="img">
					<img src="static/images/tonguediagnose_tip.png" />
				</div>
			</div>
			<div class="add" @click="faceConsultation()">
				<p>开始舌诊</p>
			</div>
		</div>
		<!--定义一个弹出框-->
		<div class="dialog-modal" v-show="dialogFlag"></div>
		<div class="dialog" v-show="dialogFlag">
			<div class="dialog-box">
				<div class="title">
					<span class="tex">示例</span>
					<span class="mui-icon mui-icon-closeempty" @click="close()"></span>
				</div>
				<div class="con">
					<div class="img">
						<img src="static/images/tonguediagnose_tip2.png" />
					</div>
					<div class="tip">
						脸在圈定的范围内、美颜已关闭、不戴眼镜、不逆光
					</div>
					<div class="image-reader-item photograph">
						<md-image-reader
						  name="reader0"
						  @select="onReaderSelect"
						  @complete="onReaderComplete"
						  @error="onReaderError"
						  is-multiple
						></md-image-reader>        
						<p>开始拍照</p>
					</div>
				</div>	
			</div>
		</div>
	</div>
</template>
<script>
	import {
		Icon,
		ImageReader,
		Tag,
		Toast
	} from 'mand-mobile'

	export default {
		name: 'image-reader-demo',
		data() {
			return {
				dialogFlag:false, //遮盖层
				imageList: {
					reader0: [
						"static/images/default_header_boy.png"
					],					
				},
			}
		},
		methods: {
			//开始面诊
			faceConsultation(){
				this.dialogFlag = true;
			},
			//弹出框关闭
			close(){
				this.dialogFlag = false;
			},
			onReaderSelect(name, {files}) {
			  files.forEach(file => {
			  })
			  Toast.loading('图片读取中...')
			},
			onReaderComplete(name, {dataUrl, file}) {
			  Toast.hide()
			  const demoImageList = [];
			  demoImageList.push(dataUrl);
			  this.$set(this.imageList, name, demoImageList);
			  this.$router.back(-1);
			},
			onReaderError(name, {msg}) {
			  Toast.failed(msg);
			},			
		},
	}
</script>
<style lang="less" scoped="scoped">
	.tongueConsultation {
		.content {
			position: absolute;
			left: 0;
			top: 0.8rem;
			right: 0;
			bottom: 0;
			height: auto;
			width: 100%;
			background: #f5f5f5;
			overflow-x: hidden;
			overflow-y: auto;
			.cont{
				.face{
					width: 100%;
					padding: 0 0.25rem;
					margin: 0.4rem auto 0.2rem;
					font-size: 0.28rem;
					line-height: 0.5rem;
				}
				.img{
					margin: 0 auto;
					img{
						width: 80%;
						margin: 0 auto;
					}
				}
			}
			.add {
				position: fixed;
				bottom: 0.6rem;
				left: 0;
				width: 96%;
				text-align: center;
				line-height: 0.8rem;
				height: 0.8rem;
				background: #CB231F;
				margin: 0 2%;
				border-radius: 5px;
			
				p {
					color: #fff;
					font-size: 0.3rem;
				}
			
				&:before {
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
			}			
		}
		.dialog-modal{
				position: fixed;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				opacity: 0.5;
				background: #000;
		}
		.dialog{				
			.dialog-box{
				width: 90%;
				height: 80%;
				position: absolute;
				background: #fff;
				z-index: 99;
				top: 10%;
				left: 5%;
				.title{
					height: 0.8rem;
					line-height: 0.8rem;
					text-align: center;
					width: 100%;
					font-size: 0.4rem;
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
					}
				}
				.con{
					width: 100%;
					img{
						width: 90%;
						margin: 0.2rem auto;
					}
					.tip{
						font-size: 0.28rem;
						width: 90%;
						margin: 0 auto;
						text-align: left;
					}
					.photograph{
						width: 100px;
						text-align: center;
						line-height: 0.8rem;
						height: 0.8rem;
						border-radius: 5px;							
						margin: 0 auto;
						position: relative;
						.md-image-reader{
							position: relative;
						}
						p{
							color: #fff;
							width: 100px;
							text-align: center;
							line-height: 0.8rem;
							height: 0.8rem;
							background: #CB231F;
							border-radius: 5px;							
							margin: 0 auto;
							position: absolute;
							top: 0;
						}
					}
				}
			
			}
		}
	}
</style>
