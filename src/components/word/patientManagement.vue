<template>
	<div class="patientSelection">
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.back(-1)"></span>
			<span class="title">患者管理</span>
		</header>
		<div class="content">
			<ul class="mui-table-view my-list">
				<li class="mui-table-view-cell mui-media" v-for="(item,index) in list" :key="index" 
				 v-tap="(e)=>goPatientInfo(item.pId)"
				v-longtap="(e)=>touchLoogDel(item,index,e)"
				>
					<a class="mui-navigate-right">
						<div class="mui-media-body">
							<p>
								<span>{{item.pName}}</span>
								<span>({{item.pAppellation}})</span>
							</p>
						</div>
					</a>
				</li>

			</ul>
			<div class="add" @click="addMembers()">
				<p>添加患者</p>
			</div>
		</div>
		<!--定义一个弹出框-->
		<div class="dialog-modal" v-show="dialogFlag"></div>
		<div class="dialog" v-show="dialogFlag">
			<div class="dialog-box">
				<div class="title">
					<span class="tex">添加患者</span>
					<span class="mui-icon mui-icon-closeempty" @click="close()"></span>
				</div>
				<div class="con">
					<md-field>
						<md-input-item title="患者称谓" v-model="patientAppellation">
						</md-input-item>
						<md-input-item title="患者姓名" v-model="patientName">
						</md-input-item>
						<md-field-item title="患者性别" solid>
							<md-radio name="man" v-model="patientSex" label="男" inline />
							<md-radio name="woman" v-model="patientSex" label="女" inline />
						</md-field-item>

						<md-input-item title="出生日期" v-model="patientBirth" @click.native="isDatePickerShow = true">
						</md-input-item>
					</md-field>
					<md-date-picker ref="datePicker" v-model="isDatePickerShow" type="custom" title=" " :custom-types="['yyyy', 'MM','dd']"
					 :default-date="currentDate" :min-date="minDate" @confirm="onDatePickerConfirm"></md-date-picker>
				</div>
				<div class="foot">
					<span class="cancel" @click="close()">取消</span>
					<span class="sure" @click="addToList()">添加</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {Dialog, Toast} from 'mand-mobile'
	export default {
		data() {
			return {
				Loop: 0,
				dialogFlag: false, //遮盖层
				patientAppellation: '', //患者称谓
				patientName: '', //患者姓名
				patientSex: '', //患者性别
				patientBirth: '', //患者出生日期
				minDate: new Date('1900/01/01'), //最小日期
				currentDate: new Date(), //当前日期
				isDatePickerShow: false, //日期弹出
				list: [],
			}
		},
		methods: {
			initData() {
				let uId = this.$store.getters.uIdString;
				this.$post("patient/patientId", {
					"userId": uId,
					"uId": uId
				}).then(res => {
					this.list = res.data.body;

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
				this.patientBirth = this.$refs.datePicker.getFormatDate('yyyy/MM/dd');
			},
			//进入患者信息界面
			goPatientInfo(pId, sex) {
				localStorage.setItem('sex', sex);
				this.$router.push({
					path: '/word/patientInfo/' + pId
				});
			},
			//长按删除患者
			touchLoogDel(item,index,e) {
				var that = this;
				Dialog.confirm({
					title: '提示',
					content: '确定删除该患者吗',
					confirmText: '确定',
					onConfirm:function(){
					that.$post("/patient/delPatient", {"pId":item.pId,"userId":that.userId})
					  .then(res => {
						  if (res.data.code){
							that.list.splice(index, 1);
						  }
						}
					  ).catch((err) => console.log(err))
				  },
				})
			},
			//添加成员
			addMembers() {
				this.dialogFlag = !this.dialogFlag;
			},
			close() {
				this.dialogFlag = false;
			},
			//添加患者
			addToList() {
				let uId = this.$store.getters.uIdString;
				let len = this.list.length + 1;
				let img = "";

				this.$post("patient/addPatient", {
					"userId": uId,
					"uId": uId,
					"pAppellation": this.patientAppellation,
					"pName": this.patientName,
					"pSex": this.patientSex == "女" ? 0 : 1,
					"pBirth": this.patientBirth
				}).then(res => {
					let result = res.data;
					if (this.patientSex == "男") {
						img = "static/images/default_header_boy.png";
					}
					if (this.patientSex == "女") {
						img = "static/images/default_header_girl.png";
					}
					const obj = {
						pId: result.body,
						pName: this.patientName,
						pAppellation: this.patientAppellation,
						pBirth: this.patientBirth,
						pSex: this.patientSex,
						pImagesrc: img
					};
					this.list.push(obj);
					this.dialogFlag = false;
					Toast({
						content: result.msg,
						position: 'bottom',
						duration: 1000
					});
					//添加成功后清除
					this.patientName = '';
					this.patientAppellation = '';
					this.patientBirth = '';
					this.patientSex = '';
				}).catch((err) => {
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
			height: calc(100% - 2rem);
			overflow: auto;
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

			.add {
				position: fixed;
				bottom: 0rem;
				left: 0;
				width: 100%;
				text-align: center;
				line-height: 1rem;
				height: 1rem;
				background: #fff;

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

		.dialog-modal {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			opacity: 0.5;
			background: #000;
		}

		.dialog {
			.dialog-box {
				width: 80%;
				height: 6rem;
				position: absolute;
				background: #fff;
				z-index: 99;
				top: 50%;
				left: 10%;
				margin-top: -3rem;

				.title {
					height: 0.8rem;
					line-height: 0.8rem;
					text-align: center;
					width: 100%;
					font-size: 0.4rem;

					.mui-icon-closeempty {
						position: absolute;
						right: 0;
						margin-right: 0.15rem;
						font-size: 0.8rem;
						display: inline-block;
						height: 0.8rem;
						line-height: 0.8rem;
					}

					.tex {
						float: left;
						width: 100%;
					}
				}

				.con {
					width: 100%;

					.line {
						width: 100%;
						background: #fff;
						height: 1rem;
						float: left;

						.sex {
							width: auto;
							display: inline-block;
							float: left;
							padding: 0 10px;
							line-height: 1rem;
							font-size: 0.28rem;
						}
					}
				}

				.foot {
					width: 100%;
					position: absolute;
					left: 0;
					bottom: 0;
					height: 0.8rem;
					line-height: 0.8rem;

					&:after {
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

					span {
						float: left;
						width: 50%;
						text-align: center;
						display: inline-block;
						font-size: 0.3rem;
					}

					.cancel {
						border-right: 1px solid #eee;
					}

					.sure {
						color: red;
					}
				}
			}
		}
	}
</style>
