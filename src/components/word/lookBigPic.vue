<template>
	<div class="patientSelection">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">查看大图</span>
		</header>
		<div class="content">
			<div class="md-example-child md-example-child-reader md-example-child-reader-0">
				<ul class="image-reader-list">
					<li class="image-reader-item" v-for="(img, index) in imageList['reader0']" :key="index" :style="{
					  'backgroundImage': `url(${img})`,
					  'backgroundPosition': 'center center',
					  'backgroundRepeat': 'no-repeat',
					  'backgroundSize': '100%'
					}">
					<li class="image-reader-item add">
						<form action="" enctype="multipart/form-data" method="post">
							<md-image-reader id="fileUpload" name="reader0" @select="onReaderSelect" @complete="onReaderComplete" @error="onReaderError"></md-image-reader>
						</form>
						<p>编辑</p>

					</li>
				</ul>
			</div>
			<div class="bigPic">

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
				imageList: {
					reader0: [

					],
				},
				defaultAvatar: "static/images/default_header_boy.png",

			}
		},
		methods: {
			onReaderSelect(name, {
				files
			}) {
				files.forEach(file => {})
				Toast.loading('图片读取中...')
			},
			onReaderComplete(name, {
				dataUrl,
				file
			}) {
				Toast.hide()
				const demoImageList = [];
				demoImageList.push(dataUrl);
				this.$set(this.imageList, name, demoImageList);
				var formData = new FormData();
				var pId = this.$route.params.pId;
				if (pId == '-1') { //个人
					formData.append('fileName', file);
					formData.append('id', this.$store.getters.uIdString);
					formData.append('type', 0);
				} else { //患者
					formData.append('fileName', file);
					formData.append('id', pId);
					formData.append('type', 1);
				}
				
				this.$multipartPost("/upload/fileUpload", formData, {
					dataType: "json",
					async: false,
					cache: false,
					contentType: false,
					processData: false,
				}, ).then(res => {					
					if (res.data.code == 200) {
						Toast({
							content: res.data.msg,
							position: 'bottom',
							duration: 1000
						});
						this.$router.back(-1);
					} else {
						Toast({
							content: res.data.msg,
							position: 'bottom',
							duration: 1000
						});
					}
				}).catch(res => {
					Toast({
						content: res.data.msg,
						position: 'bottom',
						duration: 1000
					}); 
				})

			},
			onReaderError(name, {
				msg
			}) {
				Toast.failed(msg);
			},

		},
		mounted() {
			var pId = this.$route.params.pId;
			if (pId == '-1') { //个人
				let imgPath = this.$store.getters["Word/personalAvatar"];
				this.imageList.reader0 = [];
				this.imageList.reader0.push(imgPath);
			} else { //患者
				let imgPath = this.$store.getters["Word/patientAvatar"];
				this.imageList.reader0 = [];
				this.imageList.reader0.push(imgPath);
				if (imgPath == this.GLOBAL.imgPath) {
					this.imageList.reader0 = [];
					this.imageList.reader0.push('static/images/default_header_boy.png');
				}

			}
		}
	}
</script>
<style lang="less" scoped="scoped">
	.patientSelection {
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

			.image-reader-list {
				height: calc(100% - 1rem);
				width: 100%;
				position: absolute;

				li {
					width: 92%;
					margin-top: 10%;
					margin-left: 4%;
					height: 80%;
					box-shadow: 0 5px 20px rgba(197, 202, 213, .25);
					box-sizing: border-box;
					list-style: none;
					border-radius: 4px;
					background-size: cover;
					overflow: hidden;
				}

				.add {
					position: fixed;
					bottom: 0rem;
					left: 0;
					width: 100%;
					text-align: center;
					line-height: 1rem;
					height: 1rem;
					background: #fff;
					margin: 0;

					p {
						color: #CB231F;
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


		}
	}
</style>
