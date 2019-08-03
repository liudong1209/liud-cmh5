<template>
	<div class="patientSelection" >
		<header class="header">
			<span class="mui-icon mui-icon-back back" @click="$router.go(-1)"></span>
			<span class="title">患者选取</span>
		</header>
		<div class="tip">
			<!-- <div class="first">
			</div> -->
			<div class="second">请选择自诊对象</div>
		</div>
		<div class="content">
			<ul class="list">
				<li  v-for="(item,index) in list" 
					:key="item.pId"
					 v-tap="(e)=>goSymptomSelect(item,e)"
					 v-longtap="(e)=>touchLoogDel(item,index,e)"
				>
					<div class="left">
						<p class="first"><span class="name">{{item.pName}}</span>(<span class="relationship">{{item.pAppellation}}</span>)</p>
						<p class="birth">{{item.pBirth}}</p>
					</div>
					<div class="right" >
						<img  v-if="item.pImagesrc"  :src="GLOBAL.imgPath + item.pImagesrc" />
						<img  v-else-if="item.pSex == '男'" src="static/images/default_header_boy.png"/>
						<img  v-else src="static/images/default_header_girl.png"/>
					</div>
				</li>				
			</ul>
			<div class="add" @click="addMembers()">
				<p>添加成员</p>
				<p>点击新增家属,方便自诊(长按可删除患者)</p>
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
					  <md-input-item
						title="患者称谓"
						v-model="patientAppellation"
						>
					  </md-input-item>
					  <md-input-item
						title="患者姓名"
						v-model="patientName"
						>
					  </md-input-item>
					  <md-field-item title="患者性别" solid>
						<md-radio name="1" v-model="patientSex" value="1" label="男" inline />
						<md-radio name="0" v-model="patientSex" value="0" label="女" inline />
					  </md-field-item>	
					
					<md-input-item
						title="出生日期"
						v-model="patientBirth"
						@click.native="isDatePickerShow = true"
						>
					</md-input-item> 
					</md-field>
					<md-date-picker
					  ref="datePicker"
					  v-model="isDatePickerShow"
					  type="custom"
					  title=" "					  
					  :custom-types="['yyyy', 'MM','dd']"
					  :default-date="currentDate"
					  :min-date="minDate"
					  @confirm="onDatePickerConfirm"
					>
					</md-date-picker>
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
	import {Dialog, Button} from 'mand-mobile'
	import { Toast } from 'mand-mobile'
	import { mapMutations} from 'vuex'
	export default {
		data() {
			return {
			    userId:this.$store.getters.uIdString,
				Loop:0,
				dialogFlag:false, //遮盖层
				patientAppellation:'',//患者称谓
				patientName:'',//患者姓名
				patientSex:'',//患者性别
				patientBirth:'',//患者出生日期
				minDate:new Date('1900/01/01'),
				currentDate: new Date(),
				isDatePickerShow: false,
				list: [],
			}
		},
		methods: {
			//初始化数据
			initData() {
				let uId = this.$store.getters.uIdString
				this.$post('patient/patientId', {"userId": uId, "uId": uId}).then(res => {
				  this.list = res.data.body
				}).catch((err) => {
				  console.log(err)
				})
			},
			//选择日期确定
			onDatePickerConfirm(columnsValue) {
			  this.patientBirth = this.$refs.datePicker.getFormatDate('yyyy-MM-dd');
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
			//进入症状选取界面
			goSymptomSelect(patient,e){
				//this.$store.commit("SelfDiagnosis/updateSelectedPatient",patient)
				e.preventDefault();
				this.updateSelectedPatient(patient);
				sessionStorage.setItem("patientInfo",JSON.stringify(patient))
				this.$router.push({
					path: '/symptomSelect/symptomSelect'
				}); 
			},
			//提交vuex SelfDiagnosis.js updateSelectedPatient
			...mapMutations('SelfDiagnosis',[ //SelfDiagnosis是指modules文件夹下的SelfDiagnosis.js
				'updateSelectedPatient'  //SelfDiagnosis.js文件中的actions里的方法，在上面的@click中执行并传入实参
			]),
			//增加成员
			addMembers(){
				this.dialogFlag = !this.dialogFlag;
			},
			//弹框关闭
			close(){
				this.dialogFlag = false;
			},
			//添加患者判断条件
			checkAddList(){
				if(this.patientAppellation == ""){
					Toast({
					  content: '请输入患者称谓',
					  position: 'bottom',
					  duration: 1000
					});
					return false;
				}
				if(this.patientName == ""){
					Toast({
					  content: '请输入患者姓名',
					  position: 'bottom',
					  duration: 1000
					});
					return false;
				}
				if(this.patientSex == ""){
					Toast({
					  content: '请选择患者性别',
					  position: 'bottom',
					  duration: 1000
					});
					return false;
				}
				if(this.patientBirth == ""){
					Toast({
					  content: '请输入出生日期',
					  position: 'bottom',
					  duration: 1000
					});
					return false;
				}
			},
			//添加患者
			addToList(){
				this.checkAddList();
				let img = "";
				if(this.patientSex == "1"){
					img = "static/images/default_header_boy.png";
				}
				if(this.patientSex == "0"){
					img = "static/images/default_header_girl.png";
				}
				const obj = {
				  uId:this.$store.getters.uIdString,
				  pName: this.patientName,
				  pAppellation: this.patientAppellation,
				  pBirth:this.patientBirth,
				  pSex:this.patientSex,
				  pImagesrc:img,
				  userId: this.$store.getters.uIdString,
				};

				this.$post("/patient/addPatient", obj)
				  .then(res => {
					 if (res.data.code == "200"){
					    this.initData();
						this.dialogFlag = !this.dialogFlag;
						//添加成功后清除
						this.patientName = '';
						this.patientAppellation = '';
						this.patientBirth = '';
						this.patientSex = '';
					 }
					}
				  ).catch((err) => console.log(err))
						//this.list.push(obj);
						//this.dialogFlag = false;
			}	
		},
		//初始化
		mounted: function () {
		 this.initData();
		}

	}
</script>

<style lang="less" scoped="scoped">
	.patientSelection{
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
		.tip{
			width: 100%;
			height: 1rem;
			background: #eee;
			text-align: center;
			font-size: 0.26rem;
			margin-top: 0.8rem;
			.first{
				span{
					color: red;
				}
				height: 0.7rem;
				line-height: 0.7rem;
			}
			.second{
				height: 1rem;
				line-height: 1rem;
				font-size: 0.32rem;
			}
		}
		.content{
			width: 100%;
			height:calc(100% - 2.3rem); 
			overflow: auto;
			ul{
				width: 100%;
				li{
					width: 94%;
					height: 1.2rem;
					margin-left: 3%;
					background: #fff;
					margin-bottom: 0.2rem;
					overflow: hidden;
					.left{
						float: left;
						width: 70%;
						margin-left: 0.15rem;
						 overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						p{
							line-height: 0.5rem;
							color: #000;
							&:nth-child(1){
								padding: 0.1rem 0 0 0;
							}
						}
						.first{
							font-size: 0.3rem;
						}
					}
					.right{
						float: right;
						img{
							width: 0.8rem;
							overflow: hidden;
							margin-top: 0.2rem;
							margin-right: 0.15rem;
						}
					}
				}
			}
			.add{
				width: 94%;
				height: 1.2rem;
				margin-left: 3%;
				background: #fff;
				padding-bottom: 0.1rem;
				p{
					line-height: 0.5rem;
					color: #000;
					margin-left: 0.15rem;
					&:nth-child(1){
						font-size: 0.3rem;
						padding: 0.1rem 0 0 0;
					}
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
				width: 80%;
				height: 6rem;
				position: absolute;
				background: #fff;
				z-index: 99;
				top: 50%;
				left: 10%;
				margin-top: -3rem;
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
					.line{
						width: 100%;
						background: #fff;
						height: 1rem;
						float: left;
						.sex{
							width:auto;
							display: inline-block;
							float: left;
							padding: 0 10px;
							line-height: 1rem;
							font-size: 0.28rem;
						}
					}
				}
				.foot{
					width: 100%;
					position: absolute;
					left: 0;
					bottom: 0;
					height: 0.8rem;
					line-height: 0.8rem;
					&:after{
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
					span{
						float: left;
						width: 50%;
						text-align: center;
						display: inline-block;
						font-size: 0.3rem;
					}
					.cancel{
						border-right: 1px solid #eee;
					}
					.sure{
						color: red;
					}
				}
			}
		}
	}
</style>
