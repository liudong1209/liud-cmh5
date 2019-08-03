<template>
	<div class="personalCenter">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">个人中心</span>
		</header>
		<div class="content">
			<ul class="mui-table-view my-list">
				<li class="mui-table-view-cell mui-media">
					<a class="mui-navigate-right">
						<div class="mui-media-body">
							<p>
								<span>头像</span>
								<span class="right">
									<img :src="GLOBAL.imgPath + avatar" @click="lookBigPic()" v-if="avatar"/>
									<img :src="defaultAvatar" @click="lookBigPic()" v-else/>
								</span>
							</p>
						</div>
					</a>
					
				</li>
				<li class="mui-table-view-cell mui-media notModified">
					<a class="mui-navigate-right">
						<div class="mui-media-body"> 
							<p>
								<span>姓名</span>
								<span class="right" >
									{{name}}
								</span>
							</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media notModified" >
					<a class="mui-navigate-right">
						<div class="mui-media-body">
							<p>
								<span>性别</span>
								<span class="right">
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
								<span>手机号</span>
								<span class="right" @click="phoneDialog.open = true">
									{{phone}}
								</span>
							</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media notModified">
					<a class="mui-navigate-right">
						<div class="mui-media-body">
							<p>
								<span>出生日期</span>
								<span class="right" >
									{{birth}}
								</span>
							</p>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell mui-media notModified">
					<a class="mui-navigate-right">
						<div class="mui-media-body">
							<p>
								<span>身份证号码</span>
								<span class="right"  v-if="IDCard">
									{{IDCard}}
								</span>
                <span  class="right"  v-else>
                  未设置
                </span>
							</p>
						</div>
					</a>
				</li>
        <li class="mui-table-view-cell mui-media">
          <a class="mui-navigate-right">
            <div class="mui-media-body">
              <p>
                <span>邮箱</span>
                <span class="right" @click="EmailDialog.open = true" v-if="email">
					{{email}}
				</span>
                <span  class="right" @click="EmailDialog.open = true" v-else>
                  未设置
                </span>
              </p>
            </div>
          </a>
        </li>
			</ul>
			
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
				<!--s手机-->
				<md-dialog title="修改" :closable="false" v-model="phoneDialog.open" :btns="phoneDialog.btns">
					<input type="text" v-model="mPhone" />
				</md-dialog>
				<!--身份证-->
				<md-dialog title="修改" :closable="false" v-model="IDCardDialog.open" :btns="IDCardDialog.btns">
					<input type="text" v-model="mIDCard" />
				</md-dialog>
        <!--邮箱-->
        <md-dialog title="修改" :closable="false" v-model="EmailDialog.open" :btns="EmailDialog.btns">
          <input type="text" v-model="mEmail" />
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
				pId:'-1',
				avatar: "",
                defaultAvatar: "static/images/default_header_boy.png",
				name: "",
				sex: "",
				phone: "",
				birth: "",
				IDCard:"",
                email:"",
				mName:'',
				mSex:'',
				mPhone:'',
				mIDCard:"",
                mEmail:"",
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
				//手机弹出框
				phoneDialog: {
					open: false,
					btns: [{
							text: '取消',
							handler: this.onPhoneCancel,
						},
						{
							text: '确定',
							handler: this.onPhoneConfirm,
						},
					],
				},
				//身份证
				IDCardDialog: {
					open: false,
					btns: [{
							text: '取消',
							handler: this.onIDCardCancel,
						},
						{
							text: '确定',
							handler: this.onIDCardConfirm,
						},
					],
				},
        EmailDialog: {
          open: false,
          btns: [{
            text: '取消',
            handler: this.onEmailCancel,
          },
            {
              text: '确定',
              handler: this.onEmailConfirm,
            },
          ],
        },
			}
		},
		methods: {

      //初始化数据
      initData() {
        let uId = this.$store.getters.uIdString
        this.$post('users/getuserid', {"userId": uId, "uId": uId}).then(res => {
		  if(res.data.code == 200){
			  let result = res.data.body.user;
			  this.avatar = result.uImgesrc;
			  this.name = result.uName;
			  this.sex = result.uSex;
			  this.phone = result.uPhone;
			  this.birth = result.uBirth;
			  this.IDCard = result.uCard;
			  this.mName = result.uName;
			  this.mSex = result.uSex;
			  this.mPhone = result.uPhone;
			  this.mIDCard = result.uCard;
			  this.email = result.uEmail;
			  this.mEmail = result.uEmail;
		  }else{
			 Toast({
			   content: res.data.msg,
			   position: 'bottom',
			   duration: 1000
			 }); 
		  }
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
				this.$store.commit("Word/updatePersonalAvatar",imgPath);
			},
			//姓名弹出框确认
			onNameConfirm() {
        let uId = this.$store.getters.uIdString
				this.nameDialog.open = false;
				this.name = this.mName;
				this.$post("/users/upduser",{"uId":uId, "userId":uId, "uName":this.name}).then(res=>{
          let result = res.data;
          Toast({
            content: result.msg,
            position: 'bottom',
            duration: 1000
          });
        }).catch((err) => {
          Toast({
            content: err,
            position: 'bottom',
            duration: 1000
          });
        })
			},
			//性别弹出框确认
			onSexConfirm() {
        let uId = this.$store.getters.uIdString
				this.sexDialog.open = false;
				this.sex = this.mSex;
        this.$post("/users/upduser",{"uId":uId, "userId":uId, "uSex":this.sex=="女"?0:1}).then(res=>{
          let result = res.data;
          Toast({
            content: result.msg,
            position: 'bottom',
            duration: 1000
          });
        }).catch((err) => {
          Toast({
            content: err,
            position: 'bottom',
            duration: 1000
          });
        })
			},
			//手机弹出框确认
			onPhoneConfirm() {
        let uId = this.$store.getters.uIdString
				this.phoneDialog.open = false;
				this.phone = this.mPhone;
        this.$post("/users/upduser",{"uId":uId, "userId":uId, "uPhone":this.phone}).then(res=>{
          let result = res.data;
          Toast({
            content: result.msg,
            position: 'bottom',
            duration: 1000
          });
        }).catch((err) => {
          Toast({
            content: err,
            position: 'bottom',
            duration: 1000
          });
        })
			},
			//身份证弹出框确认
			onIDCardConfirm() {
        let uId = this.$store.getters.uIdString
				this.IDCardDialog.open = false;
				this.IDCard = this.mIDCard;
        this.$post("/users/upduser",{"uId":uId, "userId":uId, "uCard":this.IDCard}).then(res=>{
          let result = res.data;
          Toast({
            content: result.msg,
            position: 'bottom',
            duration: 1000
          });
        }).catch((err) => {
          Toast({
            content: err,
            position: 'bottom',
            duration: 1000
          });
        })
			},
			
			//选择日期确定
        onDatePickerConfirm(columnsValue) {
          let uId = this.$store.getters.uIdString
          this.birth = this.$refs.datePicker.getFormatDate('yyyy/MM/dd');
          this.$post("/users/upduser",{"uId":uId, "userId":uId, "uBirth":this.birth}).then(res=>{
            let result = res.data;
            Toast({
              content: result.msg,
              position: 'bottom',
              duration: 1000
            });
          }).catch((err) => {
            Toast({
              content: err,
              position: 'bottom',
              duration: 1000
            });
          })
        },
      //邮箱弹出框确认
      onEmailConfirm() {
        let uId = this.$store.getters.uIdString
        this.EmailDialog.open = false;
        this.email = this.mEmail;
        this.$post("/users/upduser",{"uId":uId, "userId":uId, "uEmail":this.email}).then(res=>{
          let result = res.data;
          Toast({
            content: result.msg,
            position: 'bottom',
            duration: 1000
          });
        }).catch((err) => {
          Toast({
            content: err,
            position: 'bottom',
            duration: 1000
          });
        })
      },
			
			
		},
		mounted: function() {
        this.initData();
		}
	}
</script>

<style lang="less" scoped="scoped">
	.personalCenter {
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
				.notModified{
					a{
						&:after {
							content: '';
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
