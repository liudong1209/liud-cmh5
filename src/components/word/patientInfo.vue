<template>
	<div class="patientSelection">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">患者信息</span>
		</header>
		<div class="content">
			<ul class="mui-table-view my-list">
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<div class="mui-media-body">
							<p>
								<span>头像</span>
								<span class="right">
									<img :src= "GLOBAL.imgPath + avatar" @click="lookBigPic()" v-if="avatar"/>
									<img :src="defaultAvatar" @click="lookBigPic()" v-else/>
								</span>
							</p>
						</div>
					</a>
					
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<div class="mui-media-body">
							<p>
								<span>姓名</span>
								<span class="right" @click="nameDialog.open = true">
									{{name}}
								</span>
							</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<div class="mui-media-body">
							<p>
								<span>性别</span>
								<span class="right" @click="sexDialog.open = true">
									{{sex}}
								</span>
							</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<div class="mui-media-body">
							<p>
								<span>称谓</span>
								<span class="right" @click="linkDialog.open = true">
									{{link}}
								</span>
							</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<div class="mui-media-body">
							<p>
								<span>出生日期</span>
								<span class="right" @click="isDatePickerShow = true">
									{{birth}}
								</span>
							</p>
						</div>
					</a>
				</li>
			</ul>
			<div class="complete" @click="complete()">
				<p>完成</p>
			</div>
			<div class="md-example-child md-example-child-dialog md-example-child-dialog-0">
				<!--姓名-->
				<md-dialog title="修改" :closable="false" v-model="nameDialog.open" :btns="nameDialog.btns">
					<input type="text" v-model="mName" />
				</md-dialog>
				<!--性别-->
				<md-dialog title="修改" :closable="false" v-model="sexDialog.open" :btns="sexDialog.btns">
					<md-field>
					  <md-field-item>
						<md-radio name="男" v-model="mSex" label="男" inline />
						<md-radio name="女" v-model="mSex" label="女" inline />						
					  </md-field-item>
					</md-field>					
				</md-dialog>
				<!--称谓-->
				<md-dialog title="修改" :closable="false" v-model="linkDialog.open" :btns="linkDialog.btns">
					<input type="text" v-model="mLink" />
				</md-dialog>				
			</div>
			<md-date-picker
			  ref="datePicker"
			  v-model="isDatePickerShow"
			  type="custom"
			  title=""					  
			  :custom-types="['yyyy', 'MM','dd']"
			  :default-date="currentDate"
			  :min-date="minDate"
			  @confirm="onDatePickerConfirm"
			></md-date-picker>
		</div>
	</div>
</template>
<script>
	import {
		Dialog,
		Button,
		Toast
	} from 'mand-mobile'
	export default {
		data() {		  
			return {
				pId : this.$route.params.pId,
				avatar: "",
                defaultAvatar: "static/images/default_header_boy.png",
				name: "",
				sex: "",
				link: "",
				birth: "",
				mName:'',
				mSex:'',
				mLink:'',
				minDate:new Date('1900/01/01'), //最小日期
				currentDate: new Date(),  //当前日期
				isDatePickerShow: false,  //日期弹出
				//姓名弹出框
				nameDialog: {
					open: false,
					btns: [
						{
							text: '取消',
							handler: this.onNameCancel,
						},
						{
							text: '确定',
							handler: this.onNameConfirm,
						},
					],
				},
				//性别弹出框
				sexDialog: {
					open: false,
					btns: [{
							text: '取消',
							handler: this.onSexCancel,
						},
						{
							text: '确定',
							handler: this.onSexConfirm,
						},
					],
				},
				//称谓弹出框
				linkDialog: {
					open: false,
					btns: [{
							text: '取消',
							handler: this.onLinkCancel,
						},
						{
							text: '确定',
							handler: this.onLinkConfirm,
						},
					],
				},
			}
		},
		methods: {
		  //初始化数据
		  initData() {
			let uId = this.$store.getters.uIdString       
			this.$post('patient/selOne', {"userId": uId, "id": this.pId}).then(res => {
			  let result = res.data.body;
			  this.avatar = result.pImagesrc;
			  this.name = result.pName;
			  this.sex = result.pSex;
			  this.birth = result.pBirth;
			  this.link = result.pAppellation;
			  this.mLink = result.pAppellation;
			  this.mName = result.pName;
			  this.mSex = result.pSex;
			}).catch((err) => {
			  console.log(err)
			})
		  },
			//查看大图
			lookBigPic(){
				this.$router.push({
					path: '/word/lookBigPic/'+this.pId
				});
				var imgPath = this.GLOBAL.imgPath + this.avatar;
				this.$store.commit("Word/updatePatientAvatar",imgPath);
			},
			//姓名弹出框确认
			onNameConfirm() {
				this.nameDialog.open = false;
				this.name = this.mName;
			},
			//性别弹出框确认
			onSexConfirm() {
				this.sexDialog.open = false;
				this.sex = this.mSex;
			},
			//称谓弹出框确认
			onLinkConfirm() {
				this.linkDialog.open = false;
				this.link = this.mLink;
			},
			//选择日期确定
			onDatePickerConfirm(columnsValue) {
			  this.birth = this.$refs.datePicker.getFormatDate('yyyy/MM/dd');
			},
			//点击完成
			complete(){
        let uId = this.$store.getters.uIdString;
        this.$post('patient/updpatient',{"userId": uId, "pId": this.pId, "pAppellation":this.link, "pName":this.name, "pSex":this.sex=="女"?0:1, "pBirth":this.birth}).then(res=>{
          let result = res.data;
          Toast({
            content: result.msg,
            position: 'bottom',
            duration: 1000
          });
          }
        ).catch((err)=>{
          Toast({
            content: err,
            position: 'bottom',
            duration: 1000
          });
        })
				

			}
			
		},
		mounted: function() {
			
        this.initData();
		},
		created(){
			
			
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

			.my-list {
				overflow: auto;
				/* height:calc(100% - 2rem); */
				width: 100%;
				position: relative;
				li {
					height: 1rem;
					line-height: 1rem;
					padding: 0;
					font-size: 0.28rem;
					a {
						margin: 0;
						p {
							color: #000;
							padding-left: 0.25rem;
							.right {
								float: right;
								margin-right: 0.6rem;
								img {
									width: 0.6rem;
									margin-top: 0.2rem;
								}
							}
						}
					}

					&:last-child {
						&:after {
							height: 1px;
							left: 0;
						}
					}
				}

				&:after {
					height: 0;
				}
			}

			.complete {
				width: 100%;
				text-align: center;
				line-height: 1rem;
				height: 1rem;
				background: #fff;
				margin-top: 0.15rem;

				p {
					color: #CB231F;
					font-size: 0.3rem;
				}
			}
		}
	}
</style>
